function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"apple_spice/-"+
(puzzle_solved["apple_spice"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"cookin/-"+
(puzzle_solved["cookin"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"i_ll_teach_you/-"+
(puzzle_solved["i_ll_teach_you"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"makefiles/-"+
(puzzle_solved["makefiles"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"44,356,109,433\" alt=\"Apple Spice\" title=\"Apple Spice\" href=\"apple_spice/\" />\n<area shape=\"rect\" coords=\"56,434,109,455\" alt=\"Apple Spice\" title=\"Apple Spice\" href=\"apple_spice/\" />\n<area shape=\"rect\" coords=\"37,314,86,355\" alt=\"Apple Spice\" title=\"Apple Spice\" href=\"apple_spice/\" />\n<area shape=\"rect\" coords=\"110,385,131,406\" alt=\"Apple Spice\" title=\"Apple Spice\" href=\"apple_spice/\" />\n<area shape=\"rect\" coords=\"30,386,43,433\" alt=\"Apple Spice\" title=\"Apple Spice\" href=\"apple_spice/\" />"+
"<area shape=\"rect\" coords=\"435,304,479,315\" alt=\"Cookin&rsquo;\" title=\"Cookin&rsquo;\" href=\"cookin/\" />\n<area shape=\"rect\" coords=\"447,316,473,318\" alt=\"Cookin&rsquo;\" title=\"Cookin&rsquo;\" href=\"cookin/\" />\n<area shape=\"rect\" coords=\"433,319,482,330\" alt=\"Cookin&rsquo;\" title=\"Cookin&rsquo;\" href=\"cookin/\" />\n<area shape=\"rect\" coords=\"425,291,467,303\" alt=\"Cookin&rsquo;\" title=\"Cookin&rsquo;\" href=\"cookin/\" />\n<area shape=\"rect\" coords=\"450,331,482,345\" alt=\"Cookin&rsquo;\" title=\"Cookin&rsquo;\" href=\"cookin/\" />"+
"<area shape=\"rect\" coords=\"230,362,254,364\" alt=\"I&rsquo;ll Teach You\" title=\"I&rsquo;ll Teach You\" href=\"i_ll_teach_you/\" />\n<area shape=\"rect\" coords=\"217,365,257,399\" alt=\"I&rsquo;ll Teach You\" title=\"I&rsquo;ll Teach You\" href=\"i_ll_teach_you/\" />\n<area shape=\"rect\" coords=\"195,345,216,409\" alt=\"I&rsquo;ll Teach You\" title=\"I&rsquo;ll Teach You\" href=\"i_ll_teach_you/\" />\n<area shape=\"rect\" coords=\"217,400,243,422\" alt=\"I&rsquo;ll Teach You\" title=\"I&rsquo;ll Teach You\" href=\"i_ll_teach_you/\" />\n<area shape=\"rect\" coords=\"181,363,194,387\" alt=\"I&rsquo;ll Teach You\" title=\"I&rsquo;ll Teach You\" href=\"i_ll_teach_you/\" />\n<area shape=\"rect\" coords=\"218,427,232,436\" alt=\"I&rsquo;ll Teach You\" title=\"I&rsquo;ll Teach You\" href=\"i_ll_teach_you/\" />"+
"<area shape=\"rect\" coords=\"163,33,335,71\" alt=\"Makefiles\" title=\"Makefiles\" href=\"makefiles/\" />\n<area shape=\"rect\" coords=\"156,72,324,89\" alt=\"Makefiles\" title=\"Makefiles\" href=\"makefiles/\" />\n<area shape=\"rect\" coords=\"195,0,341,32\" alt=\"Makefiles\" title=\"Makefiles\" href=\"makefiles/\" />\n<area shape=\"rect\" coords=\"155,90,281,105\" alt=\"Makefiles\" title=\"Makefiles\" href=\"makefiles/\" />\n<area shape=\"rect\" coords=\"253,106,300,150\" alt=\"Makefiles\" title=\"Makefiles\" href=\"makefiles/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td>"+
"<a href=\"apple_spice/\" class=\""+
(puzzle_solved["apple_spice"]?"solved":"unsolved")+
"\">Apple Spice</a>"+
"</td>"+
"<td>"+
"<a href=\"i_ll_teach_you/\" class=\""+
(puzzle_solved["i_ll_teach_you"]?"solved":"unsolved")+
"\">I&rsquo;ll Teach You</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td>"+
"<a href=\"cookin/\" class=\""+
(puzzle_solved["cookin"]?"solved":"unsolved")+
"\">Cookin&rsquo;</a>"+
"</td>"+
"<td>"+
"<a href=\"makefiles/\" class=\""+
(puzzle_solved["makefiles"]?"solved":"unsolved")+
"\">Makefiles</a>"+
"</td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}