/**
 * Polka.js
 * 
 * by Calvin Huang
 * 
 * An experimental accordion control. Not at all ready for production use.
 * 
 */

/*jslint plusplus: true*/
/*global console, $util, $dom*/

(function(root){
	'use strict';

	var polka = function(obj) {
		var headings, tabs, index = 0, that = this;
		headings = $dom(obj)
			.addClass('polka-accordion')
			.getByTag('dt').addClass('polka-heading');
		tabs = $dom(obj).getByTag('dd').addClass('polka-tab');
		
		this.open = function(i) {
			var j;
			for (j = 0; j < headings.obj.length; j++) {
				if (j !== i) {
					headings.item(j).removeClass('open');
					tabs.item(j).removeClass('open');
				} else {
					headings.item(j).addClass('open');
					tabs.item(j).addClass('open');
					index = j;
				}
			}
		};
		
		this.select = function(el) {
			var j;
			for (j = 0; j < headings.obj.length; j++) {
				if (headings.item(j).obj === el) {
					this.open(j);
					return true;
				}
			}
			return false;
		}
		
		headings.addEvent('click', function(){
			that.select(this);
		});
		
		this.open(index);
	};
	
	root.polka = polka;
}(this));
