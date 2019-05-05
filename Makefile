-include .env

# credentials
CREDS=configuration/credentials.yml
CRED_TEMPLATE=configuration/credentials.example.yml

# dependencies
SHELL:=/bin/bash
WHEN_IN=if [[ "$(ENV)" == "$(1)" ]]; then $(2); fi

DEP_FOLDER=.cache/deps
DEP_FILES= \
	$(DEP_FOLDER)/last_brew \
	$(DEP_FOLDER)/last_yarn \
	$(DEP_FOLDER)/last_code

# source code
SOURCE_FOLDER=source
SOURCE_FOLDERS_AND_FILES:=$(shell find $(SOURCE_FOLDER) -type d) \
	$(shell find $(SOURCE_FOLDER) -type f -name '*')

# build
BUILD_FOLDER=dist
CLI_ENTRY_POINT=$(SOURCE_FOLDER)/cli.ts
CLI_BUILD=$(BUILD_FOLDER)/cli.js

# config
CONFIG_FOLDER=configuration
CONFIG_FOLDERS_AND_FILES:=tsconfig.json $(shell find $(CONFIG_FOLDER) -type d) \
	$(shell find $(CONFIG_FOLDER) -type f -name '*')

# tests
TEST_COVERAGE_FOLDER=coverage
TEST_RESULTS=$(BUILD_FOLDER)/.jest-test-results.json

# documentation
DOC_FOLDER=documentation
DOC_FOLDERS_AND_FILES:=$(shell find $(DOC_FOLDER) -type d) \
	$(shell find $(DOC_FOLDER) -type f -name '*')

# ci
CI_CONFIG=.circleci/config.yml
LOCAL_CI_CONFIG=$(BUILD_FOLDER)/config.local.yml

# -- commands --
.PHONY: default \
	branch \
	lint \
	test \
	watch \
	coverage \
	ci \
	release! \

	flush-build! flush-ci! flush-coverage! flush-deps! flush-docs! flush-tmp! \
	flush-all!

default: $(CLI_BUILD) $(DEP_FILES)
	node $(CLI_BUILD) $(CMD)

branch:
	git checkout master ;\
	git pull ;\
	git checkout -b $(NAME)

lint: $(DEP_FILES)
	diff_target="HEAD^ --staged" ;\
	current_branch=$$(git rev-parse --abbrev-ref HEAD) ;\
	$(call WHEN_IN,circleci,diff_target=master...$$current_branch) ;\
	\
	changes=$$(git diff --diff-filter=MA $$diff_target --name-only | egrep '\.ts') ;\
	if [[ $$changes ]]; then yarn eslint $$changes; fi

test: $(DEP_FILES) $(BUILD_FOLDER)
	$(call WHEN_IN,circleci,flags=--bail) ;\
	yarn jest $$flags --json --outputFile=$(TEST_RESULTS)

watch: $(DEP_FILES)
	yarn jest --watch

coverage: $(DEP_FILES)
	yarn jest --coverage

ci: $(LOCAL_CI_CONFIG) $(DEP_FILES)
	circleci local execute --job $(JOB) --config $(LOCAL_CI_CONFIG)

release!: $(DOC_FOLDERS_AND_FILES) $(DEP_FILES)
	yarn config set version-git-message "v%s [ci skip]" ;\
	yarn version --patch ;\
	\
	git add $(DOC_FOLDER) ;\
	git commit --amend --no-edit ;\
	\
	new_version=$$(cat package.json | jq -r '.version') ;\
	yarn publish --new-version $$new_version --access public

flush-deps!:
	rm -rf node_modules ;\
	rm -rf $(DEP_FOLDER)

flush-build!:
	rm -rf $(BUILD_FOLDER)

flush-docs!:
	rm -rf $(DOC_FOLDER)

flush-ci!:
	rm -rf $(LOCAL_CI_CONFIG)

flush-coverage!:
	rm -rf $(TEST_COVERAGE_FOLDER)

flush-tmp!: flush-deps! flush-build! flush-ci! flush-coverage!
	rm -rf .cache

flush-all!: flush-tmp! flush-docs!

# -- files --

$(BUILD_FOLDER):
	mkdir -p $(BUILD_FOLDER)

$(CLI_BUILD): $(DEP_FILES) $(BUILD_FOLDER) $(SOURCE_FOLDERS_AND_FILES) $(CONFIG_FOLDERS_AND_FILES) $(CREDS)
	$(call WHEN_IN,,flags=--no-minify) ;\
	yarn parcel build $(CLI_ENTRY_POINT) $$flags --target node --public-url $$PWD/$(BUILD_FOLDER)

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) ;\
	$(call WHEN_IN,,code $(CREDS))

$(DOC_FOLDERS_AND_FILES): $(DEP_FILES) $(SOURCE_FOLDERS_AND_FILES)
	make flush-docs ;\
	yarn typedoc

$(LOCAL_CI_CONFIG): $(DEP_FILES) $(CI_CONFIG)
	circleci config process $(CI_CONFIG) > $(LOCAL_CI_CONFIG)

# -- dependencies --

# we store previous dependency installs in a temporary folder
# to decide if we need to retrigger them
$(DEP_FOLDER):
	mkdir -p $(DEP_FOLDER)

$(DEP_FOLDER)/last_brew: $(DEP_FOLDER) Brewfile
	$(call WHEN_IN,circleci,exit 0) ;\
	brew bundle \
		> $(DEP_FOLDER)/last_brew 2>&1

$(DEP_FOLDER)/last_yarn: $(DEP_FOLDER) yarn.lock
	yarn install \
		> $(DEP_FOLDER)/last_yarn 2>&1

$(DEP_FOLDER)/last_code: $(DEP_FOLDER) .vscode/extensions.json
	$(call WHEN_IN,circleci,exit 0) ;\
	cat .vscode/extensions.json |\
	jq -r '.recommendations | .[]' |\
	xargs -L 1 code --install-extension \
		> $(DEP_FOLDER)/last_code 2>&1
