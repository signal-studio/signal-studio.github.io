import makeNode from "./lib/make-node";
import random from "./lib/random";
import voice from "./lib/voice";

let hasActivePermission = false;
let isAudioAllowed = false;

document.addEventListener("DOMContentLoaded", () => {
  const $background = document.getElementById("background");
  const $container = document.getElementById("main");
  const $title = document.getElementById("title");
  const $notice = document.getElementById("notice");

  let activeNodes = 0;

  function updateNodes() {
    const shape = makeNode($background);
    setTimeout(shape.attach, random(0, 5000));
    setTimeout(() => {
      shape.detach();
      activeNodes--;
      updateNodes();
    }, random(5000, 7000));
    activeNodes++;
  }

  voice.once("unlock", () => {
    isAudioAllowed = false;
    $notice.classList.add("hidden");
  });

  voice.on("load", () => {
    document.documentElement.classList.add("loaded");
    while (activeNodes < 5) {
      updateNodes();
    }
  });
});
