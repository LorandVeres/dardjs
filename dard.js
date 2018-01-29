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
( function() {

        isObj = function(o) {
            return typeof obj === 'object' || toString.call(o).split(/\W/)[2].toLowerCase() === 'object';
        };

        isArray = function(a) {
            return Array.isArray(a) || toString.call(a).split(/\W/)[2].toLowerCase() === 'array';
        };

        isFunc = function(f) {
            return typeof f === 'function';
        };

        varyArgs = function(arguments) {
            return Array.prototype.slice.call(arguments);
        };

        argsLength = function(arguments) {
            return varyArgs(arguments).length;
        };

        setCss = function(el, css) {
            var k,
                f = '';
            if (isObj(css)) {
                for (k in css) {
                    if (css.hasOwnProperty(k))
                        f += k + ':' + css[k] + ';';
                }
                el.style.cssText = f;
            }
        };

        toggle = function(el) {
            var s = window.getComputedStyle(el, null).getPropertyValue("display");
            s === 'none' ? el.style.display = 'block' : el.style.display = 'none';
        };

        myEvent = function(event, triger, doit) {
            if ($(triger)) {
                on($(triger).addEventListener(event, doit));
            } else {
                console.log(triger + ' can not be find in this page');
            }
        };

        // recomended usage for testing pourpuse only
        simulateClick = function(onTarget) {
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            $(onTarget).dispatchEvent(evt);
        };

        counter = function() {
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
                }
            };
        };

        on = function(your_functions_here) {
            window.onload = your_functions_here;
        };
        
        /*
         * 
         *  Here we go, we include js files on runtime
         *  A benefit for modular aproach.
         * 
         */
        
        require_js_module = function(src){
            ajax({
                type : 'GET',
                url : src,
                response : function (script){
                    eval.apply( window, [script] );
                },
                error : "ERROR: script not loaded: " + src 
            });
        };
        
        include_module = function (obj){
            var el = $( obj.El );
            var node = str2el( obj.html );
            if(el.hasChildNodes()) 
                el.removeChild( el.firstChild );
            el.appendChild( node );
            if(MyObj.keyIn( obj, 'js'))
                require_js_module( obj.js );
        };

        // Useful Object relating functions

        MyObj = {

            // Chek if the key exist in the named object
            // Return value true or false

            keyIn : function(o, k) {
                return k.toString(k) in o ? true : false;
            },

            // Return the size of an object

            size : function(o) {// o = object
                var count = 0,
                    key;
                if ( count = Object.keys(o).length) {
                    return count;
                } else {
                    for (key in o) {
                        o.hasOwnProperty(key) ? count++ : null;
                    }
                    return count;
                }
            }
        };

    }());
// end of basic functions

// the MAIN function

var $ = ( function() {
        var args = [],
            document = window.document,

            idRE = /^#{1}[a-z0-9\-]+\-*$/i, // id REgex
            classNameRE = /^\.{1}[a-z0-9\-\_\s]+$/i, // class REgex
            tagNameRE = /^<{1}[a-z]+>{1}$/i, // html tag REgex

            toType = {},
            toString = toType.toString,
            extend,
            type;

        // Helping functions used inside the MAIN return anonymous function

        // Helping function
        // Selecting the element from first parameter

        function getEl(arg, item) {
            var el;
            if ( typeof arg == 'string') {
                if (idRE.test(arg))
                    el = document.getElementById(arg.substring(1));
                if (classNameRE.test(arg))
                    el = document.getElementsByClassName(arg.substring(1))[item];
                if (tagNameRE.test(arg))
                    el = document.getElementsByTagName(arg.replace(/^<+|>+$/gm,''))[item];
            }
            return el;
        }

        /*
         * Helping function
         * Selecting the elementTagName item number from parameters
         *
         */

        function getElItemNo(arg) {
            var b;
            typeof arg === 'number' ? b = arg : b = 0;
            return b;
        }

        /*
         * Helping function
         * Selecting the text and css from possible
         * second or third parameter handled over
         * in a object
         *
         */

        function getCssText(arg) {
            var csstext;
            if (arg.length === 2 && isObj(arg[1]))
                csstext = arg[1];
            if (arg.length === 3 && isObj(arg[2]))
                csstext = arg[2];
            return csstext;
        }

        return function() {
            args = varyArgs(arguments);
            var el,
                o,
                itemNo,
                key,
                cssStyle,
                fcss = '';
            if (args.length > 0) {
                itemNo = getElItemNo(args[1]);
                el = getEl(args[0], itemNo);
                o = getCssText(args);
                if (isObj(o)) {
                    if (o.text !== undefined || o.hasOwnProperty('text'))
                        el.innerHTML = o.text;
                    if (o.style !== undefined || o.hasOwnProperty('style')) {
                        setCss(el, o.style);
                    }
                }

                return el;
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
     json : true, // roptional equired if you do not stringify before the object
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
        
        
        empty = function (el){
            var e = $(el);
            while(e.firstChild){
                e.removeChild(e.firstChild);
            }
        };
        
}());