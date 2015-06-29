var $ = require('cash-dom')
var raf = require('component-raf');
var Emitter = require('component-emitter');
var voice = require('./voice');
var random = require('../helpers/random');

var shapes = [
	require('../geometry/circle.html'),
	require('../geometry/square.html'),
	require('../geometry/triangle.html')
];

module.exports = function(opts) {
	
	if (!opts.parent) {
		throw new Error('Nodes must be passed a parent element');
	}
	
	var $el = $(shapes[random(0,shapes.length-1)]);
	var $parent = $(opts.parent);
	var events = new Emitter();
	
	$el.addClass('shape');
	$el.css('top', `${random(0, window.innerHeight)}px`);
	$el.css('left', `${random(0, window.innerWidth)}px`);
	
	function attach() {
		raf(function() {
			$el.css('transform', `scale(1.0) rotate(${random(0,360)}deg)`);
			$el.appendTo($parent);
			voice.play({ rate: random(0.5, 4.0) });
			events.emit('attach');
		});
	}
	
	function detach() {
		$el.css('transform', '');
		$el.on('transitionEnd', function() {
			raf(function() {
				$el.remove();
				events.emit('detach');
			});
		});
	}
	
	
	
	/**
	 * Bind events
	 */
	
	return {
		on: (evt, fn) => events.on(evt, fn),
		off: (evt, fn) => events.off(evt, fn),
		attach: attach,
		detach: detach
	}
	
}