-include .env

SHELL:=/bin/bash
WHEN_IN=if [[ "$(ENV)" == "$(1)" ]]; then $(2); fi

PROXY_FOLDER=.make

PROJECT_DEPENDENCY_PROXY_TARGETS = \
	$(PROXY_FOLDER)/Brewfile \
	$(PROXY_FOLDER)/yarn.lock \
	$(PROXY_FOLDER)/vscode-extensions.json

# -- commands --

.PHONY: \
	default \
	\
	lint test coverage \
	\
	ci release release! \
	\
	reset reset!

# -- default --

SOURCE_FOLDER=source
SOURCE_FILES:=$(shell find $(SOURCE_FOLDER) -type f -name '*')

CONFIG_FOLDER=configuration
CONFIG_FILES:=tsconfig.json $(shell find $(CONFIG_FOLDER) -type f -name '*')

CLI_ENTRY_POINT=$(SOURCE_FOLDER)/cli.ts
CLI_BUILD=$(PROXY_FOLDER)/cli.js

CRED_TEMPLATE=$(CONFIG_FOLDER)/credentials.example.yml
CREDS=$(CONFIG_FOLDER)/credentials.yml

default: $(PROXY_FOLDER)
	make $(CLI_BUILD) ;\
	node $(CLI_BUILD) $(CMD)

$(CLI_BUILD): $(PROJECT_DEPENDENCY_PROXY_TARGETS) $(SOURCE_FILES) $(CONFIG_FILES) $(CREDS)
	$(call WHEN_IN,,flags=--no-minify) ;\
	yarn parcel build $(CLI_ENTRY_POINT) $$flags \
		--target node \
		--out-dir $(PROXY_FOLDER) \
		--public-url $$PWD/$(PROXY_FOLDER)

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) ;\
	$(call WHEN_IN,,code $(CREDS))

# -- lint --

LINT_PROXY_TARGET=$(PROXY_FOLDER)/lint

lint: $(PROXY_FOLDER)
	make $(LINT_PROXY_TARGET)

$(LINT_PROXY_TARGET): $(PROJECT_DEPENDENCY_PROXY_TARGETS) $(SOURCE_FILES)
	diff_target="HEAD^ --staged" ;\
	current_branch=$$(git rev-parse --abbrev-ref HEAD) ;\
	$(call WHEN_IN,circleci,diff_target=master...$$current_branch) ;\
	\
	changes=$$( \
		git diff \
		--diff-filter=MA \
		$$diff_target \
		--name-only \
			| egrep '\.ts'\
	) ;\
	\
	if [[ $$changes ]] ;\
		then yarn eslint $$changes \
			> $(LINT_PROXY_TARGET) ;\
	fi

# -- coverage --

COVERAGE_FOLDER=$(PROXY_FOLDER)/coverage
COVERAGE_FILES=$(shell find $(COVERAGE_FOLDER) -type f -name '*' 2>/dev/null)

coverage: $(PROXY_FOLDER)
	$(call WHEN_IN,circleci,flags=--ci) ;\
	make $(COVERAGE_FOLDER)

$(COVERAGE_FOLDER): $(PROJECT_DEPENDENCY_PROXY_TARGETS) $(SOURCE_FILES)
	yarn jest --coverage && mv ./coverage $(COVERAGE_FOLDER)

# -- ci --

CI_PROXY_TARGET=$(PROXY_FOLDER)/ci

CI_CONFIG=.circleci/config.yml
LOCAL_CI_CONFIG=$(PROXY_FOLDER)/config.local.yml

ci: $(PROXY_FOLDER)
	make $(CI_PROXY_TARGET)

$(CI_PROXY_TARGET): $(PROJECT_DEPENDENCY_PROXY_TARGETS) $(LOCAL_CI_CONFIG)
	circleci local execute --job $(JOB) --config $(LOCAL_CI_CONFIG) \
		> $(CI_PROXY_TARGET)

$(LOCAL_CI_CONFIG): $(PROXY_FOLDER) $(CI_CONFIG)
	circleci config process $(CI_CONFIG) \
		> $(LOCAL_CI_CONFIG)

# -- release! --

RELEASE_PROXY_TARGET=$(PROXY_FOLDER)/release!

DOC_FOLDER=documentation
DOC_FILES:=$(shell find $(DOC_FOLDER) -type f -name '*')

release:
	@echo "Are you sure? - please run 'release!' to confirm."

release!: $(PROXY_FOLDER)
	make $(RELEASE_PROXY_TARGET)

$(RELEASE_PROXY_TARGET): $(PROJECT_DEPENDENCY_PROXY_TARGETS) $(CLI_BUILD) $(DOC_FILES)
	yarn config set version-git-message "v%s [ci skip]" ;\
	yarn version --patch ;\
	\
	git add $(DOC_FOLDER) ;\
	git commit --amend --no-edit ;\
	\
	new_version=$$(cat package.json | jq -r '.version') ;\
	yarn publish --new-version $$new_version --access public \
		> $(RELEASE_PROXY_TARGET)

$(DOC_FILES): $(SOURCE_FILES)
	make reset-docs! ;\
	yarn typedoc

# -- reset! --

reset:
	@echo "Are you sure? - please run 'reset!' to confirm."

reset!:
	rm -rf $(PROXY_FOLDER)

# -- dependencies --

$(PROXY_FOLDER):
	mkdir -p $(PROXY_FOLDER)

$(PROXY_FOLDER)/Brewfile: Brewfile
	$(call WHEN_IN,circleci,exit 0) ;\
	brew bundle --force \
		> $(PROXY_FOLDER)/Brewfile

Brewfile: # watch this file

$(PROXY_FOLDER)/yarn.lock: yarn.lock
	yarn install \
		> $(PROXY_FOLDER)/yarn.lock

yarn.lock: # watch this file

$(PROXY_FOLDER)/vscode-extensions.json: .vscode/extensions.json
	$(call WHEN_IN,circleci,exit 0) ;\
	cat .vscode/extensions.json |\
		jq -r '.recommendations | .[]' |\
		xargs -L 1 code --install-extension \
			> $(PROXY_FOLDER)/vscode-extensions.json

.vscode/extensions.json: # watch this file
