var $ = require('cash-dom');
var raf = require('component-raf');

var Node = require('./lib/node');
var circle = require('./geometry/circle.html');
var random = require('./helpers/random');

var count = 10;
var shapes = [];

$(document).ready(function() {
	
	var $background = $('.background');
	
	let i = -1;
	while (i++ < count) {
		var $shape = Node({ parent: $background });
		setTimeout($shape.attach, random(0, 5000));
		setTimeout($shape.detach, random(7000, 15000))
	}

});