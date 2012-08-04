/**
 * Polka.js
 * 
 * by Calvin Huang
 * 
 * An experimental accordion control. Not at all ready for production use.
 * 
 */

/*global console, $util*/

(function(root){
	'use strict';

	function polka(obj) {
		var headings, tabs, i;
		headings = $dom(obj)
			.addClass('polka-accordion')
			.getByTag('dt').addClass('polka-heading');
		tabs = $dom(obj).getByTag('dd').addClass('polka-tab');
	}
	
	root.polka = polka;
}(this));
