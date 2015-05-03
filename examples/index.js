'use strict';

var hamming = require( './../lib' );

var a = 'this is a string.',
	b = 'thiz iz a string.';

console.log( hamming( a, b ) );
// returns 2

var c = [ 5, 23, 2, 5, 9 ],
	d = [ 3, 21, 2, 5, 14 ];

console.log( hamming( c, d ) );
// returns 3
