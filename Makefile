include .buildfiles/index.mk

.buildfiles/index.mk:
	git submodule add https://github.com/daniellacosse/typescript-buildfiles.git .buildfiles

# -- default --

CONFIG_FOLDER=configuration
CREDS=$(CONFIG_FOLDER)/credentials.yml
CRED_TEMPLATE=$(CONFIG_FOLDER)/credentials.example.yml

# yarn start
.PHONY: start
start: setup build
	node $(ARTIFACT_FOLDER)/source/cli.js $(CMD)

# yarn build
.PHONY: build
build: setup
	make $(CREDS) ;\
	make ENTRY=source/cli.ts RECIPE=parcel

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) $(call IF_ENV,,&& code $(CREDS))
