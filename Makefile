
BUILDFILES=.buildfiles

include $(BUILDFILES)/main.mk $(BUILDFILES)/commands/*.mk

# -- default --

override PACKAGE_ENTRY_FILENAME=cli

CREDS=$(CONFIG_FOLDER)/credentials.yml
CRED_TEMPLATE=$(CONFIG_FOLDER)/credentials.example.yml

default: $(PROXY_FOLDER)
	make $(CREDS) ;\
	make PACKAGE_ENTRY_FILENAME=cli $(PACKAGE_BUILD) ;\
	yarn account $(CMD)

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) $(call IF_ENV,local,&& code $(CREDS))

$(BUILDFILES):
	mkdir -p $(BUILDFILES) ;\
	cd $(BUILDFILES) ;\
	git pull origin master ;\
	cd ..
