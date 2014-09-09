/**
*
*	COMPUTE: hamming
*
*
*	DESCRIPTION:
*		- Computes the Hamming distance between two sequences.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	/**
	* FUNCTION: hamming( a, b )
	*	Computes the Hamming distance between two sequences.
	*
	* @param {String|Array} a - array or string sequence
	* @param {String|Array} b - array or string sequence
	* @returns {Number} Hamming distance
	*/
	function hamming( a, b ) {
		var aType = typeof a,
			bType = typeof b,
			dist = 0,
			len;

		if ( !Array.isArray( a ) && aType !== 'string' ) {
			throw new TypeError( 'hamming()::invalid input argument. Sequence must be either an array or a string.' );
		}
		if ( !Array.isArray( b ) && bType !== 'string' ) {
			throw new TypeError( 'hamming()::invalid input argument. Sequence must be either an array or a string.' );
		}
		if ( aType !== bType ) {
			throw new TypeError( 'hamming()::invalid input arguments. Sequences must be the same type; i.e., both strings or both arrays.' );
		}
		len = a.length;
		if ( len !== b.length ) {
			throw new Error( 'hamming()::invalid input arguments. Sequences must be the same length.' );
		}
		for ( var i = 0; i < len; i++ ) {
			if ( a[i] !== b[i] ) {
				dist += 1;
			}
		}
		return dist;
	} // end FUNCTION hamming()


	// EXPORTS //

	module.exports = hamming;

})();