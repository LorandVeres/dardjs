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
    
    (function(){
        
        isObj = function(o) {
            return typeof obj === 'object' || toString.call(o).split(/\W/)[2].toLowerCase() === 'object';
        };

        isArray = function(a) {
            return Array.isArray(a) || toString.call(a).split(/\W/)[2].toLowerCase() === 'array';
        };

        isFunc = function (f) {
            return typeof f === 'function';
        };
        
        varyArgs = function(arguments){
            return Array.prototype.slice.call(arguments);
        };
        
        argsLength = function(arguments){
            return varyArgs(arguments).length;
        };
        
        setCss = function(el, css){
            var k, f ='';
            if(isObj(css)){
                for(k in css){
                    if(css.hasOwnProperty(k))
                        f += k + ':' + css[k] + ';';
                }
                el.style.cssText = f;
            }
            
        };
        
        toggle = function(el){
            if(el.style.display === 'none'){
                setCss(el, {display:'block'});
            }else{
                setCss(el, {display:'none'});
            }
        };
        
        // Useful Object relating functions
         
        MyObj = {
            
            // Chek if the key exist in the named object
            // Return value true or false
            
            keyIn:function(o, k) {
                return k.toString(k) in o ? true : false;
            },

            
            // Return the size of an object
            
            size:function(o) { // o = object
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
    
    }());// end of basic functions
    
    
    
    // the MAIN function
    
    
var $ = ( function() {
        var args = [],
            document = window.document,

            idRE = /^#{1}[a-z0-9]+\-*$/i, // id REgex
            classNameRE = /^\.{1}[a-z0-9\-\_\s]+$/i, // class REgex
            tagNameRE = /^<{1}[a-z]+>{1}$/i, // html tag REgex

            toType = {},
            toString = toType.toString,
            extend,
            type;
        
        // Helping functions used inside the MAIN return anonymous function
        
        // Helping function
        // Selecting the element from first parameter
                
        function getEl(arg, item){
            var el;
            if ( typeof arg == 'string'){
                if(idRE.test(arg)) el = document.getElementById(arg.substring(1));
                if(classNameRE.test(arg)) el = document.getElementsByClassName(arg.substring(1))[item];
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
            var el, o, itemNo, key, cssStyle, fcss ='';
            
            if (args.length > 0) {
                itemNo = getElItemNo(args[1]);
                el = getEl(args[0], itemNo);
                o = getCssText(args);
                if(isObj(o)){
                    if(o.text !== undefined || o.hasOwnProprty('text')) el.innerHTML = o.text;
                    if(o.style  !== undefined || o.hasOwnProprty('style')){
                        setCss(el, o.style);
                    }
                }
                return el;
            }
        };
    
    }()); 


