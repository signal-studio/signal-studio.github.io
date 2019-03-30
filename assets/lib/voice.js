import { Howl } from 'howler';
import random from './random';
import ping from "../audio/ping.mp3";
import pong from "../audio/pong.mp3";

const sound = new Howl({
  volume: 0.25,
  src: [pong],
});

export default sound;
