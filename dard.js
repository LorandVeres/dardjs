/**
 * @author Lorand Veres user.email "lorand.mast@gmail.com"
 * 
 * 
 * Select elements by ID , CLASSNAME, TAGNAME
 * 
 * PARAMETER 1  selector should be in the following formats:  #ID , .CLASSNAME ,  TAGNAME
 * PARAMETER 2  Optinal,  item number should be digit 
 * PARAMETER 3  Optional,  text, attributs  and css should be of the format of
 * 
 * Syntax
 * $('.className', 0, {text:'text', id:'yourId', style:{bgcolor:blue, font-size:14px}})
 *
 *
 */

var start, end, $;
start = Date().now || new Date().getTime();

    $ = ( function() {
        var selector,
            args = [],
            document = window.document,

            idRE = /^#{1}[a-z0-9]+\-*$/i, // id REgex
            classNameRE = /^\.{1}[a-z0-9\-\_\s]+$/i, // class REgex
            tagNameRE = /^<{1}[a-z]+>{1}$/i, // html tag REgex

            $ = {},
            fn,
            Obj,
            toType = {},
            toString = toType.toString,
            extend,
            type;

        /*
         * Basic comparison 
         * and other small useful functions 
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
        
        function varyArgs(arguments){
            return Array.prototype.slice.call(arguments);
        }
        
        function argsLength(arguments){
            return varyArgs(arguments).length;
        }

        /*
         * Useful Object relating functions
         * 
         */

        Obj = function(){
            
            /*
             * Chek if the key exist in the maned object
             * Return true or false
             * Usage Obj.keyIn(objectName , "keyToLookFor")
             */
            
            this.keyIn = function(o, k) {
                return k.toString(k) in o ? true : false;
            };

            /*
             * Return the size of an object
             * Usage Obj.size(object);
             */
            this.size = function(o) { // o = object
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
            };

            this.keyInline = function(o, callback) {
                var p,
                    kn = [];
                for (p in o) p in o ? typeof callback !== undefined && !isObj(o) ? callback(o[p]) : kn.push(p.toString(p)) : kn = false;
                return kn;
            };

            this.keyDeep = function(o) {
                var p,
                    kn = [];
                for (p in o) {
                    if (!isObj(o[p])) {
                        kn.push(p.toString(p));
                    } else if (isObj(o[p])) {
                        kn.push(this.keyDeep(o[p]));
                    }
                }
                return kn;
            };

            this.keyValue = function(o, k) {
                return k.toString(k) in o ? o[k.toString(k)] : false;
            };
        };// end objKeyName
        this.Obj = new Obj();
        

        function Ajax() {
            return;
        }
        
        /*
         * Helping functions used inside the MAIN return anonymous function
         * 
         */

        extend = function(obj) {
            if ( typeof Object.assign === 'function') {
                return Object.assign({}, obj);
            }
        };

        
        /*
         * Helping function
         * A primitive yet practical metod
         * Assigning functions to the window object
         */
        fn = function () {
            this.isObj = isObj;
            this.isArray = isArray;
            this.isFunc = isFunc;
            this.varyArgs = varyArgs;
            this.argsLength = argsLength;
        };
        
        
        /*
         * Helping function
         * Selecting the element from first parameter
         * 
         */
        
        function getEl(arg, item){
            var el;
            if ( typeof arg == 'string'){
                if(idRE.test(arg)) el = document.getElementById(arg.substring(1));
                if(classNameRE.test(arg)) el = document.getElementsByClassName(arg.substring(1));
                if(tagNameRE.test(arg)) el = document.getElementsByTagName(arg.replace(/^<+|>+$/gm,''))[item]; 
            }
            return el;
        }
        
        /*
         * Helping function
         * Selecting the elementTagName item number from parameters
         * 
         */
        
        function getElItemNo(arg){
            if(typeof arg == 'number')
                return arg;
        }
        
        /*
         * Helping function
         * Selecting the text and css from possible
         * second or third parameter handled over 
         * in a object
         * 
         */
        
        function getCssText(arg){
            var csstext;
            if ( arg.length === 2 && isObj(arg[1]))
                csstext = arg[1];
            if ( arg.length === 3 && isObj(arg[2]))
                csstext = arg[2];
            return csstext;
        }
        
        
        
        return function() {
            args = varyArgs(arguments);
            fn();
            var el, o;
            
            if (args.length > 0) {
                itemNo = getElItemNo(args[1]);
                el = getEl(args[0], itemNo);
                o = getCssText(args);
                if(isObj(o)){
                    if(o.text !== undefined) el.innerHTML = o.text;
                    if(o.style){
                        //console
                    }
                }
                return el;
            }
        };
    
    }()); 
    
    
/*
( function() {
        if (Dard !== undefined && Dard == window.Dard ) {
            if (typeof $ !== undefined) {
                var $ = Dard;
            }
        }
    }());
    */


var a = '#one', d, e,
    ade = {
        text : 'text text aditional to add',
        id : 'yourId',
        style : {
        bgcolor : 'blue',
        fontsize : '14px'
    }
};
$('#one', {text: 'first text tested'});
//if(d = $('<div>', 2, {text: 'first text tested'})) d.innerHTML = "<p>Dard.js is  a small and good function </p>";
//c[ c.length -1 ].innerHTML = "that's a div 3 text.";


//if(e = $('#small'))e.innerHTML = "that's just a note around footer area.";



end = Date.now() || new Date().getTime();
console.log((end - start) + ' miliseconds = time to load the js inside');


