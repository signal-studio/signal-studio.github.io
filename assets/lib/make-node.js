import random from "./random";
import voice from "./voice";

const PADDING = 10;

export default function(parent) {
  if (!parent) {
    throw new Error("Nodes must be passed a parent element");
  }

  const node = document.createElement("div");
  const rate = random(0.5, 2.0);
  node.classList.add("Node");
  node.style.top = `${random(PADDING, 100 - PADDING)}%`;
  node.style.left = `${random(PADDING, 100 - PADDING)}%`;

  function attach() {
    requestAnimationFrame(() => {
      parent.appendChild(node);
      const playbackId = voice.play();
      voice.rate(rate, playbackId);
    });
  }

  function detach() {
    parent.removeChild(node);
  }

  return { attach, detach };
}
