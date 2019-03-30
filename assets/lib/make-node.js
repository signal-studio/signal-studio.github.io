import random from './random';
import voice from './voice';

export default function (parent) {
  if (!parent) {
    throw new Error('Nodes must be passed a parent element');
  }

  const node = document.createElement('div');
  const rate = random(0.5, 4.0);
  node.classList.add('Node');
  node.style.top = `${random(0, 100)}%`;
  node.style.left = `${random(0, 100)}%`;

  function attach () {
    requestAnimationFrame(() => {
      parent.appendChild(node);
      const playbackId = voice.play();
      voice.rate(rate, playbackId);
    });
  }

  function detach () {
    parent.removeChild(node);
  }

  return { attach, detach };
}
