---
# ensure that we use the templating engine for this file
---
this.depth=this.depth || '../';
this.points = this.points || 0;
this.bupkis = this.bupkis || 0;
if (this.next_unlock_time !== null && this.next_unlock_time !== undefined) {
  this.when = new Date(this.next_unlock_time*1000).toLocaleTimeString();
} else {
  this.when = "never";
}
var shortcuts=document.createElement('div');
shortcuts.innerHTML=(
'<div id="shortcuts" onclick=";"><span>Shortcuts</span>'+
'<ul class="menu">'+
'  <li><a href="'+this.depth+'">Home</a></li>'+
(this.up_title ?
 ('  <li>&gt;&nbsp;<a href="..">'+this.up_title+'</a></li>'):'')+
'  <li><a href="'+this.depth+'memos_from_the_management/introduction/">Introduction</a></li>'+
'  <li><a href="'+this.depth+'contact_hq/">Contact HQ</a></li>'+
'{% if false %}  <li><a href="'+this.depth+'events/">Events</a></li>{% endif %}'+
'{% if false %}  <li><a href="'+this.depth+'nominations/">Nominations</a></li>{% endif %}'+
'  <li><a href="'+this.depth+'memos_from_the_management/">From the Management</a></li>'+
'  <li><a href="'+this.depth+'allpuzzles.html">Puzzle Index</a></li>'+
'  <hr />'+
'  <div class="chutzpah">Chutzpah: '+this.points+'</div>'+
'  <div class="unlock">Next unlock: '+this.when+'</div>'+
'  <div class="bupkis">Bupkis: '+this.bupkis+'</div>'+
'</ul>'+
'</div>'+
{% if site.release.solutions %}
'<a id="check-answer" href="solution/">Solution</a>'+
{% else %}
'<a id="check-answer" href="'+this.depth+'callin?puzzle='+this.puzzlehash+'">Call in answer</a>'+
{% endif %}
'');
var checkAnswer = shortcuts.children[1];
shortcuts = shortcuts.children[0];
document.body.appendChild(shortcuts);
document.body.appendChild(checkAnswer);
