// IF YOU ARE TEST SOLVING, DON'T LOOK AT THIS.

// javascript implementation
var guess_num;
var previous_guesses;
var violations;
var lockout = true;

var WINNING_MESSAGE =
    'NEAR is correct. Another way of saying "NEAR" is "<b>SO CLOSE</b>."';

function is_in_trie(trie, word) {
    var frtrie = new FrozenTrie(trie.trie, trie.directory, trie.nodeCount);
    return frtrie.lookup(word.toLowerCase());
}
function is_in_sowpods(word) {
    return is_in_trie(sowpods_words, word);
}
function anagrams_in_sowpods(word) {
    return is_in_trie(sowpods_anagrams, sorted_letters(word).toLowerCase()) ?
	2 : 0;
}
function _anagram_search(prefix, node, sorted, word) {
    var j, child, next, result;
    // this is a dictionary word.  is this an anagram?
    if (node.final) {
	//console.log('found', prefix);
	// is this an anagram?
	if (sorted_letters(prefix) == sorted &&
	    prefix != word) {
	    return prefix; // this is an anagram of the word
	}
    }
    // anagram can't be longer than base word
    if (prefix.length >= word.length) {
	return false;
    }
    // ok, maybe there are suffixes.  check them.
    for (j=0 ; j < node.getChildCount(); j++) {
	child = node.getChild(j);
	// rule out letters which aren't in the target word
	if (word.indexOf(child.letter) < 0) { continue; }
	// ok, look for words with this new prefix
	next = prefix + child.letter;
	result = _anagram_search(next, child, sorted, word);
	if (result) { return result; } // found one!
    }
    return false; // no anagram found here.
}

function look_for_anagram(word) {
    var trie = sowpods_words;
    var sorted = sorted_letters(word).toLowerCase();
    var frtrie = new FrozenTrie(trie.trie, trie.directory, trie.nodeCount);
    return _anagram_search('', frtrie.getRoot(), sorted, word.toLowerCase());
}
function sorted_letters(word) {
    var r = [];
    for (var i=0; i<word.length; i++) {
	r.push(word[i]);
    }
    r.sort();
    return r.join("");
}
function rot13(word) {
    word = word.toUpperCase();
    var r = '';
    for (var i=0; i<word.length; i++) {
	var c = word.charCodeAt(i);
	c += 13;
	if (c > "Z".charCodeAt(0)) c-=26;
	r += String.fromCharCode(c);
    }
    return r;
}

function BadGuess(rule, msg) {
    this.rule = rule;
    this.msg = msg;
}

function ruleA(guess) {
    if (guess in previous_guesses) {
	throw new BadGuess(
	    'A', 'Your guess must not be a repeat of a previous guess.');
    }
    previous_guesses[guess] = 1;
}
function ruleB(guess) {
    if (!is_in_sowpods(guess)) {
	throw new BadGuess(
	    'B', "Your guess must be a valid word in the <a href='sowpods.zip'>SOWPODS</a> list.");
    }
}
function ruleC(guess) {
    if (guess.length < 5) {
	throw new BadGuess(
	    'C', "Your guess must be at least 5 letters in length.");
    }
}
function ruleD(guess) {
    // at least three different letters.
    var letters = {}, count = 0;
    for (var i=0; i<guess.length; i++) {
	if (guess[i] in letters) { continue; }
	letters[guess[i]] = 1;
	count += 1;
    }
    if (count < 3) {
	throw new BadGuess(
	    'D', "Your guess must have at least 3 different letters.");
    }
}
function ruleE(guess) {
    // Your guess must not have any anagrams in the SOWPODS list
    if (anagrams_in_sowpods(guess) > 1) {
	var other = look_for_anagram(guess).toUpperCase();
	throw new BadGuess(
	    'E', "Your guess must not have any anagrams in the "+
		"<a href='sowpods.zip'>SOWPODS</a> "+
		"list. ("+other+" is an anagram of "+guess+".)");
    }
}
function ruleF(guess) {
    // Your guess must only contain letters found in the word "answer".
    for (var i=0; i<guess.length; i++) {
	if ("ANSWER".indexOf(guess[i]) < 0) {
	    throw new BadGuess('F', 'Your guess must only contain letters found in the word "ANSWER".');
	}
    }
}
function ruleG(guess) {
    // Your guess must only contain letters found in the word "wordplay".
    for (var i=0; i<guess.length; i++) {
	if ("WORDPLAY".indexOf(guess[i]) < 0) {
	    throw new BadGuess('G', 'Your guess must only contain letters found in the word "WORDPLAY".');
	}
    }
}
function ruleH(guess) {
    // Your guess must have the property that applying rot13 results in the same letters (in a different order, of course).
    var word1 = sorted_letters(guess);
    var word2 = sorted_letters(rot13(guess));
    if (word1 != word2) {
	throw new BadGuess('H', 'Your guess must produce an anagram of itself (not necessarily a valid word) when rot13 is applied.');
    }
}
function ruleI(guess) {
    // Your guess must have the property that moving its first letter to the end creates a valid word.
    var new_word = guess.substring(1) + guess[0];
    if (!is_in_sowpods(new_word)) {
	throw new BadGuess(
	    'I', 'Your guess must have the property that moving its first letter to the end creates a valid word in the <a href="sowpods.zip">SOWPODS</a> list.');
    }
}

