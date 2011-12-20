WCY=web/_config.yml
RSYNC_OPTS=-avcz --delete --delete-excluded --exclude="*~" --exclude=".git" --exclude="*.xcf" --exclude="solution*"

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

quoter: quoter-1.10/quoter.l
	$(MAKE) -C quoter-1.10
	cp quoter-1.10/quoter .

build:
	jekyll web web/_site

server:
	@echo "Surf to http://localhost:4001/"
	@cd web ; jekyll --server 4001 --auto

clean:
	$(RM) -rf web/_site web/_blind web/_stage

turn-on-%:
	@echo Turning on $*
	@sed -ie 's/No  # $*/Yes # $*/' $(WCY)
update-%: turn-on-%
	@$(RM) -rf web/_blind/$(CODENAME_$*)
	@jekyll web web/_blind/$(CODENAME_$*)

update-zipzee:
	$(RM) -rf web/_blind/zipzee
	@cp $(WCY) $(WCY).bak
	@mkdir -p web/_blind/zipzee
	$(MAKE) --no-print-directory turn-off-all
	@for r in 1S 1C 2S 2C 3S 3C 4S 4C 5S 5C 6S 6C ; do \
          $(MAKE) --no-print-directory turn-on-$$r ; \
        done
	$(MAKE) --no-print-directory update-6C
	find web/_blind -print0 | xargs -0 touch -t 201101131200 -c
	@cp $(WCY).bak $(WCY)
	rsync $(RSYNC_OPTS) -y --copy-dest=../../hunt-solutions/ web/_blind/zipzee/ ihtfp.us:/var/www/hunt/zipzee/

turn-off-all:
	@echo Turning all rounds off
	@sed -ie 's/Yes[ ]*\(# [1-6][SC]\)/No  \1/' $(WCY)
	@sed -ie 's/Yes[ ]*\(# solutions\)/No  \1/' $(WCY)

update-all:
	$(RM) -rf web/_blind
	@cp $(WCY) $(WCY).bak
	@mkdir web/_blind
	touch web/_blind/index.html
	$(MAKE) --no-print-directory turn-off-all
	@for r in 1S 1C 2S 2C 3S 3C 4S 4C 5S 5C 6S 6C ; do \
          $(MAKE) --no-print-directory update-$$r ; \
        done
	find web/_blind -print0 | xargs -0 touch -t 201101131200 -c
	@cp $(WCY).bak $(WCY)
	rsync $(RSYNC_OPTS) web/_blind/ ihtfp.us:/var/www/hunt/

ponies.sql: ponies.py fake-puzzle-names.csv
	./ponies.py sql > $@
ponymap.py: ponies.py fake-puzzle-names.csv
	./ponies.py python > $@

stage:
	@cp $(WCY) $(WCY).bak
	@echo Turning all rounds on
	@sed -ie 's/No[ ]*\(# [1-6][SC]\)/Yes \1/' $(WCY)
	@sed -ie 's/No[ ]*\(# solutions\)/Yes \1/' $(WCY)
	jekyll web web/_stage
	@cp $(WCY).bak $(WCY)
	rsync -avcz  --delete --delete-excluded --exclude="*~" --exclude=".git" --exclude="*.xcf" web/_stage/ ihtfp.us:/var/www/hunt-solutions/

staging: stage
