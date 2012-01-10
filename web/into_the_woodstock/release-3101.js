function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"braeburn/-"+
(puzzle_solved["braeburn"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"bubbles/-"+
(puzzle_solved["bubbles"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"dawn_of_a_new_era/-"+
(puzzle_solved["dawn_of_a_new_era"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"the_answers_are_somehow_connected/-"+
(puzzle_solved["the_answers_are_somehow_connected"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"163,245,249,296\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"250,259,253,287\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"172,297,244,316\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"185,317,229,352\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"171,242,188,244\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />"+
"<area shape=\"rect\" coords=\"198,381,249,459\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"195,460,249,469\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"264,372,292,477\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"250,379,263,474\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"293,376,300,425\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />"+
"<area shape=\"rect\" coords=\"112,313,172,360\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"173,326,178,355\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"130,276,176,306\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"126,307,160,312\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"118,361,136,363\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />"+
"<area shape=\"rect\" coords=\"299,163,302,200\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"303,153,345,210\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"346,158,373,206\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"306,211,341,237\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"313,148,336,152\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td>"+
"<a href=\"braeburn/\" class=\""+
(puzzle_solved["braeburn"]?"solved":"unsolved")+
"\">Braeburn</a>"+
"</td>"+
"<td>"+
"<a href=\"dawn_of_a_new_era/\" class=\""+
(puzzle_solved["dawn_of_a_new_era"]?"solved":"unsolved")+
"\">Dawn of a New Era</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td>"+
"<a href=\"bubbles/\" class=\""+
(puzzle_solved["bubbles"]?"solved":"unsolved")+
"\">Bubbles</a>"+
"</td>"+
"<td>"+
"<a href=\"the_answers_are_somehow_connected/\" class=\""+
(puzzle_solved["the_answers_are_somehow_connected"]?"solved":"unsolved")+
"\">The Answers Are Somehow Connected</a>"+
"</td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}