function ruleJ(guess) {
    // there are no legal words satisfying this rule.
    throw new BadGuess('J', 'Your guess must contain a letter that appears 4 times consecutively.');
}

function isEven(n) {
    return (n%2) == 0;
}
function isPrime(n) {
    // quick-n-dirty algorithm
    if (n==1) return false; // note that 1 is NOT PRIME
    for (var i=2; i<n; i++) {
	if ((n % i) == 0) return false;
    }
    return true;
}
function isSquare(n) {
    // again, really ugly algorithm. Note that 1 IS SQUARE
    for (var i=1; i<=n; i++) {
	if (i*i == n) return true;
    }
    return false;
}
function isFibonacci(n) {
    var a=1, b=1, c; // a is the smaller, b is the larger
    while (b <= n) {
	if (n==b) return true;
	c = a + b;
	a = b;
	b = c;
    }
    return false;
}

function make_guess(guess) {
    guess = guess.toUpperCase();

    // ok, check guesses...
    try {
	ruleA(guess);
	ruleB(guess);

	if (isEven(guess_num)) {
	    ruleC(guess);
	} else {
	    ruleD(guess);
	}

	if (isPrime(guess_num)) {
	    ruleE(guess);
	} else {
	    ruleF(guess);
	}

	if (isSquare(guess_num)) {
	    ruleG(guess);
	} else {
	    ruleH(guess);
	}

	if (isFibonacci(guess_num)) {
	    ruleI(guess);
	} else {
	    ruleJ(guess);
	}

	// wow, success!
	return correctGuess(guess);
    
    } catch (e) {
	if (e instanceof BadGuess) return badGuess(guess, e.rule, e.msg);
	console.assert(false); // should never happen
	throw e;
    }
}
function correctGuess(guess) {
    clear_state();
    return { 'message': WINNING_MESSAGE };
}
function badGuess(guess, rule, msg) {
    violations[rule] = (violations[rule] || 0) + 1;
    var result = { 'attempts': guess_num,
		   'guess': guess,
		   'message': msg,
		   'rule': rule.charCodeAt(0)-64,
		   'violations': violations[rule] };
    guess_num++;
    if (violations[rule] == 3) { clear_state(); }
    return result;
}

function clear_state() {
    previous_guesses = {};
    violations = {};
    guess_num = 1;
}

function FakeServer() {
    this.clear();
}
FakeServer.prototype.query = function(args, callback) {
    var result = make_guess(args.guess);
    callback(result)
};
FakeServer.prototype.clear = function() {
    clear_state();
}

$.getScript('solution/word-list-encoded.js', function() {
    $.getScript('solution/Bits-small.js', function() {
	framework_ready(new FakeServer());
    });
});
