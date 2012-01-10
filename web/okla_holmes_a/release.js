function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"playing_a_part/-"+
(puzzle_solved["playing_a_part"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"granny_smith/-"+
(puzzle_solved["granny_smith"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"crank_it_up_to_7/-"+
(puzzle_solved["crank_it_up_to_7"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"paper_trail/-"+
(puzzle_solved["paper_trail"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"winning_conditions/-"+
(puzzle_solved["winning_conditions"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"zugzwaang/-"+
(puzzle_solved["zugzwaang"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"baby_sniffles/-"+
(puzzle_solved["baby_sniffles"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"188,348,209,414\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"188,415,205,430\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"193,298,211,347\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"182,395,187,423\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"210,402,211,411\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />"+
"<area shape=\"rect\" coords=\"231,288,253,307\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"229,308,253,336\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"221,387,249,431\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"226,350,250,386\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />\n<area shape=\"rect\" coords=\"227,337,251,349\" alt=\"Granny Smith\" title=\"Granny Smith\" href=\"granny_smith/\" />"+
"<area shape=\"rect\" coords=\"274,331,299,346\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"272,347,299,414\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"276,276,303,330\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"272,415,296,430\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"269,371,271,426\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />"+
"<area shape=\"rect\" coords=\"341,347,372,426\" alt=\"Paper Trail\" title=\"Paper Trail\" href=\"paper_trail/\" />\n<area shape=\"rect\" coords=\"347,427,360,430\" alt=\"Paper Trail\" title=\"Paper Trail\" href=\"paper_trail/\" />\n<area shape=\"rect\" coords=\"342,292,376,346\" alt=\"Paper Trail\" title=\"Paper Trail\" href=\"paper_trail/\" />\n<area shape=\"rect\" coords=\"344,260,378,291\" alt=\"Paper Trail\" title=\"Paper Trail\" href=\"paper_trail/\" />\n<area shape=\"rect\" coords=\"338,373,340,426\" alt=\"Paper Trail\" title=\"Paper Trail\" href=\"paper_trail/\" />"+
"<area shape=\"rect\" coords=\"429,244,474,282\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"425,283,473,324\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"423,325,472,388\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"423,389,471,430\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"422,372,422,401\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />"+
"<area shape=\"rect\" coords=\"520,234,583,293\" alt=\"Zugzwaang\" title=\"Zugzwaang\" href=\"zugzwaang/\" />\n<area shape=\"rect\" coords=\"518,294,582,317\" alt=\"Zugzwaang\" title=\"Zugzwaang\" href=\"zugzwaang/\" />\n<area shape=\"rect\" coords=\"515,343,578,428\" alt=\"Zugzwaang\" title=\"Zugzwaang\" href=\"zugzwaang/\" />\n<area shape=\"rect\" coords=\"516,318,580,342\" alt=\"Zugzwaang\" title=\"Zugzwaang\" href=\"zugzwaang/\" />\n<area shape=\"rect\" coords=\"542,429,554,430\" alt=\"Zugzwaang\" title=\"Zugzwaang\" href=\"zugzwaang/\" />"+
"<area shape=\"rect\" coords=\"635,363,636,427\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"637,331,709,429\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"638,266,715,330\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"642,223,718,265\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />\n<area shape=\"rect\" coords=\"660,430,708,432\" alt=\"Baby Sniffles\" title=\"Baby Sniffles\" href=\"baby_sniffles/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td class=\"num\">1.</td>"+
"<td>"+
"<a href=\"playing_a_part/\" class=\""+
(puzzle_solved["playing_a_part"]?"solved":"unsolved")+
"\">Playing a Part</a>"+
"</td>"+
"<td class=\"num\">5.</td>"+
"<td>"+
"<a href=\"winning_conditions/\" class=\""+
(puzzle_solved["winning_conditions"]?"solved":"unsolved")+
"\">Winning Conditions</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">2.</td>"+
"<td>"+
"<a href=\"granny_smith/\" class=\""+
(puzzle_solved["granny_smith"]?"solved":"unsolved")+
"\">Granny Smith</a>"+
"</td>"+
"<td class=\"num\">6.</td>"+
"<td>"+
"<a href=\"zugzwaang/\" class=\""+
(puzzle_solved["zugzwaang"]?"solved":"unsolved")+
"\">Zugzwaang</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">3.</td>"+
"<td>"+
"<a href=\"crank_it_up_to_7/\" class=\""+
(puzzle_solved["crank_it_up_to_7"]?"solved":"unsolved")+
"\">Crank It Up To 7</a>"+
"</td>"+
"<td class=\"num\">7.</td>"+
"<td>"+
"<a href=\"baby_sniffles/\" class=\""+
(puzzle_solved["baby_sniffles"]?"solved":"unsolved")+
"\">Baby Sniffles</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">4.</td>"+
"<td>"+
"<a href=\"paper_trail/\" class=\""+
(puzzle_solved["paper_trail"]?"solved":"unsolved")+
"\">Paper Trail</a>"+
"</td>"+
"<td class=\"num\">8.</td>"+
"<td>"+
"</td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}