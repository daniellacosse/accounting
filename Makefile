-include .env

# credentials
CREDS=configuration/credentials.yml
CRED_TEMPLATE=configuration/credentials.example.yml

# dependencies
SHELL:=/bin/bash

DEP_FOLDER=.cache/deps
DEP_FILES=Brewfile yarn.lock .vscode/extensions.json

# source code
SOURCE=source
SOURCE_FOLDERS_AND_FILES:=$(shell find $(SOURCE) -type d) \
	$(shell find $(SOURCE) -type f -name '*')

# build
BUILD=dist
CLI_ENTRY_POINT=$(SOURCE)/cli.ts
CLI_BUILD=$(BUILD)/cli.js

# documentation
DOCS=documentation
DOC_FOLDERS_AND_FILES:=$(shell find $(DOCS) -type d) \
	$(shell find $(DOCS) -type f -name '*')

# ci
CI_CONFIG=.circleci/config.yml
LOCAL_CI_CONFIG=.circleci/config.local.yml

# -- commands --
.PHONY: default \
	branch \
	lint \
	test \
	watch \
	coverage \
	ci \
	release! \
	flush-deps! \
	flush-build! \
	flush-docs! \
	flush-ci! \
	flush-coverage! \
	flush-tmp! \
	flush-all!

default: $(CLI_BUILD) $(DEP_FILES)
	node $(CLI_BUILD) $(CMD)

branch:
	git checkout master ;\
	git pull ;\
	git checkout -b $(NAME)

lint: $(DEP_FILES)
	changes=$$(git diff --diff-filter=MA HEAD^ --name-only --staged | egrep '\.ts') ;\
	if [[ $$changes ]] ;\
		then yarn eslint $$changes ;\
	fi

test: $(DEP_FILES)
	if [ "$(ENV)" == "ci" ]; then TEST_FLAGS=--bail; fi ;\
	yarn jest $$TEST_FLAGS

watch: $(DEP_FILES)
	yarn jest --watch

coverage: $(DEP_FILES)
	yarn jest --coverage

ci: $(LOCAL_CI_CONFIG) $(DEP_FILES)
	circleci local execute --job $(JOB) --config $(LOCAL_CI_CONFIG)

release!: $(DOC_FOLDERS_AND_FILES) $(DEP_FILES)
	yarn config set version-git-message "v%s [ci skip]" ;\
	yarn version --patch ;\
	git add $(DOCS) ;\
	git commit --amend --no-edit ;\
	NEW_APP_VERSION=$$(cat package.json | jq -r '.version') ;\
	yarn publish --new-version $$NEW_APP_VERSION --access public

flush-deps!:
	rm -rf node_modules ;\
	rm -rf $(DEP_FOLDER) ;\
	rm yarn.lock

flush-build!:
	rm -rf $(BUILD)

flush-docs!:
	rm -rf $(DOCS)

flush-ci!:
	rm -rf $(LOCAL_CI_CONFIG)

flush-coverage!:
	rm -rf coverage

flush-tmp!: flush-deps flush-build flush-ci flush-coverage
flush-all!: flush-tmp flush-docs

# -- files --	
$(CLI_BUILD): $(SOURCE_FOLDERS_AND_FILES) | $(DEP_FILES) $(CREDS)
	yarn parcel build $(CLI_ENTRY_POINT) --target node

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) ;\
	if [ "$(ENV)" != "ci" ]; then code $(CREDS); fi

$(DOC_FOLDERS_AND_FILES): $(SOURCE_FOLDERS_AND_FILES) $(DEP_FILES)
	make flush-docs ;\
	yarn typedoc

$(LOCAL_CI_CONFIG): $(CI_CONFIG) $(DEP_FILES)
	circleci config process $(CI_CONFIG) > $(LOCAL_CI_CONFIG)

# -- dependencies --

# we store previous dependency installs in a temporary folder
# to decide if we need to retrigger them
$(DEP_FOLDER):
	mkdir -p $(DEP_FOLDER)

Brewfile: | $(DEP_FOLDER) $(DEP_FOLDER)/last_brew

$(DEP_FOLDER)/last_brew:
	if [ $(ENV) == "ci" ]; then exit 0; fi ;\
	brew bundle \
		> $(DEP_FOLDER)/last_brew 2>&1

yarn.lock: | $(DEP_FOLDER) $(DEP_FOLDER)/last_yarn

$(DEP_FOLDER)/last_yarn:
	yarn install \
		> $(DEP_FOLDER)/last_yarn 2>&1

.vscode/extensions.json: | $(DEP_FOLDER) $(DEP_FOLDER)/last_code

$(DEP_FOLDER)/last_code:
	if [ $(ENV) == "ci" ]; then exit 0; fi ;\
	cat .vscode/extensions.json |\
	jq -r '.recommendations | .[]' |\
	xargs -L 1 code --install-extension \
		> $(DEP_FOLDER)/last_code 2>&1
