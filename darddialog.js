
/*
 custom : { wrapper, head, close, max, min, body, footer }
 onside : html,
 title : 'Dardjs dialog box',
 transform : ['wrapper', 'head', 'buttons', 'body', 'footer'],
 css : ['dard_d_box', 'dard_d_hd', 'dard_d_bt_cl', 'dard_d_bt_min', 'dard_d_bt_max', 'dard_d_bd', 'dard_d_f'],
 body : html,
 drag : true || false,
 acton : {
 	myevent : ['click'],
 	trigger : [html],
 	handler: [ funyFunction ]
 }
 */
function dialog (trigger, obj) {

	var $$ = {}, single = counter(), drag,
		id = 'dard_d_bd' + new Date().getTime();
		obj.keyIn('drag') && obj.drag == true ? drag = true : drag = false;

	function mywindow(obj) {

		function create(){
			$$.d = document.createElement('div');
			$$.h = document.createElement('div');
			$$.ct = document.createElement('div');
			$$.bt = document.createElement('div');
			$$.m = document.createElement('div');
			$$.mx = document.createElement('div');
			$$.bd = document.createElement('div');
			$$.f = document.createElement('div');
		}

		function append() {

			$$.ct.appendChild($$.bt);
			$$.ct.appendChild($$.mx);
			$$.ct.appendChild($$.m);
			$$.h.appendChild($$.ct);
			$$.d.appendChild($$.h);
			$$.d.appendChild($$.bd);
			$$.d.appendChild($$.f);
			$$.d.setAttribute('id', id);
			$$.d.setAttribute('class', 'dard_d_box');
			$$.h.setAttribute('class', 'dard_d_hd');
			$$.ct.setAttribute('class', 'dard_d_ct');
			$$.bt.setAttribute('class', 'dard_d_bt');
			$$.m.setAttribute('class', 'dard_d_bt');
			$$.mx.setAttribute('class', 'dard_d_bt');
			$$.bd.setAttribute('class', 'dard_d_bd');
			$$.f.setAttribute('class', 'dard_d_f');
			$$.m.innerHTML = '&#95';
			$$.mx.innerHTML = '&square;';
			$$.bt.innerHTML = '&times;';

		}
		
		function appendToBody(obj){
			if(obj.keyIn('custom')){
				obj.custom.keyIn('head') ? $$.h = obj.custom.head : $$.h = null;
				obj.custom.keyIn('close') ? $$.bt = obj.custom.close : $$.bt = null;
				obj.custom.keyIn('min') ? $$.m = obj.custom.min : $$.m = null;
				obj.custom.keyIn('max') ? $$.mx = obj.custom.max : $$.mx = null;
				obj.custom.keyIn('body') ? $$.bd = obj.custom.body : $$.bd = null;
				obj.custom.keyIn('footer') ? $$.f = obj.custom.footer : $$.f = null;
				document.body.appendChild(obj.custom.wrapper);
			}else if(!obj.keyIn('custom')){
				create();
				append();
				document.body.appendChild($$.d);
			}
		}
		
		function ready(o){
			appendToBody(o);
			return [$$.d, $$.h, $$.bt, $$.m, $$.mx, $$.bd, $$.f];
		}

		return ready(obj);

	}

	function toggle(obj) {
		if(obj.keyIn('onside')){
			if(isBool(obj.onside) && obj.onside == true){
				$$.t = document.createElement('div');
				$$.t.setAttribute('class', 'dialog-toggle');
				$$.t.innerHTML = '+';
				document.body.appendChild($$.t);
			}else if(isObj(obj.onside)){
				$$.t = obj.onside;
				document.body.appendChild($$.t);
			}
		}
	}

	function setClass(elements, obj) {
		if (obj.keyIn('css')) {
			var css = obj.css;
		}
		if (isArray(obj)) {
			var css = obj;
		}
		if (css) {
			for (var i = 0,
			    j = elements.length; i < j; i++) {
				if ( typeof css[i] === 'string' && css[i].lenght > 1) {
					elements[i].removeAttribute("class");
				}
				elements[i].setAttribute('class', css[i]);
			}
		}
	}

	function appendBody(body, obj) {
		if (obj.keyIn('body')) {
			if ( typeof obj.body === 'string') {
				body.appendChild(str2el(obj.body));
			}
			if ( typeof obj.body == 'object') {
				body.appendChild(obj.body);
			}
		}
	}

	function appendName(head, obj) {
		if (obj.keyIn('title')) {
			var n = document.createElement('h4');
			n.appendChild(document.createTextNode(obj.title));
			head.appendChild(n);
		}
	}

	function clearBody(el) {
		emptyEl(el);
	}

	function myEvents(obj) {
		if (obj.keyIn('acton')) {
			for (var i = 0,
			    j = obj.acton.myevent.length; i < j; i++) {
			    $(obj.acton.trigger[i])[0].addEventListener(obj.acton.myevent[i], obj.acton.handler[i], false);
			}
		}
	}

	function maximize() {
		if (obj.keyIn('transform')) {
			if ($$.d.className === obj.transform[0]) {
				setClass([$$.d, $$.h, $$.bt, $$.m, $$.mx, $$.bd, $$.f], obj);
				if ($$.t)
					$$.t.style.display = 'none';
			}
		} else {
			$$.d.style.display = 'block';
			if ($$.t)
				$$.t.style.display = 'none';
		}
	}

	function minimize(array) {
		if (obj.keyIn('transform')) {
			if ($$.d.className === obj.css[0] || $$.d.className === 'dard_d_box') {
				setClass([$$.d, $$.h, $$.bd, $$.f], obj.transform);
				if ($$.t)
					$$.t.style.display = 'block';
			}
		} else {
			$$.d.style.display = 'none';
			if ($$.t)
				$$.t.style.display = 'block';
		}
	}

	function touches(event) {
		var touch = event.targetTouches[0];
		$$.d.style.left = touch.pageX - 20 + 'px';
		$$.d.style.top = touch.pageY - 20 + 'px';
		event.preventDefault();
	}

	function getStyle(e, s) {
		return window.getComputedStyle(e, null).getPropertyValue(s);
	}

	function mouseDown(e) {
		window.addEventListener('mousemove', divMove, true);
		y = e.clientY - getStyle($$.d, 'top').slice(0, -2),
		x = e.clientX - getStyle($$.d, 'left').slice(0, -2);
	}

	function divMove(e) {
		//d.style.position = 'absolute';
		$$.d.style.top = (e.clientY - y) + 'px';
		$$.d.style.left = (e.clientX - x) + 'px';
	}

	function freeup() {
		window.removeEventListener('mousemove', divMove, true);
		window.removeEventListener('touchmove', touches, true);
	}

	function remove() {
		document.body.removeChild($$.d);
		removeToggleButton();
		single.reset();
		removeDrag();
		$$.bt.removeEventListener('click', remove, true);
		removeMinButton();
		removeMaxButton();
	}
	
	function addToggleButton(){
		if($$.t)
			$$.t.addEventListener('click', maximize, false);
	}
	
	function removeToggleButton(){
		if($$.t && obj.onside){
			document.body.removeChild($$.t);
			$$.t.removeEventListener('click', maximize, true);
		}
	}
	
	function addMinButton(){
		if($$.m)
			$$.m.addEventListener('click', minimize, false);
	}
	
	function addMaxButton(){
		if($$.mx)
			$$.mx.addEventListener('click', maximize, false);
	}
	
	function removeMinButton(){
		if($$.m)
			$$.m.removeEventListener('click', minimize, true);
	}
	
	function removeMaxButton(){
		if($$.mx)
			$$.mx.removeEventListener('click', maximize, true);
	}
	
	function addDrag(){
		if(drag){
			$$.f.addEventListener('mousedown', mouseDown, false);
			$$.h.addEventListener('mousedown', mouseDown, false);
			window.addEventListener('mouseup', freeup, false);
			$$.h.addEventListener('touchmove', touches, false);
			window.addEventListener('touchend', freeup, false);
		}
	}
	
	function removeDrag(){
		if(drag){
			$$.h.removeEventListener('mousedown', mouseDown, true);
			$$.f.removeEventListener('mousedown', mouseDown, true);
			window.removeEventListener('mouseup', freeup, true);
			window.removeEventListener('mousedown', freeup, true);
		}
	}

	function init(trigger, obj) {
		if (trigger) {
			trigger.addEventListener('click', function() {
				if (single.show() < 1) {
					single.increment();
					toggle(obj);
					var el = mywindow(obj), x, y;
					
					setClass(el, obj);
					appendName($$.h, obj);
					appendBody($$.bd, obj);

					addToggleButton();
					addMaxButton();
					addMinButton();
					
					$$.bt.addEventListener('click', remove, false);

					addDrag();

					myEvents(obj);
				}
			});
		} else {
			return false;
		}
	}
	init(trigger, obj);
};