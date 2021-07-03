import './index.scss';
import WalkingImg from './assets/Female-1-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let buttonPressed = false;
let pY = canvas.height / 2 - spriteH / 2;
let pX = canvas.width / 2 - spriteW / 2;
let imgYPos = 0;

const getActualPos = (pos, symbol) => {
  let a = pos;
  if (a <= 0) {
    a += 3;
  } else if (a >= canvas.height - spriteH) {
    a = canvas.height - spriteH - 3;
  } else if (symbol === '+') {
    a += 10;
  } else if (symbol === '-') {
    a -= 10;
  }
  return a;
};

function keyDownHandler(e) {
  switch (e.key) {
    case 'ArrowDown':
    case 'Down':
      buttonPressed = true;
      pY = getActualPos(pY, '+');
      imgYPos = 0;
      break;
    case 'Up':
    case 'ArrowUp':
      buttonPressed = true;
      pY = getActualPos(pY, '-');
      imgYPos = 144;
      break;
    case 'Left':
    case 'ArrowLeft':
      buttonPressed = true;
      pX = getActualPos(pX, '-');
      imgYPos = 48;
      break;
    case 'Right':
    case 'ArrowRight':
      buttonPressed = true;
      pX = getActualPos(pX, '+');
      imgYPos = 96;
      break;
    default:
      buttonPressed = false;
  }
}

function keyUpHandler(e) {
  switch (e.key) {
    case 'ArrowDown':
    case 'Down':
    case 'Up':
    case 'ArrowUp':
    case 'Left':
    case 'ArrowLeft':
    case 'Right':
    case 'ArrowRight':
    default:
      buttonPressed = false;
      break;

  }
}

document.addEventListener('keydown', keyDownHandler);

document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = WalkingImg;

img.addEventListener('load', () => {
  setInterval(() => {
    if (buttonPressed) {
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, imgYPos, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
