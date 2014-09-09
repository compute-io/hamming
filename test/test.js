
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	hamming = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-hamming', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( hamming ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided two strings or two arrays', function test() {
		var values = [
				5,
				true,
				undefined,
				null,
				NaN,
				function(){},
				{}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i], 'a' ) ).to.throw( TypeError );
			expect( badValue( 'a', values[i] ) ).to.throw( TypeError );
		}
		function badValue( val1, val2 ) {
			return function() {
				hamming( val1, val2 );
			};
		}
	});

	it( 'should throw an error if the two input arguments are not the same type', function test() {
		expect( badValue( 'abcd', [1,2,3,4] ) ).to.throw( TypeError );
		expect( badValue( [1,2,3,4], 'abcd' ) ).to.throw( TypeError );
		function badValue( val1, val2 ) {
			return function() {
				hamming( val1, val2 );
			};
		}
	});

	it( 'should throw an error if the two input arguments are not the same length', function test() {
		expect( badValue( 'abcde', 'abcd' ) ).to.throw( Error );
		function badValue( val1, val2 ) {
			return function() {
				hamming( val1, val2 );
			};
		}
	});

	it( 'should compute the Hamming distance', function test() {
		var dat1, dat2, expected;

		dat1 = [ 2, 4, 5, 3, 8, 2 ];
		dat2 = [ 3, 1, 5, 3, 7, 2 ];
		expected = 3;

		assert.strictEqual( hamming( dat1, dat2 ), expected );

		dat1 = 'abcdef';
		dat2 = 'accddf';
		expected = 2;

		assert.strictEqual( hamming( dat1, dat2 ), expected );

		dat1 = 'abcdef';
		dat2 = 'abcdef';
		expected = 0;

		assert.strictEqual( hamming( dat1, dat2 ), expected );
	});

});