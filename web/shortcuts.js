---
# ensure that we use the templating engine for this file
---
this.depth=this.depth || '../';
var shortcuts=document.createElement('div');
shortcuts.innerHTML=(
'<div id="shortcuts" onclick=";"><span>Shortcuts</span>'+
'<ul class="menu">'+
'  <li><a href="'+this.depth+'">Home</a></li>'+
(this.up_title ?
 ('  <li>&gt;&nbsp;<a href="..">'+this.up_title+'</a></li>'):'')+
'  <li><a href="'+this.depth+'memos_from_the_management/introduction/">Introduction</a></li>'+
'  <li><a href="'+this.depth+'contact_hq/">Contact HQ</a></li>'+
'  <li><a href="'+this.depth+'events">Events</a></li>'+
'  <li><a href="'+this.depth+'nominations/">Nominations</a></li>'+
'  <li><a href="'+this.depth+'memos_from_the_management/">Updates</a></li>'+
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
