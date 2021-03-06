/* global require, describe, it */
'use strict';

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

	it( 'should throw an error if provided an accessor argument which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				hamming( 'beep', 'boop', value );
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

	it( 'should compute the Hamming distance using an accessor function', function test() {
		var dat1, dat2, expected, actual;

		dat1 = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		dat2 = [
			[1,3],
			[2,1],
			[3,5],
			[4,3],
			[5,7],
			[6,2]
		];

		actual = hamming( dat1, dat2, getValue );
		expected = 3;

		assert.strictEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			}
			return d[ 1 ];
		}
	});

});
