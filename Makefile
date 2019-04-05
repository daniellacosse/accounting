
SHELL:=/bin/bash
GIT:=$(which git)
BREW:=$(which brew)

BREW_URL=https://raw.githubusercontent.com/Homebrew/install/master/install

CREDS=configuration/credentials.yml
CRED_TEMPLATE=configuration/credentials.example.yml

SOURCE=source
# ---
SOURCE_FOLDERS=$(find $(SOURCE) -type d)
SOURCE_FILES=$(find $(SOURCE) -type f -name '*')

# dependencies
DEPS=.cache/deps

BUILD=dist
# ---
BUILD_FOLDERS=$(find $(BUILD) -type d)
BUILD_FILES=$(find $(BUILD) -type f -name '*')

DOCS=documentation
APP_VERSION=$(cat package.json | jq -r '.version')

# we need to "unpack" these flags at buildtime with the "+s" function
BUILD_FLAGS=--target+node+--no-minify+--public-url+$$PWD/dist
+s=$(subst +, ,$1)

CLI_ENTRY_POINT=$(SOURCE)/cli.ts
CLI_BUILD=$(BUILD)/cli.js

TEST_ENTRY_POINT=$(SOURCE)/**/__tests__/*.test.ts

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
	clear-all \
	_deps

start: $(CLI_BUILD)
	node $(CLI_BUILD)

code: deps
	code $(SOURCE)

lint: $(GIT)
	changes=$$(git diff --name-only --staged | egrep '\.ts') ;\
	if [[ $$changes ]] ;\
		then yarn eslint $$changes ;\
	fi

test: $(BUILD_FILES)
	yarn ava

# TODO: this doesn't work, because of the ESModule + Parcel issue
# watch:
# 	yarn concurrently \
# 		'yarn parcel watch $(TEST_ENTRY_POINT) $(call +s, $(BUILD_FLAGS))' \
# 		'yarn ava --watch'

patch: $(GIT) $(DOCS)
	yarn config set version-git-message "v%s [ci skip]" ;\
	yarn version --patch

release: 
	yarn publish --access public

clear-deps:
	rm -rf node_modules ;\
	rm -rf $(DEPS) ;\
	rm yarn.lock

clear-build:
	rm -rf $(BUILD)

clear-docs:
	rm -rf $(DOCS)

clear-all: clear-deps clear-build clear-docs

# -- files --
$(CREDS): $(CRED_TEMPLATE_PATH)
	cp $(CRED_TEMPLATE) $(CREDS) && code $(CREDS)

$(CLI_BUILD): _deps $(CREDS) $(SOURCE_FILES) $(SOURCE_FOLDERS)
	yarn parcel build $(CLI_ENTRY_POINT) $(call +s, $(BUILD_FLAGS))

# parcel doesn't support ESModules, which AVA runs
# to get around this, we prepend each generated file with a `parcelRequire` declaration
$(BUILD_FILES): _deps $(SOURCE_FILES) $(SOURCE_FOLDERS)
	yarn parcel build $(TEST_ENTRY_POINT) $(call +s, $(BUILD_FLAGS)) ;\
	find dist -name "*.test.js" | xargs -L 1 sed -i.old '1s;^;var parcelRequire = undefined\; \
	;'

$(DOCS): _deps $(SOURCE_FILES) $(SOURCE_FOLDERS)
	yarn typedoc

# we store previous dependency installs in a temporary folder
# to decide if we need to retrigger them
_deps:
	mkdir -p $(DEPS) ;\
	make -s $(DEPS)/last_brew ;\
	make -s $(DEPS)/last_yarn ;\
	make -s $(DEPS)/last_code ;\
	echo -e 'done'

$(DEPS)/last_code: .vscode/extensions.json
	echo -e 'installing vscode extensions...' ;\
	cat .vscode/extensions.json |\
	jq -r '.recommendations | .[]' |\
	xargs -L 1 code --install-extension \
		> $(DEPS)/last_code 2>&1

$(DEPS)/last_yarn: yarn.lock
	echo -e 'installing node modules...' ;\
	yarn install \
		> $(DEPS)/last_yarn 2>&1

$(DEPS)/last_brew: Brewfile
	echo -e 'installing system dependencies...' ;\
	brew bundle \
		> $(DEPS)/last_brew 2>&1

# these targets have no real dependencies (but we need to track their edit history)
.vscode/extensions.json:
yarn.lock:
Brewfile: $(BREW)

# -- tools --
$(GIT):
	xcode-select --install ;\

	until [ "$$(which git)" ] ;\ 
		sleep 1 ;\
	done

$(BREW):
	/usr/bin/ruby -e $$(curl -fsSL $(BREW_URL))
