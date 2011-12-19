function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"playing_a_part/-"+
(puzzle_solved["playing_a_part"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"granny_smith/-"+
(puzzle_solved["granny_smith"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"starsong/-"+
(puzzle_solved["starsong"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"paper_trail/-"+
(puzzle_solved["paper_trail"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"melody/-"+
(puzzle_solved["melody"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"desert_rose/-"+
(puzzle_solved["desert_rose"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"baby_sniffles/-"+
(puzzle_solved["baby_sniffles"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"188,348,209,414\" alt=\"Fluttershy\" title=\"Fluttershy\" href=\"fluttershy/\" />\n<area shape=\"rect\" coords=\"188,415,205,430\" alt=\"Fluttershy\" title=\"Fluttershy\" href=\"fluttershy/\" />\n<area shape=\"rect\" coords=\"193,298,211,347\" alt=\"Fluttershy\" title=\"Fluttershy\" href=\"fluttershy/\" />\n<area shape=\"rect\" coords=\"182,395,187,423\" alt=\"Fluttershy\" title=\"Fluttershy\" href=\"fluttershy/\" />\n<area shape=\"rect\" coords=\"210,402,211,411\" alt=\"Fluttershy\" title=\"Fluttershy\" href=\"fluttershy/\" />"+
"<area shape=\"rect\" coords=\"231,288,253,307\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"229,308,253,336\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"221,387,249,431\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"226,350,250,386\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"227,337,251,349\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />"+
"<area shape=\"rect\" coords=\"274,331,299,346\" alt=\"Starsong\" title=\"Starsong\" href=\"starsong/\" />\n<area shape=\"rect\" coords=\"272,347,299,414\" alt=\"Starsong\" title=\"Starsong\" href=\"starsong/\" />\n<area shape=\"rect\" coords=\"276,276,303,330\" alt=\"Starsong\" title=\"Starsong\" href=\"starsong/\" />\n<area shape=\"rect\" coords=\"272,415,296,430\" alt=\"Starsong\" title=\"Starsong\" href=\"starsong/\" />\n<area shape=\"rect\" coords=\"269,371,271,426\" alt=\"Starsong\" title=\"Starsong\" href=\"starsong/\" />"+
"<area shape=\"rect\" coords=\"341,347,372,426\" alt=\"Coconut Cream\" title=\"Coconut Cream\" href=\"coconut_cream/\" />\n<area shape=\"rect\" coords=\"347,427,360,430\" alt=\"Coconut Cream\" title=\"Coconut Cream\" href=\"coconut_cream/\" />\n<area shape=\"rect\" coords=\"342,292,376,346\" alt=\"Coconut Cream\" title=\"Coconut Cream\" href=\"coconut_cream/\" />\n<area shape=\"rect\" coords=\"344,260,378,291\" alt=\"Coconut Cream\" title=\"Coconut Cream\" href=\"coconut_cream/\" />\n<area shape=\"rect\" coords=\"338,373,340,426\" alt=\"Coconut Cream\" title=\"Coconut Cream\" href=\"coconut_cream/\" />"+
"<area shape=\"rect\" coords=\"429,244,474,282\" alt=\"Melody\" title=\"Melody\" href=\"melody/\" />\n<area shape=\"rect\" coords=\"425,283,473,324\" alt=\"Melody\" title=\"Melody\" href=\"melody/\" />\n<area shape=\"rect\" coords=\"423,325,472,388\" alt=\"Melody\" title=\"Melody\" href=\"melody/\" />\n<area shape=\"rect\" coords=\"423,389,471,430\" alt=\"Melody\" title=\"Melody\" href=\"melody/\" />\n<area shape=\"rect\" coords=\"422,372,422,401\" alt=\"Melody\" title=\"Melody\" href=\"melody/\" />"+
"<area shape=\"rect\" coords=\"520,234,583,293\" alt=\"Desert Rose\" title=\"Desert Rose\" href=\"desert_rose/\" />\n<area shape=\"rect\" coords=\"518,294,582,317\" alt=\"Desert Rose\" title=\"Desert Rose\" href=\"desert_rose/\" />\n<area shape=\"rect\" coords=\"515,343,578,428\" alt=\"Desert Rose\" title=\"Desert Rose\" href=\"desert_rose/\" />\n<area shape=\"rect\" coords=\"516,318,580,342\" alt=\"Desert Rose\" title=\"Desert Rose\" href=\"desert_rose/\" />\n<area shape=\"rect\" coords=\"542,429,554,430\" alt=\"Desert Rose\" title=\"Desert Rose\" href=\"desert_rose/\" />"+
"<area shape=\"rect\" coords=\"635,363,636,427\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"637,331,709,429\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"638,266,715,330\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"642,223,718,265\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"660,430,708,432\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td class=\"num\">1.</td>"+
"<td><a href=\"playing_a_part/\" class=\""+
(puzzle_solved["playing_a_part"]?"solved":"unsolved")+
"\">Playing a Part</a></td>"+
"<td class=\"num\">5.</td>"+
"<td><a href=\"melody/\" class=\""+
(puzzle_solved["melody"]?"solved":"unsolved")+
"\">Melody</a></td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">2.</td>"+
"<td><a href=\"granny_smith/\" class=\""+
(puzzle_solved["granny_smith"]?"solved":"unsolved")+
"\">Granny Smith</a></td>"+
"<td class=\"num\">6.</td>"+
"<td><a href=\"desert_rose/\" class=\""+
(puzzle_solved["desert_rose"]?"solved":"unsolved")+
"\">Desert Rose</a></td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">3.</td>"+
"<td><a href=\"starsong/\" class=\""+
(puzzle_solved["starsong"]?"solved":"unsolved")+
"\">Starsong</a></td>"+
"<td class=\"num\">7.</td>"+
"<td><a href=\"baby_sniffles/\" class=\""+
(puzzle_solved["baby_sniffles"]?"solved":"unsolved")+
"\">Baby Sniffles</a></td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">4.</td>"+
"<td><a href=\"paper_trail/\" class=\""+
(puzzle_solved["paper_trail"]?"solved":"unsolved")+
"\">Paper Trail</a></td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}