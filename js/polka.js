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

	var polka = function(obj, params) {
		var headings, tabs, index = 0, that = this, accord = $dom(obj),
				defaults = {
					'accordion-class': 'polka-accordion',
					'heading-class': 'polka-heading',
					'tab-class': 'polka-tab',
					'heading-tag': 'dt',
					'tab-tag': 'dd'
				};
		
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
		};
		
		this.init = function(params) {
			var opt = this.settings, i;
			opt = _.clone(defaults);
			
			if (params) _.extend(opt, params);
			
			accord.addClass(opt['accordion-class']);
			headings = accord.getByTag(opt['heading-tag']).addClass(opt['heading-class']);
			tabs = accord.getByTag(opt['tab-tag']).addClass(opt['tab-class']);
			
			if (opt.height) {
				if (_.isNumeric(opt.height) && !isNaN(opt.height)) {
					opt.height = opt.height+'px';
				}
				tabs.each(function(obj){
					obj.style('height', opt.height);
				});
			}
			
			that.open(index);
			
			// @TODO: change this to delegate;
			headings.addEvent('click', function(){
				that.select(this);
			});
		};
		
		this.init(params);
	};
	
	root.polka = polka;
}(this));
