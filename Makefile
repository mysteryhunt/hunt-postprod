build:
	jekyll web web/_site

server:
	@echo "Surf to http://localhost:4001/"
	@cd web ; jekyll --server 4001 --auto

clean:
	$(RM) -rf web/_site

beta: # for blind solvers
	rsync -avz --delete --delete-excluded --exclude="*~" --exclude=".git" --exclude="*.xcf" --exclude="solution*" web/_site/ ihtfp.us:/var/www/hunt/beta/

stage:
	rsync -avz --exclude="*~" --exclude=".git" --exclude="*.xcf" web/_site/ ihtfp.us:/var/www/hunt/staging/
staging: stage
