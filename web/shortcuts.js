this.depth=this.depth || '../';
var shortcuts=document.createElement('div');
shortcuts.innerHTML=(
'<div id="shortcuts" href="#">Shortcuts'+
'<ul class="menu">'+
'  <li><a href="'+this.depth+'">Home</a></li>'+
(this.up_title ?
 ('  <li>&gt;&nbsp;<a href="..">'+this.up_title+'</a></li>'):'')+
'  <li><a href="'+this.depth+'main/intro/">Introduction</a></li>'+
'  <li><a href="#">Contact HQ</a></li>'+
'  <li><a href="#">Events</a></li>'+
'  <li><a href="#">Answer Board</a></li>'+
'  <li><a href="#">Achievements</a></li>'+
'  <li><a href="#">Updates</a></li>'+
'</ul>'+
'</div>'+
'<a id="check-answer" href="'+this.depth+'check-answer.cgi">Call in answer</a>'+
'');
var checkAnswer = shortcuts.children[1];
shortcuts = shortcuts.children[0];
document.body.appendChild(shortcuts);
document.body.appendChild(checkAnswer);
