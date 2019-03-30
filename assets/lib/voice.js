import { Howl } from 'howler';
import random from './random';
import pong from "../audio/pong.mp3";

const sound = new Howl({
  volume: 0.1,
  src: [pong],
});

export default sound;
