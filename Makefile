
SHELL:=/bin/bash
GIT:=$(which git)
BREW:=$(which brew)

BREW_URL=https://raw.githubusercontent.com/Homebrew/install/master/install

# credentials
CREDS=configuration/credentials.yml
CRED_TEMPLATE=configuration/credentials.example.yml

# dependencies
DEP_FOLDER=.cache/deps
DEP_FILES=Brewfile yarn.lock .vscode/extensions.json

# environment
ENV=$($$ENV)

# source code
SOURCE=source
# ---
SOURCE_FOLDERS_AND_FILES=$(find $(SOURCE) -type d) $(find $(SOURCE) -type f -name '*')

# build
BUILD=dist
# ---
CLI_ENTRY_POINT=$(SOURCE)/cli.ts
TEST_ENTRY_POINTS=$(find $(SOURCE) -type f -name '*.test.ts')

CLI_BUILD=$(BUILD)/cli.js
TEST_BUILD_FOLDERS_AND_FILES=$(BUILD)/file-scripts \
	$(BUILD)/trello-scripts \
	$(find $(BUILD) -type d -name '__tests__') \
	$(find $(BUILD) -type f -name '*.test.ts')

# documentation
DOCS=documentation
APP_VERSION=$(cat package.json | jq -r '.version')

# we need to "unpack" these flags at buildtime with the "+s" function
BUILD_FLAGS=--target+node+--no-minify+--public-url+$$PWD/dist
+s=$(subst +, ,$1)

# -- commands --
.PHONY: start \
	code \
	lint \
	test \
	watch \
	patch \
	release \
	clear-deps \
	clear-build \
	clear-docs \
	clear-all

start: $(CLI_BUILD) $(CREDS)
	node $(CLI_BUILD) ${CMD}

code: $(DEP_FILES)
	code .

lint: $(GIT)
	changes=$$(git diff --name-only --staged | egrep '\.ts') ;\
	if [[ $$changes ]] ;\
		then yarn eslint $$changes ;\
	fi

test: $(TEST_BUILD_FOLDERS_AND_FILES)
	yarn ava

# TODO - this doesn't work, because of the ESModule + Parcel issue
# watch:
# 	yarn concurrently \
# 		'yarn parcel watch $(TEST_ENTRY_POINTS) $(call +s, $(BUILD_FLAGS))' \
# 		'yarn ava --watch'

patch: $(GIT) $(DOCS)
	yarn config set version-git-message "v%s [ci skip]" ;\
	yarn version --patch ;\
	git add $(DOCS) ;\
	git commit --fixup --amend

release: 
	yarn publish --access public

clear-deps:
	rm -rf node_modules ;\
	rm -rf $(DEP_FOLDER) ;\
	rm yarn.lock

clear-build:
	rm -rf $(BUILD)

clear-docs:
	rm -rf $(DOCS)

clear-all: clear-deps clear-build clear-docs

# -- files --
$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) ;\
	if [ "$(ENV)" != "production" ]; then code $(CREDS); fi

$(CRED_TEMPLATE): # manually edited

$(CLI_BUILD): $(DEP_FILES) $(SOURCE_FOLDERS_AND_FILES)
	yarn parcel build $(CLI_ENTRY_POINT) $(call +s, $(BUILD_FLAGS))

# parcel doesn't support ESModules, which AVA runs
# to get around this, we prepend each generated file with a `parcelRequire` declaration, plus newline
$(TEST_BUILD_FOLDERS_AND_FILES): $(DEP_FILES) $(TEST_ENTRY_POINTS)
	yarn parcel build ./source/**/__tests__/**.test.ts $(call +s, $(BUILD_FLAGS)) ;\
	find dist -name "*.test.js" | xargs -L 1 sed -i.old '1s;^;var parcelRequire = undefined\; \
	;'

$(DOCS): $(DEP_FILES) $(SOURCE_FOLDERS_AND_FILES)
	yarn typedoc

# -- dependencies --

# we store previous dependency installs in a temporary folder
# to decide if we need to retrigger them
$(DEP_FOLDER):
	mkdir -p $(DEP_FOLDER)

Brewfile: $(BREW) $(DEP_FOLDER) $(DEP_FOLDER)/last_brew

$(DEP_FOLDER)/last_brew:
	if [ "$(ENV)" == "production" ]; then exit 0; fi ;\
	brew bundle \
		> $(DEP_FOLDER)/last_brew 2>&1

yarn.lock: $(DEP_FOLDER) $(DEP_FOLDER)/last_yarn

$(DEP_FOLDER)/last_yarn:
	if [ "$(ENV)" == "production" ]; then exit 0; fi ;\
	yarn install \
		> $(DEP_FOLDER)/last_yarn 2>&1

.vscode/extensions.json: $(DEP_FOLDER) $(DEP_FOLDER)/last_code

$(DEP_FOLDER)/last_code:
	if [ "$(ENV)" == "production" ]; then exit 0; fi ;\
	cat .vscode/extensions.json |\
	jq -r '.recommendations | .[]' |\
	xargs -L 1 code --install-extension \
		> $(DEP_FOLDER)/last_code 2>&1

# -- system tools --
$(GIT):
	xcode-select --install ;\

	until [ "$$(which git)" ] ;\ 
		sleep 1 ;\
	done

$(BREW):
	/usr/bin/ruby -e $$(curl -fsSL $(BREW_URL))
