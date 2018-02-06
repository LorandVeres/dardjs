var dialog = {

	mywindow : function() {
		var d = document.createElement('div'),
		    h = document.createElement('div'),
		    ct = document.createElement('div'),
		    bt = document.createElement('div'),
		    m = document.createElement('div'),
		    mx = document.createElement('div'),
		    bd = document.createElement('div'),
		    f = document.createElement('div'),
		    uniq = new Date().getTime(),
		    id = 'dard_d_bd' + uniq;

		function create() {

			ct.appendChild(bt);
			ct.appendChild(mx);
			ct.appendChild(m);
			h.appendChild(ct);
			d.appendChild(h);
			d.appendChild(bd);
			d.appendChild(f);
			d.setAttribute('id', id);
			d.setAttribute('class', 'dard_d_box');
			h.setAttribute('class', 'dard_d_hd');
			ct.setAttribute('class', 'dard_d_ct');
			bt.setAttribute('class', 'dard_d_bt');
			m.setAttribute('class', 'dard_d_bt');
			mx.setAttribute('class', 'dard_d_bt');
			bd.setAttribute('class', 'dard_d_bd');
			f.setAttribute('class', 'dard_d_f');
			m.innerHTML = '&#95';
			mx.innerHTML = '&square;';
			bt.innerHTML = '&times;';

			document.body.appendChild(d);
		};
		return ( function() {
				create();
				return [d, h, bt, m, mx, bd, f];
			}());

	},

	toggle : function() {
		var t = document.createElement('div');
		t.setAttribute('class', 'dialog-toggle');
		t.innerHTML = '+';
		document.body.appendChild(t);
		return t;
	},

	setClass : function(elements, obj) {
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
	},

	appendBody : function(body, obj) {
		if (obj.keyIn('html')) {
			if ( typeof obj.html === 'string') {
				var el = str2el(obj.html);
				body.appendChild(el);
			}
			if ( typeof obj.html == 'object') {
				if (obj.html) {
					var el = obj.html.cloneNode(true);
					body.appendChild(obj.html);
				}
			}
		}
	},

	appendName : function(head, obj) {
		if (obj.keyIn('title')) {
			var n = document.createElement('h4');
			n.appendChild(document.createTextNode(obj.title));
			head.appendChild(n);
		}
	},

	clearBody : function(el) {
		emptyEl(el);
	},

	myEvents : function(obj) {
		if (obj.keyIn('acton')) {
			for (var i = 0,
			    j = obj.acton.myevent.length; i < j; i++) {
				$(obj.acton.trigger[i]).addEventListener(obj.acton.myevent[i], obj.acton.handler[i], false);
			};
		}
	},

	init : function(trigger, obj) {
		var single = counter();
		if (trigger) {
			trigger.addEventListener('click', function() {
				if (single.show() < 1) {
					single.increment();
					if (obj.sideButton)
						var t = dialog.toggle();
					var el = dialog.mywindow(),
					    d = el[0],
					    h = el[1],
					    bt = el[2],
					    m = el[3],
					    mx = el[4],
					    bd = el[5],
					    f = el[6],
					    x,
					    y;

					dialog.setClass(el, obj);
					dialog.appendName(h, obj);
					dialog.appendBody(bd, obj);
					//ontouchmove

					if (t)
						t.addEventListener('click', maximize, false);
					m.addEventListener('click', minimize, false);
					mx.addEventListener('click', maximize, false);
					bt.addEventListener('click', remove, false);

					f.addEventListener('mousedown', mouseDown, false);
					h.addEventListener('mousedown', mouseDown, false);
					window.addEventListener('mouseup', freeup, false);
					h.addEventListener('touchmove', touches, false);
					window.addEventListener('touchend', freeup, false);

					function remove() {
						document.body.removeChild(d);
						if (obj.sideButton)
							document.body.removeChild(t);
						single.reset();
						h.removeEventListener('mousedown', mouseDown, true);
						f.removeEventListener('mousedown', mouseDown, true);
						window.removeEventListener('mouseup', freeup, true);
						window.removeEventListener('mousedown', freeup, true);
						bt.removeEventListener('click', remove, true);
						m.removeEventListener('click', minimize, true);
					}

					function maximize() {
						if (obj.keyIn('transform')) {
							if (d.className === obj.transform[0]) {
								dialog.setClass(el, obj);
								if (t)
									t.style.display = 'none';
							}
						} else {
							d.style.display = 'block';
							if (t)
								t.style.display = 'none';
						}
					}

					function minimize() {
						if (obj.keyIn('transform')) {
							if (d.className === obj.css[0] || d.className === 'dard_d_box') {
								dialog.setClass([d, h, bd, f], obj.transform);
								if (t)
									t.style.display = 'block';
							}
						} else {
							d.style.display = 'none';
							if (t)
								t.style.display = 'block';
						}
					}

					function touches(event) {
						var touch = event.targetTouches[0];
						d.style.left = touch.pageX - 20 + 'px';
						d.style.top = touch.pageY - 20 + 'px';
						event.preventDefault();
					}

					function getStyle(e, s) {
						return window.getComputedStyle(e, null).getPropertyValue(s);
					}

					function mouseDown(e) {
						window.addEventListener('mousemove', divMove, true);
						y = e.clientY - getStyle(d, 'top').slice(0, -2),
						x = e.clientX - getStyle(d, 'left').slice(0, -2);
					}

					function divMove(e) {
						//d.style.position = 'absolute';
						d.style.top = (e.clientY - y) + 'px';
						d.style.left = (e.clientX - x) + 'px';
					}

					function freeup() {
						window.removeEventListener('mousemove', divMove, true);
						window.removeEventListener('touchmove', touches, true);
					}


					dialog.myEvents(obj);
				}
			});
		} else {
			console.log(trigger + ' dialog content not on this page');
		}
	}
};
