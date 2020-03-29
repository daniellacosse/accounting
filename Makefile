include .buildfiles/index.mk

.buildfiles/index.mk:
	git submodule add https://github.com/daniellacosse/typescript-buildfiles.git .buildfiles

# -- default --

CONFIG_FOLDER=configuration
CREDS=$(CONFIG_FOLDER)/credentials.yml
CRED_TEMPLATE=$(CONFIG_FOLDER)/credentials.example.yml

CLI_APP=$(APPLICATION_FOLDER)/cli
CLI_APP_ENTRYPOINT=$(CLI_APP)/index.ts
CLI_BUILD=$(ARTIFACT_FOLDER)/$(CLI_APP)/index.js

# yarn start
.PHONY: start
start: setup build
	node $(CLI_BUILD) $(CMD)

# yarn build
.PHONY: build
build: setup
	make $(CREDS) ;\
	make ENTRY=$(CLI_APP_ENTRYPOINT) RECIPE=parcel

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) $(call IF_ENV,,&& code $(CREDS))
