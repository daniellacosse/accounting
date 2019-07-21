include .buildfiles/main.mk .buildfiles/commands/*.mk

# -- default --

PACKAGE_ENTRY_FILENAME=cli

CREDS=$(CONFIG_FOLDER)/credentials.yml
CRED_TEMPLATE=$(CONFIG_FOLDER)/credentials.example.yml

default: $(PROXY_FOLDER)
	make $(CREDS) ;\
	make $(PACKAGE_BUILD) ;\
	node $(PACKAGE_BUILD) $(CMD)

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) ;\
	$(call IF_ENV,,code $(CREDS))
