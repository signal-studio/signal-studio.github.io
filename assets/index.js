import makeNode from './lib/make-node';
import random from './lib/random';
import voice from './lib/voice';

let hasActivePermission = false;

document.addEventListener('DOMContentLoaded', () => {
  const $background = document.getElementById('background');
  const $title = document.getElementById('title');

  let activeNodes = 0;

  function updateNodes () {
    const shape = makeNode($background);
    setTimeout(shape.attach, random(0, 5000));
    setTimeout(() => {
      shape.detach();
      activeNodes--;
      updateNodes();
    }, random(5000, 7000));
    activeNodes++
  }

  voice.on('load', () => {
    $title.classList.add('loaded');
    while (activeNodes < 5) {
      updateNodes();
    }
  });
});
