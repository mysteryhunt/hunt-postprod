/*
 A Succinct Trie for Javascript

 By Steve Hanov
 Released to the public domain.

 This file contains functions for creating a succinctly encoded trie structure
 from a list of words. The trie is encoded to a succinct bit string using the
 method of Jacobson (1989). The bitstring is then encoded using BASE-64. 
 
 The resulting trie does not have to be decoded to be used. This file also
 contains functions for looking up a word in the BASE-64 encoded data, in
 O(mlogn) time, where m is the number of letters in the target word, and n is
 the number of nodes in the trie.
*/   

// Configure the bit writing and reading functions to work natively in BASE-64 
// encoding. That way, we don't have to convert back and forth to bytes.

var BASE64 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";


/**
    The width of each unit of the encoding, in bits. Here we use 6, for base-64
    encoding.
 */
var W = 6;

/**
    Returns the character unit that represents the given value. If this were
    binary data, we would simply return id.
 */
function CHR(id) 
{
    return BASE64[id];
}

/** 
    Returns the decimal value of the given character unit.
 */
function ORD(ch) 
{
    return BASE64.indexOf(ch);
}

/**
    Fixed values for the L1 and L2 table sizes in the Rank Directory
*/
var L1 = 32*32;
var L2 = 32;

/**
    Given a string of data (eg, in BASE-64), the BitString class supports
    reading or counting a number of bits from an arbitrary position in the
    string.
*/
function BitString( str )
{
    this.init( str );
}

BitString.MaskTop = [ 
    0x3f, 0x1f, 0x0f, 0x07, 0x03, 0x01, 0x00 
];

BitString.BitsInByte = [ 
    0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2,
    3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3,
    3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3,
    4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4,
    3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5,
    6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4,
    4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5,
    6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5,
    3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3,
    4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6,
    6, 7, 6, 7, 7, 8 
];


BitString.prototype = {
    init: function( str ) {
        this.bytes = str;
        this.length = this.bytes.length * W;
    },

    /**
      Returns the internal string of bytes
    */
    getData: function() {
        return this.bytes;
    },

    /**
        Returns a decimal number, consisting of a certain number, n, of bits
        starting at a certain position, p.
     */
    get: function( p, n ) {

        // case 1: bits lie within the given byte
        if ( ( p % W ) + n <= W ) {
            return ( ORD( this.bytes[ p / W | 0 ] ) & BitString.MaskTop[ p % W ] ) >> 
                ( W - p % W - n );

        // case 2: bits lie incompletely in the given byte
        } else {
            var result = ( ORD( this.bytes[ p / W | 0 ] ) & 
                BitString.MaskTop[ p % W ] );

            var l = W - p % W;
            p += l;
            n -= l;

            while ( n >= W ) {
                result = (result << W) | ORD( this.bytes[ p / W | 0 ] );
                p += W;
                n -= W;
            }

            if ( n > 0 ) {
                result = (result << n) | ( ORD( this.bytes[ p / W | 0 ] ) >> 
                    ( W - n ) );
            }

            return result;
        }
    },

    /**
        Counts the number of bits set to 1 starting at position p and
        ending at position p + n
     */
    count: function( p, n ) {

        var count = 0;
        while( n >= 8 ) {
            count += BitString.BitsInByte[ this.get( p, 8 ) ];
            p += 8;
            n -= 8;
        }

        return count + BitString.BitsInByte[ this.get( p, n ) ];
    },

    /**
        Returns the number of bits set to 1 up to and including position x.
        This is the slow implementation used for testing.
    */
    rank: function( x ) {
        var rank = 0;
        for( var i = 0; i <= x; i++ ) {
            if ( this.get(i, 1) ) {
                rank++;
            }
        }

        return rank;
    }
};

/**
    The rank directory allows you to build an index to quickly compute the
    rank() and select() functions. The index can itself be encoded as a binary
    string.
 */
function RankDirectory( directoryData, bitData, numBits, l1Size, l2Size )
{
    this.init(directoryData, bitData, numBits, l1Size, l2Size);
}

/**
    Used to build a rank directory from the given input string.

    @param data A javascript string containing the data, as readable using the
    BitString object.

    @param numBits The number of bits to index.
    
    @param l1Size The number of bits that each entry in the Level 1 table
    summarizes. This should be a multiple of l2Size.

    @param l2Size The number of bits that each entry in the Level 2 table
    summarizes.
 */
RankDirectory.Create = function( data, numBits, l1Size, l2Size ) {
    var bits = new BitString( data );
    var p = 0;
    var i = 0;
    var count1 = 0, count2 = 0;
    var l1bits = Math.ceil( Math.log( numBits ) / Math.log(2) );
    var l2bits = Math.ceil( Math.log( l1Size ) / Math.log(2) );

    var directory = new BitWriter();

    while( p + l2Size <= numBits ) {
        count2 += bits.count( p, l2Size );
        i += l2Size;
        p += l2Size;
        if ( i === l1Size ) {
            count1 += count2;
            directory.write( count1, l1bits );
            count2 = 0;
            i = 0;
        } else {
            directory.write( count2, l2bits );
        }
    }

    return new RankDirectory( directory.getData(), data, numBits, l1Size, l2Size );
};


