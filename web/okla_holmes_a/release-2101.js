function imagemap_okla_holmes_a() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"playing_a_part/-"+
(puzzle_solved["playing_a_part"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"yo_dawg_i_herd_you_like_puzzle_hunts/-"+
(puzzle_solved["yo_dawg_i_herd_you_like_puzzle_hunts"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"crank_it_up_to_7/-"+
(puzzle_solved["crank_it_up_to_7"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"winning_conditions/-"+
(puzzle_solved["winning_conditions"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"188,348,209,414\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"188,415,205,430\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"193,298,211,347\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"182,395,187,423\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />\n<area shape=\"rect\" coords=\"210,402,211,411\" alt=\"Playing a Part\" title=\"Playing a Part\" href=\"playing_a_part/\" />"+
"<area shape=\"rect\" coords=\"231,288,253,307\" alt=\"Yo Dawg, I Herd You Like Puzzle Hunts\" title=\"Yo Dawg, I Herd You Like Puzzle Hunts\" href=\"yo_dawg_i_herd_you_like_puzzle_hunts/\" />\n<area shape=\"rect\" coords=\"229,308,253,336\" alt=\"Yo Dawg, I Herd You Like Puzzle Hunts\" title=\"Yo Dawg, I Herd You Like Puzzle Hunts\" href=\"yo_dawg_i_herd_you_like_puzzle_hunts/\" />\n<area shape=\"rect\" coords=\"221,387,249,431\" alt=\"Yo Dawg, I Herd You Like Puzzle Hunts\" title=\"Yo Dawg, I Herd You Like Puzzle Hunts\" href=\"yo_dawg_i_herd_you_like_puzzle_hunts/\" />\n<area shape=\"rect\" coords=\"226,350,250,386\" alt=\"Yo Dawg, I Herd You Like Puzzle Hunts\" title=\"Yo Dawg, I Herd You Like Puzzle Hunts\" href=\"yo_dawg_i_herd_you_like_puzzle_hunts/\" />\n<area shape=\"rect\" coords=\"227,337,251,349\" alt=\"Yo Dawg, I Herd You Like Puzzle Hunts\" title=\"Yo Dawg, I Herd You Like Puzzle Hunts\" href=\"yo_dawg_i_herd_you_like_puzzle_hunts/\" />"+
"<area shape=\"rect\" coords=\"274,331,299,346\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"272,347,299,414\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"276,276,303,330\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"272,415,296,430\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />\n<area shape=\"rect\" coords=\"269,371,271,426\" alt=\"Crank It Up To 7\" title=\"Crank It Up To 7\" href=\"crank_it_up_to_7/\" />"+
"<area shape=\"rect\" coords=\"429,244,474,282\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"425,283,473,324\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"423,325,472,388\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"423,389,471,430\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />\n<area shape=\"rect\" coords=\"422,372,422,401\" alt=\"Winning Conditions\" title=\"Winning Conditions\" href=\"winning_conditions/\" />"+
"</map>"+
'';
}
function puzzlelist_okla_holmes_a() {
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
"<a href=\"yo_dawg_i_herd_you_like_puzzle_hunts/\" class=\""+
(puzzle_solved["yo_dawg_i_herd_you_like_puzzle_hunts"]?"solved":"unsolved")+
"\">Yo Dawg, I Herd You Like Puzzle Hunts</a>"+
"</td>"+
"<td class=\"num\">6.</td>"+
"<td>"+
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
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">4.</td>"+
"<td>"+
"</td>"+
"<td class=\"num\">8.</td>"+
"<td>"+
"</td>"+
"</tr>"+
'';
}
function load_okla_holmes_a() {
document.getElementById('index-image').innerHTML = imagemap_okla_holmes_a();
document.getElementById('puzzle-list').innerHTML = puzzlelist_okla_holmes_a();
}