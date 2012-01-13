function load_subpages() {
    var works = [[ "letters_from_max_and_leo", this.letters_from_max_and_leo ],
		 [ "memos_from_the_management", this.memos_from_the_management ],
		 [ "events", this.events ]];
    for (var i=0; i<works.length; i++) {
	var ul = document.getElementById(works[i][0]);
	if (!ul) continue;
	var links = '';
	var list_of_things = works[i][1];
	for (var j=0; j<list_of_things.length; j++) {
	    var title = list_of_things[j][0];
	    var url = works[i][0] + '/' + list_of_things[j][1];
	    links += '<li><a href="'+url+'">'+title+'</a></li>\n';
	}
	ul.innerHTML = links;
    }
}
