WCY=web/_config.yml
RSYNC_OPTS=-avz --delete --delete-excluded --exclude="*~" --exclude=".git" --exclude="*.xcf" --exclude="solution*"

CODENAME_1S=beachcomber
CODENAME_1C=ripple
CODENAME_2S=sealight
CODENAME_2C=seashimmer
CODENAME_3S=seawinkle
CODENAME_3C=surfrider
CODENAME_4S=sunshower
CODENAME_4C=waterlily
CODENAME_5S=wavedancer
CODENAME_5C=tiddlywink
CODENAME_6S=tralala
CODENAME_6C=zipzee

build:
	jekyll web web/_site

server:
	@echo "Surf to http://localhost:4001/"
	@cd web ; jekyll --server 4001 --auto

clean:
	$(RM) -rf web/_site web/_blind

update-%:
	@echo Turning on $*
	sed -ie 's/No  # $*/Yes # $*/' $(WCY)
	$(RM) -rf web/_site web/_blind/$(CODENAME_$*)
	jekyll web web/_site
	mv web/_site web/_blind/$(CODENAME_$*)

update-all: clean
	@cp $(WCY) $(WCY).bak
	@mkdir web/_blind
	touch web/_blind/index.html
	@echo Turning all rounds off
	@sed -ie 's/Yes[ ]*\(# [1-6][SC]\)/No  \1/' $(WCY)
	@for r in 1S 1C 2S 2C 3S 3C 4S 4C 5S 5C 6S 6C ; do \
          $(MAKE) update-$$r ; \
        done
	find web/_blind -print0 | xargs -0 touch -t 201201131200 -c
	@cp $(WCY).bak $(WCY)
	rsync $(RSYNC_OPTS) web/_blind/ ihtfp.us:/var/www/hunt/

stage:
	@cp $(WCY) $(WCY).bak
	@echo Turning all rounds on
	@sed -ie 's/No[ ]*\(# [1-6][SC]\)/Yes \1/' $(WCY)
	@echo XXX should turn solutions on as well
	jekyll web web/_site
	@cp $(WCY).bak $(WCY)
	rsync -avz --exclude="*~" --exclude=".git" --exclude="*.xcf" web/_site/ ihtfp.us:/var/www/hunt-solutions/

staging: stage
