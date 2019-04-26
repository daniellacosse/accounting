-include .env

# credentials
CREDS=configuration/credentials.yml
CRED_TEMPLATE=configuration/credentials.example.yml

# dependencies
SHELL:=/bin/bash

# if git or brew are not found, we still need a handle to reference them by while building,
# e.g. `nogit`, `nobrew`
GIT=$(if $(shell which git), $(shell which git), nogit)
BREW=$(if $(shell which brew), $(shell which brew), nobrew)

BREW_URL=https://raw.githubusercontent.com/Homebrew/install/master/install

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

APP_VERSION:=$(shell cat package.json | jq -r '.version')

# -- commands --
.PHONY: start \
	code \
	lint \
	test \
	coverage \
	watch \
	patch \
	release \
	flush-deps \
	flush-build \
	flush-docs \
	flush

start: $(CLI_BUILD)
	node $(CLI_BUILD) $(CMD)

code: $(DEP_FILES)
	code .

lint: $(GIT)
	changes=$$(git diff --diff-filter=MA HEAD^ --name-only --staged | egrep '\.ts') ;\
	if [[ $$changes ]] ;\
		then yarn eslint $$changes ;\
	fi

test:
	if [ "$(ENV)" == "ci" ]; then TEST_FLAGS=--bail; fi ;\
	yarn jest $$TEST_FLAGS

coverage:
	yarn jest --coverage

watch:
	yarn jest --watch

patch: $(GIT) $(DOC_FOLDERS_AND_FILES)
	yarn config set version-git-message "v%s [ci skip]" ;\
	yarn version --patch ;\
	git add $(DOCS) ;\
	git commit --amend --no-edit

release: 
	yarn publish --new-version $(APP_VERSION) --access public

flush-deps:
	rm -rf node_modules ;\
	rm -rf $(DEP_FOLDER) ;\
	rm yarn.lock

flush-build:
	rm -rf $(BUILD)

flush-docs:
	rm -rf $(DOCS)

flush: flush-deps flush-build flush-docs

# -- files --	
$(CLI_BUILD): $(SOURCE_FOLDERS_AND_FILES) | $(DEP_FILES) $(CREDS)
	yarn parcel build $(CLI_ENTRY_POINT) --target node

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) ;\
	if [ "$(ENV)" != "ci" ]; then code $(CREDS); fi

$(DOC_FOLDERS_AND_FILES): $(SOURCE_FOLDERS_AND_FILES) $(DEP_FILES)
	yarn typedoc

# -- dependencies --

# we store previous dependency installs in a temporary folder
# to decide if we need to retrigger them
$(DEP_FOLDER):
	mkdir -p $(DEP_FOLDER)

Brewfile: | $(BREW) $(DEP_FOLDER) $(DEP_FOLDER)/last_brew

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
