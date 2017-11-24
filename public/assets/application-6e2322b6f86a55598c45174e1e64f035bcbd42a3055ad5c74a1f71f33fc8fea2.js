/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*
 Highcharts JS v6.0.2 (2017-10-20)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(S,N){"object"===typeof module&&module.exports?module.exports=S.document?N(S):N:S.Highcharts=N(S)})("undefined"!==typeof window?window:this,function(S){var N=function(){var a=S.document,E=S.navigator&&S.navigator.userAgent||"",C=a&&a.createElementNS&&!!a.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,G=/(edge|msie|trident)/i.test(E)&&!S.opera,q=/Firefox/.test(E),f=q&&4>parseInt(E.split("Firefox/")[1],10);return S.Highcharts?S.Highcharts.error(16,!0):{product:"Highcharts",
version:"6.0.2",deg2rad:2*Math.PI/360,doc:a,hasBidiBug:f,hasTouch:a&&void 0!==a.documentElement.ontouchstart,isMS:G,isWebKit:/AppleWebKit/.test(E),isFirefox:q,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(E),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:C,win:S,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){a.timers=[];var E=a.charts,C=a.doc,G=a.win;a.error=function(q,f){q=a.isNumber(q)?"Highcharts error #"+
q+": www.highcharts.com/errors/"+q:q;if(f)throw Error(q);G.console&&console.log(q)};a.Fx=function(a,f,k){this.options=f;this.elem=a;this.prop=k};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],k=[],t=this.now,m=a.length,v;if(1===t)k=this.toD;else if(m===f.length&&1>t)for(;m--;)v=parseFloat(a[m]),k[m]=isNaN(v)?a[m]:t*parseFloat(f[m]-v)+v;else k=f;this.elem.attr("d",k,null,!0)},update:function(){var a=this.elem,f=this.prop,k=this.now,t=this.options.step;if(this[f+"Setter"])this[f+
"Setter"]();else a.attr?a.element&&a.attr(f,k,null,!0):a.style[f]=k+this.unit;t&&t.call(a,k,this)},run:function(q,f,k){var t=this,m=t.options,v=function(a){return v.stopped?!1:t.step(a)},u=G.requestAnimationFrame||function(a){setTimeout(a,13)},d=function(){a.timers=a.grep(a.timers,function(a){return a()});a.timers.length&&u(d)};q===f?(delete m.curAnim[this.prop],m.complete&&0===a.keys(m.curAnim).length&&m.complete()):(this.startTime=+new Date,this.start=q,this.end=f,this.unit=k,this.now=this.start,
this.pos=0,v.elem=this.elem,v.prop=this.prop,v()&&1===a.timers.push(v)&&u(d))},step:function(q){var f=+new Date,k,t=this.options,m=this.elem,v=t.complete,u=t.duration,d=t.curAnim;m.attr&&!m.element?q=!1:q||f>=u+this.startTime?(this.now=this.end,this.pos=1,this.update(),k=d[this.prop]=!0,a.objectEach(d,function(a){!0!==a&&(k=!1)}),k&&v&&v.call(m),q=!1):(this.pos=t.easing((f-this.startTime)/u),this.now=this.start+(this.end-this.start)*this.pos,this.update(),q=!0);return q},initPath:function(q,f,k){function t(a){var c,
e;for(b=a.length;b--;)c="M"===a[b]||"L"===a[b],e=/[a-zA-Z]/.test(a[b+3]),c&&e&&a.splice(b+1,0,a[b+1],a[b+2],a[b+1],a[b+2])}function m(a,d){for(;a.length<e;){a[0]=d[e-a.length];var l=a.slice(0,c);[].splice.apply(a,[0,0].concat(l));z&&(l=a.slice(a.length-c),[].splice.apply(a,[a.length,0].concat(l)),b--)}a[0]="M"}function v(a,b){for(var d=(e-a.length)/c;0<d&&d--;)l=a.slice().splice(a.length/A-c,c*A),l[0]=b[e-c-d*c],n&&(l[c-6]=l[c-2],l[c-5]=l[c-1]),[].splice.apply(a,[a.length/A,0].concat(l)),z&&d--}f=
f||"";var u,d=q.startX,g=q.endX,n=-1<f.indexOf("C"),c=n?7:3,e,l,b;f=f.split(" ");k=k.slice();var z=q.isArea,A=z?2:1,I;n&&(t(f),t(k));if(d&&g){for(b=0;b<d.length;b++)if(d[b]===g[0]){u=b;break}else if(d[0]===g[g.length-d.length+b]){u=b;I=!0;break}void 0===u&&(f=[])}f.length&&a.isNumber(u)&&(e=k.length+u*A*c,I?(m(f,k),v(k,f)):(m(k,f),v(f,k)));return[f,k]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),
null,!0)};a.extend=function(a,f){var k;a||(a={});for(k in f)a[k]=f[k];return a};a.merge=function(){var q,f=arguments,k,t={},m=function(k,u){"object"!==typeof k&&(k={});a.objectEach(u,function(d,g){!a.isObject(d,!0)||a.isClass(d)||a.isDOMElement(d)?k[g]=u[g]:k[g]=m(k[g]||{},d)});return k};!0===f[0]&&(t=f[1],f=Array.prototype.slice.call(f,2));k=f.length;for(q=0;q<k;q++)t=m(t,f[q]);return t};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=
Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(q,f){return!!q&&"object"===typeof q&&(!f||!a.isArray(q))};a.isDOMElement=function(q){return a.isObject(q)&&"number"===typeof q.nodeType};a.isClass=function(q){var f=q&&q.constructor;return!(!a.isObject(q,!0)||a.isDOMElement(q)||!f||!f.name||"Object"===f.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,f){for(var k=a.length;k--;)if(a[k]===f){a.splice(k,
1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(q,f,k){var t;a.isString(f)?a.defined(k)?q.setAttribute(f,k):q&&q.getAttribute&&(t=q.getAttribute(f)):a.defined(f)&&a.isObject(f)&&a.objectEach(f,function(a,k){q.setAttribute(k,a)});return t};a.splat=function(q){return a.isArray(q)?q:[q]};a.syncTimeout=function(a,f,k){if(f)return setTimeout(a,f,k);a.call(0,k)};a.pick=function(){var a=arguments,f,k,t=a.length;for(f=0;f<t;f++)if(k=a[f],void 0!==k&&null!==k)return k};a.css=
function(q,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter="alpha(opacity\x3d"+100*f.opacity+")");a.extend(q.style,f)};a.createElement=function(q,f,k,t,m){q=C.createElement(q);var v=a.css;f&&a.extend(q,f);m&&v(q,{padding:0,border:"none",margin:0});k&&v(q,k);t&&t.appendChild(q);return q};a.extendClass=function(q,f){var k=function(){};k.prototype=new q;a.extend(k.prototype,f);return k};a.pad=function(a,f,k){return Array((f||2)+1-String(a).length).join(k||0)+a};a.relativeLength=function(a,f,k){return/%$/.test(a)?
f*parseFloat(a)/100+(k||0):parseFloat(a)};a.wrap=function(a,f,k){var q=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments),v=arguments,u=this;u.proceed=function(){q.apply(u,arguments.length?arguments:v)};a.unshift(q);a=k.apply(this,a);u.proceed=null;return a}};a.getTZOffset=function(q){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(q)||f.hcTimezoneOffset||0)};a.dateFormat=function(q,f,k){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||"";q=
a.pick(q,"%Y-%m-%d %H:%M:%S");var t=a.Date,m=new t(f-a.getTZOffset(f)),v=m[t.hcGetHours](),u=m[t.hcGetDay](),d=m[t.hcGetDate](),g=m[t.hcGetMonth](),n=m[t.hcGetFullYear](),c=a.defaultOptions.lang,e=c.weekdays,l=c.shortWeekdays,b=a.pad,t=a.extend({a:l?l[u]:e[u].substr(0,3),A:e[u],d:b(d),e:b(d,2," "),w:u,b:c.shortMonths[g],B:c.months[g],m:b(g+1),y:n.toString().substr(2,2),Y:n,H:b(v),k:v,I:b(v%12||12),l:v%12||12,M:b(m[t.hcGetMinutes]()),p:12>v?"AM":"PM",P:12>v?"am":"pm",S:b(m.getSeconds()),L:b(Math.round(f%
1E3),3)},a.dateFormats);a.objectEach(t,function(a,b){for(;-1!==q.indexOf("%"+b);)q=q.replace("%"+b,"function"===typeof a?a(f):a)});return k?q.substr(0,1).toUpperCase()+q.substr(1):q};a.formatSingle=function(q,f){var k=/\.([0-9])/,t=a.defaultOptions.lang;/f$/.test(q)?(k=(k=q.match(k))?k[1]:-1,null!==f&&(f=a.numberFormat(f,k,t.decimalPoint,-1<q.indexOf(",")?t.thousandsSep:""))):f=a.dateFormat(q,f);return f};a.format=function(q,f){for(var k="{",t=!1,m,v,u,d,g=[],n;q;){k=q.indexOf(k);if(-1===k)break;
m=q.slice(0,k);if(t){m=m.split(":");v=m.shift().split(".");d=v.length;n=f;for(u=0;u<d;u++)n&&(n=n[v[u]]);m.length&&(n=a.formatSingle(m.join(":"),n));g.push(n)}else g.push(m);q=q.slice(k+1);k=(t=!t)?"}":"{"}g.push(q);return g.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(q,f,k,t,m){var v,u=q;k=a.pick(k,1);v=q/k;f||(f=m?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===k?f=a.grep(f,function(a){return 0===a%1}):.1>=
k&&(f=[1/k])));for(t=0;t<f.length&&!(u=f[t],m&&u*k>=q||!m&&v<=(f[t]+(f[t+1]||f[t]))/2);t++);return u=a.correctFloat(u*k,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,f){var k=a.length,q,m;for(m=0;m<k;m++)a[m].safeI=m;a.sort(function(a,m){q=f(a,m);return 0===q?a.safeI-m.safeI:q});for(m=0;m<k;m++)delete a[m].safeI};a.arrayMin=function(a){for(var f=a.length,k=a[0];f--;)a[f]<k&&(k=a[f]);return k};a.arrayMax=function(a){for(var f=a.length,k=a[0];f--;)a[f]>k&&(k=a[f]);return k};a.destroyObjectProperties=
function(q,f){a.objectEach(q,function(a,t){a&&a!==f&&a.destroy&&a.destroy();delete q[t]})};a.discardElement=function(q){var f=a.garbageBin;f||(f=a.createElement("div"));q&&f.appendChild(q);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||14))};a.setAnimation=function(q,f){f.renderer.globalAnimation=a.pick(q,f.options.chart.animation,!0)};a.animObject=function(q){return a.isObject(q)?a.merge(q):{duration:q?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,
day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(q,f,k,t){q=+q||0;f=+f;var m=a.defaultOptions.lang,v=(q.toString().split(".")[1]||"").split("e")[0].length,u,d,g=q.toString().split("e");-1===f?f=Math.min(v,20):a.isNumber(f)||(f=2);d=(Math.abs(g[1]?g[0]:q)+Math.pow(10,-Math.max(f,v)-1)).toFixed(f);v=String(a.pInt(d));u=3<v.length?v.length%3:0;k=a.pick(k,m.decimalPoint);t=a.pick(t,m.thousandsSep);q=(0>q?"-":"")+(u?v.substr(0,u)+t:"");q+=v.substr(u).replace(/(\d{3})(?=\d)/g,
"$1"+t);f&&(q+=k+d.slice(-f));g[1]&&(q+="e"+g[1]);return q};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(q,f,k){if("width"===f)return Math.min(q.offsetWidth,q.scrollWidth)-a.getStyle(q,"padding-left")-a.getStyle(q,"padding-right");if("height"===f)return Math.min(q.offsetHeight,q.scrollHeight)-a.getStyle(q,"padding-top")-a.getStyle(q,"padding-bottom");G.getComputedStyle||a.error(27,!0);if(q=G.getComputedStyle(q,void 0))q=q.getPropertyValue(f),a.pick(k,"opacity"!==
f)&&(q=a.pInt(q));return q};a.inArray=function(q,f){return(a.indexOfPolyfill||Array.prototype.indexOf).call(f,q)};a.grep=function(q,f){return(a.filterPolyfill||Array.prototype.filter).call(q,f)};a.find=Array.prototype.find?function(a,f){return a.find(f)}:function(a,f){var k,t=a.length;for(k=0;k<t;k++)if(f(a[k],k))return a[k]};a.map=function(a,f){for(var k=[],t=0,m=a.length;t<m;t++)k[t]=f.call(a[t],a[t],t,a);return k};a.keys=function(q){return(a.keysPolyfill||Object.keys).call(void 0,q)};a.reduce=
function(q,f,k){return(a.reducePolyfill||Array.prototype.reduce).call(q,f,k)};a.offset=function(a){var f=C.documentElement;a=a.parentElement?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(G.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(G.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}};a.stop=function(q,f){for(var k=a.timers.length;k--;)a.timers[k].elem!==q||f&&f!==a.timers[k].prop||(a.timers[k].stopped=!0)};a.each=function(q,f,k){return(a.forEachPolyfill||Array.prototype.forEach).call(q,
f,k)};a.objectEach=function(a,f,k){for(var t in a)a.hasOwnProperty(t)&&f.call(k,a[t],t,a)};a.addEvent=function(q,f,k){var t=q.hcEvents=q.hcEvents||{},m=q.addEventListener||a.addEventListenerPolyfill;m&&m.call(q,f,k,!1);t[f]||(t[f]=[]);t[f].push(k);return function(){a.removeEvent(q,f,k)}};a.removeEvent=function(q,f,k){function t(d,n){var c=q.removeEventListener||a.removeEventListenerPolyfill;c&&c.call(q,d,n,!1)}function m(){var d,n;q.nodeName&&(f?(d={},d[f]=!0):d=u,a.objectEach(d,function(a,e){if(u[e])for(n=
u[e].length;n--;)t(e,u[e][n])}))}var v,u=q.hcEvents,d;u&&(f?(v=u[f]||[],k?(d=a.inArray(k,v),-1<d&&(v.splice(d,1),u[f]=v),t(f,k)):(m(),u[f]=[])):(m(),q.hcEvents={}))};a.fireEvent=function(q,f,k,t){var m;m=q.hcEvents;var v,u;k=k||{};if(C.createEvent&&(q.dispatchEvent||q.fireEvent))m=C.createEvent("Events"),m.initEvent(f,!0,!0),a.extend(m,k),q.dispatchEvent?q.dispatchEvent(m):q.fireEvent(f,m);else if(m)for(m=m[f]||[],v=m.length,k.target||a.extend(k,{preventDefault:function(){k.defaultPrevented=!0},target:q,
type:f}),f=0;f<v;f++)(u=m[f])&&!1===u.call(q,k)&&k.preventDefault();t&&!k.defaultPrevented&&t(k)};a.animate=function(q,f,k){var t,m="",v,u,d;a.isObject(k)||(d=arguments,k={duration:d[2],easing:d[3],complete:d[4]});a.isNumber(k.duration)||(k.duration=400);k.easing="function"===typeof k.easing?k.easing:Math[k.easing]||Math.easeInOutSine;k.curAnim=a.merge(f);a.objectEach(f,function(d,n){a.stop(q,n);u=new a.Fx(q,k,n);v=null;"d"===n?(u.paths=u.initPath(q,q.d,f.d),u.toD=f.d,t=0,v=1):q.attr?t=q.attr(n):
(t=parseFloat(a.getStyle(q,n))||0,"opacity"!==n&&(m="px"));v||(v=d);v&&v.match&&v.match("px")&&(v=v.replace(/px/g,""));u.run(t,v,m)})};a.seriesType=function(q,f,k,t,m){var v=a.getOptions(),u=a.seriesTypes;v.plotOptions[q]=a.merge(v.plotOptions[f],k);u[q]=a.extendClass(u[f]||function(){},t);u[q].prototype.type=q;m&&(u[q].prototype.pointClass=a.extendClass(a.Point,m));return u[q]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),f=0;return function(){return"highcharts-"+a+"-"+
f++}}();G.jQuery&&(G.jQuery.fn.highcharts=function(){var q=[].slice.call(arguments);if(this[0])return q[0]?(new (a[a.isString(q[0])?q.shift():"Chart"])(this[0],q[0],q[1]),this):E[a.attr(this[0],"data-highcharts-chart")]})})(N);(function(a){var E=a.each,C=a.isNumber,G=a.map,q=a.merge,f=a.pInt;a.Color=function(k){if(!(this instanceof a.Color))return new a.Color(k);this.init(k)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
parse:function(a){return[f(a[1]),f(a[2]),f(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[f(a[1]),f(a[2]),f(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(k){var f,m,v,u;if((this.input=k=this.names[k&&k.toLowerCase?k.toLowerCase():""]||k)&&k.stops)this.stops=G(k.stops,function(d){return new a.Color(d[1])});else if(k&&k.charAt&&"#"===k.charAt()&&(f=k.length,k=parseInt(k.substr(1),
16),7===f?m=[(k&16711680)>>16,(k&65280)>>8,k&255,1]:4===f&&(m=[(k&3840)>>4|(k&3840)>>8,(k&240)>>4|k&240,(k&15)<<4|k&15,1])),!m)for(v=this.parsers.length;v--&&!m;)u=this.parsers[v],(f=u.regex.exec(k))&&(m=u.parse(f));this.rgba=m||[]},get:function(a){var k=this.input,m=this.rgba,f;this.stops?(f=q(k),f.stops=[].concat(f.stops),E(this.stops,function(m,d){f.stops[d]=[f.stops[d][0],m.get(a)]})):f=m&&C(m[0])?"rgb"===a||!a&&1===m[3]?"rgb("+m[0]+","+m[1]+","+m[2]+")":"a"===a?m[3]:"rgba("+m.join(",")+")":k;
return f},brighten:function(a){var k,m=this.rgba;if(this.stops)E(this.stops,function(m){m.brighten(a)});else if(C(a)&&0!==a)for(k=0;3>k;k++)m[k]+=f(255*a),0>m[k]&&(m[k]=0),255<m[k]&&(m[k]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,f){var m=this.rgba,k=a.rgba;k.length&&m&&m.length?(a=1!==k[3]||1!==m[3],f=(a?"rgba(":"rgb(")+Math.round(k[0]+(m[0]-k[0])*(1-f))+","+Math.round(k[1]+(m[1]-k[1])*(1-f))+","+Math.round(k[2]+(m[2]-k[2])*(1-f))+(a?","+(k[3]+(m[3]-
k[3])*(1-f)):"")+")"):f=a.input||"none";return f}};a.color=function(k){return new a.Color(k)}})(N);(function(a){var E,C,G=a.addEvent,q=a.animate,f=a.attr,k=a.charts,t=a.color,m=a.css,v=a.createElement,u=a.defined,d=a.deg2rad,g=a.destroyObjectProperties,n=a.doc,c=a.each,e=a.extend,l=a.erase,b=a.grep,z=a.hasTouch,A=a.inArray,I=a.isArray,r=a.isFirefox,J=a.isMS,w=a.isObject,D=a.isString,M=a.isWebKit,p=a.merge,B=a.noop,H=a.objectEach,F=a.pick,h=a.pInt,x=a.removeEvent,R=a.stop,K=a.svg,P=a.SVG_NS,L=a.symbolSizes,
Q=a.win;E=a.SVGElement=function(){return this};e(E.prototype,{opacity:1,SVG_NS:P,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,h){this.element="span"===h?v(h):n.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(y,h,x){h=a.animObject(F(h,this.renderer.globalAnimation,!0));0!==h.duration?(x&&(h.complete=x),q(this,y,h)):(this.attr(y,null,x),h.step&&h.step.call(this));return this},
colorGradient:function(y,h,x){var b=this.renderer,e,O,d,l,g,K,n,z,L,r,w=[],m;y.radialGradient?O="radialGradient":y.linearGradient&&(O="linearGradient");O&&(d=y[O],g=b.gradients,n=y.stops,r=x.radialReference,I(d)&&(y[O]=d={x1:d[0],y1:d[1],x2:d[2],y2:d[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===O&&r&&!u(d.gradientUnits)&&(l=d,d=p(d,b.getRadialAttr(r,l),{gradientUnits:"userSpaceOnUse"})),H(d,function(a,y){"id"!==y&&w.push(y,a)}),H(n,function(a){w.push(a)}),w=w.join(","),g[w]?r=g[w].attr("id"):
(d.id=r=a.uniqueKey(),g[w]=K=b.createElement(O).attr(d).add(b.defs),K.radAttr=l,K.stops=[],c(n,function(y){0===y[1].indexOf("rgba")?(e=a.color(y[1]),z=e.get("rgb"),L=e.get("a")):(z=y[1],L=1);y=b.createElement("stop").attr({offset:y[0],"stop-color":z,"stop-opacity":L}).add(K);K.stops.push(y)})),m="url("+b.url+"#"+r+")",x.setAttribute(h,m),x.gradient=w,y.toString=function(){return m})},applyTextOutline:function(y){var h=this.element,x,b,e,p,d;-1!==y.indexOf("contrast")&&(y=y.replace(/contrast/g,this.renderer.getContrast(h.style.fill)));
y=y.split(" ");b=y[y.length-1];if((e=y[0])&&"none"!==e&&a.svg){this.fakeTS=!0;y=[].slice.call(h.getElementsByTagName("tspan"));this.ySetter=this.xSetter;e=e.replace(/(^[\d\.]+)(.*?)$/g,function(a,y,h){return 2*y+h});for(d=y.length;d--;)x=y[d],"highcharts-text-outline"===x.getAttribute("class")&&l(y,h.removeChild(x));p=h.firstChild;c(y,function(a,y){0===y&&(a.setAttribute("x",h.getAttribute("x")),y=h.getAttribute("y"),a.setAttribute("y",y||0),null===y&&h.setAttribute("y",0));a=a.cloneNode(1);f(a,{"class":"highcharts-text-outline",
fill:b,stroke:b,"stroke-width":e,"stroke-linejoin":"round"});h.insertBefore(a,p)})}},attr:function(a,h,x,b){var y,e=this.element,c,O=this,p,d;"string"===typeof a&&void 0!==h&&(y=a,a={},a[y]=h);"string"===typeof a?O=(this[a+"Getter"]||this._defaultGetter).call(this,a,e):(H(a,function(y,h){p=!1;b||R(this,h);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h)&&(c||(this.symbolAttr(a),c=!0),p=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);p||(d=this[h+"Setter"]||
this._defaultSetter,d.call(this,y,h,e),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h)&&this.updateShadows(h,y,d))},this),this.afterSetters());x&&x();return O},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,h,x){for(var y=this.shadows,b=y.length;b--;)x.call(y[b],"height"===a?Math.max(h-(y[b].cutHeight||0),0):"d"===a?this.d:h,a,y[b])},addClass:function(a,h){var y=this.attr("class")||"";-1===y.indexOf(a)&&
(h||(a=(y+(y?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==A(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var y=this;c("x y r start end width height innerR anchorX anchorY".split(" "),function(h){y[h]=F(a[h],y[h])});y.attr({d:y.renderer.symbols[y.symbolName](y.x,y.y,y.width,y.height,y)})},clip:function(a){return this.attr("clip-path",a?"url("+
this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var y=this,x={},b;h=h||a.strokeWidth||0;b=Math.round(h)%2/2;a.x=Math.floor(a.x||y.x||0)+b;a.y=Math.floor(a.y||y.y||0)+b;a.width=Math.floor((a.width||y.width||0)-2*b);a.height=Math.floor((a.height||y.height||0)-2*b);u(a.strokeWidth)&&(a.strokeWidth=h);H(a,function(a,h){y[h]!==a&&(y[h]=x[h]=a)});return x},css:function(a){var y=this.styles,b={},x=this.element,c,p="",d,l=!y,g=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);
y&&H(a,function(a,h){a!==y[h]&&(b[h]=a,l=!0)});l&&(y&&(a=e(y,b)),c=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===x.nodeName.toLowerCase()&&h(a.width),this.styles=a,c&&!K&&this.renderer.forExport&&delete a.width,J&&!K?m(this.element,a):(d=function(a,y){return"-"+y.toLowerCase()},H(a,function(a,y){-1===A(y,g)&&(p+=y.replace(/([A-Z])/g,d)+":"+a+";")}),p&&f(x,"style",p)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));
return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var y=this,b=y.element;z&&"click"===a?(b.ontouchstart=function(a){y.touchEventFired=Date.now();a.preventDefault();h.call(b,a)},b.onclick=function(a){(-1===Q.navigator.userAgent.indexOf("Android")||1100<Date.now()-(y.touchEventFired||0))&&h.call(b,a)}):b["on"+a]=h;return this},setRadialReference:function(a){var y=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;y&&y.radAttr&&y.animate(this.renderer.getRadialAttr(a,
y.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,b=this.scaleX,x=this.scaleY,e=this.inverted,c=this.rotation,p=this.matrix,d=this.element;e&&(a+=this.width,h+=this.height);a=["translate("+a+","+h+")"];u(p)&&a.push("matrix("+p.join(",")+")");e?a.push("rotate(90) scale(-1,1)"):c&&a.push("rotate("+c+" "+F(this.rotationOriginX,
d.getAttribute("x"),0)+" "+F(this.rotationOriginY,d.getAttribute("y")||0)+")");(u(b)||u(x))&&a.push("scale("+F(b,1)+" "+F(x,1)+")");a.length&&d.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,b){var y,x,e,c,p={};x=this.renderer;e=x.alignedObjects;var d,O;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!b||D(b))this.alignTo=y=b||"renderer",l(e,this),e.push(this),b=null}else a=this.alignOptions,h=this.alignByTranslate,
y=this.alignTo;b=F(b,x[y],x);y=a.align;x=a.verticalAlign;e=(b.x||0)+(a.x||0);c=(b.y||0)+(a.y||0);"right"===y?d=1:"center"===y&&(d=2);d&&(e+=(b.width-(a.width||0))/d);p[h?"translateX":"x"]=Math.round(e);"bottom"===x?O=1:"middle"===x&&(O=2);O&&(c+=(b.height-(a.height||0))/O);p[h?"translateY":"y"]=Math.round(c);this[this.placed?"animate":"attr"](p);this.placed=!0;this.alignAttr=p;return this},getBBox:function(a,h){var y,b=this.renderer,x,p=this.element,l=this.styles,O,g=this.textStr,K,n=b.cache,z=b.cacheKeys,
L;h=F(h,this.rotation);x=h*d;O=l&&l.fontSize;void 0!==g&&(L=g.toString(),-1===L.indexOf("\x3c")&&(L=L.replace(/[0-9]/g,"0")),L+=["",h||0,O,l&&l.width,l&&l.textOverflow].join());L&&!a&&(y=n[L]);if(!y){if(p.namespaceURI===this.SVG_NS||b.forExport){try{(K=this.fakeTS&&function(a){c(p.querySelectorAll(".highcharts-text-outline"),function(h){h.style.display=a})})&&K("none"),y=p.getBBox?e({},p.getBBox()):{width:p.offsetWidth,height:p.offsetHeight},K&&K("")}catch(W){}if(!y||0>y.width)y={width:0,height:0}}else y=
this.htmlGetBBox();b.isSVG&&(a=y.width,b=y.height,l&&"11px"===l.fontSize&&17===Math.round(b)&&(y.height=b=14),h&&(y.width=Math.abs(b*Math.sin(x))+Math.abs(a*Math.cos(x)),y.height=Math.abs(b*Math.cos(x))+Math.abs(a*Math.sin(x))));if(L&&0<y.height){for(;250<z.length;)delete n[z.shift()];n[L]||z.push(L);n[L]=y}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var h=this;h.animate({opacity:0},
{duration:a||150,complete:function(){h.attr({y:-9999})}})},add:function(a){var h=this.renderer,y=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&h.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:h.box).appendChild(y);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var h=a.parentNode;h&&h.removeChild(a)},destroy:function(){var a=this,h=a.element||{},b=a.renderer.isSVG&&"SPAN"===h.nodeName&&
a.parentGroup,x=h.ownerSVGElement;h.onclick=h.onmouseout=h.onmouseover=h.onmousemove=h.point=null;R(a);a.clipPath&&x&&(c(x.querySelectorAll("[clip-path],[CLIP-PATH]"),function(h){h.getAttribute("clip-path").match(RegExp('[("]#'+a.clipPath.element.id+'[)"]'))&&h.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(x=0;x<a.stops.length;x++)a.stops[x]=a.stops[x].destroy();a.stops=null}a.safeRemoveChild(h);for(a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)h=b.parentGroup,
a.safeRemoveChild(b.div),delete b.div,b=h;a.alignTo&&l(a.renderer.alignedObjects,a);H(a,function(h,y){delete a[y]});return null},shadow:function(a,h,b){var y=[],x,e,c=this.element,p,d,l,g;if(!a)this.destroyShadows();else if(!this.shadows){d=F(a.width,3);l=(a.opacity||.15)/d;g=this.parentInverted?"(-1,-1)":"("+F(a.offsetX,1)+", "+F(a.offsetY,1)+")";for(x=1;x<=d;x++)e=c.cloneNode(0),p=2*d+1-2*x,f(e,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":l*x,"stroke-width":p,transform:"translate"+
g,fill:"none"}),b&&(f(e,"height",Math.max(f(e,"height")-p,0)),e.cutHeight=p),h?h.element.appendChild(e):c.parentNode&&c.parentNode.insertBefore(e,c),y.push(e);this.shadows=y}return this},destroyShadows:function(){c(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=F(this[a],this.element?this.element.getAttribute(a):null,
0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[h]!==a&&(b.setAttribute(h,a),this[h]=a)},dashstyleSetter:function(a){var b,x=this["stroke-width"];"inherit"===x&&(x=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,
"").split(",");for(b=a.length;b--;)a[b]=h(a[b])*x;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,b){this[h]=a;b.setAttribute(h,a)},titleSetter:function(a){var h=this.element.getElementsByTagName("title")[0];h||(h=n.createElementNS(this.SVG_NS,"title"),this.element.appendChild(h));h.firstChild&&h.removeChild(h.firstChild);
h.appendChild(n.createTextNode(String(F(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,h,b){"string"===typeof a?b.setAttribute(h,a):a&&this.colorGradient(a,h,b)},visibilitySetter:function(a,h,b){"inherit"===a?b.removeAttribute(h):this[h]!==a&&b.setAttribute(h,a);this[h]=a},zIndexSetter:function(a,b){var x=this.renderer,y=this.parentGroup,e=(y||x).element||x.box,c,p=this.element,
d,l,x=e===x.box;c=this.added;var g;u(a)&&(p.zIndex=a,a=+a,this[b]===a&&(c=!1),this[b]=a);if(c){(a=this.zIndex)&&y&&(y.handleZ=!0);b=e.childNodes;for(g=b.length-1;0<=g&&!d;g--)if(y=b[g],c=y.zIndex,l=!u(c),y!==p)if(0>a&&l&&!x&&!g)e.insertBefore(p,b[g]),d=!0;else if(h(c)<=a||l&&(!u(a)||0<=a))e.insertBefore(p,b[g+1]||null),d=!0;d||(e.insertBefore(p,b[x?3:0]||null),d=!0)}return d},_defaultSetter:function(a,h,b){b.setAttribute(h,a)}});E.prototype.yGetter=E.prototype.xGetter;E.prototype.translateXSetter=
E.prototype.translateYSetter=E.prototype.rotationSetter=E.prototype.verticalAlignSetter=E.prototype.rotationOriginXSetter=E.prototype.rotationOriginYSetter=E.prototype.scaleXSetter=E.prototype.scaleYSetter=E.prototype.matrixSetter=function(a,h){this[h]=a;this.doTransform=!0};E.prototype["stroke-widthSetter"]=E.prototype.strokeSetter=function(a,h,b){this[h]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),
this.hasStroke=!0):"stroke-width"===h&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};C=a.SVGRenderer=function(){this.init.apply(this,arguments)};e(C.prototype,{Element:E,SVG_NS:P,init:function(a,h,b,x,e,c){var y;x=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(x));y=x.element;a.appendChild(y);-1===a.innerHTML.indexOf("xmlns")&&f(y,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=y;this.boxWrapper=x;this.alignedObjects=[];this.url=(r||
M)&&n.getElementsByTagName("base").length?Q.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highcharts 6.0.2"));this.defs=this.createElement("defs").add();this.allowHTML=c;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(h,b,!1);var p;r&&a.getBoundingClientRect&&(h=function(){m(a,{left:0,top:0});p=a.getBoundingClientRect();
m(a,{left:Math.ceil(p.left)-p.left+"px",top:Math.ceil(p.top)-p.top+"px"})},h(),this.unSubPixelFix=G(Q,"resize",h))},getStyle:function(a){return this.style=e({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();g(this.gradients||{});this.gradients=
null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:B,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},getSpanWidth:function(a,h){var b=a.getBBox(!0).width;!K&&this.forExport&&(b=this.measureSpanWidth(h.firstChild.data,a.styles));return b},applyEllipsis:function(a,h,b,x){var e=a.rotation,c=b,y,p=0,d=b.length,l=function(a){h.removeChild(h.firstChild);
a&&h.appendChild(n.createTextNode(a))},g;a.rotation=0;c=this.getSpanWidth(a,h);if(g=c>x){for(;p<=d;)y=Math.ceil((p+d)/2),c=b.substring(0,y)+"\u2026",l(c),c=this.getSpanWidth(a,h),p===d?p=d+1:c>x?d=y-1:p=y;0===d&&l("")}a.rotation=e;return g},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot"},buildText:function(a){var x=a.element,e=this,p=e.forExport,y=F(a.textStr,"").toString(),d=-1!==y.indexOf("\x3c"),l=x.childNodes,g,z,L,r,w=f(x,"x"),B=a.styles,A=a.textWidth,
k=B&&B.lineHeight,u=B&&B.textOutline,D=B&&"ellipsis"===B.textOverflow,R=B&&"nowrap"===B.whiteSpace,I=B&&B.fontSize,J,Q,v=l.length,B=A&&!a.added&&this.box,q=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:I||e.style.fontSize||12;return k?h(k):e.fontMetrics(b,a.getAttribute("style")?a:x).h},t=function(a){H(e.escapes,function(h,b){a=a.replace(new RegExp(h,"g"),b)});return a};J=[y,D,R,k,u,I,A].join();if(J!==a.textCache){for(a.textCache=J;v--;)x.removeChild(l[v]);d||u||D||A||
-1!==y.indexOf(" ")?(g=/<.*class="([^"]+)".*>/,z=/<.*style="([^"]+)".*>/,L=/<.*href="([^"]+)".*>/,B&&B.appendChild(x),y=d?y.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[y],y=b(y,function(a){return""!==a}),c(y,function(h,b){var y,d=0;h=h.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");
y=h.split("|||");c(y,function(h){if(""!==h||1===y.length){var c={},l=n.createElementNS(e.SVG_NS,"tspan"),B,H;g.test(h)&&(B=h.match(g)[1],f(l,"class",B));z.test(h)&&(H=h.match(z)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),f(l,"style",H));L.test(h)&&!p&&(f(l,"onclick",'location.href\x3d"'+h.match(L)[1]+'"'),f(l,"class","highcharts-anchor"),m(l,{cursor:"pointer"}));h=t(h.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==h){l.appendChild(n.createTextNode(h));d?c.dx=0:b&&null!==w&&(c.x=w);f(l,c);x.appendChild(l);
!d&&Q&&(!K&&p&&m(l,{display:"block"}),f(l,"dy",q(l)));if(A){c=h.replace(/([^\^])-/g,"$1- ").split(" ");B=1<y.length||b||1<c.length&&!R;var O=[],k,u=q(l),I=a.rotation;for(D&&(r=e.applyEllipsis(a,l,h,A));!D&&B&&(c.length||O.length);)a.rotation=0,k=e.getSpanWidth(a,l),h=k>A,void 0===r&&(r=h),h&&1!==c.length?(l.removeChild(l.firstChild),O.unshift(c.pop())):(c=O,O=[],c.length&&!R&&(l=n.createElementNS(P,"tspan"),f(l,{dy:u,x:w}),H&&f(l,"style",H),x.appendChild(l)),k>A&&(A=k)),c.length&&l.appendChild(n.createTextNode(c.join(" ").replace(/- /g,
"-")));a.rotation=I}d++}}});Q=Q||x.childNodes.length}),r&&a.attr("title",a.textStr),B&&B.removeChild(x),u&&a.applyTextOutline&&a.applyTextOutline(u)):x.appendChild(n.createTextNode(t(y)))}},getContrast:function(a){a=t(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,b,x,c,d,l,g,K){var y=this.label(a,h,b,K,null,null,null,null,"button"),n=0;y.attr(p({padding:8,r:2},c));var z,L,r,B;c=p({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",
fontWeight:"normal"}},c);z=c.style;delete c.style;d=p(c,{fill:"#e6e6e6"},d);L=d.style;delete d.style;l=p(c,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},l);r=l.style;delete l.style;g=p(c,{style:{color:"#cccccc"}},g);B=g.style;delete g.style;G(y.element,J?"mouseover":"mouseenter",function(){3!==n&&y.setState(1)});G(y.element,J?"mouseout":"mouseleave",function(){3!==n&&y.setState(n)});y.setState=function(a){1!==a&&(y.state=n=a);y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);y.attr([c,d,l,g][a||0]).css([z,L,r,B][a||0])};y.attr(c).css(e({cursor:"default"},z));return y.on("click",function(a){3!==n&&x.call(y,a)})},crispLine:function(a,h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};I(a)?h.d=a:w(a)&&e(h,a);return this.createElement("path").attr(h)},circle:function(a,h,b){a=w(a)?a:{x:a,y:h,r:b};h=this.createElement("circle");h.xSetter=
h.ySetter=function(a,h,b){b.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,b,x,c,e){w(a)?(x=a,h=x.y,b=x.r,a=x.x):x={innerR:x,start:c,end:e};a=this.symbol("arc",a,h,b,b,x);a.r=b;return a},rect:function(a,h,b,x,c,e){c=w(a)?a.r:c;var p=this.createElement("rect");a=w(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(b,0),height:Math.max(x,0)};void 0!==e&&(a.strokeWidth=e,a=p.crisp(a));a.fill="none";c&&(a.r=c);p.rSetter=function(a,h,b){f(b,{rx:a,ry:a})};return p.attr(a)},setSize:function(a,h,b){var x=
this.alignedObjects,c=x.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:F(b,!0)?void 0:0});c--;)x[c].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,b,x,c){var p={preserveAspectRatio:"none"};1<arguments.length&&e(p,{x:h,y:b,width:x,height:c});p=this.createElement("image").attr(p);p.element.setAttributeNS?
p.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):p.element.setAttribute("hc-svg-href",a);return p},symbol:function(a,h,b,x,p,d){var l=this,y,g=/^url\((.*?)\)$/,K=g.test(a),z=!K&&(this.symbols[a]?a:"circle"),r=z&&this.symbols[z],B=u(h)&&r&&r.call(this.symbols,Math.round(h),Math.round(b),x,p,d),w,H;r?(y=this.path(B),y.attr("fill","none"),e(y,{symbolName:z,x:h,y:b,width:x,height:p}),d&&e(y,d)):K&&(w=a.match(g)[1],y=this.image(w),y.imgwidth=F(L[w]&&L[w].width,d&&d.width),y.imgheight=
F(L[w]&&L[w].height,d&&d.height),H=function(){y.attr({width:y.width,height:y.height})},c(["width","height"],function(a){y[a+"Setter"]=function(a,h){var b={},x=this["img"+h],c="width"===h?"translateX":"translateY";this[h]=a;u(x)&&(this.element&&this.element.setAttribute(h,x),this.alignByTranslate||(b[c]=((this[h]||0)-x)/2,this.attr(b)))}}),u(h)&&y.attr({x:h,y:b}),y.isImg=!0,u(y.imgwidth)&&u(y.imgheight)?H():(y.attr({width:0,height:0}),v("img",{onload:function(){var a=k[l.chartIndex];0===this.width&&
(m(this,{position:"absolute",top:"-999em"}),n.body.appendChild(this));L[w]={width:this.width,height:this.height};y.imgwidth=this.width;y.imgheight=this.height;y.element&&H();this.parentNode&&this.parentNode.removeChild(this);l.imgCount--;if(!l.imgCount&&a&&a.onload)a.onload()},src:w}),this.imgCount++));return y},symbols:{circle:function(a,h,b,x){return this.arc(a+b/2,h+x/2,b/2,x/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,b,x){return["M",a,h,"L",a+b,h,a+b,h+x,a,h+x,"Z"]},triangle:function(a,
h,b,x){return["M",a+b/2,h,"L",a+b,h+x,a,h+x,"Z"]},"triangle-down":function(a,h,b,x){return["M",a,h,"L",a+b,h,a+b/2,h+x,"Z"]},diamond:function(a,h,b,x){return["M",a+b/2,h,"L",a+b,h+x/2,a+b/2,h+x,a,h+x/2,"Z"]},arc:function(a,h,b,x,c){var e=c.start,p=c.r||b,d=c.r||x||b,l=c.end-.001;b=c.innerR;x=F(c.open,.001>Math.abs(c.end-c.start-2*Math.PI));var y=Math.cos(e),g=Math.sin(e),K=Math.cos(l),l=Math.sin(l);c=.001>c.end-e-Math.PI?0:1;p=["M",a+p*y,h+d*g,"A",p,d,0,c,1,a+p*K,h+d*l];u(b)&&p.push(x?"M":"L",a+b*
K,h+b*l,"A",b,b,0,c,0,a+b*y,h+b*g);p.push(x?"":"Z");return p},callout:function(a,h,b,x,c){var e=Math.min(c&&c.r||0,b,x),p=e+6,d=c&&c.anchorX;c=c&&c.anchorY;var l;l=["M",a+e,h,"L",a+b-e,h,"C",a+b,h,a+b,h,a+b,h+e,"L",a+b,h+x-e,"C",a+b,h+x,a+b,h+x,a+b-e,h+x,"L",a+e,h+x,"C",a,h+x,a,h+x,a,h+x-e,"L",a,h+e,"C",a,h,a,h,a+e,h];d&&d>b?c>h+p&&c<h+x-p?l.splice(13,3,"L",a+b,c-6,a+b+6,c,a+b,c+6,a+b,h+x-e):l.splice(13,3,"L",a+b,x/2,d,c,a+b,x/2,a+b,h+x-e):d&&0>d?c>h+p&&c<h+x-p?l.splice(33,3,"L",a,c+6,a-6,c,a,c-6,
a,h+e):l.splice(33,3,"L",a,x/2,d,c,a,x/2,a,h+e):c&&c>x&&d>a+p&&d<a+b-p?l.splice(23,3,"L",d+6,h+x,d,h+x+6,d-6,h+x,a+e,h+x):c&&0>c&&d>a+p&&d<a+b-p&&l.splice(3,3,"L",d-6,h,d,h-6,d+6,h,b-e,h);return l}},clipRect:function(h,b,x,c){var e=a.uniqueKey(),p=this.createElement("clipPath").attr({id:e}).add(this.defs);h=this.rect(h,b,x,c,0).add(p);h.id=e;h.clipPath=p;h.count=0;return h},text:function(a,h,b,x){var c={};if(x&&(this.allowHTML||!this.forExport))return this.html(a,h,b);c.x=Math.round(h||0);b&&(c.y=
Math.round(b));if(a||0===a)c.text=a;a=this.createElement("text").attr(c);x||(a.xSetter=function(a,h,b){var x=b.getElementsByTagName("tspan"),c,e=b.getAttribute(h),p;for(p=0;p<x.length;p++)c=x[p],c.getAttribute(h)===e&&c.setAttribute(h,a);b.setAttribute(h,a)});return a},fontMetrics:function(a,b){a=a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?h(a):/em/.test(a)?parseFloat(a)*(b?this.fontMetrics(null,b.parentNode).f:16):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*
b),f:a}},rotCorr:function(a,h,b){var x=a;h&&b&&(x=Math.max(x*Math.cos(h*d),4));return{x:-a/3*Math.sin(h*d),y:x}},label:function(h,b,d,l,g,K,n,z,L){var y=this,r=y.g("button"!==L&&"label"),w=r.text=y.text("",0,0,n).attr({zIndex:1}),B,H,m=0,A=3,k=0,f,D,I,R,J,Q={},F,v,P=/^url\((.*?)\)$/.test(l),q=P,t,O,M,T;L&&r.addClass("highcharts-"+L);q=P;t=function(){return(F||0)%2/2};O=function(){var a=w.element.style,h={};H=(void 0===f||void 0===D||J)&&u(w.textStr)&&w.getBBox();r.width=(f||H.width||0)+2*A+k;r.height=
(D||H.height||0)+2*A;v=A+y.fontMetrics(a&&a.fontSize,w).b;q&&(B||(r.box=B=y.symbols[l]||P?y.symbol(l):y.rect(),B.addClass(("button"===L?"":"highcharts-label-box")+(L?" highcharts-"+L+"-box":"")),B.add(r),a=t(),h.x=a,h.y=(z?-v:0)+a),h.width=Math.round(r.width),h.height=Math.round(r.height),B.attr(e(h,Q)),Q={})};M=function(){var a=k+A,h;h=z?0:v;u(f)&&H&&("center"===J||"right"===J)&&(a+={center:.5,right:1}[J]*(f-H.width));if(a!==w.x||h!==w.y)w.attr("x",a),void 0!==h&&w.attr("y",h);w.x=a;w.y=h};T=function(a,
h){B?B.attr(a,h):Q[a]=h};r.onAdd=function(){w.add(r);r.attr({text:h||0===h?h:"",x:b,y:d});B&&u(g)&&r.attr({anchorX:g,anchorY:K})};r.widthSetter=function(h){f=a.isNumber(h)?h:null};r.heightSetter=function(a){D=a};r["text-alignSetter"]=function(a){J=a};r.paddingSetter=function(a){u(a)&&a!==A&&(A=r.padding=a,M())};r.paddingLeftSetter=function(a){u(a)&&a!==k&&(k=a,M())};r.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==m&&(m=a,H&&r.attr({x:I}))};r.textSetter=function(a){void 0!==a&&w.textSetter(a);
O();M()};r["stroke-widthSetter"]=function(a,h){a&&(q=!0);F=this["stroke-width"]=a;T(h,a)};r.strokeSetter=r.fillSetter=r.rSetter=function(a,h){"r"!==h&&("fill"===h&&a&&(q=!0),r[h]=a);T(h,a)};r.anchorXSetter=function(a,h){g=r.anchorX=a;T(h,Math.round(a)-t()-I)};r.anchorYSetter=function(a,h){K=r.anchorY=a;T(h,a-R)};r.xSetter=function(a){r.x=a;m&&(a-=m*((f||H.width)+2*A));I=Math.round(a);r.attr("translateX",I)};r.ySetter=function(a){R=r.y=Math.round(a);r.attr("translateY",R)};var U=r.css;return e(r,{css:function(a){if(a){var h=
{};a=p(a);c(r.textProps,function(b){void 0!==a[b]&&(h[b]=a[b],delete a[b])});w.css(h)}return U.call(r,a)},getBBox:function(){return{width:H.width+2*A,height:H.height+2*A,x:H.x-A,y:H.y-A}},shadow:function(a){a&&(O(),B&&B.shadow(a));return r},destroy:function(){x(r.element,"mouseenter");x(r.element,"mouseleave");w&&(w=w.destroy());B&&(B=B.destroy());E.prototype.destroy.call(r);r=y=O=M=T=null}})}});a.Renderer=C})(N);(function(a){var E=a.attr,C=a.createElement,G=a.css,q=a.defined,f=a.each,k=a.extend,
t=a.isFirefox,m=a.isMS,v=a.isWebKit,u=a.pInt,d=a.SVGRenderer,g=a.win,n=a.wrap;k(a.SVGElement.prototype,{htmlCss:function(a){var c=this.element;if(c=a&&"SPAN"===c.tagName&&a.width)delete a.width,this.textWidth=c,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=k(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=
this.renderer,e=this.element,d=this.translateX||0,b=this.translateY||0,g=this.x||0,n=this.y||0,m=this.textAlign||"left",r={left:0,center:.5,right:1}[m],k=this.styles;G(e,{marginLeft:d,marginTop:b});this.shadows&&f(this.shadows,function(a){G(a,{marginLeft:d+1,marginTop:b+1})});this.inverted&&f(e.childNodes,function(b){a.invertChild(b,e)});if("SPAN"===e.tagName){var w=this.rotation,D=u(this.textWidth),t=k&&k.whiteSpace,p=[w,m,e.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(k=a.fontMetrics(e.style.fontSize).b,
q(w)&&this.setSpanRotation(w,r,k),G(e,{width:"",whiteSpace:t||"nowrap"}),e.offsetWidth>D&&/[ \-]/.test(e.textContent||e.innerText)&&G(e,{width:D+"px",display:"block",whiteSpace:t||"normal"}),this.getSpanCorrection(e.offsetWidth,k,r,w,m));G(e,{left:g+(this.xCorr||0)+"px",top:n+(this.yCorr||0)+"px"});v&&(k=e.offsetHeight);this.cTT=p}}else this.alignOnAdd=!0},setSpanRotation:function(a,e,d){var b={},c=this.renderer.getTransformKey();b[c]=b.transform="rotate("+a+"deg)";b[c+(t?"Origin":"-origin")]=b.transformOrigin=
100*e+"% "+d+"px";G(this.element,b)},getSpanCorrection:function(a,e,d){this.xCorr=-a*d;this.yCorr=-e}});k(d.prototype,{getTransformKey:function(){return m&&!/Edge/.test(g.navigator.userAgent)?"-ms-transform":v?"-webkit-transform":t?"MozTransform":g.opera?"-o-transform":""},html:function(a,e,d){var b=this.createElement("span"),c=b.element,l=b.renderer,g=l.isSVG,r=function(a,b){f(["opacity","visibility"],function(c){n(a,c+"Setter",function(a,c,e,d){a.call(this,c,e,d);b[e]=c})})};b.textSetter=function(a){a!==
c.innerHTML&&delete this.bBox;c.innerHTML=this.textStr=a;b.htmlUpdateTransform()};g&&r(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=function(a,c){"align"===c&&(c="textAlign");b[c]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(e),y:Math.round(d)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});c.style.whiteSpace="nowrap";b.css=b.htmlCss;g&&(b.add=function(a){var e,d=l.box.parentNode,g=[];if(this.parentGroup=a){if(e=a.div,!e){for(;a;)g.push(a),
a=a.parentGroup;f(g.reverse(),function(a){function c(h,b){a[b]=h;m?p[l.getTransformKey()]="translate("+(a.x||a.translateX)+"px,"+(a.y||a.translateY)+"px)":"translateX"===b?p.left=h+"px":p.top=h+"px";a.doTransform=!0}var p,n=E(a.element,"class");n&&(n={className:n});e=a.div=a.div||C("div",n,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},e||d);p=e.style;k(a,{classSetter:function(a){this.element.setAttribute("class",
a);e.className=a},on:function(){g[0].div&&b.on.apply({element:g[0].div},arguments);return a},translateXSetter:c,translateYSetter:c});r(a,p)})}}else e=d;e.appendChild(c);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}})})(N);(function(a){function E(){var m=a.defaultOptions.global,k=t.moment;if(m.timezone){if(k)return function(a){return-k.tz(a,m.timezone).utcOffset()};a.error(25)}return m.useUTC&&m.getTimezoneOffset}function C(){var m=a.defaultOptions.global,f,u=m.useUTC,d=u?"getUTC":
"get",g=u?"setUTC":"set",n="Minutes Hours Day Date Month FullYear".split(" "),c=n.concat(["Milliseconds","Seconds"]);a.Date=f=m.Date||t.Date;f.hcTimezoneOffset=u&&m.timezoneOffset;f.hcGetTimezoneOffset=E();f.hcMakeTime=function(a,c,b,d,g,n){var e;u?(e=f.UTC.apply(0,arguments),e+=q(e)):e=(new f(a,c,k(b,1),k(d,0),k(g,0),k(n,0))).getTime();return e};for(m=0;m<n.length;m++)f["hcGet"+n[m]]=d+n[m];for(m=0;m<c.length;m++)f["hcSet"+c[m]]=g+c[m]}var G=a.color,q=a.getTZOffset,f=a.merge,k=a.pick,t=a.win;a.defaultOptions=
{colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),
resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",
color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,
y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?
25:10,backgroundColor:G("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",
y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(m){a.defaultOptions=f(!0,a.defaultOptions,m);C();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;C()})(N);(function(a){var E=a.correctFloat,C=a.defined,G=a.destroyObjectProperties,q=a.isNumber,f=a.merge,k=a.pick,t=a.deg2rad;a.Tick=function(a,k,f,d){this.axis=a;this.pos=k;this.type=f||"";this.isNewLabel=this.isNew=!0;
f||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,v=a.options,u=a.chart,d=a.categories,g=a.names,n=this.pos,c=v.labels,e=a.tickPositions,l=n===e[0],b=n===e[e.length-1],g=d?k(d[n],g[n],n):n,d=this.label,e=e.info,z;a.isDatetimeAxis&&e&&(z=v.dateTimeLabelFormats[e.higherRanks[n]||e.unitName]);this.isFirst=l;this.isLast=b;v=a.labelFormatter.call({axis:a,chart:u,isFirst:l,isLast:b,dateTimeLabelFormat:z,value:a.isLog?E(a.lin2log(g)):g,pos:n});C(d)?d&&d.attr({text:v}):(this.labelLength=
(this.label=d=C(v)&&c.enabled?u.renderer.text(v,0,0,c.useHTML).css(f(c.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var m=this.axis,f=a.x,d=m.chart.chartWidth,g=m.chart.spacing,n=k(m.labelLeft,Math.min(m.pos,g[3])),g=k(m.labelRight,Math.max(m.pos+m.len,d-g[1])),c=this.label,e=this.rotation,l={left:0,center:.5,right:1}[m.labelAlign],b=c.getBBox().width,
z=m.getSlotWidth(),A=z,I=1,r,J={};if(e)0>e&&f-l*b<n?r=Math.round(f/Math.cos(e*t)-n):0<e&&f+l*b>g&&(r=Math.round((d-f)/Math.cos(e*t)));else if(d=f+(1-l)*b,f-l*b<n?A=a.x+A*(1-l)-n:d>g&&(A=g-a.x+A*l,I=-1),A=Math.min(z,A),A<z&&"center"===m.labelAlign&&(a.x+=I*(z-A-l*(z-Math.min(b,A)))),b>A||m.autoRotation&&(c.styles||{}).width)r=A;r&&(J.width=r,(m.options.labels.style||{}).textOverflow||(J.textOverflow="ellipsis"),c.css(J))},getPosition:function(a,k,f,d){var g=this.axis,n=g.chart,c=d&&n.oldChartHeight||
n.chartHeight;return{x:a?g.translate(k+f,null,null,d)+g.transB:g.left+g.offset+(g.opposite?(d&&n.oldChartWidth||n.chartWidth)-g.right-g.left:0),y:a?c-g.bottom+g.offset-(g.opposite?g.height:0):c-g.translate(k+f,null,null,d)-g.transB}},getLabelPosition:function(a,k,f,d,g,n,c,e){var l=this.axis,b=l.transA,z=l.reversed,A=l.staggerLines,m=l.tickRotCorr||{x:0,y:0},r=g.y;C(r)||(r=0===l.side?f.rotation?-8:-f.getBBox().height:2===l.side?m.y+8:Math.cos(f.rotation*t)*(m.y-f.getBBox(!1,0).height/2));a=a+g.x+
m.x-(n&&d?n*b*(z?-1:1):0);k=k+r-(n&&!d?n*b*(z?1:-1):0);A&&(f=c/(e||1)%A,l.opposite&&(f=A-f-1),k+=l.labelOffset/A*f);return{x:a,y:Math.round(k)}},getMarkPath:function(a,k,f,d,g,n){return n.crispLine(["M",a,k,"L",a+(g?0:-f),k+(g?f:0)],d)},renderGridLine:function(a,k,f){var d=this.axis,g=d.options,n=this.gridLine,c={},e=this.pos,l=this.type,b=d.tickmarkOffset,z=d.chart.renderer,A=l?l+"Grid":"grid",m=g[A+"LineWidth"],r=g[A+"LineColor"],g=g[A+"LineDashStyle"];n||(c.stroke=r,c["stroke-width"]=m,g&&(c.dashstyle=
g),l||(c.zIndex=1),a&&(c.opacity=0),this.gridLine=n=z.path().attr(c).addClass("highcharts-"+(l?l+"-":"")+"grid-line").add(d.gridGroup));if(!a&&n&&(a=d.getPlotLinePath(e+b,n.strokeWidth()*f,a,!0)))n[this.isNew?"attr":"animate"]({d:a,opacity:k})},renderMark:function(a,f,u){var d=this.axis,g=d.options,n=d.chart.renderer,c=this.type,e=c?c+"Tick":"tick",l=d.tickSize(e),b=this.mark,z=!b,A=a.x;a=a.y;var m=k(g[e+"Width"],!c&&d.isXAxis?1:0),g=g[e+"Color"];l&&(d.opposite&&(l[0]=-l[0]),z&&(this.mark=b=n.path().addClass("highcharts-"+
(c?c+"-":"")+"tick").add(d.axisGroup),b.attr({stroke:g,"stroke-width":m})),b[z?"attr":"animate"]({d:this.getMarkPath(A,a,l[0],b.strokeWidth()*u,d.horiz,n),opacity:f}))},renderLabel:function(a,f,u,d){var g=this.axis,n=g.horiz,c=g.options,e=this.label,l=c.labels,b=l.step,z=g.tickmarkOffset,A=!0,m=a.x;a=a.y;e&&q(m)&&(e.xy=a=this.getLabelPosition(m,a,e,n,l,z,d,b),this.isFirst&&!this.isLast&&!k(c.showFirstLabel,1)||this.isLast&&!this.isFirst&&!k(c.showLastLabel,1)?A=!1:!n||g.isRadial||l.step||l.rotation||
f||0===u||this.handleOverflow(a),b&&d%b&&(A=!1),A&&q(a.y)?(a.opacity=u,e[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(e.attr("y",-9999),this.isNewLabel=!0))},render:function(a,f,u){var d=this.axis,g=d.horiz,n=this.getPosition(g,this.pos,d.tickmarkOffset,f),c=n.x,e=n.y,d=g&&c===d.pos+d.len||!g&&e===d.pos?-1:1;u=k(u,1);this.isActive=!0;this.renderGridLine(f,u,d);this.renderMark(n,u,d);this.renderLabel(n,f,u,a);this.isNew=!1},destroy:function(){G(this,this.axis)}}})(N);var V=function(a){var E=
a.addEvent,C=a.animObject,G=a.arrayMax,q=a.arrayMin,f=a.color,k=a.correctFloat,t=a.defaultOptions,m=a.defined,v=a.deg2rad,u=a.destroyObjectProperties,d=a.each,g=a.extend,n=a.fireEvent,c=a.format,e=a.getMagnitude,l=a.grep,b=a.inArray,z=a.isArray,A=a.isNumber,I=a.isString,r=a.merge,J=a.normalizeTickInterval,w=a.objectEach,D=a.pick,M=a.removeEvent,p=a.splat,B=a.syncTimeout,H=a.Tick,F=function(){this.init.apply(this,arguments)};a.extend(F.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",
second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",
lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},
defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,x){var h=x.isX,c=this;c.chart=a;c.horiz=a.inverted&&!c.isZAxis?!h:h;c.isXAxis=h;c.coll=c.coll||(h?"xAxis":"yAxis");c.opposite=x.opposite;c.side=x.side||(c.horiz?c.opposite?0:2:c.opposite?1:3);c.setOptions(x);var e=this.options,d=e.type;c.labelFormatter=e.labels.formatter||
c.defaultLabelFormatter;c.userOptions=x;c.minPixelPadding=0;c.reversed=e.reversed;c.visible=!1!==e.visible;c.zoomEnabled=!1!==e.zoomEnabled;c.hasNames="category"===d||!0===e.categories;c.categories=e.categories||c.hasNames;c.names=c.names||[];c.plotLinesAndBandsGroups={};c.isLog="logarithmic"===d;c.isDatetimeAxis="datetime"===d;c.positiveValuesOnly=c.isLog&&!c.allowNegativeLog;c.isLinked=m(e.linkedTo);c.ticks={};c.labelEdge=[];c.minorTicks={};c.plotLinesAndBands=[];c.alternateBands={};c.len=0;c.minRange=
c.userMinRange=e.minRange||e.maxZoom;c.range=e.range;c.offset=e.offset||0;c.stacks={};c.oldStacks={};c.stacksTouched=0;c.max=null;c.min=null;c.crosshair=D(e.crosshair,p(a.options.tooltip.crosshairs)[h?0:1],!1);x=c.options.events;-1===b(c,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,c):a.axes.push(c),a[c.coll].push(c));c.series=c.series||[];a.inverted&&!c.isZAxis&&h&&void 0===c.reversed&&(c.reversed=!0);w(x,function(a,h){E(c,h,a)});c.lin2log=e.linearToLogConverter||c.lin2log;c.isLog&&(c.val2lin=c.log2lin,
c.lin2val=c.lin2log)},setOptions:function(a){this.options=r(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],r(t[this.coll],a))},defaultLabelFormatter:function(){var h=this.axis,b=this.value,e=h.categories,d=this.dateTimeLabelFormat,p=t.lang,l=p.numericSymbols,p=p.numericSymbolMagnitude||1E3,g=l&&l.length,n,r=h.options.labels.format,h=h.isLog?Math.abs(b):
h.tickInterval;if(r)n=c(r,this);else if(e)n=b;else if(d)n=a.dateFormat(d,b);else if(g&&1E3<=h)for(;g--&&void 0===n;)e=Math.pow(p,g+1),h>=e&&0===10*b%e&&null!==l[g]&&0!==b&&(n=a.numberFormat(b/e,-1)+l[g]);void 0===n&&(n=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return n},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();d(a.series,function(h){if(h.visible||
!b.options.chart.ignoreHiddenSeries){var c=h.options,x=c.threshold,e;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=x&&(x=null);if(a.isXAxis)c=h.xData,c.length&&(h=q(c),A(h)||h instanceof Date||(c=l(c,function(a){return A(a)}),h=q(c)),a.dataMin=Math.min(D(a.dataMin,c[0]),h),a.dataMax=Math.max(D(a.dataMax,c[0]),G(c)));else if(h.getExtremes(),e=h.dataMax,h=h.dataMin,m(h)&&m(e)&&(a.dataMin=Math.min(D(a.dataMin,h),h),a.dataMax=Math.max(D(a.dataMax,e),e)),m(x)&&(a.threshold=x),!c.softThreshold||a.positiveValuesOnly)a.softThreshold=
!1}})},translate:function(a,b,c,e,d,p){var h=this.linkedParent||this,x=1,l=0,g=e?h.oldTransA:h.transA;e=e?h.oldMin:h.min;var n=h.minPixelPadding;d=(h.isOrdinal||h.isBroken||h.isLog&&d)&&h.lin2val;g||(g=h.transA);c&&(x*=-1,l=h.len);h.reversed&&(x*=-1,l-=x*(h.sector||h.len));b?(a=(a*x+l-n)/g+e,d&&(a=h.lin2val(a))):(d&&(a=h.val2lin(a)),a=A(e)?x*(a-e)*g+l+x*n+(A(p)?g*p:0):void 0);return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-
(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,e,d){var h=this.chart,x=this.left,p=this.top,l,g,n=c&&h.oldChartHeight||h.chartHeight,r=c&&h.oldChartWidth||h.chartWidth,z;l=this.transB;var w=function(a,h,b){if(a<h||a>b)e?a=Math.min(Math.max(h,a),b):z=!0;return a};d=D(d,this.translate(a,null,null,c));a=c=Math.round(d+l);l=g=Math.round(n-d-l);A(d)?this.horiz?(l=p,g=n-this.bottom,a=c=w(a,x,x+this.width)):(a=x,c=r-this.right,l=g=w(l,p,p+this.height)):(z=!0,e=!1);return z&&!e?null:
h.renderer.crispLine(["M",a,l,"L",c,g],b||1)},getLinearTickPositions:function(a,b,c){var h,x=k(Math.floor(b/a)*a);c=k(Math.ceil(c/a)*a);var e=[];if(this.single)return[b];for(b=x;b<=c;){e.push(b);b=k(b+a);if(b===h)break;h=b}return e},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?D(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,e=a.minorTickInterval,p=[],l=a.pointRangePadding||
0,g=a.min-l,l=a.max+l,n=l-g;if(n&&n/e<a.len/3)if(a.isLog)d(this.paddedTicks,function(h,b,c){b&&p.push.apply(p,a.getLogTickPositions(e,c[b-1],c[b],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())p=p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e),g,l,b.startOfWeek));else for(b=g+(c[0]-g)%e;b<=l&&b!==p[0];b+=e)p.push(b);0!==p.length&&a.trimTicks(p);return p},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,e,p,l,g,n,r,z,w;this.isXAxis&&void 0===this.minRange&&
!this.isLog&&(m(a.min)||m(a.max)?this.minRange=null:(d(this.series,function(a){r=a.xData;for(g=z=a.xIncrement?1:r.length-1;0<g;g--)if(n=r[g]-r[g-1],void 0===l||n<l)l=n}),this.minRange=Math.min(5*l,this.dataMax-this.dataMin)));c-b<this.minRange&&(p=this.dataMax-this.dataMin>=this.minRange,w=this.minRange,e=(w-c+b)/2,e=[b-e,D(a.min,b-e)],p&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=G(e),c=[b+w,D(a.max,b+w)],p&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=q(c),c-b<w&&
(e[0]=c-w,e[1]=D(a.min,c-w),b=G(e)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:d(this.series,function(h){var b=h.closestPointRange,c=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&m(b)&&c&&(a=m(a)?Math.min(a,b):b)});return a},nameToX:function(a){var h=z(this.categories),c=h?this.categories:this.names,e=a.options.x,d;a.series.requireSorting=!1;m(e)||(e=!1===this.options.uniqueNames?a.series.autoIncrement():b(a.name,c));-1===e?h||(d=c.length):d=
e;void 0!==d&&(this.names[d]=a.name);return d},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,d(this.series||[],function(h){h.xIncrement=null;if(!h.points||h.isDirtyData)h.processData(),h.generatePoints();d(h.points,function(b,c){var e;b.options&&(e=a.nameToX(b),void 0!==e&&e!==b.x&&(b.x=e,h.xData[c]=e))})}))},setAxisTranslation:function(a){var h=this,b=h.max-h.min,c=h.axisPointRange||0,e,p=0,l=0,g=h.linkedParent,n=!!h.categories,r=h.transA,
z=h.isXAxis;if(z||n||c)e=h.getClosest(),g?(p=g.minPointOffset,l=g.pointRangePadding):d(h.series,function(a){var b=n?1:z?D(a.options.pointRange,e,0):h.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,b);h.single||(p=Math.max(p,I(a)?0:b/2),l=Math.max(l,"on"===a?0:b))}),g=h.ordinalSlope&&e?h.ordinalSlope/e:1,h.minPointOffset=p*=g,h.pointRangePadding=l*=g,h.pointRange=Math.min(c,b),z&&(h.closestPointRange=e);a&&(h.oldTransA=r);h.translationSlope=h.transA=r=h.options.staticScale||h.len/(b+l||
1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=r*p},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var b=this,c=b.chart,p=b.options,l=b.isLog,g=b.log2lin,r=b.isDatetimeAxis,z=b.isXAxis,w=b.isLinked,B=p.maxPadding,H=p.minPadding,f=p.tickInterval,u=p.tickPixelInterval,I=b.categories,F=b.threshold,q=b.softThreshold,t,v,M,C;r||I||w||this.getTickAmount();M=D(b.userMin,p.min);C=D(b.userMax,p.max);w?(b.linkedParent=c[b.coll][p.linkedTo],c=b.linkedParent.getExtremes(),
b.min=D(c.min,c.dataMin),b.max=D(c.max,c.dataMax),p.type!==b.linkedParent.options.type&&a.error(11,1)):(!q&&m(F)&&(b.dataMin>=F?(t=F,H=0):b.dataMax<=F&&(v=F,B=0)),b.min=D(M,t,b.dataMin),b.max=D(C,v,b.dataMax));l&&(b.positiveValuesOnly&&!h&&0>=Math.min(b.min,D(b.dataMin,b.min))&&a.error(10,1),b.min=k(g(b.min),15),b.max=k(g(b.max),15));b.range&&m(b.max)&&(b.userMin=b.min=M=Math.max(b.dataMin,b.minFromRange()),b.userMax=C=b.max,b.range=null);n(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();
!(I||b.axisPointRange||b.usePercentage||w)&&m(b.min)&&m(b.max)&&(g=b.max-b.min)&&(!m(M)&&H&&(b.min-=g*H),!m(C)&&B&&(b.max+=g*B));A(p.softMin)&&(b.min=Math.min(b.min,p.softMin));A(p.softMax)&&(b.max=Math.max(b.max,p.softMax));A(p.floor)&&(b.min=Math.max(b.min,p.floor));A(p.ceiling)&&(b.max=Math.min(b.max,p.ceiling));q&&m(b.dataMin)&&(F=F||0,!m(M)&&b.min<F&&b.dataMin>=F?b.min=F:!m(C)&&b.max>F&&b.dataMax<=F&&(b.max=F));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:w&&!f&&u===b.linkedParent.options.tickPixelInterval?
f=b.linkedParent.tickInterval:D(f,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,I?1:(b.max-b.min)*u/Math.max(b.len,u));z&&!h&&d(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!f&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));h=D(p.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);
!f&&b.tickInterval<h&&(b.tickInterval=h);r||l||f||(b.tickInterval=J(b.tickInterval,null,e(b.tickInterval),D(p.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions;b=this.getMinorTickInterval();var e=a.tickPositioner,p=a.startOnTick,d=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===
this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&m(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):
this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=b=e);this.paddedTicks=b.slice(0);this.trimTicks(b,p,d);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),c||e||this.adjustTickAmount())},trimTicks:function(a,b,c){var h=a[0],e=a[a.length-1],p=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==h)this.min=h;else for(;this.min-p>a[0];)a.shift();
if(c)this.max=e;else for(;this.max+p<a[a.length-1];)a.pop();0===a.length&&m(h)&&a.push((e+h)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||d(this.chart[this.coll],function(h){var c=h.options,c=[h.horiz?c.left:c.top,c.width,c.height,c.pane].join();h.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!m(a.tickInterval)&&this.len<c&&!this.isRadial&&
!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,e=this.finalTickAmt,p=b&&b.length;if(p<c){for(;b.length<c;)b.push(k(b[b.length-1]+a));this.transA*=(p-1)/(c-1);this.max=b[b.length-1]}else p>c&&(this.tickInterval*=2,this.setTickPositions());if(m(e)){for(a=c=b.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<c-1)&&b.splice(a,
1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;d(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=
this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,e,p){var h=this,l=h.chart;c=D(c,!0);d(h.series,function(a){delete a.kdTree});p=g(p,{min:a,max:b});n(h,"setExtremes",p,function(){h.userMin=a;h.userMax=b;h.eventArgs=p;c&&l.redraw(e)})},zoom:function(a,b){var h=this.dataMin,c=this.dataMax,e=this.options,p=Math.min(h,D(e.min,h)),e=Math.max(c,D(e.max,c));if(a!==this.min||
b!==this.max)this.allowZoomOutside||(m(h)&&(a<p&&(a=p),a>e&&(a=e)),m(c)&&(b<p&&(b=p),b>e&&(b=e))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,c=this.options,e=c.offsets||[0,0,0,0],p=this.horiz,d=this.width=Math.round(a.relativeLength(D(c.width,b.plotWidth-e[3]+e[1]),b.plotWidth)),l=this.height=Math.round(a.relativeLength(D(c.height,b.plotHeight-e[0]+e[2]),b.plotHeight)),g=this.top=Math.round(a.relativeLength(D(c.top,
b.plotTop+e[0]),b.plotHeight,b.plotTop)),c=this.left=Math.round(a.relativeLength(D(c.left,b.plotLeft+e[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-l-g;this.right=b.chartWidth-d-c;this.len=Math.max(p?d:l,0);this.pos=p?c:g},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?k(b(this.min)):this.min,max:a?k(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,h=this.lin2log,c=b?
h(this.min):this.min,b=b?h(this.max):this.max;null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(D(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],c=D(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,c]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,e=c,p=this.len/(((this.categories?1:0)+this.max-this.min)/c),l,g=a.rotation,n=this.labelMetrics(),r,z=Number.MAX_VALUE,w,B=function(a){a/=p||1;a=1<a?Math.ceil(a):1;return a*c};b?(w=!a.staggerLines&&!a.step&&(m(g)?[g]:p<D(a.autoRotationLimit,80)&&a.autoRotation))&&d(w,function(a){var b;if(a===g||a&&-90<=a&&90>=a)r=B(Math.abs(n.h/Math.sin(v*a))),b=r+
Math.abs(a/360),b<z&&(z=b,l=a,e=r)}):a.step||(e=B(n.h));this.autoRotation=w;this.labelRotation=D(l,g);return e},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),p=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/e||!b&&(c.style&&parseInt(c.style.width,10)||p&&p-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,e=this.ticks,
p=this.options.labels,l=this.horiz,g=this.getSlotWidth(),n=Math.max(1,Math.round(g-2*(p.padding||5))),z={},w=this.labelMetrics(),B=p.style&&p.style.textOverflow,H,f=0,k,A;I(p.rotation)||(z.rotation=p.rotation||0);d(c,function(a){(a=e[a])&&a.labelLength>f&&(f=a.labelLength)});this.maxLabelLength=f;if(this.autoRotation)f>n&&f>w.h?z.rotation=this.labelRotation:this.labelRotation=0;else if(g&&(H={width:n+"px"},!B))for(H.textOverflow="clip",k=c.length;!l&&k--;)if(A=c[k],n=e[A].label)n.styles&&"ellipsis"===
n.styles.textOverflow?n.css({textOverflow:"clip"}):e[A].labelLength>g&&n.css({width:g+"px"}),n.getBBox().height>this.len/c.length-(w.h-w.f)&&(n.specCss={textOverflow:"ellipsis"});z.rotation&&(H={width:(f>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},B||(H.textOverflow="ellipsis"));if(this.labelAlign=p.align||this.autoLabelAlign(this.labelRotation))z.align=this.labelAlign;d(c,function(a){var b=(a=e[a])&&a.label;b&&(b.attr(z),H&&b.css(r(H,b.specCss)),delete b.specCss,a.rotation=z.rotation)});
this.tickRotCorr=b.rotCorr(w.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||m(this.min)&&m(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,h=this.horiz,c=this.opposite,e=this.options.title,p;this.axisTitle||((p=e.textAlign)||(p=(h?{low:"left",middle:"center",high:"right"}:{low:c?"right":"left",middle:"center",high:c?"left":"right"})[e.align]),this.axisTitle=b.text(e.text,0,0,e.useHTML).attr({zIndex:7,rotation:e.rotation||0,
align:p}).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup),this.axisTitle.isNew=!0);e.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new H(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,e=a.options,p=a.tickPositions,l=a.ticks,g=a.horiz,n=a.side,r=b.inverted&&!a.isZAxis?[1,0,3,2][n]:n,z,B,H=0,f,k=0,A=e.title,u=e.labels,F=0,I=b.axisOffset,b=b.clipOffset,
J=[-1,1,1,-1][n],q=e.className,t=a.axisParent,v=this.tickSize("tick");z=a.hasData();a.showAxis=B=z||D(e.showEmpty,!0);a.staggerLines=a.horiz&&u.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(q||"")).add(t),a.axisGroup=c.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(q||"")).add(t),a.labelGroup=c.g("axis-labels").attr({zIndex:u.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+
"-labels "+(q||"")).add(t));z||a.isLinked?(d(p,function(b,c){a.generateTick(b,c)}),a.renderUnsquish(),!1===u.reserveSpace||0!==n&&2!==n&&{1:"left",3:"right"}[n]!==a.labelAlign&&"center"!==a.labelAlign||d(p,function(a){F=Math.max(l[a].getLabelSize(),F)}),a.staggerLines&&(F*=a.staggerLines,a.labelOffset=F*(a.opposite?-1:1))):w(l,function(a,b){a.destroy();delete l[b]});A&&A.text&&!1!==A.enabled&&(a.addTitle(B),B&&!1!==A.reserveSpace&&(a.titleOffset=H=a.axisTitle.getBBox()[g?"height":"width"],f=A.offset,
k=m(f)?0:D(A.margin,g?5:10)));a.renderLine();a.offset=J*D(e.offset,I[n]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===n?-a.labelMetrics().h:2===n?a.tickRotCorr.y:0;k=Math.abs(F)+k;F&&(k=k-c+J*(g?D(u.y,a.tickRotCorr.y+8*J):u.x));a.axisTitleMargin=D(f,k);I[n]=Math.max(I[n],a.axisTitleMargin+H+J*a.offset,k,z&&p.length&&v?v[0]+J*a.offset:0);e=e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[r]=Math.max(b[r],e)},getLinePath:function(a){var b=this.chart,c=this.opposite,h=this.offset,e=this.horiz,p=
this.left+(c?this.width:0)+h,h=b.chartHeight-this.bottom-(c?this.height:0)+h;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:p,e?h:this.top,"L",e?b.chartWidth-this.right:p,e?h:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,
c=this.top,e=this.len,p=this.options.title,d=a?b:c,l=this.opposite,g=this.offset,n=p.x||0,r=p.y||0,z=this.axisTitle,w=this.chart.renderer.fontMetrics(p.style&&p.style.fontSize,z),z=Math.max(z.getBBox(null,0).height-w.h-1,0),e={low:d+(a?0:e),middle:d+e/2,high:d+(a?e:0)}[p.align],b=(a?c+this.height:b)+(a?1:-1)*(l?-1:1)*this.axisTitleMargin+[-z,z,w.f,-z][this.side];return{x:a?e+n:b+(l?this.width:0)+g+n,y:a?b+r-(l?this.height:0)+g:e+r}},renderMinorTick:function(a){var b=this.chart.hasRendered&&A(this.oldMin),
c=this.minorTicks;c[a]||(c[a]=new H(this,a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,h=this.ticks,e=this.chart.hasRendered&&A(this.oldMin);if(!c||a>=this.min&&a<=this.max)h[a]||(h[a]=new H(this,a)),e&&h[a].isNew&&h[a].render(b,!0,.1),h[a].render(b)},render:function(){var b=this,c=b.chart,e=b.options,p=b.isLog,l=b.lin2log,g=b.isLinked,n=b.tickPositions,r=b.axisTitle,z=b.ticks,f=b.minorTicks,k=b.alternateBands,m=e.stackLabels,
D=e.alternateGridColor,u=b.tickmarkOffset,F=b.axisLine,I=b.showAxis,J=C(c.renderer.globalAnimation),q,t;b.labelEdge.length=0;b.overlap=!1;d([z,f,k],function(a){w(a,function(a){a.isActive=!1})});if(b.hasData()||g)b.minorTickInterval&&!b.categories&&d(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),n.length&&(d(n,function(a,c){b.renderTick(a,c)}),u&&(0===b.min||b.single)&&(z[-1]||(z[-1]=new H(b,-1,null,!0)),z[-1].render(-1))),D&&d(n,function(e,h){t=void 0!==n[h+1]?n[h+1]+u:b.max-u;0===
h%2&&e<b.max&&t<=b.max+(c.polar?-u:u)&&(k[e]||(k[e]=new a.PlotLineOrBand(b)),q=e+u,k[e].options={from:p?l(q):q,to:p?l(t):t,color:D},k[e].render(),k[e].isActive=!0)}),b._addedPlotLB||(d((e.plotLines||[]).concat(e.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);d([z,f,k],function(a){var b,e=[],h=J.duration;w(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,e.push(b))});B(function(){for(b=e.length;b--;)a[e[b]]&&!a[e[b]].isActive&&(a[e[b]].destroy(),delete a[e[b]])},
a!==k&&c.hasRendered&&h?h:0)});F&&(F[F.isPlaced?"animate":"attr"]({d:this.getLinePath(F.strokeWidth())}),F.isPlaced=!0,F[I?"show":"hide"](!0));r&&I&&(e=b.getTitlePosition(),A(e.y)?(r[r.isNew?"attr":"animate"](e),r.isNew=!1):(r.attr("y",-9999),r.isNew=!0));m&&m.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),d(this.plotLinesAndBands,function(a){a.render()}));d(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),
destroy:function(a){var c=this,e=c.stacks,h=c.plotLinesAndBands,p;a||M(c);w(e,function(a,b){u(a);e[b]=null});d([c.ticks,c.minorTicks,c.alternateBands],function(a){u(a)});if(h)for(a=h.length;a--;)h[a].destroy();d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});for(p in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[p]=c.plotLinesAndBandsGroups[p].destroy();w(c,function(a,e){-1===b(e,c.keepProps)&&delete c[e]})},drawCrosshair:function(a,
b){var c,e=this.crosshair,h=D(e.snap,!0),p,d=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(m(b)||!h)?(h?m(b)&&(p=this.isXAxis?b.plotX:this.len-b.plotY):p=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),m(p)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:D(b.stackY,b.y)),null,null,null,p)||null),m(c)?(b=this.categories&&!this.isRadial,d||(this.cross=d=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+e.className).attr({zIndex:D(e.zIndex,
2)}).add(),d.attr({stroke:e.color||(b?f("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":D(e.width,1)}).css({"pointer-events":"none"}),e.dashStyle&&d.attr({dashstyle:e.dashStyle})),d.show().attr({d:c}),b&&!e.width&&d.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=F}(N);(function(a){var E=a.Axis,C=a.Date,G=a.dateFormat,q=a.defaultOptions,f=a.defined,k=a.each,t=a.extend,
m=a.getMagnitude,v=a.getTZOffset,u=a.normalizeTickInterval,d=a.pick,g=a.timeUnits;E.prototype.getTimeTicks=function(a,c,e,l){var b=[],n={},A=q.global.useUTC,m,r=new C(c-Math.max(v(c),v(e))),u=C.hcMakeTime,w=a.unitRange,D=a.count,M,p;if(f(c)){r[C.hcSetMilliseconds](w>=g.second?0:D*Math.floor(r.getMilliseconds()/D));if(w>=g.second)r[C.hcSetSeconds](w>=g.minute?0:D*Math.floor(r.getSeconds()/D));if(w>=g.minute)r[C.hcSetMinutes](w>=g.hour?0:D*Math.floor(r[C.hcGetMinutes]()/D));if(w>=g.hour)r[C.hcSetHours](w>=
g.day?0:D*Math.floor(r[C.hcGetHours]()/D));if(w>=g.day)r[C.hcSetDate](w>=g.month?1:D*Math.floor(r[C.hcGetDate]()/D));w>=g.month&&(r[C.hcSetMonth](w>=g.year?0:D*Math.floor(r[C.hcGetMonth]()/D)),m=r[C.hcGetFullYear]());if(w>=g.year)r[C.hcSetFullYear](m-m%D);if(w===g.week)r[C.hcSetDate](r[C.hcGetDate]()-r[C.hcGetDay]()+d(l,1));m=r[C.hcGetFullYear]();l=r[C.hcGetMonth]();var B=r[C.hcGetDate](),H=r[C.hcGetHours]();if(C.hcTimezoneOffset||C.hcGetTimezoneOffset)p=(!A||!!C.hcGetTimezoneOffset)&&(e-c>4*g.month||
v(c)!==v(e)),r=r.getTime(),M=v(r),r=new C(r+M);A=r.getTime();for(c=1;A<e;)b.push(A),A=w===g.year?u(m+c*D,0):w===g.month?u(m,l+c*D):!p||w!==g.day&&w!==g.week?p&&w===g.hour?u(m,l,B,H+c*D,0,0,M)-M:A+w*D:u(m,l,B+c*D*(w===g.day?1:7)),c++;b.push(A);w<=g.hour&&1E4>b.length&&k(b,function(a){0===a%18E5&&"000000000"===G("%H%M%S%L",a)&&(n[a]="day")})}b.info=t(a,{higherRanks:n,totalRange:w*D});return b};E.prototype.normalizeTimeTickInterval=function(a,c){var e=c||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],
["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];c=e[e.length-1];var d=g[c[0]],b=c[1],n;for(n=0;n<e.length&&!(c=e[n],d=g[c[0]],b=c[1],e[n+1]&&a<=(d*b[b.length-1]+g[e[n+1][0]])/2);n++);d===g.year&&a<5*d&&(b=[1,2,5]);a=u(a/d,b,"year"===c[0]?Math.max(m(a/d),1):1);return{unitRange:d,count:a,unitName:c[0]}}})(N);(function(a){var E=a.Axis,C=a.getMagnitude,G=a.map,q=a.normalizeTickInterval,f=a.pick;E.prototype.getLogTickPositions=
function(a,t,m,v){var k=this.options,d=this.len,g=this.lin2log,n=this.log2lin,c=[];v||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),c=this.getLinearTickPositions(a,t,m);else if(.08<=a)for(var d=Math.floor(t),e,l,b,z,A,k=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];d<m+1&&!A;d++)for(l=k.length,e=0;e<l&&!A;e++)b=n(g(d)*k[e]),b>t&&(!v||z<=m)&&void 0!==z&&c.push(z),z>m&&(A=!0),z=b;else t=g(t),m=g(m),a=v?this.getMinorTickInterval():k.tickInterval,a=f("auto"===a?null:a,this._minorAutoInterval,
k.tickPixelInterval/(v?5:1)*(m-t)/((v?d/this.tickPositions.length:d)||1)),a=q(a,null,C(a)),c=G(this.getLinearTickPositions(a,t,m),n),v||(this._minorAutoInterval=a/5);v||(this.tickInterval=a);return c};E.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};E.prototype.lin2log=function(a){return Math.pow(10,a)}})(N);(function(a,E){var C=a.arrayMax,G=a.arrayMin,q=a.defined,f=a.destroyObjectProperties,k=a.each,t=a.erase,m=a.merge,v=a.pick;a.PlotLineOrBand=function(a,d){this.axis=a;d&&(this.options=
d,this.id=d.id)};a.PlotLineOrBand.prototype={render:function(){var f=this,d=f.axis,g=d.horiz,n=f.options,c=n.label,e=f.label,l=n.to,b=n.from,z=n.value,A=q(b)&&q(l),k=q(z),r=f.svgElem,J=!r,w=[],D=n.color,t=v(n.zIndex,0),p=n.events,w={"class":"highcharts-plot-"+(A?"band ":"line ")+(n.className||"")},B={},H=d.chart.renderer,F=A?"bands":"lines",h=d.log2lin;d.isLog&&(b=h(b),l=h(l),z=h(z));k?(w={stroke:D,"stroke-width":n.width},n.dashStyle&&(w.dashstyle=n.dashStyle)):A&&(D&&(w.fill=D),n.borderWidth&&(w.stroke=
n.borderColor,w["stroke-width"]=n.borderWidth));B.zIndex=t;F+="-"+t;(D=d.plotLinesAndBandsGroups[F])||(d.plotLinesAndBandsGroups[F]=D=H.g("plot-"+F).attr(B).add());J&&(f.svgElem=r=H.path().attr(w).add(D));if(k)w=d.getPlotLinePath(z,r.strokeWidth());else if(A)w=d.getPlotBandPath(b,l,n);else return;J&&w&&w.length?(r.attr({d:w}),p&&a.objectEach(p,function(a,b){r.on(b,function(a){p[b].apply(f,[a])})})):r&&(w?(r.show(),r.animate({d:w})):(r.hide(),e&&(f.label=e=e.destroy())));c&&q(c.text)&&w&&w.length&&
0<d.width&&0<d.height&&!w.flat?(c=m({align:g&&A&&"center",x:g?!A&&4:10,verticalAlign:!g&&A&&"middle",y:g?A?16:10:A?6:-4,rotation:g&&!A&&90},c),this.renderLabel(c,w,A,t)):e&&e.hide();return f},renderLabel:function(a,d,g,n){var c=this.label,e=this.axis.chart.renderer;c||(c={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(g?"band":"line")+"-label "+(a.className||"")},c.zIndex=n,this.label=c=e.text(a.text,0,0,a.useHTML).attr(c).add(),c.css(a.style));n=d.xBounds||[d[1],d[4],
g?d[6]:d[1]];d=d.yBounds||[d[2],d[5],g?d[7]:d[2]];g=G(n);e=G(d);c.align(a,!1,{x:g,y:e,width:C(n)-g,height:C(d)-e});c.show()},destroy:function(){t(this.axis.plotLinesAndBands,this);delete this.axis;f(this)}};a.extend(E.prototype,{getPlotBandPath:function(a,d){var g=this.getPlotLinePath(d,null,null,!0),n=this.getPlotLinePath(a,null,null,!0),c=[],e=this.horiz,l=1,b;a=a<this.min&&d<this.min||a>this.max&&d>this.max;if(n&&g)for(a&&(b=n.toString()===g.toString(),l=0),a=0;a<n.length;a+=6)e&&g[a+1]===n[a+
1]?(g[a+1]+=l,g[a+4]+=l):e||g[a+2]!==n[a+2]||(g[a+2]+=l,g[a+5]+=l),c.push("M",n[a+1],n[a+2],"L",n[a+4],n[a+5],g[a+4],g[a+5],g[a+1],g[a+2],"z"),c.flat=b;return c},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,d){var g=(new a.PlotLineOrBand(this,f)).render(),n=this.userOptions;g&&(d&&(n[d]=n[d]||[],n[d].push(f)),this.plotLinesAndBands.push(g));return g},removePlotBandOrLine:function(a){for(var d=
this.plotLinesAndBands,g=this.options,n=this.userOptions,c=d.length;c--;)d[c].id===a&&d[c].destroy();k([g.plotLines||[],n.plotLines||[],g.plotBands||[],n.plotBands||[]],function(e){for(c=e.length;c--;)e[c].id===a&&t(e,e[c])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(N,V);(function(a){var E=a.dateFormat,C=a.each,G=a.extend,q=a.format,f=a.isNumber,k=a.map,t=a.merge,m=a.pick,v=a.splat,u=a.syncTimeout,d=a.timeUnits;a.Tooltip=
function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){C(this.chart.series,function(d){var c=d&&d.tt;c&&(!c.isActive||a?d.tt=c.destroy():c.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,d.shape||
"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();t(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,t(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());
clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,d,c,e){var l=this,b=l.now,g=!1!==l.options.animation&&!l.isHidden&&(1<Math.abs(a-b.x)||1<Math.abs(d-b.y)),n=l.followPointer||1<l.len;G(b,{x:g?(2*b.x+a)/3:a,y:g?(b.y+d)/2:d,anchorX:n?void 0:g?(2*b.anchorX+c)/3:c,anchorY:n?void 0:g?(b.anchorY+e)/2:e});l.getLabel().attr(b);g&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){l&&l.move(a,d,c,e)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);
a=m(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,d){var c,e=this.chart,l=e.inverted,b=e.plotTop,g=e.plotLeft,n=0,f=0,r,m;a=v(a);c=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=e.pointer.normalize(d)),c=[d.chartX-e.plotLeft,d.chartY-b]);c||(C(a,function(a){r=a.series.yAxis;m=a.series.xAxis;n+=a.plotX+(!l&&m?m.left-g:0);f+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!l&&r?r.top-
b:0)}),n/=a.length,f/=a.length,c=[l?e.plotWidth-f:n,this.shared&&!l&&1<a.length&&d?d.chartY-b:l?e.plotHeight-n:f]);return k(c,Math.round)},getPosition:function(a,d,c){var e=this.chart,l=this.distance,b={},g=e.inverted&&c.h||0,n,f=["y",e.chartHeight,d,c.plotY+e.plotTop,e.plotTop,e.plotTop+e.plotHeight],r=["x",e.chartWidth,a,c.plotX+e.plotLeft,e.plotLeft,e.plotLeft+e.plotWidth],k=!this.followPointer&&m(c.ttBelow,!e.inverted===!!c.negative),w=function(a,c,e,h,p,d){var n=e<h-l,r=h+l+e<c,z=h-l-e;h+=l;
if(k&&r)b[a]=h;else if(!k&&n)b[a]=z;else if(n)b[a]=Math.min(d-e,0>z-g?z:z-g);else if(r)b[a]=Math.max(p,h+g+e>c?h:h+g);else return!1},D=function(a,c,e,h){var p;h<l||h>c-l?p=!1:b[a]=h<e/2?1:h>c-e/2?c-e-2:h-e/2;return p},t=function(a){var b=f;f=r;r=b;n=a},p=function(){!1!==w.apply(0,f)?!1!==D.apply(0,r)||n||(t(!0),p()):n?b.x=b.y=0:(t(!0),p())};(e.inverted||1<this.len)&&t();p();return b},defaultFormatter:function(a){var d=this.points||v(this),c;c=[a.tooltipFooterHeaderFormatter(d[0])];c=c.concat(a.bodyFormatter(d));
c.push(a.tooltipFooterHeaderFormatter(d[0],!0));return c},refresh:function(a,d){var c,e=this.options,l,b=a,g,n={},f=[];c=e.formatter||this.defaultFormatter;var n=this.shared,r;e.enabled&&(clearTimeout(this.hideTimer),this.followPointer=v(b)[0].series.tooltipOptions.followPointer,g=this.getAnchor(b,d),d=g[0],l=g[1],!n||b.series&&b.series.noSharedTooltip?n=b.getLabelConfig():(C(b,function(a){a.setState("hover");f.push(a.getLabelConfig())}),n={x:b[0].category,y:b[0].y},n.points=f,b=b[0]),this.len=f.length,
n=c.call(n,this),r=b.series,this.distance=m(r.tooltipOptions.distance,16),!1===n?this.hide():(c=this.getLabel(),this.isHidden&&c.attr({opacity:1}).show(),this.split?this.renderSplit(n,v(a)):(e.style.width||c.css({width:this.chart.spacingBox.width}),c.attr({text:n&&n.join?n.join(""):n}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+m(b.colorIndex,r.colorIndex)),c.attr({stroke:e.borderColor||b.color||r.color||"#666666"}),this.updatePosition({plotX:d,plotY:l,negative:b.negative,
ttBelow:b.ttBelow,h:g[2]||0})),this.isHidden=!1))},renderSplit:function(d,n){var c=this,e=[],l=this.chart,b=l.renderer,g=!0,f=this.options,k=0,r=this.getLabel();a.isString(d)&&(d=[!1,d]);C(d.slice(0,n.length+1),function(a,d){if(!1!==a){d=n[d-1]||{isHeader:!0,plotX:n[0].plotX};var z=d.series||c,w=z.tt,p=d.series||{},B="highcharts-color-"+m(d.colorIndex,p.colorIndex,"none");w||(z.tt=w=b.label(null,null,null,"callout",null,null,f.useHTML).addClass("highcharts-tooltip-box "+B).attr({padding:f.padding,
r:f.borderRadius,fill:f.backgroundColor,stroke:f.borderColor||d.color||p.color||"#333333","stroke-width":f.borderWidth}).add(r));w.isActive=!0;w.attr({text:a});w.css(f.style).shadow(f.shadow);a=w.getBBox();p=a.width+w.strokeWidth();d.isHeader?(k=a.height,p=Math.max(0,Math.min(d.plotX+l.plotLeft-p/2,l.chartWidth-p))):p=d.plotX+l.plotLeft-m(f.distance,16)-p;0>p&&(g=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=l.plotTop;e.push({target:d.isHeader?l.plotHeight+k:a,rank:d.isHeader?
1:0,size:z.tt.getBBox().height+1,point:d,x:p,tt:w})}});this.cleanSplit();a.distribute(e,l.plotHeight+k);C(e,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:g||b.isHeader?a.x:b.plotX+l.plotLeft+m(f.distance,16),y:a.pos+l.plotTop,anchorX:b.isHeader?b.plotX+l.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+l.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var d=this.chart,c=this.getLabel(),c=(this.options.positioner||this.getPosition).call(this,
c.width,c.height,a);this.move(Math.round(c.x),Math.round(c.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getDateFormat:function(a,n,c,e){var l=E("%m-%d %H:%M:%S.%L",n),b,g,f={millisecond:15,second:12,minute:9,hour:6,day:3},k="millisecond";for(g in d){if(a===d.week&&+E("%w",n)===c&&"00:00:00.000"===l.substr(6)){g="week";break}if(d[g]>a){g=k;break}if(f[g]&&l.substr(f[g])!=="01-01 00:00:00.000".substr(f[g]))break;"week"!==g&&(k=g)}g&&(b=e[g]);return b},getXDateFormat:function(a,d,c){d=d.dateTimeLabelFormats;
var e=c&&c.closestPointRange;return(e?this.getDateFormat(e,a.x,c.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){d=d?"footer":"header";var c=a.series,e=c.tooltipOptions,l=e.xDateFormat,b=c.xAxis,g=b&&"datetime"===b.options.type&&f(a.key),n=e[d+"Format"];g&&!l&&(l=this.getXDateFormat(a,e,b));g&&l&&C(a.point&&a.point.tooltipDateKeys||["key"],function(a){n=n.replace("{point."+a+"}","{point."+a+":"+l+"}")});return q(n,{point:a,series:c})},bodyFormatter:function(a){return k(a,
function(a){var c=a.series.tooltipOptions;return(c[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,c[(a.point.formatPrefix||"point")+"Format"])})}}})(N);(function(a){var E=a.addEvent,C=a.attr,G=a.charts,q=a.color,f=a.css,k=a.defined,t=a.each,m=a.extend,v=a.find,u=a.fireEvent,d=a.isObject,g=a.offset,n=a.pick,c=a.removeEvent,e=a.splat,l=a.Tooltip;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=a;this.runChartClick=
c.chart.events&&!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};l&&(a.tooltip=new l(a,c.tooltip),this.followTouchMove=n(c.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,e=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(e=n(c.pinchType,e));this.zoomX=a=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=a&&!b||e&&b;this.zoomVert=e&&!b||a&&b;this.hasZoom=a||e},normalize:function(a,c){var b;b=a.touches?a.touches.length?a.touches.item(0):
a.changedTouches[0]:a;c||(this.chartPosition=c=g(this.chart.container));return m(a,{chartX:Math.round(b.pageX-c.left),chartY:Math.round(b.pageY-c.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};t(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,c,e){var b;t(a,function(a){var l=!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(e,l);if((l=d(a,
!0))&&!(l=!d(b,!0)))var l=b.distX-a.distX,g=b.dist-a.dist,n=(a.series.group&&a.series.group.zIndex)-(b.series.group&&b.series.group.zIndex),l=0<(0!==l&&c?l:0!==g?g:0!==n?n:b.series.index>a.series.index?-1:1);l&&(b=a)});return b},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,c){var b=a.series,e=b.xAxis,b=b.yAxis;if(e&&b)return c?{chartX:e.len+e.pos-a.clientX,chartY:b.len+b.pos-a.plotY}:{chartX:a.clientX+e.pos,chartY:a.plotY+
b.pos}},getHoverData:function(b,c,e,l,g,f,w){var r,k=[],p=w&&w.isBoosting;l=!(!l||!b);w=c&&!c.stickyTracking?[c]:a.grep(e,function(a){return a.visible&&!(!g&&a.directTouch)&&n(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(r=l?b:this.findNearestKDPoint(w,g,f))&&r.series;r&&(g&&!c.noSharedTooltip?(w=a.grep(e,function(a){return a.visible&&!(!g&&a.directTouch)&&n(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),t(w,function(a){var b=v(a.points,function(a){return a.x===r.x&&!a.isNull});
d(b)&&(p&&(b=a.getPoint(b)),k.push(b))})):k.push(r));return{hoverPoint:r,hoverSeries:c,hoverPoints:k}},runPointActions:function(b,c){var e=this.chart,d=e.tooltip&&e.tooltip.options.enabled?e.tooltip:void 0,l=d?d.shared:!1,g=c||e.hoverPoint,f=g&&g.series||e.hoverSeries,f=this.getHoverData(g,f,e.series,!!c||f&&f.directTouch&&this.isDirectTouch,l,b,{isBoosting:e.isBoosting}),k,g=f.hoverPoint;k=f.hoverPoints;c=(f=f.hoverSeries)&&f.tooltipOptions.followPointer;l=l&&f&&!f.noSharedTooltip;if(g&&(g!==e.hoverPoint||
d&&d.isHidden)){t(e.hoverPoints||[],function(b){-1===a.inArray(b,k)&&b.setState()});t(k||[],function(a){a.setState("hover")});if(e.hoverSeries!==f)f.onMouseOver();e.hoverPoint&&e.hoverPoint.firePointEvent("mouseOut");if(!g.series)return;g.firePointEvent("mouseOver");e.hoverPoints=k;e.hoverPoint=g;d&&d.refresh(l?k:g,b)}else c&&d&&!d.isHidden&&(g=d.getAnchor([{}],b),d.updatePosition({plotX:g[0],plotY:g[1]}));this.unDocMouseMove||(this.unDocMouseMove=E(e.container.ownerDocument,"mousemove",function(b){var c=
G[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));t(e.axes,function(c){var e=n(c.crosshair.snap,!0),d=e?a.find(k,function(a){return a.series[c.coll]===c}):void 0;d||!e?c.drawCrosshair(b,d):c.hideCrosshair()})},reset:function(a,c){var b=this.chart,d=b.hoverSeries,l=b.hoverPoint,g=b.hoverPoints,n=b.tooltip,f=n&&n.shared?g:l;a&&f&&t(e(f),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)n&&f&&(n.refresh(f),l&&(l.setState(l.state,!0),t(b.axes,function(a){a.crosshair&&a.drawCrosshair(null,
l)})));else{if(l)l.onMouseOut();g&&t(g,function(a){a.setState()});if(d)d.onMouseOut();n&&n.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());t(b.axes,function(a){a.hideCrosshair()});this.hoverX=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,e;t(b.series,function(d){e=a||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(e),d.markerGroup&&(d.markerGroup.attr(e),d.markerGroup.clip(c?b.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(e))});
b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,e=a.chartX,d=a.chartY,l=this.zoomHor,g=this.zoomVert,n=b.plotLeft,f=b.plotTop,p=b.plotWidth,k=b.plotHeight,H,m=this.selectionMarker,h=this.mouseDownX,x=this.mouseDownY,t=c.panKey&&a[c.panKey+"Key"];m&&m.touch||(e<n?e=n:e>n+p&&(e=n+p),d<f?d=f:d>f+k&&(d=f+k),this.hasDragged=
Math.sqrt(Math.pow(h-e,2)+Math.pow(x-d,2)),10<this.hasDragged&&(H=b.isInsidePlot(h-n,x-f),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&H&&!t&&!m&&(this.selectionMarker=m=b.renderer.rect(n,f,l?1:p,g?1:k,0).attr({fill:c.selectionMarkerFill||q("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),m&&l&&(e-=h,m.attr({width:Math.abs(e),x:(0<e?0:e)+h})),m&&g&&(e=d-x,m.attr({height:Math.abs(e),y:(0<e?0:e)+x})),H&&!m&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=
this,c=this.chart,e=this.hasPinched;if(this.selectionMarker){var d={originalEvent:a,xAxis:[],yAxis:[]},l=this.selectionMarker,g=l.attr?l.attr("x"):l.x,n=l.attr?l.attr("y"):l.y,q=l.attr?l.attr("width"):l.width,p=l.attr?l.attr("height"):l.height,B;if(this.hasDragged||e)t(c.axes,function(c){if(c.zoomEnabled&&k(c.min)&&(e||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var l=c.horiz,h="touchend"===a.type?c.minPixelPadding:0,f=c.toValue((l?g:n)+h),l=c.toValue((l?g+q:n+p)-h);d[c.coll].push({axis:c,min:Math.min(f,
l),max:Math.max(f,l)});B=!0}}),B&&u(c,"selection",d,function(a){c.zoom(m(a,e?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();e&&this.scaleGroups()}c&&(f(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},
onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;k(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=
c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,c){for(var b;a;){if(b=C(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||
!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,e=b.plotLeft,d=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(u(c.series,"click",m(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(m(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-e,a.chartY-d)&&u(b,"click",a)))},setDOMEvents:function(){var b=
this,c=b.chart.container,e=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};E(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&E(e,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&E(e,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b=this,e=this.chart.container.ownerDocument;
b.unDocMouseMove&&b.unDocMouseMove();c(b.chart.container,"mouseleave",b.onContainerMouseLeave);a.chartCount||(c(e,"mouseup",b.onDocumentMouseUp),a.hasTouch&&c(e,"touchend",b.onDocumentTouchEnd));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,c){b[c]=null})}}})(N);(function(a){var E=a.charts,C=a.each,G=a.extend,q=a.map,f=a.noop,k=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,f,k,q,d,g){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,k,q,d,g);this.zoomVert&&this.pinchTranslateDirection(!1,
a,f,k,q,d,g)},pinchTranslateDirection:function(a,f,k,q,d,g,n,c){var e=this.chart,l=a?"x":"y",b=a?"X":"Y",m="chart"+b,t=a?"width":"height",u=e["plot"+(a?"Left":"Top")],r,v,w=c||1,D=e.inverted,M=e.bounds[a?"h":"v"],p=1===f.length,B=f[0][m],H=k[0][m],F=!p&&f[1][m],h=!p&&k[1][m],x;k=function(){!p&&20<Math.abs(B-F)&&(w=c||Math.abs(H-h)/Math.abs(B-F));v=(u-H)/w+B;r=e["plot"+(a?"Width":"Height")]/w};k();f=v;f<M.min?(f=M.min,x=!0):f+r>M.max&&(f=M.max-r,x=!0);x?(H-=.8*(H-n[l][0]),p||(h-=.8*(h-n[l][1])),k()):
n[l]=[H,h];D||(g[l]=v-u,g[t]=r);g=D?1/w:w;d[t]=r;d[l]=f;q[D?a?"scaleY":"scaleX":"scale"+b]=w;q["translate"+b]=g*u+(H-g*B)},pinch:function(a){var m=this,t=m.chart,u=m.pinchDown,d=a.touches,g=d.length,n=m.lastValidTouch,c=m.hasZoom,e=m.selectionMarker,l={},b=1===g&&(m.inClass(a.target,"highcharts-tracker")&&t.runTrackerClick||m.runChartClick),z={};1<g&&(m.initiated=!0);c&&m.initiated&&!b&&a.preventDefault();q(d,function(a){return m.normalize(a)});"touchstart"===a.type?(C(d,function(a,b){u[b]={chartX:a.chartX,
chartY:a.chartY}}),n.x=[u[0].chartX,u[1]&&u[1].chartX],n.y=[u[0].chartY,u[1]&&u[1].chartY],C(t.axes,function(a){if(a.zoomEnabled){var b=t.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,e=a.toPixels(k(a.options.min,a.dataMin)),d=a.toPixels(k(a.options.max,a.dataMax)),l=Math.max(e,d);b.min=Math.min(a.pos,Math.min(e,d)-c);b.max=Math.max(a.pos+a.len,l+c)}}),m.res=!0):m.followTouchMove&&1===g?this.runPointActions(m.normalize(a)):u.length&&(e||(m.selectionMarker=e=G({destroy:f,touch:!0},t.plotBox)),m.pinchTranslate(u,
d,l,e,z,n),m.hasPinched=c,m.scaleGroups(l,z),m.res&&(m.res=!1,this.reset(!1,0)))},touch:function(f,m){var q=this.chart,t,d;if(q.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=q.index;1===f.touches.length?(f=this.normalize(f),(d=q.isInsidePlot(f.chartX-q.plotLeft,f.chartY-q.plotTop))&&!q.openMenu?(m&&this.runPointActions(f),"touchmove"===f.type&&(m=this.pinchDown,t=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-f.chartX,2)+Math.pow(m[0].chartY-f.chartY,2)):!1),k(t,
!0)&&this.pinch(f)):m&&this.reset()):2===f.touches.length&&this.pinch(f)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(f)}})})(N);(function(a){var E=a.addEvent,C=a.charts,G=a.css,q=a.doc,f=a.extend,k=a.noop,t=a.Pointer,m=a.removeEvent,v=a.win,u=a.wrap;if(!a.hasTouch&&(v.PointerEvent||v.MSPointerEvent)){var d={},g=!!v.PointerEvent,n=function(){var c=
[];c.item=function(a){return this[a]};a.objectEach(d,function(a){c.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return c},c=function(c,d,b,g){"touch"!==c.pointerType&&c.pointerType!==c.MSPOINTER_TYPE_TOUCH||!C[a.hoverChartIndex]||(g(c),g=C[a.hoverChartIndex].pointer,g[d]({type:b,target:c.currentTarget,preventDefault:k,touches:n()}))};f(t.prototype,{onContainerPointerDown:function(a){c(a,"onContainerTouchStart","touchstart",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},
onContainerPointerMove:function(a){c(a,"onContainerTouchMove","touchmove",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY};d[a.pointerId].target||(d[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){c(a,"onDocumentTouchEnd","touchend",function(a){delete d[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,g?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,g?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(q,g?
"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});u(t.prototype,"init",function(a,c,b){a.call(this,c,b);this.hasZoom&&G(c.container,{"-ms-touch-action":"none","touch-action":"none"})});u(t.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(E)});u(t.prototype,"destroy",function(a){this.batchMSEvents(m);a.call(this)})}})(N);(function(a){var E=a.addEvent,C=a.css,G=a.discardElement,q=a.defined,f=a.each,k=a.isFirefox,t=a.marginNames,m=a.merge,
v=a.pick,u=a.setAnimation,d=a.stableSort,g=a.win,n=a.wrap;a.Legend=function(a,e){this.init(a,e)};a.Legend.prototype={init:function(a,e){this.chart=a;this.setOptions(e);e.enabled&&(this.render(),E(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=v(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=m(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=c;this.initialItemY=c-5;this.itemHeight=
this.maxItemWidth=0;this.symbolWidth=v(a.symbolWidth,16);this.pages=[]},update:function(a,e){var c=this.chart;this.setOptions(m(!0,this.options,a));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;v(e,!0)&&c.redraw()},colorizeItem:function(a,e){a.legendGroup[e?"removeClass":"addClass"]("highcharts-legend-item-hidden");var c=this.options,b=a.legendItem,d=a.legendLine,g=a.legendSymbol,f=this.itemHiddenStyle.color,c=e?c.itemStyle.color:f,n=e?a.color||f:f,k=a.options&&a.options.marker,m={fill:n};b&&b.css({fill:c,
color:c});d&&d.attr({stroke:n});g&&(k&&g.isMarker&&(m=a.pointAttribs(),e||(m.stroke=m.fill=f)),g.attr(m))},positionItem:function(a){var c=this.options,d=c.symbolPadding,c=!c.rtl,b=a._legendItemPos,g=b[0],b=b[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?g:this.legendWidth-g-2*d-4,b);f&&(f.x=g,f.y=b)},destroyItem:function(a){var c=a.checkbox;f(["legendItem","legendLine","legendSymbol","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())});c&&G(a.checkbox)},destroy:function(){function a(a){this[a]&&
(this[a]=this[a].destroy())}f(this.getAllItems(),function(c){f(["legendItem","legendGroup"],a,c)});f("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var c=this.group&&this.group.alignAttr,d,b=this.clipHeight||this.legendHeight,g=this.titleHeight;c&&(d=c.translateY,f(this.allItems,function(e){var l=e.checkbox,f;l&&(f=d+g+l.y+(a||0)+3,C(l,{left:c.translateX+e.checkboxOffset+l.x-20+"px",top:f+"px",display:f>d-6&&f<d+b-6?"":"none"}))}))},
renderTitle:function(){var a=this.options,e=this.padding,d=a.title,b=0;d.text&&(this.title||(this.title=this.chart.renderer.label(d.text,e-3,e-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(d.style).add(this.group)),a=this.title.getBBox(),b=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:b}));this.titleHeight=b},setText:function(c){var e=this.options;c.legendItem.attr({text:e.labelFormat?a.format(e.labelFormat,c):e.labelFormatter.call(c)})},renderItem:function(a){var c=
this.chart,d=c.renderer,b=this.options,g="horizontal"===b.layout,f=this.symbolWidth,n=b.symbolPadding,r=this.itemStyle,k=this.itemHiddenStyle,w=this.padding,q=g?v(b.itemDistance,20):0,t=!b.rtl,p=b.width,B=b.itemMarginBottom||0,H=this.itemMarginTop,F=a.legendItem,h=!a.series,x=!h&&a.series.drawLegendSymbol?a.series:a,u=x.options,K=this.createCheckboxForItem&&u&&u.showCheckbox,u=f+n+q+(K?20:0),P=b.useHTML,L=a.options.className;F||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+x.type+"-series highcharts-color-"+
a.colorIndex+(L?" "+L:"")+(h?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=F=d.text("",t?f+n:-n,this.baseline||0,P).css(m(a.visible?r:k)).attr({align:t?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(f=r.fontSize,this.fontMetrics=d.fontMetrics(f,F),this.baseline=this.fontMetrics.f+3+H,F.attr("y",this.baseline)),this.symbolHeight=b.symbolHeight||this.fontMetrics.f,x.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,F,P),K&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);r.width||F.css({width:(b.itemWidth||b.width||c.spacingBox.width)-u});this.setText(a);d=F.getBBox();r=a.checkboxOffset=b.itemWidth||a.legendItemWidth||d.width+u;this.itemHeight=d=Math.round(a.legendItemHeight||d.height||this.symbolHeight);g&&this.itemX-w+r>(p||c.spacingBox.width-2*w-b.x)&&(this.itemX=w,this.itemY+=H+this.lastLineHeight+B,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,r);this.lastItemY=H+this.itemY+B;this.lastLineHeight=Math.max(d,
this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];g?this.itemX+=r:(this.itemY+=H+d+B,this.lastLineHeight=d);this.offsetWidth=p||Math.max((g?this.itemX-w-(a.checkbox?0:q):r)+w,this.offsetWidth)},getAllItems:function(){var a=[];f(this.chart.series,function(c){var e=c&&c.options;c&&v(e.showInLegend,q(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===e.legendType?c.data:c)))});return a},adjustMargins:function(a,e){var c=this.chart,b=this.options,d=b.align.charAt(0)+b.verticalAlign.charAt(0)+
b.layout.charAt(0);b.floating||f([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(g,l){g.test(d)&&!q(a[l])&&(c[t[l]]=Math.max(c[t[l]],c.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*b[l%2?"x":"y"]+v(b.margin,12)+e[l]))})},render:function(){var a=this,e=a.chart,g=e.renderer,b=a.group,n,k,q,r,t=a.box,w=a.options,D=a.padding;a.itemX=D;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;b||(a.group=b=g.g("legend").attr({zIndex:7}).add(),a.contentGroup=g.g().attr({zIndex:1}).add(b),
a.scrollGroup=g.g().add(a.contentGroup));a.renderTitle();n=a.getAllItems();d(n,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});w.reversed&&n.reverse();a.allItems=n;a.display=k=!!n.length;a.lastLineHeight=0;f(n,function(b){a.renderItem(b)});q=(w.width||a.offsetWidth)+D;r=a.lastItemY+a.lastLineHeight+a.titleHeight;r=a.handleOverflow(r);r+=D;t||(a.box=t=g.rect().addClass("highcharts-legend-box").attr({r:w.borderRadius}).add(b),t.isNew=!0);t.attr({stroke:w.borderColor,
"stroke-width":w.borderWidth||0,fill:w.backgroundColor||"none"}).shadow(w.shadow);0<q&&0<r&&(t[t.isNew?"attr":"animate"](t.crisp.call({},{x:0,y:0,width:q,height:r},t.strokeWidth())),t.isNew=!1);t[k?"show":"hide"]();a.legendWidth=q;a.legendHeight=r;f(n,function(b){a.positionItem(b)});k&&b.align(m(w,{width:q,height:r}),!0,"spacingBox");e.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,d=this.chart,b=d.renderer,g=this.options,n=g.y,k=this.padding,d=d.spacingBox.height+("top"===
g.verticalAlign?-n:n)-k,n=g.maxHeight,r,m=this.clipRect,w=g.navigation,q=v(w.animation,!0),t=w.arrowSize||12,p=this.nav,B=this.pages,H,F=this.allItems,h=function(a){"number"===typeof a?m.attr({height:a}):m&&(c.clipRect=m.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+k+"px,9999px,"+(k+a)+"px,0)":"auto")};"horizontal"!==g.layout||"middle"===g.verticalAlign||g.floating||(d/=2);n&&(d=Math.min(d,n));B.length=0;a>d&&!1!==w.enabled?(this.clipHeight=r=Math.max(d-
20-this.titleHeight-k,0),this.currentPage=v(this.currentPage,1),this.fullHeight=a,f(F,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var e=B.length;if(!e||c-B[e-1]>r&&(H||c)!==B[e-1])B.push(H||c),e++;b===F.length-1&&c+a-B[e-1]>r&&B.push(c);c!==H&&(H=c)}),m||(m=c.clipRect=b.clipRect(0,k,9999,0),c.contentGroup.clip(m)),h(r),p||(this.nav=p=b.g().attr({zIndex:1}).add(this.group),this.up=b.symbol("triangle",0,0,t,t).on("click",function(){c.scroll(-1,q)}).add(p),this.pager=
b.text("",15,10).addClass("highcharts-legend-navigation").css(w.style).add(p),this.down=b.symbol("triangle-down",0,0,t,t).on("click",function(){c.scroll(1,q)}).add(p)),c.scroll(0),a=d):p&&(h(),this.nav=p.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,e){var c=this.pages,b=c.length;a=this.currentPage+a;var d=this.clipHeight,g=this.options.navigation,n=this.pager,f=this.padding;a>b&&(a=b);0<a&&(void 0!==e&&u(e,this.chart),this.nav.attr({translateX:f,translateY:d+
this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),n.attr({text:a+"/"+b}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===b?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?g.inactiveColor:g.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===b?g.inactiveColor:g.activeColor}).css({cursor:a===b?"default":"pointer"}),e=-c[a-
1]+this.initialItemY,this.scrollGroup.animate({translateY:e}),this.currentPage=a,this.positionCheckboxes(e))}};a.LegendSymbolMixin={drawRectangle:function(a,e){var c=a.symbolHeight,b=a.options.squareSymbol;e.legendSymbol=this.chart.renderer.rect(b?(a.symbolWidth-c)/2:0,a.baseline-c+1,b?c:a.symbolWidth,c,v(a.options.symbolRadius,c/2)).addClass("highcharts-point").attr({zIndex:3}).add(e.legendGroup)},drawLineMarker:function(a){var c=this.options,d=c.marker,b=a.symbolWidth,g=a.symbolHeight,n=g/2,f=this.chart.renderer,
k=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var q;q={"stroke-width":c.lineWidth||0};c.dashStyle&&(q.dashstyle=c.dashStyle);this.legendLine=f.path(["M",0,a,"L",b,a]).addClass("highcharts-graph").attr(q).add(k);d&&!1!==d.enabled&&(c=Math.min(v(d.radius,n),n),0===this.symbol.indexOf("url")&&(d=m(d,{width:g,height:g}),c=0),this.legendSymbol=d=f.symbol(this.symbol,b/2-c,a-c,2*c,2*c,d).addClass("highcharts-point").add(k),d.isMarker=!0)}};(/Trident\/7\.0/.test(g.navigator.userAgent)||
k)&&n(a.Legend.prototype,"positionItem",function(a,e){var c=this,b=function(){e._legendItemPos&&a.call(c,e)};b();setTimeout(b)})})(N);(function(a){var E=a.addEvent,C=a.animate,G=a.animObject,q=a.attr,f=a.doc,k=a.Axis,t=a.createElement,m=a.defaultOptions,v=a.discardElement,u=a.charts,d=a.css,g=a.defined,n=a.each,c=a.extend,e=a.find,l=a.fireEvent,b=a.grep,z=a.isNumber,A=a.isObject,I=a.isString,r=a.Legend,J=a.marginNames,w=a.merge,D=a.objectEach,M=a.Pointer,p=a.pick,B=a.pInt,H=a.removeEvent,F=a.seriesTypes,
h=a.splat,x=a.svg,R=a.syncTimeout,K=a.win,P=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new P(a,b,c)};c(P.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(I(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,d,h=b.series,p=b.plotOptions||{};b.series=null;e=w(m,b);for(d in e.plotOptions)e.plotOptions[d].tooltip=p[d]&&w(p[d].tooltip)||void 0;e.tooltip.userOptions=b.chart&&b.chart.forExport&&
b.tooltip.userOptions||b.tooltip;e.series=b.series=h;this.userOptions=b;b=e.chart;d=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var g=this;g.index=u.length;u.push(g);a.chartCount++;d&&D(d,function(a,b){E(g,b,a)});g.xAxis=[];g.yAxis=[];g.pointCount=g.colorCounter=g.symbolCounter=0;g.firstRender()},initSeries:function(b){var c=this.options.chart;
(c=F[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var e=this.axes,d=this.series,h=this.pointer,p=this.legend,g=this.isDirtyLegend,f,k,r=this.hasCartesianSeries,B=this.isDirtyBox,m,H=this.renderer,x=
H.isHidden(),w=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);x&&this.temporaryDisplay();this.layOutTitles();for(b=d.length;b--;)if(m=d[b],m.options.stacking&&(f=!0,m.isDirty)){k=!0;break}if(k)for(b=d.length;b--;)m=d[b],m.options.stacking&&(m.isDirty=!0);n(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),g=!0);a.isDirtyData&&l(a,"updatedData")});g&&p.options.enabled&&(p.render(),this.isDirtyLegend=!1);f&&this.getStacks();r&&n(e,function(a){a.updateNames();
a.setScale()});this.getMargins();r&&(n(e,function(a){a.isDirty&&(B=!0)}),n(e,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,w.push(function(){l(a,"afterSetExtremes",c(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(B||f)&&a.redraw()}));B&&this.drawChartBox();l(this,"predraw");n(d,function(a){(B||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);H.draw();l(this,"redraw");l(this,"render");x&&this.temporaryDisplay(!0);n(w,function(a){a.call()})},get:function(a){function b(b){return b.id===
a||b.options&&b.options.id===a}var c,d=this.series,h;c=e(this.axes,b)||e(this.series,b);for(h=0;!c&&h<d.length;h++)c=e(d[h].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=h(b.xAxis||{}),b=b.yAxis=h(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new k(a,b)})},getSelectedPoints:function(){var a=[];n(this.series,function(c){a=a.concat(b(c.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return b(this.series,
function(a){return a.selected})},setTitle:function(a,b,c){var e=this,d=e.options,h;h=d.title=w({style:{color:"#333333",fontSize:d.isStock?"16px":"18px"}},d.title,a);d=d.subtitle=w({style:{color:"#666666"}},d.subtitle,b);n([["title",a,h],["subtitle",b,d]],function(a,b){var c=a[0],d=e[c],h=a[1];a=a[2];d&&h&&(e[c]=d=d.destroy());a&&!d&&(e[c]=e.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)},e[c].css(a.style))});
e.layOutTitles(c)},layOutTitles:function(a){var b=0,e,d=this.renderer,h=this.spacingBox;n(["title","subtitle"],function(a){var e=this[a],p=this.options[a];a="title"===a?-3:p.verticalAlign?0:b+2;var g;e&&(g=p.style.fontSize,g=d.fontMetrics(g,e).b,e.css({width:(p.width||h.width+p.widthAdjust)+"px"}).align(c({y:a+g},p),!1,"spacingBox"),p.floating||p.verticalAlign||(b=Math.ceil(b+e.getBBox(p.useHTML).height)))},this);e=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&e&&(this.isDirtyBox=e,this.hasRendered&&
p(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,e=this.renderTo;g(c)||(this.containerWidth=a.getStyle(e,"width"));g(b)||(this.containerHeight=a.getStyle(e,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),
delete c.hcOrigStyle),c.hcOrigDetached&&(f.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){f.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,f.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;
if(c===f.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,e=this.options,d=e.chart,h,p;b=this.renderTo;var g=a.uniqueKey(),l;b||(this.renderTo=b=d.renderTo);I(b)&&(this.renderTo=b=f.getElementById(b));b||a.error(13,!0);h=B(q(b,"data-highcharts-chart"));z(h)&&u[h]&&u[h].hasRendered&&u[h].destroy();q(b,"data-highcharts-chart",this.index);b.innerHTML="";d.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();
h=this.chartWidth;p=this.chartHeight;l=c({position:"relative",overflow:"hidden",width:h+"px",height:p+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style);this.container=b=t("div",{id:g},l,b);this._cursor=b.style.cursor;this.renderer=new (a[d.renderer]||a.Renderer)(b,h,p,null,d.forExport,e.exporting&&e.exporting.allowHTML);this.setClassName(d.className);this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=
this.spacing,c=this.margin,e=this.titleOffset;this.resetMargins();e&&!g(c[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&n(a.axes,function(a){a.visible&&
a.getOffset()});n(J,function(e,d){g(c[d])||(a[e]+=b[d])});a.setChartSize()},reflow:function(b){var c=this,e=c.options.chart,d=c.renderTo,h=g(e.width)&&g(e.height),p=e.width||a.getStyle(d,"width"),e=e.height||a.getStyle(d,"height"),d=b?b.target:K;if(!h&&!c.isPrinting&&p&&e&&(d===K||d===f)){if(p!==c.containerWidth||e!==c.containerHeight)clearTimeout(c.reflowTimeout),c.reflowTimeout=R(function(){c.container&&c.setSize(void 0,void 0,!1)},b?100:0);c.containerWidth=p;c.containerHeight=e}},initReflow:function(){var a=
this,b;b=E(K,"resize",function(b){a.reflow(b)});E(a,"destroy",b)},setSize:function(b,c,e){var h=this,p=h.renderer;h.isResizing+=1;a.setAnimation(e,h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();b=p.globalAnimation;(b?C:d)(h.container,{width:h.chartWidth+"px",height:h.chartHeight+"px"},b);h.setChartSize(!0);p.setSize(h.chartWidth,h.chartHeight,e);n(h.axes,function(a){a.isDirty=!0;a.setScale()});
h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.redraw(e);h.oldChartHeight=null;l(h,"resize");R(function(){h&&l(h,"endResize",null,function(){--h.isResizing})},G(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,e=this.chartWidth,d=this.chartHeight,h=this.options.chart,p=this.spacing,g=this.clipOffset,l,f,k,r;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=f=Math.round(this.plotTop);this.plotWidth=k=Math.max(0,Math.round(e-l-this.marginRight));
this.plotHeight=r=Math.max(0,Math.round(d-f-this.marginBottom));this.plotSizeX=b?r:k;this.plotSizeY=b?k:r;this.plotBorderWidth=h.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:p[3],y:p[0],width:e-p[3]-p[1],height:d-p[0]-p[2]};this.plotBox=c.plotBox={x:l,y:f,width:k,height:r};e=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(e,g[3])/2);c=Math.ceil(Math.max(e,g[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(e,g[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-
Math.max(e,g[2])/2-c))};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;n(["margin","spacing"],function(c){var e=b[c],d=A(e)?e:[e,e,e,e];n(["Top","Right","Bottom","Left"],function(e,h){a[c][h]=p(b[c+e],d[h])})});n(J,function(b,c){a[b]=p(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,e=this.chartHeight,d=this.chartBackground,
h=this.plotBackground,p=this.plotBorder,g,l=this.plotBGImage,f=a.backgroundColor,n=a.plotBackgroundColor,k=a.plotBackgroundImage,r,m=this.plotLeft,B=this.plotTop,H=this.plotWidth,x=this.plotHeight,w=this.plotBox,q=this.clipRect,D=this.clipBox,F="animate";d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),F="attr");g=a.borderWidth||0;r=g+(a.shadow?8:0);f={fill:f||"none"};if(g||d["stroke-width"])f.stroke=a.borderColor,f["stroke-width"]=g;d.attr(f).shadow(a.shadow);d[F]({x:r/
2,y:r/2,width:c-r-g%2,height:e-r-g%2,r:a.borderRadius});F="animate";h||(F="attr",this.plotBackground=h=b.rect().addClass("highcharts-plot-background").add());h[F](w);h.attr({fill:n||"none"}).shadow(a.plotShadow);k&&(l?l.animate(w):this.plotBGImage=b.image(k,m,B,H,x).add());q?q.animate({width:D.width,height:D.height}):this.clipRect=b.clipRect(D);F="animate";p||(F="attr",this.plotBorder=p=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());p.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||
0,fill:"none"});p[F](p.crisp({x:m,y:B,width:H,height:x},-p.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,e=a.options.series,d,h;n(["inverted","angular","polar"],function(p){c=F[b.type||b.defaultSeriesType];h=b[p]||c&&c.prototype[p];for(d=e&&e.length;!h&&d--;)(c=F[e[d].type])&&c.prototype[p]&&(h=!0);a[p]=h})},linkSeries:function(){var a=this,b=a.series;n(b,function(a){a.linkedSeries.length=0});n(b,function(b){var c=b.options.linkedTo;I(c)&&(c=":previous"===
c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=p(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){n(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&n(b.items,function(e){var d=c(b.style,e.style),h=B(d.left)+a.plotLeft,p=B(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(e.html,h,p).attr({zIndex:2}).css(d).add()})},render:function(){var a=
this.axes,b=this.renderer,c=this.options,e,d,h;this.setTitle();this.legend=new r(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;e=this.plotHeight-=21;n(a,function(a){a.setScale()});this.getAxisMargins();d=1.1<c/this.plotWidth;h=1.05<e/this.plotHeight;if(d||h)n(a,function(a){(a.horiz&&d||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&n(a,function(a){a.visible&&a.render()});this.seriesGroup||
(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=w(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(K.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),
this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,e=b.series,d=b.container,h,p=d&&d.parentNode;l(b,"destroy");b.renderer.forExport?a.erase(u,b):u[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");H(b);for(h=c.length;h--;)c[h]=c[h].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(h=e.length;h--;)e[h]=e[h].destroy();n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML="",H(d),p&&v(d));D(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return x||K!=K.top||"complete"===f.readyState?!0:(f.attachEvent("onreadystatechange",function(){f.detachEvent("onreadystatechange",a.firstRender);"complete"===f.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();l(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();n(b.series||[],function(b){a.initSeries(b)});a.linkSeries();l(a,"beforeRender");M&&(a.pointer=new M(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){n([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);l(this,"load");l(this,"render");g(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(N);(function(a){var E,C=a.each,G=a.extend,q=a.erase,f=a.fireEvent,
k=a.format,t=a.isArray,m=a.isNumber,v=a.pick,u=a.removeEvent;a.Point=E=function(){};a.Point.prototype={init:function(a,g,f){this.series=a;this.color=a.color;this.applyOptions(g,f);a.options.colorByPoint?(g=a.options.colors||a.chart.options.colors,this.color=this.color||g[a.colorCounter],g=g.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===g&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=v(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,g){var d=this.series,
c=d.options.pointValKey||d.pointValKey;a=E.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;c&&(this.y=this[c]);this.isNull=v(this.isValid&&!this.isValid(),null===this.x||!m(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===g&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===g?d.autoIncrement(this):g);return this},optionsToObject:function(a){var d={},f=this.series,
c=f.options.keys,e=c||f.pointArrayMap||["y"],l=e.length,b=0,k=0;if(m(a)||null===a)d[e[0]]=a;else if(t(a))for(!c&&a.length>l&&(f=typeof a[0],"string"===f?d.name=a[0]:"number"===f&&(d.x=a[0]),b++);k<l;)c&&void 0===a[b]||(d[e[k]]=a[b]),b++,k++;else"object"===typeof a&&(d=a,a.dataLabels&&(f._hasPointLabels=!0),a.marker&&(f._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?
" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,g=a.zones,a=a.zoneAxis||"y",f=0,c;for(c=g[f];this[a]>=c.value;)c=g[++f];c&&c.color&&!this.options.color&&(this.color=c.color);return c},destroy:function(){var a=this.series.chart,g=a.hoverPoints,f;a.pointCount--;g&&(this.setState(),
q(g,this),g.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)u(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],g,f=6;f--;)g=a[f],this[g]&&(this[g]=this[g].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,
series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,f=d.tooltipOptions,c=v(f.valueDecimals,""),e=f.valuePrefix||"",l=f.valueSuffix||"";C(d.pointArrayMap||["y"],function(b){b="{point."+b;if(e||l)a=a.replace(b+"}",e+b+"}"+l);a=a.replace(b+"}",b+":,."+c+"f}")});return k(a,{point:this,series:this.series})},firePointEvent:function(a,g,n){var c=this,e=this.series.options;(e.point.events[a]||c.options&&c.options.events&&
c.options.events[a])&&this.importEvents();"click"===a&&e.allowPointSelect&&(n=function(a){c.select&&c.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});f(this,a,g,n)},visible:!0}})(N);(function(a){var E=a.addEvent,C=a.animObject,G=a.arrayMax,q=a.arrayMin,f=a.correctFloat,k=a.Date,t=a.defaultOptions,m=a.defaultPlotOptions,v=a.defined,u=a.each,d=a.erase,g=a.extend,n=a.fireEvent,c=a.grep,e=a.isArray,l=a.isNumber,b=a.isString,z=a.merge,A=a.objectEach,I=a.pick,r=a.removeEvent,J=a.splat,w=a.SVGElement,D=
a.syncTimeout,M=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",
textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,d=a.series,p;c.chart=
a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();g(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;A(e,function(a,b){E(c,b,a)});if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();u(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);d.length&&(p=d[d.length-1]);c._i=I(p&&p._i,-1)+1;a.orderSeries(this.insert(d))},insert:function(a){var b=
this.options.index,c;if(l(b)){for(c=a.length;c--;)if(b>=I(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return I(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,e=b.chart,d;u(b.axisTypes||[],function(h){u(e[h],function(a){d=a.options;if(c[h]===d.index||void 0!==c[h]&&c[h]===d.id||void 0===c[h]&&0===d.index)b.insert(a.series),b[h]=a,a.isDirty=!0});b[h]||b.optionalAxis===h||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=
a.series,e=arguments,d=l(b)?function(e){var d="y"===e&&c.toYData?c.toYData(a):a[e];c[e+"Data"][b]=d}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(e,2))};u(c.parallelArrays,d)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,b=I(b,a.pointStart,0);this.pointInterval=c=I(this.pointInterval,a.pointInterval,1);e&&(a=new k(b),"day"===e?a=+a[k.hcSetDate](a[k.hcGetDate]()+c):"month"===e?a=+a[k.hcSetMonth](a[k.hcGetMonth]()+c):"year"===e&&
(a=+a[k.hcSetFullYear](a[k.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,e=c.plotOptions,d=(b.userOptions||{}).plotOptions||{},p=e[this.type];this.userOptions=a;b=z(p,e.series,a);this.tooltipOptions=z(t.tooltip,t.plotOptions.series&&t.plotOptions.series.tooltip,t.plotOptions[this.type].tooltip,c.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=I(a.stickyTracking,d[this.type]&&d[this.type].stickyTracking,
d.series&&d.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===p.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&v(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,
b,c){var e,d=this.chart,p=this.userOptions,g=a+"Index",f=a+"Counter",l=c?c.length:I(d.options.chart[a+"Count"],d[a+"Count"]);b||(e=I(p[g],p["_"+g]),v(e)||(d.series.length||(d[f]=0),p["_"+g]=e=d[f]%l,d[f]+=1),c&&(b=c[e]));void 0!==e&&(this[g]=e);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||m[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},
drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(c,d,g,f){var h=this,p=h.points,n=p&&p.length||0,k,r=h.options,m=h.chart,w=null,B=h.xAxis,q=r.turboThreshold,H=this.xData,D=this.yData,t=(k=h.pointArrayMap)&&k.length;c=c||[];k=c.length;d=I(d,!0);if(!1!==f&&k&&n===k&&!h.cropped&&!h.hasGroupedData&&h.visible)u(c,function(a,b){p[b].update&&a!==r.data[b]&&p[b].update(a,!1,null,!1)});else{h.xIncrement=null;h.colorCounter=0;u(this.parallelArrays,function(a){h[a+"Data"].length=0});if(q&&
k>q){for(g=0;null===w&&g<k;)w=c[g],g++;if(l(w))for(g=0;g<k;g++)H[g]=this.autoIncrement(),D[g]=c[g];else if(e(w))if(t)for(g=0;g<k;g++)w=c[g],H[g]=w[0],D[g]=w.slice(1,t+1);else for(g=0;g<k;g++)w=c[g],H[g]=w[0],D[g]=w[1];else a.error(12)}else for(g=0;g<k;g++)void 0!==c[g]&&(w={series:h},h.pointClass.prototype.applyOptions.apply(w,[c[g]]),h.updateParallelArrays(w,g));D&&b(D[0])&&a.error(14,!0);h.data=[];h.options.data=h.userOptions.data=c;for(g=n;g--;)p[g]&&p[g].destroy&&p[g].destroy();B&&(B.minRange=
B.userMinRange);h.isDirty=m.isDirtyBox=!0;h.isDirtyData=!!p;g=!1}"point"===r.legendType&&(this.processData(),this.generatePoints());d&&m.redraw(g)},processData:function(b){var c=this.xData,e=this.yData,d=c.length,h;h=0;var p,g,f=this.xAxis,l,n=this.options;l=n.cropThreshold;var k=this.getExtremesFromAll||n.getExtremesFromAll,r=this.isCartesian,n=f&&f.val2lin,m=f&&f.isLog,w,q;if(r&&!this.isDirty&&!f.isDirty&&!this.yAxis.isDirty&&!b)return!1;f&&(b=f.getExtremes(),w=b.min,q=b.max);if(r&&this.sorted&&
!k&&(!l||d>l||this.forceCrop))if(c[d-1]<w||c[0]>q)c=[],e=[];else if(c[0]<w||c[d-1]>q)h=this.cropData(this.xData,this.yData,w,q),c=h.xData,e=h.yData,h=h.start,p=!0;for(l=c.length||1;--l;)d=m?n(c[l])-n(c[l-1]):c[l]-c[l-1],0<d&&(void 0===g||d<g)?g=d:0>d&&this.requireSorting&&a.error(15);this.cropped=p;this.cropStart=h;this.processedXData=c;this.processedYData=e;this.closestPointRange=g},cropData:function(a,b,c,e){var d=a.length,p=0,g=d,f=I(this.cropShoulder,1),l;for(l=0;l<d;l++)if(a[l]>=c){p=Math.max(0,
l-f);break}for(c=l;c<d;c++)if(a[c]>e){g=c+f;break}return{xData:a.slice(p,g),yData:b.slice(p,g),start:p,end:g}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,e,d=this.processedXData,g=this.processedYData,f=this.pointClass,l=d.length,n=this.cropStart||0,k,r=this.hasGroupedData,a=a.keys,m,w=[],q;c||r||(c=[],c.length=b.length,c=this.data=c);a&&r&&(this.options.keys=!1);for(q=0;q<l;q++)k=n+q,r?(m=(new f).init(this,[d[q]].concat(J(g[q]))),m.dataGroup=this.groupMap[q]):(m=c[k])||void 0===
b[k]||(c[k]=m=(new f).init(this,b[k],d[q])),m&&(m.index=k,w[q]=m);this.options.keys=a;if(c&&(l!==(e=c.length)||r))for(q=0;q<e;q++)q!==n||r||(q+=l),c[q]&&(c[q].destroyElements(),c[q].plotX=void 0);this.data=c;this.points=w},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,h=[],g=0;d=this.xAxis.getExtremes();var p=d.min,f=d.max,n,k,r,m;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(m=0;m<d;m++)if(k=c[m],r=a[m],n=(l(r,!0)||e(r))&&(!b.positiveValuesOnly||r.length||0<r),
k=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[m+1]||k)>=p&&(c[m-1]||k)<=f,n&&k)if(n=r.length)for(;n--;)null!==r[n]&&(h[g++]=r[n]);else h[g++]=r;this.dataMin=q(h);this.dataMax=G(h)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,e=c.categories,d=this.yAxis,g=this.points,n=g.length,k=!!this.modifyValue,r=a.pointPlacement,m="between"===r||l(r),w=a.threshold,q=a.startFromThreshold?w:0,D,t,z,
u,A=Number.MAX_VALUE;"between"===r&&(r=.5);l(r)&&(r*=I(a.pointRange||c.pointRange));for(a=0;a<n;a++){var J=g[a],M=J.x,C=J.y;t=J.low;var E=b&&d.stacks[(this.negStacks&&C<(q?0:w)?"-":"")+this.stackKey],G;d.positiveValuesOnly&&null!==C&&0>=C&&(J.isNull=!0);J.plotX=D=f(Math.min(Math.max(-1E5,c.translate(M,0,0,0,1,r,"flags"===this.type)),1E5));b&&this.visible&&!J.isNull&&E&&E[M]&&(u=this.getStackIndicator(u,M,this.index),G=E[M],C=G.points[u.key],t=C[0],C=C[1],t===q&&u.key===E[M].base&&(t=I(w,d.min)),d.positiveValuesOnly&&
0>=t&&(t=null),J.total=J.stackTotal=G.total,J.percentage=G.total&&J.y/G.total*100,J.stackY=C,G.setOffset(this.pointXOffset||0,this.barW||0));J.yBottom=v(t)?d.translate(t,0,1,0,1):null;k&&(C=this.modifyValue(C,J));J.plotY=t="number"===typeof C&&Infinity!==C?Math.min(Math.max(-1E5,d.translate(C,0,1,0,1)),1E5):void 0;J.isInside=void 0!==t&&0<=t&&t<=d.len&&0<=D&&D<=c.len;J.clientX=m?f(c.translate(M,0,0,0,1,r)):D;J.negative=J.y<(w||0);J.category=e&&void 0!==e[J.x]?e[J.x]:J.x;J.isNull||(void 0!==z&&(A=
Math.min(A,Math.abs(D-z))),z=D);J.zone=this.zones.length&&J.getZone()}this.closestPointRangePx=A},getValidPoints:function(a,b){var e=this.chart;return c(a||this.points||[],function(a){return b&&!e.isInsidePlot(a.plotX,a.plotY,e.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,d=b.inverted,g=this.clipBox,p=g||b.clipBox,f=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,p.height,c.xAxis,c.yAxis].join(),l=b[f],n=b[f+"m"];l||(a&&(p.width=0,d&&(p.x=
b.plotSizeX),b[f+"m"]=n=e.clipRect(d?b.plotSizeX+99:-99,d?-b.plotLeft:-b.plotTop,99,d?b.chartWidth:b.chartHeight)),b[f]=l=e.clipRect(p),l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);!1!==c.clip&&(this.group.clip(a||g?l:b.clipRect),this.markerGroup.clip(n),this.sharedClipKey=f);a||(l.count[this.index]&&(delete l.count[this.index],--l.count.length),0===l.count.length&&f&&b[f]&&(g||(b[f]=b[f].destroy()),b[f+"m"]&&(b[f+"m"]=b[f+"m"].destroy())))},animate:function(a){var b=
this.chart,c=C(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX,x:0},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99,x:0},c),this.animate=null)},afterAnimate:function(){this.setClip();n(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,e,d,g,f=this.options.marker,n,k,r,m,w=this[this.specialGroup]||this.markerGroup,q=I(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*f.radius);
if(!1!==f.enabled||this._hasPointMarkers)for(e=0;e<a.length;e++)d=a[e],c=d.plotY,g=d.graphic,n=d.marker||{},k=!!d.marker,r=q&&void 0===n.enabled||n.enabled,m=d.isInside,r&&l(c)&&null!==d.y?(c=I(n.symbol,this.symbol),d.hasImage=0===c.indexOf("url"),r=this.markerAttribs(d,d.selected&&"select"),g?g[m?"show":"hide"](!0).animate(r):m&&(0<r.width||d.hasImage)&&(d.graphic=g=b.renderer.symbol(c,r.x,r.y,r.width,r.height,k?n:f).add(w)),g&&g.attr(this.pointAttribs(d,d.selected&&"select")),g&&g.addClass(d.getClassName(),
!0)):g&&(d.graphic=g.destroy())},markerAttribs:function(a,b){var c=this.options.marker,e=a.marker||{},d=I(e.radius,c.radius);b&&(c=c.states[b],b=e.states&&e.states[b],d=I(b&&b.radius,c&&c.radius,d+(c&&c.radiusPlus||0)));a.hasImage&&(d=0);a={x:Math.floor(a.plotX)-d,y:a.plotY-d};d&&(a.width=a.height=2*d);return a},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,d=e&&e.marker||{},g=this.color,p=e&&e.color,f=a&&a.color,e=I(d.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;g=p||a||
f||g;a=d.fillColor||c.fillColor||g;g=d.lineColor||c.lineColor||g;b&&(c=c.states[b],b=d.states&&d.states[b]||{},e=I(b.lineWidth,c.lineWidth,e+I(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,g=b.lineColor||c.lineColor||g);return{stroke:g,"stroke-width":e,fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(M.navigator.userAgent),e,h,g=a.data||[],f,l;n(a,"destroy");r(a);u(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(d(l.series,a),l.isDirty=l.forceRedraw=
!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(h=g.length;h--;)(f=g[h])&&f.destroy&&f.destroy();a.points=null;clearTimeout(a.animationTimeout);A(a,function(a,b){a instanceof w&&!a.survive&&(e=c&&"group"===b?"hide":"destroy",a[e]())});b.hoverSeries===a&&(b.hoverSeries=null);d(b.series,a);b.orderSeries();A(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var e=this,d=e.options,g=d.step,f,p=[],l=[],n;a=a||e.points;(f=a.reversed)&&a.reverse();(g={right:1,center:2}[g]||g&&3)&&f&&(g=4-
g);!d.connectNulls||b||c||(a=this.getValidPoints(a));u(a,function(h,f){var k=h.plotX,r=h.plotY,m=a[f-1];(h.leftCliff||m&&m.rightCliff)&&!c&&(n=!0);h.isNull&&!v(b)&&0<f?n=!d.connectNulls:h.isNull&&!b?n=!0:(0===f||n?f=["M",h.plotX,h.plotY]:e.getPointSpline?f=e.getPointSpline(a,h,f):g?(f=1===g?["L",m.plotX,r]:2===g?["L",(m.plotX+k)/2,m.plotY,"L",(m.plotX+k)/2,r]:["L",k,m.plotY],f.push("L",k,r)):f=["L",k,r],l.push(h.x),g&&l.push(h.x),p.push.apply(p,f),n=!1)});p.xMap=l;return e.graphPath=p},drawGraph:function(){var a=
this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];u(this.zones,function(c,d){e.push(["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});u(e,function(e,d){var h=e[0],g=a[h];g?(g.endX=c.xMap,g.animate({d:c})):c.length&&(a[h]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),g={stroke:e[2],"stroke-width":b.lineWidth,
fill:a.fillGraph&&a.color||"none"},e[3]?g.dashstyle=e[3]:"square"!==b.linecap&&(g["stroke-linecap"]=g["stroke-linejoin"]="round"),g=a[h].attr(g).shadow(2>d&&b.shadow));g&&(g.startX=c.xMap,g.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,e=this.zones,d,g,f=this.clips||[],l,n=this.graph,k=this.area,r=Math.max(b.chartWidth,b.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],w,q,D=b.inverted,t,z,v,J,A=!1;e.length&&(n||k)&&m&&void 0!==m.min&&(q=m.reversed,t=m.horiz,n&&n.hide(),
k&&k.hide(),w=m.getExtremes(),u(e,function(e,h){d=q?t?b.plotWidth:0:t?0:m.toPixels(w.min);d=Math.min(Math.max(I(g,d),0),r);g=Math.min(Math.max(Math.round(m.toPixels(I(e.value,w.max),!0)),0),r);A&&(d=g=m.toPixels(w.max));z=Math.abs(d-g);v=Math.min(d,g);J=Math.max(d,g);m.isXAxis?(l={x:D?J:v,y:0,width:z,height:r},t||(l.x=b.plotHeight-l.x)):(l={x:0,y:D?J:v,width:r,height:z},t&&(l.y=b.plotWidth-l.y));D&&c.isVML&&(l=m.isXAxis?{x:0,y:q?v:J,height:l.width,width:b.chartWidth}:{x:l.y-b.plotLeft-b.spacingBox.x,
y:0,width:l.height,height:b.chartHeight});f[h]?f[h].animate(l):(f[h]=c.clipRect(l),n&&a["zone-graph-"+h].clip(f[h]),k&&a["zone-area-"+h].clip(f[h]));A=e.value>w.max}),this.clips=f)},invertGroups:function(a){function b(){u(["group","markerGroup"],function(b){c[b]&&(e.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,e=c.chart,d;c.xAxis&&(d=E(e,"resize",b),E(c,"destroy",d),b(a),c.invertGroups=b)},plotGroup:function(a,
b,c,e,d){var h=this[a],g=!h;g&&(this[a]=h=this.chart.renderer.g().attr({zIndex:e||.1}).add(d));h.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(v(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(h.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);h.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return h},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,
c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,d=!!a.animate&&b.renderer.isSVG&&C(e.animation).duration,g=a.visible?"inherit":"hidden",f=e.zIndex,l=a.hasRendered,n=b.seriesGroup,k=b.inverted;c=a.plotGroup("group","series",g,f,n);a.markerGroup=a.plotGroup("markerGroup","markers",g,f,n);d&&a.animate(!0);c.inverted=a.isCartesian?k:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&
a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(k);!1===e.clip||a.sharedClipKey||l||c.clip(b.clipRect);d&&a.animate();l||(a.animationTimeout=D(function(){a.afterAnimate()},d));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:I(e&&e.left,a.plotLeft),
translateY:I(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:d?e.len-a.chartX+e.pos:a.chartY-e.pos},b)},buildKDTree:function(){function a(c,e,d){var h,g;if(g=c&&c.length)return h=b.kdAxisArray[e%d],c.sort(function(a,b){return a[h]-b[h]}),g=Math.floor(g/2),{point:c[g],left:a(c.slice(0,
g),e+1,d),right:a(c.slice(g+1),e+1,d)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;D(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,h,l){var n=b.point,p=e.kdAxisArray[h%l],k,r,m=n;r=v(a[d])&&v(n[d])?Math.pow(a[d]-n[d],2):null;k=v(a[g])&&v(n[g])?Math.pow(a[g]-n[g],2):null;k=(r||0)+(k||0);n.dist=v(k)?Math.sqrt(k):Number.MAX_VALUE;n.distX=v(r)?
Math.sqrt(r):Number.MAX_VALUE;p=a[p]-n[p];k=0>p?"left":"right";r=0>p?"right":"left";b[k]&&(k=c(a,b[k],h+1,l),m=k[f]<m[f]?k:n);b[r]&&Math.sqrt(p*p)<m[f]&&(a=c(a,b[r],h+1,l),m=a[f]<m[f]?a:m);return m}var e=this,d=this.kdAxisArray[0],g=this.kdAxisArray[1],f=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(N);(function(a){var E=a.Axis,C=a.Chart,G=a.correctFloat,q=a.defined,f=a.destroyObjectProperties,
k=a.each,t=a.format,m=a.objectEach,v=a.pick,u=a.Series;a.StackItem=function(a,g,f,c,e){var d=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=g;this.x=c;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:g.align||(d?f?"left":"right":"center"),verticalAlign:g.verticalAlign||(d?"middle":f?"bottom":"top"),y:v(g.y,d?4:f?14:-6),x:v(g.x,d?f?-6:6:0)};this.textAlign=g.textAlign||(d?f?"right":"left":"center")};a.StackItem.prototype={destroy:function(){f(this,
this.axis)},render:function(a){var d=this.options,f=d.format,f=f?t(f,this):d.formatter.call(this);this.label?this.label.attr({text:f,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(f,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,g){var d=this.axis,c=d.chart,e=d.translate(d.usePercentage?100:this.total,0,0,0,1),d=d.translate(0),d=Math.abs(e-d);a=c.xAxis[0].translate(this.x)+a;e=this.getStackBox(c,this,
a,e,g,d);if(g=this.label)g.align(this.alignOptions,null,e),e=g.alignAttr,g[!1===this.options.crop||c.isInsidePlot(e.x,e.y)?"show":"hide"](!0)},getStackBox:function(a,g,f,c,e,l){var b=g.axis.reversed,d=a.inverted;a=a.plotHeight;g=g.isNegative&&!b||!g.isNegative&&b;return{x:d?g?c:c-l:f,y:d?a-f-e:g?a-c-l:a-c,width:d?l:e,height:d?e:l}}};C.prototype.getStacks=function(){var a=this;k(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});k(a.series,function(d){!d.options.stacking||!0!==
d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+v(d.options.stack,""))})};E.prototype.buildStacks=function(){var a=this.series,g=v(this.options.reversedStacks,!0),f=a.length,c;if(!this.isXAxis){this.usePercentage=!1;for(c=f;c--;)a[g?c:f-c-1].setStackedPoints();for(c=0;c<f;c++)a[c].modifyStacks()}};E.prototype.renderStackTotals=function(){var a=this.chart,g=a.renderer,f=this.stacks,c=this.stackTotalGroup;c||(this.stackTotalGroup=c=g.g("stack-labels").attr({visibility:"visible",
zIndex:6}).add());c.translate(a.plotLeft,a.plotTop);m(f,function(a){m(a,function(a){a.render(c)})})};E.prototype.resetStacks=function(){var a=this,g=a.stacks;a.isXAxis||m(g,function(d){m(d,function(c,e){c.touched<a.stacksTouched?(c.destroy(),delete d[e]):(c.total=null,c.cum=null)})})};E.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),m(a,function(a){m(a,function(a){a.cum=a.total})}))};u.prototype.setStackedPoints=function(){if(this.options.stacking&&
(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var d=this.processedXData,g=this.processedYData,f=[],c=g.length,e=this.options,l=e.threshold,b=e.startFromThreshold?l:0,k=e.stack,e=e.stacking,m=this.stackKey,t="-"+m,r=this.negStacks,u=this.yAxis,w=u.stacks,D=u.oldStacks,M,p,B,H,F,h,x;u.stacksTouched+=1;for(F=0;F<c;F++)h=d[F],x=g[F],M=this.getStackIndicator(M,h,this.index),H=M.key,B=(p=r&&x<(b?0:l))?t:m,w[B]||(w[B]={}),w[B][h]||(D[B]&&D[B][h]?(w[B][h]=D[B][h],w[B][h].total=null):
w[B][h]=new a.StackItem(u,u.options.stackLabels,p,h,k)),B=w[B][h],null!==x&&(B.points[H]=B.points[this.index]=[v(B.cum,b)],q(B.cum)||(B.base=H),B.touched=u.stacksTouched,0<M.index&&!1===this.singleStacks&&(B.points[H][0]=B.points[this.index+","+h+",0"][0])),"percent"===e?(p=p?m:t,r&&w[p]&&w[p][h]?(p=w[p][h],B.total=p.total=Math.max(p.total,B.total)+Math.abs(x)||0):B.total=G(B.total+(Math.abs(x)||0))):B.total=G(B.total+(x||0)),B.cum=v(B.cum,b)+(x||0),null!==x&&(B.points[H].push(B.cum),f[F]=B.cum);
"percent"===e&&(u.usePercentage=!0);this.stackedYData=f;u.oldStacks={}}};u.prototype.modifyStacks=function(){var a=this,g=a.stackKey,f=a.yAxis.stacks,c=a.processedXData,e,l=a.options.stacking;a[l+"Stacker"]&&k([g,"-"+g],function(b){for(var d=c.length,g,k;d--;)if(g=c[d],e=a.getStackIndicator(e,g,a.index,b),k=(g=f[b]&&f[b][g])&&g.points[e.key])a[l+"Stacker"](k,g,d)})};u.prototype.percentStacker=function(a,g,f){g=g.total?100/g.total:0;a[0]=G(a[0]*g);a[1]=G(a[1]*g);this.stackedYData[f]=a[1]};u.prototype.getStackIndicator=
function(a,g,f,c){!q(a)||a.x!==g||c&&a.key!==c?a={x:g,index:0,key:c}:a.index++;a.key=[f,g,a.index].join();return a}})(N);(function(a){var E=a.addEvent,C=a.animate,G=a.Axis,q=a.createElement,f=a.css,k=a.defined,t=a.each,m=a.erase,v=a.extend,u=a.fireEvent,d=a.inArray,g=a.isNumber,n=a.isObject,c=a.isArray,e=a.merge,l=a.objectEach,b=a.pick,z=a.Point,A=a.Series,I=a.seriesTypes,r=a.setAnimation,J=a.splat;v(a.Chart.prototype,{addSeries:function(a,c,e){var d,g=this;a&&(c=b(c,!0),u(g,"addSeries",{options:a},
function(){d=g.initSeries(a);g.isDirtyLegend=!0;g.linkSeries();c&&g.redraw(e)}));return d},addAxis:function(a,c,d,g){var f=c?"xAxis":"yAxis",l=this.options;a=e(a,{index:this[f].length,isX:c});c=new G(this,a);l[f]=J(l[f]||{});l[f].push(a);b(d,!0)&&this.redraw(g);return c},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=c.loading,g=function(){e&&f(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=q("div",{className:"highcharts-loading highcharts-loading-hidden"},
null,b.container),b.loadingSpan=q("span",{className:"highcharts-loading-inner"},null,e),E(b,"redraw",g));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;f(e,v(d.style,{zIndex:10}));f(b.loadingSpan,d.labelStyle);b.loadingShown||(f(e,{opacity:0,display:""}),C(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;g()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",C(b,{opacity:0},
{duration:a.loading.hideDuration||100,complete:function(){f(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
update:function(a,c,f){var p=this,n={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},r=a.chart,m,h,w=[];if(r){e(!0,p.options.chart,r);"className"in r&&p.setClassName(r.className);if("inverted"in r||"polar"in r)p.propFromSeries(),m=!0;"alignTicks"in r&&(m=!0);l(r,function(a,b){-1!==d("chart."+b,p.propsRequireUpdateSeries)&&(h=!0);-1!==d(b,p.propsRequireDirtyBox)&&(p.isDirtyBox=!0)});"style"in r&&p.renderer.setStyle(r.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&e(!0,
this.options.plotOptions,a.plotOptions);l(a,function(a,b){if(p[b]&&"function"===typeof p[b].update)p[b].update(a,!1);else if("function"===typeof p[n[b]])p[n[b]](a);"chart"!==b&&-1!==d(b,p.propsRequireUpdateSeries)&&(h=!0)});t("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(t(J(a[b]),function(a,c){(c=k(a.id)&&p.get(a.id)||p[b][c])&&c.coll===b&&(c.update(a,!1),f&&(c.touched=!0));if(!c&&f)if("series"===b)p.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)p.addAxis(a,
"xAxis"===b,!1).touched=!0}),f&&t(p[b],function(a){a.touched?delete a.touched:w.push(a)}))});t(w,function(a){a.remove(!1)});m&&t(p.axes,function(a){a.update({},!1)});h&&t(p.series,function(a){a.update({},!1)});a.loading&&e(!0,p.options.loading,a.loading);m=r&&r.width;r=r&&r.height;g(m)&&m!==p.chartWidth||g(r)&&r!==p.chartHeight?p.setSize(m,r):b(c,!0)&&p.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});v(z.prototype,{update:function(a,c,e,d){function g(){f.applyOptions(a);null===f.y&&h&&
(f.graphic=h.destroy());n(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=h.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()),f.connector&&(f.connector=f.connector.destroy()));p=f.index;l.updateParallelArrays(f,p);r.data[p]=n(r.data[p],!0)||n(a,!0)?f.options:a;l.isDirty=l.isDirtyData=!0;!l.fixedBox&&l.hasCartesianSeries&&(k.isDirtyBox=!0);"point"===r.legendType&&(k.isDirtyLegend=!0);c&&k.redraw(e)}var f=this,l=f.series,h=f.graphic,p,k=l.chart,r=l.options;
c=b(c,!0);!1===d?g():f.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(d(this,this.series.data),a,b)}});v(A.prototype,{addPoint:function(a,c,e,d){var g=this.options,f=this.data,l=this.chart,h=this.xAxis,h=h&&h.hasNames&&h.names,p=g.data,k,r,n=this.xData,m,w;c=b(c,!0);k={series:this};this.pointClass.prototype.applyOptions.apply(k,[a]);w=k.x;m=n.length;if(this.requireSorting&&w<n[m-1])for(r=!0;m&&n[m-1]>w;)m--;this.updateParallelArrays(k,"splice",m,0,0);this.updateParallelArrays(k,
m);h&&k.name&&(h[w]=k.name);p.splice(m,0,a);r&&(this.data.splice(m,0,null),this.processData());"point"===g.legendType&&this.generatePoints();e&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(k,"shift"),p.shift()));this.isDirtyData=this.isDirty=!0;c&&l.redraw(d)},removePoint:function(a,c,e){var d=this,g=d.data,f=g[a],l=d.points,h=d.chart,k=function(){l&&l.length===g.length&&l.splice(a,1);g.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||{series:d},"splice",
a,1);f&&f.destroy();d.isDirty=!0;d.isDirtyData=!0;c&&h.redraw()};r(e,h);c=b(c,!0);f?f.firePointEvent("remove",null,k):k()},remove:function(a,c,e){function d(){g.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();b(a,!0)&&f.redraw(c)}var g=this,f=g.chart;!1!==e?u(g,"remove",null,d):d()},update:function(a,c){var d=this,g=d.chart,f=d.userOptions,l=d.oldType||d.type,k=a.type||f.type||g.options.chart.type,h=I[l].prototype,r,n=["group","markerGroup","dataLabelsGroup"],m=["navigatorSeries","baseSeries"],
w=d.finishedAnimating&&{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,c);if(k&&k!==l||void 0!==a.zIndex)n.length=0;d.options.isInternal&&(m.length=0);m=n.concat(m);t(m,function(a){m[a]=d[a];delete d[a]});a=e(f,w,{index:d.index,pointStart:d.xData[0]},{data:d.options.data},a);d.remove(!1,null,!1);for(r in h)d[r]=void 0;v(d,I[k||l].prototype);t(m,function(a){d[a]=m[a]});d.init(g,a);d.oldType=l;g.linkSeries();b(c,!0)&&g.redraw(!1)}});v(G.prototype,{update:function(a,
c){var d=this.chart;a=d.options[this.coll][this.options.index]=e(this.userOptions,a);this.destroy(!0);this.init(d,v(a,{events:void 0}));d.isDirtyBox=!0;b(c,!0)&&d.redraw()},remove:function(a){for(var e=this.chart,d=this.coll,g=this.series,f=g.length;f--;)g[f]&&g[f].remove(!1);m(e.axes,this);m(e[d],this);c(e.options[d])?e.options[d].splice(this.options.index,1):delete e.options[d];t(e[d],function(a,b){a.options.index=b});this.destroy();e.isDirtyBox=!0;b(a,!0)&&e.redraw()},setTitle:function(a,b){this.update({title:a},
b)},setCategories:function(a,b){this.update({categories:a},b)}})})(N);(function(a){var E=a.color,C=a.each,G=a.map,q=a.pick,f=a.Series,k=a.seriesType;k("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(f){var k=[],t=[],u=this.xAxis,d=this.yAxis,g=d.stacks[this.stackKey],n={},c=this.index,e=d.series,l=e.length,b,z=q(d.options.reversedStacks,!0)?1:-1,A;f=f||this.points;if(this.options.stacking){for(A=0;A<f.length;A++)n[f[A].x]=f[A];a.objectEach(g,function(a,b){null!==
a.total&&t.push(b)});t.sort(function(a,b){return a-b});b=G(e,function(){return this.visible});C(t,function(a,e){var f=0,r,m;if(n[a]&&!n[a].isNull)k.push(n[a]),C([-1,1],function(d){var f=1===d?"rightNull":"leftNull",k=0,w=g[t[e+d]];if(w)for(A=c;0<=A&&A<l;)r=w.points[A],r||(A===c?n[a][f]=!0:b[A]&&(m=g[a].points[A])&&(k-=m[1]-m[0])),A+=z;n[a][1===d?"rightCliff":"leftCliff"]=k});else{for(A=c;0<=A&&A<l;){if(r=g[a].points[A]){f=r[1];break}A+=z}f=d.translate(f,0,1,0,1);k.push({isNull:!0,plotX:u.translate(a,
0,0,0,1),x:a,plotY:f,yBottom:f})}})}return k},getGraphPath:function(a){var k=f.prototype.getGraphPath,t=this.options,u=t.stacking,d=this.yAxis,g,n,c=[],e=[],l=this.index,b,z=d.stacks[this.stackKey],A=t.threshold,I=d.getThreshold(t.threshold),r,t=t.connectNulls||"percent"===u,J=function(g,f,k){var r=a[g];g=u&&z[r.x].points[l];var n=r[k+"Null"]||0;k=r[k+"Cliff"]||0;var m,q,r=!0;k||n?(m=(n?g[0]:g[1])+k,q=g[0]+k,r=!!n):!u&&a[f]&&a[f].isNull&&(m=q=A);void 0!==m&&(e.push({plotX:b,plotY:null===m?I:d.getThreshold(m),
isNull:r,isCliff:!0}),c.push({plotX:b,plotY:null===q?I:d.getThreshold(q),doCurve:!1}))};a=a||this.points;u&&(a=this.getStackPoints(a));for(g=0;g<a.length;g++)if(n=a[g].isNull,b=q(a[g].rectPlotX,a[g].plotX),r=q(a[g].yBottom,I),!n||t)t||J(g,g-1,"left"),n&&!u&&t||(e.push(a[g]),c.push({x:g,plotX:b,plotY:r})),t||J(g,g+1,"right");g=k.call(this,e,!0,!0);c.reversed=!0;n=k.call(this,c,!0,!0);n.length&&(n[0]="L");n=g.concat(n);k=k.call(this,e,!1,t);n.xMap=g.xMap;this.areaPath=n;return k},drawGraph:function(){this.areaPath=
[];f.prototype.drawGraph.apply(this);var a=this,k=this.areaPath,v=this.options,u=[["area","highcharts-area",this.color,v.fillColor]];C(this.zones,function(d,g){u.push(["zone-area-"+g,"highcharts-area highcharts-zone-area-"+g+" "+d.className,d.color||a.color,d.fillColor||v.fillColor])});C(u,function(d){var g=d[0],f=a[g];f?(f.endX=k.xMap,f.animate({d:k})):(f=a[g]=a.chart.renderer.path(k).addClass(d[1]).attr({fill:q(d[3],E(d[2]).setOpacity(q(v.fillOpacity,.75)).get()),zIndex:0}).add(a.group),f.isArea=
!0);f.startX=k.xMap;f.shiftUnit=v.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(N);(function(a){var E=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,q){var f=G.plotX,k=G.plotY,t=a[q-1];q=a[q+1];var m,v,u,d;if(t&&!t.isNull&&!1!==t.doCurve&&!G.isCliff&&q&&!q.isNull&&!1!==q.doCurve&&!G.isCliff){a=t.plotY;u=q.plotX;q=q.plotY;var g=0;m=(1.5*f+t.plotX)/2.5;v=(1.5*k+a)/2.5;u=(1.5*f+u)/2.5;d=(1.5*k+q)/2.5;u!==m&&(g=(d-v)*(u-f)/(u-m)+k-d);v+=g;d+=g;v>a&&v>k?(v=
Math.max(a,k),d=2*k-v):v<a&&v<k&&(v=Math.min(a,k),d=2*k-v);d>q&&d>k?(d=Math.max(q,k),v=2*k-d):d<q&&d<k&&(d=Math.min(q,k),v=2*k-d);G.rightContX=u;G.rightContY=d}G=["C",E(t.rightContX,t.plotX),E(t.rightContY,t.plotY),E(m,f),E(v,k),f,k];t.rightContX=t.rightContY=null;return G}})})(N);(function(a){var E=a.seriesTypes.area.prototype,C=a.seriesType;C("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:E.getStackPoints,getGraphPath:E.getGraphPath,drawGraph:E.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(N);
(function(a){var E=a.animObject,C=a.color,G=a.each,q=a.extend,f=a.isNumber,k=a.merge,t=a.pick,m=a.Series,v=a.seriesType,u=a.svg;v("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,
borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){m.prototype.init.apply(this,arguments);var a=this,g=a.chart;g.hasRendered&&G(g.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,g=a.options,f=a.xAxis,c=a.yAxis,e=f.reversed,l,b={},k=0;!1===g.grouping?k=1:G(a.chart.series,function(e){var d=e.options,g=e.yAxis,f;e.type!==a.type||!e.visible&&a.chart.options.chart.ignoreHiddenSeries||
c.len!==g.len||c.pos!==g.pos||(d.stacking?(l=e.stackKey,void 0===b[l]&&(b[l]=k++),f=b[l]):!1!==d.grouping&&(f=k++),e.columnIndex=f)});var m=Math.min(Math.abs(f.transA)*(f.ordinalSlope||g.pointRange||f.closestPointRange||f.tickInterval||1),f.len),q=m*g.groupPadding,r=(m-2*q)/(k||1),g=Math.min(g.maxPointWidth||f.len,t(g.pointWidth,r*(1-2*g.pointPadding)));a.columnMetrics={width:g,offset:(r-g)/2+(q+((a.columnIndex||0)+(e?1:0))*r-m/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,g,f,c){var e=
this.chart,d=this.borderWidth,b=-(d%2?.5:0),d=d%2?.5:1;e.inverted&&e.renderer.isVML&&(d+=1);this.options.crisp&&(f=Math.round(a+f)+b,a=Math.round(a)+b,f-=a);c=Math.round(g+c)+d;b=.5>=Math.abs(g)&&.5<c;g=Math.round(g)+d;c-=g;b&&c&&(--g,c+=1);return{x:a,y:g,width:f,height:c}},translate:function(){var a=this,g=a.chart,f=a.options,c=a.dense=2>a.closestPointRange*a.xAxis.transA,c=a.borderWidth=t(f.borderWidth,c?0:1),e=a.yAxis,l=a.translatedThreshold=e.getThreshold(f.threshold),b=t(f.minPointLength,5),
k=a.getColumnMetrics(),q=k.width,u=a.barW=Math.max(q,1+2*c),r=a.pointXOffset=k.offset;g.inverted&&(l-=.5);f.pointPadding&&(u=Math.ceil(u));m.prototype.translate.apply(a);G(a.points,function(c){var d=t(c.yBottom,l),f=999+Math.abs(d),f=Math.min(Math.max(-f,c.plotY),e.len+f),k=c.plotX+r,p=u,n=Math.min(f,d),m,z=Math.max(f,d)-n;b&&Math.abs(z)<b&&(z=b,m=!e.reversed&&!c.negative||e.reversed&&c.negative,0===c.y&&0>=a.dataMax&&(m=!m),n=Math.abs(n-l)>b?d-b:l-(m?b:0));c.barX=k;c.pointWidth=q;c.tooltipPos=g.inverted?
[e.len+e.pos-g.plotLeft-f,a.xAxis.len-k-p/2,z]:[k+p/2,f+e.pos-g.plotTop,z];c.shapeType="rect";c.shapeArgs=a.crispCol.apply(a,c.isNull?[k,l,p,0]:[k,n,p,z])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,g){var d=this.options,c,e=this.pointAttrToOptions||{};c=e.stroke||"borderColor";var f=e["stroke-width"]||"borderWidth",b=a&&a.color||this.color,m=a&&a[c]||d[c]||
this.color||b,q=a&&a[f]||d[f]||this[f]||0,e=d.dashStyle;a&&this.zones.length&&(b=a.getZone(),b=a.options.color||b&&b.color||this.color);g&&(a=k(d.states[g],a.options.states&&a.options.states[g]||{}),g=a.brightness,b=a.color||void 0!==g&&C(b).brighten(a.brightness).get()||b,m=a[c]||m,q=a[f]||q,e=a.dashStyle||e);c={fill:b,stroke:m,"stroke-width":q};e&&(c.dashstyle=e);return c},drawPoints:function(){var a=this,g=this.chart,m=a.options,c=g.renderer,e=m.animationLimit||250,l;G(a.points,function(b){var d=
b.graphic;if(f(b.plotY)&&null!==b.y){l=b.shapeArgs;if(d)d[g.pointCount<e?"animate":"attr"](k(l));else b.graphic=d=c[b.shapeType](l).add(b.group||a.group);m.borderRadius&&d.attr({r:m.borderRadius});d.attr(a.pointAttribs(b,b.selected&&"select")).shadow(m.shadow,null,m.stacking&&!m.borderRadius);d.addClass(b.getClassName(),!0)}else d&&(b.graphic=d.destroy())})},animate:function(a){var d=this,f=this.yAxis,c=d.options,e=this.chart.inverted,l={},b=e?"translateX":"translateY",k;u&&(a?(l.scaleY=.001,a=Math.min(f.pos+
f.len,Math.max(f.pos,f.toPixels(c.threshold))),e?l.translateX=a-f.len:l.translateY=a,d.group.attr(l)):(k=d.group.attr(b),d.group.animate({scaleY:1},q(E(d.options.animation),{step:function(a,c){l[b]=k+c.pos*(f.pos-k);d.group.attr(l)}})),d.animate=null))},remove:function(){var a=this,f=a.chart;f.hasRendered&&G(f.series,function(d){d.type===a.type&&(d.isDirty=!0)});m.prototype.remove.apply(a,arguments)}})})(N);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(N);(function(a){var E=a.Series;
a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
E.prototype.drawGraph.call(this)}})})(N);(function(a){var E=a.deg2rad,C=a.isNumber,G=a.pick,q=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,k=this.chart,t=2*(a.slicedOffset||0),m=k.plotWidth-2*t,k=k.plotHeight-2*t,v=a.center,v=[G(v[0],"50%"),G(v[1],"50%"),a.size||"100%",a.innerSize||0],u=Math.min(m,k),d,g;for(d=0;4>d;++d)g=v[d],a=2>d||2===d&&/%$/.test(g),v[d]=q(g,[m,k,u,v[2]][d])+(a?t:0);v[3]>v[2]&&(v[3]=v[2]);return v},getStartAndEndRadians:function(a,k){a=C(a)?
a:0;k=C(k)&&k>a&&360>k-a?k:a+360;return{start:E*(a+-90),end:E*(k+-90)}}}})(N);(function(a){var E=a.addEvent,C=a.CenteredSeriesMixin,G=a.defined,q=a.each,f=a.extend,k=C.getStartAndEndRadians,t=a.inArray,m=a.noop,v=a.pick,u=a.Point,d=a.Series,g=a.seriesType,n=a.setAnimation;g("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,
showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var c=this,d=c.points,b=c.startAngleRad;a||(q(d,function(a){var e=a.graphic,d=a.shapeArgs;e&&(e.attr({r:a.startR||c.center[3]/2,start:b,end:b}),e.animate({r:d.r,
start:d.start,end:d.end},c.options.animation))}),c.animate=null)},updateTotals:function(){var a,e=0,d=this.points,b=d.length,f,g=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)f=d[a],e+=g&&!f.visible?0:f.isNull?0:f.y;this.total=e;for(a=0;a<b;a++)f=d[a],f.percentage=0<e&&(f.visible||!g)?f.y/e*100:0,f.total=e},generatePoints:function(){d.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var c=0,d=this.options,b=d.slicedOffset,f=b+(d.borderWidth||0),
g,m,r,n=k(d.startAngle,d.endAngle),q=this.startAngleRad=n.start,n=(this.endAngleRad=n.end)-q,t=this.points,u,p=d.dataLabels.distance,d=d.ignoreHiddenPoint,B,H=t.length,F;a||(this.center=a=this.getCenter());this.getX=function(b,c,e){r=Math.asin(Math.min((b-a[1])/(a[2]/2+e.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(r)*(a[2]/2+e.labelDistance)};for(B=0;B<H;B++){F=t[B];F.labelDistance=v(F.options.dataLabels&&F.options.dataLabels.distance,p);this.maxLabelDistance=Math.max(this.maxLabelDistance||
0,F.labelDistance);g=q+c*n;if(!d||F.visible)c+=F.percentage/100;m=q+c*n;F.shapeType="arc";F.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*g)/1E3,end:Math.round(1E3*m)/1E3};r=(m+g)/2;r>1.5*Math.PI?r-=2*Math.PI:r<-Math.PI/2&&(r+=2*Math.PI);F.slicedTranslation={translateX:Math.round(Math.cos(r)*b),translateY:Math.round(Math.sin(r)*b)};m=Math.cos(r)*a[2]/2;u=Math.sin(r)*a[2]/2;F.tooltipPos=[a[0]+.7*m,a[1]+.7*u];F.half=r<-Math.PI/2||r>Math.PI/2?1:0;F.angle=r;g=Math.min(f,F.labelDistance/
5);F.labelPos=[a[0]+m+Math.cos(r)*F.labelDistance,a[1]+u+Math.sin(r)*F.labelDistance,a[0]+m+Math.cos(r)*g,a[1]+u+Math.sin(r)*g,a[0]+m,a[1]+u,0>F.labelDistance?"center":F.half?"right":"left",r]}},drawGraph:null,drawPoints:function(){var a=this,e=a.chart.renderer,d,b,g,k,m=a.options.shadow;m&&!a.shadowGroup&&(a.shadowGroup=e.g("shadow").add(a.group));q(a.points,function(c){b=c.graphic;if(c.isNull)b&&(c.graphic=b.destroy());else{k=c.shapeArgs;d=c.getTranslate();var l=c.shadowGroup;m&&!l&&(l=c.shadowGroup=
e.g("shadow").add(a.shadowGroup));l&&l.attr(d);g=a.pointAttribs(c,c.selected&&"select");b?b.setRadialReference(a.center).attr(g).animate(f(k,d)):(c.graphic=b=e[c.shapeType](k).setRadialReference(a.center).attr(d).add(a.group),c.visible||b.attr({visibility:"hidden"}),b.attr(g).attr({"stroke-linejoin":"round"}).shadow(m,l));b.addClass(c.getClassName())}})},searchPoint:m,sortByAngle:function(a,e){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*e})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,
getCenter:C.getCenter,getSymbol:m},{init:function(){u.prototype.init.apply(this,arguments);var a=this,e;a.name=v(a.name,"Slice");e=function(c){a.slice("select"===c.type)};E(a,"select",e);E(a,"unselect",e);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,e){var c=this,b=c.series,d=b.chart,f=b.options.ignoreHiddenPoint;e=v(e,f);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,b.options.data[t(c,b.data)]=c.options,q(["graphic","dataLabel",
"connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)}),c.legendItem&&d.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),f&&(b.isDirty=!0),e&&d.redraw())},slice:function(a,e,d){var b=this.series;n(d,b.chart);v(e,!0);this.sliced=this.options.sliced=G(a)?a:!this.sliced;b.options.data[t(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:
{translateX:0,translateY:0}},haloPath:function(a){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r,start:c.start,end:c.end})}})})(N);(function(a){var E=a.addEvent,C=a.arrayMax,G=a.defined,q=a.each,f=a.extend,k=a.format,t=a.map,m=a.merge,v=a.noop,u=a.pick,d=a.relativeLength,g=a.Series,n=a.seriesTypes,c=a.stableSort;a.distribute=function(a,d){function b(a,b){return a.target-b.target}var e,f=!0,g=a,k=[],l;l=
0;for(e=a.length;e--;)l+=a[e].size;if(l>d){c(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(l=e=0;l<=d;)l+=a[e].size,e++;k=a.splice(e-1,a.length)}c(a,b);for(a=t(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(e=a.length;e--;)f=a[e],l=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,l-f.size/2),d-f.size);e=a.length;for(f=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,a[e-1].targets=a[e-1].targets.concat(a[e].targets),a[e-
1].pos+a[e-1].size>d&&(a[e-1].pos=d-a[e-1].size),a.splice(e,1),f=!0)}e=0;q(a,function(a){var b=0;q(a.targets,function(){g[e].pos=a.pos+b;b+=g[e].size;e++})});g.push.apply(g,k);c(g,b)};g.prototype.drawDataLabels=function(){var c=this,d=c.options,b=d.dataLabels,f=c.points,g,n,r=c.hasRendered||0,t,w,v=u(b.defer,!!d.animation),C=c.chart.renderer;if(b.enabled||c._hasPointLabels)c.dlProcessOptions&&c.dlProcessOptions(b),w=c.plotGroup("dataLabelsGroup","data-labels",v&&!r?"hidden":"visible",b.zIndex||6),
v&&(w.attr({opacity:+r}),r||E(c,"afterAnimate",function(){c.visible&&w.show(!0);w[d.animation?"animate":"attr"]({opacity:1},{duration:200})})),n=b,q(f,function(e){var f,l=e.dataLabel,r,h,p=e.connector,q=!l,v;g=e.dlOptions||e.options&&e.options.dataLabels;if(f=u(g&&g.enabled,n.enabled)&&!e.isNull)b=m(n,g),r=e.getLabelConfig(),v=b[e.formatPrefix+"Format"]||b.format,t=G(v)?k(v,r):(b[e.formatPrefix+"Formatter"]||b.formatter).call(r,b),v=b.style,r=b.rotation,v.color=u(b.color,v.color,c.color,"#000000"),
"contrast"===v.color&&(e.contrastColor=C.getContrast(e.color||c.color),v.color=b.inside||0>u(e.labelDistance,b.distance)||d.stacking?e.contrastColor:"#000000"),d.cursor&&(v.cursor=d.cursor),h={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:r,padding:b.padding,zIndex:1},a.objectEach(h,function(a,b){void 0===a&&delete h[b]});!l||f&&G(t)?f&&G(t)&&(l?h.text=t:(l=e.dataLabel=C[r?"text":"label"](t,0,-9999,b.shape,null,null,b.useHTML,null,"data-label"),
l.addClass("highcharts-data-label-color-"+e.colorIndex+" "+(b.className||"")+(b.useHTML?"highcharts-tracker":""))),l.attr(h),l.css(v).shadow(b.shadow),l.added||l.add(w),c.alignDataLabel(e,l,b,null,q)):(e.dataLabel=l=l.destroy(),p&&(e.connector=p.destroy()))})};g.prototype.alignDataLabel=function(a,c,b,d,g){var e=this.chart,k=e.inverted,l=u(a.plotX,-9999),m=u(a.plotY,-9999),n=c.getBBox(),q,p=b.rotation,t=b.align,v=this.visible&&(a.series.forceDL||e.isInsidePlot(l,Math.round(m),k)||d&&e.isInsidePlot(l,
k?d.x+1:d.y+d.height-1,k)),z="justify"===u(b.overflow,"justify");if(v&&(q=b.style.fontSize,q=e.renderer.fontMetrics(q,c).b,d=f({x:k?this.yAxis.len-m:l,y:Math.round(k?this.xAxis.len-l:m),width:0,height:0},d),f(b,{width:n.width,height:n.height}),p?(z=!1,l=e.renderer.rotCorr(q,p),l={x:d.x+b.x+d.width/2+l.x,y:d.y+b.y+{top:0,middle:.5,bottom:1}[b.verticalAlign]*d.height},c[g?"attr":"animate"](l).attr({align:t}),m=(p+720)%360,m=180<m&&360>m,"left"===t?l.y-=m?n.height:0:"center"===t?(l.x-=n.width/2,l.y-=
n.height/2):"right"===t&&(l.x-=n.width,l.y-=m?0:n.height)):(c.align(b,null,d),l=c.alignAttr),z?a.isLabelJustified=this.justifyDataLabel(c,b,l,n,d,g):u(b.crop,!0)&&(v=e.isInsidePlot(l.x,l.y)&&e.isInsidePlot(l.x+n.width,l.y+n.height)),b.shape&&!p))c[g?"attr":"animate"]({anchorX:k?e.plotWidth-a.plotY:a.plotX,anchorY:k?e.plotHeight-a.plotX:a.plotY});v||(c.attr({y:-9999}),c.placed=!1)};g.prototype.justifyDataLabel=function(a,c,b,d,f,g){var e=this.chart,k=c.align,l=c.verticalAlign,m,n,p=a.box?0:a.padding||
0;m=b.x+p;0>m&&("right"===k?c.align="left":c.x=-m,n=!0);m=b.x+d.width-p;m>e.plotWidth&&("left"===k?c.align="right":c.x=e.plotWidth-m,n=!0);m=b.y+p;0>m&&("bottom"===l?c.verticalAlign="top":c.y=-m,n=!0);m=b.y+d.height-p;m>e.plotHeight&&("top"===l?c.verticalAlign="bottom":c.y=e.plotHeight-m,n=!0);n&&(a.placed=!g,a.align(c,null,f));return n};n.pie&&(n.pie.prototype.drawDataLabels=function(){var c=this,d=c.data,b,f=c.chart,k=c.options.dataLabels,m=u(k.connectorPadding,10),r=u(k.connectorWidth,1),n=f.plotWidth,
w=f.plotHeight,t,v=c.center,p=v[2]/2,B=v[1],E,F,h,x,N=[[],[]],K,P,L,Q,y=[0,0,0,0];c.visible&&(k.enabled||c._hasPointLabels)&&(q(d,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),g.prototype.drawDataLabels.apply(c),q(d,function(a){a.dataLabel&&a.visible&&(N[a.half].push(a),a.dataLabel._pos=null)}),q(N,function(e,d){var g,l,r=e.length,t=[],D;if(r)for(c.sortByAngle(e,d-.5),0<c.maxLabelDistance&&
(g=Math.max(0,B-p-c.maxLabelDistance),l=Math.min(B+p+c.maxLabelDistance,f.plotHeight),q(e,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,B-p-a.labelDistance),a.bottom=Math.min(B+p+a.labelDistance,f.plotHeight),D=a.dataLabel.getBBox().height||21,a.positionsIndex=t.push({target:a.labelPos[1]-a.top+D/2,size:D,rank:a.y})-1)}),a.distribute(t,l+D-g)),Q=0;Q<r;Q++)b=e[Q],l=b.positionsIndex,h=b.labelPos,E=b.dataLabel,L=!1===b.visible?"hidden":"inherit",P=g=h[1],t&&G(t[l])&&(void 0===t[l].pos?
L="hidden":(x=t[l].size,P=b.top+t[l].pos)),delete b.positionIndex,K=k.justify?v[0]+(d?-1:1)*(p+b.labelDistance):c.getX(P<b.top+2||P>b.bottom-2?g:P,d,b),E._attr={visibility:L,align:h[6]},E._pos={x:K+k.x+({left:m,right:-m}[h[6]]||0),y:P+k.y-10},h.x=K,h.y=P,u(k.crop,!0)&&(F=E.getBBox().width,g=null,K-F<m?(g=Math.round(F-K+m),y[3]=Math.max(g,y[3])):K+F>n-m&&(g=Math.round(K+F-n+m),y[1]=Math.max(g,y[1])),0>P-x/2?y[0]=Math.max(Math.round(-P+x/2),y[0]):P+x/2>w&&(y[2]=Math.max(Math.round(P+x/2-w),y[2])),E.sideOverflow=
g)}),0===C(y)||this.verifyDataLabelOverflow(y))&&(this.placeDataLabels(),r&&q(this.points,function(a){var b;t=a.connector;if((E=a.dataLabel)&&E._pos&&a.visible&&0<a.labelDistance){L=E._attr.visibility;if(b=!t)a.connector=t=f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex).add(c.dataLabelsGroup),t.attr({"stroke-width":r,stroke:k.connectorColor||a.color||"#666666"});t[b?"attr":"animate"]({d:c.connectorPath(a.labelPos)});t.attr("visibility",L)}else t&&(a.connector=
t.destroy())}))},n.pie.prototype.connectorPath=function(a){var c=a.x,b=a.y;return u(this.options.dataLabels.softConnector,!0)?["M",c+("left"===a[6]?5:-5),b,"C",c,b,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",c+("left"===a[6]?5:-5),b,"L",a[2],a[3],"L",a[4],a[5]]},n.pie.prototype.placeDataLabels=function(){q(this.points,function(a){var c=a.dataLabel;c&&a.visible&&((a=c._pos)?(c.sideOverflow&&(c._attr.width=c.getBBox().width-c.sideOverflow,c.css({width:c._attr.width+"px",textOverflow:"ellipsis"}),
c.shortened=!0),c.attr(c._attr),c[c.moved?"animate":"attr"](a),c.moved=!0):c&&c.attr({y:-9999}))},this)},n.pie.prototype.alignDataLabel=v,n.pie.prototype.verifyDataLabelOverflow=function(a){var c=this.center,b=this.options,e=b.center,f=b.minSize||80,g,k=null!==b.size;k||(null!==e[0]?g=Math.max(c[2]-Math.max(a[1],a[3]),f):(g=Math.max(c[2]-a[1]-a[3],f),c[0]+=(a[3]-a[1])/2),null!==e[1]?g=Math.max(Math.min(g,c[2]-Math.max(a[0],a[2])),f):(g=Math.max(Math.min(g,c[2]-a[0]-a[2]),f),c[1]+=(a[0]-a[2])/2),g<
c[2]?(c[2]=g,c[3]=Math.min(d(b.innerSize||0,g),g),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):k=!0);return k});n.column&&(n.column.prototype.alignDataLabel=function(a,c,b,d,f){var e=this.chart.inverted,k=a.series,l=a.dlBox||a.shapeArgs,n=u(a.below,a.plotY>u(this.translatedThreshold,k.yAxis.len)),q=u(b.inside,!!this.options.stacking);l&&(d=m(l),0>d.y&&(d.height+=d.y,d.y=0),l=d.y+d.height-k.yAxis.len,0<l&&(d.height-=l),e&&(d={x:k.yAxis.len-d.y-d.height,y:k.xAxis.len-d.x-d.width,width:d.height,
height:d.width}),q||(e?(d.x+=n?0:d.width,d.width=0):(d.y+=n?d.height:0,d.height=0)));b.align=u(b.align,!e||q?"center":n?"right":"left");b.verticalAlign=u(b.verticalAlign,e||q?"middle":n?"top":"bottom");g.prototype.alignDataLabel.call(this,a,c,b,d,f);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(N);(function(a){var E=a.Chart,C=a.each,G=a.objectEach,q=a.pick,f=a.addEvent;E.prototype.callbacks.push(function(a){f(a,"render",function(){var f=[];C(a.labelCollectors||
[],function(a){f=f.concat(a())});C(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&G(a.stacks,function(a){G(a,function(a){f.push(a.label)})})});C(a.series||[],function(a){var k=a.options.dataLabels,m=a.dataLabelCollections||["dataLabel"];(k.enabled||a._hasPointLabels)&&!k.allowOverlap&&a.visible&&C(m,function(d){C(a.points,function(a){a[d]&&(a[d].labelrank=q(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[d]))})})});a.hideOverlappingLabels(f)})});E.prototype.hideOverlappingLabels=
function(a){var f=a.length,k,q,u,d,g,n,c,e,l,b=function(a,b,c,d,e,f,g,k){return!(e>a+c||e+g<a||f>b+d||f+k<b)};for(q=0;q<f;q++)if(k=a[q])k.oldOpacity=k.opacity,k.newOpacity=1,k.width||(u=k.getBBox(),k.width=u.width,k.height=u.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(q=0;q<f;q++)for(u=a[q],k=q+1;k<f;++k)if(d=a[k],u&&d&&u!==d&&u.placed&&d.placed&&0!==u.newOpacity&&0!==d.newOpacity&&(g=u.alignAttr,n=d.alignAttr,c=u.parentGroup,e=d.parentGroup,l=2*(u.box?0:u.padding||
0),g=b(g.x+c.translateX,g.y+c.translateY,u.width-l,u.height-l,n.x+e.translateX,n.y+e.translateY,d.width-l,d.height-l)))(u.labelrank<d.labelrank?u:d).newOpacity=0;C(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(N);(function(a){var E=a.addEvent,C=a.Chart,G=a.createElement,q=a.css,f=a.defaultOptions,k=a.defaultPlotOptions,t=a.each,m=a.extend,v=a.fireEvent,
u=a.hasTouch,d=a.inArray,g=a.isObject,n=a.Legend,c=a.merge,e=a.pick,l=a.Point,b=a.Series,z=a.seriesTypes,A=a.svg,I;I=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};t(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(t(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",
c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(u)a[d].on("touchstart",c);a.options.cursor&&a[d].css(q).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,k=f.renderer,l=f.options.tooltip.snap,h=a.tracker,m,n=function(){if(f.hoverSeries!==a)a.onMouseOver()},q="rgba(192,192,192,"+(A?.0001:.002)+")";if(e&&!c)for(m=e+1;m--;)"M"===d[m]&&d.splice(m+1,0,d[m+
1]-l,d[m+2],"L"),(m&&"M"===d[m]||m===e)&&d.splice(m,0,"L",d[m-2]+l,d[m-1]);h?h.attr({d:d}):a.graph&&(a.tracker=k.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:q,fill:c?q:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*l),zIndex:2}).add(a.group),t([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",n).on("mouseout",function(a){g.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(u)a.on("touchstart",n)}))}};z.column&&
(z.column.prototype.drawTracker=I.drawTrackerPoint);z.pie&&(z.pie.prototype.drawTracker=I.drawTrackerPoint);z.scatter&&(z.scatter.prototype.drawTracker=I.drawTrackerPoint);m(n.prototype,{setItemEvents:function(a,b,d){var e=this,f=e.chart.renderer.boxWrapper,g="highcharts-legend-"+(a.series?"point":"series")+"-active";(d?b:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(g);b.css(e.options.itemHoverStyle)}).on("mouseout",function(){b.css(c(a.visible?e.itemStyle:e.itemHiddenStyle));
f.removeClass(g);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):v(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);E(a.checkbox,"click",function(b){v(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});
f.legend.itemStyle.cursor="pointer";m(C.prototype,{showResetZoom:function(){var a=this,b=f.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,g="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,g)},zoomOut:function(){var a=this;v(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,
c=this.pointer,d=!1,f;!a||a.resetSelection?(t(this.axes,function(a){b=a.zoom()}),c.initiated=!1):t(a.xAxis.concat(a.yAxis),function(a){var e=a.axis;c[e.isXAxis?"zoomX":"zoomY"]&&(b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0))});f=this.resetZoomButton;d&&!f?this.showResetZoom():!d&&g(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(e(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&t(d,function(a){a.setState()});t("xy"===b?[1,0]:
[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=c[d],h=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(g-f,!0)+h,h=b.toValue(g+b.len-f,!0)-h,m=h<l,g=m?h:l,l=m?l:h,h=Math.min(k.dataMin,b.toValue(b.toPixels(k.min)-b.minPixelPadding)),m=Math.max(k.dataMax,b.toValue(b.toPixels(k.max)+b.minPixelPadding)),n;n=h-g;0<n&&(l+=n,g=h);n=l-m;0<n&&(l=m,g-=n);b.series.length&&g!==k.min&&l!==k.max&&(b.setExtremes(g,l,!1,!1,{trigger:"pan"}),e=!0);
c[d]=f});e&&c.redraw(!1);q(c.container,{cursor:"move"})}});m(l.prototype,{select:function(a,b){var c=this,f=c.series,g=f.chart;a=e(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;f.options.data[d(c,f.data)]=c.options;c.setState(a&&"select");b||t(g.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,f.options.data[d(a,f.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=
this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");t(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,d=c(b.series.options.point,b.options).events;b.events=d;a.objectEach(d,function(a,c){E(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),
d=this.plotY,f=this.series,g=f.options.states[a]||{},l=k[f.type].marker&&f.options.marker,n=l&&!1===l.enabled,r=l&&l.states&&l.states[a]||{},h=!1===r.enabled,q=f.stateMarkerGraphic,t=this.marker||{},u=f.chart,v=f.halo,z,A=l&&f.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===g.enabled||a&&(h||n&&!1===r.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){A&&(z=f.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+
this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(f.pointAttribs(this,a),e(u.options.chart.animation,g.animation)),z&&this.graphic.animate(z,e(u.options.chart.animation,r.animation,l.animation)),q&&q.hide();else{if(a&&r){l=t.symbol||f.symbol;q&&q.currentSymbol!==l&&(q=q.destroy());if(q)q[b?"animate":"attr"]({x:z.x,y:z.y});else l&&(f.stateMarkerGraphic=q=u.renderer.symbol(l,z.x,z.y,z.width,z.height).add(f.markerGroup),q.currentSymbol=l);q&&q.attr(f.pointAttribs(this,
a))}q&&(q[a&&u.isInsidePlot(c,d,u.inverted)?"show":"hide"](),q.element.point=this)}(c=g.halo)&&c.size?(v||(f.halo=v=u.renderer.path().add((this.graphic||q).parentGroup)),v[b?"animate":"attr"]({d:this.haloPath(c.size)}),v.attr({"class":"highcharts-halo highcharts-color-"+e(this.colorIndex,f.colorIndex)}),v.point=this,v.attr(m({fill:this.color||f.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):v&&v.point&&v.point.haloPath&&v.animate({d:v.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});m(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&v(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&v(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
c=b.options,d=b.graph,f=c.states,g=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(t([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(g=f[a].lineWidth||g+(f[a].lineWidthPlus||0)),d&&!d.dashstyle))for(g={"stroke-width":g},d.animate(g,e(b.chart.options.chart.animation,f[a]&&f[a].animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(g),c+=1},setVisible:function(a,
b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,k=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:a)?"show":"hide";t(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&t(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});t(c.linkedSeries,function(b){b.setVisible(a,
!1)});g&&(d.isDirtyBox=!0);!1!==b&&d.redraw();v(c,f,{redraw:b})},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);v(this,a?"select":"unselect")},drawTracker:I.drawTrackerGraph})})(N);(function(a){var E=a.Chart,C=a.each,G=a.inArray,q=a.isArray,f=a.isObject,k=a.pick,t=a.splat;E.prototype.setResponsive=function(f){var k=this.options.responsive,m=[],d=this.currentResponsive;
k&&k.rules&&C(k.rules,function(d){void 0===d._id&&(d._id=a.uniqueKey());this.matchResponsiveRule(d,m,f)},this);var g=a.merge.apply(0,a.map(m,function(d){return a.find(k.rules,function(a){return a._id===d}).chartOptions})),m=m.toString()||void 0;m!==(d&&d.ruleIds)&&(d&&this.update(d.undoOptions,f),m?(this.currentResponsive={ruleIds:m,mergedOptions:g,undoOptions:this.currentOptions(g)},this.update(g,f)):this.currentResponsive=void 0)};E.prototype.matchResponsiveRule=function(a,f){var m=a.condition;
(m.callback||function(){return this.chartWidth<=k(m.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=k(m.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=k(m.minWidth,0)&&this.chartHeight>=k(m.minHeight,0)}).call(this)&&f.push(a._id)};E.prototype.currentOptions=function(k){function m(d,g,k,c){var e;a.objectEach(d,function(a,b){if(!c&&-1<G(b,["series","xAxis","yAxis"]))for(d[b]=t(d[b]),k[b]=[],e=0;e<d[b].length;e++)g[b][e]&&(k[b][e]={},m(a[e],g[b][e],k[b][e],c+1));else f(a)?(k[b]=q(a)?[]:{},m(a,g[b]||{},
k[b],c+1)):k[b]=g[b]||null})}var u={};m(k,this.options,u,0);return u}})(N);return N});
/*
 * Chartkick.js
 * Create beautiful charts with one line of JavaScript
 * https://github.com/ankane/chartkick.js
 * v2.2.4
 * MIT License
 */

/*jslint browser: true, indent: 2, plusplus: true, vars: true */


(function (window) {
  'use strict';

  var config = window.Chartkick || {};
  var Chartkick, ISO8601_PATTERN, DECIMAL_SEPARATOR, adapters = [];
  var DATE_PATTERN = /^(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)$/i;
  var GoogleChartsAdapter, HighchartsAdapter, ChartjsAdapter;
  var pendingRequests = [], runningRequests = 0, maxRequests = 4;

  // helpers

  function isArray(variable) {
    return Object.prototype.toString.call(variable) === "[object Array]";
  }

  function isFunction(variable) {
    return variable instanceof Function;
  }

  function isPlainObject(variable) {
    return !isFunction(variable) && variable instanceof Object;
  }

  // https://github.com/madrobby/zepto/blob/master/src/zepto.js
  function extend(target, source) {
    var key;
    for (key in source) {
      if (isPlainObject(source[key]) || isArray(source[key])) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
          target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])) {
          target[key] = [];
        }
        extend(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }

  function merge(obj1, obj2) {
    var target = {};
    extend(target, obj1);
    extend(target, obj2);
    return target;
  }

  // https://github.com/Do/iso8601.js
  ISO8601_PATTERN = /(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i;
  DECIMAL_SEPARATOR = String(1.5).charAt(1);

  function parseISO8601(input) {
    var day, hour, matches, milliseconds, minutes, month, offset, result, seconds, type, year;
    type = Object.prototype.toString.call(input);
    if (type === "[object Date]") {
      return input;
    }
    if (type !== "[object String]") {
      return;
    }
    matches = input.match(ISO8601_PATTERN);
    if (matches) {
      year = parseInt(matches[1], 10);
      month = parseInt(matches[3], 10) - 1;
      day = parseInt(matches[5], 10);
      hour = parseInt(matches[7], 10);
      minutes = matches[9] ? parseInt(matches[9], 10) : 0;
      seconds = matches[11] ? parseInt(matches[11], 10) : 0;
      milliseconds = matches[12] ? parseFloat(DECIMAL_SEPARATOR + matches[12].slice(1)) * 1000 : 0;
      result = Date.UTC(year, month, day, hour, minutes, seconds, milliseconds);
      if (matches[13] && matches[14]) {
        offset = matches[15] * 60;
        if (matches[17]) {
          offset += parseInt(matches[17], 10);
        }
        offset *= matches[14] === "-" ? -1 : 1;
        result -= offset * 60 * 1000;
      }
      return new Date(result);
    }
  }
  // end iso8601.js

  function negativeValues(series) {
    var i, j, data;
    for (i = 0; i < series.length; i++) {
      data = series[i].data;
      for (j = 0; j < data.length; j++) {
        if (data[j][1] < 0) {
          return true;
        }
      }
    }
    return false;
  }

  function jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle) {
    return function (chart, opts, chartOptions) {
      var series = chart.data;
      var options = merge({}, defaultOptions);
      options = merge(options, chartOptions || {});

      if (chart.hideLegend || "legend" in opts) {
        hideLegend(options, opts.legend, chart.hideLegend);
      }

      if (opts.title) {
        setTitle(options, opts.title);
      }

      // min
      if ("min" in opts) {
        setMin(options, opts.min);
      } else if (!negativeValues(series)) {
        setMin(options, 0);
      }

      // max
      if (opts.max) {
        setMax(options, opts.max);
      }

      if ("stacked" in opts) {
        setStacked(options, opts.stacked);
      }

      if (opts.colors) {
        options.colors = opts.colors;
      }

      if (opts.xtitle) {
        setXtitle(options, opts.xtitle);
      }

      if (opts.ytitle) {
        setYtitle(options, opts.ytitle);
      }

      // merge library last
      options = merge(options, opts.library || {});

      return options;
    };
  }

  function setText(element, text) {
    if (document.body.innerText) {
      element.innerText = text;
    } else {
      element.textContent = text;
    }
  }

  function chartError(element, message) {
    setText(element, "Error Loading Chart: " + message);
    element.style.color = "#ff0000";
  }

  function pushRequest(element, url, success) {
    pendingRequests.push([element, url, success]);
    runNext();
  }

  function runNext() {
    if (runningRequests < maxRequests) {
      var request = pendingRequests.shift()
      if (request) {
        runningRequests++;
        getJSON(request[0], request[1], request[2]);
        runNext();
      }
    }
  }

  function requestComplete() {
    runningRequests--;
    runNext();
  }

  function getJSON(element, url, success) {
    ajaxCall(url, success, function (jqXHR, textStatus, errorThrown) {
      var message = (typeof errorThrown === "string") ? errorThrown : errorThrown.message;
      chartError(element, message);
    });
  }

  function ajaxCall(url, success, error) {
    var $ = window.jQuery || window.Zepto || window.$;

    if ($) {
      $.ajax({
        dataType: "json",
        url: url,
        success: success,
        error: error,
        complete: requestComplete
      });
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        requestComplete();
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText), xhr.statusText, xhr);
        } else {
          error(xhr, "error", xhr.statusText);
        }
      };
      xhr.send();
    }
  }

  function errorCatcher(chart, callback) {
    try {
      callback(chart);
    } catch (err) {
      chartError(chart.element, err.message);
      throw err;
    }
  }

  function fetchDataSource(chart, callback, dataSource) {
    if (typeof dataSource === "string") {
      pushRequest(chart.element, dataSource, function (data, textStatus, jqXHR) {
        chart.rawData = data;
        errorCatcher(chart, callback);
      });
    } else {
      chart.rawData = dataSource;
      errorCatcher(chart, callback);
    }
  }

  function addDownloadButton(chart) {
    var element = chart.element;
    var link = document.createElement("a");
    link.download = chart.options.download === true ? "chart.png" : chart.options.download; // http://caniuse.com/download
    link.style.position = "absolute";
    link.style.top = "20px";
    link.style.right = "20px";
    link.style.zIndex = 1000;
    link.style.lineHeight = "20px";
    link.target = "_blank"; // for safari
    var image = document.createElement("img");
    image.alt = "Download";
    image.style.border = "none";
    // icon from font-awesome
    // http://fa2png.io/
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==";
    link.appendChild(image);
    element.style.position = "relative";

    chart.downloadAttached = true;

    // mouseenter
    addEvent(element, "mouseover", function(e) {
      var related = e.relatedTarget;
      // check download option again to ensure it wasn't changed
      if (!related || (related !== this && !childOf(this, related)) && chart.options.download) {
        link.href = chart.toImage();
        element.appendChild(link);
      }
    });

    // mouseleave
    addEvent(element, "mouseout", function(e) {
      var related = e.relatedTarget;
      if (!related || (related !== this && !childOf(this, related))) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }
    });
  }

  // http://stackoverflow.com/questions/10149963/adding-event-listener-cross-browser
  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent("on" + event, function() {
        // set the this pointer same as addEventListener when fn is called
        return(fn.call(elem, window.event));
      });
    }
  }

  // https://gist.github.com/shawnbot/4166283
  function childOf(p, c) {
    if (p === c) return false;
    while (c && c !== p) c = c.parentNode;
    return c === p;
  }

  // type conversions

  function toStr(n) {
    return "" + n;
  }

  function toFloat(n) {
    return parseFloat(n);
  }

  function toDate(n) {
    var matches, year, month, day;
    if (typeof n !== "object") {
      if (typeof n === "number") {
        n = new Date(n * 1000); // ms
      } else if ((matches = n.match(DATE_PATTERN))) {
        year = parseInt(matches[1], 10);
        month = parseInt(matches[3], 10) - 1;
        day = parseInt(matches[5], 10);
        return new Date(year, month, day);
      } else { // str
        // try our best to get the str into iso8601
        // TODO be smarter about this
        var str = n.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
        n = parseISO8601(str) || new Date(n);
      }
    }
    return n;
  }

  function toArr(n) {
    if (!isArray(n)) {
      var arr = [], i;
      for (i in n) {
        if (n.hasOwnProperty(i)) {
          arr.push([i, n[i]]);
        }
      }
      n = arr;
    }
    return n;
  }

  function sortByTime(a, b) {
    return a[0].getTime() - b[0].getTime();
  }

  function sortByNumberSeries(a, b) {
    return a[0] - b[0];
  }

  function sortByNumber(a, b) {
    return a - b;
  }

  function loadAdapters() {
    if (!HighchartsAdapter && "Highcharts" in window) {
      HighchartsAdapter = new function () {
        var Highcharts = window.Highcharts;

        this.name = "highcharts";

        var defaultOptions = {
          chart: {},
          xAxis: {
            title: {
              text: null
            },
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          title: {
            text: null
          },
          credits: {
            enabled: false
          },
          legend: {
            borderWidth: 0
          },
          tooltip: {
            style: {
              fontSize: "12px"
            }
          },
          plotOptions: {
            areaspline: {},
            series: {
              marker: {}
            }
          }
        };

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            options.legend.enabled = !!legend;
            if (legend && legend !== true) {
              if (legend === "top" || legend === "bottom") {
                options.legend.verticalAlign = legend;
              } else {
                options.legend.layout = "vertical";
                options.legend.verticalAlign = "middle";
                options.legend.align = legend;
              }
            }
          } else if (hideLegend) {
            options.legend.enabled = false;
          }
        };

        var setTitle = function (options, title) {
          options.title.text = title;
        };

        var setMin = function (options, min) {
          options.yAxis.min = min;
        };

        var setMax = function (options, max) {
          options.yAxis.max = max;
        };

        var setStacked = function (options, stacked) {
          options.plotOptions.series.stacking = stacked ? "normal" : null;
        };

        var setXtitle = function (options, title) {
          options.xAxis.title.text = title;
        };

        var setYtitle = function (options, title) {
          options.yAxis.title.text = title;
        };

        var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        this.renderLineChart = function (chart, chartType) {
          chartType = chartType || "spline";
          var chartOptions = {};
          if (chartType === "areaspline") {
            chartOptions = {
              plotOptions: {
                areaspline: {
                  stacking: "normal"
                },
                area: {
                  stacking: "normal"
                },
                series: {
                  marker: {
                    enabled: false
                  }
                }
              }
            };
          }

          if (chart.options.curve === false) {
            if (chartType === "areaspline") {
              chartType = "area";
            } else if (chartType === "spline") {
              chartType = "line";
            }
          }

          var options = jsOptions(chart, chart.options, chartOptions), data, i, j;
          options.xAxis.type = chart.discrete ? "category" : "datetime";
          if (!options.chart.type) {
            options.chart.type = chartType;
          }
          options.chart.renderTo = chart.element.id;

          var series = chart.data;
          for (i = 0; i < series.length; i++) {
            data = series[i].data;
            if (!chart.discrete) {
              for (j = 0; j < data.length; j++) {
                data[j][0] = data[j][0].getTime();
              }
            }
            series[i].marker = {symbol: "circle"};
            if (chart.options.points === false) {
              series[i].marker.enabled = false;
            }
          }
          options.series = series;
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderScatterChart = function (chart) {
          var chartOptions = {};
          var options = jsOptions(chart, chart.options, chartOptions);
          options.chart.type = "scatter";
          options.chart.renderTo = chart.element.id;
          options.series = chart.data;
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderPieChart = function (chart) {
          var chartOptions = merge(defaultOptions, {});

          if (chart.options.colors) {
            chartOptions.colors = chart.options.colors;
          }
          if (chart.options.donut) {
            chartOptions.plotOptions = {pie: {innerSize: "50%"}};
          }

          if ("legend" in chart.options) {
            hideLegend(chartOptions, chart.options.legend);
          }

          if (chart.options.title) {
            setTitle(chartOptions, chart.options.title);
          }

          var options = merge(chartOptions, chart.options.library || {});
          options.chart.renderTo = chart.element.id;
          options.series = [{
            type: "pie",
            name: chart.options.label || "Value",
            data: chart.data
          }];
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderColumnChart = function (chart, chartType) {
          chartType = chartType || "column";
          var series = chart.data;
          var options = jsOptions(chart, chart.options), i, j, s, d, rows = [], categories = [];
          options.chart.type = chartType;
          options.chart.renderTo = chart.element.id;

          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              if (!rows[d[0]]) {
                rows[d[0]] = new Array(series.length);
                categories.push(d[0]);
              }
              rows[d[0]][i] = d[1];
            }
          }

          if (chart.options.xtype === "number") {
            categories.sort(sortByNumber);
          }

          options.xAxis.categories = categories;

          var newSeries = [], d2;
          for (i = 0; i < series.length; i++) {
            d = [];
            for (j = 0; j < categories.length; j++) {
              d.push(rows[categories[j]][i] || 0);
            }

            d2 = {
              name: series[i].name,
              data: d
            }
            if (series[i].stack) {
              d2.stack = series[i].stack;
            }

            newSeries.push(d2);
          }
          options.series = newSeries;

          chart.chart = new Highcharts.Chart(options);
        };

        var self = this;

        this.renderBarChart = function (chart) {
          self.renderColumnChart(chart, "bar");
        };

        this.renderAreaChart = function (chart) {
          self.renderLineChart(chart, "areaspline");
        };
      };
      adapters.push(HighchartsAdapter);
    }
    if (!GoogleChartsAdapter && window.google && (window.google.setOnLoadCallback || window.google.charts)) {
      GoogleChartsAdapter = new function () {
        var google = window.google;

        this.name = "google";

        var loaded = {};
        var callbacks = [];

        var runCallbacks = function () {
          var cb, call;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            call = google.visualization && ((cb.pack === "corechart" && google.visualization.LineChart) || (cb.pack === "timeline" && google.visualization.Timeline));
            if (call) {
              cb.callback();
              callbacks.splice(i, 1);
              i--;
            }
          }
        };

        var waitForLoaded = function (pack, callback) {
          if (!callback) {
            callback = pack;
            pack = "corechart";
          }

          callbacks.push({pack: pack, callback: callback});

          if (loaded[pack]) {
            runCallbacks();
          } else {
            loaded[pack] = true;

            // https://groups.google.com/forum/#!topic/google-visualization-api/fMKJcyA2yyI
            var loadOptions = {
              packages: [pack],
              callback: runCallbacks
            };
            if (config.language) {
              loadOptions.language = config.language;
            }
            if (pack === "corechart" && config.mapsApiKey) {
              loadOptions.mapsApiKey = config.mapsApiKey;
            }

            if (window.google.setOnLoadCallback) {
              google.load("visualization", "1", loadOptions);
            } else {
              google.charts.load("current", loadOptions);
            }
          }
        };

        // Set chart options
        var defaultOptions = {
          chartArea: {},
          fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
          pointSize: 6,
          legend: {
            textStyle: {
              fontSize: 12,
              color: "#444"
            },
            alignment: "center",
            position: "right"
          },
          curveType: "function",
          hAxis: {
            textStyle: {
              color: "#666",
              fontSize: 12
            },
            titleTextStyle: {},
            gridlines: {
              color: "transparent"
            },
            baselineColor: "#ccc",
            viewWindow: {}
          },
          vAxis: {
            textStyle: {
              color: "#666",
              fontSize: 12
            },
            titleTextStyle: {},
            baselineColor: "#ccc",
            viewWindow: {}
          },
          tooltip: {
            textStyle: {
              color: "#666",
              fontSize: 12
            }
          }
        };

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            var position;
            if (!legend) {
              position = "none";
            } else if (legend === true) {
              position = "right";
            } else {
              position = legend;
            }
            options.legend.position = position;
          } else if (hideLegend) {
            options.legend.position = "none";
          }
        };

        var setTitle = function (options, title) {
          options.title = title;
          options.titleTextStyle = {color: "#333", fontSize: "20px"};
        };

        var setMin = function (options, min) {
          options.vAxis.viewWindow.min = min;
        };

        var setMax = function (options, max) {
          options.vAxis.viewWindow.max = max;
        };

        var setBarMin = function (options, min) {
          options.hAxis.viewWindow.min = min;
        };

        var setBarMax = function (options, max) {
          options.hAxis.viewWindow.max = max;
        };

        var setStacked = function (options, stacked) {
          options.isStacked = !!stacked;
        };

        var setXtitle = function (options, title) {
          options.hAxis.title = title;
          options.hAxis.titleTextStyle.italic = false;
        };

        var setYtitle = function (options, title) {
          options.vAxis.title = title;
          options.vAxis.titleTextStyle.italic = false;
        };

        var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        // cant use object as key
        var createDataTable = function (series, columnType, xtype) {
          var i, j, s, d, key, rows = [], sortedLabels = [];
          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              key = (columnType === "datetime") ? d[0].getTime() : d[0];
              if (!rows[key]) {
                rows[key] = new Array(series.length);
                sortedLabels.push(key);
              }
              rows[key][i] = toFloat(d[1]);
            }
          }

          var rows2 = [];
          var day = true;
          var value;
          for (var j = 0; j < sortedLabels.length; j++) {
            var i = sortedLabels[j];
            if (columnType === "datetime") {
              value = new Date(toFloat(i));
              day = day && isDay(value);
            } else if (columnType === "number") {
              value = toFloat(i);
            } else {
              value = i;
            }
            rows2.push([value].concat(rows[i]));
          }
          if (columnType === "datetime") {
            rows2.sort(sortByTime);
          } else if (columnType === "number") {
            rows2.sort(sortByNumberSeries);
          }

          if (xtype === "number") {
            rows2.sort(sortByNumberSeries);

            for (var i = 0; i < rows2.length; i++) {
              rows2[i][0] = toStr(rows2[i][0]);
            }
          }

          // create datatable
          var data = new google.visualization.DataTable();
          columnType = columnType === "datetime" && day ? "date" : columnType;
          data.addColumn(columnType, "");
          for (i = 0; i < series.length; i++) {
            data.addColumn("number", series[i].name);
          }
          data.addRows(rows2);

          return data;
        };

        var resize = function (callback) {
          if (window.attachEvent) {
            window.attachEvent("onresize", callback);
          } else if (window.addEventListener) {
            window.addEventListener("resize", callback, true);
          }
          callback();
        };

        this.renderLineChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {};

            if (chart.options.curve === false) {
              chartOptions.curveType = "none";
            }

            if (chart.options.points === false) {
              chartOptions.pointSize = 0;
            }

            var options = jsOptions(chart, chart.options, chartOptions);
            var columnType = chart.discrete ? "string" : "datetime";
            if (chart.options.xtype === "number") {
              columnType = "number";
            }
            var data = createDataTable(chart.data, columnType);
            chart.chart = new google.visualization.LineChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderPieChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              chartArea: {
                top: "10%",
                height: "80%"
              },
              legend: {}
            };
            if (chart.options.colors) {
              chartOptions.colors = chart.options.colors;
            }
            if (chart.options.donut) {
              chartOptions.pieHole = 0.5;
            }
            if ("legend" in chart.options) {
              hideLegend(chartOptions, chart.options.legend);
            }
            if (chart.options.title) {
              setTitle(chartOptions, chart.options.title);
            }
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn("string", "");
            data.addColumn("number", "Value");
            data.addRows(chart.data);

            chart.chart = new google.visualization.PieChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderColumnChart = function (chart) {
          waitForLoaded(function () {
            var options = jsOptions(chart, chart.options);
            var data = createDataTable(chart.data, "string", chart.options.xtype);
            chart.chart = new google.visualization.ColumnChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderBarChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              hAxis: {
                gridlines: {
                  color: "#ccc"
                }
              }
            };
            var options = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options, chartOptions);
            var data = createDataTable(chart.data, "string", chart.options.xtype);
            chart.chart = new google.visualization.BarChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderAreaChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              isStacked: true,
              pointSize: 0,
              areaOpacity: 0.5
            };

            var options = jsOptions(chart, chart.options, chartOptions);
            var columnType = chart.discrete ? "string" : "datetime";
            if (chart.options.xtype === "number") {
              columnType = "number";
            }
            var data = createDataTable(chart.data, columnType);
            chart.chart = new google.visualization.AreaChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderGeoChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              legend: "none",
              colorAxis: {
                colors: chart.options.colors || ["#f6c7b6", "#ce502d"]
              }
            };
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn("string", "");
            data.addColumn("number", chart.options.label || "Value");
            data.addRows(chart.data);

            chart.chart = new google.visualization.GeoChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderScatterChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {};
            var options = jsOptions(chart, chart.options, chartOptions);

            var series = chart.data, rows2 = [], i, j, data, d;
            for (i = 0; i < series.length; i++) {
              d = series[i].data;
              for (j = 0; j < d.length; j++) {
                var row = new Array(series.length + 1);
                row[0] = d[j][0];
                row[i + 1] = d[j][1];
                rows2.push(row);
              }
            }

            var data = new google.visualization.DataTable();
            data.addColumn("number", "");
            for (i = 0; i < series.length; i++) {
              data.addColumn("number", series[i].name);
            }
            data.addRows(rows2);

            chart.chart = new google.visualization.ScatterChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderTimeline = function (chart) {
          waitForLoaded("timeline", function () {
            var chartOptions = {
              legend: "none"
            };

            if (chart.options.colors) {
              chartOptions.colors = chart.options.colors;
            }
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn({type: "string", id: "Name"});
            data.addColumn({type: "date", id: "Start"});
            data.addColumn({type: "date", id: "End"});
            data.addRows(chart.data);

            chart.element.style.lineHeight = "normal";
            chart.chart = new google.visualization.Timeline(chart.element);

            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };
      };

      adapters.push(GoogleChartsAdapter);
    }
    if (!ChartjsAdapter && "Chart" in window) {
      ChartjsAdapter = new function () {
        var Chart = window.Chart;

        this.name = "chartjs";

        var baseOptions = {
          maintainAspectRatio: false,
          animation: false,
          tooltips: {
            displayColors: false
          },
          legend: {},
          title: {fontSize: 20, fontColor: "#333"}
        };

        var defaultOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 4
                },
                scaleLabel: {
                  fontSize: 16,
                  // fontStyle: "bold",
                  fontColor: "#333"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                scaleLabel: {
                  fontSize: 16,
                  // fontStyle: "bold",
                  fontColor: "#333"
                },
                time: {},
                ticks: {}
              }
            ]
          }
        };

        // http://there4.io/2012/05/02/google-chart-color-list/
        var defaultColors = [
          "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6",
          "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11",
          "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"
        ];

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            options.legend.display = !!legend;
            if (legend && legend !== true) {
              options.legend.position = legend;
            }
          } else if (hideLegend) {
            options.legend.display = false;
          }
        };

        var setTitle = function (options, title) {
          options.title.display = true;
          options.title.text = title;
        };

        var setMin = function (options, min) {
          if (min !== null) {
            options.scales.yAxes[0].ticks.min = toFloat(min);
          }
        };

        var setMax = function (options, max) {
          options.scales.yAxes[0].ticks.max = toFloat(max);
        };

        var setBarMin = function (options, min) {
          if (min !== null) {
            options.scales.xAxes[0].ticks.min = toFloat(min);
          }
        };

        var setBarMax = function (options, max) {
          options.scales.xAxes[0].ticks.max = toFloat(max);
        };

        var setStacked = function (options, stacked) {
          options.scales.xAxes[0].stacked = !!stacked;
          options.scales.yAxes[0].stacked = !!stacked;
        };

        var setXtitle = function (options, title) {
          options.scales.xAxes[0].scaleLabel.display = true;
          options.scales.xAxes[0].scaleLabel.labelString = title;
        };

        var setYtitle = function (options, title) {
          options.scales.yAxes[0].scaleLabel.display = true;
          options.scales.yAxes[0].scaleLabel.labelString = title;
        };

        var drawChart = function(chart, type, data, options) {
          if (chart.chart) {
            chart.chart.destroy();
          } else {
            chart.element.innerHTML = "<canvas></canvas>";
          }

          var ctx = chart.element.getElementsByTagName("CANVAS")[0];
          chart.chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
          });
        };

        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        var addOpacity = function(hex, opacity) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? "rgba(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", " + opacity + ")" : hex;
        };

        var setLabelSize = function (chart, data, options) {
          var maxLabelSize = Math.ceil(chart.element.offsetWidth / 4.0 / data.labels.length);
          if (maxLabelSize > 25) {
            maxLabelSize = 25;
          }
          options.scales.xAxes[0].ticks.callback = function (value) {
            value = toStr(value);
            if (value.length > maxLabelSize) {
              return value.substring(0, maxLabelSize - 2) + "...";
            } else {
              return value;
            }
          };
        };

        var jsOptions = jsOptionsFunc(merge(baseOptions, defaultOptions), hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        var createDataTable = function (chart, options, chartType) {
          var datasets = [];
          var labels = [];

          var colors = chart.options.colors || defaultColors;

          var day = true;
          var week = true;
          var dayOfWeek;
          var month = true;
          var year = true;
          var hour = true;
          var minute = true;
          var detectType = (chartType === "line" || chartType === "area") && !chart.discrete;

          var series = chart.data;

          var sortedLabels = [];

          var i, j, s, d, key, rows = [];
          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              key = detectType ? d[0].getTime() : d[0];
              if (!rows[key]) {
                rows[key] = new Array(series.length);
              }
              rows[key][i] = toFloat(d[1]);
              if (sortedLabels.indexOf(key) === -1) {
                sortedLabels.push(key);
              }
            }
          }

          if (detectType || chart.options.xtype === "number") {
            sortedLabels.sort(sortByNumber);
          }

          var rows2 = [];
          for (j = 0; j < series.length; j++) {
            rows2.push([]);
          }

          var value;
          var k;
          for (k = 0; k < sortedLabels.length; k++) {
            i = sortedLabels[k];
            if (detectType) {
              value = new Date(toFloat(i));
              // TODO make this efficient
              day = day && isDay(value);
              if (!dayOfWeek) {
                dayOfWeek = value.getDay();
              }
              week = week && isWeek(value, dayOfWeek);
              month = month && isMonth(value);
              year = year && isYear(value);
              hour = hour && isHour(value);
              minute = minute && isMinute(value);
            } else {
              value = i;
            }
            labels.push(value);
            for (j = 0; j < series.length; j++) {
              // Chart.js doesn't like undefined
              rows2[j].push(rows[i][j] === undefined ? null : rows[i][j]);
            }
          }

          for (i = 0; i < series.length; i++) {
            s = series[i];

            var color = s.color || colors[i];
            var backgroundColor = chartType !== "line" ? addOpacity(color, 0.5) : color;

            var dataset = {
              label: s.name,
              data: rows2[i],
              fill: chartType === "area",
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2
            };

            if (s.stack) {
              dataset.stack = s.stack;
            }

            if (chart.options.curve === false) {
              dataset.lineTension = 0;
            }

            if (chart.options.points === false) {
              dataset.pointRadius = 0;
              dataset.pointHitRadius = 5;
            }

            datasets.push(merge(dataset, s.library || {}));
          }

          if (detectType && labels.length > 0) {
            var minTime = labels[0].getTime();
            var maxTime = labels[0].getTime();
            for (i = 1; i < labels.length; i++) {
              value = labels[i].getTime();
              if (value < minTime) {
                minTime = value;
              }
              if (value > maxTime) {
                maxTime = value;
              }
            }

            var timeDiff = (maxTime - minTime) / (86400 * 1000.0);

            if (!options.scales.xAxes[0].time.unit) {
              var step;
              if (year || timeDiff > 365 * 10) {
                options.scales.xAxes[0].time.unit = "year";
                step = 365;
              } else if (month || timeDiff > 30 * 10) {
                options.scales.xAxes[0].time.unit = "month";
                step = 30;
              } else if (day || timeDiff > 10) {
                options.scales.xAxes[0].time.unit = "day";
                step = 1;
              } else if (hour || timeDiff > 0.5) {
                options.scales.xAxes[0].time.displayFormats = {hour: "MMM D, h a"};
                options.scales.xAxes[0].time.unit = "hour";
                step = 1 / 24.0;
              } else if (minute) {
                options.scales.xAxes[0].time.displayFormats = {minute: "h:mm a"};
                options.scales.xAxes[0].time.unit = "minute";
                step = 1 / 24.0 / 60.0;
              }

              if (step && timeDiff > 0) {
                var unitStepSize = Math.ceil(timeDiff / step / (chart.element.offsetWidth / 100.0));
                if (week && step === 1) {
                  unitStepSize = Math.ceil(unitStepSize / 7.0) * 7;
                }
                options.scales.xAxes[0].time.unitStepSize = unitStepSize;
              }
            }

            if (!options.scales.xAxes[0].time.tooltipFormat) {
              if (day) {
                options.scales.xAxes[0].time.tooltipFormat = "ll";
              } else if (hour) {
                options.scales.xAxes[0].time.tooltipFormat = "MMM D, h a";
              } else if (minute) {
                options.scales.xAxes[0].time.tooltipFormat = "h:mm a";
              }
            }
          }

          var data = {
            labels: labels,
            datasets: datasets
          };

          return data;
        };

        this.renderLineChart = function (chart, chartType) {
          if (chart.options.xtype === "number") {
            return self.renderScatterChart(chart, chartType, true);
          }

          var chartOptions = {};
          if (chartType === "area") {
            // TODO fix area stacked
            // chartOptions.stacked = true;
          }
          // fix for https://github.com/chartjs/Chart.js/issues/2441
          if (!chart.options.max && allZeros(chart.data)) {
            chartOptions.max = 1;
          }

          var options = jsOptions(chart, merge(chartOptions, chart.options));

          var data = createDataTable(chart, options, chartType || "line");

          options.scales.xAxes[0].type = chart.discrete ? "category" : "time";

          drawChart(chart, "line", data, options);
        };

        this.renderPieChart = function (chart) {
          var options = merge({}, baseOptions);
          if (chart.options.donut) {
            options.cutoutPercentage = 50;
          }

          if ("legend" in chart.options) {
            hideLegend(options, chart.options.legend);
          }

          if (chart.options.title) {
            setTitle(options, chart.options.title);
          }

          options = merge(options, chart.options.library || {});

          var labels = [];
          var values = [];
          for (var i = 0; i < chart.data.length; i++) {
            var point = chart.data[i];
            labels.push(point[0]);
            values.push(point[1]);
          }

          var data = {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: chart.options.colors || defaultColors
              }
            ]
          };

          drawChart(chart, "pie", data, options);
        };

        this.renderColumnChart = function (chart, chartType) {
          var options;
          if (chartType === "bar") {
            options = jsOptionsFunc(merge(baseOptions, defaultOptions), hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options);
          } else {
            options = jsOptions(chart, chart.options);
          }
          var data = createDataTable(chart, options, "column");
          setLabelSize(chart, data, options);
          drawChart(chart, (chartType === "bar" ? "horizontalBar" : "bar"), data, options);
        };

        var self = this;

        this.renderAreaChart = function (chart) {
          self.renderLineChart(chart, "area");
        };

        this.renderBarChart = function (chart) {
          self.renderColumnChart(chart, "bar");
        };

        this.renderScatterChart = function (chart, chartType, lineChart) {
          chartType = chartType || "line";

          var options = jsOptions(chart, chart.options);

          var colors = chart.options.colors || defaultColors;

          var datasets = [];
          var series = chart.data;
          for (var i = 0; i < series.length; i++) {
            var s = series[i];
            var d = [];
            for (var j = 0; j < s.data.length; j++) {
              var point = {
                x: toFloat(s.data[j][0]),
                y: toFloat(s.data[j][1])
              };
              if (chartType === "bubble") {
                point.r = toFloat(s.data[j][2]);
              }
              d.push(point);
            }

            var color = s.color || colors[i];
            var backgroundColor = chartType === "area" ? addOpacity(color, 0.5) : color;

            datasets.push({
              label: s.name,
              showLine: lineChart || false,
              data: d,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              fill: chartType === "area"
            })
          }

          if (chartType === "area") {
            chartType = "line";
          }

          var data = {datasets: datasets};

          options.scales.xAxes[0].type = "linear";
          options.scales.xAxes[0].position = "bottom";

          drawChart(chart, chartType, data, options);
        };

        this.renderBubbleChart = function (chart) {
          this.renderScatterChart(chart, "bubble");
        };
      };

      adapters.unshift(ChartjsAdapter);
    }
  }

  function renderChart(chartType, chart) {
    callAdapter(chartType, chart);
    if (chart.options.download && !chart.downloadAttached && chart.adapter === "chartjs") {
      addDownloadButton(chart);
    }
  }

  // TODO remove chartType if cross-browser way
  // to get the name of the chart class
  function callAdapter(chartType, chart) {
    var i, adapter, fnName, adapterName;
    fnName = "render" + chartType;
    adapterName = chart.options.adapter;

    loadAdapters();

    for (i = 0; i < adapters.length; i++) {
      adapter = adapters[i];
      if ((!adapterName || adapterName === adapter.name) && isFunction(adapter[fnName])) {
        chart.adapter = adapter.name;
        return adapter[fnName](chart);
      }
    }
    throw new Error("No adapter found");
  }

  // process data

  var toFormattedKey = function (key, keyType) {
    if (keyType === "number") {
      key = toFloat(key);
    } else if (keyType === "datetime") {
      key = toDate(key);
    } else {
      key = toStr(key);
    }
    return key;
  };

  var formatSeriesData = function (data, keyType) {
    var r = [], key, j;
    for (j = 0; j < data.length; j++) {
      if (keyType === "bubble") {
        r.push([toFloat(data[j][0]), toFloat(data[j][1]), toFloat(data[j][2])]);
      } else {
        key = toFormattedKey(data[j][0], keyType);
        r.push([key, toFloat(data[j][1])]);
      }
    }
    if (keyType === "datetime") {
      r.sort(sortByTime);
    } else if (keyType === "number") {
      r.sort(sortByNumberSeries);
    }
    return r;
  };

  function isMinute(d) {
    return d.getMilliseconds() === 0 && d.getSeconds() === 0;
  }

  function isHour(d) {
    return isMinute(d) && d.getMinutes() === 0;
  }

  function isDay(d) {
    return isHour(d) && d.getHours() === 0;
  }

  function isWeek(d, dayOfWeek) {
    return isDay(d) && d.getDay() === dayOfWeek;
  }

  function isMonth(d) {
    return isDay(d) && d.getDate() === 1;
  }

  function isYear(d) {
    return isMonth(d) && d.getMonth() === 0;
  }

  function isDate(obj) {
    return !isNaN(toDate(obj)) && toStr(obj).length >= 6;
  }

  function allZeros(data) {
    var i, j, d;
    for (i = 0; i < data.length; i++) {
      d = data[i].data;
      for (j = 0; j < d.length; j++) {
        if (d[j][1] != 0) {
          return false;
        }
      }
    }
    return true;
  }

  function detectDiscrete(series) {
    var i, j, data;
    for (i = 0; i < series.length; i++) {
      data = toArr(series[i].data);
      for (j = 0; j < data.length; j++) {
        if (!isDate(data[j][0])) {
          return true;
        }
      }
    }
    return false;
  }

  // creates a shallow copy of each element of the array
  // elements are expected to be objects
  function copySeries(series) {
    var newSeries = [], i, j;
    for (i = 0; i < series.length; i++) {
      var copy = {}
      for (j in series[i]) {
        if (series[i].hasOwnProperty(j)) {
          copy[j] = series[i][j];
        }
      }
      newSeries.push(copy)
    }
    return newSeries;
  }

  function processSeries(chart, keyType) {
    var i;

    var opts = chart.options;
    var series = chart.rawData;

    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      series = [{name: opts.label || "Value", data: series}];
      chart.hideLegend = true;
    } else {
      chart.hideLegend = false;
    }
    if ((opts.discrete === null || opts.discrete === undefined) && keyType !== "bubble" && keyType !== "number") {
      chart.discrete = detectDiscrete(series);
    } else {
      chart.discrete = opts.discrete;
    }
    if (chart.discrete) {
      keyType = "string";
    }
    if (chart.options.xtype) {
      keyType = chart.options.xtype;
    }

    // right format
    series = copySeries(series);
    for (i = 0; i < series.length; i++) {
      series[i].data = formatSeriesData(toArr(series[i].data), keyType);
    }

    return series;
  }

  function processSimple(chart) {
    var perfectData = toArr(chart.rawData), i;
    for (i = 0; i < perfectData.length; i++) {
      perfectData[i] = [toStr(perfectData[i][0]), toFloat(perfectData[i][1])];
    }
    return perfectData;
  }

  function processTime(chart)
  {
    var i, data = chart.rawData;
    for (i = 0; i < data.length; i++) {
      data[i][1] = toDate(data[i][1]);
      data[i][2] = toDate(data[i][2]);
    }
    return data;
  }

  function processLineData(chart) {
    return processSeries(chart, "datetime");
  }

  function processColumnData(chart) {
    return processSeries(chart, "string");
  }

  function processBarData(chart) {
    return processSeries(chart, "string");
  }

  function processAreaData(chart) {
    return processSeries(chart, "datetime");
  }

  function processScatterData(chart) {
    return processSeries(chart, "number");
  }

  function processBubbleData(chart) {
    return processSeries(chart, "bubble");
  }

  function createChart(chartType, chart, element, dataSource, opts, processData) {
    var elementId;
    if (typeof element === "string") {
      elementId = element;
      element = document.getElementById(element);
      if (!element) {
        throw new Error("No element with id " + elementId);
      }
    }

    chart.element = element;
    opts = merge(Chartkick.options, opts || {});
    chart.options = opts;
    chart.dataSource = dataSource;

    if (!processData) {
      processData = function (chart) {
        return chart.rawData;
      }
    }

    // getters
    chart.getElement = function () {
      return element;
    };
    chart.getDataSource = function () {
      return chart.dataSource;
    };
    chart.getData = function () {
      return chart.data;
    };
    chart.getOptions = function () {
      return chart.options;
    };
    chart.getChartObject = function () {
      return chart.chart;
    };
    chart.getAdapter = function () {
      return chart.adapter;
    };

    var callback = function () {
      chart.data = processData(chart);
      renderChart(chartType, chart);
    };

    // functions
    chart.updateData = function (dataSource, options) {
      chart.dataSource = dataSource;
      if (options) {
        chart.options = merge(Chartkick.options, options);
      }
      fetchDataSource(chart, callback, dataSource);
    };
    chart.setOptions = function (options) {
      chart.options = merge(Chartkick.options, options);
      chart.redraw();
    };
    chart.redraw = function() {
      fetchDataSource(chart, callback, chart.rawData);
    };
    chart.refreshData = function () {
      if (typeof chart.dataSource === "string") {
        // prevent browser from caching
        var sep = chart.dataSource.indexOf("?") === -1 ? "?" : "&";
        var url = chart.dataSource + sep + "_=" + (new Date()).getTime();
        fetchDataSource(chart, callback, url);
      }
    };
    chart.stopRefresh = function () {
      if (chart.intervalId) {
        clearInterval(chart.intervalId);
      }
    };
    chart.toImage = function () {
      if (chart.adapter === "chartjs") {
        return chart.chart.toBase64Image();
      } else {
        return null;
      }
    }

    Chartkick.charts[element.id] = chart;

    fetchDataSource(chart, callback, dataSource);

    if (opts.refresh) {
      chart.intervalId = setInterval( function () {
        chart.refreshData();
      }, opts.refresh * 1000);
    }
  }

  // define classes

  Chartkick = {
    LineChart: function (element, dataSource, options) {
      createChart("LineChart", this, element, dataSource, options, processLineData);
    },
    PieChart: function (element, dataSource, options) {
      createChart("PieChart", this, element, dataSource, options, processSimple);
    },
    ColumnChart: function (element, dataSource, options) {
      createChart("ColumnChart", this, element, dataSource, options, processColumnData);
    },
    BarChart: function (element, dataSource, options) {
      createChart("BarChart", this, element, dataSource, options, processBarData);
    },
    AreaChart: function (element, dataSource, options) {
      createChart("AreaChart", this, element, dataSource, options, processAreaData);
    },
    GeoChart: function (element, dataSource, options) {
      createChart("GeoChart", this, element, dataSource, options, processSimple);
    },
    ScatterChart: function (element, dataSource, options) {
      createChart("ScatterChart", this, element, dataSource, options, processScatterData);
    },
    BubbleChart: function (element, dataSource, options) {
      createChart("BubbleChart", this, element, dataSource, options, processBubbleData);
    },
    Timeline: function (element, dataSource, options) {
      createChart("Timeline", this, element, dataSource, options, processTime);
    },
    charts: {},
    configure: function (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          config[key] = options[key];
        }
      }
    },
    eachChart: function (callback) {
      for (var chartId in Chartkick.charts) {
        if (Chartkick.charts.hasOwnProperty(chartId)) {
          callback(Chartkick.charts[chartId]);
        }
      }
    },
    options: {},
    adapters: adapters,
    createChart: createChart
  };

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Chartkick;
  } else {
    window.Chartkick = Chartkick;
  }
}(window));
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});

    myChart.render();
    document.getElementById("printChart").addEventListener("click",function(){
        window.print();
    });
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
