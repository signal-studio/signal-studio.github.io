var Emitter = require('component-emitter');
var howler = require('./howler');

var events = new Emitter();
var sound = new Howl({
	volume: 0.5,
	src: ['assets/ping.mp3']
});

function play(data) {
	sound._rate = data.rate;
	sound.play();
}

module.exports = {
	on: (ev, fn) => events.on(ev, fn),
	off: (ev, fn) => events.off(ev, fn),
	play: play
}
