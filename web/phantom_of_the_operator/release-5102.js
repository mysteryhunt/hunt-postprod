function imagemap_phantom_of_the_operator() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"any_old_puzzle/-"+
(puzzle_solved["any_old_puzzle"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"set_theory/-"+
(puzzle_solved["set_theory"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"headstones/-"+
(puzzle_solved["headstones"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"general_knowledge/-"+
(puzzle_solved["general_knowledge"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"masquerade/-"+
(puzzle_solved["masquerade"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"course_7e/-"+
(puzzle_solved["course_7e"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"269,153,306,186\" alt=\"Any Old Puzzle\" title=\"Any Old Puzzle\" href=\"any_old_puzzle/\" />\n<area shape=\"rect\" coords=\"307,157,309,179\" alt=\"Any Old Puzzle\" title=\"Any Old Puzzle\" href=\"any_old_puzzle/\" />\n<area shape=\"rect\" coords=\"272,145,304,152\" alt=\"Any Old Puzzle\" title=\"Any Old Puzzle\" href=\"any_old_puzzle/\" />\n<area shape=\"rect\" coords=\"271,137,284,144\" alt=\"Any Old Puzzle\" title=\"Any Old Puzzle\" href=\"any_old_puzzle/\" />\n<area shape=\"rect\" coords=\"263,154,268,162\" alt=\"Any Old Puzzle\" title=\"Any Old Puzzle\" href=\"any_old_puzzle/\" />"+
"<area shape=\"rect\" coords=\"330,269,367,300\" alt=\"Set Theory\" title=\"Set Theory\" href=\"set_theory/\" />\n<area shape=\"rect\" coords=\"368,272,369,293\" alt=\"Set Theory\" title=\"Set Theory\" href=\"set_theory/\" />\n<area shape=\"rect\" coords=\"347,243,366,268\" alt=\"Set Theory\" title=\"Set Theory\" href=\"set_theory/\" />\n<area shape=\"rect\" coords=\"324,271,329,279\" alt=\"Set Theory\" title=\"Set Theory\" href=\"set_theory/\" />\n<area shape=\"rect\" coords=\"330,301,343,302\" alt=\"Set Theory\" title=\"Set Theory\" href=\"set_theory/\" />"+
"<area shape=\"rect\" coords=\"401,293,410,311\" alt=\"Headstones\" title=\"Headstones\" href=\"headstones/\" />\n<area shape=\"rect\" coords=\"400,312,410,352\" alt=\"Headstones\" title=\"Headstones\" href=\"headstones/\" />\n<area shape=\"rect\" coords=\"366,323,392,356\" alt=\"Headstones\" title=\"Headstones\" href=\"headstones/\" />\n<area shape=\"rect\" coords=\"393,314,399,351\" alt=\"Headstones\" title=\"Headstones\" href=\"headstones/\" />\n<area shape=\"rect\" coords=\"411,295,415,346\" alt=\"Headstones\" title=\"Headstones\" href=\"headstones/\" />"+
"<area shape=\"rect\" coords=\"439,351,472,379\" alt=\"General Knowledge\" title=\"General Knowledge\" href=\"general_knowledge/\" />\n<area shape=\"rect\" coords=\"439,380,464,384\" alt=\"General Knowledge\" title=\"General Knowledge\" href=\"general_knowledge/\" />\n<area shape=\"rect\" coords=\"447,346,471,350\" alt=\"General Knowledge\" title=\"General Knowledge\" href=\"general_knowledge/\" />\n<area shape=\"rect\" coords=\"449,338,463,345\" alt=\"General Knowledge\" title=\"General Knowledge\" href=\"general_knowledge/\" />\n<area shape=\"rect\" coords=\"432,352,438,361\" alt=\"General Knowledge\" title=\"General Knowledge\" href=\"general_knowledge/\" />"+
"<area shape=\"rect\" coords=\"568,405,593,419\" alt=\"Masquerade\" title=\"Masquerade\" href=\"masquerade/\" />\n<area shape=\"rect\" coords=\"564,420,593,452\" alt=\"Masquerade\" title=\"Masquerade\" href=\"masquerade/\" />\n<area shape=\"rect\" coords=\"594,408,602,441\" alt=\"Masquerade\" title=\"Masquerade\" href=\"masquerade/\" />\n<area shape=\"rect\" coords=\"569,394,585,404\" alt=\"Masquerade\" title=\"Masquerade\" href=\"masquerade/\" />\n<area shape=\"rect\" coords=\"558,421,563,429\" alt=\"Masquerade\" title=\"Masquerade\" href=\"masquerade/\" />"+
"<area shape=\"rect\" coords=\"612,436,618,445\" alt=\"Course 7E\" title=\"Course 7E\" href=\"course_7e/\" />\n<area shape=\"rect\" coords=\"619,427,637,457\" alt=\"Course 7E\" title=\"Course 7E\" href=\"course_7e/\" />\n<area shape=\"rect\" coords=\"638,424,656,450\" alt=\"Course 7E\" title=\"Course 7E\" href=\"course_7e/\" />\n<area shape=\"rect\" coords=\"657,421,668,446\" alt=\"Course 7E\" title=\"Course 7E\" href=\"course_7e/\" />\n<area shape=\"rect\" coords=\"618,460,631,468\" alt=\"Course 7E\" title=\"Course 7E\" href=\"course_7e/\" />\n<area shape=\"rect\" coords=\"669,420,680,434\" alt=\"Course 7E\" title=\"Course 7E\" href=\"course_7e/\" />"+
"</map>"+
'';
}
function puzzlelist_phantom_of_the_operator() {
  return ""+
"<tr>"+
"<td class=\"num\">1.</td>"+
"<td>"+
"<a href=\"any_old_puzzle/\" class=\""+
(puzzle_solved["any_old_puzzle"]?"solved":"unsolved")+
"\">Any Old Puzzle</a>"+
"</td>"+
"<td class=\"num\">6.</td>"+
"<td>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">2.</td>"+
"<td>"+
"</td>"+
"<td class=\"num\">7.</td>"+
"<td>"+
"<a href=\"masquerade/\" class=\""+
(puzzle_solved["masquerade"]?"solved":"unsolved")+
"\">Masquerade</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">3.</td>"+
"<td>"+
"<a href=\"set_theory/\" class=\""+
(puzzle_solved["set_theory"]?"solved":"unsolved")+
"\">Set Theory</a>"+
"</td>"+
"<td class=\"num\">8.</td>"+
"<td>"+
"<a href=\"course_7e/\" class=\""+
(puzzle_solved["course_7e"]?"solved":"unsolved")+
"\">Course 7E</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">4.</td>"+
"<td>"+
"<a href=\"headstones/\" class=\""+
(puzzle_solved["headstones"]?"solved":"unsolved")+
"\">Headstones</a>"+
"</td>"+
"<td class=\"num\">9.</td>"+
"<td>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">5.</td>"+
"<td>"+
"<a href=\"general_knowledge/\" class=\""+
(puzzle_solved["general_knowledge"]?"solved":"unsolved")+
"\">General Knowledge</a>"+
"</td>"+
"<td class=\"num\">10.</td>"+
"<td>"+
"</td>"+
"</tr>"+
'';
}
function load_phantom_of_the_operator() {
document.getElementById('index-image').innerHTML = imagemap_phantom_of_the_operator();
document.getElementById('puzzle-list').innerHTML = puzzlelist_phantom_of_the_operator();
}