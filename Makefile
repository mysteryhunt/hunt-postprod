build:
	jekyll web web/_site

stage:
	rsync -avz --exclude="*~" --exclude=".git" --exclude="*.xcf" web/_site/ ihtfp.us:/var/www/hunt/beta/
