build:
	jekyll web web/_site

server:
	@echo "Surf to http://localhost:4001/"
	@cd web ; jekyll --server 4001 --auto

clean:
	$(RM) -rf web/_site

stage:
	rsync -avz --exclude="*~" --exclude=".git" --exclude="*.xcf" web/_site/ ihtfp.us:/var/www/hunt/beta/
