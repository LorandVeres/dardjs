/**
 * @author Lorand Veres user.email "lorand.mast@gmail.com"
 *
 *
 */

/*
 * Basic comparison
 * and other useful functions
 *
 */

function isObj(o) {
	return typeof obj === 'object' || toString.call(o).split(/\W/)[2].toLowerCase() === 'object';
}

function isArray(a) {
	return Array.isArray(a) || toString.call(a).split(/\W/)[2].toLowerCase() === 'array';
}

function isFunc(f) {
	return typeof f === 'function';
}

function isStr(s) {
	return typeof s === 'string' ? true : false;
}

function isBool(b) {
	return typeof b === 'bolean' ? true : false;
}

function isNum(n) {
	return typeof n === 'number' ? true : false;
}

function isSet(o) {
	return typeof o === 'undefined' || o === undefined ? false : true;
}

function empty(v) {
	var r = false;
	if (isStr(v)) {
		v.length == 0 ? r = true : r = false;
		if (v.length == 1 && (v == '0' || v == "0" ))
			r = true;
	} else if (v === null) {
		r = true;
	} else if (isNum(v) && v == 0) {
		r = true;
	}
	return r;
}

function type(o, arguments) {
	o.constructor.prototype = new o(arguments);
	return o.constructor;
}

function varyArgs(arguments) {
	return Array.prototype.slice.call(arguments);
}

function argsLength(arguments) {
	return varyArgs(arguments).length;
}

function setCss(el, css) {
	var k,
	    f = '';
	if (isObj(css)) {
		for (k in css) {
			if (css.hasOwnProperty(k))
				f += k + ':' + css[k] + ';';
		}
		el.style.cssText = f;
	}
}

function toggle(el) {
	var s = window.getComputedStyle(el, null).getPropertyValue("display");
	s === 'none' ? el.style.display = 'block' : el.style.display = 'none';
};

function myEvent(event, trigger, callback) {
	if ($(trigger)) {
		on($(trigger).addEventListener(event, callback, false));
	} else {
		console.log(trigger + ' can not be find in this page');
	}
}

// recomended usage for testing pourpuse only
function simulateClick(onTarget) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	$(onTarget).dispatchEvent(evt);
}

function counter() {
	var count = 0;
	var change = function(val) {
		count += val;
	};

	return {
		show : function() {
			return count;
		},

		increment : function() {
			change(1);
		},

		reset : function() {
			count = 0;
		},

		decrement : function() {
			change(-1);
		},
		incrementBy : function(val) {
			change(val);
		}
	};
};

function on(your_functions_here) {
	window.onload = your_functions_here;
}

/*
 *
 *  Here we go, we include js files on runtime
 *  A benefit for modular aproach.
 *
 */

function require_js_module(src) {
	ajax({
		type : 'GET',
		url : src,
		response : function(script) {
			eval.apply(window, [script]);
		},
		error : "ERROR: script not loaded: " + src
	});
};

function include_module(obj) {
	var el = $(obj.el);
	var node = str2el(obj.html);
	if (el.hasChildNodes())
		el.removeChild(el.firstChild);
	el.appendChild(node);
	if (MyObj.keyIn(obj, 'js'))
		require_js_module(obj.js);
}

// Useful Object relating functions

function myObj() {
	self = {};
	self.keyIn = function(k) {
		return this.hasOwnProperty(k) ? true : false;
	};
	self.type = function(i) {
		if (i && !isset(i)) {
			return 'undefined';
		} else if (i && isFunc(i) && isSet(i.prototype)) {
			return (this instanceof i) ? true : false;
		} else if (!i) {
			return typeof this;
		}
	};
	self.size = function() {
		var c = 0,
		    k,
		    o = this;
		if ( typeof this == 'object') {
			for (k in o) {
				if (!( k in Object.prototype)) {
					o.keyIn(k) ? c++ : null;
				}
			}
			return c;
		}
	};
	return self;
}

// end of basic functions

// the MAIN selector function
//

