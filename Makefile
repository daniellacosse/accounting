BUILDFILES=.buildfiles

include $(BUILDFILES)/main.mk $(BUILDFILES)/commands/*.mk

override PACKAGE_ENTRY_FILENAME=cli

# -- default --

CREDS=$(CONFIG_FOLDER)/credentials.yml
CRED_TEMPLATE=$(CONFIG_FOLDER)/credentials.example.yml

default: $(PROXY_FOLDER)
	make $(CREDS) ;\
	make PACKAGE_ENTRY_FILENAME=cli $(PACKAGE_BUILD) ;\
	yarn account $(CMD)

$(CREDS): $(CRED_TEMPLATE)
	cp -f $(CRED_TEMPLATE) $(CREDS) $(call IF_ENV,,&& code $(CREDS))

$(BUILDFILES):
	git clone git@github.com:daniellacosse/typescript-buildfiles.git $(BUILDFILES)

# $(BUILDFILES)/main.mk $(BUILDFILES)/commands/*.mk: $(BUILDFILES)
# 	cd $(BUILDFILES) ;\
# 	git pull origin master ;\
# 	cd ..
