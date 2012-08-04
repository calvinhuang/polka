/**
 * Quick utility library for DOM manipulation
 * 
 * A lot of this is probably easier by modifying native object prototypes, but this is less evil... 
 * 
 */

/*jslint plusplus: true*/
/*global console*/

var $util = (function(){
	'use strict';
	var util = {}, i;
	
	util.type = function(obj){
		var re = /\[\w+\s(\w+)\]/,
				type = typeof obj,
				pType = Object.prototype.toString.call(obj);
		pType = re.exec(pType)[1];
		return (type === 'function' || type === 'object')? pType : type;
	};
	
	/**
	 * Cleaner way to bind functions
 * @param {Function} func Callback to proxy
 * @param {Object} context Object to bind "this" to
	 */
	util.proxy = function(func, context) {
		return function(){
			var args = Array.prototype.slice.call(arguments);
			return func.apply(context, args);
		};
	};
	
	return util;
}());

var $dom = (function(){
	'use strict';
	var dom, wrapper, i,
			getById = document.getElementById.bind(document),
			getByClass = document.getElementsByClassName.bind(document),
			getByTag = document.getElementsByTagName.bind(document),
			
		/**
		 * Add an event handler to element
		 * @param {Object} obj Element to listen on
		 * @param {String} type Event type
		 * @param {Function} callback Event handler
		 */
			addEvent = function(obj, type, callback){
				if (obj.addEventListener) {
					obj.addEventListener(type, callback, false);
				} else if (obj.attachEvent)  {
					obj.attachEvent('on'+type, callback);
				}
			},
		/**
		 * Add a classname to an element's classList
		 * @param {Object} obj
		 * @param {String} classname
		 */
			addClass = function(obj, classname) {
				obj.classList.add(classname);
			},
		/**
		 * Remove a classname from an element's classList
		 * @param {Object} obj
		 * @param {String} classname
		 */
			removeClass = function(obj, classname) {
				obj.classList.remove(classname);
			},
		/**
		 * Toggle a classname on an element's classList
		 * @param {Object} obj
		 * @param {String} classname
		 */
			toggleClass = function(obj, classname) {
				obj.classList.toggle(classname);
			},
			nodeFns = [
				'childNodes',
				'firstChild',
				'lastChild',
				'nextSibling',
				'appendChild',
				'contains',
				'cloneNode',
				'hasAttribute',
				'insertBefore',
				'removeChild',
				'replaceChild'
			];
	
	wrapper = function(obj){
		this.obj = obj;
	};
	
	wrapper.prototype.getById = function(id){
		return dom(getById.call(this.obj, id));
	};
	wrapper.prototype.getByClass = function(str){
		return dom(getByClass.call(this.obj, str));
	};
	wrapper.prototype.getByTag = function(tag){
		return dom(getByTag.call(this.obj, tag));
	};
	wrapper.prototype.addEvent = function(type, callback){
		this.each(function(obj){
			addEvent(obj, type, callback);
		});
		return this;
	};
	wrapper.prototype.addClass = function(classname) {
		this.each(function(obj){addClass(obj, classname);});
		return this;
	};
	wrapper.prototype.removeClass = function(classname) {
		this.each(function(obj){removeClass(obj, classname);});
		return this;
	};
	wrapper.prototype.toggleClass = function(classname) {
		this.each(function(obj){toggleClass(obj, classname);});
		return this;
	};
	wrapper.prototype.each = function(iterator, context) {
		if (typeof context === 'undefined') {
			context = this;
		}
		if ($util.type(this.obj) === 'HTMLCollection') {
			_.each(this.obj, iterator, context);
		} else {
			iterator.call(context, this.obj);
		}
		return this;
	};
	wrapper.prototype.item = function(index) {
		return dom(this.obj[index]);
	};
	wrapper.prototype.parent = function() {
		var parent = false;
		if (this.obj.length) {
			if (this.obj.length > 0) {
				parent = dom(this.obj.item(0).parentNode);
			}
		} else {
			parent = dom(this.obj.parentNode);
		}
		return parent;
	};
	wrapper.prototype.style = function(attr, value) {
		_.each(function(obj){
			obj.obj.style[attr] = value;
		});
		return this;
	}
	
	for (i = 0; i < nodeFns.length; i++) {
		wrapper.prototype[nodeFns[i]] = function() {
			var nodeFn = nodeFns[i],
					args = Array.prototype.slice.call(arguments);
			return wrapper.obj[nodeFn].apply(this.obj, args);
		}
	} 
	
	dom = function(obj) {
		return new wrapper(obj);
	};
	
	dom.getById = getById;
	dom.getByClass = getByClass;
	dom.getByTag = getByTag;
	dom.addEvent = function(type, callback) {
		addEvent.call(window, window, type, callback);
		return this;
	};
	
	dom.prototype = wrapper.prototype;
	
	return dom;
}());
