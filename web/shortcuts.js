---
# ensure that we use the templating engine for this file
---
this.depth=this.depth || '../';
this.points = this.points || 0;
this.bupkis = this.bupkis || 0;
this.when = "12:32";
var shortcuts=document.createElement('div');
shortcuts.innerHTML=(
'<div id="shortcuts" onclick=";"><span>Shortcuts</span>'+
'<ul class="menu">'+
'  <li><a href="'+this.depth+'">Home</a></li>'+
(this.up_title ?
 ('  <li>&gt;&nbsp;<a href="..">'+this.up_title+'</a></li>'):'')+
'  <li><a href="'+this.depth+'memos_from_the_management/introduction.html">Introduction</a></li>'+
'  <li><a href="'+this.depth+'contact_hq/">Contact HQ</a></li>'+
'  <li><a href="'+this.depth+'events/">Events</a></li>'+
'  <li><a href="'+this.depth+'nominations/">Nominations</a></li>'+
'  <li><a href="'+this.depth+'memos_from_the_management/">From the Management</a></li>'+
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
