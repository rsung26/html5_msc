/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
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

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
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

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
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
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
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
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
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
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
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

jQuery.extend({
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
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
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
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
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
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
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

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
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
			while ( second[j] !== undefined ) {
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
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
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
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
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
	expando = "sizzle" + -(new Date()),
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
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
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
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
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
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
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
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
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
		i = attrs.length;

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
	return context && typeof context.getElementsByTagName !== strundefined && context;
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
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
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
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
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
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
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

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
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

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
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
	// Purposefully does not implement inclusive descendent
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
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
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
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
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

	return doc;
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
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
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
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

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
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

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
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
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
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
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
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
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
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
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
							idx = indexOf.call( seed, matched[i] );
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
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
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

function tokenize( selector, parseOnly ) {
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
}

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
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
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
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

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
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

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
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
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
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
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

			// Apply set filters to unmatched elements
			matchedCount += i;
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

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
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
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
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
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
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
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
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
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
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
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
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
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
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

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
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
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
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
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
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
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
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


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
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
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
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
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

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
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
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
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
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
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
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

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
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
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

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
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

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
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
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
			} catch( e ) {}

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
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
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
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
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
	if ( !jQuery.acceptData( elem ) ) {
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
						name = name.split(" ");
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
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
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

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
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
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
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
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
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
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
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

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
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
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
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
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

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
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
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
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

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
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
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

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

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
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
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
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
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
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
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
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

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

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
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
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
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

		// Support: Chrome 23+, Safari?
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
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
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

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
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
		if ( !e ) {
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
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

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
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
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
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
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
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
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
			return this;
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
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
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
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


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

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
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

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
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
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
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

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
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

	buildFragment: function( elems, context, scripts, selection ) {
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
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
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
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
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
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

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

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
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

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
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
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
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
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

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
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

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


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

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
} else if ( document.documentElement.currentStyle ) {
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
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
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
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
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


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
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
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
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
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

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
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

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

jQuery.extend({
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
		"columnCount": true,
		"fillOpacity": true,
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

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
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
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

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
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
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
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
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

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
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
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

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
});

jQuery.fn.extend({
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

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
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

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
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
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
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
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
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
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
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

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
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
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
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
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
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
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
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
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
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
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

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

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
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

		return this.each(function() {
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
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
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
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
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
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

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
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

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

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
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
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
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
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

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
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
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

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
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
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
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
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
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
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

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
					(ret = elem.ownerDocument.createAttribute( name ))
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
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
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
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
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
		}
	};
}

jQuery.each([
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
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
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
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

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
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



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
	}) ) ?
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
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
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
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

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
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
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
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
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
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
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
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
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
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
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
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

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
			xml: /xml/,
			html: /html/,
			json: /json/
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

		var // Cross-domain detection vars
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
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
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
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
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
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

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
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
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
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
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
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
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
				clearTimeout( timeoutTimer );
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
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
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
					jQuery.event.trigger("ajaxStop");
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
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
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
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

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
		});

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

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

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
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
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
								} catch( e ) {
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

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
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
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

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
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
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
		s.converters["script json"] = function() {
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
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

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
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
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
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

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

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
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
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

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
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
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

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
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
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
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

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
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
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
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
});

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
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
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

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
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
	});
});


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
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
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
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
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
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
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
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
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
          crossDomain: crossDomain
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

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
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
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
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

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*! Phaser v1.1.5 | (c) 2013 Photon Storm Ltd. */

!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.Phaser=b()}(this,function(){function a(){return b.Matrix="undefined"!=typeof Float32Array?Float32Array:Array,b.Matrix}var b=b||{},c=c||{VERSION:"1.1.5",DEV_VERSION:"1.1.5",GAMES:[],AUTO:0,CANVAS:1,WEBGL:2,HEADLESS:3,SPRITE:0,BUTTON:1,BULLET:2,GRAPHICS:3,TEXT:4,TILESPRITE:5,BITMAPTEXT:6,GROUP:7,RENDERTEXTURE:8,TILEMAP:9,TILEMAPLAYER:10,EMITTER:11,POLYGON:12,BITMAPDATA:13,CANVAS_FILTER:14,WEBGL_FILTER:15,NONE:0,LEFT:1,RIGHT:2,UP:3,DOWN:4,CANVAS_PX_ROUND:!1,CANVAS_CLEAR_RECT:!0};b.InteractionManager=function(){},c.Utils={shuffle:function(a){for(var b=a.length-1;b>0;b--){var c=Math.floor(Math.random()*(b+1)),d=a[b];a[b]=a[c],a[c]=d}return a},pad:function(a,b,c,d){if("undefined"==typeof b)var b=0;if("undefined"==typeof c)var c=" ";if("undefined"==typeof d)var d=3;var e=0;if(b+1>=a.length)switch(d){case 1:a=Array(b+1-a.length).join(c)+a;break;case 3:var f=Math.ceil((e=b-a.length)/2),g=e-f;a=Array(g+1).join(c)+a+Array(f+1).join(c);break;default:a+=Array(b+1-a.length).join(c)}return a},isPlainObject:function(a){if("object"!=typeof a||a.nodeType||a===a.window)return!1;try{if(a.constructor&&!hasOwn.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},extend:function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[1]||{},i=2),j===i&&(h=this,--i);j>i;i++)if(null!=(a=arguments[i]))for(b in a)d=h[b],e=a[b],h!==e&&(k&&e&&(c.Utils.isPlainObject(e)||(f=Array.isArray(e)))?(f?(f=!1,g=d&&Array.isArray(d)?d:[]):g=d&&c.Utils.isPlainObject(d)?d:{},h[b]=c.Utils.extend(k,g,e)):void 0!==e&&(h[b]=e));return h}},b.hex2rgb=function(a){return[(255&a>>16)/255,(255&a>>8)/255,(255&a)/255]},"function"!=typeof Function.prototype.bind&&(Function.prototype.bind=function(){var a=Array.prototype.slice;return function(b){function c(){var f=e.concat(a.call(arguments));d.apply(this instanceof c?this:b,f)}var d=this,e=a.call(arguments,1);if("function"!=typeof d)throw new TypeError;return c.prototype=function f(a){return a&&(f.prototype=a),this instanceof f?void 0:new f}(d.prototype),c}}()),Array.isArray||(Array.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)}),a(),b.mat3={},b.mat3.create=function(){var a=new b.Matrix(9);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},b.mat3.identity=function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},b.mat4={},b.mat4.create=function(){var a=new b.Matrix(16);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},b.mat3.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=b[0],n=b[1],o=b[2],p=b[3],q=b[4],r=b[5],s=b[6],t=b[7],u=b[8];return c[0]=m*d+n*g+o*j,c[1]=m*e+n*h+o*k,c[2]=m*f+n*i+o*l,c[3]=p*d+q*g+r*j,c[4]=p*e+q*h+r*k,c[5]=p*f+q*i+r*l,c[6]=s*d+t*g+u*j,c[7]=s*e+t*h+u*k,c[8]=s*f+t*i+u*l,c},b.mat3.clone=function(a){var c=new b.Matrix(9);return c[0]=a[0],c[1]=a[1],c[2]=a[2],c[3]=a[3],c[4]=a[4],c[5]=a[5],c[6]=a[6],c[7]=a[7],c[8]=a[8],c},b.mat3.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[5];return a[1]=a[3],a[2]=a[6],a[3]=c,a[5]=a[7],a[6]=d,a[7]=e,a}return b[0]=a[0],b[1]=a[3],b[2]=a[6],b[3]=a[1],b[4]=a[4],b[5]=a[7],b[6]=a[2],b[7]=a[5],b[8]=a[8],b},b.mat3.toMat4=function(a,c){return c||(c=b.mat4.create()),c[15]=1,c[14]=0,c[13]=0,c[12]=0,c[11]=0,c[10]=a[8],c[9]=a[7],c[8]=a[6],c[7]=0,c[6]=a[5],c[5]=a[4],c[4]=a[3],c[3]=0,c[2]=a[2],c[1]=a[1],c[0]=a[0],c},b.mat4.create=function(){var a=new b.Matrix(16);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},b.mat4.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[3],f=a[6],g=a[7],h=a[11];return a[1]=a[4],a[2]=a[8],a[3]=a[12],a[4]=c,a[6]=a[9],a[7]=a[13],a[8]=d,a[9]=f,a[11]=a[14],a[12]=e,a[13]=g,a[14]=h,a}return b[0]=a[0],b[1]=a[4],b[2]=a[8],b[3]=a[12],b[4]=a[1],b[5]=a[5],b[6]=a[9],b[7]=a[13],b[8]=a[2],b[9]=a[6],b[10]=a[10],b[11]=a[14],b[12]=a[3],b[13]=a[7],b[14]=a[11],b[15]=a[15],b},b.mat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=a[9],n=a[10],o=a[11],p=a[12],q=a[13],r=a[14],s=a[15],t=b[0],u=b[1],v=b[2],w=b[3];return c[0]=t*d+u*h+v*l+w*p,c[1]=t*e+u*i+v*m+w*q,c[2]=t*f+u*j+v*n+w*r,c[3]=t*g+u*k+v*o+w*s,t=b[4],u=b[5],v=b[6],w=b[7],c[4]=t*d+u*h+v*l+w*p,c[5]=t*e+u*i+v*m+w*q,c[6]=t*f+u*j+v*n+w*r,c[7]=t*g+u*k+v*o+w*s,t=b[8],u=b[9],v=b[10],w=b[11],c[8]=t*d+u*h+v*l+w*p,c[9]=t*e+u*i+v*m+w*q,c[10]=t*f+u*j+v*n+w*r,c[11]=t*g+u*k+v*o+w*s,t=b[12],u=b[13],v=b[14],w=b[15],c[12]=t*d+u*h+v*l+w*p,c[13]=t*e+u*i+v*m+w*q,c[14]=t*f+u*j+v*n+w*r,c[15]=t*g+u*k+v*o+w*s,c},b.Point=function(a,b){this.x=a||0,this.y=b||0},b.Point.prototype.clone=function(){return new b.Point(this.x,this.y)},b.Point.prototype.constructor=b.Point,b.Rectangle=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},b.Rectangle.prototype.clone=function(){return new b.Rectangle(this.x,this.y,this.width,this.height)},b.Rectangle.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=this.x;if(a>=c&&a<=c+this.width){var d=this.y;if(b>=d&&b<=d+this.height)return!0}return!1},b.Rectangle.prototype.constructor=b.Rectangle,b.Polygon=function(a){if(a instanceof Array||(a=Array.prototype.slice.call(arguments)),"number"==typeof a[0]){for(var c=[],d=0,e=a.length;e>d;d+=2)c.push(new b.Point(a[d],a[d+1]));a=c}this.points=a},b.Polygon.prototype.clone=function(){for(var a=[],c=0;c<this.points.length;c++)a.push(this.points[c].clone());return new b.Polygon(a)},b.Polygon.prototype.contains=function(a,b){for(var c=!1,d=0,e=this.points.length-1;d<this.points.length;e=d++){var f=this.points[d].x,g=this.points[d].y,h=this.points[e].x,i=this.points[e].y,j=g>b!=i>b&&(h-f)*(b-g)/(i-g)+f>a;j&&(c=!c)}return c},b.Polygon.prototype.constructor=b.Polygon,b.DisplayObject=function(){this.last=this,this.first=this,this.position=new b.Point,this.scale=new b.Point(1,1),this.pivot=new b.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.buttonMode=!1,this.renderable=!1,this.parent=null,this.stage=null,this.worldAlpha=1,this._interactive=!1,this.defaultCursor="pointer",this.worldTransform=b.mat3.create(),this.localTransform=b.mat3.create(),this.color=[],this.dynamic=!0,this._sr=0,this._cr=1,this.filterArea=new b.Rectangle(0,0,1,1)},b.DisplayObject.prototype.constructor=b.DisplayObject,b.DisplayObject.prototype.setInteractive=function(a){this.interactive=a},Object.defineProperty(b.DisplayObject.prototype,"interactive",{get:function(){return this._interactive},set:function(a){this._interactive=a,this.stage&&(this.stage.dirty=!0)}}),Object.defineProperty(b.DisplayObject.prototype,"mask",{get:function(){return this._mask},set:function(a){a?this._mask?(a.start=this._mask.start,a.end=this._mask.end):(this.addFilter(a),a.renderable=!1):(this.removeFilter(this._mask),this._mask.renderable=!0),this._mask=a}}),Object.defineProperty(b.DisplayObject.prototype,"filters",{get:function(){return this._filters},set:function(a){if(a){this._filters&&this.removeFilter(this._filters),this.addFilter(a);for(var b=[],c=0;c<a.length;c++)for(var d=a[c].passes,e=0;e<d.length;e++)b.push(d[e]);a.start.filterPasses=b}else this._filters&&this.removeFilter(this._filters);this._filters=a}}),b.DisplayObject.prototype.addFilter=function(a){var c=new b.FilterBlock,d=new b.FilterBlock;a.start=c,a.end=d,c.data=a,d.data=a,c.first=c.last=this,d.first=d.last=this,c.open=!0,c.target=this;var e,f,g=c,h=c;f=this.first._iPrev,f?(e=f._iNext,g._iPrev=f,f._iNext=g):e=this,e&&(e._iPrev=h,h._iNext=e),g=d,h=d,e=null,f=null,f=this.last,e=f._iNext,e&&(e._iPrev=h,h._iNext=e),g._iPrev=f,f._iNext=g;for(var i=this,j=this.last;i;)i.last===j&&(i.last=d),i=i.parent;this.first=c,this.__renderGroup&&this.__renderGroup.addFilterBlocks(c,d)},b.DisplayObject.prototype.removeFilter=function(a){var b=a.start,c=b._iNext,d=b._iPrev;c&&(c._iPrev=d),d&&(d._iNext=c),this.first=b._iNext;var e=a.end;c=e._iNext,d=e._iPrev,c&&(c._iPrev=d),d._iNext=c;for(var f=e._iPrev,g=this;g.last===e&&(g.last=f,g=g.parent););this.__renderGroup&&this.__renderGroup.removeFilterBlocks(b,e)},b.DisplayObject.prototype.updateTransform=function(){this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation));var a=this.localTransform,c=this.parent.worldTransform,d=this.worldTransform;a[0]=this._cr*this.scale.x,a[1]=-this._sr*this.scale.y,a[3]=this._sr*this.scale.x,a[4]=this._cr*this.scale.y;var e=this.pivot.x,f=this.pivot.y,g=a[0],h=a[1],i=this.position.x-a[0]*e-f*a[1],j=a[3],k=a[4],l=this.position.y-a[4]*f-e*a[3],m=c[0],n=c[1],o=c[2],p=c[3],q=c[4],r=c[5];a[2]=i,a[5]=l,d[0]=m*g+n*j,d[1]=m*h+n*k,d[2]=m*i+n*l+o,d[3]=p*g+q*j,d[4]=p*h+q*k,d[5]=p*i+q*l+r,this.worldAlpha=this.alpha*this.parent.worldAlpha,this.vcount=b.visibleCount},b.visibleCount=0,b.DisplayObjectContainer=function(){b.DisplayObject.call(this),this.children=[]},b.DisplayObjectContainer.prototype=Object.create(b.DisplayObject.prototype),b.DisplayObjectContainer.prototype.constructor=b.DisplayObjectContainer,b.DisplayObjectContainer.prototype.addChild=function(a){if(a.parent&&a.parent!==this&&a.parent.removeChild(a),a.parent=this,this.children.push(a),this.stage){var b=a;do b.interactive&&(this.stage.dirty=!0),b.stage=this.stage,b=b._iNext;while(b)}var c,d,e=a.first,f=a.last;d=this._filters||this._mask?this.last._iPrev:this.last,c=d._iNext;for(var g=this,h=d;g;)g.last===h&&(g.last=a.last),g=g.parent;c&&(c._iPrev=f,f._iNext=c),e._iPrev=d,d._iNext=e,this.__renderGroup&&(a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a),this.__renderGroup.addDisplayObjectAndChildren(a))},b.DisplayObjectContainer.prototype.addChildAt=function(a,b){if(!(b>=0&&b<=this.children.length))throw new Error(a+" The index "+b+" supplied is out of bounds "+this.children.length);if(void 0!==a.parent&&a.parent.removeChild(a),a.parent=this,this.stage){var c=a;do c.interactive&&(this.stage.dirty=!0),c.stage=this.stage,c=c._iNext;while(c)}var d,e,f=a.first,g=a.last;if(b===this.children.length){e=this.last;for(var h=this,i=this.last;h;)h.last===i&&(h.last=a.last),h=h.parent}else e=0===b?this:this.children[b-1].last;d=e._iNext,d&&(d._iPrev=g,g._iNext=d),f._iPrev=e,e._iNext=f,this.children.splice(b,0,a),this.__renderGroup&&(a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a),this.__renderGroup.addDisplayObjectAndChildren(a))},b.DisplayObjectContainer.prototype.swapChildren=function(a,b){if(a!==b){var c=this.children.indexOf(a),d=this.children.indexOf(b);if(0>c||0>d)throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");this.removeChild(a),this.removeChild(b),d>c?(this.addChildAt(b,c),this.addChildAt(a,d)):(this.addChildAt(a,d),this.addChildAt(b,c))}},b.DisplayObjectContainer.prototype.getChildAt=function(a){if(a>=0&&a<this.children.length)return this.children[a];throw new Error("Both the supplied DisplayObjects must be a child of the caller "+this)},b.DisplayObjectContainer.prototype.removeChild=function(a){var b=this.children.indexOf(a);if(-1===b)throw new Error(a+" The supplied DisplayObject must be a child of the caller "+this);var c=a.first,d=a.last,e=d._iNext,f=c._iPrev;if(e&&(e._iPrev=f),f._iNext=e,this.last===d)for(var g=c._iPrev,h=this;h.last===d&&(h.last=g,h=h.parent););if(d._iNext=null,c._iPrev=null,this.stage){var i=a;do i.interactive&&(this.stage.dirty=!0),i.stage=null,i=i._iNext;while(i)}a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a),a.parent=void 0,this.children.splice(b,1)},b.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible){b.DisplayObject.prototype.updateTransform.call(this);for(var a=0,c=this.children.length;c>a;a++)this.children[a].updateTransform()}},b.blendModes={},b.blendModes.NORMAL=0,b.blendModes.SCREEN=1,b.Sprite=function(a){b.DisplayObjectContainer.call(this),this.anchor=new b.Point,this.texture=a,this.blendMode=b.blendModes.NORMAL,this._width=0,this._height=0,a.baseTexture.hasLoaded?this.updateFrame=!0:(this.onTextureUpdateBind=this.onTextureUpdate.bind(this),this.texture.addEventListener("update",this.onTextureUpdateBind)),this.renderable=!0},b.Sprite.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Sprite.prototype.constructor=b.Sprite,Object.defineProperty(b.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Sprite.prototype.setTexture=function(a){this.texture.baseTexture!==a.baseTexture?(this.textureChange=!0,this.texture=a,this.__renderGroup&&this.__renderGroup.updateTexture(this)):this.texture=a,this.updateFrame=!0},b.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height),this.updateFrame=!0},b.Sprite.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache'+this);return new b.Sprite(c)},b.Sprite.fromImage=function(a){var c=b.Texture.fromImage(a);return new b.Sprite(c)},b.Stage=function(a){b.DisplayObjectContainer.call(this),this.worldTransform=b.mat3.create(),this.interactive=!0,this.interactionManager=new b.InteractionManager(this),this.dirty=!0,this.__childrenAdded=[],this.__childrenRemoved=[],this.stage=this,this.stage.hitArea=new b.Rectangle(0,0,1e5,1e5),this.setBackgroundColor(a),this.worldVisible=!0},b.Stage.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Stage.prototype.constructor=b.Stage,b.Stage.prototype.setInteractionDelegate=function(a){this.interactionManager.setTargetDomElement(a)},b.Stage.prototype.updateTransform=function(){this.worldAlpha=1,this.vcount=b.visibleCount;for(var a=0,c=this.children.length;c>a;a++)this.children[a].updateTransform();this.dirty&&(this.dirty=!1,this.interactionManager.dirty=!0),this.interactive&&this.interactionManager.update()},b.Stage.prototype.setBackgroundColor=function(a){this.backgroundColor=a||0,this.backgroundColorSplit=b.hex2rgb(this.backgroundColor);var c=this.backgroundColor.toString(16);c="000000".substr(0,6-c.length)+c,this.backgroundColorString="#"+c},b.Stage.prototype.getMousePosition=function(){return this.interactionManager.mouse.global},b.CustomRenderable=function(){b.DisplayObject.call(this),this.renderable=!0},b.CustomRenderable.prototype=Object.create(b.DisplayObject.prototype),b.CustomRenderable.prototype.constructor=b.CustomRenderable,b.CustomRenderable.prototype.renderCanvas=function(){},b.CustomRenderable.prototype.initWebGL=function(){},b.CustomRenderable.prototype.renderWebGL=function(){},b.Strip=function(a,c,d){b.DisplayObjectContainer.call(this),this.texture=a,this.blendMode=b.blendModes.NORMAL;try{this.uvs=new Float32Array([0,1,1,1,1,0,0,1]),this.verticies=new Float32Array([0,0,0,0,0,0,0,0,0]),this.colors=new Float32Array([1,1,1,1]),this.indices=new Uint16Array([0,1,2,3])}catch(e){this.uvs=[0,1,1,1,1,0,0,1],this.verticies=[0,0,0,0,0,0,0,0,0],this.colors=[1,1,1,1],this.indices=[0,1,2,3]}this.width=c,this.height=d,a.baseTexture.hasLoaded?(this.width=this.texture.frame.width,this.height=this.texture.frame.height,this.updateFrame=!0):(this.onTextureUpdateBind=this.onTextureUpdate.bind(this),this.texture.addEventListener("update",this.onTextureUpdateBind)),this.renderable=!0},b.Strip.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Strip.prototype.constructor=b.Strip,b.Strip.prototype.setTexture=function(a){this.texture=a,this.width=a.frame.width,this.height=a.frame.height,this.updateFrame=!0},b.Strip.prototype.onTextureUpdate=function(){this.updateFrame=!0},b.Rope=function(a,c){b.Strip.call(this,a),this.points=c;try{this.verticies=new Float32Array(4*c.length),this.uvs=new Float32Array(4*c.length),this.colors=new Float32Array(2*c.length),this.indices=new Uint16Array(2*c.length)}catch(d){this.verticies=new Array(4*c.length),this.uvs=new Array(4*c.length),this.colors=new Array(2*c.length),this.indices=new Array(2*c.length)}this.refresh()},b.Rope.prototype=Object.create(b.Strip.prototype),b.Rope.prototype.constructor=b.Rope,b.Rope.prototype.refresh=function(){var a=this.points;if(!(a.length<1)){var b=this.uvs,c=a[0],d=this.indices,e=this.colors;this.count-=.2,b[0]=0,b[1]=1,b[2]=0,b[3]=1,e[0]=1,e[1]=1,d[0]=0,d[1]=1;for(var f,g,h,i=a.length,j=1;i>j;j++)f=a[j],g=4*j,h=j/(i-1),j%2?(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1):(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1),g=2*j,e[g]=1,e[g+1]=1,g=2*j,d[g]=g,d[g+1]=g+1,c=f}},b.Rope.prototype.updateTransform=function(){var a=this.points;if(!(a.length<1)){var c,d=a[0],e={x:0,y:0};this.count-=.2;var f=this.verticies;f[0]=d.x+e.x,f[1]=d.y+e.y,f[2]=d.x-e.x,f[3]=d.y-e.y;for(var g,h,i,j,k,l=a.length,m=1;l>m;m++)g=a[m],h=4*m,c=m<a.length-1?a[m+1]:g,e.y=-(c.x-d.x),e.x=c.y-d.y,i=10*(1-m/(l-1)),i>1&&(i=1),j=Math.sqrt(e.x*e.x+e.y*e.y),k=this.texture.height/2,e.x/=j,e.y/=j,e.x*=k,e.y*=k,f[h]=g.x+e.x,f[h+1]=g.y+e.y,f[h+2]=g.x-e.x,f[h+3]=g.y-e.y,d=g;b.DisplayObjectContainer.prototype.updateTransform.call(this)}},b.Rope.prototype.setTexture=function(a){this.texture=a,this.updateFrame=!0},b.TilingSprite=function(a,c,d){b.DisplayObjectContainer.call(this),this.texture=a,this.width=c,this.height=d,this.tileScale=new b.Point(1,1),this.tilePosition=new b.Point(0,0),this.renderable=!0,this.blendMode=b.blendModes.NORMAL},b.TilingSprite.prototype=Object.create(b.DisplayObjectContainer.prototype),b.TilingSprite.prototype.constructor=b.TilingSprite,b.TilingSprite.prototype.setTexture=function(a){this.texture=a,this.updateFrame=!0},b.TilingSprite.prototype.onTextureUpdate=function(){this.updateFrame=!0},b.AbstractFilter=function(a,b){this.passes=[this],this.dirty=!0,this.padding=0,this.uniforms=b||{},this.fragmentSrc=a||[]},b.FilterBlock=function(){this.visible=!0,this.renderable=!0},b.Graphics=function(){b.DisplayObjectContainer.call(this),this.renderable=!0,this.fillAlpha=1,this.lineWidth=0,this.lineColor="black",this.graphicsData=[],this.currentPath={points:[]}},b.Graphics.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Graphics.prototype.constructor=b.Graphics,b.Graphics.prototype.lineStyle=function(a,c,d){this.currentPath.points.length||this.graphicsData.pop(),this.lineWidth=a||0,this.lineColor=c||0,this.lineAlpha=arguments.length<3?1:d,this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:b.Graphics.POLY},this.graphicsData.push(this.currentPath)},b.Graphics.prototype.moveTo=function(a,c){this.currentPath.points.length||this.graphicsData.pop(),this.currentPath=this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:b.Graphics.POLY},this.currentPath.points.push(a,c),this.graphicsData.push(this.currentPath)},b.Graphics.prototype.lineTo=function(a,b){this.currentPath.points.push(a,b),this.dirty=!0},b.Graphics.prototype.beginFill=function(a,b){this.filling=!0,this.fillColor=a||0,this.fillAlpha=arguments.length<2?1:b},b.Graphics.prototype.endFill=function(){this.filling=!1,this.fillColor=null,this.fillAlpha=1},b.Graphics.prototype.drawRect=function(a,c,d,e){this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,e],type:b.Graphics.RECT},this.graphicsData.push(this.currentPath),this.dirty=!0},b.Graphics.prototype.drawCircle=function(a,c,d){this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,d],type:b.Graphics.CIRC},this.graphicsData.push(this.currentPath),this.dirty=!0},b.Graphics.prototype.drawEllipse=function(a,c,d,e){this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,e],type:b.Graphics.ELIP},this.graphicsData.push(this.currentPath),this.dirty=!0},b.Graphics.prototype.clear=function(){this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[],this.bounds=null},b.Graphics.prototype.updateFilterBounds=function(){if(!this.bounds){for(var a,c,d,e=1/0,f=-1/0,g=1/0,h=-1/0,i=0;i<this.graphicsData.length;i++){var j=this.graphicsData[i],k=j.type,l=j.lineWidth;if(a=j.points,k===b.Graphics.RECT){c=a.x-l/2,d=a.y-l/2;var m=a.width+l,n=a.height+l;e=e>c?c:e,f=c+m>f?c+m:f,g=g>d?c:g,h=d+n>h?d+n:h}else if(k===b.Graphics.CIRC||k===b.Graphics.ELIP){c=a.x,d=a.y;var o=a.radius+l/2;e=e>c-o?c-o:e,f=c+o>f?c+o:f,g=g>d-o?d-o:g,h=d+o>h?d+o:h}else for(var p=0;p<a.length;p+=2)c=a[p],d=a[p+1],e=e>c-l?c-l:e,f=c+l>f?c+l:f,g=g>d-l?d-l:g,h=d+l>h?d+l:h}this.bounds=new b.Rectangle(e,g,f-e,h-g)}},b.Graphics.POLY=0,b.Graphics.RECT=1,b.Graphics.CIRC=2,b.Graphics.ELIP=3,b.CanvasGraphics=function(){},b.CanvasGraphics.renderGraphics=function(a,c){for(var d=a.worldAlpha,e="",f=0;f<a.graphicsData.length;f++){var g=a.graphicsData[f],h=g.points;if(c.strokeStyle=e="#"+("00000"+(0|g.lineColor).toString(16)).substr(-6),c.lineWidth=g.lineWidth,g.type===b.Graphics.POLY){c.beginPath(),c.moveTo(h[0],h[1]);for(var i=1;i<h.length/2;i++)c.lineTo(h[2*i],h[2*i+1]);h[0]===h[h.length-2]&&h[1]===h[h.length-1]&&c.closePath(),g.fill&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke())}else if(g.type===b.Graphics.RECT)(g.fillColor||0===g.fillColor)&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fillRect(h[0],h[1],h[2],h[3])),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.strokeRect(h[0],h[1],h[2],h[3]));else if(g.type===b.Graphics.CIRC)c.beginPath(),c.arc(h[0],h[1],h[2],0,2*Math.PI),c.closePath(),g.fill&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke());else if(g.type===b.Graphics.ELIP){var j=g.points,k=2*j[2],l=2*j[3],m=j[0]-k/2,n=j[1]-l/2;c.beginPath();var o=.5522848,p=k/2*o,q=l/2*o,r=m+k,s=n+l,t=m+k/2,u=n+l/2;c.moveTo(m,u),c.bezierCurveTo(m,u-q,t-p,n,t,n),c.bezierCurveTo(t+p,n,r,u-q,r,u),c.bezierCurveTo(r,u+q,t+p,s,t,s),c.bezierCurveTo(t-p,s,m,u+q,m,u),c.closePath(),g.fill&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke())}}},b.CanvasGraphics.renderGraphicsMask=function(a,c){var d=a.graphicsData.length;if(0!==d){d>1&&(d=1,window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));for(var e=0;1>e;e++){var f=a.graphicsData[e],g=f.points;if(f.type===b.Graphics.POLY){c.beginPath(),c.moveTo(g[0],g[1]);for(var h=1;h<g.length/2;h++)c.lineTo(g[2*h],g[2*h+1]);g[0]===g[g.length-2]&&g[1]===g[g.length-1]&&c.closePath()}else if(f.type===b.Graphics.RECT)c.beginPath(),c.rect(g[0],g[1],g[2],g[3]),c.closePath();else if(f.type===b.Graphics.CIRC)c.beginPath(),c.arc(g[0],g[1],g[2],0,2*Math.PI),c.closePath();else if(f.type===b.Graphics.ELIP){var i=f.points,j=2*i[2],k=2*i[3],l=i[0]-j/2,m=i[1]-k/2;c.beginPath();var n=.5522848,o=j/2*n,p=k/2*n,q=l+j,r=m+k,s=l+j/2,t=m+k/2;c.moveTo(l,t),c.bezierCurveTo(l,t-p,s-o,m,s,m),c.bezierCurveTo(s+o,m,q,t-p,q,t),c.bezierCurveTo(q,t+p,s+o,r,s,r),c.bezierCurveTo(s-o,r,l,t+p,l,t),c.closePath()}}}},b.CanvasRenderer=function(a,b,c,d){this.transparent=d,this.width=a||800,this.height=b||600,this.view=c||document.createElement("canvas"),this.context=this.view.getContext("2d"),this.smoothProperty=null,"imageSmoothingEnabled"in this.context?this.smoothProperty="imageSmoothingEnabled":"webkitImageSmoothingEnabled"in this.context?this.smoothProperty="webkitImageSmoothingEnabled":"mozImageSmoothingEnabled"in this.context?this.smoothProperty="mozImageSmoothingEnabled":"oImageSmoothingEnabled"in this.context&&(this.smoothProperty="oImageSmoothingEnabled"),this.scaleMode=null,this.refresh=!0,this.view.width=this.width,this.view.height=this.height,this.count=0},b.CanvasRenderer.prototype.constructor=b.CanvasRenderer,b.CanvasRenderer.prototype.render=function(a){b.texturesToUpdate=[],b.texturesToDestroy=[],b.visibleCount++,a.updateTransform(),this.view.style.backgroundColor===a.backgroundColorString||this.transparent||(this.view.style.backgroundColor=a.backgroundColorString),this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height),this.renderDisplayObject(a),a.interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this))),b.Texture.frameUpdates.length>0&&(b.Texture.frameUpdates=[])},b.CanvasRenderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.view.width=a,this.view.height=b},b.CanvasRenderer.prototype.renderDisplayObject=function(a){var c,d=this.context;d.globalCompositeOperation="source-over";var e=a.last._iNext;a=a.first;do if(c=a.worldTransform,a.visible)if(a.renderable){if(a instanceof b.Sprite){var f=a.texture.frame;f&&f.width&&f.height&&a.texture.baseTexture.source&&(d.globalAlpha=a.worldAlpha,d.setTransform(c[0],c[3],c[1],c[4],c[2],c[5]),this.smoothProperty&&this.scaleMode!==a.texture.baseTexture.scaleMode&&(this.scaleMode=a.texture.baseTexture.scaleMode,d[this.smoothProperty]=this.scaleMode===b.BaseTexture.SCALE_MODE.LINEAR),d.drawImage(a.texture.baseTexture.source,f.x,f.y,f.width,f.height,a.anchor.x*-f.width,a.anchor.y*-f.height,f.width,f.height))}else if(a instanceof b.Strip)d.setTransform(c[0],c[3],c[1],c[4],c[2],c[5]),this.renderStrip(a);else if(a instanceof b.TilingSprite)d.setTransform(c[0],c[3],c[1],c[4],c[2],c[5]),this.renderTilingSprite(a);else if(a instanceof b.CustomRenderable)d.setTransform(c[0],c[3],c[1],c[4],c[2],c[5]),a.renderCanvas(this);else if(a instanceof b.Graphics)d.setTransform(c[0],c[3],c[1],c[4],c[2],c[5]),b.CanvasGraphics.renderGraphics(a,d);else if(a instanceof b.FilterBlock&&a.data instanceof b.Graphics){var g=a.data;if(a.open){d.save();var h=g.alpha,i=g.worldTransform;d.setTransform(i[0],i[3],i[1],i[4],i[2],i[5]),g.worldAlpha=.5,d.worldAlpha=0,b.CanvasGraphics.renderGraphicsMask(g,d),d.clip(),g.worldAlpha=h}else d.restore()}a=a._iNext}else a=a._iNext;else a=a.last._iNext;while(a!==e)},b.CanvasRenderer.prototype.renderStripFlat=function(a){var b=this.context,c=a.verticies,d=c.length/2;this.count++,b.beginPath();for(var e=1;d-2>e;e++){var f=2*e,g=c[f],h=c[f+2],i=c[f+4],j=c[f+1],k=c[f+3],l=c[f+5];b.moveTo(g,j),b.lineTo(h,k),b.lineTo(i,l)}b.fillStyle="#FF0000",b.fill(),b.closePath()},b.CanvasRenderer.prototype.renderTilingSprite=function(a){var b=this.context;b.globalAlpha=a.worldAlpha,a.__tilePattern||(a.__tilePattern=b.createPattern(a.texture.baseTexture.source,"repeat")),b.beginPath();var c=a.tilePosition,d=a.tileScale;b.scale(d.x,d.y),b.translate(c.x,c.y),b.fillStyle=a.__tilePattern,b.fillRect(-c.x,-c.y,a.width/d.x,a.height/d.y),b.scale(1/d.x,1/d.y),b.translate(-c.x,-c.y),b.closePath()},b.CanvasRenderer.prototype.renderStrip=function(a){var b=this.context,c=a.verticies,d=a.uvs,e=c.length/2;this.count++;for(var f=1;e-2>f;f++){var g=2*f,h=c[g],i=c[g+2],j=c[g+4],k=c[g+1],l=c[g+3],m=c[g+5],n=d[g]*a.texture.width,o=d[g+2]*a.texture.width,p=d[g+4]*a.texture.width,q=d[g+1]*a.texture.height,r=d[g+3]*a.texture.height,s=d[g+5]*a.texture.height;b.save(),b.beginPath(),b.moveTo(h,k),b.lineTo(i,l),b.lineTo(j,m),b.closePath(),b.clip();var t=n*r+q*p+o*s-r*p-q*o-n*s,u=h*r+q*j+i*s-r*j-q*i-h*s,v=n*i+h*p+o*j-i*p-h*o-n*j,w=n*r*j+q*i*p+h*o*s-h*r*p-q*o*j-n*i*s,x=k*r+q*m+l*s-r*m-q*l-k*s,y=n*l+k*p+o*m-l*p-k*o-n*m,z=n*r*m+q*l*p+k*o*s-k*r*p-q*o*m-n*l*s;b.transform(u/t,x/t,v/t,y/t,w/t,z/t),b.drawImage(a.texture.baseTexture.source,0,0),b.restore()}},b.PixiShader=function(){this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;","}"],this.textureCount=0},b.PixiShader.prototype.init=function(){var a=b.compileProgram(this.vertexSrc||b.PixiShader.defaultVertexSrc,this.fragmentSrc),c=b.gl;c.useProgram(a),this.uSampler=c.getUniformLocation(a,"uSampler"),this.projectionVector=c.getUniformLocation(a,"projectionVector"),this.offsetVector=c.getUniformLocation(a,"offsetVector"),this.dimensions=c.getUniformLocation(a,"dimensions"),this.aVertexPosition=c.getAttribLocation(a,"aVertexPosition"),this.colorAttribute=c.getAttribLocation(a,"aColor"),this.aTextureCoord=c.getAttribLocation(a,"aTextureCoord");for(var d in this.uniforms)this.uniforms[d].uniformLocation=c.getUniformLocation(a,d);this.initUniforms(),this.program=a},b.PixiShader.prototype.initUniforms=function(){this.textureCount=1;var a;for(var c in this.uniforms){a=this.uniforms[c];var d=a.type;"sampler2D"===d?(a._init=!1,null!==a.value&&this.initSampler2D(a)):"mat2"===d||"mat3"===d||"mat4"===d?(a.glMatrix=!0,a.glValueLength=1,"mat2"===d?a.glFunc=b.gl.uniformMatrix2fv:"mat3"===d?a.glFunc=b.gl.uniformMatrix3fv:"mat4"===d&&(a.glFunc=b.gl.uniformMatrix4fv)):(a.glFunc=b.gl["uniform"+d],a.glValueLength="2f"===d||"2i"===d?2:"3f"===d||"3i"===d?3:"4f"===d||"4i"===d?4:1)}},b.PixiShader.prototype.initSampler2D=function(a){if(a.value&&a.value.baseTexture&&a.value.baseTexture.hasLoaded){if(b.gl.activeTexture(b.gl["TEXTURE"+this.textureCount]),b.gl.bindTexture(b.gl.TEXTURE_2D,a.value.baseTexture._glTexture),a.textureData){var c=a.textureData,d=c.magFilter?c.magFilter:b.gl.LINEAR,e=c.minFilter?c.minFilter:b.gl.LINEAR,f=c.wrapS?c.wrapS:b.gl.CLAMP_TO_EDGE,g=c.wrapT?c.wrapT:b.gl.CLAMP_TO_EDGE,h=c.luminance?b.gl.LUMINANCE:b.gl.RGBA;if(c.repeat&&(f=b.gl.REPEAT,g=b.gl.REPEAT),b.gl.pixelStorei(b.gl.UNPACK_FLIP_Y_WEBGL,!1),c.width){var i=c.width?c.width:512,j=c.height?c.height:2,k=c.border?c.border:0;b.gl.texImage2D(b.gl.TEXTURE_2D,0,h,i,j,k,h,b.gl.UNSIGNED_BYTE,null)}else b.gl.texImage2D(b.gl.TEXTURE_2D,0,h,b.gl.RGBA,b.gl.UNSIGNED_BYTE,a.value.baseTexture.source);b.gl.texParameteri(b.gl.TEXTURE_2D,b.gl.TEXTURE_MAG_FILTER,d),b.gl.texParameteri(b.gl.TEXTURE_2D,b.gl.TEXTURE_MIN_FILTER,e),b.gl.texParameteri(b.gl.TEXTURE_2D,b.gl.TEXTURE_WRAP_S,f),b.gl.texParameteri(b.gl.TEXTURE_2D,b.gl.TEXTURE_WRAP_T,g)}b.gl.uniform1i(a.uniformLocation,this.textureCount),a._init=!0,this.textureCount++}},b.PixiShader.prototype.syncUniforms=function(){this.textureCount=1;var a;for(var c in this.uniforms)a=this.uniforms[c],1===a.glValueLength?a.glMatrix===!0?a.glFunc.call(b.gl,a.uniformLocation,a.transpose,a.value):a.glFunc.call(b.gl,a.uniformLocation,a.value):2===a.glValueLength?a.glFunc.call(b.gl,a.uniformLocation,a.value.x,a.value.y):3===a.glValueLength?a.glFunc.call(b.gl,a.uniformLocation,a.value.x,a.value.y,a.value.z):4===a.glValueLength?a.glFunc.call(b.gl,a.uniformLocation,a.value.x,a.value.y,a.value.z,a.value.w):"sampler2D"===a.type&&(a._init?(b.gl.activeTexture(b.gl["TEXTURE"+this.textureCount]),b.gl.bindTexture(b.gl.TEXTURE_2D,a.value.baseTexture._glTexture),b.gl.uniform1i(a.uniformLocation,this.textureCount),this.textureCount++):this.initSampler2D(a))},b.PixiShader.defaultVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"],b.PrimitiveShader=function(){this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = aColor  * alpha;","}"]
},b.PrimitiveShader.prototype.init=function(){var a=b.compileProgram(this.vertexSrc,this.fragmentSrc),c=b.gl;c.useProgram(a),this.projectionVector=c.getUniformLocation(a,"projectionVector"),this.offsetVector=c.getUniformLocation(a,"offsetVector"),this.aVertexPosition=c.getAttribLocation(a,"aVertexPosition"),this.colorAttribute=c.getAttribLocation(a,"aColor"),this.translationMatrix=c.getUniformLocation(a,"translationMatrix"),this.alpha=c.getUniformLocation(a,"alpha"),this.program=a},b.StripShader=function(){this.program=null,this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","   gl_FragColor = gl_FragColor * alpha;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"]},b.StripShader.prototype.init=function(){var a=b.compileProgram(this.vertexSrc,this.fragmentSrc),c=b.gl;c.useProgram(a),this.uSampler=c.getUniformLocation(a,"uSampler"),this.projectionVector=c.getUniformLocation(a,"projectionVector"),this.offsetVector=c.getUniformLocation(a,"offsetVector"),this.colorAttribute=c.getAttribLocation(a,"aColor"),this.aVertexPosition=c.getAttribLocation(a,"aVertexPosition"),this.aTextureCoord=c.getAttribLocation(a,"aTextureCoord"),this.translationMatrix=c.getUniformLocation(a,"translationMatrix"),this.alpha=c.getUniformLocation(a,"alpha"),this.program=a},b._batchs=[],b._getBatch=function(a){return 0===b._batchs.length?new b.WebGLBatch(a):b._batchs.pop()},b._returnBatch=function(a){a.clean(),b._batchs.push(a)},b._restoreBatchs=function(a){for(var c=0;c<b._batchs.length;c++)b._batchs[c].restoreLostContext(a)},b.WebGLBatch=function(a){this.gl=a,this.size=0,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer(),this.blendMode=b.blendModes.NORMAL,this.dynamicSize=1},b.WebGLBatch.prototype.constructor=b.WebGLBatch,b.WebGLBatch.prototype.clean=function(){this.verticies=[],this.uvs=[],this.indices=[],this.colors=[],this.dynamicSize=1,this.texture=null,this.last=null,this.size=0,this.head=null,this.tail=null},b.WebGLBatch.prototype.restoreLostContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer()},b.WebGLBatch.prototype.init=function(a){a.batch=this,this.dirty=!0,this.blendMode=a.blendMode,this.texture=a.texture.baseTexture,this.head=a,this.tail=a,this.size=1,this.growBatch()},b.WebGLBatch.prototype.insertBefore=function(a,b){this.size++,a.batch=this,this.dirty=!0;var c=b.__prev;b.__prev=a,a.__next=b,c?(a.__prev=c,c.__next=a):this.head=a},b.WebGLBatch.prototype.insertAfter=function(a,b){this.size++,a.batch=this,this.dirty=!0;var c=b.__next;b.__next=a,a.__prev=b,c?(a.__next=c,c.__prev=a):this.tail=a},b.WebGLBatch.prototype.remove=function(a){return this.size--,0===this.size?(a.batch=null,a.__prev=null,a.__next=null,void 0):(a.__prev?a.__prev.__next=a.__next:(this.head=a.__next,this.head.__prev=null),a.__next?a.__next.__prev=a.__prev:(this.tail=a.__prev,this.tail.__next=null),a.batch=null,a.__next=null,a.__prev=null,this.dirty=!0,void 0)},b.WebGLBatch.prototype.split=function(a){this.dirty=!0;var c=new b.WebGLBatch(this.gl);c.init(a),c.texture=this.texture,c.tail=this.tail,this.tail=a.__prev,this.tail.__next=null,a.__prev=null;for(var d=0;a;)d++,a.batch=c,a=a.__next;return c.size=d,this.size-=d,c},b.WebGLBatch.prototype.merge=function(a){this.dirty=!0,this.tail.__next=a.head,a.head.__prev=this.tail,this.size+=a.size,this.tail=a.tail;for(var b=a.head;b;)b.batch=this,b=b.__next},b.WebGLBatch.prototype.growBatch=function(){var a=this.gl;this.dynamicSize=1===this.size?1:1.5*this.size,this.verticies=new Float32Array(8*this.dynamicSize),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.verticies,a.DYNAMIC_DRAW),this.uvs=new Float32Array(8*this.dynamicSize),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvs,a.DYNAMIC_DRAW),this.dirtyUVS=!0,this.colors=new Float32Array(4*this.dynamicSize),a.bindBuffer(a.ARRAY_BUFFER,this.colorBuffer),a.bufferData(a.ARRAY_BUFFER,this.colors,a.DYNAMIC_DRAW),this.dirtyColors=!0,this.indices=new Uint16Array(6*this.dynamicSize);for(var b=this.indices.length/6,c=0;b>c;c++){var d=6*c,e=4*c;this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3}a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW)},b.WebGLBatch.prototype.refresh=function(){this.dynamicSize<this.size&&this.growBatch();for(var a,b,c=0,d=this.head;d;){a=8*c;var e=d.texture,f=e.frame,g=e.baseTexture.width,h=e.baseTexture.height;this.uvs[a+0]=f.x/g,this.uvs[a+1]=f.y/h,this.uvs[a+2]=(f.x+f.width)/g,this.uvs[a+3]=f.y/h,this.uvs[a+4]=(f.x+f.width)/g,this.uvs[a+5]=(f.y+f.height)/h,this.uvs[a+6]=f.x/g,this.uvs[a+7]=(f.y+f.height)/h,d.updateFrame=!1,b=4*c,this.colors[b]=this.colors[b+1]=this.colors[b+2]=this.colors[b+3]=d.worldAlpha,d=d.__next,c++}this.dirtyUVS=!0,this.dirtyColors=!0},b.WebGLBatch.prototype.update=function(){for(var a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r=0,s=this.head,t=this.verticies,u=this.uvs,v=this.colors;s;){if(s.vcount===b.visibleCount){if(c=s.texture.frame.width,d=s.texture.frame.height,e=s.anchor.x,f=s.anchor.y,g=c*(1-e),h=c*-e,i=d*(1-f),j=d*-f,k=8*r,a=s.worldTransform,l=a[0],m=a[3],n=a[1],o=a[4],p=a[2],q=a[5],t[k+0]=l*h+n*j+p,t[k+1]=o*j+m*h+q,t[k+2]=l*g+n*j+p,t[k+3]=o*j+m*g+q,t[k+4]=l*g+n*i+p,t[k+5]=o*i+m*g+q,t[k+6]=l*h+n*i+p,t[k+7]=o*i+m*h+q,s.updateFrame||s.texture.updateFrame){this.dirtyUVS=!0;var w=s.texture,x=w.frame,y=w.baseTexture.width,z=w.baseTexture.height;u[k+0]=x.x/y,u[k+1]=x.y/z,u[k+2]=(x.x+x.width)/y,u[k+3]=x.y/z,u[k+4]=(x.x+x.width)/y,u[k+5]=(x.y+x.height)/z,u[k+6]=x.x/y,u[k+7]=(x.y+x.height)/z,s.updateFrame=!1}if(s.cacheAlpha!==s.worldAlpha){s.cacheAlpha=s.worldAlpha;var A=4*r;v[A]=v[A+1]=v[A+2]=v[A+3]=s.worldAlpha,this.dirtyColors=!0}}else k=8*r,t[k+0]=t[k+1]=t[k+2]=t[k+3]=t[k+4]=t[k+5]=t[k+6]=t[k+7]=0;r++,s=s.__next}},b.WebGLBatch.prototype.render=function(a,c){if(a=a||0,void 0===c&&(c=this.size),this.dirty&&(this.refresh(),this.dirty=!1),0!==this.size){this.update();var d=this.gl,e=b.defaultShader;d.bindBuffer(d.ARRAY_BUFFER,this.vertexBuffer),d.bufferSubData(d.ARRAY_BUFFER,0,this.verticies),d.vertexAttribPointer(e.aVertexPosition,2,d.FLOAT,!1,0,0),d.bindBuffer(d.ARRAY_BUFFER,this.uvBuffer),this.dirtyUVS&&(this.dirtyUVS=!1,d.bufferSubData(d.ARRAY_BUFFER,0,this.uvs)),d.vertexAttribPointer(e.aTextureCoord,2,d.FLOAT,!1,0,0),d.activeTexture(d.TEXTURE0),d.bindTexture(d.TEXTURE_2D,this.texture._glTexture),d.bindBuffer(d.ARRAY_BUFFER,this.colorBuffer),this.dirtyColors&&(this.dirtyColors=!1,d.bufferSubData(d.ARRAY_BUFFER,0,this.colors)),d.vertexAttribPointer(e.colorAttribute,1,d.FLOAT,!1,0,0),d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var f=c-a;d.drawElements(d.TRIANGLES,6*f,d.UNSIGNED_SHORT,6*2*a)}},b.WebGLFilterManager=function(a){this.transparent=a,this.filterStack=[],this.texturePool=[],this.offsetX=0,this.offsetY=0,this.initShaderBuffers()},b.WebGLFilterManager.prototype.begin=function(a,b){this.width=2*a.x,this.height=2*-a.y,this.buffer=b},b.WebGLFilterManager.prototype.pushFilter=function(a){var c=b.gl;this.filterStack.push(a);var d=a.filterPasses[0];this.offsetX+=a.target.filterArea.x,this.offsetY+=a.target.filterArea.y;var e=this.texturePool.pop();e?e.resize(this.width,this.height):e=new b.FilterTexture(this.width,this.height),c.bindTexture(c.TEXTURE_2D,e.texture),this.getBounds(a.target);var f=a.target.filterArea,g=d.padding;f.x-=g,f.y-=g,f.width+=2*g,f.height+=2*g,f.x<0&&(f.x=0),f.width>this.width&&(f.width=this.width),f.y<0&&(f.y=0),f.height>this.height&&(f.height=this.height),c.bindFramebuffer(c.FRAMEBUFFER,e.frameBuffer),c.viewport(0,0,f.width,f.height),b.projection.x=f.width/2,b.projection.y=-f.height/2,b.offset.x=-f.x,b.offset.y=-f.y,c.uniform2f(b.defaultShader.projectionVector,f.width/2,-f.height/2),c.uniform2f(b.defaultShader.offsetVector,-f.x,-f.y),c.colorMask(!0,!0,!0,!0),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),a._glFilterTexture=e},b.WebGLFilterManager.prototype.popFilter=function(){var a=b.gl,c=this.filterStack.pop(),d=c.target.filterArea,e=c._glFilterTexture;if(c.filterPasses.length>1){a.viewport(0,0,d.width,d.height),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=0,this.vertexArray[1]=d.height,this.vertexArray[2]=d.width,this.vertexArray[3]=d.height,this.vertexArray[4]=0,this.vertexArray[5]=0,this.vertexArray[6]=d.width,this.vertexArray[7]=0,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray);var f=e,g=this.texturePool.pop();g||(g=new b.FilterTexture(this.width,this.height)),a.bindFramebuffer(a.FRAMEBUFFER,g.frameBuffer),a.clear(a.COLOR_BUFFER_BIT),a.disable(a.BLEND);for(var h=0;h<c.filterPasses.length-1;h++){var i=c.filterPasses[h];a.bindFramebuffer(a.FRAMEBUFFER,g.frameBuffer),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,f.texture),this.applyFilterPass(i,d,d.width,d.height);var j=f;f=g,g=j}a.enable(a.BLEND),e=f,this.texturePool.push(g)}var k=c.filterPasses[c.filterPasses.length-1];this.offsetX-=d.x,this.offsetY-=d.y;var l=this.width,m=this.height,n=0,o=0,p=this.buffer;if(0===this.filterStack.length)a.colorMask(!0,!0,!0,this.transparent);else{var q=this.filterStack[this.filterStack.length-1];d=q.target.filterArea,l=d.width,m=d.height,n=d.x,o=d.y,p=q._glFilterTexture.frameBuffer}b.projection.x=l/2,b.projection.y=-m/2,b.offset.x=n,b.offset.y=o,d=c.target.filterArea;var r=d.x-n,s=d.y-o;a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=r,this.vertexArray[1]=s+d.height,this.vertexArray[2]=r+d.width,this.vertexArray[3]=s+d.height,this.vertexArray[4]=r,this.vertexArray[5]=s,this.vertexArray[6]=r+d.width,this.vertexArray[7]=s,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray),a.viewport(0,0,l,m),a.bindFramebuffer(a.FRAMEBUFFER,p),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,e.texture),this.applyFilterPass(k,d,l,m),a.useProgram(b.defaultShader.program),a.uniform2f(b.defaultShader.projectionVector,l/2,-m/2),a.uniform2f(b.defaultShader.offsetVector,-n,-o),this.texturePool.push(e),c._glFilterTexture=null},b.WebGLFilterManager.prototype.applyFilterPass=function(a,c,d,e){var f=b.gl,g=a.shader;g||(g=new b.PixiShader,g.fragmentSrc=a.fragmentSrc,g.uniforms=a.uniforms,g.init(),a.shader=g),f.useProgram(g.program),f.uniform2f(g.projectionVector,d/2,-e/2),f.uniform2f(g.offsetVector,0,0),a.uniforms.dimensions&&(a.uniforms.dimensions.value[0]=this.width,a.uniforms.dimensions.value[1]=this.height,a.uniforms.dimensions.value[2]=this.vertexArray[0],a.uniforms.dimensions.value[3]=this.vertexArray[5]),g.syncUniforms(),f.bindBuffer(f.ARRAY_BUFFER,this.vertexBuffer),f.vertexAttribPointer(g.aVertexPosition,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.uvBuffer),f.vertexAttribPointer(g.aTextureCoord,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,this.indexBuffer),f.drawElements(f.TRIANGLES,6,f.UNSIGNED_SHORT,0)},b.WebGLFilterManager.prototype.initShaderBuffers=function(){var a=b.gl;this.vertexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.vertexArray=new Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertexArray,a.STATIC_DRAW),this.uvArray=new Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvArray,a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),a.STATIC_DRAW)},b.WebGLFilterManager.prototype.getBounds=function(a){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=a.first,B=a.last._iNext,C=-1/0,D=-1/0,E=1/0,F=1/0;do{if(A.visible)if(A instanceof b.Sprite)d=A.texture.frame.width,e=A.texture.frame.height,f=A.anchor.x,g=A.anchor.y,h=d*(1-f),i=d*-f,j=e*(1-g),k=e*-g,l=!0;else if(A instanceof b.Graphics){A.updateFilterBounds();var G=A.bounds;d=G.width,e=G.height,h=G.x,i=G.x+G.width,j=G.y,k=G.y+G.height,l=!0}l&&(c=A.worldTransform,m=c[0],n=c[3],o=c[1],p=c[4],q=c[2],r=c[5],s=m*i+o*k+q,w=p*k+n*i+r,t=m*h+o*k+q,x=p*k+n*h+r,u=m*h+o*j+q,y=p*j+n*h+r,v=m*i+o*j+q,z=p*j+n*i+r,E=E>s?s:E,E=E>t?t:E,E=E>u?u:E,E=E>v?v:E,F=F>w?w:F,F=F>x?x:F,F=F>y?y:F,F=F>z?z:F,C=s>C?s:C,C=t>C?t:C,C=u>C?u:C,C=v>C?v:C,D=w>D?w:D,D=x>D?x:D,D=y>D?y:D,D=z>D?z:D),l=!1,A=A._iNext}while(A!==B);a.filterArea.x=E,a.filterArea.y=F,a.filterArea.width=C-E,a.filterArea.height=D-F},b.FilterTexture=function(a,c){var d=b.gl;this.frameBuffer=d.createFramebuffer(),this.texture=d.createTexture(),d.bindTexture(d.TEXTURE_2D,this.texture),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE),d.bindFramebuffer(d.FRAMEBUFFER,this.framebuffer),d.bindFramebuffer(d.FRAMEBUFFER,this.frameBuffer),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,this.texture,0),this.resize(a,c)},b.FilterTexture.prototype.resize=function(a,c){if(this.width!==a||this.height!==c){this.width=a,this.height=c;var d=b.gl;d.bindTexture(d.TEXTURE_2D,this.texture),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,a,c,0,d.RGBA,d.UNSIGNED_BYTE,null)}},b.WebGLGraphics=function(){},b.WebGLGraphics.renderGraphics=function(a,c){var d=b.gl;a._webGL||(a._webGL={points:[],indices:[],lastIndex:0,buffer:d.createBuffer(),indexBuffer:d.createBuffer()}),a.dirty&&(a.dirty=!1,a.clearDirty&&(a.clearDirty=!1,a._webGL.lastIndex=0,a._webGL.points=[],a._webGL.indices=[]),b.WebGLGraphics.updateGraphics(a)),b.activatePrimitiveShader();var e=b.mat3.clone(a.worldTransform);b.mat3.transpose(e),d.blendFunc(d.ONE,d.ONE_MINUS_SRC_ALPHA),d.uniformMatrix3fv(b.primitiveShader.translationMatrix,!1,e),d.uniform2f(b.primitiveShader.projectionVector,c.x,-c.y),d.uniform2f(b.primitiveShader.offsetVector,-b.offset.x,-b.offset.y),d.uniform1f(b.primitiveShader.alpha,a.worldAlpha),d.bindBuffer(d.ARRAY_BUFFER,a._webGL.buffer),d.vertexAttribPointer(b.primitiveShader.aVertexPosition,2,d.FLOAT,!1,24,0),d.vertexAttribPointer(b.primitiveShader.colorAttribute,4,d.FLOAT,!1,24,8),d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,a._webGL.indexBuffer),d.drawElements(d.TRIANGLE_STRIP,a._webGL.indices.length,d.UNSIGNED_SHORT,0),b.deactivatePrimitiveShader()},b.WebGLGraphics.updateGraphics=function(a){for(var c=a._webGL.lastIndex;c<a.graphicsData.length;c++){var d=a.graphicsData[c];d.type===b.Graphics.POLY?(d.fill&&d.points.length>3&&b.WebGLGraphics.buildPoly(d,a._webGL),d.lineWidth>0&&b.WebGLGraphics.buildLine(d,a._webGL)):d.type===b.Graphics.RECT?b.WebGLGraphics.buildRectangle(d,a._webGL):(d.type===b.Graphics.CIRC||d.type===b.Graphics.ELIP)&&b.WebGLGraphics.buildCircle(d,a._webGL)}a._webGL.lastIndex=a.graphicsData.length;var e=b.gl;a._webGL.glPoints=new Float32Array(a._webGL.points),e.bindBuffer(e.ARRAY_BUFFER,a._webGL.buffer),e.bufferData(e.ARRAY_BUFFER,a._webGL.glPoints,e.STATIC_DRAW),a._webGL.glIndicies=new Uint16Array(a._webGL.indices),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,a._webGL.indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,a._webGL.glIndicies,e.STATIC_DRAW)},b.WebGLGraphics.buildRectangle=function(a,c){var d=a.points,e=d[0],f=d[1],g=d[2],h=d[3];if(a.fill){var i=b.hex2rgb(a.fillColor),j=a.fillAlpha,k=i[0]*j,l=i[1]*j,m=i[2]*j,n=c.points,o=c.indices,p=n.length/6;n.push(e,f),n.push(k,l,m,j),n.push(e+g,f),n.push(k,l,m,j),n.push(e,f+h),n.push(k,l,m,j),n.push(e+g,f+h),n.push(k,l,m,j),o.push(p,p,p+1,p+2,p+3,p+3)}a.lineWidth&&(a.points=[e,f,e+g,f,e+g,f+h,e,f+h,e,f],b.WebGLGraphics.buildLine(a,c))},b.WebGLGraphics.buildCircle=function(a,c){var d=a.points,e=d[0],f=d[1],g=d[2],h=d[3],i=40,j=2*Math.PI/i,k=0;if(a.fill){var l=b.hex2rgb(a.fillColor),m=a.fillAlpha,n=l[0]*m,o=l[1]*m,p=l[2]*m,q=c.points,r=c.indices,s=q.length/6;for(r.push(s),k=0;i+1>k;k++)q.push(e,f,n,o,p,m),q.push(e+Math.sin(j*k)*g,f+Math.cos(j*k)*h,n,o,p,m),r.push(s++,s++);r.push(s-1)}if(a.lineWidth){for(a.points=[],k=0;i+1>k;k++)a.points.push(e+Math.sin(j*k)*g,f+Math.cos(j*k)*h);b.WebGLGraphics.buildLine(a,c)}},b.WebGLGraphics.buildLine=function(a,c){var d=0,e=a.points;if(0!==e.length){if(a.lineWidth%2)for(d=0;d<e.length;d++)e[d]+=.5;var f=new b.Point(e[0],e[1]),g=new b.Point(e[e.length-2],e[e.length-1]);if(f.x===g.x&&f.y===g.y){e.pop(),e.pop(),g=new b.Point(e[e.length-2],e[e.length-1]);var h=g.x+.5*(f.x-g.x),i=g.y+.5*(f.y-g.y);e.unshift(h,i),e.push(h,i)}var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=c.points,H=c.indices,I=e.length/2,J=e.length,K=G.length/6,L=a.lineWidth/2,M=b.hex2rgb(a.lineColor),N=a.lineAlpha,O=M[0]*N,P=M[1]*N,Q=M[2]*N;for(l=e[0],m=e[1],n=e[2],o=e[3],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,G.push(l-r,m-s,O,P,Q,N),G.push(l+r,m+s,O,P,Q,N),d=1;I-1>d;d++)l=e[2*(d-1)],m=e[2*(d-1)+1],n=e[2*d],o=e[2*d+1],p=e[2*(d+1)],q=e[2*(d+1)+1],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,t=-(o-q),u=n-p,F=Math.sqrt(t*t+u*u),t/=F,u/=F,t*=L,u*=L,x=-s+m-(-s+o),y=-r+n-(-r+l),z=(-r+l)*(-s+o)-(-r+n)*(-s+m),A=-u+q-(-u+o),B=-t+n-(-t+p),C=(-t+p)*(-u+o)-(-t+n)*(-u+q),D=x*B-A*y,Math.abs(D)<.1?(D+=10.1,G.push(n-r,o-s,O,P,Q,N),G.push(n+r,o+s,O,P,Q,N)):(j=(y*C-B*z)/D,k=(A*z-x*C)/D,E=(j-n)*(j-n)+(k-o)+(k-o),E>19600?(v=r-t,w=s-u,F=Math.sqrt(v*v+w*w),v/=F,w/=F,v*=L,w*=L,G.push(n-v,o-w),G.push(O,P,Q,N),G.push(n+v,o+w),G.push(O,P,Q,N),G.push(n-v,o-w),G.push(O,P,Q,N),J++):(G.push(j,k),G.push(O,P,Q,N),G.push(n-(j-n),o-(k-o)),G.push(O,P,Q,N)));for(l=e[2*(I-2)],m=e[2*(I-2)+1],n=e[2*(I-1)],o=e[2*(I-1)+1],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,G.push(n-r,o-s),G.push(O,P,Q,N),G.push(n+r,o+s),G.push(O,P,Q,N),H.push(K),d=0;J>d;d++)H.push(K++);H.push(K-1)}},b.WebGLGraphics.buildPoly=function(a,c){var d=a.points;if(!(d.length<6)){var e=c.points,f=c.indices,g=d.length/2,h=b.hex2rgb(a.fillColor),i=a.fillAlpha,j=h[0]*i,k=h[1]*i,l=h[2]*i,m=b.PolyK.Triangulate(d),n=e.length/6,o=0;for(o=0;o<m.length;o+=3)f.push(m[o]+n),f.push(m[o]+n),f.push(m[o+1]+n),f.push(m[o+2]+n),f.push(m[o+2]+n);for(o=0;g>o;o++)e.push(d[2*o],d[2*o+1],j,k,l,i)}},b._defaultFrame=new b.Rectangle(0,0,1,1),b.gl=null,b.WebGLRenderer=function(a,c,d,e,f){this.transparent=!!e,this.width=a||800,this.height=c||600,this.view=d||document.createElement("canvas"),this.view.width=this.width,this.view.height=this.height;var g=this;this.view.addEventListener("webglcontextlost",function(a){g.handleContextLost(a)},!1),this.view.addEventListener("webglcontextrestored",function(a){g.handleContextRestored(a)},!1),this.batchs=[];var h={alpha:this.transparent,antialias:!!f,premultipliedAlpha:!1,stencil:!0};try{b.gl=this.gl=this.view.getContext("experimental-webgl",h)}catch(i){try{b.gl=this.gl=this.view.getContext("webgl",h)}catch(j){throw new Error(" This browser does not support webGL. Try using the canvas renderer"+this)}}b.initDefaultShaders();var k=this.gl;k.useProgram(b.defaultShader.program),b.WebGLRenderer.gl=k,this.batch=new b.WebGLBatch(k),k.disable(k.DEPTH_TEST),k.disable(k.CULL_FACE),k.enable(k.BLEND),k.colorMask(!0,!0,!0,this.transparent),b.projection=new b.Point(400,300),b.offset=new b.Point(0,0),this.resize(this.width,this.height),this.contextLost=!1,this.stageRenderGroup=new b.WebGLRenderGroup(this.gl,this.transparent)},b.WebGLRenderer.prototype.constructor=b.WebGLRenderer,b.WebGLRenderer.getBatch=function(){return 0===b._batchs.length?new b.WebGLBatch(b.WebGLRenderer.gl):b._batchs.pop()},b.WebGLRenderer.returnBatch=function(a){a.clean(),b._batchs.push(a)},b.WebGLRenderer.prototype.render=function(a){if(!this.contextLost){this.__stage!==a&&(this.__stage=a,this.stageRenderGroup.setRenderable(a)),b.WebGLRenderer.updateTextures(),b.visibleCount++,a.updateTransform();var c=this.gl;if(c.colorMask(!0,!0,!0,this.transparent),c.viewport(0,0,this.width,this.height),c.bindFramebuffer(c.FRAMEBUFFER,null),c.clearColor(a.backgroundColorSplit[0],a.backgroundColorSplit[1],a.backgroundColorSplit[2],!this.transparent),c.clear(c.COLOR_BUFFER_BIT),this.stageRenderGroup.backgroundColor=a.backgroundColorSplit,b.projection.x=this.width/2,b.projection.y=-this.height/2,this.stageRenderGroup.render(b.projection),a.interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this))),b.Texture.frameUpdates.length>0){for(var d=0;d<b.Texture.frameUpdates.length;d++)b.Texture.frameUpdates[d].updateFrame=!1;b.Texture.frameUpdates=[]}}},b.WebGLRenderer.updateTextures=function(){var a=0;for(a=0;a<b.texturesToUpdate.length;a++)b.WebGLRenderer.updateTexture(b.texturesToUpdate[a]);for(a=0;a<b.texturesToDestroy.length;a++)b.WebGLRenderer.destroyTexture(b.texturesToDestroy[a]);b.texturesToUpdate=[],b.texturesToDestroy=[]},b.WebGLRenderer.updateTexture=function(a){var c=b.gl;a._glTexture||(a._glTexture=c.createTexture()),a.hasLoaded&&(c.bindTexture(c.TEXTURE_2D,a._glTexture),c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a.source),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,a.scaleMode===b.BaseTexture.SCALE_MODE.LINEAR?c.LINEAR:c.NEAREST),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.BaseTexture.SCALE_MODE.LINEAR?c.LINEAR:c.NEAREST),a._powerOf2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.REPEAT),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.REPEAT)):(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE)),c.bindTexture(c.TEXTURE_2D,null))},b.WebGLRenderer.destroyTexture=function(a){var c=b.gl;a._glTexture&&(a._glTexture=c.createTexture(),c.deleteTexture(c.TEXTURE_2D,a._glTexture))},b.WebGLRenderer.prototype.resize=function(a,c){this.width=a,this.height=c,this.view.width=a,this.view.height=c,this.gl.viewport(0,0,this.width,this.height),b.projection.x=this.width/2,b.projection.y=-this.height/2},b.WebGLRenderer.prototype.handleContextLost=function(a){a.preventDefault(),this.contextLost=!0},b.WebGLRenderer.prototype.handleContextRestored=function(){this.gl=this.view.getContext("experimental-webgl",{alpha:!0}),this.initShaders();for(var a in b.TextureCache){var c=b.TextureCache[a].baseTexture;c._glTexture=null,b.WebGLRenderer.updateTexture(c)}for(var d=0;d<this.batchs.length;d++)this.batchs[d].restoreLostContext(this.gl),this.batchs[d].dirty=!0;b._restoreBatchs(this.gl),this.contextLost=!1},b.WebGLRenderGroup=function(a,c){this.gl=a,this.root,this.backgroundColor,this.transparent=void 0==c?!0:c,this.batchs=[],this.toRemove=[],this.filterManager=new b.WebGLFilterManager(this.transparent)},b.WebGLRenderGroup.prototype.constructor=b.WebGLRenderGroup,b.WebGLRenderGroup.prototype.setRenderable=function(a){this.root&&this.removeDisplayObjectAndChildren(this.root),a.worldVisible=a.visible,this.root=a,this.addDisplayObjectAndChildren(a)},b.WebGLRenderGroup.prototype.render=function(a,c){b.WebGLRenderer.updateTextures();var d=this.gl;d.uniform2f(b.defaultShader.projectionVector,a.x,a.y),this.filterManager.begin(a,c),d.blendFunc(d.ONE,d.ONE_MINUS_SRC_ALPHA);for(var e,f=0;f<this.batchs.length;f++)e=this.batchs[f],e instanceof b.WebGLBatch?this.batchs[f].render():this.renderSpecial(e,a)},b.WebGLRenderGroup.prototype.renderSpecific=function(a,c,d){b.WebGLRenderer.updateTextures();var e=this.gl;e.uniform2f(b.defaultShader.projectionVector,c.x,c.y),this.filterManager.begin(c,d);for(var f,g,h,i,j=a.first;j._iNext&&(!j.renderable||!j.__renderGroup);)j=j._iNext;var k=j.batch;if(j instanceof b.Sprite){k=j.batch;var l=k.head;if(l==j)f=0;else for(f=1;l.__next!=j;)f++,l=l.__next}else k=j;for(var m=a.last;m._iPrev&&(!m.renderable||!m.__renderGroup);)m=m._iNext;if(m instanceof b.Sprite){endBatch=m.batch;var l=endBatch.head;if(l==m)h=0;else for(h=1;l.__next!=m;)h++,l=l.__next}else endBatch=m;if(k==endBatch)return k instanceof b.WebGLBatch?k.render(f,h+1):this.renderSpecial(k,c),void 0;g=this.batchs.indexOf(k),i=this.batchs.indexOf(endBatch),k instanceof b.WebGLBatch?k.render(f):this.renderSpecial(k,c);for(var n=g+1;i>n;n++)renderable=this.batchs[n],renderable instanceof b.WebGLBatch?this.batchs[n].render():this.renderSpecial(renderable,c);endBatch instanceof b.WebGLBatch?endBatch.render(0,h+1):this.renderSpecial(endBatch,c)},b.WebGLRenderGroup.prototype.renderSpecial=function(a,c){var d=a.vcount===b.visibleCount;a instanceof b.TilingSprite?d&&this.renderTilingSprite(a,c):a instanceof b.Strip?d&&this.renderStrip(a,c):a instanceof b.CustomRenderable?d&&a.renderWebGL(this,c):a instanceof b.Graphics?d&&a.renderable&&b.WebGLGraphics.renderGraphics(a,c):a instanceof b.FilterBlock&&this.handleFilterBlock(a,c)},flip=!1;var d=[],e=0;b.WebGLRenderGroup.prototype.handleFilterBlock=function(a,c){var f=b.gl;if(a.open)a.data instanceof Array?this.filterManager.pushFilter(a):(e++,d.push(a),f.enable(f.STENCIL_TEST),f.colorMask(!1,!1,!1,!1),f.stencilFunc(f.ALWAYS,1,1),f.stencilOp(f.KEEP,f.KEEP,f.INCR),b.WebGLGraphics.renderGraphics(a.data,c),f.colorMask(!0,!0,!0,!0),f.stencilFunc(f.NOTEQUAL,0,d.length),f.stencilOp(f.KEEP,f.KEEP,f.KEEP));else if(a.data instanceof Array)this.filterManager.popFilter();else{var g=d.pop(a);g&&(f.colorMask(!1,!1,!1,!1),f.stencilFunc(f.ALWAYS,1,1),f.stencilOp(f.KEEP,f.KEEP,f.DECR),b.WebGLGraphics.renderGraphics(g.data,c),f.colorMask(!0,!0,!0,!0),f.stencilFunc(f.NOTEQUAL,0,d.length),f.stencilOp(f.KEEP,f.KEEP,f.KEEP)),f.disable(f.STENCIL_TEST)}},b.WebGLRenderGroup.prototype.updateTexture=function(a){this.removeObject(a);for(var b=a.first;b!=this.root&&(b=b._iPrev,!b.renderable||!b.__renderGroup););for(var c=a.last;c._iNext&&(c=c._iNext,!c.renderable||!c.__renderGroup););this.insertObject(a,b,c)},b.WebGLRenderGroup.prototype.addFilterBlocks=function(a,b){a.__renderGroup=this,b.__renderGroup=this;for(var c=a;c!=this.root.first&&(c=c._iPrev,!c.renderable||!c.__renderGroup););this.insertAfter(a,c);for(var d=b;d!=this.root.first&&(d=d._iPrev,!d.renderable||!d.__renderGroup););this.insertAfter(b,d)},b.WebGLRenderGroup.prototype.removeFilterBlocks=function(a,b){this.removeObject(a),this.removeObject(b)},b.WebGLRenderGroup.prototype.addDisplayObjectAndChildren=function(a){a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a);for(var b=a.first;b!=this.root.first&&(b=b._iPrev,!b.renderable||!b.__renderGroup););for(var c=a.last;c._iNext&&(c=c._iNext,!c.renderable||!c.__renderGroup););var d=a.first,e=a.last._iNext;do d.__renderGroup=this,d.renderable&&(this.insertObject(d,b,c),b=d),d=d._iNext;while(d!=e)},b.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren=function(a){if(a.__renderGroup==this){a.last;do a.__renderGroup=null,a.renderable&&this.removeObject(a),a=a._iNext;while(a)}},b.WebGLRenderGroup.prototype.insertObject=function(a,c,d){var e=c,f=d;if(a instanceof b.Sprite){var g,h;if(e instanceof b.Sprite){if(g=e.batch,g&&g.texture==a.texture.baseTexture&&g.blendMode==a.blendMode)return g.insertAfter(a,e),void 0}else g=e;if(f)if(f instanceof b.Sprite){if(h=f.batch){if(h.texture==a.texture.baseTexture&&h.blendMode==a.blendMode)return h.insertBefore(a,f),void 0;if(h==g){var i=g.split(f),j=b.WebGLRenderer.getBatch(),k=this.batchs.indexOf(g);return j.init(a),this.batchs.splice(k+1,0,j,i),void 0}}}else h=f;var j=b.WebGLRenderer.getBatch();if(j.init(a),g){var k=this.batchs.indexOf(g);this.batchs.splice(k+1,0,j)}else this.batchs.push(j)}else a instanceof b.TilingSprite?this.initTilingSprite(a):a instanceof b.Strip&&this.initStrip(a),this.insertAfter(a,e)},b.WebGLRenderGroup.prototype.insertAfter=function(a,c){if(c instanceof b.Sprite){var d=c.batch;if(d)if(d.tail==c){var e=this.batchs.indexOf(d);this.batchs.splice(e+1,0,a)}else{var f=d.split(c.__next),e=this.batchs.indexOf(d);this.batchs.splice(e+1,0,a,f)}else this.batchs.push(a)}else{var e=this.batchs.indexOf(c);this.batchs.splice(e+1,0,a)}},b.WebGLRenderGroup.prototype.removeObject=function(a){var c;if(a instanceof b.Sprite){var d=a.batch;if(!d)return;d.remove(a),0==d.size&&(c=d)}else c=a;if(c){var e=this.batchs.indexOf(c);if(-1==e)return;if(0==e||e==this.batchs.length-1)return this.batchs.splice(e,1),c instanceof b.WebGLBatch&&b.WebGLRenderer.returnBatch(c),void 0;if(this.batchs[e-1]instanceof b.WebGLBatch&&this.batchs[e+1]instanceof b.WebGLBatch&&this.batchs[e-1].texture==this.batchs[e+1].texture&&this.batchs[e-1].blendMode==this.batchs[e+1].blendMode)return this.batchs[e-1].merge(this.batchs[e+1]),c instanceof b.WebGLBatch&&b.WebGLRenderer.returnBatch(c),b.WebGLRenderer.returnBatch(this.batchs[e+1]),this.batchs.splice(e,2),void 0;this.batchs.splice(e,1),c instanceof b.WebGLBatch&&b.WebGLRenderer.returnBatch(c)}},b.WebGLRenderGroup.prototype.initTilingSprite=function(a){var b=this.gl;a.verticies=new Float32Array([0,0,a.width,0,a.width,a.height,0,a.height]),a.uvs=new Float32Array([0,0,1,0,1,1,0,1]),a.colors=new Float32Array([1,1,1,1]),a.indices=new Uint16Array([0,1,3,2]),a._vertexBuffer=b.createBuffer(),a._indexBuffer=b.createBuffer(),a._uvBuffer=b.createBuffer(),a._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,a._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,a.verticies,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._uvBuffer),b.bufferData(b.ARRAY_BUFFER,a.uvs,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._colorBuffer),b.bufferData(b.ARRAY_BUFFER,a.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,a._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,a.indices,b.STATIC_DRAW),a.texture.baseTexture._glTexture?(b.bindTexture(b.TEXTURE_2D,a.texture.baseTexture._glTexture),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.REPEAT),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.REPEAT),a.texture.baseTexture._powerOf2=!0):a.texture.baseTexture._powerOf2=!0},b.WebGLRenderGroup.prototype.renderStrip=function(a,c){var d=this.gl;b.activateStripShader();var e=b.stripShader;e.program;var f=b.mat3.clone(a.worldTransform);b.mat3.transpose(f),d.uniformMatrix3fv(e.translationMatrix,!1,f),d.uniform2f(e.projectionVector,c.x,c.y),d.uniform2f(e.offsetVector,-b.offset.x,-b.offset.y),d.uniform1f(e.alpha,a.worldAlpha),a.dirty?(a.dirty=!1,d.bindBuffer(d.ARRAY_BUFFER,a._vertexBuffer),d.bufferData(d.ARRAY_BUFFER,a.verticies,d.STATIC_DRAW),d.vertexAttribPointer(e.aVertexPosition,2,d.FLOAT,!1,0,0),d.bindBuffer(d.ARRAY_BUFFER,a._uvBuffer),d.bufferData(d.ARRAY_BUFFER,a.uvs,d.STATIC_DRAW),d.vertexAttribPointer(e.aTextureCoord,2,d.FLOAT,!1,0,0),d.activeTexture(d.TEXTURE0),d.bindTexture(d.TEXTURE_2D,a.texture.baseTexture._glTexture),d.bindBuffer(d.ARRAY_BUFFER,a._colorBuffer),d.bufferData(d.ARRAY_BUFFER,a.colors,d.STATIC_DRAW),d.vertexAttribPointer(e.colorAttribute,1,d.FLOAT,!1,0,0),d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,a._indexBuffer),d.bufferData(d.ELEMENT_ARRAY_BUFFER,a.indices,d.STATIC_DRAW)):(d.bindBuffer(d.ARRAY_BUFFER,a._vertexBuffer),d.bufferSubData(d.ARRAY_BUFFER,0,a.verticies),d.vertexAttribPointer(e.aVertexPosition,2,d.FLOAT,!1,0,0),d.bindBuffer(d.ARRAY_BUFFER,a._uvBuffer),d.vertexAttribPointer(e.aTextureCoord,2,d.FLOAT,!1,0,0),d.activeTexture(d.TEXTURE0),d.bindTexture(d.TEXTURE_2D,a.texture.baseTexture._glTexture),d.bindBuffer(d.ARRAY_BUFFER,a._colorBuffer),d.vertexAttribPointer(e.colorAttribute,1,d.FLOAT,!1,0,0),d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,a._indexBuffer)),d.drawElements(d.TRIANGLE_STRIP,a.indices.length,d.UNSIGNED_SHORT,0),b.deactivateStripShader()
},b.WebGLRenderGroup.prototype.renderTilingSprite=function(a,c){var d=this.gl;b.shaderProgram;var e=a.tilePosition,f=a.tileScale,g=e.x/a.texture.baseTexture.width,h=e.y/a.texture.baseTexture.height,i=a.width/a.texture.baseTexture.width/f.x,j=a.height/a.texture.baseTexture.height/f.y;a.uvs[0]=0-g,a.uvs[1]=0-h,a.uvs[2]=1*i-g,a.uvs[3]=0-h,a.uvs[4]=1*i-g,a.uvs[5]=1*j-h,a.uvs[6]=0-g,a.uvs[7]=1*j-h,d.bindBuffer(d.ARRAY_BUFFER,a._uvBuffer),d.bufferSubData(d.ARRAY_BUFFER,0,a.uvs),this.renderStrip(a,c)},b.WebGLRenderGroup.prototype.initStrip=function(a){var b=this.gl;this.shaderProgram,a._vertexBuffer=b.createBuffer(),a._indexBuffer=b.createBuffer(),a._uvBuffer=b.createBuffer(),a._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,a._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,a.verticies,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._uvBuffer),b.bufferData(b.ARRAY_BUFFER,a.uvs,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._colorBuffer),b.bufferData(b.ARRAY_BUFFER,a.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,a._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,a.indices,b.STATIC_DRAW)},b.initDefaultShaders=function(){b.primitiveShader=new b.PrimitiveShader,b.primitiveShader.init(),b.stripShader=new b.StripShader,b.stripShader.init(),b.defaultShader=new b.PixiShader,b.defaultShader.init();var a=b.gl,c=b.defaultShader.program;a.useProgram(c),a.enableVertexAttribArray(b.defaultShader.aVertexPosition),a.enableVertexAttribArray(b.defaultShader.colorAttribute),a.enableVertexAttribArray(b.defaultShader.aTextureCoord)},b.activatePrimitiveShader=function(){var a=b.gl;a.useProgram(b.primitiveShader.program),a.disableVertexAttribArray(b.defaultShader.aVertexPosition),a.disableVertexAttribArray(b.defaultShader.colorAttribute),a.disableVertexAttribArray(b.defaultShader.aTextureCoord),a.enableVertexAttribArray(b.primitiveShader.aVertexPosition),a.enableVertexAttribArray(b.primitiveShader.colorAttribute)},b.deactivatePrimitiveShader=function(){var a=b.gl;a.useProgram(b.defaultShader.program),a.disableVertexAttribArray(b.primitiveShader.aVertexPosition),a.disableVertexAttribArray(b.primitiveShader.colorAttribute),a.enableVertexAttribArray(b.defaultShader.aVertexPosition),a.enableVertexAttribArray(b.defaultShader.colorAttribute),a.enableVertexAttribArray(b.defaultShader.aTextureCoord)},b.activateStripShader=function(){var a=b.gl;a.useProgram(b.stripShader.program)},b.deactivateStripShader=function(){var a=b.gl;a.useProgram(b.defaultShader.program)},b.CompileVertexShader=function(a,c){return b._CompileShader(a,c,a.VERTEX_SHADER)},b.CompileFragmentShader=function(a,c){return b._CompileShader(a,c,a.FRAGMENT_SHADER)},b._CompileShader=function(a,b,c){var d=b.join("\n"),e=a.createShader(c);return a.shaderSource(e,d),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)?e:(window.console.log(a.getShaderInfoLog(e)),null)},b.compileProgram=function(a,c){var d=b.gl,e=b.CompileFragmentShader(d,c),f=b.CompileVertexShader(d,a),g=d.createProgram();return d.attachShader(g,f),d.attachShader(g,e),d.linkProgram(g),d.getProgramParameter(g,d.LINK_STATUS)||window.console.log("Could not initialise shaders"),g},b.BitmapText=function(a,c){b.DisplayObjectContainer.call(this),this.setText(a),this.setStyle(c),this.updateText(),this.dirty=!1},b.BitmapText.prototype=Object.create(b.DisplayObjectContainer.prototype),b.BitmapText.prototype.constructor=b.BitmapText,b.BitmapText.prototype.setText=function(a){this.text=a||" ",this.dirty=!0},b.BitmapText.prototype.setStyle=function(a){a=a||{},a.align=a.align||"left",this.style=a;var c=a.font.split(" ");this.fontName=c[c.length-1],this.fontSize=c.length>=2?parseInt(c[c.length-2],10):b.BitmapText.fonts[this.fontName].size,this.dirty=!0},b.BitmapText.prototype.updateText=function(){for(var a=b.BitmapText.fonts[this.fontName],c=new b.Point,d=null,e=[],f=0,g=[],h=0,i=this.fontSize/a.size,j=0;j<this.text.length;j++){var k=this.text.charCodeAt(j);if(/(?:\r\n|\r|\n)/.test(this.text.charAt(j)))g.push(c.x),f=Math.max(f,c.x),h++,c.x=0,c.y+=a.lineHeight,d=null;else{var l=a.chars[k];l&&(d&&l[d]&&(c.x+=l.kerning[d]),e.push({texture:l.texture,line:h,charCode:k,position:new b.Point(c.x+l.xOffset,c.y+l.yOffset)}),c.x+=l.xAdvance,d=k)}}g.push(c.x),f=Math.max(f,c.x);var m=[];for(j=0;h>=j;j++){var n=0;"right"===this.style.align?n=f-g[j]:"center"===this.style.align&&(n=(f-g[j])/2),m.push(n)}for(j=0;j<e.length;j++){var o=new b.Sprite(e[j].texture);o.position.x=(e[j].position.x+m[e[j].line])*i,o.position.y=e[j].position.y*i,o.scale.x=o.scale.y=i,this.addChild(o)}this.width=f*i,this.height=(c.y+a.lineHeight)*i},b.BitmapText.prototype.updateTransform=function(){if(this.dirty){for(;this.children.length>0;)this.removeChild(this.getChildAt(0));this.updateText(),this.dirty=!1}b.DisplayObjectContainer.prototype.updateTransform.call(this)},b.BitmapText.fonts={},b.Text=function(a,c){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),b.Sprite.call(this,b.Texture.fromCanvas(this.canvas)),this.setText(a),this.setStyle(c),this.updateText(),this.dirty=!1},b.Text.prototype=Object.create(b.Sprite.prototype),b.Text.prototype.constructor=b.Text,b.Text.prototype.setStyle=function(a){a=a||{},a.font=a.font||"bold 20pt Arial",a.fill=a.fill||"black",a.align=a.align||"left",a.stroke=a.stroke||"black",a.strokeThickness=a.strokeThickness||0,a.wordWrap=a.wordWrap||!1,a.wordWrapWidth=a.wordWrapWidth||100,this.style=a,this.dirty=!0},b.Text.prototype.setText=function(a){this.text=a.toString()||" ",this.dirty=!0},b.Text.prototype.updateText=function(){this.context.font=this.style.font;var a=this.text;this.style.wordWrap&&(a=this.wordWrap(this.text));for(var c=a.split(/(?:\r\n|\r|\n)/),d=[],e=0,f=0;f<c.length;f++){var g=this.context.measureText(c[f]).width;d[f]=g,e=Math.max(e,g)}this.canvas.width=e+this.style.strokeThickness;var h=this.determineFontHeight("font: "+this.style.font+";")+this.style.strokeThickness;for(this.canvas.height=h*c.length,this.context.fillStyle=this.style.fill,this.context.font=this.style.font,this.context.strokeStyle=this.style.stroke,this.context.lineWidth=this.style.strokeThickness,this.context.textBaseline="top",f=0;f<c.length;f++){var i=new b.Point(this.style.strokeThickness/2,this.style.strokeThickness/2+f*h);"right"===this.style.align?i.x+=e-d[f]:"center"===this.style.align&&(i.x+=(e-d[f])/2),this.style.stroke&&this.style.strokeThickness&&this.context.strokeText(c[f],i.x,i.y),this.style.fill&&this.context.fillText(c[f],i.x,i.y)}this.updateTexture()},b.Text.prototype.updateTexture=function(){this.texture.baseTexture.width=this.canvas.width,this.texture.baseTexture.height=this.canvas.height,this.texture.frame.width=this.canvas.width,this.texture.frame.height=this.canvas.height,this._width=this.canvas.width,this._height=this.canvas.height,b.texturesToUpdate.push(this.texture.baseTexture)},b.Text.prototype.updateTransform=function(){this.dirty&&(this.updateText(),this.dirty=!1),b.Sprite.prototype.updateTransform.call(this)},b.Text.prototype.determineFontHeight=function(a){var c=b.Text.heightCache[a];if(!c){var d=document.getElementsByTagName("body")[0],e=document.createElement("div"),f=document.createTextNode("M");e.appendChild(f),e.setAttribute("style",a+";position:absolute;top:0;left:0"),d.appendChild(e),c=e.offsetHeight,b.Text.heightCache[a]=c,d.removeChild(e)}return c},b.Text.prototype.wordWrap=function(a){for(var b="",c=a.split("\n"),d=0;d<c.length;d++){for(var e=this.style.wordWrapWidth,f=c[d].split(" "),g=0;g<f.length;g++){var h=this.context.measureText(f[g]).width,i=h+this.context.measureText(" ").width;i>e?(g>0&&(b+="\n"),b+=f[g]+" ",e=this.style.wordWrapWidth-h):(e-=i,b+=f[g]+" ")}b+="\n"}return b},b.Text.prototype.destroy=function(a){a&&this.texture.destroy()},b.Text.heightCache={},b.BaseTextureCache={},b.texturesToUpdate=[],b.texturesToDestroy=[],b.BaseTexture=function(a,c){if(b.EventTarget.call(this),this.width=100,this.height=100,this.scaleMode=c||b.BaseTexture.SCALE_MODE.DEFAULT,this.hasLoaded=!1,this.source=a,a){if(this.source instanceof Image||this.source instanceof HTMLImageElement)if(this.source.complete)this.hasLoaded=!0,this.width=this.source.width,this.height=this.source.height,b.texturesToUpdate.push(this);else{var d=this;this.source.onload=function(){d.hasLoaded=!0,d.width=d.source.width,d.height=d.source.height,b.texturesToUpdate.push(d),d.dispatchEvent({type:"loaded",content:d})}}else this.hasLoaded=!0,this.width=this.source.width,this.height=this.source.height,b.texturesToUpdate.push(this);this.imageUrl=null,this._powerOf2=!1}},b.BaseTexture.prototype.constructor=b.BaseTexture,b.BaseTexture.prototype.destroy=function(){this.source instanceof Image&&(this.imageUrl in b.BaseTextureCache&&delete b.BaseTextureCache[this.imageUrl],this.imageUrl=null,this.source.src=null),this.source=null,b.texturesToDestroy.push(this)},b.BaseTexture.prototype.updateSourceImage=function(a){this.hasLoaded=!1,this.source.src=null,this.source.src=a},b.BaseTexture.fromImage=function(a,c,d){var e=b.BaseTextureCache[a];if(!e){var f=new Image;c&&(f.crossOrigin=""),f.src=a,e=new b.BaseTexture(f,d),e.imageUrl=a,b.BaseTextureCache[a]=e}return e},b.BaseTexture.SCALE_MODE={DEFAULT:0,LINEAR:0,NEAREST:1},b.TextureCache={},b.FrameCache={},b.Texture=function(a,c){if(b.EventTarget.call(this),c||(this.noFrame=!0,c=new b.Rectangle(0,0,1,1)),a instanceof b.Texture&&(a=a.baseTexture),this.baseTexture=a,this.frame=c,this.trim=new b.Point,this.scope=this,a.hasLoaded)this.noFrame&&(c=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(c);else{var d=this;a.addEventListener("loaded",function(){d.onBaseTextureLoaded()})}},b.Texture.prototype.constructor=b.Texture,b.Texture.prototype.onBaseTextureLoaded=function(){var a=this.baseTexture;a.removeEventListener("loaded",this.onLoaded),this.noFrame&&(this.frame=new b.Rectangle(0,0,a.width,a.height)),this.noFrame=!1,this.width=this.frame.width,this.height=this.frame.height,this.scope.dispatchEvent({type:"update",content:this})},b.Texture.prototype.destroy=function(a){a&&this.baseTexture.destroy()},b.Texture.prototype.setFrame=function(a){if(this.frame=a,this.width=a.width,this.height=a.height,a.x+a.width>this.baseTexture.width||a.y+a.height>this.baseTexture.height)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.updateFrame=!0,b.Texture.frameUpdates.push(this)},b.Texture.fromImage=function(a,c,d){var e=b.TextureCache[a];return e||(e=new b.Texture(b.BaseTexture.fromImage(a,c,d)),b.TextureCache[a]=e),e},b.Texture.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache '+this);return c},b.Texture.fromCanvas=function(a,c){var d=new b.BaseTexture(a,c);return new b.Texture(d)},b.Texture.addTextureToCache=function(a,c){b.TextureCache[c]=a},b.Texture.removeTextureFromCache=function(a){var c=b.TextureCache[a];return b.TextureCache[a]=null,c},b.Texture.frameUpdates=[],b.Texture.SCALE_MODE=b.BaseTexture.SCALE_MODE,b.RenderTexture=function(a,c){b.EventTarget.call(this),this.width=a||100,this.height=c||100,this.indetityMatrix=b.mat3.create(),this.frame=new b.Rectangle(0,0,this.width,this.height),b.gl?this.initWebGL():this.initCanvas()},b.RenderTexture.prototype=Object.create(b.Texture.prototype),b.RenderTexture.prototype.constructor=b.RenderTexture,b.RenderTexture.prototype.initWebGL=function(){var a=b.gl;this.glFramebuffer=a.createFramebuffer(),a.bindFramebuffer(a.FRAMEBUFFER,this.glFramebuffer),this.glFramebuffer.width=this.width,this.glFramebuffer.height=this.height,this.baseTexture=new b.BaseTexture,this.baseTexture.width=this.width,this.baseTexture.height=this.height,this.baseTexture._glTexture=a.createTexture(),a.bindTexture(a.TEXTURE_2D,this.baseTexture._glTexture),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,this.width,this.height,0,a.RGBA,a.UNSIGNED_BYTE,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),this.baseTexture.isRender=!0,a.bindFramebuffer(a.FRAMEBUFFER,this.glFramebuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.baseTexture._glTexture,0),this.projection=new b.Point(this.width/2,-this.height/2),this.render=this.renderWebGL},b.RenderTexture.prototype.resize=function(a,c){if(this.width=a,this.height=c,b.gl){this.projection.x=this.width/2,this.projection.y=-this.height/2;var d=b.gl;d.bindTexture(d.TEXTURE_2D,this.baseTexture._glTexture),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,this.width,this.height,0,d.RGBA,d.UNSIGNED_BYTE,null)}else this.frame.width=this.width,this.frame.height=this.height,this.renderer.resize(this.width,this.height)},b.RenderTexture.prototype.initCanvas=function(){this.renderer=new b.CanvasRenderer(this.width,this.height,null,0),this.baseTexture=new b.BaseTexture(this.renderer.view),this.frame=new b.Rectangle(0,0,this.width,this.height),this.render=this.renderCanvas},b.RenderTexture.prototype.renderWebGL=function(a,c,d){var e=b.gl;e.colorMask(!0,!0,!0,!0),e.viewport(0,0,this.width,this.height),e.bindFramebuffer(e.FRAMEBUFFER,this.glFramebuffer),d&&(e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT));var f=a.children,g=a.worldTransform;a.worldTransform=b.mat3.create(),a.worldTransform[4]=-1,a.worldTransform[5]=-2*this.projection.y,c&&(a.worldTransform[2]=c.x,a.worldTransform[5]-=c.y),b.visibleCount++,a.vcount=b.visibleCount;for(var h=0,i=f.length;i>h;h++)f[h].updateTransform();var j=a.__renderGroup;j?a===j.root?j.render(this.projection,this.glFramebuffer):j.renderSpecific(a,this.projection,this.glFramebuffer):(this.renderGroup||(this.renderGroup=new b.WebGLRenderGroup(e)),this.renderGroup.setRenderable(a),this.renderGroup.render(this.projection,this.glFramebuffer)),a.worldTransform=g},b.RenderTexture.prototype.renderCanvas=function(a,c,d){var e=a.children;a.worldTransform=b.mat3.create(),c&&(a.worldTransform[2]=c.x,a.worldTransform[5]=c.y);for(var f=0,g=e.length;g>f;f++)e[f].updateTransform();d&&this.renderer.context.clearRect(0,0,this.width,this.height),this.renderer.renderDisplayObject(a),this.renderer.context.setTransform(1,0,0,1,0,0)},b.EventTarget=function(){var a={};this.addEventListener=this.on=function(b,c){void 0===a[b]&&(a[b]=[]),-1===a[b].indexOf(c)&&a[b].push(c)},this.dispatchEvent=this.emit=function(b){if(a[b.type]&&a[b.type].length)for(var c=0,d=a[b.type].length;d>c;c++)a[b.type][c](b)},this.removeEventListener=this.off=function(b,c){var d=a[b].indexOf(c);-1!==d&&a[b].splice(d,1)},this.removeAllEventListeners=function(b){var c=a[b];c&&(c.length=0)}},b.PolyK={},b.PolyK.Triangulate=function(a){var c=!0,d=a.length>>1;if(3>d)return[];for(var e=[],f=[],g=0;d>g;g++)f.push(g);g=0;for(var h=d;h>3;){var i=f[(g+0)%h],j=f[(g+1)%h],k=f[(g+2)%h],l=a[2*i],m=a[2*i+1],n=a[2*j],o=a[2*j+1],p=a[2*k],q=a[2*k+1],r=!1;if(b.PolyK._convex(l,m,n,o,p,q,c)){r=!0;for(var s=0;h>s;s++){var t=f[s];if(t!==i&&t!==j&&t!==k&&b.PolyK._PointInTriangle(a[2*t],a[2*t+1],l,m,n,o,p,q)){r=!1;break}}}if(r)e.push(i,j,k),f.splice((g+1)%h,1),h--,g=0;else if(g++>3*h){if(!c)return window.console.log("PIXI Warning: shape too complex to fill"),[];for(e=[],f=[],g=0;d>g;g++)f.push(g);g=0,h=d,c=!1}}return e.push(f[0],f[1],f[2]),e},b.PolyK._PointInTriangle=function(a,b,c,d,e,f,g,h){var i=g-c,j=h-d,k=e-c,l=f-d,m=a-c,n=b-d,o=i*i+j*j,p=i*k+j*l,q=i*m+j*n,r=k*k+l*l,s=k*m+l*n,t=1/(o*r-p*p),u=(r*q-p*s)*t,v=(o*s-p*q)*t;return u>=0&&v>=0&&1>u+v},b.PolyK._convex=function(a,b,c,d,e,f,g){return(b-d)*(e-c)+(c-a)*(f-d)>=0===g},c.Camera=function(a,b,d,e,f,g){this.game=a,this.world=a.world,this.id=0,this.view=new c.Rectangle(d,e,f,g),this.screenView=new c.Rectangle(d,e,f,g),this.bounds=new c.Rectangle(d,e,f,g),this.deadzone=null,this.visible=!0,this.atLimit={x:!1,y:!1},this.target=null,this._edge=0,this.displayObject=null},c.Camera.FOLLOW_LOCKON=0,c.Camera.FOLLOW_PLATFORMER=1,c.Camera.FOLLOW_TOPDOWN=2,c.Camera.FOLLOW_TOPDOWN_TIGHT=3,c.Camera.prototype={follow:function(a,b){"undefined"==typeof b&&(b=c.Camera.FOLLOW_LOCKON),this.target=a;var d;switch(b){case c.Camera.FOLLOW_PLATFORMER:var e=this.width/8,f=this.height/3;this.deadzone=new c.Rectangle((this.width-e)/2,(this.height-f)/2-.25*f,e,f);break;case c.Camera.FOLLOW_TOPDOWN:d=Math.max(this.width,this.height)/4,this.deadzone=new c.Rectangle((this.width-d)/2,(this.height-d)/2,d,d);break;case c.Camera.FOLLOW_TOPDOWN_TIGHT:d=Math.max(this.width,this.height)/8,this.deadzone=new c.Rectangle((this.width-d)/2,(this.height-d)/2,d,d);break;case c.Camera.FOLLOW_LOCKON:this.deadzone=null;break;default:this.deadzone=null}},focusOn:function(a){this.setPosition(Math.round(a.x-this.view.halfWidth),Math.round(a.y-this.view.halfHeight))},focusOnXY:function(a,b){this.setPosition(Math.round(a-this.view.halfWidth),Math.round(b-this.view.halfHeight))},update:function(){this.target&&this.updateTarget(),this.bounds&&this.checkBounds(),this.displayObject.position.x=-this.view.x,this.displayObject.position.y=-this.view.y},updateTarget:function(){this.deadzone?(this._edge=this.target.x-this.deadzone.x,this.view.x>this._edge&&(this.view.x=this._edge),this._edge=this.target.x+this.target.width-this.deadzone.x-this.deadzone.width,this.view.x<this._edge&&(this.view.x=this._edge),this._edge=this.target.y-this.deadzone.y,this.view.y>this._edge&&(this.view.y=this._edge),this._edge=this.target.y+this.target.height-this.deadzone.y-this.deadzone.height,this.view.y<this._edge&&(this.view.y=this._edge)):this.focusOnXY(this.target.x,this.target.y)},setBoundsToWorld:function(){this.bounds.setTo(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height)},checkBounds:function(){this.atLimit.x=!1,this.atLimit.y=!1,this.view.x<this.bounds.x&&(this.atLimit.x=!0,this.view.x=this.bounds.x),this.view.right>this.bounds.right&&(this.atLimit.x=!0,this.view.x=this.bounds.right-this.width),this.view.y<this.bounds.top&&(this.atLimit.y=!0,this.view.y=this.bounds.top),this.view.bottom>this.bounds.bottom&&(this.atLimit.y=!0,this.view.y=this.bounds.bottom-this.height),this.view.floor()},setPosition:function(a,b){this.view.x=a,this.view.y=b,this.bounds&&this.checkBounds()},setSize:function(a,b){this.view.width=a,this.view.height=b}},c.Camera.prototype.constructor=c.Camera,Object.defineProperty(c.Camera.prototype,"x",{get:function(){return this.view.x},set:function(a){this.view.x=a,this.bounds&&this.checkBounds()}}),Object.defineProperty(c.Camera.prototype,"y",{get:function(){return this.view.y},set:function(a){this.view.y=a,this.bounds&&this.checkBounds()}}),Object.defineProperty(c.Camera.prototype,"width",{get:function(){return this.view.width},set:function(a){this.view.width=a}}),Object.defineProperty(c.Camera.prototype,"height",{get:function(){return this.view.height},set:function(a){this.view.height=a}}),c.State=function(){this.game=null,this.add=null,this.camera=null,this.cache=null,this.input=null,this.load=null,this.math=null,this.sound=null,this.stage=null,this.time=null,this.tweens=null,this.world=null,this.particles=null,this.physics=null},c.State.prototype={preload:function(){},loadUpdate:function(){},loadRender:function(){},create:function(){},update:function(){},render:function(){},paused:function(){},destroy:function(){}},c.State.prototype.constructor=c.State,c.StateManager=function(a,b){this.game=a,this.states={},this._pendingState=null,"undefined"!=typeof b&&null!==b&&(this._pendingState=b),this._created=!1,this.current="",this.onInitCallback=null,this.onPreloadCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onPreRenderCallback=null,this.onLoadUpdateCallback=null,this.onLoadRenderCallback=null,this.onPausedCallback=null,this.onShutDownCallback=null},c.StateManager.prototype={boot:function(){this.game.onPause.add(this.pause,this),this.game.onResume.add(this.resume,this),null!==this._pendingState&&("string"==typeof this._pendingState?this.start(this._pendingState,!1,!1):this.add("default",this._pendingState,!0))},add:function(a,b,d){"undefined"==typeof d&&(d=!1);var e;return b instanceof c.State?e=b:"object"==typeof b?(e=b,e.game=this.game):"function"==typeof b&&(e=new b(this.game)),this.states[a]=e,d&&(this.game.isBooted?this.start(a):this._pendingState=a),e},remove:function(a){this.current==a&&(this.callbackContext=null,this.onInitCallback=null,this.onShutDownCallback=null,this.onPreloadCallback=null,this.onLoadRenderCallback=null,this.onLoadUpdateCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onPausedCallback=null,this.onDestroyCallback=null),delete this.states[a]},start:function(a,b,c){return"undefined"==typeof b&&(b=!0),"undefined"==typeof c&&(c=!1),this.game.isBooted===!1?(this._pendingState=a,void 0):(this.checkState(a)!==!1&&(this.current&&this.onShutDownCallback.call(this.callbackContext,this.game),b&&(this.game.tweens.removeAll(),this.game.world.destroy(),c===!0&&this.game.cache.destroy()),this.setCurrentState(a),this.onPreloadCallback?(this.game.load.reset(),this.onPreloadCallback.call(this.callbackContext,this.game),0===this.game.load.totalQueuedFiles()?this.game.loadComplete():this.game.load.start()):this.game.loadComplete()),void 0)},dummy:function(){},checkState:function(a){if(this.states[a]){var b=!1;return this.states[a].preload&&(b=!0),b===!1&&this.states[a].loadRender&&(b=!0),b===!1&&this.states[a].loadUpdate&&(b=!0),b===!1&&this.states[a].create&&(b=!0),b===!1&&this.states[a].update&&(b=!0),b===!1&&this.states[a].preRender&&(b=!0),b===!1&&this.states[a].render&&(b=!0),b===!1&&this.states[a].paused&&(b=!0),b===!1?(console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions."),!1):!0}return console.warn("Phaser.StateManager - No state found with the key: "+a),!1},link:function(a){this.states[a].game=this.game,this.states[a].add=this.game.add,this.states[a].camera=this.game.camera,this.states[a].cache=this.game.cache,this.states[a].input=this.game.input,this.states[a].load=this.game.load,this.states[a].math=this.game.math,this.states[a].sound=this.game.sound,this.states[a].stage=this.game.stage,this.states[a].time=this.game.time,this.states[a].tweens=this.game.tweens,this.states[a].world=this.game.world,this.states[a].particles=this.game.particles,this.states[a].physics=this.game.physics,this.states[a].rnd=this.game.rnd},setCurrentState:function(a){this.callbackContext=this.states[a],this.link(a),this.onInitCallback=this.states[a].init||this.dummy,this.onPreloadCallback=this.states[a].preload||null,this.onLoadRenderCallback=this.states[a].loadRender||null,this.onLoadUpdateCallback=this.states[a].loadUpdate||null,this.onCreateCallback=this.states[a].create||null,this.onUpdateCallback=this.states[a].update||null,this.onPreRenderCallback=this.states[a].preRender||null,this.onRenderCallback=this.states[a].render||null,this.onPausedCallback=this.states[a].paused||null,this.onShutDownCallback=this.states[a].shutdown||this.dummy,this.current=a,this._created=!1,this.onInitCallback.call(this.callbackContext,this.game)},getCurrentState:function(){return this.states[this.current]},loadComplete:function(){this._created===!1&&this.onCreateCallback?(this._created=!0,this.onCreateCallback.call(this.callbackContext,this.game)):this._created=!0},pause:function(){this._created&&this.onPausedCallback&&this.onPausedCallback.call(this.callbackContext,this.game,!0)},resume:function(){this._created&&this.onre&&this.onPausedCallback.call(this.callbackContext,this.game,!1)},update:function(){this._created&&this.onUpdateCallback?this.onUpdateCallback.call(this.callbackContext,this.game):this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game)},preRender:function(){this.onPreRenderCallback&&this.onPreRenderCallback.call(this.callbackContext,this.game)},render:function(){this._created&&this.onRenderCallback?(this.game.renderType===c.CANVAS&&(this.game.context.save(),this.game.context.setTransform(1,0,0,1,0,0)),this.onRenderCallback.call(this.callbackContext,this.game),this.game.renderType===c.CANVAS&&this.game.context.restore()):this.onLoadRenderCallback&&this.onLoadRenderCallback.call(this.callbackContext,this.game)},destroy:function(){this.callbackContext=null,this.onInitCallback=null,this.onShutDownCallback=null,this.onPreloadCallback=null,this.onLoadRenderCallback=null,this.onLoadUpdateCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onPausedCallback=null,this.onDestroyCallback=null,this.game=null,this.states={},this._pendingState=null}},c.StateManager.prototype.constructor=c.StateManager,c.LinkedList=function(){this.next=null,this.prev=null,this.first=null,this.last=null,this.total=0},c.LinkedList.prototype={add:function(a){return 0===this.total&&null==this.first&&null==this.last?(this.first=a,this.last=a,this.next=a,a.prev=this,this.total++,a):(this.last.next=a,a.prev=this.last,this.last=a,this.total++,a)},remove:function(a){a==this.first?this.first=this.first.next:a==this.last&&(this.last=this.last.prev),a.prev&&(a.prev.next=a.next),a.next&&(a.next.prev=a.prev),a.next=a.prev=null,null==this.first&&(this.last=null),this.total--},callAll:function(a){if(this.first&&this.last){var b=this.first;do b&&b[a]&&b[a].call(b),b=b.next;while(b!=this.last.next)}}},c.LinkedList.prototype.constructor=c.LinkedList,c.Signal=function(){this._bindings=[],this._prevParams=null;var a=this;this.dispatch=function(){c.Signal.prototype.dispatch.apply(a,arguments)}},c.Signal.prototype={memorize:!1,_shouldPropagate:!0,active:!0,validateListener:function(a,b){if("function"!=typeof a)throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",b))},_registerListener:function(a,b,d,e){var f,g=this._indexOfListener(a,d);if(-1!==g){if(f=this._bindings[g],f.isOnce()!==b)throw new Error("You cannot add"+(b?"":"Once")+"() then add"+(b?"Once":"")+"() the same listener without removing the relationship first.")}else f=new c.SignalBinding(this,a,b,d,e),this._addBinding(f);return this.memorize&&this._prevParams&&f.execute(this._prevParams),f},_addBinding:function(a){var b=this._bindings.length;do--b;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},_indexOfListener:function(a,b){for(var c,d=this._bindings.length;d--;)if(c=this._bindings[d],c._listener===a&&c.context===b)return d;return-1},has:function(a,b){return-1!==this._indexOfListener(a,b)},add:function(a,b,c){return this.validateListener(a,"add"),this._registerListener(a,!1,b,c)},addOnce:function(a,b,c){return this.validateListener(a,"addOnce"),this._registerListener(a,!0,b,c)},remove:function(a,b){this.validateListener(a,"remove");var c=this._indexOfListener(a,b);return-1!==c&&(this._bindings[c]._destroy(),this._bindings.splice(c,1)),a},removeAll:function(){for(var a=this._bindings.length;a--;)this._bindings[a]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(){if(this.active){var a,b=Array.prototype.slice.call(arguments),c=this._bindings.length;if(this.memorize&&(this._prevParams=b),c){a=this._bindings.slice(),this._shouldPropagate=!0;do c--;while(a[c]&&this._shouldPropagate&&a[c].execute(b)!==!1)}}},forget:function(){this._prevParams=null},dispose:function(){this.removeAll(),delete this._bindings,delete this._prevParams},toString:function(){return"[Phaser.Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}},c.Signal.prototype.constructor=c.Signal,c.SignalBinding=function(a,b,c,d,e){this._listener=b,this._isOnce=c,this.context=d,this._signal=a,this._priority=e||0},c.SignalBinding.prototype={active:!0,params:null,execute:function(a){var b,c;return this.active&&this._listener&&(c=this.params?this.params.concat(a):a,b=this._listener.apply(this.context,c),this._isOnce&&this.detach()),b},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal,delete this._listener,delete this.context},toString:function(){return"[Phaser.SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},c.SignalBinding.prototype.constructor=c.SignalBinding,c.Filter=function(a,b,d){this.game=a,this.type=c.WEBGL_FILTER,this.passes=[this],this.dirty=!0,this.padding=0,this.uniforms={time:{type:"1f",value:0},resolution:{type:"2f",value:{x:256,y:256}},mouse:{type:"2f",value:{x:0,y:0}}},this.fragmentSrc=d||[]},c.Filter.prototype={init:function(){},setResolution:function(a,b){this.uniforms.resolution.value.x=a,this.uniforms.resolution.value.y=b},update:function(a){"undefined"!=typeof a&&(a.x>0&&(this.uniforms.mouse.x=a.x.toFixed(2)),a.y>0&&(this.uniforms.mouse.y=a.y.toFixed(2))),this.uniforms.time.value=this.game.time.totalElapsedSeconds()},destroy:function(){this.game=null}},c.Filter.prototype.constructor=c.Filter,Object.defineProperty(c.Filter.prototype,"width",{get:function(){return this.uniforms.resolution.value.x},set:function(a){this.uniforms.resolution.value.x=a}}),Object.defineProperty(c.Filter.prototype,"height",{get:function(){return this.uniforms.resolution.value.y},set:function(a){this.uniforms.resolution.value.y=a}}),c.Plugin=function(a,b){"undefined"==typeof b&&(b=null),this.game=a,this.parent=b,this.active=!1,this.visible=!1,this.hasPreUpdate=!1,this.hasUpdate=!1,this.hasPostUpdate=!1,this.hasRender=!1,this.hasPostRender=!1},c.Plugin.prototype={preUpdate:function(){},update:function(){},render:function(){},postRender:function(){},destroy:function(){this.game=null,this.parent=null,this.active=!1,this.visible=!1}},c.Plugin.prototype.constructor=c.Plugin,c.PluginManager=function(a,b){this.game=a,this._parent=b,this.plugins=[],this._pluginsLength=0},c.PluginManager.prototype={add:function(a){var b=!1;return"function"==typeof a?a=new a(this.game,this._parent):(a.game=this.game,a.parent=this._parent),"function"==typeof a.preUpdate&&(a.hasPreUpdate=!0,b=!0),"function"==typeof a.update&&(a.hasUpdate=!0,b=!0),"function"==typeof a.postUpdate&&(a.hasPostUpdate=!0,b=!0),"function"==typeof a.render&&(a.hasRender=!0,b=!0),"function"==typeof a.postRender&&(a.hasPostRender=!0,b=!0),b?((a.hasPreUpdate||a.hasUpdate||a.hasPostUpdate)&&(a.active=!0),(a.hasRender||a.hasPostRender)&&(a.visible=!0),this._pluginsLength=this.plugins.push(a),"function"==typeof a.init&&a.init(),a):null},remove:function(a){if(0!==this._pluginsLength)for(this._p=0;this._p<this._pluginsLength;this._p++)if(this.plugins[this._p]===a)return a.destroy(),this.plugins.splice(this._p,1),this._pluginsLength--,void 0},removeAll:function(){for(this._p=0;this._p<this._pluginsLength;this._p++)this.plugins[this._p].destroy();this.plugins.length=0,this._pluginsLength=0},preUpdate:function(){if(0!==this._pluginsLength)for(this._p=0;this._p<this._pluginsLength;this._p++)this.plugins[this._p].active&&this.plugins[this._p].hasPreUpdate&&this.plugins[this._p].preUpdate()},update:function(){if(0!==this._pluginsLength)for(this._p=0;this._p<this._pluginsLength;this._p++)this.plugins[this._p].active&&this.plugins[this._p].hasUpdate&&this.plugins[this._p].update()},postUpdate:function(){if(0!==this._pluginsLength)for(this._p=0;this._p<this._pluginsLength;this._p++)this.plugins[this._p].active&&this.plugins[this._p].hasPostUpdate&&this.plugins[this._p].postUpdate()},render:function(){if(0!==this._pluginsLength)for(this._p=0;this._p<this._pluginsLength;this._p++)this.plugins[this._p].visible&&this.plugins[this._p].hasRender&&this.plugins[this._p].render()},postRender:function(){if(0!==this._pluginsLength)for(this._p=0;this._p<this._pluginsLength;this._p++)this.plugins[this._p].visible&&this.plugins[this._p].hasPostRender&&this.plugins[this._p].postRender()
},destroy:function(){this.plugins.length=0,this._pluginsLength=0,this.game=null,this._parent=null}},c.PluginManager.prototype.constructor=c.PluginManager,c.Stage=function(a,d,e){this.game=a,this._backgroundColor="rgb(0,0,0)",this.offset=new c.Point,this.canvas=null,this._stage=new b.Stage(0,!1),this._stage.name="_stage_root",this._stage.interactive=!1,this.display=this._stage,this.scaleMode=c.StageScaleMode.NO_SCALE,this.fullScreenScaleMode=c.StageScaleMode.NO_SCALE,this.scale=new c.StageScaleMode(this.game,d,e),this.aspectRatio=d/e,this.disableVisibilityChange=!1,this._nextOffsetCheck=0,this.checkOffsetInterval=2500,a.config?this.parseConfig(a.config):(this.canvas=c.Canvas.create(d,e),this.canvas.style["-webkit-full-screen"]="width: 100%; height: 100%")},c.Stage.prototype={parseConfig:function(a){this.canvas=a.canvasID?c.Canvas.create(this.game.width,this.game.height,a.canvasID):c.Canvas.create(this.game.width,this.game.height),a.canvasStyle?this.canvas.stlye=a.canvasStyle:this.canvas.style["-webkit-full-screen"]="width: 100%; height: 100%",a.checkOffsetInterval&&(this.checkOffsetInterval=a.checkOffsetInterval),a.disableVisibilityChange&&(this.disableVisibilityChange=a.disableVisibilityChange),a.fullScreenScaleMode&&(this.fullScreenScaleMode=a.fullScreenScaleMode),a.scaleMode&&(this.scaleMode=a.scaleMode),a.backgroundColor&&(this.backgroundColor=a.backgroundColor)},boot:function(){c.Canvas.getOffset(this.canvas,this.offset),this.bounds=new c.Rectangle(this.offset.x,this.offset.y,this.game.width,this.game.height);var a=this;this._onChange=function(b){return a.visibilityChange(b)},c.Canvas.setUserSelect(this.canvas,"none"),c.Canvas.setTouchAction(this.canvas,"none"),this.backgroundColor="#000",document.addEventListener("visibilitychange",this._onChange,!1),document.addEventListener("webkitvisibilitychange",this._onChange,!1),document.addEventListener("pagehide",this._onChange,!1),document.addEventListener("pageshow",this._onChange,!1),window.onblur=this._onChange,window.onfocus=this._onChange},update:function(){this.checkOffsetInterval!==!1&&this.game.time.now>this._nextOffsetCheck&&(c.Canvas.getOffset(this.canvas,this.offset),this._nextOffsetCheck=this.game.time.now+this.checkOffsetInterval)},visibilityChange:function(a){this.disableVisibilityChange||(this.game.paused=this.game.paused!==!1||"pagehide"!=a.type&&"blur"!=a.type&&document.hidden!==!0&&document.webkitHidden!==!0?!1:!0)}},c.Stage.prototype.constructor=c.Stage,Object.defineProperty(c.Stage.prototype,"backgroundColor",{get:function(){return this._backgroundColor},set:function(a){this._backgroundColor=a,this.game.transparent===!1&&(this.game.renderType==c.CANVAS?this.game.canvas.style.backgroundColor=a:("string"==typeof a&&(a=c.Color.hexToRGB(a)),this._stage.setBackgroundColor(a)))}}),c.Group=function(a,d,e,f){this.game=a,"undefined"==typeof d&&(d=a.world),this.name=e||"group","undefined"==typeof f&&(f=!1),f?this._container=this.game.stage._stage:(this._container=new b.DisplayObjectContainer,this._container.name=this.name,d?d instanceof c.Group?d._container.addChild(this._container):(d.addChild(this._container),d.updateTransform()):(this.game.stage._stage.addChild(this._container),this.game.stage._stage.updateTransform())),this.type=c.GROUP,this.alive=!0,this.exists=!0,this.group=null,this._container.scale=new c.Point(1,1),this.scale=this._container.scale,this.pivot=this._container.pivot,this.cursor=null},c.Group.RETURN_NONE=0,c.Group.RETURN_TOTAL=1,c.Group.RETURN_CHILD=2,c.Group.SORT_ASCENDING=-1,c.Group.SORT_DESCENDING=1,c.Group.prototype={add:function(a){return a.group!==this&&(a.type&&a.type===c.GROUP?(a.group=this,this._container.addChild(a._container),a._container.updateTransform()):(a.group=this,this._container.addChild(a),a.updateTransform(),a.events&&a.events.onAddedToGroup.dispatch(a,this)),null===this.cursor&&(this.cursor=a)),a},addAt:function(a,b){return a.group!==this&&(a.type&&a.type===c.GROUP?(a.group=this,this._container.addChildAt(a._container,b),a._container.updateTransform()):(a.group=this,this._container.addChildAt(a,b),a.updateTransform(),a.events&&a.events.onAddedToGroup.dispatch(a,this)),null===this.cursor&&(this.cursor=a)),a},getAt:function(a){return this._container.getChildAt(a)},create:function(a,b,d,e,f){"undefined"==typeof f&&(f=!0);var g=new c.Sprite(this.game,a,b,d,e);return g.group=this,g.exists=f,g.visible=f,g.alive=f,this._container.addChild(g),g.updateTransform(),g.events&&g.events.onAddedToGroup.dispatch(g,this),null===this.cursor&&(this.cursor=g),g},createMultiple:function(a,b,d,e){"undefined"==typeof e&&(e=!1);for(var f=0;a>f;f++){var g=new c.Sprite(this.game,0,0,b,d);g.group=this,g.exists=e,g.visible=e,g.alive=e,this._container.addChild(g),g.updateTransform(),g.events&&g.events.onAddedToGroup.dispatch(g,this),null===this.cursor&&(this.cursor=g)}},next:function(){this.cursor&&(this.cursor=this.cursor==this._container.last?this._container._iNext:this.cursor._iNext)},previous:function(){this.cursor&&(this.cursor=this.cursor==this._container._iNext?this._container.last:this.cursor._iPrev)},childTest:function(a,b){var c=a+" next: ";c+=b._iNext?b._iNext.name:"-null-",c=c+" "+a+" prev: ",c+=b._iPrev?b._iPrev.name:"-null-",console.log(c)},swapIndex:function(a,b){var c=this.getAt(a),d=this.getAt(b);this.swap(c,d)},swap:function(a,b){if(a===b||!a.parent||!b.parent||a.group!==this||b.group!==this)return!1;var c=a._iPrev,d=a._iNext,e=b._iPrev,f=b._iNext,g=this._container.last._iNext,h=this.game.stage._stage;do h!==a&&h!==b&&(h.first===a?h.first=b:h.first===b&&(h.first=a),h.last===a?h.last=b:h.last===b&&(h.last=a)),h=h._iNext;while(h!=g);return a._iNext==b?(a._iNext=f,a._iPrev=b,b._iNext=a,b._iPrev=c,c&&(c._iNext=b),f&&(f._iPrev=a),a.__renderGroup&&a.__renderGroup.updateTexture(a),b.__renderGroup&&b.__renderGroup.updateTexture(b),!0):b._iNext==a?(a._iNext=b,a._iPrev=e,b._iNext=d,b._iPrev=a,e&&(e._iNext=a),d&&(d._iPrev=b),a.__renderGroup&&a.__renderGroup.updateTexture(a),b.__renderGroup&&b.__renderGroup.updateTexture(b),!0):(a._iNext=f,a._iPrev=e,b._iNext=d,b._iPrev=c,c&&(c._iNext=b),d&&(d._iPrev=b),e&&(e._iNext=a),f&&(f._iPrev=a),a.__renderGroup&&a.__renderGroup.updateTexture(a),b.__renderGroup&&b.__renderGroup.updateTexture(b),!0)},bringToTop:function(a){return a.group===this&&(this.remove(a),this.add(a)),a},getIndex:function(a){return this._container.children.indexOf(a)},replace:function(a,b){if(this._container.first._iNext){var c=this.getIndex(a);-1!=c&&(void 0!==b.parent&&(b.events.onRemovedFromGroup.dispatch(b,this),b.parent.removeChild(b)),this._container.removeChild(a),this._container.addChildAt(b,c),b.events.onAddedToGroup.dispatch(b,this),b.updateTransform(),this.cursor==a&&(this.cursor=this._container._iNext))}},setProperty:function(a,b,c,d){d=d||0;var e=b.length;1==e?0===d?a[b[0]]=c:1==d?a[b[0]]+=c:2==d?a[b[0]]-=c:3==d?a[b[0]]*=c:4==d&&(a[b[0]]/=c):2==e?0===d?a[b[0]][b[1]]=c:1==d?a[b[0]][b[1]]+=c:2==d?a[b[0]][b[1]]-=c:3==d?a[b[0]][b[1]]*=c:4==d&&(a[b[0]][b[1]]/=c):3==e?0===d?a[b[0]][b[1]][b[2]]=c:1==d?a[b[0]][b[1]][b[2]]+=c:2==d?a[b[0]][b[1]][b[2]]-=c:3==d?a[b[0]][b[1]][b[2]]*=c:4==d&&(a[b[0]][b[1]][b[2]]/=c):4==e&&(0===d?a[b[0]][b[1]][b[2]][b[3]]=c:1==d?a[b[0]][b[1]][b[2]][b[3]]+=c:2==d?a[b[0]][b[1]][b[2]][b[3]]-=c:3==d?a[b[0]][b[1]][b[2]][b[3]]*=c:4==d&&(a[b[0]][b[1]][b[2]][b[3]]/=c))},set:function(a,b,c,d,e,f){b=b.split("."),"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=!1),(d===!1||d&&a.alive)&&(e===!1||e&&a.visible)&&this.setProperty(a,b,c,f)},setAll:function(a,b,c,d,e){if(a=a.split("."),"undefined"==typeof c&&(c=!1),"undefined"==typeof d&&(d=!1),e=e||0,this._container.children.length>0&&this._container.first._iNext){var f=this._container.first._iNext;do(c===!1||c&&f.alive)&&(d===!1||d&&f.visible)&&this.setProperty(f,a,b,e),f=f._iNext;while(f!=this._container.last._iNext)}},addAll:function(a,b,c,d){this.setAll(a,b,c,d,1)},subAll:function(a,b,c,d){this.setAll(a,b,c,d,2)},multiplyAll:function(a,b,c,d){this.setAll(a,b,c,d,3)},divideAll:function(a,b,c,d){this.setAll(a,b,c,d,4)},callAllExists:function(a,b){var c=Array.prototype.splice.call(arguments,2);if(this._container.children.length>0&&this._container.first._iNext){var d=this._container.first._iNext;do d.exists==b&&d[a]&&d[a].apply(d,c),d=d._iNext;while(d!=this._container.last._iNext)}},callbackFromArray:function(a,b,c){if(1==c){if(a[b[0]])return a[b[0]]}else if(2==c){if(a[b[0]][b[1]])return a[b[0]][b[1]]}else if(3==c){if(a[b[0]][b[1]][b[2]])return a[b[0]][b[1]][b[2]]}else if(4==c){if(a[b[0]][b[1]][b[2]][b[3]])return a[b[0]][b[1]][b[2]][b[3]]}else if(a[b])return a[b];return!1},callAll:function(a,b){if("undefined"!=typeof a){a=a.split(".");var c=a.length;if("undefined"==typeof b)b=null;else if("string"==typeof b){b=b.split(".");var d=b.length}var e=Array.prototype.splice.call(arguments,2),f=null,g=null;if(this._container.children.length>0&&this._container.first._iNext){var h=this._container.first._iNext;do f=this.callbackFromArray(h,a,c),b&&f?(g=this.callbackFromArray(h,b,d),f&&f.apply(g,e)):f&&f.apply(h,e),h=h._iNext;while(h!=this._container.last._iNext)}}},forEach:function(a,b,c){"undefined"==typeof c&&(c=!1);var d=Array.prototype.splice.call(arguments,3);if(d.unshift(null),this._container.children.length>0&&this._container.first._iNext){var e=this._container.first._iNext;do(c===!1||c&&e.exists)&&(d[0]=e,a.apply(b,d)),e=e._iNext;while(e!=this._container.last._iNext)}},forEachExists:function(a,b){var d=Array.prototype.splice.call(arguments,2);d.unshift(null),this.iterate("exists",!0,c.Group.RETURN_TOTAL,a,b,d)},forEachAlive:function(a,b){var d=Array.prototype.splice.call(arguments,2);d.unshift(null),this.iterate("alive",!0,c.Group.RETURN_TOTAL,a,b,d)},forEachDead:function(a,b){var d=Array.prototype.splice.call(arguments,2);d.unshift(null),this.iterate("alive",!1,c.Group.RETURN_TOTAL,a,b,d)},sort:function(a,b){"undefined"==typeof a&&(a="y"),"undefined"==typeof b&&(b=c.Group.SORT_ASCENDING);var d,e;do{d=!1;for(var f=0,g=this._container.children.length-1;g>f;f++)b==c.Group.SORT_ASCENDING?this._container.children[f][a]>this._container.children[f+1][a]&&(this.swap(this.getAt(f),this.getAt(f+1)),e=this._container.children[f],this._container.children[f]=this._container.children[f+1],this._container.children[f+1]=e,d=!0):this._container.children[f][a]<this._container.children[f+1][a]&&(this.swap(this.getAt(f),this.getAt(f+1)),e=this._container.children[f],this._container.children[f]=this._container.children[f+1],this._container.children[f+1]=e,d=!0)}while(d)},iterate:function(a,b,d,e,f,g){if(d===c.Group.RETURN_TOTAL&&0===this._container.children.length)return 0;"undefined"==typeof e&&(e=!1);var h=0;if(this._container.children.length>0&&this._container.first._iNext){var i=this._container.first._iNext;do{if(i[a]===b&&(h++,e&&(g[0]=i,e.apply(f,g)),d===c.Group.RETURN_CHILD))return i;i=i._iNext}while(i!=this._container.last._iNext)}return d===c.Group.RETURN_TOTAL?h:d===c.Group.RETURN_CHILD?null:void 0},getFirstExists:function(a){return"boolean"!=typeof a&&(a=!0),this.iterate("exists",a,c.Group.RETURN_CHILD)},getFirstAlive:function(){return this.iterate("alive",!0,c.Group.RETURN_CHILD)},getFirstDead:function(){return this.iterate("alive",!1,c.Group.RETURN_CHILD)},countLiving:function(){return this.iterate("alive",!0,c.Group.RETURN_TOTAL)},countDead:function(){return this.iterate("alive",!1,c.Group.RETURN_TOTAL)},getRandom:function(a,b){return 0===this._container.children.length?null:(a=a||0,b=b||this._container.children.length,this.game.math.getRandom(this._container.children,a,b))},remove:function(a){return a.group!==this?!1:(a.events&&a.events.onRemovedFromGroup.dispatch(a,this),a.parent===this._container&&this._container.removeChild(a),this.cursor==a&&(this.cursor=this._container._iNext?this._container._iNext:null),a.group=null,!0)},removeAll:function(){if(0!==this._container.children.length){do this._container.children[0].events&&this._container.children[0].events.onRemovedFromGroup.dispatch(this._container.children[0],this),this._container.removeChild(this._container.children[0]);while(this._container.children.length>0);this.cursor=null}},removeBetween:function(a,b){if(0!==this._container.children.length){if(a>b||0>a||b>this._container.children.length)return!1;for(var c=a;b>c;c++){var d=this._container.children[c];d.events.onRemovedFromGroup.dispatch(d,this),this._container.removeChild(d),this.cursor==d&&(this.cursor=this._container._iNext?this._container._iNext:null)}}},destroy:function(a){if("undefined"==typeof a&&(a=!1),a){if(this._container.children.length>0)do this._container.children[0].group&&this._container.children[0].destroy();while(this._container.children.length>0)}else this.removeAll();this._container.parent.removeChild(this._container),this._container=null,this.game=null,this.exists=!1,this.cursor=null},validate:function(){var a=this.game.stage._stage.last._iNext,b=this.game.stage._stage,c=null,d=null,e=0;do{if(e>0){if(b!==c)return console.log("check next fail"),!1;if(b._iPrev!==d)return console.log("check previous fail"),!1}c=b._iNext,d=b,b=b._iNext,e++}while(b!=a);return!0}},c.Group.prototype.constructor=c.Group,Object.defineProperty(c.Group.prototype,"total",{get:function(){return this._container?this.iterate("exists",!0,c.Group.RETURN_TOTAL):0}}),Object.defineProperty(c.Group.prototype,"length",{get:function(){return this._container?this._container.children.length:0}}),Object.defineProperty(c.Group.prototype,"x",{get:function(){return this._container.position.x},set:function(a){this._container.position.x=a}}),Object.defineProperty(c.Group.prototype,"y",{get:function(){return this._container.position.y},set:function(a){this._container.position.y=a}}),Object.defineProperty(c.Group.prototype,"angle",{get:function(){return c.Math.radToDeg(this._container.rotation)},set:function(a){this._container.rotation=c.Math.degToRad(a)}}),Object.defineProperty(c.Group.prototype,"rotation",{get:function(){return this._container.rotation},set:function(a){this._container.rotation=a}}),Object.defineProperty(c.Group.prototype,"visible",{get:function(){return this._container.visible},set:function(a){this._container.visible=a}}),Object.defineProperty(c.Group.prototype,"alpha",{get:function(){return this._container.alpha},set:function(a){this._container.alpha=a}}),c.World=function(a){c.Group.call(this,a,null,"__world",!1),this.bounds=new c.Rectangle(0,0,a.width,a.height),this.camera=null,this.currentRenderOrderID=0},c.World.prototype=Object.create(c.Group.prototype),c.World.prototype.constructor=c.World,c.World.prototype.boot=function(){this.camera=new c.Camera(this.game,0,0,0,this.game.width,this.game.height),this.camera.displayObject=this._container,this.game.camera=this.camera},c.World.prototype.preUpdate=function(){if(this.game.stage._stage.first._iNext){var a=this.game.stage._stage.first._iNext;do a=a.preUpdate&&!a.preUpdate()?a.last._iNext:a._iNext;while(a!=this.game.stage._stage.last._iNext)}},c.World.prototype.update=function(){if(this.currentRenderOrderID=0,this.game.stage._stage.first._iNext){var a=this.game.stage._stage.first._iNext;do a=a.update&&!a.update()?a.last._iNext:a._iNext;while(a!=this.game.stage._stage.last._iNext)}},c.World.prototype.postUpdate=function(){if(this.camera.target&&this.camera.target.postUpdate){if(this.camera.target.postUpdate(),this.camera.update(),this.game.stage._stage.first._iNext){var a=this.game.stage._stage.first._iNext;do a.postUpdate&&a!==this.camera.target&&a.postUpdate(),a=a._iNext;while(a!=this.game.stage._stage.last._iNext)}}else if(this.camera.update(),this.game.stage._stage.first._iNext){var a=this.game.stage._stage.first._iNext;do a.postUpdate&&a.postUpdate(),a=a._iNext;while(a!=this.game.stage._stage.last._iNext)}},c.World.prototype.setBounds=function(a,b,c,d){c<this.game.width&&(c=this.game.width),d<this.game.height&&(d=this.game.height),this.bounds.setTo(a,b,c,d),this.camera.bounds&&this.camera.bounds.setTo(a,b,c,d),this.game.physics.setBoundsToWorld()},c.World.prototype.destroy=function(){this.camera.x=0,this.camera.y=0,this.game.input.reset(!0),this.removeAll()},Object.defineProperty(c.World.prototype,"width",{get:function(){return this.bounds.width},set:function(a){this.bounds.width=a}}),Object.defineProperty(c.World.prototype,"height",{get:function(){return this.bounds.height},set:function(a){this.bounds.height=a}}),Object.defineProperty(c.World.prototype,"centerX",{get:function(){return this.bounds.halfWidth}}),Object.defineProperty(c.World.prototype,"centerY",{get:function(){return this.bounds.halfHeight}}),Object.defineProperty(c.World.prototype,"randomX",{get:function(){return this.bounds.x<0?this.game.rnd.integerInRange(this.bounds.x,this.bounds.width-Math.abs(this.bounds.x)):this.game.rnd.integerInRange(this.bounds.x,this.bounds.width)}}),Object.defineProperty(c.World.prototype,"randomY",{get:function(){return this.bounds.y<0?this.game.rnd.integerInRange(this.bounds.y,this.bounds.height-Math.abs(this.bounds.y)):this.game.rnd.integerInRange(this.bounds.y,this.bounds.height)}}),Object.defineProperty(c.World.prototype,"visible",{get:function(){return this._container.visible},set:function(a){this._container.visible=a}}),c.Game=function(a,b,d,e,f,g,h){this.id=c.GAMES.push(this)-1,this.config=null,this.parent="",this.width=800,this.height=600,this.transparent=!1,this.antialias=!0,this.renderer=c.AUTO,this.renderType=c.AUTO,this.state=null,this._paused=!1,this._loadComplete=!1,this.isBooted=!1,this.isRunning=!1,this.raf=null,this.add=null,this.cache=null,this.input=null,this.load=null,this.math=null,this.net=null,this.sound=null,this.stage=null,this.time=null,this.tweens=null,this.world=null,this.physics=null,this.rnd=null,this.device=null,this.camera=null,this.canvas=null,this.context=null,this.debug=null,this.particles=null,this.stepping=!1,this.pendingStep=!1,this.stepCount=0,1===arguments.length&&"object"==typeof arguments[0]?this.parseConfig(arguments[0]):("undefined"!=typeof a&&(this.width=a),"undefined"!=typeof b&&(this.height=b),"undefined"!=typeof d&&(this.renderer=d,this.renderType=d),"undefined"!=typeof e&&(this.parent=e),"undefined"!=typeof g&&(this.transparent=g),"undefined"!=typeof h&&(this.antialias=h),this.state=new c.StateManager(this,f));var i=this;return this._onBoot=function(){return i.boot()},"complete"===document.readyState||"interactive"===document.readyState?window.setTimeout(this._onBoot,0):(document.addEventListener("DOMContentLoaded",this._onBoot,!1),window.addEventListener("load",this._onBoot,!1)),this},c.Game.prototype={parseConfig:function(a){this.config=a,a.width&&(this.width=this.parseDimension(a.width,0)),a.height&&(this.height=this.parseDimension(a.height,1)),a.renderer&&(this.renderer=a.renderer,this.renderType=a.renderer),a.parent&&(this.parent=a.parent),a.transparent&&(this.transparent=a.transparent),a.antialias&&(this.antialias=a.antialias);var b=null;a.state&&(b=a.state),this.state=new c.StateManager(this,b)},parseDimension:function(a,b){var c=0,d=0;return"string"==typeof a?"%"===a.substr(-1)?(c=parseInt(a,10)/100,d=0===b?window.innerWidth*c:window.innerHeight*c):d=parseInt(a,10):d=a,d},boot:function(){this.isBooted||(document.body?(document.removeEventListener("DOMContentLoaded",this._onBoot),window.removeEventListener("load",this._onBoot),this.onPause=new c.Signal,this.onResume=new c.Signal,this.isBooted=!0,this.device=new c.Device,this.math=c.Math,this.rnd=new c.RandomDataGenerator([(Date.now()*Math.random()).toString()]),this.stage=new c.Stage(this,this.width,this.height),this.setUpRenderer(),this.world=new c.World(this),this.add=new c.GameObjectFactory(this),this.cache=new c.Cache(this),this.load=new c.Loader(this),this.time=new c.Time(this),this.tweens=new c.TweenManager(this),this.input=new c.Input(this),this.sound=new c.SoundManager(this),this.physics=new c.Physics.Arcade(this),this.particles=new c.Particles(this),this.plugins=new c.PluginManager(this,this),this.net=new c.Net(this),this.debug=new c.Utils.Debug(this),this.time.boot(),this.stage.boot(),this.world.boot(),this.input.boot(),this.sound.boot(),this.state.boot(),this.load.onLoadComplete.add(this.loadComplete,this),this.showDebugHeader(),this.isRunning=!0,this._loadComplete=!1,this.raf=new c.RequestAnimationFrame(this),this.raf.start()):window.setTimeout(this._onBoot,20))},showDebugHeader:function(){var a=c.DEV_VERSION,b="Canvas",d="HTML Audio";if(this.renderType==c.WEBGL?b="WebGL":this.renderType==c.HEADLESS&&(b="Headless"),this.device.webAudio&&(d="WebAudio"),this.device.chrome){var e=["%c %c %c  Phaser v"+a+" - Renderer: "+b+" - Audio: "+d+"  %c %c ","background: #00bff3","background: #0072bc","color: #ffffff; background: #003471","background: #0072bc","background: #00bff3"];console.log.apply(console,e)}else console.log("Phaser v"+a+" - Renderer: "+b+" - Audio: "+d)},setUpRenderer:function(){if(this.renderType===c.HEADLESS||this.renderType===c.CANVAS||this.renderType===c.AUTO&&this.device.webGL===!1){if(!this.device.canvas)throw new Error("Phaser.Game - cannot create Canvas or WebGL context, aborting.");this.renderType===c.AUTO&&(this.renderType=c.CANVAS),this.renderer=new b.CanvasRenderer(this.width,this.height,this.stage.canvas,this.transparent),c.Canvas.setSmoothingEnabled(this.renderer.context,this.antialias),this.canvas=this.renderer.view,this.context=this.renderer.context}else this.renderType=c.WEBGL,this.renderer=new b.WebGLRenderer(this.width,this.height,this.stage.canvas,this.transparent,this.antialias),this.canvas=this.renderer.view,this.context=null;c.Canvas.addToDOM(this.renderer.view,this.parent,!0),c.Canvas.setTouchAction(this.renderer.view)},loadComplete:function(){this._loadComplete=!0,this.state.loadComplete()},update:function(a){this.time.update(a),this._paused?(this.renderer.render(this.stage._stage),this.plugins.render(),this.state.render()):(this.pendingStep||(this.stepping&&(this.pendingStep=!0),this.plugins.preUpdate(),this.world.preUpdate(),this.stage.update(),this.tweens.update(),this.sound.update(),this.input.update(),this.state.update(),this.world.update(),this.particles.update(),this.plugins.update(),this.world.postUpdate(),this.plugins.postUpdate()),this.renderType!==c.HEADLESS&&(this.renderer.render(this.stage._stage),this.plugins.render(),this.state.render(),this.plugins.postRender()))},enableStep:function(){this.stepping=!0,this.pendingStep=!1,this.stepCount=0},disableStep:function(){this.stepping=!1,this.pendingStep=!1},step:function(){this.pendingStep=!1,this.stepCount++},destroy:function(){this.raf.stop(),this.input.destroy(),this.state.destroy(),this.state=null,this.cache=null,this.input=null,this.load=null,this.sound=null,this.stage=null,this.time=null,this.world=null,this.isBooted=!1}},c.Game.prototype.constructor=c.Game,Object.defineProperty(c.Game.prototype,"paused",{get:function(){return this._paused},set:function(a){a===!0?this._paused===!1&&(this._paused=!0,this.onPause.dispatch(this)):this._paused&&(this._paused=!1,this.onResume.dispatch(this))}}),c.Input=function(a){this.game=a,this.hitCanvas=null,this.hitContext=null,this.moveCallback=null,this.moveCallbackContext=this},c.Input.MOUSE_OVERRIDES_TOUCH=0,c.Input.TOUCH_OVERRIDES_MOUSE=1,c.Input.MOUSE_TOUCH_COMBINE=2,c.Input.prototype={pollRate:0,_pollCounter:0,_oldPosition:null,_x:0,_y:0,disabled:!1,multiInputOverride:c.Input.MOUSE_TOUCH_COMBINE,position:null,speed:null,circle:null,scale:null,maxPointers:10,currentPointers:0,tapRate:200,doubleTapRate:300,holdRate:2e3,justPressedRate:200,justReleasedRate:200,recordPointerHistory:!1,recordRate:100,recordLimit:100,pointer1:null,pointer2:null,pointer3:null,pointer4:null,pointer5:null,pointer6:null,pointer7:null,pointer8:null,pointer9:null,pointer10:null,activePointer:null,mousePointer:null,mouse:null,keyboard:null,touch:null,mspointer:null,gamepad:null,onDown:null,onUp:null,onTap:null,onHold:null,interactiveItems:new c.LinkedList,boot:function(){this.mousePointer=new c.Pointer(this.game,0),this.pointer1=new c.Pointer(this.game,1),this.pointer2=new c.Pointer(this.game,2),this.mouse=new c.Mouse(this.game),this.keyboard=new c.Keyboard(this.game),this.touch=new c.Touch(this.game),this.mspointer=new c.MSPointer(this.game),this.gamepad=new c.Gamepad(this.game),this.onDown=new c.Signal,this.onUp=new c.Signal,this.onTap=new c.Signal,this.onHold=new c.Signal,this.scale=new c.Point(1,1),this.speed=new c.Point,this.position=new c.Point,this._oldPosition=new c.Point,this.circle=new c.Circle(0,0,44),this.activePointer=this.mousePointer,this.currentPointers=0,this.hitCanvas=document.createElement("canvas"),this.hitCanvas.width=1,this.hitCanvas.height=1,this.hitContext=this.hitCanvas.getContext("2d"),this.mouse.start(),this.keyboard.start(),this.touch.start(),this.mspointer.start(),this.mousePointer.active=!0},destroy:function(){this.mouse.stop(),this.keyboard.stop(),this.touch.stop(),this.mspointer.stop(),this.gamepad.stop(),this.moveCallback=null},setMoveCallback:function(a,b){this.moveCallback=a,this.moveCallbackContext=b},addPointer:function(){for(var a=0,b=10;b>0;b--)null===this["pointer"+b]&&(a=b);return 0===a?(console.warn("You can only have 10 Pointer objects"),null):(this["pointer"+a]=new c.Pointer(this.game,a),this["pointer"+a])},update:function(){return this.pollRate>0&&this._pollCounter<this.pollRate?(this._pollCounter++,void 0):(this.speed.x=this.position.x-this._oldPosition.x,this.speed.y=this.position.y-this._oldPosition.y,this._oldPosition.copyFrom(this.position),this.mousePointer.update(),this.gamepad.active&&this.gamepad.update(),this.pointer1.update(),this.pointer2.update(),this.pointer3&&this.pointer3.update(),this.pointer4&&this.pointer4.update(),this.pointer5&&this.pointer5.update(),this.pointer6&&this.pointer6.update(),this.pointer7&&this.pointer7.update(),this.pointer8&&this.pointer8.update(),this.pointer9&&this.pointer9.update(),this.pointer10&&this.pointer10.update(),this._pollCounter=0,void 0)},reset:function(a){if(this.game.isBooted!==!1){"undefined"==typeof a&&(a=!1),this.keyboard.reset(),this.mousePointer.reset(),this.gamepad.reset();for(var b=1;10>=b;b++)this["pointer"+b]&&this["pointer"+b].reset();this.currentPointers=0,"none"!==this.game.canvas.style.cursor&&(this.game.canvas.style.cursor="default"),a===!0&&(this.onDown.dispose(),this.onUp.dispose(),this.onTap.dispose(),this.onHold.dispose(),this.onDown=new c.Signal,this.onUp=new c.Signal,this.onTap=new c.Signal,this.onHold=new c.Signal,this.interactiveItems.callAll("reset")),this._pollCounter=0}},resetSpeed:function(a,b){this._oldPosition.setTo(a,b),this.speed.setTo(0,0)},startPointer:function(a){if(this.maxPointers<10&&this.totalActivePointers==this.maxPointers)return null;if(this.pointer1.active===!1)return this.pointer1.start(a);if(this.pointer2.active===!1)return this.pointer2.start(a);for(var b=3;10>=b;b++)if(this["pointer"+b]&&this["pointer"+b].active===!1)return this["pointer"+b].start(a);return null},updatePointer:function(a){if(this.pointer1.active&&this.pointer1.identifier==a.identifier)return this.pointer1.move(a);if(this.pointer2.active&&this.pointer2.identifier==a.identifier)return this.pointer2.move(a);for(var b=3;10>=b;b++)if(this["pointer"+b]&&this["pointer"+b].active&&this["pointer"+b].identifier==a.identifier)return this["pointer"+b].move(a);return null},stopPointer:function(a){if(this.pointer1.active&&this.pointer1.identifier==a.identifier)return this.pointer1.stop(a);if(this.pointer2.active&&this.pointer2.identifier==a.identifier)return this.pointer2.stop(a);for(var b=3;10>=b;b++)if(this["pointer"+b]&&this["pointer"+b].active&&this["pointer"+b].identifier==a.identifier)return this["pointer"+b].stop(a);return null},getPointer:function(a){if(a=a||!1,this.pointer1.active==a)return this.pointer1;if(this.pointer2.active==a)return this.pointer2;for(var b=3;10>=b;b++)if(this["pointer"+b]&&this["pointer"+b].active==a)return this["pointer"+b];return null},getPointerFromIdentifier:function(a){if(this.pointer1.identifier==a)return this.pointer1;if(this.pointer2.identifier==a)return this.pointer2;for(var b=3;10>=b;b++)if(this["pointer"+b]&&this["pointer"+b].identifier==a)return this["pointer"+b];return null}},c.Input.prototype.constructor=c.Input,Object.defineProperty(c.Input.prototype,"x",{get:function(){return this._x},set:function(a){this._x=Math.floor(a)}}),Object.defineProperty(c.Input.prototype,"y",{get:function(){return this._y},set:function(a){this._y=Math.floor(a)}}),Object.defineProperty(c.Input.prototype,"pollLocked",{get:function(){return this.pollRate>0&&this._pollCounter<this.pollRate}}),Object.defineProperty(c.Input.prototype,"totalInactivePointers",{get:function(){return 10-this.currentPointers}}),Object.defineProperty(c.Input.prototype,"totalActivePointers",{get:function(){this.currentPointers=0;for(var a=1;10>=a;a++)this["pointer"+a]&&this["pointer"+a].active&&this.currentPointers++;return this.currentPointers}}),Object.defineProperty(c.Input.prototype,"worldX",{get:function(){return this.game.camera.view.x+this.x}}),Object.defineProperty(c.Input.prototype,"worldY",{get:function(){return this.game.camera.view.y+this.y}}),c.Key=function(a,b){this.game=a,this.isDown=!1,this.isUp=!1,this.altKey=!1,this.ctrlKey=!1,this.shiftKey=!1,this.timeDown=0,this.duration=0,this.timeUp=0,this.repeats=0,this.keyCode=b,this.onDown=new c.Signal,this.onUp=new c.Signal},c.Key.prototype={processKeyDown:function(a){this.altKey=a.altKey,this.ctrlKey=a.ctrlKey,this.shiftKey=a.shiftKey,this.isDown?(this.duration=a.timeStamp-this.timeDown,this.repeats++):(this.isDown=!0,this.isUp=!1,this.timeDown=a.timeStamp,this.duration=0,this.repeats=0,this.onDown.dispatch(this))},processKeyUp:function(a){this.isDown=!1,this.isUp=!0,this.timeUp=a.timeStamp,this.onUp.dispatch(this)},justPressed:function(a){return"undefined"==typeof a&&(a=250),this.isDown&&this.duration<a},justReleased:function(a){return"undefined"==typeof a&&(a=250),this.isDown===!1&&this.game.time.now-this.timeUp<a}},c.Key.prototype.constructor=c.Key,c.Keyboard=function(a){this.game=a,this._keys={},this._hotkeys={},this._capture={},this.disabled=!1,this._onKeyDown=null,this._onKeyUp=null,this.callbackContext=this,this.onDownCallback=null,this.onUpCallback=null},c.Keyboard.prototype={addCallbacks:function(a,b,c){this.callbackContext=a,this.onDownCallback=b,"undefined"!=typeof c&&(this.onUpCallback=c)},addKey:function(a){return this._hotkeys[a]=new c.Key(this.game,a),this.addKeyCapture(a),this._hotkeys[a]},removeKey:function(a){delete this._hotkeys[a]},createCursorKeys:function(){return{up:this.addKey(c.Keyboard.UP),down:this.addKey(c.Keyboard.DOWN),left:this.addKey(c.Keyboard.LEFT),right:this.addKey(c.Keyboard.RIGHT)}},start:function(){var a=this;this._onKeyDown=function(b){return a.processKeyDown(b)},this._onKeyUp=function(b){return a.processKeyUp(b)},window.addEventListener("keydown",this._onKeyDown,!1),window.addEventListener("keyup",this._onKeyUp,!1)},stop:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)},addKeyCapture:function(a){if("object"==typeof a)for(var b in a)this._capture[a[b]]=!0;else this._capture[a]=!0},removeKeyCapture:function(a){delete this._capture[a]},clearCaptures:function(){this._capture={}},processKeyDown:function(a){this.game.input.disabled||this.disabled||(this._capture[a.keyCode]&&a.preventDefault(),this.onDownCallback&&this.onDownCallback.call(this.callbackContext,a),this._keys[a.keyCode]&&this._keys[a.keyCode].isDown?this._keys[a.keyCode].duration=this.game.time.now-this._keys[a.keyCode].timeDown:this._keys[a.keyCode]?(this._keys[a.keyCode].isDown=!0,this._keys[a.keyCode].timeDown=this.game.time.now,this._keys[a.keyCode].duration=0):this._keys[a.keyCode]={isDown:!0,timeDown:this.game.time.now,timeUp:0,duration:0},this._hotkeys[a.keyCode]&&this._hotkeys[a.keyCode].processKeyDown(a))},processKeyUp:function(a){this.game.input.disabled||this.disabled||(this._capture[a.keyCode]&&a.preventDefault(),this.onUpCallback&&this.onUpCallback.call(this.callbackContext,a),this._hotkeys[a.keyCode]&&this._hotkeys[a.keyCode].processKeyUp(a),this._keys[a.keyCode]?(this._keys[a.keyCode].isDown=!1,this._keys[a.keyCode].timeUp=this.game.time.now):this._keys[a.keyCode]={isDown:!1,timeDown:this.game.time.now,timeUp:this.game.time.now,duration:0})
},reset:function(){for(var a in this._keys)this._keys[a].isDown=!1},justPressed:function(a,b){return"undefined"==typeof b&&(b=250),this._keys[a]&&this._keys[a].isDown&&this._keys[a].duration<b?!0:!1},justReleased:function(a,b){return"undefined"==typeof b&&(b=250),this._keys[a]&&this._keys[a].isDown===!1&&this.game.time.now-this._keys[a].timeUp<b?!0:!1},isDown:function(a){return this._keys[a]?this._keys[a].isDown:!1}},c.Keyboard.prototype.constructor=c.Keyboard,c.Keyboard.A="A".charCodeAt(0),c.Keyboard.B="B".charCodeAt(0),c.Keyboard.C="C".charCodeAt(0),c.Keyboard.D="D".charCodeAt(0),c.Keyboard.E="E".charCodeAt(0),c.Keyboard.F="F".charCodeAt(0),c.Keyboard.G="G".charCodeAt(0),c.Keyboard.H="H".charCodeAt(0),c.Keyboard.I="I".charCodeAt(0),c.Keyboard.J="J".charCodeAt(0),c.Keyboard.K="K".charCodeAt(0),c.Keyboard.L="L".charCodeAt(0),c.Keyboard.M="M".charCodeAt(0),c.Keyboard.N="N".charCodeAt(0),c.Keyboard.O="O".charCodeAt(0),c.Keyboard.P="P".charCodeAt(0),c.Keyboard.Q="Q".charCodeAt(0),c.Keyboard.R="R".charCodeAt(0),c.Keyboard.S="S".charCodeAt(0),c.Keyboard.T="T".charCodeAt(0),c.Keyboard.U="U".charCodeAt(0),c.Keyboard.V="V".charCodeAt(0),c.Keyboard.W="W".charCodeAt(0),c.Keyboard.X="X".charCodeAt(0),c.Keyboard.Y="Y".charCodeAt(0),c.Keyboard.Z="Z".charCodeAt(0),c.Keyboard.ZERO="0".charCodeAt(0),c.Keyboard.ONE="1".charCodeAt(0),c.Keyboard.TWO="2".charCodeAt(0),c.Keyboard.THREE="3".charCodeAt(0),c.Keyboard.FOUR="4".charCodeAt(0),c.Keyboard.FIVE="5".charCodeAt(0),c.Keyboard.SIX="6".charCodeAt(0),c.Keyboard.SEVEN="7".charCodeAt(0),c.Keyboard.EIGHT="8".charCodeAt(0),c.Keyboard.NINE="9".charCodeAt(0),c.Keyboard.NUMPAD_0=96,c.Keyboard.NUMPAD_1=97,c.Keyboard.NUMPAD_2=98,c.Keyboard.NUMPAD_3=99,c.Keyboard.NUMPAD_4=100,c.Keyboard.NUMPAD_5=101,c.Keyboard.NUMPAD_6=102,c.Keyboard.NUMPAD_7=103,c.Keyboard.NUMPAD_8=104,c.Keyboard.NUMPAD_9=105,c.Keyboard.NUMPAD_MULTIPLY=106,c.Keyboard.NUMPAD_ADD=107,c.Keyboard.NUMPAD_ENTER=108,c.Keyboard.NUMPAD_SUBTRACT=109,c.Keyboard.NUMPAD_DECIMAL=110,c.Keyboard.NUMPAD_DIVIDE=111,c.Keyboard.F1=112,c.Keyboard.F2=113,c.Keyboard.F3=114,c.Keyboard.F4=115,c.Keyboard.F5=116,c.Keyboard.F6=117,c.Keyboard.F7=118,c.Keyboard.F8=119,c.Keyboard.F9=120,c.Keyboard.F10=121,c.Keyboard.F11=122,c.Keyboard.F12=123,c.Keyboard.F13=124,c.Keyboard.F14=125,c.Keyboard.F15=126,c.Keyboard.COLON=186,c.Keyboard.EQUALS=187,c.Keyboard.UNDERSCORE=189,c.Keyboard.QUESTION_MARK=191,c.Keyboard.TILDE=192,c.Keyboard.OPEN_BRACKET=219,c.Keyboard.BACKWARD_SLASH=220,c.Keyboard.CLOSED_BRACKET=221,c.Keyboard.QUOTES=222,c.Keyboard.BACKSPACE=8,c.Keyboard.TAB=9,c.Keyboard.CLEAR=12,c.Keyboard.ENTER=13,c.Keyboard.SHIFT=16,c.Keyboard.CONTROL=17,c.Keyboard.ALT=18,c.Keyboard.CAPS_LOCK=20,c.Keyboard.ESC=27,c.Keyboard.SPACEBAR=32,c.Keyboard.PAGE_UP=33,c.Keyboard.PAGE_DOWN=34,c.Keyboard.END=35,c.Keyboard.HOME=36,c.Keyboard.LEFT=37,c.Keyboard.UP=38,c.Keyboard.RIGHT=39,c.Keyboard.DOWN=40,c.Keyboard.INSERT=45,c.Keyboard.DELETE=46,c.Keyboard.HELP=47,c.Keyboard.NUM_LOCK=144,c.Mouse=function(a){this.game=a,this.callbackContext=this.game,this.mouseDownCallback=null,this.mouseMoveCallback=null,this.mouseUpCallback=null,this.capture=!1,this.button=-1,this.disabled=!1,this.locked=!1,this.pointerLock=new c.Signal,this.event=null,this._onMouseDown=null,this._onMouseMove=null,this._onMouseUp=null},c.Mouse.NO_BUTTON=-1,c.Mouse.LEFT_BUTTON=0,c.Mouse.MIDDLE_BUTTON=1,c.Mouse.RIGHT_BUTTON=2,c.Mouse.prototype={start:function(){var a=this;this.game.device.android&&this.game.device.chrome===!1||(this._onMouseDown=function(b){return a.onMouseDown(b)},this._onMouseMove=function(b){return a.onMouseMove(b)},this._onMouseUp=function(b){return a.onMouseUp(b)},document.addEventListener("mousedown",this._onMouseDown,!0),document.addEventListener("mousemove",this._onMouseMove,!0),document.addEventListener("mouseup",this._onMouseUp,!0))},onMouseDown:function(a){this.event=a,this.capture&&a.preventDefault(),this.button=a.which,this.mouseDownCallback&&this.mouseDownCallback.call(this.callbackContext,a),this.game.input.disabled||this.disabled||(a.identifier=0,this.game.input.mousePointer.start(a))},onMouseMove:function(a){this.event=a,this.capture&&a.preventDefault(),this.mouseMoveCallback&&this.mouseMoveCallback.call(this.callbackContext,a),this.game.input.disabled||this.disabled||(a.identifier=0,this.game.input.mousePointer.move(a))},onMouseUp:function(a){this.event=a,this.capture&&a.preventDefault(),this.button=c.Mouse.NO_BUTTON,this.mouseUpCallback&&this.mouseUpCallback.call(this.callbackContext,a),this.game.input.disabled||this.disabled||(a.identifier=0,this.game.input.mousePointer.stop(a))},requestPointerLock:function(){if(this.game.device.pointerLock){var a=this.game.stage.canvas;a.requestPointerLock=a.requestPointerLock||a.mozRequestPointerLock||a.webkitRequestPointerLock,a.requestPointerLock();var b=this;this._pointerLockChange=function(a){return b.pointerLockChange(a)},document.addEventListener("pointerlockchange",this._pointerLockChange,!0),document.addEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.addEventListener("webkitpointerlockchange",this._pointerLockChange,!0)}},pointerLockChange:function(a){var b=this.game.stage.canvas;document.pointerLockElement===b||document.mozPointerLockElement===b||document.webkitPointerLockElement===b?(this.locked=!0,this.pointerLock.dispatch(!0,a)):(this.locked=!1,this.pointerLock.dispatch(!1,a))},releasePointerLock:function(){document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock,document.exitPointerLock(),document.removeEventListener("pointerlockchange",this._pointerLockChange,!0),document.removeEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.removeEventListener("webkitpointerlockchange",this._pointerLockChange,!0)},stop:function(){document.removeEventListener("mousedown",this._onMouseDown,!0),document.removeEventListener("mousemove",this._onMouseMove,!0),document.removeEventListener("mouseup",this._onMouseUp,!0)}},c.Mouse.prototype.constructor=c.Mouse,c.MSPointer=function(a){this.game=a,this.callbackContext=this.game,this.disabled=!1,this._onMSPointerDown=null,this._onMSPointerMove=null,this._onMSPointerUp=null},c.MSPointer.prototype={start:function(){var a=this;this.game.device.mspointer===!0&&(this._onMSPointerDown=function(b){return a.onPointerDown(b)},this._onMSPointerMove=function(b){return a.onPointerMove(b)},this._onMSPointerUp=function(b){return a.onPointerUp(b)},this.game.renderer.view.addEventListener("MSPointerDown",this._onMSPointerDown,!1),this.game.renderer.view.addEventListener("MSPointerMove",this._onMSPointerMove,!1),this.game.renderer.view.addEventListener("MSPointerUp",this._onMSPointerUp,!1),this.game.renderer.view.addEventListener("pointerDown",this._onMSPointerDown,!1),this.game.renderer.view.addEventListener("pointerMove",this._onMSPointerMove,!1),this.game.renderer.view.addEventListener("pointerUp",this._onMSPointerUp,!1),this.game.renderer.view.style["-ms-content-zooming"]="none",this.game.renderer.view.style["-ms-touch-action"]="none")},onPointerDown:function(a){this.game.input.disabled||this.disabled||(a.preventDefault(),a.identifier=a.pointerId,this.game.input.startPointer(a))},onPointerMove:function(a){this.game.input.disabled||this.disabled||(a.preventDefault(),a.identifier=a.pointerId,this.game.input.updatePointer(a))},onPointerUp:function(a){this.game.input.disabled||this.disabled||(a.preventDefault(),a.identifier=a.pointerId,this.game.input.stopPointer(a))},stop:function(){this.game.stage.canvas.removeEventListener("MSPointerDown",this._onMSPointerDown),this.game.stage.canvas.removeEventListener("MSPointerMove",this._onMSPointerMove),this.game.stage.canvas.removeEventListener("MSPointerUp",this._onMSPointerUp),this.game.stage.canvas.removeEventListener("pointerDown",this._onMSPointerDown),this.game.stage.canvas.removeEventListener("pointerMove",this._onMSPointerMove),this.game.stage.canvas.removeEventListener("pointerUp",this._onMSPointerUp)}},c.MSPointer.prototype.constructor=c.MSPointer,c.Pointer=function(a,b){this.game=a,this.id=b,this._holdSent=!1,this._history=[],this._nextDrop=0,this._stateReset=!1,this.withinGame=!1,this.clientX=-1,this.clientY=-1,this.pageX=-1,this.pageY=-1,this.screenX=-1,this.screenY=-1,this.x=-1,this.y=-1,this.isMouse=!1,this.isDown=!1,this.isUp=!0,this.timeDown=0,this.timeUp=0,this.previousTapTime=0,this.totalTouches=0,this.msSinceLastClick=Number.MAX_VALUE,this.targetObject=null,this.active=!1,this.position=new c.Point,this.positionDown=new c.Point,this.circle=new c.Circle(0,0,44),0===b&&(this.isMouse=!0)},c.Pointer.prototype={start:function(a){return this.identifier=a.identifier,this.target=a.target,"undefined"!=typeof a.button&&(this.button=a.button),this.game.stage.disableVisibilityChange===!1&&this.game.paused&&this.game.stage.scale.incorrectOrientation===!1?(this.game.paused=!1,this):(this._history.length=0,this.active=!0,this.withinGame=!0,this.isDown=!0,this.isUp=!1,this.msSinceLastClick=this.game.time.now-this.timeDown,this.timeDown=this.game.time.now,this._holdSent=!1,this.move(a),this.positionDown.setTo(this.x,this.y),(this.game.input.multiInputOverride==c.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==c.Input.MOUSE_TOUCH_COMBINE||this.game.input.multiInputOverride==c.Input.TOUCH_OVERRIDES_MOUSE&&0===this.game.input.currentPointers)&&(this.game.input.x=this.x,this.game.input.y=this.y,this.game.input.position.setTo(this.x,this.y),this.game.input.onDown.dispatch(this,a),this.game.input.resetSpeed(this.x,this.y)),this._stateReset=!1,this.totalTouches++,this.isMouse===!1&&this.game.input.currentPointers++,null!==this.targetObject&&this.targetObject._touchedHandler(this),this)},update:function(){this.active&&(this._holdSent===!1&&this.duration>=this.game.input.holdRate&&((this.game.input.multiInputOverride==c.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==c.Input.MOUSE_TOUCH_COMBINE||this.game.input.multiInputOverride==c.Input.TOUCH_OVERRIDES_MOUSE&&0===this.game.input.currentPointers)&&this.game.input.onHold.dispatch(this),this._holdSent=!0),this.game.input.recordPointerHistory&&this.game.time.now>=this._nextDrop&&(this._nextDrop=this.game.time.now+this.game.input.recordRate,this._history.push({x:this.position.x,y:this.position.y}),this._history.length>this.game.input.recordLimit&&this._history.shift()))},move:function(a){if(!this.game.input.pollLocked){if("undefined"!=typeof a.button&&(this.button=a.button),this.clientX=a.clientX,this.clientY=a.clientY,this.pageX=a.pageX,this.pageY=a.pageY,this.screenX=a.screenX,this.screenY=a.screenY,this.x=(this.pageX-this.game.stage.offset.x)*this.game.input.scale.x,this.y=(this.pageY-this.game.stage.offset.y)*this.game.input.scale.y,this.position.setTo(this.x,this.y),this.circle.x=this.x,this.circle.y=this.y,(this.game.input.multiInputOverride==c.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==c.Input.MOUSE_TOUCH_COMBINE||this.game.input.multiInputOverride==c.Input.TOUCH_OVERRIDES_MOUSE&&0===this.game.input.currentPointers)&&(this.game.input.activePointer=this,this.game.input.x=this.x,this.game.input.y=this.y,this.game.input.position.setTo(this.game.input.x,this.game.input.y),this.game.input.circle.x=this.game.input.x,this.game.input.circle.y=this.game.input.y),this.game.paused)return this;if(this.game.input.moveCallback&&this.game.input.moveCallback.call(this.game.input.moveCallbackContext,this,this.x,this.y),null!==this.targetObject&&this.targetObject.isDragged===!0)return this.targetObject.update(this)===!1&&(this.targetObject=null),this;if(this._highestRenderOrderID=-1,this._highestRenderObject=null,this._highestInputPriorityID=-1,this.game.input.interactiveItems.total>0){var b=this.game.input.interactiveItems.next;do(b.pixelPerfect||b.priorityID>this._highestInputPriorityID||b.priorityID==this._highestInputPriorityID&&b.sprite.renderOrderID>this._highestRenderOrderID)&&b.checkPointerOver(this)&&(this._highestRenderOrderID=b.sprite.renderOrderID,this._highestInputPriorityID=b.priorityID,this._highestRenderObject=b),b=b.next;while(null!=b)}return null==this._highestRenderObject?this.targetObject&&(this.targetObject._pointerOutHandler(this),this.targetObject=null):null==this.targetObject?(this.targetObject=this._highestRenderObject,this._highestRenderObject._pointerOverHandler(this)):this.targetObject==this._highestRenderObject?this._highestRenderObject.update(this)===!1&&(this.targetObject=null):(this.targetObject._pointerOutHandler(this),this.targetObject=this._highestRenderObject,this.targetObject._pointerOverHandler(this)),this}},leave:function(a){this.withinGame=!1,this.move(a)},stop:function(a){if(this._stateReset)return a.preventDefault(),void 0;if(this.timeUp=this.game.time.now,(this.game.input.multiInputOverride==c.Input.MOUSE_OVERRIDES_TOUCH||this.game.input.multiInputOverride==c.Input.MOUSE_TOUCH_COMBINE||this.game.input.multiInputOverride==c.Input.TOUCH_OVERRIDES_MOUSE&&0===this.game.input.currentPointers)&&(this.game.input.onUp.dispatch(this,a),this.duration>=0&&this.duration<=this.game.input.tapRate&&(this.timeUp-this.previousTapTime<this.game.input.doubleTapRate?this.game.input.onTap.dispatch(this,!0):this.game.input.onTap.dispatch(this,!1),this.previousTapTime=this.timeUp)),this.id>0&&(this.active=!1),this.withinGame=!1,this.isDown=!1,this.isUp=!0,this.isMouse===!1&&this.game.input.currentPointers--,this.game.input.interactiveItems.total>0){var b=this.game.input.interactiveItems.next;do b&&b._releasedHandler(this),b=b.next;while(null!=b)}return this.targetObject&&this.targetObject._releasedHandler(this),this.targetObject=null,this},justPressed:function(a){return a=a||this.game.input.justPressedRate,this.isDown===!0&&this.timeDown+a>this.game.time.now},justReleased:function(a){return a=a||this.game.input.justReleasedRate,this.isUp===!0&&this.timeUp+a>this.game.time.now},reset:function(){this.isMouse===!1&&(this.active=!1),this.identifier=null,this.isDown=!1,this.isUp=!0,this.totalTouches=0,this._holdSent=!1,this._history.length=0,this._stateReset=!0,this.targetObject&&this.targetObject._releasedHandler(this),this.targetObject=null}},c.Pointer.prototype.constructor=c.Pointer,Object.defineProperty(c.Pointer.prototype,"duration",{get:function(){return this.isUp?-1:this.game.time.now-this.timeDown}}),Object.defineProperty(c.Pointer.prototype,"worldX",{get:function(){return this.game.world.camera.x+this.x}}),Object.defineProperty(c.Pointer.prototype,"worldY",{get:function(){return this.game.world.camera.y+this.y}}),c.Touch=function(a){this.game=a,this.disabled=!1,this.callbackContext=this.game,this.touchStartCallback=null,this.touchMoveCallback=null,this.touchEndCallback=null,this.touchEnterCallback=null,this.touchLeaveCallback=null,this.touchCancelCallback=null,this.preventDefault=!0,this.event=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null,this._onTouchEnter=null,this._onTouchLeave=null,this._onTouchCancel=null,this._onTouchMove=null},c.Touch.prototype={start:function(){var a=this;this.game.device.touch&&(this._onTouchStart=function(b){return a.onTouchStart(b)},this._onTouchMove=function(b){return a.onTouchMove(b)},this._onTouchEnd=function(b){return a.onTouchEnd(b)},this._onTouchEnter=function(b){return a.onTouchEnter(b)},this._onTouchLeave=function(b){return a.onTouchLeave(b)},this._onTouchCancel=function(b){return a.onTouchCancel(b)},this.game.renderer.view.addEventListener("touchstart",this._onTouchStart,!1),this.game.renderer.view.addEventListener("touchmove",this._onTouchMove,!1),this.game.renderer.view.addEventListener("touchend",this._onTouchEnd,!1),this.game.renderer.view.addEventListener("touchenter",this._onTouchEnter,!1),this.game.renderer.view.addEventListener("touchleave",this._onTouchLeave,!1),this.game.renderer.view.addEventListener("touchcancel",this._onTouchCancel,!1))},consumeDocumentTouches:function(){this._documentTouchMove=function(a){a.preventDefault()},document.addEventListener("touchmove",this._documentTouchMove,!1)},onTouchStart:function(a){if(this.event=a,this.touchStartCallback&&this.touchStartCallback.call(this.callbackContext,a),!this.game.input.disabled&&!this.disabled){this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.startPointer(a.changedTouches[b])}},onTouchCancel:function(a){if(this.event=a,this.touchCancelCallback&&this.touchCancelCallback.call(this.callbackContext,a),!this.game.input.disabled&&!this.disabled){this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.stopPointer(a.changedTouches[b])}},onTouchEnter:function(a){this.event=a,this.touchEnterCallback&&this.touchEnterCallback.call(this.callbackContext,a),this.game.input.disabled||this.disabled||this.preventDefault&&a.preventDefault()},onTouchLeave:function(a){this.event=a,this.touchLeaveCallback&&this.touchLeaveCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault()},onTouchMove:function(a){this.event=a,this.touchMoveCallback&&this.touchMoveCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.updatePointer(a.changedTouches[b])},onTouchEnd:function(a){this.event=a,this.touchEndCallback&&this.touchEndCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.stopPointer(a.changedTouches[b])},stop:function(){this.game.device.touch&&(this.game.stage.canvas.removeEventListener("touchstart",this._onTouchStart),this.game.stage.canvas.removeEventListener("touchmove",this._onTouchMove),this.game.stage.canvas.removeEventListener("touchend",this._onTouchEnd),this.game.stage.canvas.removeEventListener("touchenter",this._onTouchEnter),this.game.stage.canvas.removeEventListener("touchleave",this._onTouchLeave),this.game.stage.canvas.removeEventListener("touchcancel",this._onTouchCancel))}},c.Touch.prototype.constructor=c.Touch,c.InputHandler=function(a){this.sprite=a,this.game=a.game,this.enabled=!1,this.priorityID=0,this.useHandCursor=!1,this.isDragged=!1,this.allowHorizontalDrag=!0,this.allowVerticalDrag=!0,this.bringToTop=!1,this.snapOffset=null,this.snapOnDrag=!1,this.snapOnRelease=!1,this.snapX=0,this.snapY=0,this.snapOffsetX=0,this.snapOffsetY=0,this.pixelPerfect=!1,this.pixelPerfectAlpha=255,this.draggable=!1,this.boundsRect=null,this.boundsSprite=null,this.consumePointerEvent=!1,this._tempPoint=new c.Point,this._pointerData=[],this._pointerData.push({id:0,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1})},c.InputHandler.prototype={start:function(a,b){if(a=a||0,"undefined"==typeof b&&(b=!1),this.enabled===!1){this.game.input.interactiveItems.add(this),this.useHandCursor=b,this.priorityID=a;for(var d=0;10>d;d++)this._pointerData[d]={id:d,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1};this.snapOffset=new c.Point,this.enabled=!0,this.sprite.events&&null==this.sprite.events.onInputOver&&(this.sprite.events.onInputOver=new c.Signal,this.sprite.events.onInputOut=new c.Signal,this.sprite.events.onInputDown=new c.Signal,this.sprite.events.onInputUp=new c.Signal,this.sprite.events.onDragStart=new c.Signal,this.sprite.events.onDragStop=new c.Signal)}return this.sprite},reset:function(){this.enabled=!1;for(var a=0;10>a;a++)this._pointerData[a]={id:a,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1}},stop:function(){this.enabled!==!1&&(this.enabled=!1,this.game.input.interactiveItems.remove(this))},destroy:function(){this.enabled&&(this.enabled=!1,this.game.input.interactiveItems.remove(this),this.stop(),this.sprite=null)},pointerX:function(a){return a=a||0,this._pointerData[a].x},pointerY:function(a){return a=a||0,this._pointerData[a].y},pointerDown:function(a){return a=a||0,this._pointerData[a].isDown},pointerUp:function(a){return a=a||0,this._pointerData[a].isUp},pointerTimeDown:function(a){return a=a||0,this._pointerData[a].timeDown},pointerTimeUp:function(a){return a=a||0,this._pointerData[a].timeUp},pointerOver:function(a){if(this.enabled){if("undefined"!=typeof a)return this._pointerData[a].isOver;for(var b=0;10>b;b++)if(this._pointerData[b].isOver)return!0}return!1},pointerOut:function(a){if(this.enabled){if("undefined"!=typeof a)return this._pointerData[a].isOut;for(var b=0;10>b;b++)if(this._pointerData[b].isOut)return!0}return!1},pointerTimeOver:function(a){return a=a||0,this._pointerData[a].timeOver},pointerTimeOut:function(a){return a=a||0,this._pointerData[a].timeOut},pointerDragged:function(a){return a=a||0,this._pointerData[a].isDragged},checkPointerOver:function(a){return this.enabled===!1||this.sprite.visible===!1||this.sprite.group&&this.sprite.group.visible===!1?!1:(this.sprite.getLocalUnmodifiedPosition(this._tempPoint,a.x,a.y),this._tempPoint.x>=0&&this._tempPoint.x<=this.sprite.currentFrame.width&&this._tempPoint.y>=0&&this._tempPoint.y<=this.sprite.currentFrame.height?this.pixelPerfect?this.checkPixel(this._tempPoint.x,this._tempPoint.y):!0:void 0)},checkPixel:function(a,b){if(this.sprite.texture.baseTexture.source){this.game.input.hitContext.clearRect(0,0,1,1),a+=this.sprite.texture.frame.x,b+=this.sprite.texture.frame.y,this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source,a,b,1,1,0,0,1,1);var c=this.game.input.hitContext.getImageData(0,0,1,1);if(c.data[3]>=this.pixelPerfectAlpha)return!0}return!1},update:function(a){return this.enabled===!1||this.sprite.visible===!1||this.sprite.group&&this.sprite.group.visible===!1?(this._pointerOutHandler(a),!1):this.draggable&&this._draggedPointerID==a.id?this.updateDrag(a):this._pointerData[a.id].isOver===!0?this.checkPointerOver(a)?(this._pointerData[a.id].x=a.x-this.sprite.x,this._pointerData[a.id].y=a.y-this.sprite.y,!0):(this._pointerOutHandler(a),!1):void 0},_pointerOverHandler:function(a){this._pointerData[a.id].isOver===!1&&(this._pointerData[a.id].isOver=!0,this._pointerData[a.id].isOut=!1,this._pointerData[a.id].timeOver=this.game.time.now,this._pointerData[a.id].x=a.x-this.sprite.x,this._pointerData[a.id].y=a.y-this.sprite.y,this.useHandCursor&&this._pointerData[a.id].isDragged===!1&&(this.game.canvas.style.cursor="pointer"),this.sprite.events.onInputOver.dispatch(this.sprite,a))},_pointerOutHandler:function(a){this._pointerData[a.id].isOver=!1,this._pointerData[a.id].isOut=!0,this._pointerData[a.id].timeOut=this.game.time.now,this.useHandCursor&&this._pointerData[a.id].isDragged===!1&&(this.game.canvas.style.cursor="default"),this.sprite&&this.sprite.events&&this.sprite.events.onInputOut.dispatch(this.sprite,a)},_touchedHandler:function(a){return this._pointerData[a.id].isDown===!1&&this._pointerData[a.id].isOver===!0&&(this._pointerData[a.id].isDown=!0,this._pointerData[a.id].isUp=!1,this._pointerData[a.id].timeDown=this.game.time.now,this.sprite.events.onInputDown.dispatch(this.sprite,a),this.draggable&&this.isDragged===!1&&this.startDrag(a),this.bringToTop&&this.sprite.bringToTop()),this.consumePointerEvent},_releasedHandler:function(a){this._pointerData[a.id].isDown&&a.isUp&&(this._pointerData[a.id].isDown=!1,this._pointerData[a.id].isUp=!0,this._pointerData[a.id].timeUp=this.game.time.now,this._pointerData[a.id].downDuration=this._pointerData[a.id].timeUp-this._pointerData[a.id].timeDown,this.checkPointerOver(a)?this.sprite.events.onInputUp.dispatch(this.sprite,a,!0):(this.sprite.events.onInputUp.dispatch(this.sprite,a,!1),this.useHandCursor&&(this.game.canvas.style.cursor="default")),this.draggable&&this.isDragged&&this._draggedPointerID==a.id&&this.stopDrag(a))},updateDrag:function(a){return a.isUp?(this.stopDrag(a),!1):(this.sprite.fixedToCamera?(this.allowHorizontalDrag&&(this.sprite.cameraOffset.x=a.x+this._dragPoint.x+this.dragOffset.x),this.allowVerticalDrag&&(this.sprite.cameraOffset.y=a.y+this._dragPoint.y+this.dragOffset.y),this.boundsRect&&this.checkBoundsRect(),this.boundsSprite&&this.checkBoundsSprite(),this.snapOnDrag&&(this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY)):(this.allowHorizontalDrag&&(this.sprite.x=a.x+this._dragPoint.x+this.dragOffset.x),this.allowVerticalDrag&&(this.sprite.y=a.y+this._dragPoint.y+this.dragOffset.y),this.boundsRect&&this.checkBoundsRect(),this.boundsSprite&&this.checkBoundsSprite(),this.snapOnDrag&&(this.sprite.x=Math.round((this.sprite.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.y=Math.round((this.sprite.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY)),!0)},justOver:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isOver&&this.overDuration(a)<b},justOut:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isOut&&this.game.time.now-this._pointerData[a].timeOut<b},justPressed:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isDown&&this.downDuration(a)<b},justReleased:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isUp&&this.game.time.now-this._pointerData[a].timeUp<b},overDuration:function(a){return a=a||0,this._pointerData[a].isOver?this.game.time.now-this._pointerData[a].timeOver:-1},downDuration:function(a){return a=a||0,this._pointerData[a].isDown?this.game.time.now-this._pointerData[a].timeDown:-1},enableDrag:function(a,b,d,e,f,g){"undefined"==typeof a&&(a=!1),"undefined"==typeof b&&(b=!1),"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=255),"undefined"==typeof f&&(f=null),"undefined"==typeof g&&(g=null),this._dragPoint=new c.Point,this.draggable=!0,this.bringToTop=b,this.dragOffset=new c.Point,this.dragFromCenter=a,this.pixelPerfect=d,this.pixelPerfectAlpha=e,f&&(this.boundsRect=f),g&&(this.boundsSprite=g)},disableDrag:function(){if(this._pointerData)for(var a=0;10>a;a++)this._pointerData[a].isDragged=!1;this.draggable=!1,this.isDragged=!1,this._draggedPointerID=-1},startDrag:function(a){this.isDragged=!0,this._draggedPointerID=a.id,this._pointerData[a.id].isDragged=!0,this.sprite.fixedToCamera?this.dragFromCenter?(this.sprite.centerOn(a.x,a.y),this._dragPoint.setTo(this.sprite.cameraOffset.x-a.x,this.sprite.cameraOffset.y-a.y)):this._dragPoint.setTo(this.sprite.cameraOffset.x-a.x,this.sprite.cameraOffset.y-a.y):this.dragFromCenter?(this.sprite.centerOn(a.x,a.y),this._dragPoint.setTo(this.sprite.x-a.x,this.sprite.y-a.y)):this._dragPoint.setTo(this.sprite.x-a.x,this.sprite.y-a.y),this.updateDrag(a),this.bringToTop&&this.sprite.bringToTop(),this.sprite.events.onDragStart.dispatch(this.sprite,a)},stopDrag:function(a){this.isDragged=!1,this._draggedPointerID=-1,this._pointerData[a.id].isDragged=!1,this.snapOnRelease&&(this.sprite.fixedToCamera?(this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY):(this.sprite.x=Math.round((this.sprite.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.y=Math.round((this.sprite.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY)),this.sprite.events.onDragStop.dispatch(this.sprite,a),this.sprite.events.onInputUp.dispatch(this.sprite,a),this.checkPointerOver(a)===!1&&this._pointerOutHandler(a)},setDragLock:function(a,b){"undefined"==typeof a&&(a=!0),"undefined"==typeof b&&(b=!0),this.allowHorizontalDrag=a,this.allowVerticalDrag=b},enableSnap:function(a,b,c,d){"undefined"==typeof c&&(c=!0),"undefined"==typeof d&&(d=!1),"undefined"==typeof snapOffsetX&&(snapOffsetX=0),"undefined"==typeof snapOffsetY&&(snapOffsetY=0),this.snapX=a,this.snapY=b,this.snapOffsetX=snapOffsetX,this.snapOffsetY=snapOffsetY,this.snapOnDrag=c,this.snapOnRelease=d},disableSnap:function(){this.snapOnDrag=!1,this.snapOnRelease=!1},checkBoundsRect:function(){this.sprite.fixedToCamera?(this.sprite.cameraOffset.x<this.boundsRect.left?this.sprite.cameraOffset.x=this.boundsRect.cameraOffset.x:this.sprite.cameraOffset.x+this.sprite.width>this.boundsRect.right&&(this.sprite.cameraOffset.x=this.boundsRect.right-this.sprite.width),this.sprite.cameraOffset.y<this.boundsRect.top?this.sprite.cameraOffset.y=this.boundsRect.top:this.sprite.cameraOffset.y+this.sprite.height>this.boundsRect.bottom&&(this.sprite.cameraOffset.y=this.boundsRect.bottom-this.sprite.height)):(this.sprite.x<this.boundsRect.left?this.sprite.x=this.boundsRect.x:this.sprite.x+this.sprite.width>this.boundsRect.right&&(this.sprite.x=this.boundsRect.right-this.sprite.width),this.sprite.y<this.boundsRect.top?this.sprite.y=this.boundsRect.top:this.sprite.y+this.sprite.height>this.boundsRect.bottom&&(this.sprite.y=this.boundsRect.bottom-this.sprite.height))},checkBoundsSprite:function(){this.sprite.fixedToCamera&&this.boundsSprite.fixedToCamera?(this.sprite.cameraOffset.x<this.boundsSprite.camerOffset.x?this.sprite.cameraOffset.x=this.boundsSprite.camerOffset.x:this.sprite.cameraOffset.x+this.sprite.width>this.boundsSprite.camerOffset.x+this.boundsSprite.width&&(this.sprite.cameraOffset.x=this.boundsSprite.camerOffset.x+this.boundsSprite.width-this.sprite.width),this.sprite.cameraOffset.y<this.boundsSprite.camerOffset.y?this.sprite.cameraOffset.y=this.boundsSprite.camerOffset.y:this.sprite.cameraOffset.y+this.sprite.height>this.boundsSprite.camerOffset.y+this.boundsSprite.height&&(this.sprite.cameraOffset.y=this.boundsSprite.camerOffset.y+this.boundsSprite.height-this.sprite.height)):(this.sprite.x<this.boundsSprite.x?this.sprite.x=this.boundsSprite.x:this.sprite.x+this.sprite.width>this.boundsSprite.x+this.boundsSprite.width&&(this.sprite.x=this.boundsSprite.x+this.boundsSprite.width-this.sprite.width),this.sprite.y<this.boundsSprite.y?this.sprite.y=this.boundsSprite.y:this.sprite.y+this.sprite.height>this.boundsSprite.y+this.boundsSprite.height&&(this.sprite.y=this.boundsSprite.y+this.boundsSprite.height-this.sprite.height))}},c.InputHandler.prototype.constructor=c.InputHandler,c.Gamepad=function(a){this.game=a,this._gamepads=[new c.SinglePad(a,this),new c.SinglePad(a,this),new c.SinglePad(a,this),new c.SinglePad(a,this)],this._gamepadIndexMap={},this._rawPads=[],this._active=!1,this.disabled=!1,this._gamepadSupportAvailable=!!navigator.webkitGetGamepads||!!navigator.webkitGamepads||-1!=navigator.userAgent.indexOf("Firefox/"),this._prevRawGamepadTypes=[],this._prevTimestamps=[],this.callbackContext=this,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null,this._ongamepadconnected=null,this._gamepaddisconnected=null},c.Gamepad.prototype={addCallbacks:function(a,b){"undefined"!=typeof b&&(this.onConnectCallback="function"==typeof b.onConnect?b.onConnect:this.onConnectCallback,this.onDisconnectCallback="function"==typeof b.onDisconnect?b.onDisconnect:this.onDisconnectCallback,this.onDownCallback="function"==typeof b.onDown?b.onDown:this.onDownCallback,this.onUpCallback="function"==typeof b.onUp?b.onUp:this.onUpCallback,this.onAxisCallback="function"==typeof b.onAxis?b.onAxis:this.onAxisCallback,this.onFloatCallback="function"==typeof b.onFloat?b.onFloat:this.onFloatCallback)},start:function(){this._active=!0;var a=this;this._ongamepadconnected=function(b){var c=b.gamepad;a._rawPads.push(c),a._gamepads[c.index].connect(c)},window.addEventListener("gamepadconnected",this._ongamepadconnected,!1),this._ongamepaddisconnected=function(b){var c=b.gamepad;for(var d in a._rawPads)a._rawPads[d].index===c.index&&a._rawPads.splice(d,1);a._gamepads[c.index].disconnect()},window.addEventListener("gamepaddisconnected",this._ongamepaddisconnected,!1)
},update:function(){this._pollGamepads();for(var a=0;a<this._gamepads.length;a++)this._gamepads[a]._connected&&this._gamepads[a].pollStatus()},_pollGamepads:function(){var a=navigator.webkitGetGamepads&&navigator.webkitGetGamepads()||navigator.webkitGamepads;if(a){this._rawPads=[];for(var b=!1,c=0;c<a.length&&(typeof a[c]!==this._prevRawGamepadTypes[c]&&(b=!0,this._prevRawGamepadTypes[c]=typeof a[c]),a[c]&&this._rawPads.push(a[c]),3!==c);c++);if(b){for(var d,e={rawIndices:{},padIndices:{}},f=0;f<this._gamepads.length;f++)if(d=this._gamepads[f],d.connected)for(var g=0;g<this._rawPads.length;g++)this._rawPads[g].index===d.index&&(e.rawIndices[d.index]=!0,e.padIndices[f]=!0);for(var h=0;h<this._gamepads.length;h++)if(d=this._gamepads[h],!e.padIndices[h]){this._rawPads.length<1&&d.disconnect();for(var i=0;i<this._rawPads.length&&!e.padIndices[h];i++){var j=this._rawPads[i];if(j){if(e.rawIndices[j.index]){d.disconnect();continue}d.connect(j),e.rawIndices[j.index]=!0,e.padIndices[h]=!0}else d.disconnect()}}}}},setDeadZones:function(a){for(var b=0;b<this._gamepads.length;b++)this._gamepads[b].deadZone=a},stop:function(){this._active=!1,window.removeEventListener("gamepadconnected",this._ongamepadconnected),window.removeEventListener("gamepaddisconnected",this._ongamepaddisconnected)},reset:function(){this.update();for(var a=0;a<this._gamepads.length;a++)this._gamepads[a].reset()},justPressed:function(a,b){for(var c=0;c<this._gamepads.length;c++)if(this._gamepads[c].justPressed(a,b)===!0)return!0;return!1},justReleased:function(a,b){for(var c=0;c<this._gamepads.length;c++)if(this._gamepads[c].justReleased(a,b)===!0)return!0;return!1},isDown:function(a){for(var b=0;b<this._gamepads.length;b++)if(this._gamepads[b].isDown(a)===!0)return!0;return!1}},c.Gamepad.prototype.constructor=c.Gamepad,Object.defineProperty(c.Gamepad.prototype,"active",{get:function(){return this._active}}),Object.defineProperty(c.Gamepad.prototype,"supported",{get:function(){return this._gamepadSupportAvailable}}),Object.defineProperty(c.Gamepad.prototype,"padsConnected",{get:function(){return this._rawPads.length}}),Object.defineProperty(c.Gamepad.prototype,"pad1",{get:function(){return this._gamepads[0]}}),Object.defineProperty(c.Gamepad.prototype,"pad2",{get:function(){return this._gamepads[1]}}),Object.defineProperty(c.Gamepad.prototype,"pad3",{get:function(){return this._gamepads[2]}}),Object.defineProperty(c.Gamepad.prototype,"pad4",{get:function(){return this._gamepads[3]}}),c.Gamepad.BUTTON_0=0,c.Gamepad.BUTTON_1=1,c.Gamepad.BUTTON_2=2,c.Gamepad.BUTTON_3=3,c.Gamepad.BUTTON_4=4,c.Gamepad.BUTTON_5=5,c.Gamepad.BUTTON_6=6,c.Gamepad.BUTTON_7=7,c.Gamepad.BUTTON_8=8,c.Gamepad.BUTTON_9=9,c.Gamepad.BUTTON_10=10,c.Gamepad.BUTTON_11=11,c.Gamepad.BUTTON_12=12,c.Gamepad.BUTTON_13=13,c.Gamepad.BUTTON_14=14,c.Gamepad.BUTTON_15=15,c.Gamepad.AXIS_0=0,c.Gamepad.AXIS_1=1,c.Gamepad.AXIS_2=2,c.Gamepad.AXIS_3=3,c.Gamepad.AXIS_4=4,c.Gamepad.AXIS_5=5,c.Gamepad.AXIS_6=6,c.Gamepad.AXIS_7=7,c.Gamepad.AXIS_8=8,c.Gamepad.AXIS_9=9,c.Gamepad.XBOX360_A=0,c.Gamepad.XBOX360_B=1,c.Gamepad.XBOX360_X=2,c.Gamepad.XBOX360_Y=3,c.Gamepad.XBOX360_LEFT_BUMPER=4,c.Gamepad.XBOX360_RIGHT_BUMPER=5,c.Gamepad.XBOX360_LEFT_TRIGGER=6,c.Gamepad.XBOX360_RIGHT_TRIGGER=7,c.Gamepad.XBOX360_BACK=8,c.Gamepad.XBOX360_START=9,c.Gamepad.XBOX360_STICK_LEFT_BUTTON=10,c.Gamepad.XBOX360_STICK_RIGHT_BUTTON=11,c.Gamepad.XBOX360_DPAD_LEFT=14,c.Gamepad.XBOX360_DPAD_RIGHT=15,c.Gamepad.XBOX360_DPAD_UP=12,c.Gamepad.XBOX360_DPAD_DOWN=13,c.Gamepad.XBOX360_STICK_LEFT_X=0,c.Gamepad.XBOX360_STICK_LEFT_Y=1,c.Gamepad.XBOX360_STICK_RIGHT_X=2,c.Gamepad.XBOX360_STICK_RIGHT_Y=3,c.SinglePad=function(a,b){this.game=a,this._padParent=b,this._index=null,this._rawPad=null,this._connected=!1,this._prevTimestamp=null,this._rawButtons=[],this._buttons=[],this._axes=[],this._hotkeys=[],this.callbackContext=this,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null,this.deadZone=.26},c.SinglePad.prototype={addCallbacks:function(a,b){"undefined"!=typeof b&&(this.onConnectCallback="function"==typeof b.onConnect?b.onConnect:this.onConnectCallback,this.onDisconnectCallback="function"==typeof b.onDisconnect?b.onDisconnect:this.onDisconnectCallback,this.onDownCallback="function"==typeof b.onDown?b.onDown:this.onDownCallback,this.onUpCallback="function"==typeof b.onUp?b.onUp:this.onUpCallback,this.onAxisCallback="function"==typeof b.onAxis?b.onAxis:this.onAxisCallback,this.onFloatCallback="function"==typeof b.onFloat?b.onFloat:this.onFloatCallback)},addButton:function(a){return this._hotkeys[a]=new c.GamepadButton(this.game,a),this._hotkeys[a]},pollStatus:function(){if(!this._rawPad.timestamp||this._rawPad.timestamp!=this._prevTimestamp){for(var a=0;a<this._rawPad.buttons.length;a+=1){var b=this._rawPad.buttons[a];this._rawButtons[a]!==b&&(1===b?this.processButtonDown(a,b):0===b?this.processButtonUp(a,b):this.processButtonFloat(a,b),this._rawButtons[a]=b)}for(var c=this._rawPad.axes,d=0;d<c.length;d+=1){var e=c[d];e>0&&e>this.deadZone||0>e&&e<-this.deadZone?this.processAxisChange({axis:d,value:e}):this.processAxisChange({axis:d,value:0})}this._prevTimestamp=this._rawPad.timestamp}},connect:function(a){var b=!this._connected;this._index=a.index,this._connected=!0,this._rawPad=a,this._rawButtons=a.buttons,this._axes=a.axes,b&&this._padParent.onConnectCallback&&this._padParent.onConnectCallback.call(this._padParent.callbackContext,this._index),b&&this.onConnectCallback&&this.onConnectCallback.call(this.callbackContext)},disconnect:function(){var a=this._connected;this._connected=!1,this._rawPad=void 0,this._rawButtons=[],this._buttons=[];var b=this._index;this._index=null,a&&this._padParent.onDisconnectCallback&&this._padParent.onDisconnectCallback.call(this._padParent.callbackContext,b),a&&this.onDisconnectCallback&&this.onDisconnectCallback.call(this.callbackContext)},processAxisChange:function(a){this.game.input.disabled||this.game.input.gamepad.disabled||this._axes[a.axis]!==a.value&&(this._axes[a.axis]=a.value,this._padParent.onAxisCallback&&this._padParent.onAxisCallback.call(this._padParent.callbackContext,a,this._index),this.onAxisCallback&&this.onAxisCallback.call(this.callbackContext,a))},processButtonDown:function(a,b){this.game.input.disabled||this.game.input.gamepad.disabled||(this._padParent.onDownCallback&&this._padParent.onDownCallback.call(this._padParent.callbackContext,a,b,this._index),this.onDownCallback&&this.onDownCallback.call(this.callbackContext,a,b),this._buttons[a]&&this._buttons[a].isDown?this._buttons[a].duration=this.game.time.now-this._buttons[a].timeDown:this._buttons[a]?(this._buttons[a].isDown=!0,this._buttons[a].timeDown=this.game.time.now,this._buttons[a].duration=0,this._buttons[a].value=b):this._buttons[a]={isDown:!0,timeDown:this.game.time.now,timeUp:0,duration:0,value:b},this._hotkeys[a]&&this._hotkeys[a].processButtonDown(b))},processButtonUp:function(a,b){this.game.input.disabled||this.game.input.gamepad.disabled||(this._padParent.onUpCallback&&this._padParent.onUpCallback.call(this._padParent.callbackContext,a,b,this._index),this.onUpCallback&&this.onUpCallback.call(this.callbackContext,a,b),this._hotkeys[a]&&this._hotkeys[a].processButtonUp(b),this._buttons[a]?(this._buttons[a].isDown=!1,this._buttons[a].timeUp=this.game.time.now,this._buttons[a].value=b):this._buttons[a]={isDown:!1,timeDown:this.game.time.now,timeUp:this.game.time.now,duration:0,value:b})},processButtonFloat:function(a,b){this.game.input.disabled||this.game.input.gamepad.disabled||(this._padParent.onFloatCallback&&this._padParent.onFloatCallback.call(this._padParent.callbackContext,a,b,this._index),this.onFloatCallback&&this.onFloatCallback.call(this.callbackContext,a,b),this._buttons[a]?this._buttons[a].value=b:this._buttons[a]={value:b},this._hotkeys[a]&&this._hotkeys[a].processButtonFloat(b))},axis:function(a){return this._axes[a]?this._axes[a]:!1},isDown:function(a){return this._buttons[a]?this._buttons[a].isDown:!1},justReleased:function(a,b){return"undefined"==typeof b&&(b=250),this._buttons[a]&&this._buttons[a].isDown===!1&&this.game.time.now-this._buttons[a].timeUp<b},justPressed:function(a,b){return"undefined"==typeof b&&(b=250),this._buttons[a]&&this._buttons[a].isDown&&this._buttons[a].duration<b},buttonValue:function(a){return this._buttons[a]?this._buttons[a].value:!1},reset:function(){for(var a=0;a<this._buttons.length;a++)this._buttons[a]=0;for(var b=0;b<this._axes.length;b++)this._axes[b]=0}},c.SinglePad.prototype.constructor=c.SinglePad,Object.defineProperty(c.SinglePad.prototype,"connected",{get:function(){return this._connected}}),Object.defineProperty(c.SinglePad.prototype,"index",{get:function(){return this._index}}),c.GamepadButton=function(a,b){this.game=a,this.isDown=!1,this.isUp=!1,this.timeDown=0,this.duration=0,this.timeUp=0,this.repeats=0,this.value=0,this.buttonCode=b,this.onDown=new c.Signal,this.onUp=new c.Signal,this.onFloat=new c.Signal},c.GamepadButton.prototype={processButtonDown:function(a){this.isDown?(this.duration=this.game.time.now-this.timeDown,this.repeats++):(this.isDown=!0,this.isUp=!1,this.timeDown=this.game.time.now,this.duration=0,this.repeats=0,this.value=a,this.onDown.dispatch(this,a))},processButtonUp:function(a){this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.now,this.value=a,this.onUp.dispatch(this,a)},processButtonFloat:function(a){this.value=a,this.onFloat.dispatch(this,a)},justPressed:function(a){return"undefined"==typeof a&&(a=250),this.isDown&&this.duration<a},justReleased:function(a){return"undefined"==typeof a&&(a=250),this.isDown===!1&&this.game.time.now-this.timeUp<a}},c.GamepadButton.prototype.constructor=c.GamepadButton,c.Events=function(a){this.parent=a,this.onAddedToGroup=new c.Signal,this.onRemovedFromGroup=new c.Signal,this.onKilled=new c.Signal,this.onRevived=new c.Signal,this.onOutOfBounds=new c.Signal,this.onInputOver=null,this.onInputOut=null,this.onInputDown=null,this.onInputUp=null,this.onDragStart=null,this.onDragStop=null,this.onAnimationStart=null,this.onAnimationComplete=null,this.onAnimationLoop=null,this.onBeginContact=null,this.onEndContact=null},c.Events.prototype={destroy:function(){this.parent=null,this.onAddedToGroup.dispose(),this.onRemovedFromGroup.dispose(),this.onKilled.dispose(),this.onRevived.dispose(),this.onOutOfBounds.dispose(),this.onInputOver&&(this.onInputOver.dispose(),this.onInputOut.dispose(),this.onInputDown.dispose(),this.onInputUp.dispose(),this.onDragStart.dispose(),this.onDragStop.dispose()),this.onAnimationStart&&(this.onAnimationStart.dispose(),this.onAnimationComplete.dispose(),this.onAnimationLoop.dispose())}},c.Events.prototype.constructor=c.Events,c.GameObjectFactory=function(a){this.game=a,this.world=this.game.world},c.GameObjectFactory.prototype={existing:function(a){return this.world.add(a)},sprite:function(a,b,c,d,e){return"undefined"==typeof e&&(e=this.world),e.create(a,b,c,d)},child:function(a,b,c,d,e){return a.create(b,c,d,e)},tween:function(a){return this.game.tweens.create(a)},group:function(a,b){return new c.Group(this.game,a,b)},audio:function(a,b,c,d){return this.game.sound.add(a,b,c,d)},sound:function(a,b,c,d){return this.game.sound.add(a,b,c,d)},tileSprite:function(a,b,d,e,f,g){return"undefined"==typeof g&&(g=this.world),g.add(new c.TileSprite(this.game,a,b,d,e,f))},text:function(a,b,d,e,f){return"undefined"==typeof f&&(f=this.world),f.add(new c.Text(this.game,a,b,d,e))},button:function(a,b,d,e,f,g,h,i,j,k){return"undefined"==typeof k&&(k=this.world),k.add(new c.Button(this.game,a,b,d,e,f,g,h,i,j))},graphics:function(a,b,d){return"undefined"==typeof d&&(d=this.world),d.add(new c.Graphics(this.game,a,b))},emitter:function(a,b,d){return this.game.particles.add(new c.Particles.Arcade.Emitter(this.game,a,b,d))},bitmapText:function(a,b,d,e,f){return"undefined"==typeof f&&(f=this.world),this.world.add(new c.BitmapText(this.game,a,b,d,e))},tilemap:function(a,b){return new c.Tilemap(this.game,a,b)},renderTexture:function(a,b,d){var e=new c.RenderTexture(this.game,a,b,d);return this.game.cache.addRenderTexture(a,e),e},bitmapData:function(a,b){return new c.BitmapData(this.game,a,b)},filter:function(a){var b=Array.prototype.splice.call(arguments,1),a=new c.Filter[a](this.game);return a.init.apply(a,b),a}},c.GameObjectFactory.prototype.constructor=c.GameObjectFactory,c.BitmapData=function(a,d,e){"undefined"==typeof d&&(d=256),"undefined"==typeof e&&(e=256),this.game=a,this.name="",this.width=d,this.height=e,this.canvas=c.Canvas.create(d,e),this.context=this.canvas.getContext("2d"),this.imageData=this.context.getImageData(0,0,d,e),this.pixels=this.imageData.data.buffer?this.imageData.data.buffer:this.imageData.data,this.baseTexture=new b.BaseTexture(this.canvas),this.texture=new b.Texture(this.baseTexture),this.textureFrame=new c.Frame(0,0,0,d,e,"bitmapData",a.rnd.uuid()),this.type=c.BITMAPDATA,this._dirty=!1},c.BitmapData.prototype={add:function(a){a.loadTexture(this)},addTo:function(a){for(var b=0;b<a.length;b++)a[b].texture&&a[b].loadTexture(this)},clear:function(){this.context.clearRect(0,0,this.width,this.height),this._dirty=!0},refreshBuffer:function(){this.imageData=this.context.getImageData(0,0,this.width,this.height),this.pixels=new Int32Array(this.imageData.data.buffer)},setPixel32:function(a,b,c,d,e,f){a>=0&&a<=this.width&&b>=0&&b<=this.height&&(this.pixels[b*this.width+a]=f<<24|e<<16|d<<8|c,this.context.putImageData(this.imageData,0,0),this._dirty=!0)},setPixel:function(a,b,c,d,e){this.setPixel32(a,b,c,d,e,255)},getPixel:function(a,b){return a>=0&&a<=this.width&&b>=0&&b<=this.height?this.data32[b*this.width+a]:void 0},getPixel32:function(a,b){return a>=0&&a<=this.width&&b>=0&&b<=this.height?this.data32[b*this.width+a]:void 0},getPixels:function(a){return this.context.getImageData(a.x,a.y,a.width,a.height)},arc:function(a,b,c,d,e,f){return"undefined"==typeof f&&(f=!1),this._dirty=!0,this.context.arc(a,b,c,d,e,f),this},arcTo:function(a,b,c,d,e){return this._dirty=!0,this.context.arcTo(a,b,c,d,e),this},beginFill:function(a){return this.fillStyle(a),this},beginLinearGradientFill:function(a,b,c,d,e,f){for(var g=this.createLinearGradient(c,d,e,f),h=0,i=a.length;i>h;h++)g.addColorStop(b[h],a[h]);return this.fillStyle(g),this},beginLinearGradientStroke:function(a,b,c,d,e,f){for(var g=this.createLinearGradient(c,d,e,f),h=0,i=a.length;i>h;h++)g.addColorStop(b[h],a[h]);return this.strokeStyle(g),this},beginRadialGradientStroke:function(a,b,c,d,e,f,g,h){for(var i=this.createRadialGradient(c,d,e,f,g,h),j=0,k=a.length;k>j;j++)i.addColorStop(b[j],a[j]);return this.strokeStyle(i),this},beginPath:function(){return this.context.beginPath(),this},beginStroke:function(a){return this.strokeStyle(a),this},bezierCurveTo:function(a,b,c,d,e,f){return this._dirty=!0,this.context.bezierCurveTo(a,b,c,d,e,f),this},circle:function(a,b,c){return this.arc(a,b,c,0,2*Math.PI),this},clearRect:function(a,b,c,d){return this._dirty=!0,this.context.clearRect(a,b,c,d),this},clip:function(){return this._dirty=!0,this.context.clip(),this},closePath:function(){return this._dirty=!0,this.context.closePath(),this},createLinearGradient:function(a,b,c,d){return this.context.createLinearGradient(a,b,c,d)},createRadialGradient:function(a,b,c,d,e,f){return this.context.createRadialGradient(a,b,c,d,e,f)},ellipse:function(a,b,c,d){var e=.5522848,f=c/2*e,g=d/2*e,h=a+c,i=b+d,j=a+c/2,k=b+d/2;return this.moveTo(a,k),this.bezierCurveTo(a,k-g,j-f,b,j,b),this.bezierCurveTo(j+f,b,h,k-g,h,k),this.bezierCurveTo(h,k+g,j+f,i,j,i),this.bezierCurveTo(j-f,i,a,k+g,a,k),this},fill:function(){return this._dirty=!0,this.context.fill(),this},fillRect:function(a,b,c,d){return this._dirty=!0,this.context.fillRect(a,b,c,d),this},fillStyle:function(a){return this.context.fillStyle=a,this},font:function(a){return this.context.font=a,this},globalAlpha:function(a){return this.context.globalAlpha=a,this},globalCompositeOperation:function(a){return this.context.globalCompositeOperation=a,this},lineCap:function(a){return this.context.lineCap=a,this},lineDashOffset:function(a){return this.context.lineDashOffset=a,this},lineJoin:function(a){return this.context.lineJoin=a,this},lineWidth:function(a){return this.context.lineWidth=a,this},miterLimit:function(a){return this.context.miterLimit=a,this},lineTo:function(a,b){return this._dirty=!0,this.context.lineTo(a,b),this},moveTo:function(a,b){return this.context.moveTo(a,b),this},quadraticCurveTo:function(a,b,c,d){return this._dirty=!0,this.context.quadraticCurveTo(a,b,c,d),this},rect:function(a,b,c,d){return this._dirty=!0,this.context.rect(a,b,c,d),this},restore:function(){return this._dirty=!0,this.context.restore(),this},rotate:function(a){return this._dirty=!0,this.context.rotate(a),this},setStrokeStyle:function(a,b,c,d,e){return"undefined"==typeof a&&(a=1),"undefined"==typeof b&&(b="butt"),"undefined"==typeof c&&(c="miter"),"undefined"==typeof d&&(d=10),e=!1,this.lineWidth(a),this.lineCap(b),this.lineJoin(c),this.miterLimit(d),this},save:function(){return this._dirty=!0,this.context.save(),this},scale:function(a,b){return this._dirty=!0,this.context.scale(a,b),this},scrollPathIntoView:function(){return this._dirty=!0,this.context.scrollPathIntoView(),this},stroke:function(){return this._dirty=!0,this.context.stroke(),this},strokeRect:function(a,b,c,d){return this._dirty=!0,this.context.strokeRect(a,b,c,d),this},strokeStyle:function(a){return this.context.strokeStyle=a,this},render:function(){this._dirty&&(this.game.renderType==c.WEBGL&&b.texturesToUpdate.push(this.baseTexture),this._dirty=!1)}},c.BitmapData.prototype.constructor=c.BitmapData,c.BitmapData.prototype.mt=c.BitmapData.prototype.moveTo,c.BitmapData.prototype.lt=c.BitmapData.prototype.lineTo,c.BitmapData.prototype.at=c.BitmapData.prototype.arcTo,c.BitmapData.prototype.bt=c.BitmapData.prototype.bezierCurveTo,c.BitmapData.prototype.qt=c.BitmapData.prototype.quadraticCurveTo,c.BitmapData.prototype.a=c.BitmapData.prototype.arc,c.BitmapData.prototype.r=c.BitmapData.prototype.rect,c.BitmapData.prototype.cp=c.BitmapData.prototype.closePath,c.BitmapData.prototype.c=c.BitmapData.prototype.clear,c.BitmapData.prototype.f=c.BitmapData.prototype.beginFill,c.BitmapData.prototype.lf=c.BitmapData.prototype.beginLinearGradientFill,c.BitmapData.prototype.rf=c.BitmapData.prototype.beginRadialGradientFill,c.BitmapData.prototype.ef=c.BitmapData.prototype.endFill,c.BitmapData.prototype.ss=c.BitmapData.prototype.setStrokeStyle,c.BitmapData.prototype.s=c.BitmapData.prototype.beginStroke,c.BitmapData.prototype.ls=c.BitmapData.prototype.beginLinearGradientStroke,c.BitmapData.prototype.rs=c.BitmapData.prototype.beginRadialGradientStroke,c.BitmapData.prototype.dr=c.BitmapData.prototype.rect,c.BitmapData.prototype.dc=c.BitmapData.prototype.circle,c.BitmapData.prototype.de=c.BitmapData.prototype.ellipse,c.Sprite=function(a,d,e,f,g){d=d||0,e=e||0,f=f||null,g=g||null,this.game=a,this.exists=!0,this.alive=!0,this.group=null,this.name="",this.type=c.SPRITE,this.renderOrderID=-1,this.lifespan=0,this.events=new c.Events(this),this.animations=new c.AnimationManager(this),this.input=new c.InputHandler(this),this.key=f,this.currentFrame=null,f instanceof c.RenderTexture?(b.Sprite.call(this,f),this.currentFrame=this.game.cache.getTextureFrame(f.name)):f instanceof c.BitmapData?(b.Sprite.call(this,f.texture,f.textureFrame),this.currentFrame=f.textureFrame):f instanceof b.Texture?(b.Sprite.call(this,f),this.currentFrame=g):(null===f||"undefined"==typeof f?(f="__default",this.key=f):"string"==typeof f&&this.game.cache.checkImageKey(f)===!1&&(f="__missing",this.key=f),b.Sprite.call(this,b.TextureCache[f]),this.game.cache.isSpriteSheet(f)?(this.animations.loadFrameData(this.game.cache.getFrameData(f)),null!==g&&("string"==typeof g?this.frameName=g:this.frame=g)):this.currentFrame=this.game.cache.getFrame(f)),this.textureRegion=new c.Rectangle(this.texture.frame.x,this.texture.frame.y,this.texture.frame.width,this.texture.frame.height),this.anchor=new c.Point,this.x=d,this.y=e,this.position.x=d,this.position.y=e,this.world=new c.Point(d,e),this.autoCull=!1,this.scale=new c.Point(1,1),this._cache={fresh:!0,dirty:!1,a00:-1,a01:-1,a02:-1,a10:-1,a11:-1,a12:-1,id:-1,i01:-1,i10:-1,idi:-1,left:null,right:null,top:null,bottom:null,prevX:d,prevY:e,x:-1,y:-1,scaleX:1,scaleY:1,width:this.currentFrame.sourceSizeW,height:this.currentFrame.sourceSizeH,halfWidth:Math.floor(this.currentFrame.sourceSizeW/2),halfHeight:Math.floor(this.currentFrame.sourceSizeH/2),calcWidth:-1,calcHeight:-1,frameID:-1,frameWidth:this.currentFrame.width,frameHeight:this.currentFrame.height,cameraVisible:!0,cropX:0,cropY:0,cropWidth:this.currentFrame.sourceSizeW,cropHeight:this.currentFrame.sourceSizeH},this.offset=new c.Point,this.center=new c.Point(d+Math.floor(this._cache.width/2),e+Math.floor(this._cache.height/2)),this.topLeft=new c.Point(d,e),this.topRight=new c.Point(d+this._cache.width,e),this.bottomRight=new c.Point(d+this._cache.width,e+this._cache.height),this.bottomLeft=new c.Point(d,e+this._cache.height),this.bounds=new c.Rectangle(d,e,this._cache.width,this._cache.height),this.body=new c.Physics.Arcade.Body(this),this.health=1,this.inWorld=c.Rectangle.intersects(this.bounds,this.game.world.bounds),this.inWorldThreshold=0,this.outOfBoundsKill=!1,this._outOfBoundsFired=!1,this.fixedToCamera=!1,this.cameraOffset=new c.Point(d,e),this.crop=new c.Rectangle(0,0,this._cache.width,this._cache.height),this.cropEnabled=!1,this.debug=!1,this.updateCache(),this.updateBounds()},c.Sprite.prototype=Object.create(b.Sprite.prototype),c.Sprite.prototype.constructor=c.Sprite,c.Sprite.prototype.preUpdate=function(){return this._cache.fresh?(this.world.setTo(this.parent.position.x+this.x,this.parent.position.y+this.y),this.worldTransform[2]=this.world.x,this.worldTransform[5]=this.world.y,this._cache.fresh=!1,this.body&&(this.body.x=this.world.x-this.anchor.x*this.width+this.body.offset.x,this.body.y=this.world.y-this.anchor.y*this.height+this.body.offset.y,this.body.preX=this.body.x,this.body.preY=this.body.y),void 0):!this.exists||this.group&&!this.group.exists?(this.renderOrderID=-1,!1):this.lifespan>0&&(this.lifespan-=this.game.time.elapsed,this.lifespan<=0)?(this.kill(),!1):(this._cache.dirty=!1,this.visible&&(this.renderOrderID=this.game.world.currentRenderOrderID++),this.updateCache(),this.updateAnimation(),this.updateCrop(),(this._cache.dirty||this.world.x!==this._cache.prevX||this.world.y!==this._cache.prevY)&&this.updateBounds(),this.body&&this.body.preUpdate(),!0)},c.Sprite.prototype.updateCache=function(){this._cache.prevX=this.world.x,this._cache.prevY=this.world.y,this.fixedToCamera&&(this.x=this.game.camera.view.x+this.cameraOffset.x,this.y=this.game.camera.view.y+this.cameraOffset.y),this.world.setTo(this.game.camera.x+this.worldTransform[2],this.game.camera.y+this.worldTransform[5]),(this.worldTransform[1]!=this._cache.i01||this.worldTransform[3]!=this._cache.i10||this.worldTransform[0]!=this._cache.a00||this.worldTransform[41]!=this._cache.a11)&&(this._cache.a00=this.worldTransform[0],this._cache.a01=this.worldTransform[1],this._cache.a10=this.worldTransform[3],this._cache.a11=this.worldTransform[4],this._cache.i01=this.worldTransform[1],this._cache.i10=this.worldTransform[3],this._cache.scaleX=Math.sqrt(this._cache.a00*this._cache.a00+this._cache.a01*this._cache.a01),this._cache.scaleY=Math.sqrt(this._cache.a10*this._cache.a10+this._cache.a11*this._cache.a11),this._cache.a01*=-1,this._cache.a10*=-1,this._cache.id=1/(this._cache.a00*this._cache.a11+this._cache.a01*-this._cache.a10),this._cache.idi=1/(this._cache.a00*this._cache.a11+this._cache.i01*-this._cache.i10),this._cache.dirty=!0),this._cache.a02=this.worldTransform[2],this._cache.a12=this.worldTransform[5]},c.Sprite.prototype.updateAnimation=function(){(this.animations.update()||this.currentFrame&&this.currentFrame.uuid!=this._cache.frameID)&&(this._cache.frameID=this.currentFrame.uuid,this._cache.frameWidth=this.texture.frame.width,this._cache.frameHeight=this.texture.frame.height,this._cache.width=this.currentFrame.width,this._cache.height=this.currentFrame.height,this._cache.halfWidth=Math.floor(this._cache.width/2),this._cache.halfHeight=Math.floor(this._cache.height/2),this._cache.dirty=!0)},c.Sprite.prototype.updateCrop=function(){!this.cropEnabled||this.crop.width==this._cache.cropWidth&&this.crop.height==this._cache.cropHeight&&this.crop.x==this._cache.cropX&&this.crop.y==this._cache.cropY||(this.crop.floorAll(),this._cache.cropX=this.crop.x,this._cache.cropY=this.crop.y,this._cache.cropWidth=this.crop.width,this._cache.cropHeight=this.crop.height,this.texture.frame=this.crop,this.texture.width=this.crop.width,this.texture.height=this.crop.height,this.texture.updateFrame=!0,b.Texture.frameUpdates.push(this.texture))},c.Sprite.prototype.updateBounds=function(){this.offset.setTo(this._cache.a02-this.anchor.x*this.width,this._cache.a12-this.anchor.y*this.height),this.getLocalPosition(this.center,this.offset.x+this.width/2,this.offset.y+this.height/2),this.getLocalPosition(this.topLeft,this.offset.x,this.offset.y),this.getLocalPosition(this.topRight,this.offset.x+this.width,this.offset.y),this.getLocalPosition(this.bottomLeft,this.offset.x,this.offset.y+this.height),this.getLocalPosition(this.bottomRight,this.offset.x+this.width,this.offset.y+this.height),this._cache.left=c.Math.min(this.topLeft.x,this.topRight.x,this.bottomLeft.x,this.bottomRight.x),this._cache.right=c.Math.max(this.topLeft.x,this.topRight.x,this.bottomLeft.x,this.bottomRight.x),this._cache.top=c.Math.min(this.topLeft.y,this.topRight.y,this.bottomLeft.y,this.bottomRight.y),this._cache.bottom=c.Math.max(this.topLeft.y,this.topRight.y,this.bottomLeft.y,this.bottomRight.y),this.bounds.setTo(this._cache.left,this._cache.top,this._cache.right-this._cache.left,this._cache.bottom-this._cache.top),this.updateFrame=!0,this.inWorld===!1?(this.inWorld=c.Rectangle.intersects(this.bounds,this.game.world.bounds,this.inWorldThreshold),this.inWorld&&(this._outOfBoundsFired=!1)):(this.inWorld=c.Rectangle.intersects(this.bounds,this.game.world.bounds,this.inWorldThreshold),this.inWorld===!1&&(this.events.onOutOfBounds.dispatch(this),this._outOfBoundsFired=!0,this.outOfBoundsKill&&this.kill())),this._cache.cameraVisible=c.Rectangle.intersects(this.game.world.camera.screenView,this.bounds,0),this.autoCull&&(this.renderable=this._cache.cameraVisible)},c.Sprite.prototype.getLocalPosition=function(a,b,c){return a.x=(this._cache.a11*this._cache.id*b+-this._cache.a01*this._cache.id*c+(this._cache.a12*this._cache.a01-this._cache.a02*this._cache.a11)*this._cache.id)*this.scale.x+this._cache.a02,a.y=(this._cache.a00*this._cache.id*c+-this._cache.a10*this._cache.id*b+(-this._cache.a12*this._cache.a00+this._cache.a02*this._cache.a10)*this._cache.id)*this.scale.y+this._cache.a12,a},c.Sprite.prototype.getLocalUnmodifiedPosition=function(a,b,c){return a.x=this._cache.a11*this._cache.idi*b+-this._cache.i01*this._cache.idi*c+(this._cache.a12*this._cache.i01-this._cache.a02*this._cache.a11)*this._cache.idi+this.anchor.x*this._cache.width,a.y=this._cache.a00*this._cache.idi*c+-this._cache.i10*this._cache.idi*b+(-this._cache.a12*this._cache.a00+this._cache.a02*this._cache.i10)*this._cache.idi+this.anchor.y*this._cache.height,a},c.Sprite.prototype.resetCrop=function(){this.crop=new c.Rectangle(0,0,this._cache.width,this._cache.height),this.texture.setFrame(this.crop),this.cropEnabled=!1},c.Sprite.prototype.postUpdate=function(){this.key instanceof c.BitmapData&&this.key._dirty&&this.key.render(),this.exists&&(this.body&&this.body.postUpdate(),this.fixedToCamera?(this._cache.x=this.game.camera.view.x+this.cameraOffset.x,this._cache.y=this.game.camera.view.y+this.cameraOffset.y):(this._cache.x=this.x,this._cache.y=this.y),this.position.x=this._cache.x,this.position.y=this._cache.y)},c.Sprite.prototype.loadTexture=function(a,d){this.key=a,a instanceof c.RenderTexture?this.currentFrame=this.game.cache.getTextureFrame(a.name):a instanceof c.BitmapData?(this.setTexture(a.texture),this.currentFrame=a.textureFrame):a instanceof b.Texture?this.currentFrame=d:(("undefined"==typeof a||this.game.cache.checkImageKey(a)===!1)&&(a="__default",this.key=a),this.game.cache.isSpriteSheet(a)?(this.animations.loadFrameData(this.game.cache.getFrameData(a)),"undefined"!=typeof d&&("string"==typeof d?this.frameName=d:this.frame=d)):(this.currentFrame=this.game.cache.getFrame(a),this.setTexture(b.TextureCache[a])))},c.Sprite.prototype.centerOn=function(a,b){return this.fixedToCamera?(this.cameraOffset.x=a+(this.cameraOffset.x-this.center.x),this.cameraOffset.y=b+(this.cameraOffset.y-this.center.y)):(this.x=a+(this.x-this.center.x),this.y=b+(this.y-this.center.y)),this},c.Sprite.prototype.revive=function(a){return"undefined"==typeof a&&(a=1),this.alive=!0,this.exists=!0,this.visible=!0,this.health=a,this.events&&this.events.onRevived.dispatch(this),this},c.Sprite.prototype.kill=function(){return this.alive=!1,this.exists=!1,this.visible=!1,this.events&&this.events.onKilled.dispatch(this),this},c.Sprite.prototype.destroy=function(){this.filters&&(this.filters=null),this.group&&this.group.remove(this),this.input&&this.input.destroy(),this.events&&this.events.destroy(),this.animations&&this.animations.destroy(),this.body&&this.body.destroy(),this.alive=!1,this.exists=!1,this.visible=!1,this.game=null},c.Sprite.prototype.damage=function(a){return this.alive&&(this.health-=a,this.health<0&&this.kill()),this},c.Sprite.prototype.reset=function(a,b,c){return"undefined"==typeof c&&(c=1),this.x=a,this.y=b,this.world.setTo(a,b),this.position.x=this.x,this.position.y=this.y,this.alive=!0,this.exists=!0,this.visible=!0,this.renderable=!0,this._outOfBoundsFired=!1,this.health=c,this.body&&this.body.reset(!1),this},c.Sprite.prototype.bringToTop=function(){return this.group?this.group.bringToTop(this):this.game.world.bringToTop(this),this},c.Sprite.prototype.play=function(a,b,c,d){return this.animations?this.animations.play(a,b,c,d):void 0},Object.defineProperty(c.Sprite.prototype,"deltaX",{get:function(){return this.world.x-this._cache.prevX}}),Object.defineProperty(c.Sprite.prototype,"deltaY",{get:function(){return this.world.y-this._cache.prevY}}),Object.defineProperty(c.Sprite.prototype,"angle",{get:function(){return c.Math.wrapAngle(c.Math.radToDeg(this.rotation))},set:function(a){this.rotation=c.Math.degToRad(c.Math.wrapAngle(a))}}),Object.defineProperty(c.Sprite.prototype,"frame",{get:function(){return this.animations.frame},set:function(a){this.animations.frame=a}}),Object.defineProperty(c.Sprite.prototype,"frameName",{get:function(){return this.animations.frameName},set:function(a){this.animations.frameName=a}}),Object.defineProperty(c.Sprite.prototype,"inCamera",{get:function(){return this._cache.cameraVisible}}),Object.defineProperty(c.Sprite.prototype,"worldCenterX",{get:function(){return this.game.camera.x+this.center.x}}),Object.defineProperty(c.Sprite.prototype,"worldCenterY",{get:function(){return this.game.camera.y+this.center.y}}),Object.defineProperty(c.Sprite.prototype,"width",{get:function(){return this.scale.x*this.currentFrame.width},set:function(a){this.scale.x=a/this.currentFrame.width,this._cache.scaleX=a/this.currentFrame.width,this._width=a}}),Object.defineProperty(c.Sprite.prototype,"height",{get:function(){return this.scale.y*this.currentFrame.height},set:function(a){this.scale.y=a/this.currentFrame.height,this._cache.scaleY=a/this.currentFrame.height,this._height=a}}),Object.defineProperty(c.Sprite.prototype,"inputEnabled",{get:function(){return this.input.enabled},set:function(a){a?this.input.enabled===!1&&this.input.start():this.input.enabled&&this.input.stop()}}),c.TileSprite=function(a,d,e,f,g,h){d=d||0,e=e||0,f=f||256,g=g||256,h=h||null,c.Sprite.call(this,a,d,e,h),this.texture=b.TextureCache[h],b.TilingSprite.call(this,this.texture,f,g),this.type=c.TILESPRITE,this.tileScale=new c.Point(1,1),this.tilePosition=new c.Point(0,0),this.body.width=f,this.body.height=g
},c.TileSprite.prototype=c.Utils.extend(!0,b.TilingSprite.prototype,c.Sprite.prototype),c.TileSprite.prototype.constructor=c.TileSprite,Object.defineProperty(c.TileSprite.prototype,"angle",{get:function(){return c.Math.wrapAngle(c.Math.radToDeg(this.rotation))},set:function(a){this.rotation=c.Math.degToRad(c.Math.wrapAngle(a))}}),Object.defineProperty(c.TileSprite.prototype,"frame",{get:function(){return this.animations.frame},set:function(a){this.animations.frame=a}}),Object.defineProperty(c.TileSprite.prototype,"frameName",{get:function(){return this.animations.frameName},set:function(a){this.animations.frameName=a}}),Object.defineProperty(c.TileSprite.prototype,"inCamera",{get:function(){return this._cache.cameraVisible}}),Object.defineProperty(c.TileSprite.prototype,"inputEnabled",{get:function(){return this.input.enabled},set:function(a){a?this.input.enabled===!1&&this.input.start():this.input.enabled&&this.input.stop()}}),c.Text=function(a,d,e,f,g){d=d||0,e=e||0,f=f||"",g=g||"",this.game=a,this.exists=!0,this.alive=!0,this.group=null,this.name="",this.type=c.TEXT,this._text=f,this._style=g,b.Text.call(this,f,g),this.position.x=this.x=d,this.position.y=this.y=e,this.anchor=new c.Point,this.scale=new c.Point(1,1),this.fixedToCamera=!1,this.cameraOffset=new c.Point(d,e),this._cache={dirty:!1,a00:1,a01:0,a02:d,a10:0,a11:1,a12:e,id:1,x:-1,y:-1,scaleX:1,scaleY:1},this._cache.x=this.x,this._cache.y=this.y,this.renderable=!0},c.Text.prototype=Object.create(b.Text.prototype),c.Text.prototype.constructor=c.Text,c.Text.prototype.update=function(){this.exists&&(this.fixedToCamera&&(this.x=this.game.camera.view.x+this.cameraOffset.x,this.y=this.game.camera.view.y+this.cameraOffset.y),this._cache.dirty=!1,this._cache.x=this.x,this._cache.y=this.y,(this.position.x!=this._cache.x||this.position.y!=this._cache.y)&&(this.position.x=this._cache.x,this.position.y=this._cache.y,this._cache.dirty=!0))},c.Text.prototype.destroy=function(){this.group&&this.group.remove(this),this.canvas.parentNode?this.canvas.parentNode.removeChild(this.canvas):(this.canvas=null,this.context=null),this.exists=!1,this.group=null},Object.defineProperty(c.Text.prototype,"angle",{get:function(){return c.Math.radToDeg(this.rotation)},set:function(a){this.rotation=c.Math.degToRad(a)}}),Object.defineProperty(c.Text.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(c.Text.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),Object.defineProperty(c.Text.prototype,"content",{get:function(){return this._text},set:function(a){a!==this._text&&(this._text=a,this.setText(a))}}),Object.defineProperty(c.Text.prototype,"font",{get:function(){return this._style},set:function(a){a!==this._style&&(this._style=a,this.setStyle(a))}}),c.BitmapText=function(a,d,e,f,g){d=d||0,e=e||0,f=f||"",g=g||"",this.game=a,this.exists=!0,this.alive=!0,this.group=null,this.name="",this.type=c.BITMAPTEXT,b.BitmapText.call(this,f,g),this.position.x=d,this.position.y=e,this.anchor=new c.Point,this.scale=new c.Point(1,1),this._cache={dirty:!1,a00:1,a01:0,a02:d,a10:0,a11:1,a12:e,id:1,x:-1,y:-1,scaleX:1,scaleY:1},this._cache.x=this.x,this._cache.y=this.y},c.BitmapText.prototype=Object.create(b.BitmapText.prototype),c.BitmapText.prototype.constructor=c.BitmapText,c.BitmapText.prototype.update=function(){this.exists&&(this._cache.dirty=!1,this._cache.x=this.x,this._cache.y=this.y,(this.position.x!=this._cache.x||this.position.y!=this._cache.y)&&(this.position.x=this._cache.x,this.position.y=this._cache.y,this._cache.dirty=!0),this.pivot.x=this.anchor.x*this.width,this.pivot.y=this.anchor.y*this.height)},c.BitmapText.prototype.destroy=function(){this.group&&this.group.remove(this),this.canvas&&this.canvas.parentNode?this.canvas.parentNode.removeChild(this.canvas):(this.canvas=null,this.context=null),this.exists=!1,this.group=null},Object.defineProperty(c.BitmapText.prototype,"angle",{get:function(){return c.Math.radToDeg(this.rotation)},set:function(a){this.rotation=c.Math.degToRad(a)}}),Object.defineProperty(c.BitmapText.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(c.BitmapText.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),c.Button=function(a,b,d,e,f,g,h,i,j,k){b=b||0,d=d||0,e=e||null,f=f||null,g=g||this,c.Sprite.call(this,a,b,d,e,i),this.type=c.BUTTON,this._onOverFrameName=null,this._onOutFrameName=null,this._onDownFrameName=null,this._onUpFrameName=null,this._onOverFrameID=null,this._onOutFrameID=null,this._onDownFrameID=null,this._onUpFrameID=null,this.onOverSound=null,this.onOutSound=null,this.onDownSound=null,this.onUpSound=null,this.onOverSoundMarker="",this.onOutSoundMarker="",this.onDownSoundMarker="",this.onUpSoundMarker="",this.onInputOver=new c.Signal,this.onInputOut=new c.Signal,this.onInputDown=new c.Signal,this.onInputUp=new c.Signal,this.freezeFrames=!1,this.forceOut=!1,this.setFrames(h,i,j,k),null!==f&&this.onInputUp.add(f,g),this.input.start(0,!0),this.events.onInputOver.add(this.onInputOverHandler,this),this.events.onInputOut.add(this.onInputOutHandler,this),this.events.onInputDown.add(this.onInputDownHandler,this),this.events.onInputUp.add(this.onInputUpHandler,this)},c.Button.prototype=Object.create(c.Sprite.prototype),c.Button.prototype=c.Utils.extend(!0,c.Button.prototype,c.Sprite.prototype,b.Sprite.prototype),c.Button.prototype.constructor=c.Button,c.Button.prototype.clearFrames=function(){this._onOverFrameName=null,this._onOverFrameID=null,this._onOutFrameName=null,this._onOutFrameID=null,this._onDownFrameName=null,this._onDownFrameID=null,this._onUpFrameName=null,this._onUpFrameID=null},c.Button.prototype.setFrames=function(a,b,c,d){this.clearFrames(),null!==a&&("string"==typeof a?(this._onOverFrameName=a,this.input.pointerOver()&&(this.frameName=a)):(this._onOverFrameID=a,this.input.pointerOver()&&(this.frame=a))),null!==b&&("string"==typeof b?(this._onOutFrameName=b,this.input.pointerOver()===!1&&(this.frameName=b)):(this._onOutFrameID=b,this.input.pointerOver()===!1&&(this.frame=b))),null!==c&&("string"==typeof c?(this._onDownFrameName=c,this.input.pointerDown()&&(this.frameName=c)):(this._onDownFrameID=c,this.input.pointerDown()&&(this.frame=c))),null!==d&&("string"==typeof d?(this._onUpFrameName=d,this.input.pointerUp()&&(this.frameName=d)):(this._onUpFrameID=d,this.input.pointerUp()&&(this.frame=d)))},c.Button.prototype.setSounds=function(a,b,c,d,e,f,g,h){this.setOverSound(a,b),this.setOutSound(e,f),this.setDownSound(c,d),this.setUpSound(g,h)},c.Button.prototype.setOverSound=function(a,b){this.onOverSound=null,this.onOverSoundMarker="",a instanceof c.Sound&&(this.onOverSound=a),"string"==typeof b&&(this.onOverSoundMarker=b)},c.Button.prototype.setOutSound=function(a,b){this.onOutSound=null,this.onOutSoundMarker="",a instanceof c.Sound&&(this.onOutSound=a),"string"==typeof b&&(this.onOutSoundMarker=b)},c.Button.prototype.setDownSound=function(a,b){this.onDownSound=null,this.onDownSoundMarker="",a instanceof c.Sound&&(this.onDownSound=a),"string"==typeof b&&(this.onDownSoundMarker=b)},c.Button.prototype.setUpSound=function(a,b){this.onUpSound=null,this.onUpSoundMarker="",a instanceof c.Sound&&(this.onUpSound=a),"string"==typeof b&&(this.onUpSoundMarker=b)},c.Button.prototype.onInputOverHandler=function(a,b){this.freezeFrames===!1&&this.setState(1),this.onOverSound&&this.onOverSound.play(this.onOverSoundMarker),this.onInputOver&&this.onInputOver.dispatch(this,b)},c.Button.prototype.onInputOutHandler=function(a,b){this.freezeFrames===!1&&this.setState(2),this.onOutSound&&this.onOutSound.play(this.onOutSoundMarker),this.onInputOut&&this.onInputOut.dispatch(this,b)},c.Button.prototype.onInputDownHandler=function(a,b){this.freezeFrames===!1&&this.setState(3),this.onDownSound&&this.onDownSound.play(this.onDownSoundMarker),this.onInputDown&&this.onInputDown.dispatch(this,b)},c.Button.prototype.onInputUpHandler=function(a,b,c){this.onUpSound&&this.onUpSound.play(this.onUpSoundMarker),this.onInputUp&&this.onInputUp.dispatch(this,b,c),this.freezeFrames||(this.forceOut?this.setState(2):this._onUpFrameName||this._onUpFrameID?this.setState(4):c?this.setState(1):this.setState(2))},c.Button.prototype.setState=function(a){1===a?null!=this._onOverFrameName?this.frameName=this._onOverFrameName:null!=this._onOverFrameID&&(this.frame=this._onOverFrameID):2===a?null!=this._onOutFrameName?this.frameName=this._onOutFrameName:null!=this._onOutFrameID&&(this.frame=this._onOutFrameID):3===a?null!=this._onDownFrameName?this.frameName=this._onDownFrameName:null!=this._onDownFrameID&&(this.frame=this._onDownFrameID):4===a&&(null!=this._onUpFrameName?this.frameName=this._onUpFrameName:null!=this._onUpFrameID&&(this.frame=this._onUpFrameID))},c.Graphics=function(a,d,e){this.game=a,b.Graphics.call(this),this.type=c.GRAPHICS,this.position.x=d,this.position.y=e},c.Graphics.prototype=Object.create(b.Graphics.prototype),c.Graphics.prototype.constructor=c.Graphics,c.Graphics.prototype.destroy=function(){this.clear(),this.group&&this.group.remove(this),this.game=null},c.Graphics.prototype.drawPolygon=function(a){this.moveTo(a.points[0].x,a.points[0].y);for(var b=1;b<a.points.length;b+=1)this.lineTo(a.points[b].x,a.points[b].y);this.lineTo(a.points[0].x,a.points[0].y)},Object.defineProperty(c.Graphics.prototype,"angle",{get:function(){return c.Math.wrapAngle(c.Math.radToDeg(this.rotation))},set:function(a){this.rotation=c.Math.degToRad(c.Math.wrapAngle(a))}}),Object.defineProperty(c.Graphics.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(c.Graphics.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),c.RenderTexture=function(a,d,e,f){this.game=a,this.name=d,b.EventTarget.call(this),this.width=e||100,this.height=f||100,this.indetityMatrix=b.mat3.create(),this.frame=new b.Rectangle(0,0,this.width,this.height),this.type=c.RENDERTEXTURE,this._tempPoint={x:0,y:0},b.gl?this.initWebGL():this.initCanvas()},c.RenderTexture.prototype=Object.create(b.Texture.prototype),c.RenderTexture.prototype.constructor=b.RenderTexture,c.RenderTexture.prototype.render=function(a,d,e,f){"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=!1),"undefined"==typeof f&&(f=!1),a instanceof c.Group&&(a=a._container),b.gl?this.renderWebGL(a,d,e,f):this.renderCanvas(a,d,e,f)},c.RenderTexture.prototype.renderXY=function(a,b,c,d,e){this._tempPoint.x=b,this._tempPoint.y=c,this.render(a,this._tempPoint,d,e)},c.RenderTexture.prototype.initWebGL=function(){var a=b.gl;this.glFramebuffer=a.createFramebuffer(),a.bindFramebuffer(a.FRAMEBUFFER,this.glFramebuffer),this.glFramebuffer.width=this.width,this.glFramebuffer.height=this.height,this.baseTexture=new b.BaseTexture,this.baseTexture.width=this.width,this.baseTexture.height=this.height,this.baseTexture._glTexture=a.createTexture(),a.bindTexture(a.TEXTURE_2D,this.baseTexture._glTexture),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,this.width,this.height,0,a.RGBA,a.UNSIGNED_BYTE,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),this.baseTexture.isRender=!0,a.bindFramebuffer(a.FRAMEBUFFER,this.glFramebuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.baseTexture._glTexture,0),this.projection=new b.Point(this.width/2,-this.height/2)},c.RenderTexture.prototype.resize=function(a,c){if(this.width=a,this.height=c,b.gl){this.projection.x=this.width/2,this.projection.y=-this.height/2;var d=b.gl;d.bindTexture(d.TEXTURE_2D,this.baseTexture._glTexture),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,this.width,this.height,0,d.RGBA,d.UNSIGNED_BYTE,null)}else this.frame.width=this.width,this.frame.height=this.height,this.renderer.resize(this.width,this.height)},c.RenderTexture.prototype.initCanvas=function(){this.renderer=new b.CanvasRenderer(this.width,this.height,null,0),this.baseTexture=new b.BaseTexture(this.renderer.view),this.frame=new b.Rectangle(0,0,this.width,this.height)},c.RenderTexture.prototype.renderWebGL=function(a,c,d){var e=b.gl;e.colorMask(!0,!0,!0,!0),e.viewport(0,0,this.width,this.height),e.bindFramebuffer(e.FRAMEBUFFER,this.glFramebuffer),d&&(e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT));var f=a.children,g=a.worldTransform;a.worldTransform=b.mat3.create(),a.worldTransform[4]=-1,a.worldTransform[5]=-2*this.projection.y,c&&(a.worldTransform[2]=c.x,a.worldTransform[5]-=c.y),b.visibleCount++,a.vcount=b.visibleCount;for(var h=0,i=f.length;i>h;h++)f[h].updateTransform();var j=a.__renderGroup;j?a==j.root?j.render(this.projection,this.glFramebuffer):j.renderSpecific(a,this.projection,this.glFramebuffer):(this.renderGroup||(this.renderGroup=new b.WebGLRenderGroup(e)),this.renderGroup.setRenderable(a),this.renderGroup.render(this.projection,this.glFramebuffer)),a.worldTransform=g},c.RenderTexture.prototype.renderCanvas=function(a,c,d,e){var f=a.children;a.worldTransform=b.mat3.create(),c&&(a.worldTransform[2]=c.x,a.worldTransform[5]=c.y);for(var g=0,h=f.length;h>g;g++)f[g].updateTransform();d&&this.renderer.context.clearRect(0,0,this.width,this.height),this.renderer.renderDisplayObject(a,e),this.renderer.context.setTransform(1,0,0,1,0,0)},c.Canvas={create:function(a,b,c){a=a||256,b=b||256;var d=document.createElement("canvas");return"string"==typeof c&&(d.id=c),d.width=a,d.height=b,d.style.display="block",d},getOffset:function(a,b){b=b||new c.Point;var d=a.getBoundingClientRect(),e=a.clientTop||document.body.clientTop||0,f=a.clientLeft||document.body.clientLeft||0,g=0,h=0;return"CSS1Compat"===document.compatMode?(g=window.pageYOffset||document.documentElement.scrollTop||a.scrollTop||0,h=window.pageXOffset||document.documentElement.scrollLeft||a.scrollLeft||0):(g=window.pageYOffset||document.body.scrollTop||a.scrollTop||0,h=window.pageXOffset||document.body.scrollLeft||a.scrollLeft||0),b.x=d.left+h-f,b.y=d.top+g-e,b},getAspectRatio:function(a){return a.width/a.height},setBackgroundColor:function(a,b){return b=b||"rgb(0,0,0)",a.style.backgroundColor=b,a},setTouchAction:function(a,b){return b=b||"none",a.style.msTouchAction=b,a.style["ms-touch-action"]=b,a.style["touch-action"]=b,a},setUserSelect:function(a,b){return b=b||"none",a.style["-webkit-touch-callout"]=b,a.style["-webkit-user-select"]=b,a.style["-khtml-user-select"]=b,a.style["-moz-user-select"]=b,a.style["-ms-user-select"]=b,a.style["user-select"]=b,a.style["-webkit-tap-highlight-color"]="rgba(0, 0, 0, 0)",a},addToDOM:function(a,b,c){var d;return"undefined"==typeof c&&(c=!0),b&&("string"==typeof b?d=document.getElementById(b):"object"==typeof b&&1===b.nodeType&&(d=b)),d||(d=document.body),c&&d.style&&(d.style.overflow="hidden"),d.appendChild(a),a},setTransform:function(a,b,c,d,e,f,g){return a.setTransform(d,f,g,e,b,c),a},setSmoothingEnabled:function(a,b){return a.imageSmoothingEnabled=b,a.mozImageSmoothingEnabled=b,a.oImageSmoothingEnabled=b,a.webkitImageSmoothingEnabled=b,a.msImageSmoothingEnabled=b,a},setImageRenderingCrisp:function(a){return a.style["image-rendering"]="optimizeSpeed",a.style["image-rendering"]="crisp-edges",a.style["image-rendering"]="-moz-crisp-edges",a.style["image-rendering"]="-webkit-optimize-contrast",a.style["image-rendering"]="optimize-contrast",a.style.msInterpolationMode="nearest-neighbor",a},setImageRenderingBicubic:function(a){return a.style["image-rendering"]="auto",a.style.msInterpolationMode="bicubic",a}},c.StageScaleMode=function(a,b,d){this.game=a,this.width=b,this.height=d,this.minWidth=null,this.maxWidth=null,this.minHeight=null,this.maxHeight=null,this._startHeight=0,this.forceLandscape=!1,this.forcePortrait=!1,this.incorrectOrientation=!1,this.pageAlignHorizontally=!1,this.pageAlignVertically=!1,this._width=0,this._height=0,this.maxIterations=5,this.orientationSprite=null,this.enterLandscape=new c.Signal,this.enterPortrait=new c.Signal,this.enterIncorrectOrientation=new c.Signal,this.leaveIncorrectOrientation=new c.Signal,this.hasResized=new c.Signal,this.orientation=window.orientation?window.orientation:window.outerWidth>window.outerHeight?90:0,this.scaleFactor=new c.Point(1,1),this.scaleFactorInversed=new c.Point(1,1),this.margin=new c.Point(0,0),this.aspectRatio=0,this.event=null;var e=this;window.addEventListener("orientationchange",function(a){return e.checkOrientation(a)},!1),window.addEventListener("resize",function(a){return e.checkResize(a)},!1),document.addEventListener("webkitfullscreenchange",function(a){return e.fullScreenChange(a)},!1),document.addEventListener("mozfullscreenchange",function(a){return e.fullScreenChange(a)},!1),document.addEventListener("fullscreenchange",function(a){return e.fullScreenChange(a)},!1)},c.StageScaleMode.EXACT_FIT=0,c.StageScaleMode.NO_SCALE=1,c.StageScaleMode.SHOW_ALL=2,c.StageScaleMode.prototype={startFullScreen:function(a){if(!this.isFullScreen){"undefined"!=typeof a&&c.Canvas.setSmoothingEnabled(this.game.context,a);var b=this.game.canvas;this._width=this.width,this._height=this.height,b.requestFullScreen?b.requestFullScreen():b.mozRequestFullScreen?b.parentNode.mozRequestFullScreen():b.webkitRequestFullScreen&&b.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)}},stopFullScreen:function(){document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen()},fullScreenChange:function(a){this.event=a,this.isFullScreen?this.game.stage.fullScreenScaleMode===c.StageScaleMode.EXACT_FIT?(this.game.stage.canvas.style.width="100%",this.game.stage.canvas.style.height="100%",this.setMaximum(),this.game.input.scale.setTo(this.game.width/this.width,this.game.height/this.height),this.aspectRatio=this.width/this.height,this.scaleFactor.x=this.game.width/this.width,this.scaleFactor.y=this.game.height/this.height):this.game.stage.fullScreenScaleMode===c.StageScaleMode.SHOW_ALL&&(this.game.stage.scale.setShowAll(),this.game.stage.scale.refresh()):(this.game.stage.canvas.style.width=this.game.width+"px",this.game.stage.canvas.style.height=this.game.height+"px",this.width=this._width,this.height=this._height,this.game.input.scale.setTo(this.game.width/this.width,this.game.height/this.height),this.aspectRatio=this.width/this.height,this.scaleFactor.x=this.game.width/this.width,this.scaleFactor.y=this.game.height/this.height)},forceOrientation:function(a,c,d){"undefined"==typeof c&&(c=!1),this.forceLandscape=a,this.forcePortrait=c,"undefined"!=typeof d&&((null==d||this.game.cache.checkImageKey(d)===!1)&&(d="__default"),this.orientationSprite=new b.Sprite(b.TextureCache[d]),this.orientationSprite.anchor.x=.5,this.orientationSprite.anchor.y=.5,this.orientationSprite.position.x=this.game.width/2,this.orientationSprite.position.y=this.game.height/2,this.checkOrientationState(),this.incorrectOrientation?(this.orientationSprite.visible=!0,this.game.world.visible=!1):(this.orientationSprite.visible=!1,this.game.world.visible=!0),this.game.stage._stage.addChild(this.orientationSprite))},checkOrientationState:function(){this.incorrectOrientation?(this.forceLandscape&&window.innerWidth>window.innerHeight||this.forcePortrait&&window.innerHeight>window.innerWidth)&&(this.game.paused=!1,this.incorrectOrientation=!1,this.leaveIncorrectOrientation.dispatch(),this.orientationSprite&&(this.orientationSprite.visible=!1,this.game.world.visible=!0),this.refresh()):(this.forceLandscape&&window.innerWidth<window.innerHeight||this.forcePortrait&&window.innerHeight<window.innerWidth)&&(this.game.paused=!0,this.incorrectOrientation=!0,this.enterIncorrectOrientation.dispatch(),this.orientationSprite&&this.orientationSprite.visible===!1&&(this.orientationSprite.visible=!0,this.game.world.visible=!1),this.refresh())},checkOrientation:function(a){this.event=a,this.orientation=window.orientation,this.isLandscape?this.enterLandscape.dispatch(this.orientation,!0,!1):this.enterPortrait.dispatch(this.orientation,!1,!0),this.game.stage.scaleMode!==c.StageScaleMode.NO_SCALE&&this.refresh()},checkResize:function(a){this.event=a,this.orientation=window.outerWidth>window.outerHeight?90:0,this.isLandscape?this.enterLandscape.dispatch(this.orientation,!0,!1):this.enterPortrait.dispatch(this.orientation,!1,!0),this.game.stage.scaleMode!==c.StageScaleMode.NO_SCALE&&this.refresh(),this.checkOrientationState()},refresh:function(){if(this.game.device.iPad===!1&&this.game.device.webApp===!1&&this.game.device.desktop===!1&&(this.game.device.android&&this.game.device.chrome===!1?window.scrollTo(0,1):window.scrollTo(0,0)),null==this._check&&this.maxIterations>0){this._iterations=this.maxIterations;var a=this;this._check=window.setInterval(function(){return a.setScreenSize()},10),this.setScreenSize()}},setScreenSize:function(a){"undefined"==typeof a&&(a=!1),this.game.device.iPad===!1&&this.game.device.webApp===!1&&this.game.device.desktop===!1&&(this.game.device.android&&this.game.device.chrome===!1?window.scrollTo(0,1):window.scrollTo(0,0)),this._iterations--,(a||window.innerHeight>this._startHeight||this._iterations<0)&&(document.documentElement.style.minHeight=window.innerHeight+"px",this.incorrectOrientation===!0?this.setMaximum():this.isFullScreen?this.game.stage.fullScreenScaleMode==c.StageScaleMode.EXACT_FIT?this.setExactFit():this.game.stage.fullScreenScaleMode==c.StageScaleMode.SHOW_ALL&&this.setShowAll():this.game.stage.scaleMode==c.StageScaleMode.EXACT_FIT?this.setExactFit():this.game.stage.scaleMode==c.StageScaleMode.SHOW_ALL&&this.setShowAll(),this.setSize(),clearInterval(this._check),this._check=null)},setSize:function(){this.incorrectOrientation===!1&&(this.maxWidth&&this.width>this.maxWidth&&(this.width=this.maxWidth),this.maxHeight&&this.height>this.maxHeight&&(this.height=this.maxHeight),this.minWidth&&this.width<this.minWidth&&(this.width=this.minWidth),this.minHeight&&this.height<this.minHeight&&(this.height=this.minHeight)),this.game.canvas.style.width=this.width+"px",this.game.canvas.style.height=this.height+"px",this.game.input.scale.setTo(this.game.width/this.width,this.game.height/this.height),this.pageAlignHorizontally&&(this.width<window.innerWidth&&this.incorrectOrientation===!1?(this.margin.x=Math.round((window.innerWidth-this.width)/2),this.game.canvas.style.marginLeft=this.margin.x+"px"):(this.margin.x=0,this.game.canvas.style.marginLeft="0px")),this.pageAlignVertically&&(this.height<window.innerHeight&&this.incorrectOrientation===!1?(this.margin.y=Math.round((window.innerHeight-this.height)/2),this.game.canvas.style.marginTop=this.margin.y+"px"):(this.margin.y=0,this.game.canvas.style.marginTop="0px")),c.Canvas.getOffset(this.game.canvas,this.game.stage.offset),this.aspectRatio=this.width/this.height,this.scaleFactor.x=this.game.width/this.width,this.scaleFactor.y=this.game.height/this.height,this.scaleFactorInversed.x=this.width/this.game.width,this.scaleFactorInversed.y=this.height/this.game.height,this.hasResized.dispatch(this.width,this.height),this.checkOrientationState()},setMaximum:function(){this.width=window.innerWidth,this.height=window.innerHeight},setShowAll:function(){var a=Math.min(window.innerHeight/this.game.height,window.innerWidth/this.game.width);this.width=Math.round(this.game.width*a),this.height=Math.round(this.game.height*a)},setExactFit:function(){var a=window.innerWidth,b=window.innerHeight;this.width=this.maxWidth&&a>this.maxWidth?this.maxWidth:a,this.height=this.maxHeight&&b>this.maxHeight?this.maxHeight:b}},c.StageScaleMode.prototype.constructor=c.StageScaleMode,Object.defineProperty(c.StageScaleMode.prototype,"isFullScreen",{get:function(){return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement}}),Object.defineProperty(c.StageScaleMode.prototype,"isPortrait",{get:function(){return 0===this.orientation||180==this.orientation}}),Object.defineProperty(c.StageScaleMode.prototype,"isLandscape",{get:function(){return 90===this.orientation||-90===this.orientation}}),c.Device=function(){this.patchAndroidClearRectBug=!1,this.desktop=!1,this.iOS=!1,this.cocoonJS=!1,this.ejecta=!1,this.android=!1,this.chromeOS=!1,this.linux=!1,this.macOS=!1,this.windows=!1,this.canvas=!1,this.file=!1,this.fileSystem=!1,this.localStorage=!1,this.webGL=!1,this.worker=!1,this.touch=!1,this.mspointer=!1,this.css3D=!1,this.pointerLock=!1,this.typedArray=!1,this.vibration=!1,this.quirksMode=!1,this.arora=!1,this.chrome=!1,this.epiphany=!1,this.firefox=!1,this.ie=!1,this.ieVersion=0,this.trident=!1,this.tridentVersion=0,this.mobileSafari=!1,this.midori=!1,this.opera=!1,this.safari=!1,this.webApp=!1,this.silk=!1,this.audioData=!1,this.webAudio=!1,this.ogg=!1,this.opus=!1,this.mp3=!1,this.wav=!1,this.m4a=!1,this.webm=!1,this.iPhone=!1,this.iPhone4=!1,this.iPad=!1,this.pixelRatio=0,this.littleEndian=!1,this._checkAudio(),this._checkBrowser(),this._checkCSS3D(),this._checkDevice(),this._checkFeatures(),this._checkOS()},c.Device.prototype={_checkOS:function(){var a=navigator.userAgent;/Android/.test(a)?this.android=!0:/CrOS/.test(a)?this.chromeOS=!0:/iP[ao]d|iPhone/i.test(a)?this.iOS=!0:/Linux/.test(a)?this.linux=!0:/Mac OS/.test(a)?this.macOS=!0:/Windows/.test(a)&&(this.windows=!0),(this.windows||this.macOS||this.linux&&this.silk===!1)&&(this.desktop=!0)},_checkFeatures:function(){this.canvas=!!window.CanvasRenderingContext2D;try{this.localStorage=!!localStorage.getItem}catch(a){this.localStorage=!1}this.file=!!(window.File&&window.FileReader&&window.FileList&&window.Blob),this.fileSystem=!!window.requestFileSystem,this.webGL=function(){try{var a=document.createElement("canvas");return!!window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch(b){return!1}}(),this.webGL=null===this.webGL||this.webGL===!1?!1:!0,this.worker=!!window.Worker,("ontouchstart"in document.documentElement||window.navigator.maxTouchPoints&&window.navigator.maxTouchPoints>1)&&(this.touch=!0),(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&(this.mspointer=!0),this.pointerLock="pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document,this.quirksMode="CSS1Compat"===document.compatMode?!1:!0},_checkBrowser:function(){var a=navigator.userAgent;/Arora/.test(a)?this.arora=!0:/Chrome/.test(a)?this.chrome=!0:/Epiphany/.test(a)?this.epiphany=!0:/Firefox/.test(a)?this.firefox=!0:/Mobile Safari/.test(a)?this.mobileSafari=!0:/MSIE (\d+\.\d+);/.test(a)?(this.ie=!0,this.ieVersion=parseInt(RegExp.$1,10)):/Midori/.test(a)?this.midori=!0:/Opera/.test(a)?this.opera=!0:/Safari/.test(a)?this.safari=!0:/Silk/.test(a)?this.silk=!0:/Trident\/(\d+\.\d+);/.test(a)&&(this.ie=!0,this.trident=!0,this.tridentVersion=parseInt(RegExp.$1,10)),navigator.standalone&&(this.webApp=!0),navigator.isCocoonJS&&(this.cocoonJS=!0),"undefined"!=typeof window.ejecta&&(this.ejecta=!0)},_checkAudio:function(){this.audioData=!!window.Audio,this.webAudio=!(!window.webkitAudioContext&&!window.AudioContext);var a=document.createElement("audio"),b=!1;try{(b=!!a.canPlayType)&&(a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"")&&(this.ogg=!0),a.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,"")&&(this.opus=!0),a.canPlayType("audio/mpeg;").replace(/^no$/,"")&&(this.mp3=!0),a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"")&&(this.wav=!0),(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;").replace(/^no$/,""))&&(this.m4a=!0),a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")&&(this.webm=!0))}catch(c){}},_checkDevice:function(){this.pixelRatio=window.devicePixelRatio||1,this.iPhone=-1!=navigator.userAgent.toLowerCase().indexOf("iphone"),this.iPhone4=2==this.pixelRatio&&this.iPhone,this.iPad=-1!=navigator.userAgent.toLowerCase().indexOf("ipad"),"undefined"!=typeof Int8Array?(this.littleEndian=new Int8Array(new Int16Array([1]).buffer)[0]>0,this.typedArray=!0):(this.littleEndian=!1,this.typedArray=!1),navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate,navigator.vibrate&&(this.vibration=!0)},_checkCSS3D:function(){var a,b=document.createElement("p"),c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(b,null);for(var d in c)void 0!==b.style[d]&&(b.style[d]="translate3d(1px,1px,1px)",a=window.getComputedStyle(b).getPropertyValue(c[d]));document.body.removeChild(b),this.css3D=void 0!==a&&a.length>0&&"none"!==a},canPlayAudio:function(a){return"mp3"==a&&this.mp3?!0:"ogg"==a&&(this.ogg||this.opus)?!0:"m4a"==a&&this.m4a?!0:"wav"==a&&this.wav?!0:"webm"==a&&this.webm?!0:!1},isConsoleOpen:function(){return window.console&&window.console.firebug?!0:window.console?(console.profile(),console.profileEnd(),console.clear&&console.clear(),console.profiles.length>0):!1}},c.Device.prototype.constructor=c.Device,c.RequestAnimationFrame=function(a){this.game=a,this.isRunning=!1;for(var b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;c++)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"];this._isSetTimeOut=!1,this._onLoop=null,this._timeOutID=null},c.RequestAnimationFrame.prototype={start:function(){this.isRunning=!0;var a=this;window.requestAnimationFrame?(this._isSetTimeOut=!1,this._onLoop=function(b){return a.updateRAF(b)},this._timeOutID=window.requestAnimationFrame(this._onLoop)):(this._isSetTimeOut=!0,this._onLoop=function(){return a.updateSetTimeout()},this._timeOutID=window.setTimeout(this._onLoop,0))},updateRAF:function(a){this.game.update(a),this._timeOutID=window.requestAnimationFrame(this._onLoop)},updateSetTimeout:function(){this.game.update(Date.now()),this._timeOutID=window.setTimeout(this._onLoop,this.game.time.timeToCall)},stop:function(){this._isSetTimeOut?clearTimeout(this._timeOutID):window.cancelAnimationFrame(this._timeOutID),this.isRunning=!1},isSetTimeOut:function(){return this._isSetTimeOut},isRAF:function(){return this._isSetTimeOut===!1}},c.RequestAnimationFrame.prototype.constructor=c.RequestAnimationFrame,c.RandomDataGenerator=function(a){"undefined"==typeof a&&(a=[]),this.c=1,this.s0=0,this.s1=0,this.s2=0,this.sow(a)},c.RandomDataGenerator.prototype={rnd:function(){var a=2091639*this.s0+2.3283064365386963e-10*this.c;return this.c=0|a,this.s0=this.s1,this.s1=this.s2,this.s2=a-this.c,this.s2},sow:function(a){"undefined"==typeof a&&(a=[]),this.s0=this.hash(" "),this.s1=this.hash(this.s0),this.s2=this.hash(this.s1),this.c=1;for(var b,c=0;b=a[c++];)this.s0-=this.hash(b),this.s0+=~~(this.s0<0),this.s1-=this.hash(b),this.s1+=~~(this.s1<0),this.s2-=this.hash(b),this.s2+=~~(this.s2<0)},hash:function(a){var b,c,d;for(d=4022871197,a=a.toString(),c=0;c<a.length;c++)d+=a.charCodeAt(c),b=.02519603282416938*d,d=b>>>0,b-=d,b*=d,d=b>>>0,b-=d,d+=4294967296*b;return 2.3283064365386963e-10*(d>>>0)},integer:function(){return 4294967296*this.rnd.apply(this)},frac:function(){return this.rnd.apply(this)+1.1102230246251565e-16*(0|2097152*this.rnd.apply(this))},real:function(){return this.integer()+this.frac()},integerInRange:function(a,b){return Math.floor(this.realInRange(a,b))},realInRange:function(a,b){return this.frac()*(b-a)+a},normal:function(){return 1-2*this.frac()},uuid:function(){var a="",b="";for(b=a="";a++<36;b+=~a%5|4&3*a?(15^a?8^this.frac()*(20^a?16:4):4).toString(16):"-");return b},pick:function(a){return a[this.integerInRange(0,a.length)]},weightedPick:function(a){return a[~~(Math.pow(this.frac(),2)*a.length)]},timestamp:function(a,b){return this.realInRange(a||9466848e5,b||1577862e6)},angle:function(){return this.integerInRange(-180,180)}},c.RandomDataGenerator.prototype.constructor=c.RandomDataGenerator,c.Math={PI2:2*Math.PI,fuzzyEqual:function(a,b,c){return"undefined"==typeof c&&(c=1e-4),Math.abs(a-b)<c
},fuzzyLessThan:function(a,b,c){return"undefined"==typeof c&&(c=1e-4),b+c>a},fuzzyGreaterThan:function(a,b,c){return"undefined"==typeof c&&(c=1e-4),a>b-c},fuzzyCeil:function(a,b){return"undefined"==typeof b&&(b=1e-4),Math.ceil(a-b)},fuzzyFloor:function(a,b){return"undefined"==typeof b&&(b=1e-4),Math.floor(a+b)},average:function(){for(var a=[],b=0;b<arguments.length-0;b++)a[b]=arguments[b+0];for(var c=0,d=0;d<a.length;d++)c+=a[d];return c/a.length},truncate:function(a){return a>0?Math.floor(a):Math.ceil(a)},shear:function(a){return a%1},snapTo:function(a,b,c){return"undefined"==typeof c&&(c=0),0===b?a:(a-=c,a=b*Math.round(a/b),c+a)},snapToFloor:function(a,b,c){return"undefined"==typeof c&&(c=0),0===b?a:(a-=c,a=b*Math.floor(a/b),c+a)},snapToCeil:function(a,b,c){return"undefined"==typeof c&&(c=0),0===b?a:(a-=c,a=b*Math.ceil(a/b),c+a)},snapToInArray:function(a,b,c){if("undefined"==typeof c&&(c=!0),c&&b.sort(),a<b[0])return b[0];for(var d=1;b[d]<a;)d++;var e=b[d-1],f=d<b.length?b[d]:Number.POSITIVE_INFINITY;return a-e>=f-a?f:e},roundTo:function(a,b,c){"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=10);var d=Math.pow(c,-b);return Math.round(a*d)/d},floorTo:function(a,b,c){"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=10);var d=Math.pow(c,-b);return Math.floor(a*d)/d},ceilTo:function(a,b,c){"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=10);var d=Math.pow(c,-b);return Math.ceil(a*d)/d},interpolateFloat:function(a,b,c){return(b-a)*c+a},angleBetween:function(a,b,c,d){return Math.atan2(d-b,c-a)},reverseAngle:function(a){return this.normalizeAngle(a+Math.PI,!0)},normalizeAngle:function(a){return a%=2*Math.PI,a>=0?a:a+2*Math.PI},normalizeLatitude:function(a){return Math.max(-90,Math.min(90,a))},normalizeLongitude:function(a){return 180==a%360?180:(a%=360,-180>a?a+360:a>180?a-360:a)},nearestAngleBetween:function(a,b,c){"undefined"==typeof c&&(c=!0);var d=c?Math.PI:180;return a=this.normalizeAngle(a,c),b=this.normalizeAngle(b,c),-d/2>a&&b>d/2&&(a+=2*d),-d/2>b&&a>d/2&&(b+=2*d),b-a},interpolateAngles:function(a,b,c,d,e){return"undefined"==typeof d&&(d=!0),"undefined"==typeof e&&(e=null),a=this.normalizeAngle(a,d),b=this.normalizeAngleToAnother(b,a,d),"function"==typeof e?e(c,a,b-a,1):this.interpolateFloat(a,b,c)},chanceRoll:function(a){return"undefined"==typeof a&&(a=50),0>=a?!1:a>=100?!0:100*Math.random()>=a?!1:!0},numberArray:function(a,b){for(var c=[],d=a;b>=d;d++)c.push(d);return c},maxAdd:function(a,b,c){return a+=b,a>c&&(a=c),a},minSub:function(a,b,c){return a-=b,c>a&&(a=c),a},wrap:function(a,b,c){var d=c-b;if(0>=d)return 0;var e=(a-b)%d;return 0>e&&(e+=d),e+b},wrapValue:function(a,b,c){var d;return a=Math.abs(a),b=Math.abs(b),c=Math.abs(c),d=(a+b)%c},randomSign:function(){return Math.random()>.5?1:-1},isOdd:function(a){return 1&a},isEven:function(a){return 1&a?!1:!0},max:function(){for(var a=1,b=0,c=arguments.length;c>a;a++)arguments[b]<arguments[a]&&(b=a);return arguments[b]},min:function(){if(1===arguments.length&&"object"==typeof arguments[0])var a=arguments[0];else var a=arguments;for(var b=1,c=0,d=a.length;d>b;b++)a[b]<a[c]&&(c=b);return a[c]},max:function(){if(1===arguments.length&&"object"==typeof arguments[0])var a=arguments[0];else var a=arguments;for(var b=1,c=0,d=a.length;d>b;b++)a[b]>a[c]&&(c=b);return a[c]},minProperty:function(a){if(2===arguments.length&&"object"==typeof arguments[1])var b=arguments[1];else var b=arguments.slice(1);for(var c=1,d=0,e=b.length;e>c;c++)b[c][a]<b[d][a]&&(d=c);return b[d][a]},maxProperty:function(a){if(2===arguments.length&&"object"==typeof arguments[1])var b=arguments[1];else var b=arguments.slice(1);for(var c=1,d=0,e=b.length;e>c;c++)b[c][a]>b[d][a]&&(d=c);return b[d][a]},wrapAngle:function(a){return this.wrap(a,-180,180)},angleLimit:function(a,b,c){var d=a;return a>c?d=c:b>a&&(d=b),d},linearInterpolation:function(a,b){var c=a.length-1,d=c*b,e=Math.floor(d);return 0>b?this.linear(a[0],a[1],d):b>1?this.linear(a[c],a[c-1],c-d):this.linear(a[e],a[e+1>c?c:e+1],d-e)},bezierInterpolation:function(a,b){for(var c=0,d=a.length-1,e=0;d>=e;e++)c+=Math.pow(1-b,d-e)*Math.pow(b,e)*a[e]*this.bernstein(d,e);return c},catmullRomInterpolation:function(a,b){var c=a.length-1,d=c*b,e=Math.floor(d);return a[0]===a[c]?(0>b&&(e=Math.floor(d=c*(1+b))),this.catmullRom(a[(e-1+c)%c],a[e],a[(e+1)%c],a[(e+2)%c],d-e)):0>b?a[0]-(this.catmullRom(a[0],a[0],a[1],a[1],-d)-a[0]):b>1?a[c]-(this.catmullRom(a[c],a[c],a[c-1],a[c-1],d-c)-a[c]):this.catmullRom(a[e?e-1:0],a[e],a[e+1>c?c:e+1],a[e+2>c?c:e+2],d-e)},linear:function(a,b,c){return(b-a)*c+a},bernstein:function(a,b){return this.factorial(a)/this.factorial(b)/this.factorial(a-b)},catmullRom:function(a,b,c,d,e){var f=.5*(c-a),g=.5*(d-b),h=e*e,i=e*h;return(2*b-2*c+f+g)*i+(-3*b+3*c-2*f-g)*h+f*e+b},difference:function(a,b){return Math.abs(a-b)},getRandom:function(a,b,c){if("undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=0),null!=a){var d=c;if((0===d||d>a.length-b)&&(d=a.length-b),d>0)return a[b+Math.floor(Math.random()*d)]}return null},floor:function(a){var b=0|a;return a>0?b:b!=a?b-1:b},ceil:function(a){var b=0|a;return a>0?b!=a?b+1:b:b},sinCosGenerator:function(a,b,c,d){"undefined"==typeof b&&(b=1),"undefined"==typeof c&&(c=1),"undefined"==typeof d&&(d=1);for(var e=b,f=c,g=d*Math.PI/a,h=[],i=[],j=0;a>j;j++)f-=e*g,e+=f*g,h[j]=f,i[j]=e;return{sin:i,cos:h,length:a}},shift:function(a){var b=a.shift();return a.push(b),b},shuffleArray:function(a){for(var b=a.length-1;b>0;b--){var c=Math.floor(Math.random()*(b+1)),d=a[b];a[b]=a[c],a[c]=d}return a},distance:function(a,b,c,d){var e=a-c,f=b-d;return Math.sqrt(e*e+f*f)},distancePow:function(a,b,c,d,e){return"undefined"==typeof e&&(e=2),Math.sqrt(Math.pow(c-a,e)+Math.pow(d-b,e))},distanceRounded:function(a,b,d,e){return Math.round(c.Math.distance(a,b,d,e))},clamp:function(a,b,c){return b>a?b:a>c?c:a},clampBottom:function(a,b){return b>a?b:a},within:function(a,b,c){return Math.abs(a-b)<=c},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},smoothstep:function(a,b,c){return b>=a?0:a>=c?1:(a=(a-b)/(c-b),a*a*(3-2*a))},smootherstep:function(a,b,c){return b>=a?0:a>=c?1:(a=(a-b)/(c-b),a*a*a*(a*(6*a-15)+10))},sign:function(a){return 0>a?-1:a>0?1:0},degToRad:function(){var a=Math.PI/180;return function(b){return b*a}}(),radToDeg:function(){var a=180/Math.PI;return function(b){return b*a}}()},c.QuadTree=function(a,b,c,d,e,f,g){this.maxObjects=e||10,this.maxLevels=f||4,this.level=g||0,this.bounds={x:Math.round(a),y:Math.round(b),width:c,height:d,subWidth:Math.floor(c/2),subHeight:Math.floor(d/2),right:Math.round(a)+Math.floor(c/2),bottom:Math.round(b)+Math.floor(d/2)},this.objects=[],this.nodes=[]},c.QuadTree.prototype={populate:function(a){a.forEach(this.populateHandler,this,!0)},populateHandler:function(a){a.body&&a.body.checkCollision.none===!1&&a.alive&&this.insert(a.body)},split:function(){this.level++,this.nodes[0]=new c.QuadTree(this.bounds.right,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level),this.nodes[1]=new c.QuadTree(this.bounds.x,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level),this.nodes[2]=new c.QuadTree(this.bounds.x,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level),this.nodes[3]=new c.QuadTree(this.bounds.right,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level)},insert:function(a){var b,c=0;if(null!=this.nodes[0]&&(b=this.getIndex(a),-1!==b))return this.nodes[b].insert(a),void 0;if(this.objects.push(a),this.objects.length>this.maxObjects&&this.level<this.maxLevels)for(null==this.nodes[0]&&this.split();c<this.objects.length;)b=this.getIndex(this.objects[c]),-1!==b?this.nodes[b].insert(this.objects.splice(c,1)[0]):c++},getIndex:function(a){var b=-1;return a.x<this.bounds.right&&a.right<this.bounds.right?a.y<this.bounds.bottom&&a.bottom<this.bounds.bottom?b=1:a.y>this.bounds.bottom&&(b=2):a.x>this.bounds.right&&(a.y<this.bounds.bottom&&a.bottom<this.bounds.bottom?b=0:a.y>this.bounds.bottom&&(b=3)),b},retrieve:function(a){var b=this.objects;return a.body.quadTreeIndex=this.getIndex(a.body),this.nodes[0]&&(-1!==a.body.quadTreeIndex?b=b.concat(this.nodes[a.body.quadTreeIndex].retrieve(a)):(b=b.concat(this.nodes[0].retrieve(a)),b=b.concat(this.nodes[1].retrieve(a)),b=b.concat(this.nodes[2].retrieve(a)),b=b.concat(this.nodes[3].retrieve(a)))),b},clear:function(){this.objects=[];for(var a=0,b=this.nodes.length;b>a;a++)this.nodes[a]&&(this.nodes[a].clear(),delete this.nodes[a])}},c.QuadTree.prototype.constructor=c.QuadTree,c.Circle=function(a,b,c){a=a||0,b=b||0,c=c||0,this.x=a,this.y=b,this._diameter=c,this._radius=c>0?.5*c:0},c.Circle.prototype={circumference:function(){return 2*Math.PI*this._radius},setTo:function(a,b,c){return this.x=a,this.y=b,this._diameter=c,this._radius=.5*c,this},copyFrom:function(a){return this.setTo(a.x,a.y,a.diameter)},copyTo:function(a){return a.x=this.x,a.y=this.y,a.diameter=this._diameter,a},distance:function(a,b){return"undefined"==typeof b&&(b=!1),b?c.Math.distanceRound(this.x,this.y,a.x,a.y):c.Math.distance(this.x,this.y,a.x,a.y)},clone:function(a){return"undefined"==typeof a&&(a=new c.Circle),a.setTo(this.x,this.y,this.diameter)},contains:function(a,b){return c.Circle.contains(this,a,b)},circumferencePoint:function(a,b,d){return c.Circle.circumferencePoint(this,a,b,d)},offset:function(a,b){return this.x+=a,this.y+=b,this},offsetPoint:function(a){return this.offset(a.x,a.y)},toString:function(){return"[{Phaser.Circle (x="+this.x+" y="+this.y+" diameter="+this.diameter+" radius="+this.radius+")}]"}},c.Circle.prototype.constructor=c.Circle,Object.defineProperty(c.Circle.prototype,"diameter",{get:function(){return this._diameter},set:function(a){a>0&&(this._diameter=a,this._radius=.5*a)}}),Object.defineProperty(c.Circle.prototype,"radius",{get:function(){return this._radius},set:function(a){a>0&&(this._radius=a,this._diameter=2*a)}}),Object.defineProperty(c.Circle.prototype,"left",{get:function(){return this.x-this._radius},set:function(a){a>this.x?(this._radius=0,this._diameter=0):this.radius=this.x-a}}),Object.defineProperty(c.Circle.prototype,"right",{get:function(){return this.x+this._radius},set:function(a){a<this.x?(this._radius=0,this._diameter=0):this.radius=a-this.x}}),Object.defineProperty(c.Circle.prototype,"top",{get:function(){return this.y-this._radius},set:function(a){a>this.y?(this._radius=0,this._diameter=0):this.radius=this.y-a}}),Object.defineProperty(c.Circle.prototype,"bottom",{get:function(){return this.y+this._radius},set:function(a){a<this.y?(this._radius=0,this._diameter=0):this.radius=a-this.y}}),Object.defineProperty(c.Circle.prototype,"area",{get:function(){return this._radius>0?Math.PI*this._radius*this._radius:0}}),Object.defineProperty(c.Circle.prototype,"empty",{get:function(){return 0===this._diameter},set:function(a){a===!0&&this.setTo(0,0,0)}}),c.Circle.contains=function(a,b,c){if(b>=a.left&&b<=a.right&&c>=a.top&&c<=a.bottom){var d=(a.x-b)*(a.x-b),e=(a.y-c)*(a.y-c);return d+e<=a.radius*a.radius}return!1},c.Circle.equals=function(a,b){return a.x==b.x&&a.y==b.y&&a.diameter==b.diameter},c.Circle.intersects=function(a,b){return c.Math.distance(a.x,a.y,b.x,b.y)<=a.radius+b.radius},c.Circle.circumferencePoint=function(a,b,d,e){return"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=new c.Point),d===!0&&(b=c.Math.radToDeg(b)),e.x=a.x+a.radius*Math.cos(b),e.y=a.y+a.radius*Math.sin(b),e},c.Circle.intersectsRectangle=function(a,b){var c=Math.abs(a.x-b.x-b.halfWidth),d=b.halfWidth+a.radius;if(c>d)return!1;var e=Math.abs(a.y-b.y-b.halfHeight),f=b.halfHeight+a.radius;if(e>f)return!1;if(c<=b.halfWidth||e<=b.halfHeight)return!0;var g=c-b.halfWidth,h=e-b.halfHeight,i=g*g,j=h*h,k=a.radius*a.radius;return k>=i+j},c.Point=function(a,b){a=a||0,b=b||0,this.x=a,this.y=b},c.Point.prototype={copyFrom:function(a){return this.setTo(a.x,a.y)},invert:function(){return this.setTo(this.y,this.x)},setTo:function(a,b){return this.x=a,this.y=b,this},add:function(a,b){return this.x+=a,this.y+=b,this},subtract:function(a,b){return this.x-=a,this.y-=b,this},multiply:function(a,b){return this.x*=a,this.y*=b,this},divide:function(a,b){return this.x/=a,this.y/=b,this},clampX:function(a,b){return this.x=c.Math.clamp(this.x,a,b),this},clampY:function(a,b){return this.y=c.Math.clamp(this.y,a,b),this},clamp:function(a,b){return this.x=c.Math.clamp(this.x,a,b),this.y=c.Math.clamp(this.y,a,b),this},clone:function(a){return"undefined"==typeof a&&(a=new c.Point),a.setTo(this.x,this.y)},copyTo:function(a){return a.x=this.x,a.y=this.y,a},distance:function(a,b){return c.Point.distance(this,a,b)},equals:function(a){return a.x==this.x&&a.y==this.y},rotate:function(a,b,d,e,f){return c.Point.rotate(this,a,b,d,e,f)},getMagnitude:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},setMagnitude:function(a){return this.normalize().multiply(a,a)},normalize:function(){if(!this.isZero()){var a=this.getMagnitude();this.x/=a,this.y/=a}return this},isZero:function(){return 0===this.x&&0===this.y},toString:function(){return"[{Point (x="+this.x+" y="+this.y+")}]"}},c.Point.prototype.constructor=c.Point,c.Point.add=function(a,b,d){return"undefined"==typeof d&&(d=new c.Point),d.x=a.x+b.x,d.y=a.y+b.y,d},c.Point.subtract=function(a,b,d){return"undefined"==typeof d&&(d=new c.Point),d.x=a.x-b.x,d.y=a.y-b.y,d},c.Point.multiply=function(a,b,d){return"undefined"==typeof d&&(d=new c.Point),d.x=a.x*b.x,d.y=a.y*b.y,d},c.Point.divide=function(a,b,d){return"undefined"==typeof d&&(d=new c.Point),d.x=a.x/b.x,d.y=a.y/b.y,d},c.Point.equals=function(a,b){return a.x==b.x&&a.y==b.y},c.Point.distance=function(a,b,d){return"undefined"==typeof d&&(d=!1),d?c.Math.distanceRound(a.x,a.y,b.x,b.y):c.Math.distance(a.x,a.y,b.x,b.y)},c.Point.rotate=function(a,b,d,e,f,g){return f=f||!1,g=g||null,f&&(e=c.Math.degToRad(e)),null===g&&(g=Math.sqrt((b-a.x)*(b-a.x)+(d-a.y)*(d-a.y))),a.setTo(b+g*Math.cos(e),d+g*Math.sin(e))},c.Rectangle=function(a,b,c,d){a=a||0,b=b||0,c=c||0,d=d||0,this.x=a,this.y=b,this.width=c,this.height=d},c.Rectangle.prototype={offset:function(a,b){return this.x+=a,this.y+=b,this},offsetPoint:function(a){return this.offset(a.x,a.y)},setTo:function(a,b,c,d){return this.x=a,this.y=b,this.width=c,this.height=d,this},floor:function(){this.x=Math.floor(this.x),this.y=Math.floor(this.y)},floorAll:function(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.width=Math.floor(this.width),this.height=Math.floor(this.height)},copyFrom:function(a){return this.setTo(a.x,a.y,a.width,a.height)},copyTo:function(a){return a.x=this.x,a.y=this.y,a.width=this.width,a.height=this.height,a},inflate:function(a,b){return c.Rectangle.inflate(this,a,b)},size:function(a){return c.Rectangle.size(this,a)},clone:function(a){return c.Rectangle.clone(this,a)},contains:function(a,b){return c.Rectangle.contains(this,a,b)},containsRect:function(a){return c.Rectangle.containsRect(this,a)},equals:function(a){return c.Rectangle.equals(this,a)},intersection:function(a,b){return c.Rectangle.intersection(this,a,b)},intersects:function(a,b){return c.Rectangle.intersects(this,a,b)},intersectsRaw:function(a,b,d,e,f){return c.Rectangle.intersectsRaw(this,a,b,d,e,f)},union:function(a,b){return c.Rectangle.union(this,a,b)},toString:function(){return"[{Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" empty="+this.empty+")}]"}},c.Rectangle.prototype.constructor=c.Rectangle,Object.defineProperty(c.Rectangle.prototype,"halfWidth",{get:function(){return Math.round(this.width/2)}}),Object.defineProperty(c.Rectangle.prototype,"halfHeight",{get:function(){return Math.round(this.height/2)}}),Object.defineProperty(c.Rectangle.prototype,"bottom",{get:function(){return this.y+this.height},set:function(a){this.height=a<=this.y?0:this.y-a}}),Object.defineProperty(c.Rectangle.prototype,"bottomRight",{get:function(){return new c.Point(this.right,this.bottom)},set:function(a){this.right=a.x,this.bottom=a.y}}),Object.defineProperty(c.Rectangle.prototype,"left",{get:function(){return this.x},set:function(a){this.width=a>=this.right?0:this.right-a,this.x=a}}),Object.defineProperty(c.Rectangle.prototype,"right",{get:function(){return this.x+this.width},set:function(a){this.width=a<=this.x?0:this.x+a}}),Object.defineProperty(c.Rectangle.prototype,"volume",{get:function(){return this.width*this.height}}),Object.defineProperty(c.Rectangle.prototype,"perimeter",{get:function(){return 2*this.width+2*this.height}}),Object.defineProperty(c.Rectangle.prototype,"centerX",{get:function(){return this.x+this.halfWidth},set:function(a){this.x=a-this.halfWidth}}),Object.defineProperty(c.Rectangle.prototype,"centerY",{get:function(){return this.y+this.halfHeight},set:function(a){this.y=a-this.halfHeight}}),Object.defineProperty(c.Rectangle.prototype,"top",{get:function(){return this.y},set:function(a){a>=this.bottom?(this.height=0,this.y=a):this.height=this.bottom-a}}),Object.defineProperty(c.Rectangle.prototype,"topLeft",{get:function(){return new c.Point(this.x,this.y)},set:function(a){this.x=a.x,this.y=a.y}}),Object.defineProperty(c.Rectangle.prototype,"empty",{get:function(){return!this.width||!this.height},set:function(a){a===!0&&this.setTo(0,0,0,0)}}),c.Rectangle.inflate=function(a,b,c){return a.x-=b,a.width+=2*b,a.y-=c,a.height+=2*c,a},c.Rectangle.inflatePoint=function(a,b){return c.Rectangle.inflate(a,b.x,b.y)},c.Rectangle.size=function(a,b){return"undefined"==typeof b&&(b=new c.Point),b.setTo(a.width,a.height)},c.Rectangle.clone=function(a,b){return"undefined"==typeof b&&(b=new c.Rectangle),b.setTo(a.x,a.y,a.width,a.height)},c.Rectangle.contains=function(a,b,c){return b>=a.x&&b<=a.right&&c>=a.y&&c<=a.bottom},c.Rectangle.containsRaw=function(a,b,c,d,e,f){return e>=a&&a+c>=e&&f>=b&&b+d>=f},c.Rectangle.containsPoint=function(a,b){return c.Rectangle.contains(a,b.x,b.y)},c.Rectangle.containsRect=function(a,b){return a.volume>b.volume?!1:a.x>=b.x&&a.y>=b.y&&a.right<=b.right&&a.bottom<=b.bottom},c.Rectangle.equals=function(a,b){return a.x==b.x&&a.y==b.y&&a.width==b.width&&a.height==b.height},c.Rectangle.intersection=function(a,b,d){return d=d||new c.Rectangle,c.Rectangle.intersects(a,b)&&(d.x=Math.max(a.x,b.x),d.y=Math.max(a.y,b.y),d.width=Math.min(a.right,b.right)-d.x,d.height=Math.min(a.bottom,b.bottom)-d.y),d},c.Rectangle.intersects=function(a,b){return a.width<=0||a.height<=0||b.width<=0||b.height<=0?!1:!(a.right<b.x||a.bottom<b.y||a.x>b.right||a.y>b.bottom)},c.Rectangle.intersectsRaw=function(a,b,c,d,e,f){return"undefined"==typeof f&&(f=0),!(b>a.right+f||c<a.left-f||d>a.bottom+f||e<a.top-f)},c.Rectangle.union=function(a,b,d){return"undefined"==typeof d&&(d=new c.Rectangle),d.setTo(Math.min(a.x,b.x),Math.min(a.y,b.y),Math.max(a.right,b.right)-Math.min(a.left,b.left),Math.max(a.bottom,b.bottom)-Math.min(a.top,b.top))},c.Polygon=function(a){b.Polygon.call(this,a),this.type=c.POLYGON},c.Polygon.prototype=Object.create(b.Polygon.prototype),c.Polygon.prototype.constructor=c.Polygon,c.Line=function(a,b,d,e){a=a||0,b=b||0,d=d||0,e=e||0,this.start=new c.Point(a,b),this.end=new c.Point(d,e)},c.Line.prototype={setTo:function(a,b,c,d){return this.start.setTo(a,b),this.end.setTo(c,d),this},fromSprite:function(a,b,c){return"undefined"==typeof c&&(c=!0),c?this.setTo(a.center.x,a.center.y,b.center.x,b.center.y):this.setTo(a.x,a.y,b.x,b.y)},intersects:function(a,b,d){return c.Line.intersectsPoints(this.start,this.end,a.start,a.end,b,d)},pointOnLine:function(a,b){return(a-this.start.x)*(this.end.y-this.end.y)===(this.end.x-this.start.x)*(b-this.end.y)},pointOnSegment:function(a,b){var c=Math.min(this.start.x,this.end.x),d=Math.max(this.start.x,this.end.x),e=Math.min(this.start.y,this.end.y),f=Math.max(this.start.y,this.end.y);return this.pointOnLine(a,b)&&a>=c&&d>=a&&b>=e&&f>=b}},Object.defineProperty(c.Line.prototype,"length",{get:function(){return Math.sqrt((this.end.x-this.start.x)*(this.end.x-this.start.x)+(this.end.y-this.start.y)*(this.end.y-this.start.y))}}),Object.defineProperty(c.Line.prototype,"angle",{get:function(){return Math.atan2(this.end.x-this.start.x,this.end.y-this.start.y)}}),Object.defineProperty(c.Line.prototype,"slope",{get:function(){return(this.end.y-this.start.y)/(this.end.x-this.start.x)}}),Object.defineProperty(c.Line.prototype,"perpSlope",{get:function(){return-((this.end.x-this.start.x)/(this.end.y-this.start.y))}}),c.Line.intersectsPoints=function(a,b,d,e,f,g){"undefined"==typeof f&&(f=!0),"undefined"==typeof g&&(g=new c.Point);var h=b.y-a.y,i=e.y-d.y,j=a.x-b.x,k=d.x-e.x,l=b.x*a.y-a.x*b.y,m=e.x*d.y-d.x*e.y,n=h*k-i*j;if(0===n)return null;if(g.x=(j*m-k*l)/n,g.y=(i*l-h*m)/n,f){if(Math.pow(g.x-b.x+(g.y-b.y),2)>Math.pow(a.x-b.x+(a.y-b.y),2))return null;if(Math.pow(g.x-a.x+(g.y-a.y),2)>Math.pow(a.x-b.x+(a.y-b.y),2))return null;if(Math.pow(g.x-e.x+(g.y-e.y),2)>Math.pow(d.x-e.x+(d.y-e.y),2))return null;if(Math.pow(g.x-d.x+(g.y-d.y),2)>Math.pow(d.x-e.x+(d.y-e.y),2))return null}return g},c.Line.intersects=function(a,b,d,e){return c.Line.intersectsPoints(a.start,a.end,b.start,b.end,d,e)},c.Net=function(a){this.game=a},c.Net.prototype={getHostName:function(){return window.location&&window.location.hostname?window.location.hostname:null},checkDomainName:function(a){return-1!==window.location.hostname.indexOf(a)},updateQueryString:function(a,b,c,d){"undefined"==typeof c&&(c=!1),("undefined"==typeof d||""===d)&&(d=window.location.href);var e="",f=new RegExp("([?|&])"+a+"=.*?(&|#|$)(.*)","gi");if(f.test(d))e="undefined"!=typeof b&&null!==b?d.replace(f,"$1"+a+"="+b+"$2$3"):d.replace(f,"$1$3").replace(/(&|\?)$/,"");else if("undefined"!=typeof b&&null!==b){var g=-1!==d.indexOf("?")?"&":"?",h=d.split("#");d=h[0]+g+a+"="+b,h[1]&&(d+="#"+h[1]),e=d}else e=d;return c?(window.location.href=e,void 0):e},getQueryString:function(a){"undefined"==typeof a&&(a="");var b={},c=location.search.substring(1).split("&");for(var d in c){var e=c[d].split("=");if(e.length>1){if(a&&a==this.decodeURI(e[0]))return this.decodeURI(e[1]);b[this.decodeURI(e[0])]=this.decodeURI(e[1])}}return b},decodeURI:function(a){return decodeURIComponent(a.replace(/\+/g," "))}},c.Net.prototype.constructor=c.Net,c.TweenManager=function(a){this.game=a,this._tweens=[],this._add=[],this.game.onPause.add(this.pauseAll,this),this.game.onResume.add(this.resumeAll,this)},c.TweenManager.prototype={getAll:function(){return this._tweens},removeAll:function(){for(var a=0;a<this._tweens.length;a++)this._tweens[a].pendingDelete=!0;this._add=[]},add:function(a){this._add.push(a)},create:function(a){return new c.Tween(a,this.game)},remove:function(a){var b=this._tweens.indexOf(a);-1!==b&&(this._tweens[b].pendingDelete=!0)},update:function(){if(0===this._tweens.length&&0===this._add.length)return!1;for(var a=0,b=this._tweens.length;b>a;)this._tweens[a].update(this.game.time.now)?a++:(this._tweens.splice(a,1),b--);return this._add.length>0&&(this._tweens=this._tweens.concat(this._add),this._add.length=0),!0},isTweening:function(a){return this._tweens.some(function(b){return b._object===a})},pauseAll:function(){for(var a=this._tweens.length-1;a>=0;a--)this._tweens[a].pause()},resumeAll:function(){for(var a=this._tweens.length-1;a>=0;a--)this._tweens[a].resume()}},c.TweenManager.prototype.constructor=c.TweenManager,c.Tween=function(a,b){this._object=a,this.game=b,this._manager=this.game.tweens,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._repeat=0,this._yoyo=!1,this._reversed=!1,this._delayTime=0,this._startTime=null,this._easingFunction=c.Easing.Linear.None,this._interpolationFunction=c.Math.linearInterpolation,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onUpdateCallback=null,this._onUpdateCallbackContext=null,this._pausedTime=0,this.pendingDelete=!1;for(var d in a)this._valuesStart[d]=parseFloat(a[d],10);this.onStart=new c.Signal,this.onLoop=new c.Signal,this.onComplete=new c.Signal,this.isRunning=!1},c.Tween.prototype={to:function(a,b,c,d,e,f,g){b=b||1e3,c=c||null,d=d||!1,e=e||0,f=f||0,g=g||!1;var h;return this._parent?(h=this._manager.create(this._object),this._lastChild.chain(h),this._lastChild=h):(h=this,this._parent=this,this._lastChild=this),h._repeat=f,h._duration=b,h._valuesEnd=a,null!==c&&(h._easingFunction=c),e>0&&(h._delayTime=e),h._yoyo=g,d?this.start():this},start:function(){if(null!==this.game&&null!==this._object){this._manager.add(this),this.isRunning=!0,this._onStartCallbackFired=!1,this._startTime=this.game.time.now+this._delayTime;for(var a in this._valuesEnd){if(this._valuesEnd[a]instanceof Array){if(0===this._valuesEnd[a].length)continue;this._valuesEnd[a]=[this._object[a]].concat(this._valuesEnd[a])}this._valuesStart[a]=this._object[a],this._valuesStart[a]instanceof Array==!1&&(this._valuesStart[a]*=1),this._valuesStartRepeat[a]=this._valuesStart[a]||0}return this}},stop:function(){return this.isRunning=!1,this._onUpdateCallback=null,this._manager.remove(this),this},delay:function(a){return this._delayTime=a,this},repeat:function(a){return this._repeat=a,this},yoyo:function(a){return this._yoyo=a,this},easing:function(a){return this._easingFunction=a,this},interpolation:function(a){return this._interpolationFunction=a,this},chain:function(){return this._chainedTweens=arguments,this},loop:function(){return this._lastChild.chain(this),this},onUpdateCallback:function(a,b){return this._onUpdateCallback=a,this._onUpdateCallbackContext=b,this},pause:function(){this._paused=!0,this._pausedTime=this.game.time.now},resume:function(){this._paused=!1,this._startTime+=this.game.time.now-this._pausedTime},update:function(a){if(this.pendingDelete)return!1;if(this._paused||a<this._startTime)return!0;var b;if(a<this._startTime)return!0;this._onStartCallbackFired===!1&&(this.onStart.dispatch(this._object),this._onStartCallbackFired=!0);var c=(a-this._startTime)/this._duration;c=c>1?1:c;var d=this._easingFunction(c);for(b in this._valuesEnd){var e=this._valuesStart[b]||0,f=this._valuesEnd[b];f instanceof Array?this._object[b]=this._interpolationFunction(f,d):("string"==typeof f&&(f=e+parseFloat(f,10)),"number"==typeof f&&(this._object[b]=e+(f-e)*d))}if(null!==this._onUpdateCallback&&this._onUpdateCallback.call(this._onUpdateCallbackContext,this,d),1==c){if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(b in this._valuesStartRepeat){if("string"==typeof this._valuesEnd[b]&&(this._valuesStartRepeat[b]=this._valuesStartRepeat[b]+parseFloat(this._valuesEnd[b],10)),this._yoyo){var g=this._valuesStartRepeat[b];this._valuesStartRepeat[b]=this._valuesEnd[b],this._valuesEnd[b]=g,this._reversed=!this._reversed}this._valuesStart[b]=this._valuesStartRepeat[b]}return this._startTime=a+this._delayTime,this.onLoop.dispatch(this._object),!0}this.isRunning=!1,this.onComplete.dispatch(this._object);for(var h=0,i=this._chainedTweens.length;i>h;h++)this._chainedTweens[h].start(a);return!1}return!0}},c.Tween.prototype.constructor=c.Tween,c.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return(a*=2)<1?.5*a*a:-.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return(a*=2)<1?.5*a*a*a:.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return(a*=2)<1?.5*a*a*a*a:-.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return(a*=2)<1?.5*a*a*a*a*a:.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 1-Math.cos(a*Math.PI/2)},Out:function(a){return Math.sin(a*Math.PI/2)},InOut:function(a){return.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:(a*=2)<1?.5*Math.pow(1024,a-1):.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),-(c*Math.pow(2,10*(a-=1))*Math.sin((a-b)*2*Math.PI/d)))},Out:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),c*Math.pow(2,-10*a)*Math.sin((a-b)*2*Math.PI/d)+1)},InOut:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),(a*=2)<1?-.5*c*Math.pow(2,10*(a-=1))*Math.sin((a-b)*2*Math.PI/d):.5*c*Math.pow(2,-10*(a-=1))*Math.sin((a-b)*2*Math.PI/d)+1)}},Back:{In:function(a){var b=1.70158;return a*a*((b+1)*a-b)},Out:function(a){var b=1.70158;return--a*a*((b+1)*a+b)+1},InOut:function(a){var b=2.5949095;return(a*=2)<1?.5*a*a*((b+1)*a-b):.5*((a-=2)*a*((b+1)*a+b)+2)}},Bounce:{In:function(a){return 1-c.Easing.Bounce.Out(1-a)},Out:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},InOut:function(a){return.5>a?.5*c.Easing.Bounce.In(2*a):.5*c.Easing.Bounce.Out(2*a-1)+.5}}},c.Time=function(a){this.game=a,this.time=0,this.now=0,this.elapsed=0,this.pausedTime=0,this.fps=0,this.fpsMin=1e3,this.fpsMax=0,this.msMin=1e3,this.msMax=0,this.physicsElapsed=0,this.frames=0,this.pauseDuration=0,this.timeToCall=0,this.lastTime=0,this.events=new c.Timer(this.game,!1),this._started=0,this._timeLastSecond=0,this._pauseStarted=0,this._justResumed=!1,this._timers=[],this._len=0,this._i=0,this.game.onPause.add(this.gamePaused,this),this.game.onResume.add(this.gameResumed,this)},c.Time.prototype={boot:function(){this.events.start()},create:function(a){"undefined"==typeof a&&(a=!0);var b=new c.Timer(this.game,a);return this._timers.push(b),b},removeAll:function(){for(var a=0;a<this._timers.length;a++)this._timers[a].destroy();this._timers=[]},update:function(a){if(this.now=a,this._justResumed){this.time=this.now,this._justResumed=!1,this.events.resume();for(var b=0;b<this._timers.length;b++)this._timers[b].resume()}if(this.timeToCall=this.game.math.max(0,16-(a-this.lastTime)),this.elapsed=this.now-this.time,this.msMin=this.game.math.min(this.msMin,this.elapsed),this.msMax=this.game.math.max(this.msMax,this.elapsed),this.frames++,this.now>this._timeLastSecond+1e3&&(this.fps=Math.round(1e3*this.frames/(this.now-this._timeLastSecond)),this.fpsMin=this.game.math.min(this.fpsMin,this.fps),this.fpsMax=this.game.math.max(this.fpsMax,this.fps),this._timeLastSecond=this.now,this.frames=0),this.time=this.now,this.lastTime=a+this.timeToCall,this.physicsElapsed=1*(this.elapsed/1e3),this.physicsElapsed>.05&&(this.physicsElapsed=.05),this.game.paused)this.pausedTime=this.now-this._pauseStarted;else for(this.events.update(this.now),this._i=0,this._len=this._timers.length;this._i<this._len;)this._timers[this._i].update(this.now)?this._i++:(this._timers.splice(this._i,1),this._len--)},gamePaused:function(){this._pauseStarted=this.now,this.events.pause();for(var a=0;a<this._timers.length;a++)this._timers[a].pause()},gameResumed:function(){this.time=Date.now(),this.pauseDuration=this.pausedTime,this._justResumed=!0},totalElapsedSeconds:function(){return.001*(this.now-this._started)},elapsedSince:function(a){return this.now-a},elapsedSecondsSince:function(a){return.001*(this.now-a)},reset:function(){this._started=this.now}},c.Time.prototype.constructor=c.Time,c.Timer=function(a,b){"undefined"==typeof b&&(b=!0),this.game=a,this.running=!1,this.autoDestroy=b,this.expired=!1,this.events=[],this.onComplete=new c.Signal,this.nextTick=0,this.paused=!1,this._started=0,this._pauseStarted=0,this._now=0,this._len=0,this._i=0},c.Timer.MINUTE=6e4,c.Timer.SECOND=1e3,c.Timer.HALF=500,c.Timer.QUARTER=250,c.Timer.prototype={create:function(a,b,d,e,f,g){var h=a;this.running&&(h+=this._now);var i=new c.TimerEvent(this,a,h,d,b,e,f,g);return this.events.push(i),this.order(),this.expired=!1,i},add:function(a,b,c){return this.create(a,!1,0,b,c,Array.prototype.splice.call(arguments,3))
},repeat:function(a,b,c,d){return this.create(a,!1,b,c,d,Array.prototype.splice.call(arguments,4))},loop:function(a,b,c){return this.create(a,!0,0,b,c,Array.prototype.splice.call(arguments,3))},start:function(){this._started=this.game.time.now,this.running=!0},stop:function(){this.running=!1,this.events.length=0},remove:function(a){for(var b=0;b<this.events.length;b++)if(this.events[b]===a)return this.events[b].pendingDelete=!0,!0;return!1},order:function(){this.events.length>0&&(this.events.sort(this.sortHandler),this.nextTick=this.events[0].tick)},sortHandler:function(a,b){return a.tick<b.tick?-1:a.tick>b.tick?1:0},update:function(a){if(this.paused)return!0;for(this._now=a-this._started,this._len=this.events.length,this._i=0;this._i<this._len;)this.events[this._i].pendingDelete&&(this.events.splice(this._i,1),this._len--),this._i++;if(this._len=this.events.length,this.running&&this._now>=this.nextTick&&this._len>0){for(this._i=0;this._i<this._len&&this._now>=this.events[this._i].tick;)this.events[this._i].loop===!0?(this.events[this._i].tick+=this.events[this._i].delay-(this._now-this.events[this._i].tick),this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args)):this.events[this._i].repeatCount>0?(this.events[this._i].repeatCount--,this.events[this._i].tick+=this.events[this._i].delay-(this._now-this.events[this._i].tick),this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args)):(this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args),this.events.splice(this._i,1),this._len--),this._i++;this.events.length>0?this.order():(this.expired=!0,this.onComplete.dispatch(this))}return this.expired&&this.autoDestroy?!1:!0},pause:function(){this.running&&!this.expired&&(this._pauseStarted=this.game.time.now,this.paused=!0)},resume:function(){if(this.running&&!this.expired){for(var a=this.game.time.now-this._pauseStarted,b=0;b<this.events.length;b++)this.events[b].tick+=a;this.nextTick+=a,this.paused=!1}},destroy:function(){this.onComplete.removeAll(),this.running=!1,this.events=[],this._i=this._len}},Object.defineProperty(c.Timer.prototype,"next",{get:function(){return this.nextTick}}),Object.defineProperty(c.Timer.prototype,"duration",{get:function(){return this.running&&this.nextTick>this._now?this.nextTick-this._now:0}}),Object.defineProperty(c.Timer.prototype,"length",{get:function(){return this.events.length}}),Object.defineProperty(c.Timer.prototype,"ms",{get:function(){return this._now}}),Object.defineProperty(c.Timer.prototype,"seconds",{get:function(){return.001*this._now}}),c.Timer.prototype.constructor=c.Timer,c.TimerEvent=function(a,b,c,d,e,f,g,h){this.timer=a,this.delay=b,this.tick=c,this.repeatCount=d-1,this.loop=e,this.callback=f,this.callbackContext=g,this.args=h,this.pendingDelete=!1},c.TimerEvent.prototype.constructor=c.TimerEvent,c.AnimationManager=function(a){this.sprite=a,this.game=a.game,this.currentFrame=null,this.updateIfVisible=!0,this.isLoaded=!1,this._frameData=null,this._anims={},this._outputFrames=[]},c.AnimationManager.prototype={loadFrameData:function(a){this._frameData=a,this.frame=0,this.isLoaded=!0},add:function(a,d,e,f,g){return null==this._frameData?(console.warn("No FrameData available for Phaser.Animation "+a),void 0):(e=e||60,"undefined"==typeof f&&(f=!1),"undefined"==typeof g&&(g=d&&"number"==typeof d[0]?!0:!1),null==this.sprite.events.onAnimationStart&&(this.sprite.events.onAnimationStart=new c.Signal,this.sprite.events.onAnimationComplete=new c.Signal,this.sprite.events.onAnimationLoop=new c.Signal),this._outputFrames.length=0,this._frameData.getFrameIndexes(d,g,this._outputFrames),this._anims[a]=new c.Animation(this.game,this.sprite,a,this._frameData,this._outputFrames,e,f),this.currentAnim=this._anims[a],this.currentFrame=this.currentAnim.currentFrame,this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid]),this._anims[a])},validateFrames:function(a,b){"undefined"==typeof b&&(b=!0);for(var c=0;c<a.length;c++)if(b===!0){if(a[c]>this._frameData.total)return!1}else if(this._frameData.checkFrameName(a[c])===!1)return!1;return!0},play:function(a,b,c,d){if(this._anims[a]){if(this.currentAnim!=this._anims[a])return this.currentAnim=this._anims[a],this.currentAnim.paused=!1,this.currentAnim.play(b,c,d);if(this.currentAnim.isPlaying===!1)return this.currentAnim.paused=!1,this.currentAnim.play(b,c,d)}},stop:function(a,b){"undefined"==typeof b&&(b=!1),"string"==typeof a?this._anims[a]&&(this.currentAnim=this._anims[a],this.currentAnim.stop(b)):this.currentAnim&&this.currentAnim.stop(b)},update:function(){return this.updateIfVisible&&this.sprite.visible===!1?!1:this.currentAnim&&this.currentAnim.update()===!0?(this.currentFrame=this.currentAnim.currentFrame,this.sprite.currentFrame=this.currentFrame,!0):!1},getAnimation:function(a){return"string"==typeof a&&this._anims[a]?this._anims[a]:null},refreshFrame:function(){this.sprite.currentFrame=this.currentFrame,this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid])},destroy:function(){this._anims={},this._frameData=null,this._frameIndex=0,this.currentAnim=null,this.currentFrame=null}},c.AnimationManager.prototype.constructor=c.AnimationManager,Object.defineProperty(c.AnimationManager.prototype,"frameData",{get:function(){return this._frameData}}),Object.defineProperty(c.AnimationManager.prototype,"frameTotal",{get:function(){return this._frameData?this._frameData.total:-1}}),Object.defineProperty(c.AnimationManager.prototype,"paused",{get:function(){return this.currentAnim.isPaused},set:function(a){this.currentAnim.paused=a}}),Object.defineProperty(c.AnimationManager.prototype,"frame",{get:function(){return this.currentFrame?this._frameIndex:void 0},set:function(a){"number"==typeof a&&this._frameData&&null!==this._frameData.getFrame(a)&&(this.currentFrame=this._frameData.getFrame(a),this._frameIndex=a,this.sprite.currentFrame=this.currentFrame,this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid]))}}),Object.defineProperty(c.AnimationManager.prototype,"frameName",{get:function(){return this.currentFrame?this.currentFrame.name:void 0},set:function(a){"string"==typeof a&&this._frameData&&null!==this._frameData.getFrameByName(a)?(this.currentFrame=this._frameData.getFrameByName(a),this._frameIndex=this.currentFrame.index,this.sprite.currentFrame=this.currentFrame,this.sprite.setTexture(b.TextureCache[this.currentFrame.uuid])):console.warn("Cannot set frameName: "+a)}}),c.Animation=function(a,b,c,d,e,f,g){this.game=a,this._parent=b,this._frameData=d,this.name=c,this._frames=[],this._frames=this._frames.concat(e),this.delay=1e3/f,this.looped=g,this.killOnComplete=!1,this.isFinished=!1,this.isPlaying=!1,this.isPaused=!1,this._pauseStartTime=0,this._frameIndex=0,this._frameDiff=0,this._frameSkip=1,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex])},c.Animation.prototype={play:function(a,c,d){return"number"==typeof a&&(this.delay=1e3/a),"boolean"==typeof c&&(this.looped=c),"undefined"!=typeof d&&(this.killOnComplete=d),this.isPlaying=!0,this.isFinished=!1,this.paused=!1,this._timeLastFrame=this.game.time.now,this._timeNextFrame=this.game.time.now+this.delay,this._frameIndex=0,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this._parent.setTexture(b.TextureCache[this.currentFrame.uuid]),this._parent.events&&this._parent.events.onAnimationStart.dispatch(this._parent,this),this},restart:function(){this.isPlaying=!0,this.isFinished=!1,this.paused=!1,this._timeLastFrame=this.game.time.now,this._timeNextFrame=this.game.time.now+this.delay,this._frameIndex=0,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex])},stop:function(a){"undefined"==typeof a&&(a=!1),this.isPlaying=!1,this.isFinished=!0,this.paused=!1,a&&(this.currentFrame=this._frameData.getFrame(this._frames[0]))},update:function(){return this.isPaused?!1:this.isPlaying===!0&&this.game.time.now>=this._timeNextFrame?(this._frameSkip=1,this._frameDiff=this.game.time.now-this._timeNextFrame,this._timeLastFrame=this.game.time.now,this._frameDiff>this.delay&&(this._frameSkip=Math.floor(this._frameDiff/this.delay),this._frameDiff-=this._frameSkip*this.delay),this._timeNextFrame=this.game.time.now+(this.delay-this._frameDiff),this._frameIndex+=this._frameSkip,this._frameIndex>=this._frames.length?this.looped?(this._frameIndex%=this._frames.length,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.currentFrame&&this._parent.setTexture(b.TextureCache[this.currentFrame.uuid]),this._parent.events.onAnimationLoop.dispatch(this._parent,this)):this.onComplete():(this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.currentFrame&&this._parent.setTexture(b.TextureCache[this.currentFrame.uuid])),!0):!1},destroy:function(){this.game=null,this._parent=null,this._frames=null,this._frameData=null,this.currentFrame=null,this.isPlaying=!1},onComplete:function(){this.isPlaying=!1,this.isFinished=!0,this.paused=!1,this._parent.events&&this._parent.events.onAnimationComplete.dispatch(this._parent,this),this.killOnComplete&&this._parent.kill()}},c.Animation.prototype.constructor=c.Animation,Object.defineProperty(c.Animation.prototype,"paused",{get:function(){return this.isPaused},set:function(a){this.isPaused=a,a?this._pauseStartTime=this.game.time.now:this.isPlaying&&(this._timeNextFrame=this.game.time.now+this.delay)}}),Object.defineProperty(c.Animation.prototype,"frameTotal",{get:function(){return this._frames.length}}),Object.defineProperty(c.Animation.prototype,"frame",{get:function(){return null!==this.currentFrame?this.currentFrame.index:this._frameIndex},set:function(a){this.currentFrame=this._frameData.getFrame(a),null!==this.currentFrame&&(this._frameIndex=a,this._parent.setTexture(b.TextureCache[this.currentFrame.uuid]))}}),c.Animation.generateFrameNames=function(a,b,d,e,f){"undefined"==typeof e&&(e="");var g=[],h="";if(d>b)for(var i=b;d>=i;i++)h="number"==typeof f?c.Utils.pad(i.toString(),f,"0",1):i.toString(),h=a+h+e,g.push(h);else for(var i=b;i>=d;i--)h="number"==typeof f?c.Utils.pad(i.toString(),f,"0",1):i.toString(),h=a+h+e,g.push(h);return g},c.Frame=function(a,b,d,e,f,g,h){this.index=a,this.x=b,this.y=d,this.width=e,this.height=f,this.name=g,this.uuid=h,this.centerX=Math.floor(e/2),this.centerY=Math.floor(f/2),this.distance=c.Math.distance(0,0,e,f),this.rotated=!1,this.rotationDirection="cw",this.trimmed=!1,this.sourceSizeW=e,this.sourceSizeH=f,this.spriteSourceSizeX=0,this.spriteSourceSizeY=0,this.spriteSourceSizeW=0,this.spriteSourceSizeH=0},c.Frame.prototype={setTrim:function(a,b,c,d,e,f,g){this.trimmed=a,a&&(this.width=b,this.height=c,this.sourceSizeW=b,this.sourceSizeH=c,this.centerX=Math.floor(b/2),this.centerY=Math.floor(c/2),this.spriteSourceSizeX=d,this.spriteSourceSizeY=e,this.spriteSourceSizeW=f,this.spriteSourceSizeH=g)}},c.Frame.prototype.constructor=c.Frame,c.FrameData=function(){this._frames=[],this._frameNames=[]},c.FrameData.prototype={addFrame:function(a){return a.index=this._frames.length,this._frames.push(a),""!==a.name&&(this._frameNames[a.name]=a.index),a},getFrame:function(a){return this._frames.length>a?this._frames[a]:null},getFrameByName:function(a){return"number"==typeof this._frameNames[a]?this._frames[this._frameNames[a]]:null},checkFrameName:function(a){return null==this._frameNames[a]?!1:!0},getFrameRange:function(a,b,c){"undefined"==typeof c&&(c=[]);for(var d=a;b>=d;d++)c.push(this._frames[d]);return c},getFrames:function(a,b,c){if("undefined"==typeof b&&(b=!0),"undefined"==typeof c&&(c=[]),"undefined"==typeof a||0===a.length)for(var d=0;d<this._frames.length;d++)c.push(this._frames[d]);else for(var d=0,e=a.length;e>d;d++)b?c.push(this.getFrame(a[d])):c.push(this.getFrameByName(a[d]));return c},getFrameIndexes:function(a,b,c){if("undefined"==typeof b&&(b=!0),"undefined"==typeof c&&(c=[]),"undefined"==typeof a||0===a.length)for(var d=0,e=this._frames.length;e>d;d++)c.push(this._frames[d].index);else for(var d=0,e=a.length;e>d;d++)b?c.push(a[d]):this.getFrameByName(a[d])&&c.push(this.getFrameByName(a[d]).index);return c}},c.FrameData.prototype.constructor=c.FrameData,Object.defineProperty(c.FrameData.prototype,"total",{get:function(){return this._frames.length}}),c.AnimationParser={spriteSheet:function(a,d,e,f,g,h,i){var j=a.cache.getImage(d);if(null==j)return null;var k=j.width,l=j.height;0>=e&&(e=Math.floor(-k/Math.min(-1,e))),0>=f&&(f=Math.floor(-l/Math.min(-1,f)));var m=Math.round(k/e),n=Math.round(l/f),o=m*n;if(-1!==g&&(o=g),0===k||0===l||e>k||f>l||0===o)return console.warn("Phaser.AnimationParser.spriteSheet: width/height zero or width/height < given frameWidth/frameHeight"),null;for(var p=new c.FrameData,q=h,r=h,s=0;o>s;s++){var t=a.rnd.uuid();p.addFrame(new c.Frame(s,q,r,e,f,"",t)),b.TextureCache[t]=new b.Texture(b.BaseTextureCache[d],{x:q,y:r,width:e,height:f}),q+=e+i,q===k&&(q=h,r+=f+i)}return p},JSONData:function(a,d,e){if(!d.frames)return console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array"),console.log(d),void 0;for(var f,g=new c.FrameData,h=d.frames,i=0;i<h.length;i++){var j=a.rnd.uuid();f=g.addFrame(new c.Frame(i,h[i].frame.x,h[i].frame.y,h[i].frame.w,h[i].frame.h,h[i].filename,j)),b.TextureCache[j]=new b.Texture(b.BaseTextureCache[e],{x:h[i].frame.x,y:h[i].frame.y,width:h[i].frame.w,height:h[i].frame.h}),h[i].trimmed&&(f.setTrim(h[i].trimmed,h[i].sourceSize.w,h[i].sourceSize.h,h[i].spriteSourceSize.x,h[i].spriteSourceSize.y,h[i].spriteSourceSize.w,h[i].spriteSourceSize.h),b.TextureCache[j].trimmed=!0,b.TextureCache[j].trim.x=h[i].spriteSourceSize.x,b.TextureCache[j].trim.y=h[i].spriteSourceSize.y)}return g},JSONDataHash:function(a,d,e){if(!d.frames)return console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object"),console.log(d),void 0;var f,g=new c.FrameData,h=d.frames,i=0;for(var j in h){var k=a.rnd.uuid();f=g.addFrame(new c.Frame(i,h[j].frame.x,h[j].frame.y,h[j].frame.w,h[j].frame.h,j,k)),b.TextureCache[k]=new b.Texture(b.BaseTextureCache[e],{x:h[j].frame.x,y:h[j].frame.y,width:h[j].frame.w,height:h[j].frame.h}),h[j].trimmed&&(f.setTrim(h[j].trimmed,h[j].sourceSize.w,h[j].sourceSize.h,h[j].spriteSourceSize.x,h[j].spriteSourceSize.y,h[j].spriteSourceSize.w,h[j].spriteSourceSize.h),b.TextureCache[k].trimmed=!0,b.TextureCache[k].trim.x=h[j].spriteSourceSize.x,b.TextureCache[k].trim.y=h[j].spriteSourceSize.y),i++}return g},XMLData:function(a,d,e){if(!d.getElementsByTagName("TextureAtlas"))return console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag"),void 0;for(var f,g,h,i,j,k,l,m,n,o,p,q,r=new c.FrameData,s=d.getElementsByTagName("SubTexture"),t=0;t<s.length;t++)g=a.rnd.uuid(),i=s[t].attributes,h=i.name.nodeValue,j=parseInt(i.x.nodeValue,10),k=parseInt(i.y.nodeValue,10),l=parseInt(i.width.nodeValue,10),m=parseInt(i.height.nodeValue,10),n=null,o=null,i.frameX&&(n=Math.abs(parseInt(i.frameX.nodeValue,10)),o=Math.abs(parseInt(i.frameY.nodeValue,10)),p=parseInt(i.frameWidth.nodeValue,10),q=parseInt(i.frameHeight.nodeValue,10)),f=r.addFrame(new c.Frame(t,j,k,l,m,h,g)),b.TextureCache[g]=new b.Texture(b.BaseTextureCache[e],{x:j,y:k,width:l,height:m}),(null!==n||null!==o)&&(f.setTrim(!0,l,m,n,o,p,q),b.TextureCache[g].realSize={x:n,y:o,w:p,h:q},b.TextureCache[g].trimmed=!0,b.TextureCache[g].trim.x=n,b.TextureCache[g].trim.y=o);return r}},c.Cache=function(a){this.game=a,this._canvases={},this._images={},this._textures={},this._sounds={},this._text={},this._tilemaps={},this._binary={},this._bitmapDatas={},this.addDefaultImage(),this.addMissingImage(),this.onSoundUnlock=new c.Signal},c.Cache.prototype={addCanvas:function(a,b,c){this._canvases[a]={canvas:b,context:c}},addBinary:function(a,b){this._binary[a]=b},addBitmapData:function(a,b){return this._bitmapDatas[a]=b,b},addRenderTexture:function(a,b){var d=new c.Frame(0,0,0,b.width,b.height,"","");this._textures[a]={texture:b,frame:d}},addSpriteSheet:function(a,d,e,f,g,h,i,j){this._images[a]={url:d,data:e,spriteSheet:!0,frameWidth:f,frameHeight:g,margin:i,spacing:j},b.BaseTextureCache[a]=new b.BaseTexture(e),b.TextureCache[a]=new b.Texture(b.BaseTextureCache[a]),this._images[a].frameData=c.AnimationParser.spriteSheet(this.game,a,f,g,h,i,j)},addTilemap:function(a,b,c,d){this._tilemaps[a]={url:b,data:c,format:d}},addTextureAtlas:function(a,d,e,f,g){this._images[a]={url:d,data:e,spriteSheet:!0},b.BaseTextureCache[a]=new b.BaseTexture(e),b.TextureCache[a]=new b.Texture(b.BaseTextureCache[a]),g==c.Loader.TEXTURE_ATLAS_JSON_ARRAY?this._images[a].frameData=c.AnimationParser.JSONData(this.game,f,a):g==c.Loader.TEXTURE_ATLAS_JSON_HASH?this._images[a].frameData=c.AnimationParser.JSONDataHash(this.game,f,a):g==c.Loader.TEXTURE_ATLAS_XML_STARLING&&(this._images[a].frameData=c.AnimationParser.XMLData(this.game,f,a))},addBitmapFont:function(a,d,e,f){this._images[a]={url:d,data:e,spriteSheet:!0},b.BaseTextureCache[a]=new b.BaseTexture(e),b.TextureCache[a]=new b.Texture(b.BaseTextureCache[a]),c.LoaderParser.bitmapFont(this.game,f,a)},addDefaultImage:function(){var a=new Image;a.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==",this._images.__default={url:null,data:a,spriteSheet:!1},this._images.__default.frame=new c.Frame(0,0,0,32,32,"",""),b.BaseTextureCache.__default=new b.BaseTexture(a),b.TextureCache.__default=new b.Texture(b.BaseTextureCache.__default)},addMissingImage:function(){var a=new Image;a.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==",this._images.__missing={url:null,data:a,spriteSheet:!1},this._images.__missing.frame=new c.Frame(0,0,0,32,32,"",""),b.BaseTextureCache.__missing=new b.BaseTexture(a),b.TextureCache.__missing=new b.Texture(b.BaseTextureCache.__missing)},addText:function(a,b,c){this._text[a]={url:b,data:c}},addImage:function(a,d,e){this._images[a]={url:d,data:e,spriteSheet:!1},this._images[a].frame=new c.Frame(0,0,0,e.width,e.height,a,this.game.rnd.uuid()),b.BaseTextureCache[a]=new b.BaseTexture(e),b.TextureCache[a]=new b.Texture(b.BaseTextureCache[a])},addSound:function(a,b,c,d,e){d=d||!0,e=e||!1;var f=!1;e&&(f=!0),this._sounds[a]={url:b,data:c,isDecoding:!1,decoded:f,webAudio:d,audioTag:e,locked:this.game.sound.touchLocked}},reloadSound:function(a){var b=this;this._sounds[a]&&(this._sounds[a].data.src=this._sounds[a].url,this._sounds[a].data.addEventListener("canplaythrough",function(){return b.reloadSoundComplete(a)},!1),this._sounds[a].data.load())},reloadSoundComplete:function(a){this._sounds[a]&&(this._sounds[a].locked=!1,this.onSoundUnlock.dispatch(a))},updateSound:function(a,b,c){this._sounds[a]&&(this._sounds[a][b]=c)},decodedSound:function(a,b){this._sounds[a].data=b,this._sounds[a].decoded=!0,this._sounds[a].isDecoding=!1},getCanvas:function(a){return this._canvases[a]?this._canvases[a].canvas:(console.warn('Phaser.Cache.getCanvas: Invalid key: "'+a+'"'),void 0)},getBitmapData:function(a){return this._bitmapDatas[a]?this._bitmapDatas[a]:(console.warn('Phaser.Cache.getBitmapData: Invalid key: "'+a+'"'),void 0)},checkImageKey:function(a){return this._images[a]?!0:!1},getImage:function(a){return this._images[a]?this._images[a].data:(console.warn('Phaser.Cache.getImage: Invalid key: "'+a+'"'),void 0)},getTilemapData:function(a){return this._tilemaps[a]?this._tilemaps[a]:(console.warn('Phaser.Cache.getTilemapData: Invalid key: "'+a+'"'),void 0)},getFrameData:function(a){return this._images[a]&&this._images[a].frameData?this._images[a].frameData:null},getFrameByIndex:function(a,b){return this._images[a]&&this._images[a].frameData?this._images[a].frameData.getFrame(b):null},getFrameByName:function(a,b){return this._images[a]&&this._images[a].frameData?this._images[a].frameData.getFrameByName(b):null},getFrame:function(a){return this._images[a]&&this._images[a].spriteSheet===!1?this._images[a].frame:null},getTextureFrame:function(a){return this._textures[a]?this._textures[a].frame:null},getTexture:function(a){return this._textures[a]?this._textures[a]:(console.warn('Phaser.Cache.getTexture: Invalid key: "'+a+'"'),void 0)},getSound:function(a){return this._sounds[a]?this._sounds[a]:(console.warn('Phaser.Cache.getSound: Invalid key: "'+a+'"'),void 0)},getSoundData:function(a){return this._sounds[a]?this._sounds[a].data:(console.warn('Phaser.Cache.getSoundData: Invalid key: "'+a+'"'),void 0)},isSoundDecoded:function(a){return this._sounds[a]?this._sounds[a].decoded:void 0},isSoundReady:function(a){return this._sounds[a]&&this._sounds[a].decoded&&this.game.sound.touchLocked===!1},isSpriteSheet:function(a){return this._images[a]?this._images[a].spriteSheet:!1},getText:function(a){return this._text[a]?this._text[a].data:(console.warn('Phaser.Cache.getText: Invalid key: "'+a+'"'),void 0)},getBinary:function(a){return this._binary[a]?this._binary[a]:(console.warn('Phaser.Cache.getBinary: Invalid key: "'+a+'"'),void 0)},getKeys:function(a){var b=[];for(var c in a)"__default"!==c&&"__missing"!==c&&b.push(c);return b},getImageKeys:function(){return this.getKeys(this._images)},getSoundKeys:function(){return this.getKeys(this._sounds)},getTextKeys:function(){return this.getKeys(this._text)},removeCanvas:function(a){delete this._canvases[a]},removeImage:function(a){delete this._images[a]},removeSound:function(a){delete this._sounds[a]},removeText:function(a){delete this._text[a]},destroy:function(){for(var a in this._canvases)delete this._canvases[a.key];for(var a in this._images)delete this._images[a.key];for(var a in this._sounds)delete this._sounds[a.key];for(var a in this._text)delete this._text[a.key]}},c.Cache.prototype.constructor=c.Cache,c.Loader=function(a){this.game=a,this._fileList=[],this._fileIndex=0,this._progressChunk=0,this._xhr=new XMLHttpRequest,this.isLoading=!1,this.hasLoaded=!1,this.progress=0,this.progressFloat=0,this.preloadSprite=null,this.crossOrigin="",this.baseURL="",this.onFileComplete=new c.Signal,this.onFileError=new c.Signal,this.onLoadStart=new c.Signal,this.onLoadComplete=new c.Signal},c.Loader.TEXTURE_ATLAS_JSON_ARRAY=0,c.Loader.TEXTURE_ATLAS_JSON_HASH=1,c.Loader.TEXTURE_ATLAS_XML_STARLING=2,c.Loader.prototype={setPreloadSprite:function(a,b){b=b||0,this.preloadSprite={sprite:a,direction:b,width:a.width,height:a.height,crop:null},this.preloadSprite.crop=0===b?new c.Rectangle(0,0,1,a.height):new c.Rectangle(0,0,a.width,1),a.crop=this.preloadSprite.crop,a.cropEnabled=!0},checkKeyExists:function(a,b){if(this._fileList.length>0)for(var c=0;c<this._fileList.length;c++)if(this._fileList[c].type===a&&this._fileList[c].key===b)return!0;return!1},getAsset:function(a,b){if(this._fileList.length>0)for(var c=0;c<this._fileList.length;c++)if(this._fileList[c].type===a&&this._fileList[c].key===b)return{index:c,file:this._fileList[c]};return!1},reset:function(){this.preloadSprite=null,this.isLoading=!1,this._fileList.length=0,this._fileIndex=0},addToFileList:function(a,b,c,d){var e={type:a,key:b,url:c,data:null,error:!1,loaded:!1};if("undefined"!=typeof d)for(var f in d)e[f]=d[f];this.checkKeyExists(a,b)===!1&&this._fileList.push(e)},replaceInFileList:function(a,b,c,d){var e={type:a,key:b,url:c,data:null,error:!1,loaded:!1};if("undefined"!=typeof d)for(var f in d)e[f]=d[f];this.checkKeyExists(a,b)===!1&&this._fileList.push(e)},image:function(a,b,c){return"undefined"==typeof c&&(c=!1),c?this.replaceInFileList("image",a,b):this.addToFileList("image",a,b),this},text:function(a,b,c){return"undefined"==typeof c&&(c=!1),c?this.replaceInFileList("text",a,b):this.addToFileList("text",a,b),this},script:function(a,b){return this.addToFileList("script",a,b),this},binary:function(a,b,c,d){return"undefined"==typeof c&&(c=!1),c!==!1&&"undefined"==typeof d&&(d=c),this.addToFileList("binary",a,b,{callback:c,callbackContext:d}),this},spritesheet:function(a,b,c,d,e,f,g){return"undefined"==typeof e&&(e=-1),"undefined"==typeof f&&(f=0),"undefined"==typeof g&&(g=0),this.addToFileList("spritesheet",a,b,{frameWidth:c,frameHeight:d,frameMax:e,margin:f,spacing:g}),this},audio:function(a,b,c){return"undefined"==typeof c&&(c=!0),this.addToFileList("audio",a,b,{buffer:null,autoDecode:c}),this},tilemap:function(a,b,d,e){if("undefined"==typeof b&&(b=null),"undefined"==typeof d&&(d=null),"undefined"==typeof e&&(e=c.Tilemap.CSV),null==b&&null==d)return console.warn("Phaser.Loader.tilemap - Both mapDataURL and mapData are null. One must be set."),this;if(d){switch(e){case c.Tilemap.CSV:break;case c.Tilemap.TILED_JSON:"string"==typeof d&&(d=JSON.parse(d))}this.game.cache.addTilemap(a,null,d,e)}else this.addToFileList("tilemap",a,b,{format:e});return this},bitmapFont:function(a,b,c,d){if("undefined"==typeof c&&(c=null),"undefined"==typeof d&&(d=null),c)this.addToFileList("bitmapfont",a,b,{xmlURL:c});else if("string"==typeof d){var e;try{if(window.DOMParser){var f=new DOMParser;e=f.parseFromString(d,"text/xml")}else e=new ActiveXObject("Microsoft.XMLDOM"),e.async="false",e.loadXML(d)}catch(g){e=void 0}if(!e||!e.documentElement||e.getElementsByTagName("parsererror").length)throw new Error("Phaser.Loader. Invalid Bitmap Font XML given");this.addToFileList("bitmapfont",a,b,{xmlURL:null,xmlData:e})}return this},atlasJSONArray:function(a,b,d,e){return this.atlas(a,b,d,e,c.Loader.TEXTURE_ATLAS_JSON_ARRAY)},atlasJSONHash:function(a,b,d,e){return this.atlas(a,b,d,e,c.Loader.TEXTURE_ATLAS_JSON_HASH)},atlasXML:function(a,b,d,e){return this.atlas(a,b,d,e,c.Loader.TEXTURE_ATLAS_XML_STARLING)},atlas:function(a,b,d,e,f){if("undefined"==typeof d&&(d=null),"undefined"==typeof e&&(e=null),"undefined"==typeof f&&(f=c.Loader.TEXTURE_ATLAS_JSON_ARRAY),d)this.addToFileList("textureatlas",a,b,{atlasURL:d,format:f});else{switch(f){case c.Loader.TEXTURE_ATLAS_JSON_ARRAY:"string"==typeof e&&(e=JSON.parse(e));break;case c.Loader.TEXTURE_ATLAS_XML_STARLING:if("string"==typeof e){var g;try{if(window.DOMParser){var h=new DOMParser;g=h.parseFromString(e,"text/xml")}else g=new ActiveXObject("Microsoft.XMLDOM"),g.async="false",g.loadXML(e)}catch(i){g=void 0}if(!g||!g.documentElement||g.getElementsByTagName("parsererror").length)throw new Error("Phaser.Loader. Invalid Texture Atlas XML given");e=g}}this.addToFileList("textureatlas",a,b,{atlasURL:null,atlasData:e,format:f})}return this},removeFile:function(a,b){var c=this.getAsset(a,b);c!==!1&&this._fileList.splice(c.index,1)},removeAll:function(){this._fileList.length=0},start:function(){this.isLoading||(this.progress=0,this.progressFloat=0,this.hasLoaded=!1,this.isLoading=!0,this.onLoadStart.dispatch(this._fileList.length),this._fileList.length>0?(this._fileIndex=0,this._progressChunk=100/this._fileList.length,this.loadFile()):(this.progress=100,this.progressFloat=100,this.hasLoaded=!0,this.onLoadComplete.dispatch()))},loadFile:function(){if(!this._fileList[this._fileIndex])return console.warn("Phaser.Loader loadFile invalid index "+this._fileIndex),void 0;var a=this._fileList[this._fileIndex],b=this;switch(a.type){case"image":case"spritesheet":case"textureatlas":case"bitmapfont":a.data=new Image,a.data.name=a.key,a.data.onload=function(){return b.fileComplete(b._fileIndex)},a.data.onerror=function(){return b.fileError(b._fileIndex)},a.data.crossOrigin=this.crossOrigin,a.data.src=this.baseURL+a.url;break;case"audio":a.url=this.getAudioURL(a.url),null!==a.url?this.game.sound.usingWebAudio?(this._xhr.open("GET",this.baseURL+a.url,!0),this._xhr.responseType="arraybuffer",this._xhr.onload=function(){return b.fileComplete(b._fileIndex)},this._xhr.onerror=function(){return b.fileError(b._fileIndex)},this._xhr.send()):this.game.sound.usingAudioTag&&(this.game.sound.touchLocked?(a.data=new Audio,a.data.name=a.key,a.data.preload="auto",a.data.src=this.baseURL+a.url,this.fileComplete(this._fileIndex)):(a.data=new Audio,a.data.name=a.key,a.data.onerror=function(){return b.fileError(b._fileIndex)},a.data.preload="auto",a.data.src=this.baseURL+a.url,a.data.addEventListener("canplaythrough",c.GAMES[this.game.id].load.fileComplete(this._fileIndex),!1),a.data.load())):this.fileError(this._fileIndex);break;case"tilemap":if(this._xhr.open("GET",this.baseURL+a.url,!0),this._xhr.responseType="text",a.format===c.Tilemap.TILED_JSON)this._xhr.onload=function(){return b.jsonLoadComplete(b._fileIndex)};else{if(a.format!==c.Tilemap.CSV)throw new Error("Phaser.Loader. Invalid Tilemap format: "+a.format);this._xhr.onload=function(){return b.csvLoadComplete(b._fileIndex)}}this._xhr.onerror=function(){return b.dataLoadError(b._fileIndex)},this._xhr.send();break;case"text":case"script":this._xhr.open("GET",this.baseURL+a.url,!0),this._xhr.responseType="text",this._xhr.onload=function(){return b.fileComplete(b._fileIndex)},this._xhr.onerror=function(){return b.fileError(b._fileIndex)},this._xhr.send();break;case"binary":this._xhr.open("GET",this.baseURL+a.url,!0),this._xhr.responseType="arraybuffer",this._xhr.onload=function(){return b.fileComplete(b._fileIndex)},this._xhr.onerror=function(){return b.fileError(b._fileIndex)},this._xhr.send()}},getAudioURL:function(a){var b;"string"==typeof a&&(a=[a]);for(var c=0;c<a.length;c++)if(b=a[c].toLowerCase(),b=b.substr((Math.max(0,b.lastIndexOf("."))||1/0)+1),this.game.device.canPlayAudio(b))return a[c];return null},fileError:function(a){this._fileList[a].loaded=!0,this._fileList[a].error=!0,this.onFileError.dispatch(this._fileList[a].key,this._fileList[a]),console.warn("Phaser.Loader error loading file: "+this._fileList[a].key+" from URL "+this._fileList[a].url),this.nextFile(a,!1)},fileComplete:function(a){if(!this._fileList[a])return console.warn("Phaser.Loader fileComplete invalid index "+a),void 0;var b=this._fileList[a];b.loaded=!0;var d=!0,e=this;switch(b.type){case"image":this.game.cache.addImage(b.key,b.url,b.data);break;case"spritesheet":this.game.cache.addSpriteSheet(b.key,b.url,b.data,b.frameWidth,b.frameHeight,b.frameMax,b.margin,b.spacing);break;case"textureatlas":if(null==b.atlasURL)this.game.cache.addTextureAtlas(b.key,b.url,b.data,b.atlasData,b.format);else{if(d=!1,this._xhr.open("GET",this.baseURL+b.atlasURL,!0),this._xhr.responseType="text",b.format==c.Loader.TEXTURE_ATLAS_JSON_ARRAY||b.format==c.Loader.TEXTURE_ATLAS_JSON_HASH)this._xhr.onload=function(){return e.jsonLoadComplete(a)};else{if(b.format!=c.Loader.TEXTURE_ATLAS_XML_STARLING)throw new Error("Phaser.Loader. Invalid Texture Atlas format: "+b.format);this._xhr.onload=function(){return e.xmlLoadComplete(a)}}this._xhr.onerror=function(){return e.dataLoadError(a)},this._xhr.send()}break;case"bitmapfont":null==b.xmlURL?this.game.cache.addBitmapFont(b.key,b.url,b.data,b.xmlData):(d=!1,this._xhr.open("GET",this.baseURL+b.xmlURL,!0),this._xhr.responseType="text",this._xhr.onload=function(){return e.xmlLoadComplete(a)},this._xhr.onerror=function(){return e.dataLoadError(a)},this._xhr.send());break;case"audio":if(this.game.sound.usingWebAudio){if(b.data=this._xhr.response,this.game.cache.addSound(b.key,b.url,b.data,!0,!1),b.autoDecode){this.game.cache.updateSound(g,"isDecoding",!0);var f=this,g=b.key;this.game.sound.context.decodeAudioData(b.data,function(a){a&&(f.game.cache.decodedSound(g,a),f.game.sound.onSoundDecode.dispatch(g,f.game.cache.getSound(g)))})}}else b.data.removeEventListener("canplaythrough",c.GAMES[this.game.id].load.fileComplete),this.game.cache.addSound(b.key,b.url,b.data,!1,!0);break;case"text":b.data=this._xhr.responseText,this.game.cache.addText(b.key,b.url,b.data);break;case"script":b.data=document.createElement("script"),b.data.language="javascript",b.data.type="text/javascript",b.data.defer=!1,b.data.text=this._xhr.responseText,document.head.appendChild(b.data);
break;case"binary":b.data=b.callback?b.callback.call(b.callbackContext,b.key,this._xhr.response):this._xhr.response,this.game.cache.addBinary(b.key,b.data)}d&&this.nextFile(a,!0)},jsonLoadComplete:function(a){if(!this._fileList[a])return console.warn("Phaser.Loader jsonLoadComplete invalid index "+a),void 0;var b=this._fileList[a],c=JSON.parse(this._xhr.responseText);b.loaded=!0,"tilemap"===b.type?this.game.cache.addTilemap(b.key,b.url,c,b.format):this.game.cache.addTextureAtlas(b.key,b.url,b.data,c,b.format),this.nextFile(a,!0)},csvLoadComplete:function(a){if(!this._fileList[a])return console.warn("Phaser.Loader csvLoadComplete invalid index "+a),void 0;var b=this._fileList[a],c=this._xhr.responseText;b.loaded=!0,this.game.cache.addTilemap(b.key,b.url,c,b.format),this.nextFile(a,!0)},dataLoadError:function(a){var b=this._fileList[a];b.loaded=!0,b.error=!0,console.warn("Phaser.Loader dataLoadError: "+b.key),this.nextFile(a,!0)},xmlLoadComplete:function(a){var b,c=this._xhr.responseText;try{if(window.DOMParser){var d=new DOMParser;b=d.parseFromString(c,"text/xml")}else b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(c)}catch(e){b=void 0}if(!b||!b.documentElement||b.getElementsByTagName("parsererror").length)throw new Error("Phaser.Loader. Invalid XML given");var f=this._fileList[a];f.loaded=!0,"bitmapfont"==f.type?this.game.cache.addBitmapFont(f.key,f.url,f.data,b):"textureatlas"==f.type&&this.game.cache.addTextureAtlas(f.key,f.url,f.data,b,f.format),this.nextFile(a,!0)},nextFile:function(a,b){this.progressFloat+=this._progressChunk,this.progress=Math.round(this.progressFloat),this.progress>100&&(this.progress=100),null!==this.preloadSprite&&(0===this.preloadSprite.direction?this.preloadSprite.crop.width=Math.floor(this.preloadSprite.width/100*this.progress):this.preloadSprite.crop.height=Math.floor(this.preloadSprite.height/100*this.progress),this.preloadSprite.sprite.crop=this.preloadSprite.crop),this.onFileComplete.dispatch(this.progress,this._fileList[a].key,b,this.totalLoadedFiles(),this._fileList.length),this.totalQueuedFiles()>0?(this._fileIndex++,this.loadFile()):(this.hasLoaded=!0,this.isLoading=!1,this.removeAll(),this.onLoadComplete.dispatch())},totalLoadedFiles:function(){for(var a=0,b=0;b<this._fileList.length;b++)this._fileList[b].loaded&&a++;return a},totalQueuedFiles:function(){for(var a=0,b=0;b<this._fileList.length;b++)this._fileList[b].loaded===!1&&a++;return a}},c.Loader.prototype.constructor=c.Loader,c.LoaderParser={bitmapFont:function(a,c,d){if(!c.getElementsByTagName("font"))return console.warn("Phaser.LoaderParser.bitmapFont: Invalid XML given, missing <font> tag"),void 0;var e=b.TextureCache[d],f={},g=c.getElementsByTagName("info")[0],h=c.getElementsByTagName("common")[0];f.font=g.attributes.getNamedItem("face").nodeValue,f.size=parseInt(g.attributes.getNamedItem("size").nodeValue,10),f.lineHeight=parseInt(h.attributes.getNamedItem("lineHeight").nodeValue,10),f.chars={};for(var i=c.getElementsByTagName("char"),j=0;j<i.length;j++){var k=parseInt(i[j].attributes.getNamedItem("id").nodeValue,10),l={x:parseInt(i[j].attributes.getNamedItem("x").nodeValue,10),y:parseInt(i[j].attributes.getNamedItem("y").nodeValue,10),width:parseInt(i[j].attributes.getNamedItem("width").nodeValue,10),height:parseInt(i[j].attributes.getNamedItem("height").nodeValue,10)};b.TextureCache[k]=new b.Texture(e,l),f.chars[k]={xOffset:parseInt(i[j].attributes.getNamedItem("xoffset").nodeValue,10),yOffset:parseInt(i[j].attributes.getNamedItem("yoffset").nodeValue,10),xAdvance:parseInt(i[j].attributes.getNamedItem("xadvance").nodeValue,10),kerning:{},texture:new b.Texture(e,l)}}var m=c.getElementsByTagName("kerning");for(j=0;j<m.length;j++){var n=parseInt(m[j].attributes.getNamedItem("first").nodeValue,10),o=parseInt(m[j].attributes.getNamedItem("second").nodeValue,10),p=parseInt(m[j].attributes.getNamedItem("amount").nodeValue,10);f.chars[o].kerning[n]=p}b.BitmapText.fonts[f.font]=f}},c.Sound=function(a,b,d,e,f){"undefined"==typeof d&&(d=1),"undefined"==typeof e&&(e=!1),"undefined"==typeof f&&(f=a.sound.connectToMaster),this.game=a,this.name=b,this.key=b,this.loop=e,this._volume=d,this.markers={},this.context=null,this._buffer=null,this._muted=!1,this.autoplay=!1,this.totalDuration=0,this.startTime=0,this.currentTime=0,this.duration=0,this.stopTime=0,this.paused=!1,this.pausedPosition=0,this.pausedTime=0,this.isPlaying=!1,this.currentMarker="",this.pendingPlayback=!1,this.override=!1,this.usingWebAudio=this.game.sound.usingWebAudio,this.usingAudioTag=this.game.sound.usingAudioTag,this.externalNode=null,this.usingWebAudio?(this.context=this.game.sound.context,this.masterGainNode=this.game.sound.masterGain,this.gainNode="undefined"==typeof this.context.createGain?this.context.createGainNode():this.context.createGain(),this.gainNode.gain.value=d*this.game.sound.volume,f&&this.gainNode.connect(this.masterGainNode)):this.game.cache.getSound(b)&&this.game.cache.isSoundReady(b)?(this._sound=this.game.cache.getSoundData(b),this.totalDuration=0,this._sound.duration&&(this.totalDuration=this._sound.duration)):this.game.cache.onSoundUnlock.add(this.soundHasUnlocked,this),this.onDecoded=new c.Signal,this.onPlay=new c.Signal,this.onPause=new c.Signal,this.onResume=new c.Signal,this.onLoop=new c.Signal,this.onStop=new c.Signal,this.onMute=new c.Signal,this.onMarkerComplete=new c.Signal},c.Sound.prototype={soundHasUnlocked:function(a){a==this.key&&(this._sound=this.game.cache.getSoundData(this.key),this.totalDuration=this._sound.duration)},addMarker:function(a,b,c,d,e){d=d||1,"undefined"==typeof e&&(e=!1),this.markers[a]={name:a,start:b,stop:b+c,volume:d,duration:c,durationMS:1e3*c,loop:e}},removeMarker:function(a){delete this.markers[a]},update:function(){this.pendingPlayback&&this.game.cache.isSoundReady(this.key)&&(this.pendingPlayback=!1,this.play(this._tempMarker,this._tempPosition,this._tempVolume,this._tempLoop)),this.isPlaying&&(this.currentTime=this.game.time.now-this.startTime,this.currentTime>=this.durationMS&&(this.usingWebAudio?this.loop?(this.onLoop.dispatch(this),""===this.currentMarker?(this.currentTime=0,this.startTime=this.game.time.now):this.play(this.currentMarker,0,this.volume,!0,!0)):this.stop():this.loop?(this.onLoop.dispatch(this),this.play(this.currentMarker,0,this.volume,!0,!0)):this.stop()))},play:function(a,b,c,d,e){if(a=a||"",b=b||0,"undefined"==typeof c&&(c=this._volume),"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=!0),this.isPlaying!==!0||e!==!1||this.override!==!1){if(this.isPlaying&&this.override&&(this.usingWebAudio?"undefined"==typeof this._sound.stop?this._sound.noteOff(0):this._sound.stop(0):this.usingAudioTag&&(this._sound.pause(),this._sound.currentTime=0)),this.currentMarker=a,""!==a){if(!this.markers[a])return console.warn("Phaser.Sound.play: audio marker "+a+" doesn't exist"),void 0;this.position=this.markers[a].start,this.volume=this.markers[a].volume,this.loop=this.markers[a].loop,this.duration=this.markers[a].duration,this.durationMS=this.markers[a].durationMS,this._tempMarker=a,this._tempPosition=this.position,this._tempVolume=this.volume,this._tempLoop=this.loop}else this.position=b,this.volume=c,this.loop=d,this.duration=0,this.durationMS=0,this._tempMarker=a,this._tempPosition=b,this._tempVolume=c,this._tempLoop=d;this.usingWebAudio?this.game.cache.isSoundDecoded(this.key)?(null==this._buffer&&(this._buffer=this.game.cache.getSoundData(this.key)),this._sound=this.context.createBufferSource(),this._sound.buffer=this._buffer,this.externalNode?this._sound.connect(this.externalNode.input):this._sound.connect(this.gainNode),this.totalDuration=this._sound.buffer.duration,0===this.duration&&(this.duration=this.totalDuration,this.durationMS=1e3*this.totalDuration),this.loop&&""===a&&(this._sound.loop=!0),"undefined"==typeof this._sound.start?this._sound.noteGrainOn(0,this.position,this.duration):this._sound.start(0,this.position,this.duration),this.isPlaying=!0,this.startTime=this.game.time.now,this.currentTime=0,this.stopTime=this.startTime+this.durationMS,this.onPlay.dispatch(this)):(this.pendingPlayback=!0,this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).isDecoding===!1&&this.game.sound.decode(this.key,this)):this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).locked?(this.game.cache.reloadSound(this.key),this.pendingPlayback=!0):this._sound&&(this.game.device.cocoonJS||4===this._sound.readyState)?(this._sound.play(),this.totalDuration=this._sound.duration,0===this.duration&&(this.duration=this.totalDuration,this.durationMS=1e3*this.totalDuration),this._sound.currentTime=this.position,this._sound.muted=this._muted,this._sound.volume=this._muted?0:this._volume,this.isPlaying=!0,this.startTime=this.game.time.now,this.currentTime=0,this.stopTime=this.startTime+this.durationMS,this.onPlay.dispatch(this)):this.pendingPlayback=!0}},restart:function(a,b,c,d){a=a||"",b=b||0,c=c||1,"undefined"==typeof d&&(d=!1),this.play(a,b,c,d,!0)},pause:function(){this.isPlaying&&this._sound&&(this.stop(),this.isPlaying=!1,this.paused=!0,this.pausedPosition=this.currentTime,this.pausedTime=this.game.time.now,this.onPause.dispatch(this))},resume:function(){if(this.paused&&this._sound){if(this.usingWebAudio){var a=this.position+this.pausedPosition/1e3;this._sound=this.context.createBufferSource(),this._sound.buffer=this._buffer,this.externalNode?this._sound.connect(this.externalNode.input):this._sound.connect(this.gainNode),this.loop&&(this._sound.loop=!0),"undefined"==typeof this._sound.start?this._sound.noteGrainOn(0,a,this.duration):this._sound.start(0,a,this.duration)}else this._sound.play();this.isPlaying=!0,this.paused=!1,this.startTime+=this.game.time.now-this.pausedTime,this.onResume.dispatch(this)}},stop:function(){this.isPlaying&&this._sound&&(this.usingWebAudio?"undefined"==typeof this._sound.stop?this._sound.noteOff(0):this._sound.stop(0):this.usingAudioTag&&(this._sound.pause(),this._sound.currentTime=0)),this.isPlaying=!1;var a=this.currentMarker;this.currentMarker="",this.onStop.dispatch(this,a)}},c.Sound.prototype.constructor=c.Sound,Object.defineProperty(c.Sound.prototype,"isDecoding",{get:function(){return this.game.cache.getSound(this.key).isDecoding}}),Object.defineProperty(c.Sound.prototype,"isDecoded",{get:function(){return this.game.cache.isSoundDecoded(this.key)}}),Object.defineProperty(c.Sound.prototype,"mute",{get:function(){return this._muted},set:function(a){a=a||null,a?(this._muted=!0,this.usingWebAudio?(this._muteVolume=this.gainNode.gain.value,this.gainNode.gain.value=0):this.usingAudioTag&&this._sound&&(this._muteVolume=this._sound.volume,this._sound.volume=0)):(this._muted=!1,this.usingWebAudio?this.gainNode.gain.value=this._muteVolume:this.usingAudioTag&&this._sound&&(this._sound.volume=this._muteVolume)),this.onMute.dispatch(this)}}),Object.defineProperty(c.Sound.prototype,"volume",{get:function(){return this._volume},set:function(a){this.usingWebAudio?(this._volume=a,this.gainNode.gain.value=a):this.usingAudioTag&&this._sound&&a>=0&&1>=a&&(this._volume=a,this._sound.volume=a)}}),c.SoundManager=function(a){this.game=a,this.onSoundDecode=new c.Signal,this._muted=!1,this._unlockSource=null,this._volume=1,this._sounds=[],this.context=null,this.usingWebAudio=!0,this.usingAudioTag=!1,this.noAudio=!1,this.connectToMaster=!0,this.touchLocked=!1,this.channels=32},c.SoundManager.prototype={boot:function(){if(this.game.device.iOS&&this.game.device.webAudio===!1&&(this.channels=1),this.game.device.iOS||window.PhaserGlobal&&window.PhaserGlobal.fakeiOSTouchLock?(this.game.input.touch.callbackContext=this,this.game.input.touch.touchStartCallback=this.unlock,this.game.input.mouse.callbackContext=this,this.game.input.mouse.mouseDownCallback=this.unlock,this.touchLocked=!0):this.touchLocked=!1,window.PhaserGlobal){if(window.PhaserGlobal.disableAudio===!0)return this.usingWebAudio=!1,this.noAudio=!0,void 0;if(window.PhaserGlobal.disableWebAudio===!0)return this.usingWebAudio=!1,this.usingAudioTag=!0,this.noAudio=!1,void 0}window.AudioContext?this.context=new window.AudioContext:window.webkitAudioContext?this.context=new window.webkitAudioContext:window.Audio?(this.usingWebAudio=!1,this.usingAudioTag=!0):(this.usingWebAudio=!1,this.noAudio=!0),null!==this.context&&(this.masterGain="undefined"==typeof this.context.createGain?this.context.createGainNode():this.context.createGain(),this.masterGain.gain.value=1,this.masterGain.connect(this.context.destination))},unlock:function(){if(this.touchLocked!==!1)if(this.game.device.webAudio===!1||window.PhaserGlobal&&window.PhaserGlobal.disableWebAudio===!0)this.touchLocked=!1,this._unlockSource=null,this.game.input.touch.callbackContext=null,this.game.input.touch.touchStartCallback=null,this.game.input.mouse.callbackContext=null,this.game.input.mouse.mouseDownCallback=null;else{var a=this.context.createBuffer(1,1,22050);this._unlockSource=this.context.createBufferSource(),this._unlockSource.buffer=a,this._unlockSource.connect(this.context.destination),this._unlockSource.noteOn(0)}},stopAll:function(){for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].stop()},pauseAll:function(){for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].pause()},resumeAll:function(){for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].resume()},decode:function(a,b){b=b||null;var c=this.game.cache.getSoundData(a);if(c&&this.game.cache.isSoundDecoded(a)===!1){this.game.cache.updateSound(a,"isDecoding",!0);var d=this;this.context.decodeAudioData(c,function(c){d.game.cache.decodedSound(a,c),b&&d.onSoundDecode.dispatch(a,b)})}},update:function(){this.touchLocked&&this.game.device.webAudio&&null!==this._unlockSource&&(this._unlockSource.playbackState===this._unlockSource.PLAYING_STATE||this._unlockSource.playbackState===this._unlockSource.FINISHED_STATE)&&(this.touchLocked=!1,this._unlockSource=null,this.game.input.touch.callbackContext=null,this.game.input.touch.touchStartCallback=null);for(var a=0;a<this._sounds.length;a++)this._sounds[a].update()},add:function(a,b,d,e){"undefined"==typeof b&&(b=1),"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=this.connectToMaster);var f=new c.Sound(this.game,a,b,d,e);return this._sounds.push(f),f},play:function(a,b,c,d){"undefined"==typeof d&&(d=!1);var e=this.add(a,b,c);return e.play(),e}},c.SoundManager.prototype.constructor=c.SoundManager,Object.defineProperty(c.SoundManager.prototype,"mute",{get:function(){return this._muted},set:function(a){if(a=a||null){if(this._muted)return;this._muted=!0,this.usingWebAudio&&(this._muteVolume=this.masterGain.gain.value,this.masterGain.gain.value=0);for(var b=0;b<this._sounds.length;b++)this._sounds[b].usingAudioTag&&(this._sounds[b].mute=!0)}else{if(this._muted===!1)return;this._muted=!1,this.usingWebAudio&&(this.masterGain.gain.value=this._muteVolume);for(var b=0;b<this._sounds.length;b++)this._sounds[b].usingAudioTag&&(this._sounds[b].mute=!1)}}}),Object.defineProperty(c.SoundManager.prototype,"volume",{get:function(){return this.usingWebAudio?this.masterGain.gain.value:this._volume},set:function(a){a=this.game.math.clamp(a,1,0),this._volume=a,this.usingWebAudio&&(this.masterGain.gain.value=a);for(var b=0;b<this._sounds.length;b++)this._sounds[b].usingAudioTag&&(this._sounds[b].volume=this._sounds[b].volume*a)}}),c.Utils.Debug=function(a){this.game=a,this.context=a.context,this.font="14px Courier",this.columnWidth=100,this.lineHeight=16,this.renderShadow=!0,this.currentX=0,this.currentY=0,this.currentAlpha=1},c.Utils.Debug.prototype={start:function(a,b,c,d){null!=this.context&&("number"!=typeof a&&(a=0),"number"!=typeof b&&(b=0),c=c||"rgb(255,255,255)","undefined"==typeof d&&(d=0),this.currentX=a,this.currentY=b,this.currentColor=c,this.currentAlpha=this.context.globalAlpha,this.columnWidth=d,this.context.save(),this.context.setTransform(1,0,0,1,0,0),this.context.strokeStyle=c,this.context.fillStyle=c,this.context.font=this.font,this.context.globalAlpha=1)},stop:function(){this.context.restore(),this.context.globalAlpha=this.currentAlpha},line:function(a,b,c){null!=this.context&&("undefined"!=typeof b&&(this.currentX=b),"undefined"!=typeof c&&(this.currentY=c),this.renderShadow&&(this.context.fillStyle="rgb(0,0,0)",this.context.fillText(a,this.currentX+1,this.currentY+1),this.context.fillStyle=this.currentColor),this.context.fillText(a,this.currentX,this.currentY),this.currentY+=this.lineHeight)},splitline:function(){if(null!=this.context){for(var a=this.currentX,b=0;b<arguments.length;b++)this.renderShadow&&(this.context.fillStyle="rgb(0,0,0)",this.context.fillText(arguments[b],a+1,this.currentY+1),this.context.fillStyle=this.currentColor),this.context.fillText(arguments[b],a,this.currentY),a+=this.columnWidth;this.currentY+=this.lineHeight}},renderQuadTree:function(a,b){b=b||"rgba(255,0,0,0.3)",this.start();var c=a.bounds;if(0===a.nodes.length){this.context.strokeStyle=b,this.context.strokeRect(c.x,c.y,c.width,c.height),this.renderText(a.ID+" / "+a.objects.length,c.x+4,c.y+16,"rgb(0,200,0)","12px Courier"),this.context.strokeStyle="rgb(0,255,0)";for(var d=0;d<a.objects.length;d++)this.context.strokeRect(a.objects[d].x,a.objects[d].y,a.objects[d].width,a.objects[d].height)}else for(var d=0;d<a.nodes.length;d++)this.renderQuadTree(a.nodes[d]);this.stop()},renderSpriteCorners:function(a,b,c,d){null!=this.context&&(b=b||!1,c=c||!1,d=d||"rgb(255,255,255)",this.start(0,0,d),c&&(this.context.beginPath(),this.context.strokeStyle="rgba(0, 255, 0, 0.7)",this.context.strokeRect(a.bounds.x,a.bounds.y,a.bounds.width,a.bounds.height),this.context.closePath(),this.context.stroke()),this.context.beginPath(),this.context.moveTo(a.topLeft.x,a.topLeft.y),this.context.lineTo(a.topRight.x,a.topRight.y),this.context.lineTo(a.bottomRight.x,a.bottomRight.y),this.context.lineTo(a.bottomLeft.x,a.bottomLeft.y),this.context.closePath(),this.context.strokeStyle="rgba(255, 0, 255, 0.7)",this.context.stroke(),this.renderPoint(a.offset),this.renderPoint(a.center),this.renderPoint(a.topLeft),this.renderPoint(a.topRight),this.renderPoint(a.bottomLeft),this.renderPoint(a.bottomRight),b&&(this.currentColor=d,this.line("x: "+Math.floor(a.topLeft.x)+" y: "+Math.floor(a.topLeft.y),a.topLeft.x,a.topLeft.y),this.line("x: "+Math.floor(a.topRight.x)+" y: "+Math.floor(a.topRight.y),a.topRight.x,a.topRight.y),this.line("x: "+Math.floor(a.bottomLeft.x)+" y: "+Math.floor(a.bottomLeft.y),a.bottomLeft.x,a.bottomLeft.y),this.line("x: "+Math.floor(a.bottomRight.x)+" y: "+Math.floor(a.bottomRight.y),a.bottomRight.x,a.bottomRight.y)),this.stop())},renderSoundInfo:function(a,b,c,d){null!=this.context&&(d=d||"rgb(255,255,255)",this.start(b,c,d),this.line("Sound: "+a.key+" Locked: "+a.game.sound.touchLocked),this.line("Is Ready?: "+this.game.cache.isSoundReady(a.key)+" Pending Playback: "+a.pendingPlayback),this.line("Decoded: "+a.isDecoded+" Decoding: "+a.isDecoding),this.line("Total Duration: "+a.totalDuration+" Playing: "+a.isPlaying),this.line("Time: "+a.currentTime),this.line("Volume: "+a.volume+" Muted: "+a.mute),this.line("WebAudio: "+a.usingWebAudio+" Audio: "+a.usingAudioTag),""!==a.currentMarker&&(this.line("Marker: "+a.currentMarker+" Duration: "+a.duration),this.line("Start: "+a.markers[a.currentMarker].start+" Stop: "+a.markers[a.currentMarker].stop),this.line("Position: "+a.position)),this.stop())},renderCameraInfo:function(a,b,c,d){null!=this.context&&(d=d||"rgb(255,255,255)",this.start(b,c,d),this.line("Camera ("+a.width+" x "+a.height+")"),this.line("X: "+a.x+" Y: "+a.y),this.line("Bounds x: "+a.bounds.x+" Y: "+a.bounds.y+" w: "+a.bounds.width+" h: "+a.bounds.height),this.line("View x: "+a.view.x+" Y: "+a.view.y+" w: "+a.view.width+" h: "+a.view.height),this.stop())},renderPointer:function(a,b,c,d,e){null!=this.context&&null!=a&&("undefined"==typeof b&&(b=!1),c=c||"rgba(0,255,0,0.5)",d=d||"rgba(255,0,0,0.5)",e=e||"rgb(255,255,255)",(b!==!0||a.isUp!==!0)&&(this.start(a.x,a.y-100,e),this.context.beginPath(),this.context.arc(a.x,a.y,a.circle.radius,0,2*Math.PI),this.context.fillStyle=a.active?c:d,this.context.fill(),this.context.closePath(),this.context.beginPath(),this.context.moveTo(a.positionDown.x,a.positionDown.y),this.context.lineTo(a.position.x,a.position.y),this.context.lineWidth=2,this.context.stroke(),this.context.closePath(),this.line("ID: "+a.id+" Active: "+a.active),this.line("World X: "+a.worldX+" World Y: "+a.worldY),this.line("Screen X: "+a.x+" Screen Y: "+a.y),this.line("Duration: "+a.duration+" ms"),this.stop()))},renderSpriteInputInfo:function(a,b,c,d){d=d||"rgb(255,255,255)",this.start(b,c,d),this.line("Sprite Input: ("+a.width+" x "+a.height+")"),this.line("x: "+a.input.pointerX().toFixed(1)+" y: "+a.input.pointerY().toFixed(1)),this.line("over: "+a.input.pointerOver()+" duration: "+a.input.overDuration().toFixed(0)),this.line("down: "+a.input.pointerDown()+" duration: "+a.input.downDuration().toFixed(0)),this.line("just over: "+a.input.justOver()+" just out: "+a.input.justOut()),this.stop()},renderBodyInfo:function(a,b,c,d){d=d||"rgb(255,255,255)",this.start(b,c,d,210),this.splitline("x: "+a.body.x.toFixed(2),"y: "+a.body.y.toFixed(2),"width: "+a.width,"height: "+a.height),this.splitline("speed: "+a.body.speed.toFixed(2),"angle: "+a.body.angle.toFixed(2),"linear damping: "+a.body.linearDamping),this.splitline("blocked left: "+a.body.blocked.left,"right: "+a.body.blocked.right,"up: "+a.body.blocked.up,"down: "+a.body.blocked.down),this.splitline("touching left: "+a.body.touching.left,"right: "+a.body.touching.right,"up: "+a.body.touching.up,"down: "+a.body.touching.down),this.splitline("gravity x: "+a.body.gravity.x,"y: "+a.body.gravity.y,"world gravity x: "+this.game.physics.gravity.x,"y: "+this.game.physics.gravity.y),this.splitline("acceleration x: "+a.body.acceleration.x.toFixed(2),"y: "+a.body.acceleration.y.toFixed(2)),this.splitline("velocity x: "+a.body.velocity.x.toFixed(2),"y: "+a.body.velocity.y.toFixed(2),"deltaX: "+a.body.deltaX().toFixed(2),"deltaY: "+a.body.deltaY().toFixed(2)),this.splitline("bounce x: "+a.body.bounce.x.toFixed(2),"y: "+a.body.bounce.y.toFixed(2)),this.stop()},renderInputInfo:function(a,b,c){null!=this.context&&(c=c||"rgb(255,255,0)",this.start(a,b,c),this.line("Input"),this.line("X: "+this.game.input.x+" Y: "+this.game.input.y),this.line("World X: "+this.game.input.worldX+" World Y: "+this.game.input.worldY),this.line("Scale X: "+this.game.input.scale.x.toFixed(1)+" Scale Y: "+this.game.input.scale.x.toFixed(1)),this.line("Screen X: "+this.game.input.activePointer.screenX+" Screen Y: "+this.game.input.activePointer.screenY),this.stop())},renderSpriteInfo:function(a,b,c,d){null!=this.context&&(d=d||"rgb(255, 255, 255)",this.start(b,c,d),this.line("Sprite:  ("+a.width+" x "+a.height+") anchor: "+a.anchor.x+" x "+a.anchor.y),this.line("x: "+a.x.toFixed(1)+" y: "+a.y.toFixed(1)),this.line("angle: "+a.angle.toFixed(1)+" rotation: "+a.rotation.toFixed(1)),this.line("visible: "+a.visible+" in camera: "+a.inCamera),this.line("body x: "+a.body.x.toFixed(1)+" y: "+a.body.y.toFixed(1)),this.line("id: "+a._id),this.line("scale x: "+a.worldTransform[0]),this.line("scale y: "+a.worldTransform[4]),this.line("tx: "+a.worldTransform[2]),this.line("ty: "+a.worldTransform[5]),this.line("skew x: "+a.worldTransform[3]),this.line("skew y: "+a.worldTransform[1]),this.line("sdx: "+a.deltaX),this.line("sdy: "+a.deltaY),this.stop())},renderSpriteCoords:function(a,b,c,d){null!=this.context&&(d=d||"rgb(255, 255, 255)",this.start(b,c,d,100),a.name&&this.line(a.name),this.splitline("x:",a.x.toFixed(2),"y:",a.y.toFixed(2)),this.splitline("pos x:",a.position.x.toFixed(2),"pos y:",a.position.y.toFixed(2)),this.splitline("world x:",a.world.x.toFixed(2),"world y:",a.world.y.toFixed(2)),this.stop())},renderLine:function(a,b){null!=this.context&&(b=b||"rgb(255, 255, 255)",this.start(0,0,b),this.context.lineWidth=1,this.context.beginPath(),this.context.moveTo(a.start.x+.5,a.start.y+.5),this.context.lineTo(a.end.x+.5,a.end.y+.5),this.context.closePath(),this.context.stroke(),this.stop())},renderLineInfo:function(a,b,c,d){null!=this.context&&(d=d||"rgb(255, 255, 255)",this.start(b,c,d,80),this.splitline("start.x:",a.start.x.toFixed(2),"start.y:",a.start.y.toFixed(2)),this.splitline("end.x:",a.end.x.toFixed(2),"end.y:",a.end.y.toFixed(2)),this.splitline("length:",a.length.toFixed(2),"angle:",a.angle),this.stop())},renderPointInfo:function(a,b,c,d){null!=this.context&&(d=d||"rgb(255, 255, 255)",this.start(b,c,d),this.line("px: "+a.x.toFixed(1)+" py: "+a.y.toFixed(1)),this.stop())},renderSpriteBody:function(a,b,c){null!=this.context&&(b=b||"rgb(255,0,255)","undefined"==typeof c&&(c=!1),this.start(0,0,b),c?(this.context.fillStyle=b,this.context.fillRect(a.body.left,a.body.top,a.body.width,a.body.height)):(this.context.strokeStyle=b,this.context.strokeRect(a.body.left,a.body.top,a.body.width,a.body.height),this.context.stroke()),this.stop())},renderSpriteBounds:function(a,b,c){null!=this.context&&(b=b||"rgb(255,0,255)","undefined"==typeof c&&(c=!1),this.start(0,0,b),c?(this.context.fillStyle=b,this.context.fillRect(a.bounds.x,a.bounds.y,a.bounds.width,a.bounds.height)):(this.context.strokeStyle=b,this.context.strokeRect(a.bounds.x,a.bounds.y,a.bounds.width,a.bounds.height),this.context.stroke()),this.stop())},renderPixel:function(a,b,c){null!=this.context&&(c=c||"rgba(0,255,0,1)",this.start(),this.context.fillStyle=c,this.context.fillRect(a,b,2,2),this.stop())},renderPoint:function(a,b){null!=this.context&&(b=b||"rgba(0,255,0,1)",this.start(),this.context.fillStyle=b,this.context.fillRect(a.x,a.y,4,4),this.stop())},renderRectangle:function(a,b){null!=this.context&&(b=b||"rgba(0,255,0,0.3)",this.start(),this.context.fillStyle=b,this.context.fillRect(a.x,a.y,a.width,a.height),this.stop())},renderCircle:function(a,b){null!=this.context&&(b=b||"rgba(0,255,0,0.3)",this.start(),this.context.beginPath(),this.context.fillStyle=b,this.context.arc(a.x,a.y,a.radius,0,2*Math.PI,!1),this.context.fill(),this.context.closePath(),this.stop())},renderText:function(a,b,c,d,e){null!=this.context&&(d=d||"rgb(255,255,255)",e=e||"16px Courier",this.start(),this.context.font=e,this.context.fillStyle=d,this.context.fillText(a,b,c),this.stop())},renderPhysicsBody:function(a,b,d){if(null!==this.context||null!==d){b=b||"rgb(255,255,255)";var e=a.x-this.game.camera.x,f=a.y-this.game.camera.y;if(a.type===c.Physics.Arcade.CIRCLE)this.start(0,0,b),this.context.beginPath(),this.context.strokeStyle=b,this.context.arc(e,f,a.shape.r,0,2*Math.PI,!1),this.context.stroke(),this.context.closePath(),this.stop();else{var g=a.polygon.points;this.start(0,0,b),this.context.beginPath(),this.context.moveTo(e+g[0].x,f+g[0].y);for(var h=1;h<g.length;h++)this.context.lineTo(e+g[h].x,f+g[h].y);this.context.closePath(),this.context.strokeStyle=b,this.context.stroke(),this.context.fillStyle="rgb(255,0,0)",this.context.fillRect(e+g[0].x-2,f+g[0].y-2,5,5);for(var h=1;h<g.length;h++)this.context.fillStyle="rgb(255,"+40*h+",0)",this.context.fillRect(e+g[h].x-2,f+g[h].y-2,5,5);this.stop()}}},renderPolygon:function(a,b,c){if(null!==this.context||null!==c){b=b||"rgb(255,255,255)";var d=a.points,e=a.pos.x,f=a.pos.y;this.start(0,0,b),this.context.beginPath(),this.context.moveTo(e+d[0].x,f+d[0].y);for(var g=1;g<d.length;g++)this.context.lineTo(e+d[g].x,f+d[g].y);this.context.closePath(),this.context.strokeStyle=b,this.context.stroke(),this.stop()}}},c.Utils.Debug.prototype.constructor=c.Utils.Debug,c.Color={getColor32:function(a,b,c,d){return a<<24|b<<16|c<<8|d},getColor:function(a,b,c){return a<<16|b<<8|c},hexToRGB:function(a){var b="#"==a.charAt(0)?a.substring(1,7):a;3==b.length&&(b=b.charAt(0)+b.charAt(0)+b.charAt(1)+b.charAt(1)+b.charAt(2)+b.charAt(2));var c=parseInt(b.substring(0,2),16),d=parseInt(b.substring(2,4),16),e=parseInt(b.substring(4,6),16);return c<<16|d<<8|e},getColorInfo:function(a){var b=c.Color.getRGB(a),d=c.Color.RGBtoHSV(a),e=c.Color.RGBtoHexstring(a)+"\n";return e=e.concat("Alpha: "+b.alpha+" Red: "+b.red+" Green: "+b.green+" Blue: "+b.blue)+"\n",e=e.concat("Hue: "+d.hue+" Saturation: "+d.saturation+" Lightnes: "+d.lightness)},RGBtoHexstring:function(a){var b=c.Color.getRGB(a);return"0x"+c.Color.colorToHexstring(b.alpha)+c.Color.colorToHexstring(b.red)+c.Color.colorToHexstring(b.green)+c.Color.colorToHexstring(b.blue)},RGBtoWebstring:function(a){var b=c.Color.getRGB(a);return"#"+c.Color.colorToHexstring(b.red)+c.Color.colorToHexstring(b.green)+c.Color.colorToHexstring(b.blue)},colorToHexstring:function(a){var b="0123456789ABCDEF",c=a%16,d=(a-c)/16,e=b.charAt(d)+b.charAt(c);return e},interpolateColor:function(a,b,d,e,f){"undefined"==typeof f&&(f=255);var g=c.Color.getRGB(a),h=c.Color.getRGB(b),i=(h.red-g.red)*e/d+g.red,j=(h.green-g.green)*e/d+g.green,k=(h.blue-g.blue)*e/d+g.blue;return c.Color.getColor32(f,i,j,k)},interpolateColorWithRGB:function(a,b,d,e,f,g){var h=c.Color.getRGB(a),i=(b-h.red)*g/f+h.red,j=(d-h.green)*g/f+h.green,k=(e-h.blue)*g/f+h.blue;return c.Color.getColor(i,j,k)},interpolateRGB:function(a,b,d,e,f,g,h,i){var j=(e-a)*i/h+a,k=(f-b)*i/h+b,l=(g-d)*i/h+d;return c.Color.getColor(j,k,l)},getRandomColor:function(a,b,d){if("undefined"==typeof a&&(a=0),"undefined"==typeof b&&(b=255),"undefined"==typeof d&&(d=255),b>255)return c.Color.getColor(255,255,255);if(a>b)return c.Color.getColor(255,255,255);var e=a+Math.round(Math.random()*(b-a)),f=a+Math.round(Math.random()*(b-a)),g=a+Math.round(Math.random()*(b-a));return c.Color.getColor32(d,e,f,g)},getRGB:function(a){return{alpha:a>>>24,red:255&a>>16,green:255&a>>8,blue:255&a}},getWebRGB:function(a){var b=(a>>>24)/255,c=255&a>>16,d=255&a>>8,e=255&a;return"rgba("+c.toString()+","+d.toString()+","+e.toString()+","+b.toString()+")"},getAlpha:function(a){return a>>>24},getAlphaFloat:function(a){return(a>>>24)/255},getRed:function(a){return 255&a>>16},getGreen:function(a){return 255&a>>8},getBlue:function(a){return 255&a}};var f=function(){"use strict";function a(a,b){this.x=a||0,this.y=b||0}function b(b,c){this.pos=b||new a,this.r=c||0}function c(b,c){this.pos=b||new a,this.points=c||[],this.recalc()}function d(b,c,d){this.pos=b||new a,this.w=c||0,this.h=d||0}function e(){this.a=null,this.b=null,this.overlapN=new a,this.overlapV=new a,this.clear()}function f(a,b,c){for(var d=Number.MAX_VALUE,e=-Number.MAX_VALUE,f=a.length,g=0;f>g;g++){var h=a[g].dot(b);d>h&&(d=h),h>e&&(e=h)}c[0]=d,c[1]=e}function g(a,b,c,d,e,g){var h=p.pop(),i=p.pop(),j=n.pop().copy(b).sub(a),k=j.dot(e);if(f(c,e,h),f(d,e,i),i[0]+=k,i[1]+=k,h[0]>i[1]||i[0]>h[1])return n.push(j),p.push(h),p.push(i),!0;if(g){var l=0;if(h[0]<i[0])if(g.aInB=!1,h[1]<i[1])l=h[1]-i[0],g.bInA=!1;else{var m=h[1]-i[0],o=i[1]-h[0];l=o>m?m:-o}else if(g.bInA=!1,h[1]>i[1])l=h[0]-i[1],g.aInB=!1;else{var m=h[1]-i[0],o=i[1]-h[0];l=o>m?m:-o}var q=Math.abs(l);q<g.overlap&&(g.overlap=q,g.overlapN.copy(e),0>l&&g.overlapN.reverse())}return n.push(j),p.push(h),p.push(i),!1}function h(a,b){var c=a.len2(),d=b.dot(a);return 0>d?q:d>c?s:r}function i(a,b,c){var d=n.pop().copy(b.pos).sub(a.pos),e=a.r+b.r,f=e*e,g=d.len2();if(g>f)return n.push(d),!1;if(c){var h=Math.sqrt(g);c.a=a,c.b=b,c.overlap=e-h,c.overlapN.copy(d.normalize()),c.overlapV.copy(d).scale(c.overlap),c.aInB=a.r<=b.r&&h<=b.r-a.r,c.bInA=b.r<=a.r&&h<=a.r-b.r}return n.push(d),!0}function j(a,b,c){for(var d=n.pop().copy(b.pos).sub(a.pos),e=b.r,f=e*e,g=a.points,i=g.length,j=n.pop(),k=n.pop(),l=0;i>l;l++){var m=l===i-1?0:l+1,o=0===l?i-1:l-1,p=0,r=null;j.copy(a.edges[l]),k.copy(d).sub(g[l]),c&&k.len2()>f&&(c.aInB=!1);var t=h(j,k);if(t===q){j.copy(a.edges[o]);var u=n.pop().copy(d).sub(g[o]);if(t=h(j,u),t===s){var v=k.len();if(v>e)return n.push(d),n.push(j),n.push(k),n.push(u),!1;c&&(c.bInA=!1,r=k.normalize(),p=e-v)}n.push(u)}else if(t===s){if(j.copy(a.edges[m]),k.copy(d).sub(g[m]),t=h(j,k),t===q){var v=k.len();if(v>e)return n.push(d),n.push(j),n.push(k),!1;c&&(c.bInA=!1,r=k.normalize(),p=e-v)}}else{var w=j.perp().normalize(),v=k.dot(w),x=Math.abs(v);if(v>0&&x>e)return n.push(d),n.push(w),n.push(k),!1;
c&&(r=w,p=e-v,(v>=0||2*e>p)&&(c.bInA=!1))}r&&c&&Math.abs(p)<Math.abs(c.overlap)&&(c.overlap=p,c.overlapN.copy(r))}return c&&(c.a=a,c.b=b,c.overlapV.copy(c.overlapN).scale(c.overlap)),n.push(d),n.push(j),n.push(k),!0}function k(a,b,c){var d=j(b,a,c);if(d&&c){var e=c.a,f=c.aInB;c.overlapN.reverse(),c.overlapV.reverse(),c.a=c.b,c.b=e,c.aInB=c.bInA,c.bInA=f}return d}function l(a,b,c){for(var d=a.points,e=d.length,f=b.points,h=f.length,i=0;e>i;i++)if(g(a.pos,b.pos,d,f,a.normals[i],c))return!1;for(var i=0;h>i;i++)if(g(a.pos,b.pos,d,f,b.normals[i],c))return!1;return c&&(c.a=a,c.b=b,c.overlapV.copy(c.overlapN).scale(c.overlap)),!0}var m={};m.Vector=a,m.V=a,a.prototype.copy=a.prototype.copy=function(a){return this.x=a.x,this.y=a.y,this},a.prototype.perp=a.prototype.perp=function(){var a=this.x;return this.x=this.y,this.y=-a,this},a.prototype.rotate=a.prototype.rotate=function(a){var b=this.x,c=this.y;return this.x=b*Math.cos(a)-c*Math.sin(a),this.y=b*Math.sin(a)+c*Math.cos(a),this},a.prototype.rotatePrecalc=a.prototype.rotatePrecalc=function(a,b){var c=this.x,d=this.y;return this.x=c*b-d*a,this.y=c*a+d*b,this},a.prototype.reverse=a.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},a.prototype.normalize=a.prototype.normalize=function(){var a=this.len();return a>0&&(this.x=this.x/a,this.y=this.y/a),this},a.prototype.add=a.prototype.add=function(a){return this.x+=a.x,this.y+=a.y,this},a.prototype.sub=a.prototype.sub=function(a){return this.x-=a.x,this.y-=a.y,this},a.prototype.scale=a.prototype.scale=function(a,b){return this.x*=a,this.y*=b||a,this},a.prototype.project=a.prototype.project=function(a){var b=this.dot(a)/a.len2();return this.x=b*a.x,this.y=b*a.y,this},a.prototype.projectN=a.prototype.projectN=function(a){var b=this.dot(a);return this.x=b*a.x,this.y=b*a.y,this},a.prototype.reflect=a.prototype.reflect=function(a){var b=this.x,c=this.y;return this.project(a).scale(2),this.x-=b,this.y-=c,this},a.prototype.reflectN=a.prototype.reflectN=function(a){var b=this.x,c=this.y;return this.projectN(a).scale(2),this.x-=b,this.y-=c,this},a.prototype.dot=a.prototype.dot=function(a){return this.x*a.x+this.y*a.y},a.prototype.len2=a.prototype.len2=function(){return this.dot(this)},a.prototype.len=a.prototype.len=function(){return Math.sqrt(this.len2())},m.Circle=b,m.Polygon=c,c.prototype.recalc=c.prototype.recalc=function(){this.edges=[],this.normals=[];for(var b=this.points,c=b.length,d=0;c>d;d++){var e=b[d],f=c-1>d?b[d+1]:b[0],g=(new a).copy(f).sub(e),h=(new a).copy(g).perp().normalize();this.edges.push(g),this.normals.push(h)}return this},c.prototype.rotate=c.prototype.rotate=function(a){var b,c=this.points,d=this.edges,e=this.normals,f=c.length,g=Math.cos(a),h=Math.sin(a);for(b=0;f>b;b++)c[b].rotatePrecalc(h,g),d[b].rotatePrecalc(h,g),e[b].rotatePrecalc(h,g);return this},c.prototype.scale=c.prototype.scale=function(a,b){var c,d=this.points,e=this.edges,f=this.normals,g=d.length;for(c=0;g>c;c++)d[c].scale(a,b),e[c].scale(a,b),f[c].scale(a,b);return this},c.prototype.translate=c.prototype.translate=function(a,b){var c,d=this.points,e=d.length;for(c=0;e>c;c++)d[c].x+=a,d[c].y+=b;return this},m.Box=d,d.prototype.toPolygon=d.prototype.toPolygon=function(){var b=this.pos,d=this.w,e=this.h;return new c(new a(b.x,b.y),[new a,new a(d,0),new a(d,e),new a(0,e)])},m.Response=e,e.prototype.clear=e.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var n=[],o=0;10>o;o++)n.push(new a);for(var p=[],o=0;5>o;o++)p.push([]);var q=-1,r=0,s=1;return m.testCircleCircle=i,m.testPolygonCircle=j,m.testCirclePolygon=k,m.testPolygonPolygon=l,m}();return c.Physics={},c.Physics.Arcade=function(a){this.game=a,this.gravity=new c.Point,this.worldLeft=null,this.worldRight=null,this.worldTop=null,this.worldBottom=null,this.worldPolys=[null,null,null,null],this.quadTree=new c.QuadTree(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels),this.maxObjects=10,this.maxLevels=4,this._mapData=[],this._mapTiles=0,this._result=!1,this._total=0,this._angle=0,this._drag=0,this._dx=0,this._dy=0,this._p=new c.Point(0,0),this._intersection=[0,0,0,0],this._gravityX=0,this._gravityY=0,this._response=new f.Response,this.setBoundsToWorld(!0,!0,!0,!0)},c.Physics.Arcade.RECT=0,c.Physics.Arcade.CIRCLE=1,c.Physics.Arcade.POLYGON=2,c.Physics.Arcade.prototype={checkBounds:function(a){if(!a.collideWorldBounds||!this.worldLeft&&!this.worldRight&&!this.worldTop&&!this.worldBottom)return!1;this._response.clear();var b=f.testPolygonPolygon,d=a.polygon,e=!1;return a.type===c.Physics.Arcade.CIRCLE&&(b=f.testPolygonCircle,d=a.shape),this.worldLeft&&b(this.worldPolys[0],d,this._response)?(a.blocked.left=!0,d.pos.add(this._response.overlapV),a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),e=!0):this.worldRight&&b(this.worldPolys[1],d,this._response)&&(a.blocked.right=!0,d.pos.add(this._response.overlapV),a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),e=!0),this._response.clear(),this.worldTop&&b(this.worldPolys[2],d,this._response)?(a.blocked.up=!0,d.pos.add(this._response.overlapV),a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),e=!0):this.worldBottom&&b(this.worldPolys[3],d,this._response)&&(a.blocked.down=!0,d.pos.add(this._response.overlapV),a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),e=!0),e},setBoundsToWorld:function(a,b,c,d){this.setBounds(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,a,b,c,d)},setBounds:function(a,b,c,d,e,g,h,i){"undefined"==typeof e&&(e=!0),"undefined"==typeof g&&(g=!0),"undefined"==typeof h&&(h=!0),"undefined"==typeof i&&(i=!0);var j=100;e?(this.worldLeft=new f.Box(new f.Vector(a-j,b),j,d),this.worldPolys[0]=this.worldLeft.toPolygon()):(this.worldLeft=null,this.worldPolys[0]=null),g?(this.worldRight=new f.Box(new f.Vector(a+c,b),j,d),this.worldPolys[1]=this.worldRight.toPolygon()):(this.worldRight=null,this.worldPolys[1]=null),h?(this.worldTop=new f.Box(new f.Vector(a,b-j),c,j),this.worldPolys[2]=this.worldTop.toPolygon()):(this.worldTop=null,this.worldPolys[2]=null),i?(this.worldBottom=new f.Box(new f.Vector(a,b+d),c,j),this.worldPolys[3]=this.worldBottom.toPolygon()):(this.worldBottom=null,this.worldPolys[3]=null)},updateMotion:function(a){return a.allowGravity?(this._gravityX=this.gravity.x+a.gravity.x,this._gravityY=this.gravity.y+a.gravity.y):(this._gravityX=a.gravity.x,this._gravityY=a.gravity.y),(this._gravityX<0&&a.blocked.left||this._gravityX>0&&a.blocked.right)&&(this._gravityX=0),(this._gravityY<0&&a.blocked.up||this._gravityY>0&&a.blocked.down)&&(this._gravityY=0),a.allowRotation&&(this._velocityDelta=a.angularAcceleration*this.game.time.physicsElapsed,0!==a.angularDrag&&0===a.angularAcceleration&&(this._drag=a.angularDrag*this.game.time.physicsElapsed,a.angularVelocity>0?a.angularVelocity-=this._drag:a.angularVelocity<0&&(a.angularVelocity+=this._drag)),a.rotation+=this.game.time.physicsElapsed*(a.angularVelocity+this._velocityDelta/2),a.angularVelocity+=this._velocityDelta,a.angularVelocity>a.maxAngular?a.angularVelocity=a.maxAngular:a.angularVelocity<-a.maxAngular&&(a.angularVelocity=-a.maxAngular)),this._p.setTo((a.acceleration.x+this._gravityX)*this.game.time.physicsElapsed,(a.acceleration.y+this._gravityY)*this.game.time.physicsElapsed),this._p},overlap:function(a,b,c,d,e){if(c=c||null,d=d||null,e=e||c,this._result=!1,this._total=0,Array.isArray(b))for(var f=0,g=b.length;g>f;f++)this.collideHandler(a,b[f],c,d,e,!0);else this.collideHandler(a,b,c,d,e,!0);return this._total>0},collide:function(a,b,c,d,e){if(c=c||null,d=d||null,e=e||c,this._result=!1,this._total=0,Array.isArray(b))for(var f=0,g=b.length;g>f;f++)this.collideHandler(a,b[f],c,d,e,!1);else this.collideHandler(a,b,c,d,e,!1);return this._total>0},collideHandler:function(a,b,d,e,f,g){return"undefined"!=typeof b||a.type!==c.GROUP&&a.type!==c.EMITTER?(a&&b&&a.exists&&b.exists&&(a.type==c.SPRITE||a.type==c.TILESPRITE?b.type==c.SPRITE||b.type==c.TILESPRITE?this.collideSpriteVsSprite(a,b,d,e,f,g):b.type==c.GROUP||b.type==c.EMITTER?this.collideSpriteVsGroup(a,b,d,e,f,g):b.type==c.TILEMAPLAYER&&this.collideSpriteVsTilemapLayer(a,b,d,e,f):a.type==c.GROUP?b.type==c.SPRITE||b.type==c.TILESPRITE?this.collideSpriteVsGroup(b,a,d,e,f,g):b.type==c.GROUP||b.type==c.EMITTER?this.collideGroupVsGroup(a,b,d,e,f,g):b.type==c.TILEMAPLAYER&&this.collideGroupVsTilemapLayer(a,b,d,e,f):a.type==c.TILEMAPLAYER?b.type==c.SPRITE||b.type==c.TILESPRITE?this.collideSpriteVsTilemapLayer(b,a,d,e,f):(b.type==c.GROUP||b.type==c.EMITTER)&&this.collideGroupVsTilemapLayer(b,a,d,e,f):a.type==c.EMITTER&&(b.type==c.SPRITE||b.type==c.TILESPRITE?this.collideSpriteVsGroup(b,a,d,e,f,g):b.type==c.GROUP||b.type==c.EMITTER?this.collideGroupVsGroup(a,b,d,e,f,g):b.type==c.TILEMAPLAYER&&this.collideGroupVsTilemapLayer(a,b,d,e,f))),void 0):(this.collideGroupVsSelf(a,d,e,f,g),void 0)},collideSpriteVsSprite:function(a,b,c,d,e,f){this.separate(a.body,b.body,d,e,f)&&(c&&c.call(e,a,b),this._total++)},collideSpriteVsGroup:function(a,b,d,e,f,g){if(0!==b.length){this.quadTree.clear(),this.quadTree=new c.QuadTree(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels),this.quadTree.populate(b),this._potentials=this.quadTree.retrieve(a);for(var h=0,i=this._potentials.length;i>h;h++)this.separate(a.body,this._potentials[h],e,f,g)&&(d&&d.call(f,a,this._potentials[h].sprite),this._total++)}},collideGroupVsSelf:function(a,b,c,d,e){if(0!==a.length)for(var f=a._container.children.length,g=0;f>g;g++)for(var h=g+1;f>=h;h++)a._container.children[g]&&a._container.children[h]&&a._container.children[g].exists&&a._container.children[h].exists&&this.collideSpriteVsSprite(a._container.children[g],a._container.children[h],b,c,d,e)},collideGroupVsGroup:function(a,b,c,d,e,f){if(0!==a.length&&0!==b.length&&a._container.first._iNext){var g=a._container.first._iNext;do g.exists&&this.collideSpriteVsGroup(g,b,c,d,e,f),g=g._iNext;while(g!=a._container.last._iNext)}},collideSpriteVsTilemapLayer:function(a,b,c,d,e){if(this._mapData=b.getTiles(a.body.left,a.body.top,a.body.width,a.body.height,!0),0!==this._mapData.length)if(this._mapData.length>1)this.separateTiles(a.body,this._mapData);else{var f=0;this.separateTile(a.body,this._mapData[f])&&(d?d.call(e,a,this._mapData[f])&&(this._total++,c&&c.call(e,a,this._mapData[f])):(this._total++,c&&c.call(e,a,this._mapData[f])))}},collideGroupVsTilemapLayer:function(a,b,c,d,e){if(0!==a.length&&a._container.first._iNext){var f=a._container.first._iNext;do f.exists&&this.collideSpriteVsTilemapLayer(f,b,c,d,e),f=f._iNext;while(f!=a._container.last._iNext)}},separate:function(a,b,c,d,e){return a===b||this.intersects(a,b)===!1?!1:c&&c.call(d,a.sprite,b.sprite)===!1?!1:(this._response.clear(),e?a.overlap(b,this._response):a.overlap(b,this._response)?a.separate(b,this._response):!1)},intersects:function(a,b){var c=!1;(a.width<=0||a.height<=0||b.width<=0||b.height<=0)&&(c=!1),c=!(a.right<b.left||a.bottom<b.top||a.left>b.right||a.top>b.bottom),!c&&a.inContact(b)&&a.removeContact(b)},tileIntersects:function(a,b){return a.width<=0||a.height<=0||b.width<=0||b.height<=0?(this._intersection[4]=0,this._intersection):a.right<b.x||a.bottom<b.y||a.left>b.right||a.top>b.bottom?(this._intersection[4]=0,this._intersection):(this._intersection[0]=Math.max(a.left,b.x),this._intersection[1]=Math.max(a.top,b.y),this._intersection[2]=Math.min(a.right,b.right)-this._intersection[0],this._intersection[3]=Math.min(a.bottom,b.bottom)-this._intersection[1],this._intersection[4]=1,this._intersection)},separateTiles:function(a,b){for(var c,d=!1,e=0;e<b.length;e++)c=b[e],this.separateTile(a,c)&&(d=!0);return d},separateTile:function(a,b){if(this._intersection=this.tileIntersects(a,b),0===this._intersection[4]||0===this._intersection[2]||0===this._intersection[3])return!1;if(b.tile.callback||b.layer.callbacks[b.tile.index]){if(b.tile.callback&&b.tile.callback.call(b.tile.callbackContext,a.sprite,b)===!1)return!1;if(b.layer.callbacks[b.tile.index]&&b.layer.callbacks[b.tile.index].callback.call(b.layer.callbacks[b.tile.index].callbackContext,a.sprite,b)===!1)return!1}a.overlapX=0,a.overlapY=0;var c=!1;return a.deltaX()<0&&a.checkCollision.left&&b.tile.faceRight&&!a.blocked.left?(a.overlapX=a.left-b.right,a.overlapX<0?c=!0:a.overlapX=0):a.deltaX()>0&&a.checkCollision.right&&b.tile.faceLeft&&!a.blocked.right&&(a.overlapX=a.right-b.x,a.overlapX>0?c=!0:a.overlapX=0),a.deltaY()<0&&a.checkCollision.up&&b.tile.faceBottom&&!a.blocked.up?(a.overlapY=a.top-b.bottom,a.overlapY<0?c=!0:a.overlapY=0):a.deltaY()>0&&a.checkCollision.down&&b.tile.faceTop&&!a.blocked.down&&(a.overlapY=a.bottom-b.y,a.overlapY>0?c=!0:a.overlapY=0),0!==a.overlapX&&0!==a.overlapY&&(Math.abs(a.overlapX)>Math.abs(a.overlapY)?a.overlapX=0:a.overlapY=0),c?this.processTileSeparation(a):!1},processTileSeparation:function(a){return a.overlapX<0?(a.x-=a.overlapX,a.left-=a.overlapX,a.right-=a.overlapX,a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),a.blocked.left=!0):a.overlapX>0&&(a.x-=a.overlapX,a.left-=a.overlapX,a.right-=a.overlapX,a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),a.blocked.right=!0),a.overlapY<0?(a.y-=a.overlapY,a.top-=a.overlapY,a.bottom-=a.overlapY,a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),a.blocked.up=!0):a.overlapY>0&&(a.y-=a.overlapY,a.top-=a.overlapY,a.bottom-=a.overlapY,a.blocked.x=Math.floor(a.x),a.blocked.y=Math.floor(a.y),a.blocked.down=!0),a.reboundCheck(a.overlapX,a.overlapY,!0),!0},moveToObject:function(a,b,c,d){return"undefined"==typeof c&&(c=60),"undefined"==typeof d&&(d=0),this._angle=Math.atan2(b.y-a.y,b.x-a.x),d>0&&(c=this.distanceBetween(a,b)/(d/1e3)),a.body.velocity.x=Math.cos(this._angle)*c,a.body.velocity.y=Math.sin(this._angle)*c,this._angle},moveToPointer:function(a,b,c,d){return"undefined"==typeof b&&(b=60),c=c||this.game.input.activePointer,"undefined"==typeof d&&(d=0),this._angle=this.angleToPointer(a,c),d>0&&(b=this.distanceToPointer(a,c)/(d/1e3)),a.body.velocity.x=Math.cos(this._angle)*b,a.body.velocity.y=Math.sin(this._angle)*b,this._angle},moveToXY:function(a,b,c,d,e){return"undefined"==typeof d&&(d=60),"undefined"==typeof e&&(e=0),this._angle=Math.atan2(c-a.y,b-a.x),e>0&&(d=this.distanceToXY(a,b,c)/(e/1e3)),a.body.velocity.x=Math.cos(this._angle)*d,a.body.velocity.y=Math.sin(this._angle)*d,this._angle},velocityFromAngle:function(a,b,d){return"undefined"==typeof b&&(b=60),d=d||new c.Point,d.setTo(Math.cos(this.game.math.degToRad(a))*b,Math.sin(this.game.math.degToRad(a))*b)},velocityFromRotation:function(a,b,d){return"undefined"==typeof b&&(b=60),d=d||new c.Point,d.setTo(Math.cos(a)*b,Math.sin(a)*b)},accelerationFromRotation:function(a,b,d){return"undefined"==typeof b&&(b=60),d=d||new c.Point,d.setTo(Math.cos(a)*b,Math.sin(a)*b)},accelerateToObject:function(a,b,c,d,e){return"undefined"==typeof c&&(c=60),"undefined"==typeof d&&(d=1e3),"undefined"==typeof e&&(e=1e3),this._angle=this.angleBetween(a,b),a.body.acceleration.setTo(Math.cos(this._angle)*c,Math.sin(this._angle)*c),a.body.maxVelocity.setTo(d,e),this._angle},accelerateToPointer:function(a,b,c,d,e){return"undefined"==typeof c&&(c=60),"undefined"==typeof b&&(b=this.game.input.activePointer),"undefined"==typeof d&&(d=1e3),"undefined"==typeof e&&(e=1e3),this._angle=this.angleToPointer(a,b),a.body.acceleration.setTo(Math.cos(this._angle)*c,Math.sin(this._angle)*c),a.body.maxVelocity.setTo(d,e),this._angle},accelerateToXY:function(a,b,c,d,e,f){return"undefined"==typeof d&&(d=60),"undefined"==typeof e&&(e=1e3),"undefined"==typeof f&&(f=1e3),this._angle=this.angleToXY(a,b,c),a.body.acceleration.setTo(Math.cos(this._angle)*d,Math.sin(this._angle)*d),a.body.maxVelocity.setTo(e,f),this._angle},distanceBetween:function(a,b){return this._dx=a.x-b.x,this._dy=a.y-b.y,Math.sqrt(this._dx*this._dx+this._dy*this._dy)},distanceToXY:function(a,b,c){return this._dx=a.x-b,this._dy=a.y-c,Math.sqrt(this._dx*this._dx+this._dy*this._dy)},distanceToPointer:function(a,b){return b=b||this.game.input.activePointer,this._dx=a.x-b.x,this._dy=a.y-b.y,Math.sqrt(this._dx*this._dx+this._dy*this._dy)},angleBetween:function(a,b){return this._dx=b.x-a.x,this._dy=b.y-a.y,Math.atan2(this._dy,this._dx)},angleToXY:function(a,b,c){return this._dx=b-a.x,this._dy=c-a.y,Math.atan2(this._dy,this._dx)},angleToPointer:function(a,b){return b=b||this.game.input.activePointer,this._dx=b.worldX-a.x,this._dy=b.worldY-a.y,Math.atan2(this._dy,this._dx)}},c.Physics.Arcade.prototype.constructor=c.Physics.Arcade,c.Physics.Arcade.Body=function(a){this.sprite=a,this.game=a.game,this.offset=new c.Point,this.preX=a.world.x,this.preY=a.world.y,this.preRotation=a.angle,this.velocity=new c.Point,this.acceleration=new c.Point,this.speed=0,this.angle=0,this.gravity=new c.Point,this.bounce=new c.Point,this.minVelocity=new c.Point,this.maxVelocity=new c.Point(1e3,1e3),this.angularVelocity=0,this.angularAcceleration=0,this.angularDrag=0,this.maxAngular=1e3,this.mass=1,this.linearDamping=0,this.checkCollision={none:!1,any:!0,up:!0,down:!0,left:!0,right:!0},this.touching={none:!0,up:!1,down:!1,left:!1,right:!1},this.blocked={x:0,y:0,up:!1,down:!1,left:!1,right:!1},this.facing=c.NONE,this.rebound=!0,this.immovable=!1,this.moves=!0,this.rotation=0,this.allowRotation=!0,this.allowGravity=!0,this.customSeparateCallback=null,this.customSeparateContext=null,this.collideCallback=null,this.collideCallbackContext=null,this.collideWorldBounds=!1,this.type=c.Physics.Arcade.RECT,this.shape=null,this.polygon=null,this.left=0,this.right=0,this.top=0,this.bottom=0,this.width=0,this.height=0,this.contacts=[],this.overlapX=0,this.overlapY=0,this._temp=null,this._dx=0,this._dy=0,this._sx=a.scale.x,this._sy=a.scale.y,this._distances=[0,0,0,0],this._vx=0,this._vy=0,this.setRectangle(a.width,a.height,0,0),this.sprite.events.onBeginContact=new c.Signal,this.sprite.events.onEndContact=new c.Signal},c.Physics.Arcade.Body.prototype={updateScale:function(){this.polygon?this.polygon.scale(this.sprite.scale.x/this._sx,this.sprite.scale.y/this._sy):this.shape.r*=Math.max(this.sprite.scale.x,this.sprite.scale.y),this._sx=this.sprite.scale.x,this._sy=this.sprite.scale.y},preUpdate:function(){this.x=this.sprite.world.x-this.sprite.anchor.x*this.sprite.width+this.offset.x,this.y=this.sprite.world.y-this.sprite.anchor.y*this.sprite.height+this.offset.y,this.preX=this.x,this.preY=this.y,this.preRotation=this.sprite.angle,this.rotation=this.preRotation,(this.sprite.scale.x!==this._sx||this.sprite.scale.y!==this._sy)&&this.updateScale(),this.checkBlocked(),this.touching.none=!0,this.touching.up=!1,this.touching.down=!1,this.touching.left=!1,this.touching.right=!1,this.moves?((this._vx!==this.velocity.x||this._vy!==this.velocity.y)&&(this._vx=this.velocity.x,this._vy=this.velocity.y,this.speed=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y),this.angle=Math.atan2(this.velocity.y,this.velocity.x)),this.game.physics.checkBounds(this)&&this.reboundCheck(!0,!0,!0),this.applyDamping(),this.integrateVelocity(),this.updateBounds(),this.checkBlocked()):this.updateBounds()},checkBlocked:function(){!this.blocked.left&&!this.blocked.right||Math.floor(this.x)===this.blocked.x&&Math.floor(this.y)===this.blocked.y||(this.blocked.left=!1,this.blocked.right=!1),!this.blocked.up&&!this.blocked.down||Math.floor(this.x)===this.blocked.x&&Math.floor(this.y)===this.blocked.y||(this.blocked.up=!1,this.blocked.down=!1)},updateBounds:function(){this.type===c.Physics.Arcade.CIRCLE?(this.left=this.shape.pos.x-this.shape.r,this.right=this.shape.pos.x+this.shape.r,this.top=this.shape.pos.y-this.shape.r,this.bottom=this.shape.pos.y+this.shape.r):(this.left=c.Math.minProperty("x",this.polygon.points)+this.polygon.pos.x,this.right=c.Math.maxProperty("x",this.polygon.points)+this.polygon.pos.x,this.top=c.Math.minProperty("y",this.polygon.points)+this.polygon.pos.y,this.bottom=c.Math.maxProperty("y",this.polygon.points)+this.polygon.pos.y),this.width=this.right-this.left,this.height=this.bottom-this.top},applyDamping:function(){this.linearDamping>0&&this.acceleration.isZero()&&(this.speed>this.linearDamping?this.speed-=this.linearDamping:this.speed=0,this.speed>0&&(this.velocity.x=Math.cos(this.angle)*this.speed,this.velocity.y=Math.sin(this.angle)*this.speed,this.speed=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y),this.angle=Math.atan2(this.velocity.y,this.velocity.x)))},reboundCheck:function(a,b,c){if(a&&(c&&0!==this.bounce.x&&(this.blocked.left||this.blocked.right||this.touching.left||this.touching.right)&&(this._vx<=0&&this.velocity.x>0||this._vx>=0&&this.velocity.x<0||(this.velocity.x*=-this.bounce.x,this.angle=Math.atan2(this.velocity.y,this.velocity.x))),0===this.bounce.x||Math.abs(this.velocity.x)<this.minVelocity.x)){var d=this.getUpwardForce();((this.blocked.left||this.touching.left)&&(0>d||this.velocity.x<0)||(this.blocked.right||this.touching.right)&&(d>0||this.velocity.x>0))&&(this.velocity.x=0)}if(b&&(c&&0!==this.bounce.y&&(this.blocked.up||this.blocked.down||this.touching.up||this.touching.down)&&(this._vy<=0&&this.velocity.y>0||this._vy>=0&&this.velocity.y<0||(this.velocity.y*=-this.bounce.y,this.angle=Math.atan2(this.velocity.y,this.velocity.x))),0===this.bounce.y||Math.abs(this.velocity.y)<this.minVelocity.y)){var e=this.getDownwardForce();((this.blocked.up||this.touching.up)&&(0>e||this.velocity.y<0)||(this.blocked.down||this.touching.down)&&(e>0||this.velocity.y>0))&&(this.velocity.y=0)}},getUpwardForce:function(){return this.allowGravity?this.gravity.x+this.game.physics.gravity.x+this.velocity.x:this.gravity.x+this.velocity.x},getDownwardForce:function(){return this.allowGravity?this.gravity.y+this.game.physics.gravity.y+this.velocity.y:this.gravity.y+this.velocity.y},sub:function(a){this.x-=a.x,this.y-=a.y},add:function(a){this.x+=a.x,this.y+=a.y},give:function(a,b){this.add(b.overlapV),this.rebound&&(this.processRebound(a),this.reboundCheck(!0,!0,!1),a.reboundCheck(!0,!0,!1))},take:function(a,b){this.sub(b.overlapV),this.rebound&&(this.processRebound(a),this.reboundCheck(!0,!0,!1),a.reboundCheck(!0,!0,!1))},split:function(a,b){b.overlapV.scale(.5),this.sub(b.overlapV),a.add(b.overlapV),this.rebound&&(this.exchange(a),this.reboundCheck(!0,!0,!1),a.reboundCheck(!0,!0,!1))},exchange:function(a){if(this.mass===a.mass&&this.speed>0&&a.speed>0)this._dx=a.velocity.x,this._dy=a.velocity.y,a.velocity.x=this.velocity.x*a.bounce.x,a.velocity.y=this.velocity.y*a.bounce.x,this.velocity.x=this._dx*this.bounce.x,this.velocity.y=this._dy*this.bounce.y;else{var b=Math.sqrt(a.velocity.x*a.velocity.x*a.mass/this.mass)*(a.velocity.x>0?1:-1),c=Math.sqrt(this.velocity.x*this.velocity.x*this.mass/a.mass)*(this.velocity.x>0?1:-1),d=.5*(b+c);b-=d,c-=d,this.velocity.x=b,a.velocity.x=c,b=Math.sqrt(a.velocity.y*a.velocity.y*a.mass/this.mass)*(a.velocity.y>0?1:-1),c=Math.sqrt(this.velocity.y*this.velocity.y*this.mass/a.mass)*(this.velocity.y>0?1:-1),d=.5*(b+c),b-=d,c-=d,this.velocity.y=b,a.velocity.y=c}},processRebound:function(a){this._vx<=0&&this.velocity.x>0||this._vx>=0&&this.velocity.x<0||(this.velocity.x=a.velocity.x-this.velocity.x*this.bounce.x),this._vy<=0&&this.velocity.y>0||this._vy>=0&&this.velocity.y<0||(this.velocity.y=a.velocity.y-this.velocity.y*this.bounce.y),this.angle=Math.atan2(this.velocity.y,this.velocity.x),this.reboundCheck(!0,!0,!1)},overlap:function(a,b){var d=!1;return this.type!==c.Physics.Arcade.RECT&&this.type!==c.Physics.Arcade.POLYGON||a.type!==c.Physics.Arcade.RECT&&a.type!==c.Physics.Arcade.POLYGON?this.type===c.Physics.Arcade.CIRCLE&&a.type===c.Physics.Arcade.CIRCLE?d=f.testCircleCircle(this.shape,a.shape,b):this.type!==c.Physics.Arcade.RECT&&this.type!==c.Physics.Arcade.POLYGON||a.type!==c.Physics.Arcade.CIRCLE?this.type!==c.Physics.Arcade.CIRCLE||a.type!==c.Physics.Arcade.RECT&&a.type!==c.Physics.Arcade.POLYGON||(d=f.testCirclePolygon(this.shape,a.polygon,b)):d=f.testPolygonCircle(this.polygon,a.shape,b):d=f.testPolygonPolygon(this.polygon,a.polygon,b),d||this.removeContact(a),d},inContact:function(a){return-1!=this.contacts.indexOf(a)},addContact:function(a){return this.inContact(a)?!1:(this.contacts.push(a),this.sprite.events.onBeginContact.dispatch(this.sprite,a.sprite,this,a),a.addContact(this),!0)},removeContact:function(a){return this.inContact(a)?(this.contacts.splice(this.contacts.indexOf(a),1),this.sprite.events.onEndContact.dispatch(this.sprite,a.sprite,this,a),a.removeContact(this),!0):!1},separate:function(a,b){if(this._distances[0]=a.right-this.x,this._distances[1]=this.right-a.x,this._distances[2]=a.bottom-this.y,this._distances[3]=this.bottom-a.y,!b.overlapN.x||0!==this._distances[0]&&0!==this._distances[1]?!b.overlapN.y||0!==this._distances[2]&&0!==this._distances[3]||(b.overlapN.x=!0,b.overlapN.y=!1):(b.overlapN.x=!1,b.overlapN.y=!0),this.customSeparateCallback)return this.customSeparateCallback.call(this.customSeparateContext,this,b,this._distances);var c=!1;return b.overlapN.x?this._distances[0]<this._distances[1]?c=this.hitLeft(a,b):this._distances[1]<this._distances[0]&&(c=this.hitRight(a,b)):b.overlapN.y&&(this._distances[2]<this._distances[3]?c=this.hitTop(a,b):this._distances[3]<this._distances[2]&&(c=this.hitBottom(a,b))),c?(this.game.physics.checkBounds(this),this.game.physics.checkBounds(a)):this.checkCollision.up&&this.checkCollision.down&&this.checkCollision.left&&this.checkCollision.right&&a.checkCollision.up&&a.checkCollision.down&&a.checkCollision.left&&a.checkCollision.right||this.addContact(a),c},hitLeft:function(a,b){return this.checkCollision.left&&a.checkCollision.right?this.collideCallback&&!this.collideCallback.call(this.collideCallbackContext,c.LEFT,this,a,b)?!1:(!this.moves||this.immovable||this.blocked.right||this.touching.right?a.give(this,b):a.immovable||a.blocked.left||a.touching.left?this.take(a,b):this.split(a,b),this.touching.left=!0,a.touching.right=!0,!0):!1},hitRight:function(a,b){return this.checkCollision.right&&a.checkCollision.left?this.collideCallback&&!this.collideCallback.call(this.collideCallbackContext,c.RIGHT,this,a)?!1:(!this.moves||this.immovable||this.blocked.left||this.touching.left?a.give(this,b):a.immovable||a.blocked.right||a.touching.right?this.take(a,b):this.split(a,b),this.touching.right=!0,a.touching.left=!0,!0):!1},hitTop:function(a,b){return this.checkCollision.up&&a.checkCollision.down?this.collideCallback&&!this.collideCallback.call(this.collideCallbackContext,c.UP,this,a)?!1:(!this.moves||this.immovable||this.blocked.down||this.touching.down?a.give(this,b):a.immovable||a.blocked.up||a.touching.up?this.take(a,b):this.split(a,b),this.touching.up=!0,a.touching.down=!0,!0):!1},hitBottom:function(a,b){return this.checkCollision.down&&a.checkCollision.up?this.collideCallback&&!this.collideCallback.call(this.collideCallbackContext,c.DOWN,this,a)?!1:(!this.moves||this.immovable||this.blocked.up||this.touching.up?a.give(this,b):a.immovable||a.blocked.down||a.touching.down?this.take(a,b):this.split(a,b),this.touching.down=!0,a.touching.up=!0,!0):!1},integrateVelocity:function(){this._temp=this.game.physics.updateMotion(this),this._dx=this.game.time.physicsElapsed*(this.velocity.x+this._temp.x/2),this._dy=this.game.time.physicsElapsed*(this.velocity.y+this._temp.y/2),(this._dx<0&&!this.blocked.left&&!this.touching.left||this._dx>0&&!this.blocked.right&&!this.touching.right)&&(this.x+=this._dx,this.velocity.x+=this._temp.x),(this._dy<0&&!this.blocked.up&&!this.touching.up||this._dy>0&&!this.blocked.down&&!this.touching.down)&&(this.y+=this._dy,this.velocity.y+=this._temp.y),this.velocity.x>this.maxVelocity.x?this.velocity.x=this.maxVelocity.x:this.velocity.x<-this.maxVelocity.x&&(this.velocity.x=-this.maxVelocity.x),this.velocity.y>this.maxVelocity.y?this.velocity.y=this.maxVelocity.y:this.velocity.y<-this.maxVelocity.y&&(this.velocity.y=-this.maxVelocity.y)},postUpdate:function(){this.moves&&(this.game.physics.checkBounds(this),this.reboundCheck(!0,!0,!0),this._dx=this.deltaX(),this._dy=this.deltaY(),this._dx<0?this.facing=c.LEFT:this._dx>0&&(this.facing=c.RIGHT),this._dy<0?this.facing=c.UP:this._dy>0&&(this.facing=c.DOWN),(0!==this._dx||0!==this._dy)&&(this.sprite.x+=this._dx,this.sprite.y+=this._dy),this.allowRotation&&0!==this.deltaZ()&&(this.sprite.angle+=this.deltaZ()),(this.sprite.scale.x!==this._sx||this.sprite.scale.y!==this._sy)&&this.updateScale())},reset:function(a){"undefined"==typeof a&&(a=!1),a&&(this.gravity.setTo(0,0),this.bounce.setTo(0,0),this.minVelocity.setTo(5,5),this.maxVelocity.setTo(1e3,1e3),this.angularDrag=0,this.maxAngular=1e3,this.mass=1,this.friction=0,this.checkCollision={none:!1,any:!0,up:!0,down:!0,left:!0,right:!0}),this.velocity.setTo(0,0),this.acceleration.setTo(0,0),this.angularVelocity=0,this.angularAcceleration=0,this.blocked={x:0,y:0,up:!1,down:!1,left:!1,right:!1},this.x=this.sprite.world.x-this.sprite.anchor.x*this.sprite.width+this.offset.x,this.y=this.sprite.world.y-this.sprite.anchor.y*this.sprite.height+this.offset.y,this.preX=this.x,this.preY=this.y,this.updateBounds(),this.contacts.length=0},destroy:function(){this.sprite=null,this.collideCallback=null,this.collideCallbackContext=null,this.customSeparateCallback=null,this.customSeparateContext=null,this.contacts.length=0},setCircle:function(a,b,d){"undefined"==typeof b&&(b=this.sprite._cache.halfWidth),"undefined"==typeof d&&(d=this.sprite._cache.halfHeight),this.type=c.Physics.Arcade.CIRCLE,this.shape=new f.Circle(new f.Vector(this.sprite.x,this.sprite.y),a),this.polygon=null,this.offset.setTo(b,d)},setRectangle:function(a,b,d,e){"undefined"==typeof a&&(a=this.sprite.width),"undefined"==typeof b&&(b=this.sprite.height),"undefined"==typeof d&&(d=-this.sprite._cache.halfWidth),"undefined"==typeof e&&(e=-this.sprite._cache.halfHeight),this.type=c.Physics.Arcade.RECT,this.shape=new f.Box(new f.Vector(this.sprite.world.x,this.sprite.world.y),a,b),this.polygon=this.shape.toPolygon(),this.polygon.translate(d,e),this.offset.setTo(0,0)},setPolygon:function(a){if(this.type=c.Physics.Arcade.POLYGON,this.shape=null,Array.isArray(a)||(a=Array.prototype.slice.call(arguments)),"number"==typeof a[0]){for(var b=[],d=0,e=a.length;e>d;d+=2)b.push(new f.Vector(a[d],a[d+1]));a=b}this.polygon=new f.Polygon(new f.Vector(this.sprite.center.x,this.sprite.center.y),a),this.offset.setTo(0,0)},translate:function(a,b){this.polygon&&this.polygon.translate(a,b)},onFloor:function(){return this.blocked.down},onWall:function(){return!this.blocked.down&&(this.blocked.left||this.blocked.right)},deltaX:function(){return this.x-this.preX},deltaY:function(){return this.y-this.preY},deltaZ:function(){return this.rotation-this.preRotation}},c.Physics.Arcade.Body.prototype.constructor=c.Physics.Arcade.Body,Object.defineProperty(c.Physics.Arcade.Body.prototype,"x",{get:function(){return this.type===c.Physics.Arcade.CIRCLE?this.shape.pos.x:this.polygon.pos.x},set:function(a){this.type===c.Physics.Arcade.CIRCLE?this.shape.pos.x=a:this.polygon.pos.x=a}}),Object.defineProperty(c.Physics.Arcade.Body.prototype,"y",{get:function(){return this.type===c.Physics.Arcade.CIRCLE?this.shape.pos.y:this.polygon.pos.y},set:function(a){this.type===c.Physics.Arcade.CIRCLE?this.shape.pos.y=a:this.polygon.pos.y=a}}),c.Particles=function(a){this.game=a,this.emitters={},this.ID=0},c.Particles.prototype={add:function(a){return this.emitters[a.name]=a,a},remove:function(a){delete this.emitters[a.name]},update:function(){for(var a in this.emitters)this.emitters[a].exists&&this.emitters[a].update()}},c.Particles.prototype.constructor=c.Particles,c.Particles.Arcade={},c.Particles.Arcade.Emitter=function(a,b,d,e){this.maxParticles=e||50,c.Group.call(this,a),this.name="emitter"+this.game.particles.ID++,this.type=c.EMITTER,this.x=0,this.y=0,this.width=1,this.height=1,this.minParticleSpeed=new c.Point(-100,-100),this.maxParticleSpeed=new c.Point(100,100),this.minParticleScale=1,this.maxParticleScale=1,this.minRotation=-360,this.maxRotation=360,this.gravity=100,this.particleClass=null,this.particleFriction=0,this.angularDrag=0,this.frequency=100,this.lifespan=2e3,this.bounce=new c.Point,this._quantity=0,this._timer=0,this._counter=0,this._explode=!0,this.on=!1,this.exists=!0,this.emitX=b,this.emitY=d
},c.Particles.Arcade.Emitter.prototype=Object.create(c.Group.prototype),c.Particles.Arcade.Emitter.prototype.constructor=c.Particles.Arcade.Emitter,c.Particles.Arcade.Emitter.prototype.update=function(){if(this.on)if(this._explode){this._counter=0;do this.emitParticle(),this._counter++;while(this._counter<this._quantity);this.on=!1}else this.game.time.now>=this._timer&&(this.emitParticle(),this._counter++,this._quantity>0&&this._counter>=this._quantity&&(this.on=!1),this._timer=this.game.time.now+this.frequency)},c.Particles.Arcade.Emitter.prototype.makeParticles=function(a,b,d,e,f){"undefined"==typeof b&&(b=0),"undefined"==typeof d&&(d=this.maxParticles),"undefined"==typeof e&&(e=!1),"undefined"==typeof f&&(f=!1);for(var g,h=0,i=a,j=b;d>h;)null===this.particleClass&&("object"==typeof a&&(i=this.game.rnd.pick(a)),"object"==typeof b&&(j=this.game.rnd.pick(b)),g=new c.Sprite(this.game,0,0,i,j)),e?(g.body.checkCollision.any=!0,g.body.checkCollision.none=!1):g.body.checkCollision.none=!0,g.body.collideWorldBounds=f,g.exists=!1,g.visible=!1,g.anchor.setTo(.5,.5),this.add(g),h++;return this},c.Particles.Arcade.Emitter.prototype.kill=function(){this.on=!1,this.alive=!1,this.exists=!1},c.Particles.Arcade.Emitter.prototype.revive=function(){this.alive=!0,this.exists=!0},c.Particles.Arcade.Emitter.prototype.start=function(a,b,c,d){"undefined"==typeof a&&(a=!0),"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=250),"undefined"==typeof d&&(d=0),this.revive(),this.visible=!0,this.on=!0,this._explode=a,this.lifespan=b,this.frequency=c,a?this._quantity=d:this._quantity+=d,this._counter=0,this._timer=this.game.time.now+c},c.Particles.Arcade.Emitter.prototype.emitParticle=function(){var a=this.getFirstExists(!1);if(null!=a){if(this.width>1||this.height>1?a.reset(this.game.rnd.integerInRange(this.left,this.right),this.game.rnd.integerInRange(this.top,this.bottom)):a.reset(this.emitX,this.emitY),a.lifespan=this.lifespan,a.body.bounce.setTo(this.bounce.x,this.bounce.y),a.body.velocity.x=this.minParticleSpeed.x!=this.maxParticleSpeed.x?this.game.rnd.integerInRange(this.minParticleSpeed.x,this.maxParticleSpeed.x):this.minParticleSpeed.x,a.body.velocity.y=this.minParticleSpeed.y!=this.maxParticleSpeed.y?this.game.rnd.integerInRange(this.minParticleSpeed.y,this.maxParticleSpeed.y):this.minParticleSpeed.y,a.body.gravity.y=this.gravity,a.body.angularVelocity=this.minRotation!=this.maxRotation?this.game.rnd.integerInRange(this.minRotation,this.maxRotation):this.minRotation,1!==this.minParticleScale||1!==this.maxParticleScale){var b=this.game.rnd.realInRange(this.minParticleScale,this.maxParticleScale);a.scale.setTo(b,b)}a.body.friction=this.particleFriction,a.body.angularDrag=this.angularDrag}},c.Particles.Arcade.Emitter.prototype.setSize=function(a,b){this.width=a,this.height=b},c.Particles.Arcade.Emitter.prototype.setXSpeed=function(a,b){a=a||0,b=b||0,this.minParticleSpeed.x=a,this.maxParticleSpeed.x=b},c.Particles.Arcade.Emitter.prototype.setYSpeed=function(a,b){a=a||0,b=b||0,this.minParticleSpeed.y=a,this.maxParticleSpeed.y=b},c.Particles.Arcade.Emitter.prototype.setRotation=function(a,b){a=a||0,b=b||0,this.minRotation=a,this.maxRotation=b},c.Particles.Arcade.Emitter.prototype.at=function(a){a.center&&(this.emitX=a.center.x,this.emitY=a.center.y)},Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"alpha",{get:function(){return this._container.alpha},set:function(a){this._container.alpha=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"visible",{get:function(){return this._container.visible},set:function(a){this._container.visible=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"x",{get:function(){return this.emitX},set:function(a){this.emitX=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"y",{get:function(){return this.emitY},set:function(a){this.emitY=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"left",{get:function(){return Math.floor(this.x-this.width/2)}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"right",{get:function(){return Math.floor(this.x+this.width/2)}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"top",{get:function(){return Math.floor(this.y-this.height/2)}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"bottom",{get:function(){return Math.floor(this.y+this.height/2)}}),c.Tile=function(a,b,c,d,e,f){this.layer=a,this.index=b,this.x=c,this.y=d,this.width=e,this.height=f,this.alpha=1,this.properties={},this.scanned=!1,this.faceTop=!1,this.faceBottom=!1,this.faceLeft=!1,this.faceRight=!1,this.collides=!1,this.collideNone=!0,this.collideLeft=!1,this.collideRight=!1,this.collideUp=!1,this.collideDown=!1,this.callback=null,this.callbackContext=this},c.Tile.prototype={setCollisionCallback:function(a,b){this.collisionCallbackContext=b,this.collisionCallback=a},destroy:function(){this.collisionCallback=null,this.collisionCallbackContext=null,this.properties=null},setCollision:function(a,b,c,d){this.collideLeft=a,this.collideRight=b,this.collideUp=c,this.collideDown=d,this.collideNone=a||b||c||d?!1:!0},resetCollision:function(){this.collideNone=!0,this.collideLeft=!1,this.collideRight=!1,this.collideUp=!1,this.collideDown=!1},copy:function(a){this.index=a.index,this.alpha=a.alpha,this.properties=a.properties,this.collides=a.collides,this.collideNone=a.collideNone,this.collideUp=a.collideUp,this.collideDown=a.collideDown,this.collideLeft=a.collideLeft,this.collideRight=a.collideRight,this.collisionCallback=a.collisionCallback,this.collisionCallbackContext=a.collisionCallbackContext}},c.Tile.prototype.constructor=c.Tile,Object.defineProperty(c.Tile.prototype,"canCollide",{get:function(){return this.collides||this.collisionCallback||this.layer.callbacks[this.index]}}),Object.defineProperty(c.Tile.prototype,"left",{get:function(){return this.x}}),Object.defineProperty(c.Tile.prototype,"right",{get:function(){return this.x+this.width}}),Object.defineProperty(c.Tile.prototype,"top",{get:function(){return this.y}}),Object.defineProperty(c.Tile.prototype,"bottom",{get:function(){return this.y+this.height}}),c.Tilemap=function(a,b){this.game=a,this.key=b;var d=c.TilemapParser.parse(this.game,b);null!==d&&(this.width=d.width,this.height=d.height,this.tileWidth=d.tileWidth,this.tileHeight=d.tileHeight,this.orientation=d.orientation,this.version=d.version,this.properties=d.properties,this.widthInPixels=d.widthInPixels,this.heightInPixels=d.heightInPixels,this.layers=d.layers,this.tilesets=d.tilesets,this.tiles=d.tiles,this.objects=d.objects,this.images=d.images,this.currentLayer=0,this.debugMap=[],this._results=[],this._tempA=0,this._tempB=0)},c.Tilemap.CSV=0,c.Tilemap.TILED_JSON=1,c.Tilemap.prototype={create:function(a,b,d){for(var e=[],f=0;d>f;f++){e[f]=[];for(var g=0;b>g;g++)e[f][g]=0}this.layers.push({name:a,width:b,height:d,alpha:1,visible:!0,tileMargin:0,tileSpacing:0,format:c.Tilemap.CSV,data:e,indexes:[],dirty:!0}),this.currentLayer=this.layers.length-1},addTilesetImage:function(a,b){if("undefined"==typeof b){if("string"!=typeof a)return!1;b=a}return"string"==typeof a&&(a=this.getTilesetIndex(a)),this.tilesets[a]?(this.tilesets[a].image=this.game.cache.getImage(b),!0):!1},createFromObjects:function(a,b,c,d,e,f,g){if("undefined"==typeof e&&(e=!0),"undefined"==typeof f&&(f=!0),"undefined"==typeof g&&(g=this.game.world),!this.objects[a])return console.warn("Tilemap.createFromObjects: Invalid objectgroup name given: "+a),void 0;for(var h,i=0,j=this.objects[a].length;j>i;i++)if(this.objects[a][i].gid===b){h=g.create(this.objects[a][i].x,this.objects[a][i].y,c,d,e),h.anchor.setTo(0,1),h.name=this.objects[a][i].name,h.visible=this.objects[a][i].visible,h.autoCull=f;for(property in this.objects[a][i].properties)g.set(h,property,this.objects[a][i].properties[property],!1,!1,0)}},createLayer:function(a,b,d,e){"undefined"==typeof b&&(b=this.game.width),"undefined"==typeof d&&(d=this.game.height),"undefined"==typeof e&&(e=this.game.world);var f=a;return"string"==typeof a&&(f=this.getLayerIndex(a)),null===f||f>this.layers.length?(console.warn("Tilemap.createLayer: Invalid layer ID given: "+f),void 0):e.add(new c.TilemapLayer(this.game,this,f,b,d))},getIndex:function(a,b){for(var c=0;c<a.length;c++)if(a[c].name===b)return c;return null},getLayerIndex:function(a){return this.getIndex(this.layers,a)},getTilesetIndex:function(a){return this.getIndex(this.tilesets,a)},getImageIndex:function(a){return this.getIndex(this.images,a)},getObjectIndex:function(a){return this.getIndex(this.objects,a)},setTileIndexCallback:function(a,b,c,d){if(d=this.getLayer(d),"number"==typeof a)this.layers[d].callbacks[a]={callback:b,callbackContext:c};else for(var e=0,f=a.length;f>e;e++)this.layers[d].callbacks[a[e]]={callback:b,callbackContext:c}},setTileLocationCallback:function(a,b,c,d,e,f,g){if(g=this.getLayer(g),this.copy(a,b,c,d,g),!(this._results.length<2))for(var h=1;h<this._results.length;h++)this._results[h].setCollisionCallback(e,f)},setCollision:function(a,b,c){if("undefined"==typeof b&&(b=!0),c=this.getLayer(c),"number"==typeof a)return this.setCollisionByIndex(a,b,c,!0);for(var d=0,e=a.length;e>d;d++)this.setCollisionByIndex(a[d],b,c,!1);this.calculateFaces(c)},setCollisionBetween:function(a,b,c,d){if("undefined"==typeof c&&(c=!0),d=this.getLayer(d),!(a>b)){for(var e=a;b>=e;e++)this.setCollisionByIndex(e,c,d,!1);this.calculateFaces(d)}},setCollisionByExclusion:function(a,b,c){"undefined"==typeof b&&(b=!0),c=this.getLayer(c);for(var d=0,e=this.tiles.length;e>d;d++)-1===a.indexOf(d)&&this.setCollisionByIndex(d,b,c,!1);this.calculateFaces(c)},setCollisionByIndex:function(a,b,c,d){"undefined"==typeof b&&(b=!0),"undefined"==typeof c&&(c=this.currentLayer),"undefined"==typeof d&&(d=!0);for(var e=0;e<this.layers[c].height;e++)for(var f=0;f<this.layers[c].width;f++){var g=this.layers[c].data[e][f];g&&g.index===a&&(g.collides=b,g.faceTop=b,g.faceBottom=b,g.faceLeft=b,g.faceRight=b)}return d&&this.calculateFaces(c),c},getLayer:function(a){return"undefined"==typeof a?a=this.currentLayer:"string"==typeof a?a=this.getLayerIndex(a):a instanceof c.TilemapLayer&&(a=a.index),a},calculateFaces:function(a){for(var b=null,c=null,d=null,e=null,f=0,g=this.layers[a].height;g>f;f++)for(var h=0,i=this.layers[a].width;i>h;h++){var j=this.layers[a].data[f][h];j&&(b=this.getTileAbove(a,h,f),c=this.getTileBelow(a,h,f),d=this.getTileLeft(a,h,f),e=this.getTileRight(a,h,f),b&&b.collides&&(j.faceTop=!1),c&&c.collides&&(j.faceBottom=!1),d&&d.collides&&(j.faceLeft=!1),e&&e.collides&&(j.faceRight=!1))}},getTileAbove:function(a,b,c){return c>0?this.layers[a].data[c-1][b]:null},getTileBelow:function(a,b,c){return c<this.layers[a].height-1?this.layers[a].data[c+1][b]:null},getTileLeft:function(a,b,c){return b>0?this.layers[a].data[c][b-1]:null},getTileRight:function(a,b,c){return b<this.layers[a].width-1?this.layers[a].data[c][b+1]:null},setLayer:function(a){a=this.getLayer(a),this.layers[a]&&(this.currentLayer=a)},putTile:function(a,b,d,e){e=this.getLayer(e),b>=0&&b<this.layers[e].width&&d>=0&&d<this.layers[e].height&&(a instanceof c.Tile?this.layers[e].data[d][b].copy(a):this.layers[e].data[d][b].index=a,this.layers[e].dirty=!0,this.calculateFaces(e))},putTileWorldXY:function(a,b,c,d,e,f){f=this.getLayer(f),b=this.game.math.snapToFloor(b,d)/d,c=this.game.math.snapToFloor(c,e)/e,this.putTile(a,b,c,f)},getTile:function(a,b,c){return c=this.getLayer(c),a>=0&&a<this.layers[c].width&&b>=0&&b<this.layers[c].height?this.layers[c].data[b][a]:void 0},getTileWorldXY:function(a,b,c,d,e){return e=this.getLayer(e),a=this.game.math.snapToFloor(a,c)/c,b=this.game.math.snapToFloor(b,d)/d,this.getTile(a,b,e)},copy:function(a,b,c,d,e){if(e=this.getLayer(e),!this.layers[e])return this._results.length=0,void 0;"undefined"==typeof a&&(a=0),"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=this.layers[e].width),"undefined"==typeof d&&(d=this.layers[e].height),0>a&&(a=0),0>b&&(b=0),c>this.layers[e].width&&(c=this.layers[e].width),d>this.layers[e].height&&(d=this.layers[e].height),this._results.length=0,this._results.push({x:a,y:b,width:c,height:d,layer:e});for(var f=b;b+d>f;f++)for(var g=a;a+c>g;g++)this._results.push(this.layers[e].data[f][g]);return this._results},paste:function(a,b,c,d){if("undefined"==typeof a&&(a=0),"undefined"==typeof b&&(b=0),d=this.getLayer(d),c&&!(c.length<2)){for(var e=a-c[1].x,f=b-c[1].y,g=1;g<c.length;g++)this.layers[d].data[f+c[g].y][e+c[g].x].copy(c[g]);this.layers[d].dirty=!0,this.calculateFaces(d)}},swap:function(a,b,c,d,e,f,g){g=this.getLayer(g),this.copy(c,d,e,f,g),this._results.length<2||(this._tempA=a,this._tempB=b,this._results.forEach(this.swapHandler,this),this.paste(c,d,this._results,g))},swapHandler:function(a,b){a.index===this._tempA?this._results[b].index=this._tempB:a.index===this._tempB&&(this._results[b].index=this._tempA)},forEach:function(a,b,c,d,e,f,g){g=this.getLayer(g),this.copy(c,d,e,f,g),this._results.length<2||(this._results.forEach(a,b),this.paste(c,d,this._results,g))},replace:function(a,b,c,d,e,f,g){if(g=this.getLayer(g),this.copy(c,d,e,f,g),!(this._results.length<2)){for(var h=1;h<this._results.length;h++)this._results[h].index===a&&(this._results[h].index=b);this.paste(c,d,this._results,g)}},random:function(a,b,c,d,e){if(e=this.getLayer(e),this.copy(a,b,c,d,e),!(this._results.length<2)){for(var f=[],g=1;g<this._results.length;g++)if(this._results[g].index){var h=this._results[g].index;-1===f.indexOf(h)&&f.push(h)}for(var i=1;i<this._results.length;i++)this._results[i].index=this.game.rnd.pick(f);this.paste(a,b,this._results,e)}},shuffle:function(a,b,d,e,f){if(f=this.getLayer(f),this.copy(a,b,d,e,f),!(this._results.length<2)){for(var g=[],h=1;h<this._results.length;h++)this._results[h].index&&g.push(this._results[h].index);c.Utils.shuffle(g);for(var i=1;i<this._results.length;i++)this._results[i].index=g[i-1];this.paste(a,b,this._results,f)}},fill:function(a,b,c,d,e,f){if(f=this.getLayer(f),this.copy(b,c,d,e,f),!(this._results.length<2)){for(var g=1;g<this._results.length;g++)this._results[g].index=a;this.paste(b,c,this._results,f)}},removeAllLayers:function(){this.layers.length=0,this.currentLayer=0},dump:function(){for(var a="",b=[""],c=0;c<this.layers[this.currentLayer].height;c++){for(var d=0;d<this.layers[this.currentLayer].width;d++)a+="%c  ",this.layers[this.currentLayer].data[c][d]>1?this.debugMap[this.layers[this.currentLayer].data[c][d]]?b.push("background: "+this.debugMap[this.layers[this.currentLayer].data[c][d]]):b.push("background: #ffffff"):b.push("background: rgb(0, 0, 0)");a+="\n"}b[0]=a,console.log.apply(console,b)},destroy:function(){this.removeAllLayers(),this.data=[],this.game=null}},c.Tilemap.prototype.constructor=c.Tilemap,c.TilemapLayer=function(a,d,e,f,g){this.game=a,this.map=d,this.index=e,this.layer=d.layers[e],this.canvas=c.Canvas.create(f,g),this.context=this.canvas.getContext("2d"),this.baseTexture=new b.BaseTexture(this.canvas),this.texture=new b.Texture(this.baseTexture),this.textureFrame=new c.Frame(0,0,0,f,g,"tilemapLayer",a.rnd.uuid()),c.Sprite.call(this,this.game,0,0,this.texture,this.textureFrame),this.name="",this.type=c.TILEMAPLAYER,this.fixedToCamera=!0,this.cameraOffset=new c.Point(0,0),this.tileColor="rgb(255, 255, 255)",this.debug=!1,this.debugAlpha=.5,this.debugColor="rgba(0, 255, 0, 1)",this.debugFill=!1,this.debugFillColor="rgba(0, 255, 0, 0.2)",this.debugCallbackColor="rgba(255, 0, 0, 1)",this.scrollFactorX=1,this.scrollFactorY=1,this.dirty=!0,this._cw=d.tileWidth,this._ch=d.tileHeight,this._ga=1,this._dx=0,this._dy=0,this._dw=0,this._dh=0,this._tx=0,this._ty=0,this._tw=0,this._th=0,this._tl=0,this._maxX=0,this._maxY=0,this._startX=0,this._startY=0,this._results=[],this._x=0,this._y=0,this._prevX=0,this._prevY=0,this.updateMax()},c.TilemapLayer.prototype=Object.create(c.Sprite.prototype),c.TilemapLayer.prototype=c.Utils.extend(!0,c.TilemapLayer.prototype,c.Sprite.prototype,b.Sprite.prototype),c.TilemapLayer.prototype.constructor=c.TilemapLayer,c.TilemapLayer.prototype.postUpdate=function(){c.Sprite.prototype.postUpdate.call(this),this.scrollX=this.game.camera.x*this.scrollFactorX,this.scrollY=this.game.camera.y*this.scrollFactorY,this.render()},c.TilemapLayer.prototype.resizeWorld=function(){this.game.world.setBounds(0,0,this.layer.widthInPixels,this.layer.heightInPixels)},c.TilemapLayer.prototype._fixX=function(a){return 0>a&&(a=0),1===this.scrollFactorX?a:this._x+(a-this._x/this.scrollFactorX)},c.TilemapLayer.prototype._unfixX=function(a){return 1===this.scrollFactorX?a:this._x/this.scrollFactorX+(a-this._x)},c.TilemapLayer.prototype._fixY=function(a){return 0>a&&(a=0),1===this.scrollFactorY?a:this._y+(a-this._y/this.scrollFactorY)},c.TilemapLayer.prototype._unfixY=function(a){return 1===this.scrollFactorY?a:this._y/this.scrollFactorY+(a-this._y)},c.TilemapLayer.prototype.getTileX=function(a){return this.game.math.snapToFloor(this._fixX(a),this.map.tileWidth)/this.map.tileWidth},c.TilemapLayer.prototype.getTileY=function(a){return this.game.math.snapToFloor(this._fixY(a),this.map.tileHeight)/this.map.tileHeight},c.TilemapLayer.prototype.getTileXY=function(a,b,c){return c.x=this.getTileX(a),c.y=this.getTileY(b),c},c.TilemapLayer.prototype.getTiles=function(a,b,c,d,e){"undefined"==typeof e&&(e=!1),a=this._fixX(a),b=this._fixY(b),c>this.layer.widthInPixels&&(c=this.layer.widthInPixels),d>this.layer.heightInPixels&&(d=this.layer.heightInPixels),this._tx=this.game.math.snapToFloor(a,this._cw)/this._cw,this._ty=this.game.math.snapToFloor(b,this._ch)/this._ch,this._tw=(this.game.math.snapToCeil(c,this._cw)+this._cw)/this._cw,this._th=(this.game.math.snapToCeil(d,this._ch)+this._ch)/this._ch,this._results.length=0;for(var f=this._ty;f<this._ty+this._th;f++)for(var g=this._tx;g<this._tx+this._tw;g++)if(this.layer.data[f]&&this.layer.data[f][g]&&(e===!1||e&&this.layer.data[f][g].canCollide)){var h=this._unfixX(g*this._cw)/this._cw,i=this._unfixY(f*this._ch)/this._ch;this._results.push({x:h*this._cw,y:i*this._ch,right:h*this._cw+this._cw,bottom:i*this._ch+this._ch,tile:this.layer.data[f][g],layer:this.layer.data[f][g].layer})}return this._results},c.TilemapLayer.prototype.updateMax=function(){this._maxX=this.game.math.ceil(this.canvas.width/this.map.tileWidth)+1,this._maxY=this.game.math.ceil(this.canvas.height/this.map.tileHeight)+1,this.layer&&(this._maxX>this.layer.width&&(this._maxX=this.layer.width),this._maxY>this.layer.height&&(this._maxY=this.layer.height)),this.dirty=!0},c.TilemapLayer.prototype.render=function(){if(this.layer.dirty&&(this.dirty=!0),this.dirty&&this.visible){this._prevX=this._dx,this._prevY=this._dy,this._dx=-(this._x-this._startX*this.map.tileWidth),this._dy=-(this._y-this._startY*this.map.tileHeight),this._tx=this._dx,this._ty=this._dy,this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle=this.tileColor;var a,d;this.debug&&(this.context.globalAlpha=this.debugAlpha);for(var e=this._startY,f=this._startY+this._maxY;f>e;e++){this._column=this.layer.data[e];for(var g=this._startX,h=this._startX+this._maxX;h>g;g++)this._column[g]&&(a=this._column[g],this.map.tiles[a.index]&&(d=this.map.tilesets[this.map.tiles[a.index][2]],d.image?(this.debug===!1&&a.alpha!==this.context.globalAlpha&&(this.context.globalAlpha=a.alpha),d.tileWidth!==this.map.tileWidth||d.tileHeight!==this.map.tileHeight?this.context.drawImage(this.map.tilesets[this.map.tiles[a.index][2]].image,this.map.tiles[a.index][0],this.map.tiles[a.index][1],d.tileWidth,d.tileHeight,Math.floor(this._tx),Math.floor(this._ty)-(d.tileHeight-this.map.tileHeight),d.tileWidth,d.tileHeight):this.context.drawImage(this.map.tilesets[this.map.tiles[a.index][2]].image,this.map.tiles[a.index][0],this.map.tiles[a.index][1],this.map.tileWidth,this.map.tileHeight,Math.floor(this._tx),Math.floor(this._ty),this.map.tileWidth,this.map.tileHeight),a.debug&&(this.context.fillStyle="rgba(0, 255, 0, 0.4)",this.context.fillRect(Math.floor(this._tx),Math.floor(this._ty),this.map.tileWidth,this.map.tileHeight))):this.context.fillRect(Math.floor(this._tx),Math.floor(this._ty),this.map.tileWidth,this.map.tileHeight))),this._tx+=this.map.tileWidth;this._tx=this._dx,this._ty+=this.map.tileHeight}return this.debug&&(this.context.globalAlpha=1,this.renderDebug()),this.game.renderType===c.WEBGL&&b.texturesToUpdate.push(this.baseTexture),this.dirty=!1,this.layer.dirty=!1,!0}},c.TilemapLayer.prototype.renderDebug=function(){this._tx=this._dx,this._ty=this._dy,this.context.strokeStyle=this.debugColor,this.context.fillStyle=this.debugFillColor;for(var a=this._startY,b=this._startY+this._maxY;b>a;a++){this._column=this.layer.data[a];for(var c=this._startX,d=this._startX+this._maxX;d>c;c++){var e=this._column[c];e&&(e.faceTop||e.faceBottom||e.faceLeft||e.faceRight)&&(this._tx=Math.floor(this._tx),this.debugFill&&this.context.fillRect(this._tx,this._ty,this._cw,this._ch),this.context.beginPath(),e.faceTop&&(this.context.moveTo(this._tx,this._ty),this.context.lineTo(this._tx+this._cw,this._ty)),e.faceBottom&&(this.context.moveTo(this._tx,this._ty+this._ch),this.context.lineTo(this._tx+this._cw,this._ty+this._ch)),e.faceLeft&&(this.context.moveTo(this._tx,this._ty),this.context.lineTo(this._tx,this._ty+this._ch)),e.faceRight&&(this.context.moveTo(this._tx+this._cw,this._ty),this.context.lineTo(this._tx+this._cw,this._ty+this._ch)),this.context.stroke()),e&&(e.collisionCallback||e.layer.callbacks[e.index])&&(this.context.fillStyle=this.debugCallbackColor,this.context.fillRect(this._tx,this._ty,this._cw,this._ch),this.context.fillStyle=this.debugFillColor),this._tx+=this.map.tileWidth}this._tx=this._dx,this._ty+=this.map.tileHeight}},Object.defineProperty(c.TilemapLayer.prototype,"scrollX",{get:function(){return this._x},set:function(a){a!==this._x&&a>=0&&this.layer.widthInPixels>this.width&&(this._x=a,this._x>this.layer.widthInPixels-this.width&&(this._x=this.layer.widthInPixels-this.width),this._startX=this.game.math.floor(this._x/this.map.tileWidth),this._startX<0&&(this._startX=0),this._startX+this._maxX>this.layer.width&&(this._startX=this.layer.width-this._maxX),this.dirty=!0)}}),Object.defineProperty(c.TilemapLayer.prototype,"scrollY",{get:function(){return this._y},set:function(a){a!==this._y&&a>=0&&this.layer.heightInPixels>this.height&&(this._y=a,this._y>this.layer.heightInPixels-this.height&&(this._y=this.layer.heightInPixels-this.height),this._startY=this.game.math.floor(this._y/this.map.tileHeight),this._startY<0&&(this._startY=0),this._startY+this._maxY>this.layer.height&&(this._startY=this.layer.height-this._maxY),this.dirty=!0)}}),Object.defineProperty(c.TilemapLayer.prototype,"collisionWidth",{get:function(){return this._cw},set:function(a){this._cw=a,this.dirty=!0}}),Object.defineProperty(c.TilemapLayer.prototype,"collisionHeight",{get:function(){return this._ch},set:function(a){this._ch=a,this.dirty=!0}}),c.TilemapParser={tileset:function(a,b,d,e,f,g,h,i,j){var k=a.cache.getTilesetImage(b);if(null===k)return console.warn("Phaser.TilemapParser.tileSet: Invalid image key given"),null;var l=k.width,m=k.height;return-1===h&&(h=Math.round(l/d)),-1===i&&(i=Math.round(m/e)),-1===j&&(j=h*i),0===l||0===m||d>l||e>m||0===j?(console.warn("Phaser.TilemapParser.tileSet: width/height zero or width/height < given tileWidth/tileHeight"),null):new c.Tileset(k,b,d,e,f,g,h,i,j)},parse:function(a,b){var d=a.cache.getTilemapData(b);return d?d.format===c.Tilemap.CSV?this.parseCSV(d.data):d.format===c.Tilemap.TILED_JSON?this.parseTiledJSON(d.data):void 0:{layers:[],objects:[],images:[],tilesets:[]}},parseCSV:function(a){a=a.trim();for(var b=[],c=a.split("\n"),d=c.length,e=0,f=0;f<c.length;f++){b[f]=[];for(var g=c[f].split(","),h=0;h<g.length;h++)b[f][h]=parseInt(g[h],10);0===e&&(e=g.length)}return[{name:"csv",width:e,height:d,alpha:1,visible:!0,indexes:[],tileMargin:0,tileSpacing:0,data:b}]},parseTiledJSON:function(a){if("orthogonal"!==a.orientation)return console.warn("TilemapParser.parseTiledJSON: Only orthogonal map types are supported in this version of Phaser"),null;var b={};b.width=a.width,b.height=a.height,b.tileWidth=a.tilewidth,b.tileHeight=a.tileheight,b.orientation=a.orientation,b.version=a.version,b.properties=a.properties,b.widthInPixels=b.width*b.tileWidth,b.heightInPixels=b.height*b.tileHeight;for(var d=[],e=0;e<a.layers.length;e++)if("tilelayer"===a.layers[e].type){var f={name:a.layers[e].name,x:a.layers[e].x,y:a.layers[e].y,width:a.layers[e].width,height:a.layers[e].height,widthInPixels:a.layers[e].width*a.tilewidth,heightInPixels:a.layers[e].height*a.tileheight,alpha:a.layers[e].opacity,visible:a.layers[e].visible,properties:{},indexes:[],callbacks:[]};a.layers[e].properties&&(f.properties=a.layers[e].properties);for(var g=0,h=[],i=[],j=0,k=a.layers[e].data.length;k>j;j++)a.layers[e].data[j]>0?h.push(new c.Tile(f,a.layers[e].data[j],g,i.length,a.tilewidth,a.tileheight)):h.push(null),g++,g===a.layers[e].width&&(i.push(h),g=0,h=[]);f.data=i,d.push(f)}b.layers=d;for(var l=[],e=0;e<a.layers.length;e++)if("imagelayer"===a.layers[e].type){var m={name:a.layers[e].name,image:a.layers[e].image,x:a.layers[e].x,y:a.layers[e].y,alpha:a.layers[e].opacity,visible:a.layers[e].visible,properties:{}};a.layers[e].properties&&(m.properties=a.layers[e].properties),l.push(m)}b.images=l;for(var n={},e=0;e<a.layers.length;e++)if("objectgroup"===a.layers[e].type){n[a.layers[e].name]=[];for(var o=0,k=a.layers[e].objects.length;k>o;o++)if(a.layers[e].objects[o].gid){var p={gid:a.layers[e].objects[o].gid,name:a.layers[e].objects[o].name,x:a.layers[e].objects[o].x,y:a.layers[e].objects[o].y,visible:a.layers[e].objects[o].visible,properties:a.layers[e].objects[o].properties};n[a.layers[e].name].push(p)}}b.objects=n;for(var q=[],e=0;e<a.tilesets.length;e++){var r=a.tilesets[e],s=new c.Tileset(r.name,r.firstgid,r.tilewidth,r.tileheight,r.margin,r.spacing,r.properties);r.tileproperties&&(s.tileProperties=r.tileproperties),s.rows=(r.imageheight-r.margin)/(r.tileheight+r.spacing),s.columns=(r.imagewidth-r.margin)/(r.tilewidth+r.spacing),s.total=s.rows*s.columns,q.push(s)}b.tilesets=q,b.tiles=[];for(var e=0;e<b.tilesets.length;e++)for(var r=b.tilesets[e],g=r.tileMargin,t=r.tileMargin,u=0,v=0,w=0,j=r.firstgid;j<r.firstgid+r.total&&(b.tiles[j]=[g,t,e],g+=r.tileWidth+r.tileSpacing,u++,u!==r.total)&&(v++,v!==r.columns||(g=r.tileMargin,t+=r.tileHeight+r.tileSpacing,v=0,w++,w!==r.rows));j++);return b}},c.Tileset=function(a,b,c,d,e,f,g){this.name=a,this.firstgid=b,this.tileWidth=c,this.tileHeight=d,this.tileMargin=e,this.tileSpacing=f,this.properties=g,this.image=null,this.rows=0,this.columns=0,this.total=0},c.Tileset.prototype={setSpacing:function(a,b){this.tileMargin=a,this.tileSpacing=b}},c.Tileset.prototype.constructor=c.Tileset,b.CanvasRenderer.prototype.render=function(a){b.texturesToUpdate.length=0,b.texturesToDestroy.length=0,b.visibleCount++,a.updateTransform(),this.context.setTransform(1,0,0,1,0,0),c.CANVAS_CLEAR_RECT&&this.context.clearRect(0,0,this.width,this.height),this.renderDisplayObject(a,!1),b.Texture.frameUpdates.length>0&&(b.Texture.frameUpdates.length=0)},b.CanvasRenderer.prototype.renderDisplayObject=function(a,d){var e=a.last._iNext;a=a.first;do if(a.visible||d)if(a.renderable&&0!==a.alpha){if(a instanceof b.Sprite)a.texture.frame&&(this.context.globalAlpha=a.worldAlpha,c.CANVAS_PX_ROUND?this.context.setTransform(a.worldTransform[0],a.worldTransform[3],a.worldTransform[1],a.worldTransform[4],Math.floor(a.worldTransform[2]),Math.floor(a.worldTransform[5])):this.context.setTransform(a.worldTransform[0],a.worldTransform[3],a.worldTransform[1],a.worldTransform[4],a.worldTransform[2],a.worldTransform[5]),a.texture.trimmed&&this.context.transform(1,0,0,1,a.texture.trim.x,a.texture.trim.y),this.smoothProperty&&this.scaleMode!==a.texture.baseTexture.scaleMode&&(this.scaleMode=a.texture.baseTexture.scaleMode,this.context[this.smoothProperty]=this.scaleMode===b.BaseTexture.SCALE_MODE.LINEAR),this.context.drawImage(a.texture.baseTexture.source,a.texture.frame.x,a.texture.frame.y,a.texture.frame.width,a.texture.frame.height,Math.floor(a.anchor.x*-a.texture.frame.width),Math.floor(a.anchor.y*-a.texture.frame.height),a.texture.frame.width,a.texture.frame.height));else if(a instanceof b.Strip)this.context.setTransform(a.worldTransform[0],a.worldTransform[3],a.worldTransform[1],a.worldTransform[4],a.worldTransform[2],a.worldTransform[5]),this.renderStrip(a);else if(a instanceof b.TilingSprite)this.context.setTransform(a.worldTransform[0],a.worldTransform[3],a.worldTransform[1],a.worldTransform[4],a.worldTransform[2],a.worldTransform[5]),this.renderTilingSprite(a);else if(a instanceof b.CustomRenderable)a.renderCanvas(this);else if(a instanceof b.Graphics)this.context.setTransform(a.worldTransform[0],a.worldTransform[3],a.worldTransform[1],a.worldTransform[4],a.worldTransform[2],a.worldTransform[5]),b.CanvasGraphics.renderGraphics(a,this.context);else if(a instanceof b.FilterBlock)if(a.open){this.context.save();var f=a.mask.alpha,g=a.mask.worldTransform;this.context.setTransform(g[0],g[3],g[1],g[4],g[2],g[5]),a.mask.worldAlpha=.5,this.context.worldAlpha=0,b.CanvasGraphics.renderGraphicsMask(a.mask,this.context),this.context.clip(),a.mask.worldAlpha=f}else this.context.restore();a=a._iNext}else a=a._iNext;else a=a.last._iNext;while(a!=e)},b.WebGLBatch.prototype.update=function(){for(var a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r=0,s=this.head;s;){if(s.vcount===b.visibleCount){if(c=s.texture.frame.width,d=s.texture.frame.height,e=s.anchor.x,f=s.anchor.y,g=c*(1-e),h=c*-e,i=d*(1-f),j=d*-f,k=8*r,a=s.worldTransform,l=a[0],m=a[3],n=a[1],o=a[4],p=a[2],q=a[5],s.texture.trimmed&&(p+=s.texture.trim.x,q+=s.texture.trim.y),this.verticies[k+0]=l*h+n*j+p,this.verticies[k+1]=o*j+m*h+q,this.verticies[k+2]=l*g+n*j+p,this.verticies[k+3]=o*j+m*g+q,this.verticies[k+4]=l*g+n*i+p,this.verticies[k+5]=o*i+m*g+q,this.verticies[k+6]=l*h+n*i+p,this.verticies[k+7]=o*i+m*h+q,s.updateFrame||s.texture.updateFrame){this.dirtyUVS=!0;var t=s.texture,u=t.frame,v=t.baseTexture.width,w=t.baseTexture.height;this.uvs[k+0]=u.x/v,this.uvs[k+1]=u.y/w,this.uvs[k+2]=(u.x+u.width)/v,this.uvs[k+3]=u.y/w,this.uvs[k+4]=(u.x+u.width)/v,this.uvs[k+5]=(u.y+u.height)/w,this.uvs[k+6]=u.x/v,this.uvs[k+7]=(u.y+u.height)/w,s.updateFrame=!1}if(s.cacheAlpha!=s.worldAlpha){s.cacheAlpha=s.worldAlpha;var x=4*r;this.colors[x]=this.colors[x+1]=this.colors[x+2]=this.colors[x+3]=s.worldAlpha,this.dirtyColors=!0}}else k=8*r,this.verticies[k+0]=0,this.verticies[k+1]=0,this.verticies[k+2]=0,this.verticies[k+3]=0,this.verticies[k+4]=0,this.verticies[k+5]=0,this.verticies[k+6]=0,this.verticies[k+7]=0;r++,s=s.__next}},c});
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;