var $ = ( function() {
		var args = [],
		    document = window.document,

		    idRE = /^#{1}[a-z0-9\-\_]+\-*$/i, // id REgex
		    classNameRE = /^\.{1}[a-z0-9\-\_\s]+$/i, // class REgex
		    tagNameRE = /^<{1}[a-z]+>{1}$/i, // html tag REgex
		    plainTagRE = /^[a-z1-6]{1,20}$/,

		    toType = {},
		    toString = toType.toString,
		    extend = {};
		//
		Object.assign(Object.prototype, new myObj());

		function DardProto() {
			var self = this;
			self.extendProto = function(prop) {
				if (prop.type() === 'object')
					Object.assign(self, prop);
			};
			self.append = function(e) {
				if ( typeof e === 'object')
					this.appendChild(e);
				if (isStr(e))
					this.appendChild(str2el(e));
			};
			self.clone = function() {
				return this.cloneNode(true);
			};
			self.text = function(t) {
				if (isStr(t)) {
					this.innerHTML = t;
				} else if (!t) {
					var tx = this.innerHTML;
					console.log(tx);
					return tx;
				}
			};
			self.toggle = function() {
				var s = window.getComputedStyle(this, null).getPropertyValue("display");
				s === 'none' ? this.style.display = 'block' : this.style.display = 'none';
			};
			self.css = function(val) {
				var k,
				    f = '';
				if (isObj(val)) {
					for (k in val) {
						if (val.hasOwnProperty(k))
							f += k + ':' + val[k] + ';';
					}
					this.style.cssText = f;
				}
			};
			self.me = function(){
				console.log(self);
			};
				
			return self;
		}
		
		type(DardProto);

		// Helping function
		// Selecting the element from first parameter

		function getEl(arg, item) {
			var el = this;
			if ( typeof arg == 'string') {
				if (idRE.test(arg))
					el = document.getElementById(arg.substring(1));
				if (classNameRE.test(arg))
					el = document.getElementsByClassName(arg.substring(1))[item];
				if (tagNameRE.test(arg))
					el = document.createElement(arg.replace(/^<+|>+$/gm, ''));
				if (plainTagRE.test(arg))
					el = document.getElementsByTagName(arg.replace(/^<+|>+$/gm,''))[item];
			}
			Object.assign(Object.getPrototypeOf(el), new DardProto());
			return el;
		}

		//type(getEl);

		return function() {
			var args = varyArgs(arguments);
			var itemNo,
			    el;
			if (args.length > 0) {
				isNum(args[1]) ? itemNo = args[1] : itemNo = 0;
				return new getEl(args[0], itemNo);
			}
		};
	}());
/*
 *
 *
 * AJAX function with main funcionality on POST GET and JSON
 *
 *
 *
 */

var ajax = function(obj) {
	/*
	 var ajaxObj = {
	 type : 'GET',  // type of request POST or GET
	 url : 'your/page/url', // the page url
	 response : 'function', //handle the response from server
	 send : null, // in GET request is optional
	 json : true, // optional required if you do not stringify before the object
	 error : 'custom error message' // optional to see for errors in consol log
	 };
	 */
	var getPostJson = function() {
		var xhr = new XMLHttpRequest();
		xhr.open(obj.type, obj.url);
		xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "dard_ajax");
		if (obj.type === 'POST' && !MyObj.keyIn(obj, 'json'))
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if (MyObj.keyIn(obj, 'json') && obj.json === true) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			obj.send = JSON.stringify(obj.send);
		}
		if (obj.type === 'GET' && MyObj.keyIn(obj, 'send')) {
			if (isObj(obj.send))
				obj.send = param(obj.send);
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				obj.response(xhr.responseText);
			}
			if (xhr.readyState === 4 && xhr.status !== 200) {
				if (MyObj.keyIn(obj, 'error')) {
					obj.error ? console.log(obj.error + xhr.status) : '';
				}
			}
		};
		MyObj.keyIn(obj, 'send') ? xhr.send(obj.send) : xhr.send(null);
	};

	function param(object) {
		var encodedString = '';
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) {
				if (encodedString.length > 0) {
					encodedString += '&';
				}
				encodedString += encodeURI(prop + '=' + object[prop]);
			}
		}
		return encodedString;
	}

	getPostJson();
};

/*
 *
 *  Starting DOM manipulation functions
 *
 *
 *
 */

( function() {

		str2el = function(html) {
			var fakeEl = document.createElement('iframe');
			fakeEl.style.display = 'none';
			document.body.appendChild(fakeEl);
			fakeEl.contentDocument.open();
			fakeEl.contentDocument.write(html);
			fakeEl.contentDocument.close();
			var el = fakeEl.contentDocument.body.firstChild;
			document.body.removeChild(fakeEl);
			return el;
		};

		emptyEl = function(el) {
			var e = $(el);
			while (e.firstChild) {
				e.removeChild(e.firstChild);
			}
		};

	}());