RankDirectory.prototype = {

    init: function( directoryData, bitData, numBits, l1Size, l2Size ) {
        this.directory = new BitString( directoryData );
        this.data = new BitString( bitData );
        this.l1Size = l1Size;
        this.l2Size = l2Size;
        this.l1Bits = Math.ceil( Math.log( numBits ) / Math.log( 2 ) );
        this.l2Bits = Math.ceil( Math.log( l1Size ) / Math.log( 2 ) );
        this.sectionBits = (l1Size / l2Size - 1) * this.l2Bits + this.l1Bits;
        this.numBits = numBits;
    },

    /**
        Returns the string representation of the directory.
     */
    getData: function() {
        return this.directory.getData();
    },

    /**
      Returns the number of 1 or 0 bits (depending on the "which" parameter) to
      to and including position x.
      */
    rank: function( which, x ) {

        if ( which === 0 ) {
            return x - this.rank( 1, x ) + 1;
        }

        var rank = 0;              
        var o = x;
        var sectionPos = 0;

        if ( o >= this.l1Size ) {
            sectionPos = ( o / this.l1Size | 0 ) * this.sectionBits;
            rank = this.directory.get( sectionPos - this.l1Bits, this.l1Bits );
            o = o % this.l1Size;
        }

        if ( o >= this.l2Size ) {
            sectionPos += ( o / this.l2Size | 0 ) * this.l2Bits;
            rank += this.directory.get( sectionPos - this.l2Bits, this.l2Bits );
        }

        rank += this.data.count( x - x % this.l2Size, x % this.l2Size + 1 );

        return rank;
    },

    /**
      Returns the position of the y'th 0 or 1 bit, depending on the "which"
      parameter.
      */
    select: function( which, y ) {
        var high = this.numBits;
        var low = -1;
        var val = -1;

        while ( high - low > 1 ) {
            var probe = (high + low) / 2 | 0;
            var r = this.rank( which, probe );

            if ( r === y ) {
                // We have to continue searching after we have found it,
                // because we want the _first_ occurrence.
                val = probe;
                high = probe;
            } else if ( r < y ) {
                low = probe;
            } else {
                high = probe;
            }
        }

        return val;
    }
};

/**
  This class is used for traversing the succinctly encoded trie.
  */
function FrozenTrieNode( trie, index, letter, final, firstChild, childCount )
{
    this.trie = trie;
    this.index = index;
    this.letter = letter;
    this.final = final;
    this.firstChild = firstChild;
    this.childCount = childCount;
}

FrozenTrieNode.prototype = {
    /**
      Returns the number of children.
      */
    getChildCount: function()
    {
        return this.childCount;
    },

    /**
      Returns the FrozenTrieNode for the given child.

      @param index The 0-based index of the child of this node. For example, if
      the node has 5 children, and you wanted the 0th one, pass in 0.
    */
    getChild: function(index) 
    {
        return this.trie.getNodeByIndex( this.firstChild + index );
    }
};

/**
    The FrozenTrie is used for looking up words in the encoded trie.

    @param data A string representing the encoded trie.

    @param directoryData A string representing the RankDirectory. The global L1
    and L2 constants are used to determine the L1Size and L2size.

    @param nodeCount The number of nodes in the trie.
  */
function FrozenTrie( data, directoryData, nodeCount )
{
    this.init( data, directoryData, nodeCount );
}

FrozenTrie.prototype = {
    init: function( data, directoryData, nodeCount )
    {
        this.data = new BitString( data );
        this.directory = new RankDirectory( directoryData, data, 
                nodeCount * 2 + 1, L1, L2 );

        // The position of the first bit of the data in 0th node. In non-root
        // nodes, this would contain 6-bit letters.
        this.letterStart = nodeCount * 2 + 1;
    },

    /**
       Retrieve the FrozenTrieNode of the trie, given its index in level-order.
       This is a private function that you don't have to use.
      */
    getNodeByIndex: function( index )
    {
        // retrieve the 6-bit letter.
        var final = this.data.get( this.letterStart + index * 6, 1 ) === 1;
        var letter = String.fromCharCode(
                this.data.get( this.letterStart + index * 6 + 1, 5 ) + 
                'a'.charCodeAt(0));
        var firstChild = this.directory.select( 0, index+1 ) - index;

        // Since the nodes are in level order, this nodes children must go up
        // until the next node's children start.
        var childOfNextNode = this.directory.select( 0, index + 2 ) - index - 1;

        return new FrozenTrieNode( this, index, letter, final, firstChild,
                childOfNextNode - firstChild );
    },

    /**
      Retrieve the root node. You can use this node to obtain all of the other
      nodes in the trie.
      */
    getRoot: function()
    {
        return this.getNodeByIndex( 0 );
    },

    /**
      Look-up a word in the trie. Returns true if and only if the word exists
      in the trie.
      */
    lookup: function( word ) 
    {
        var node = this.getRoot();
        for ( var i = 0; i < word.length; i++ ) {
            var child;
            var j = 0;
            for ( ; j < node.getChildCount(); j++ ) {
                child = node.getChild( j );
                if ( child.letter === word[i] ) {
                    break;
                }
            }

            if ( j === node.getChildCount() ) {
                return false;
            }
            node = child;
        }

        return node.final;
    }
};
