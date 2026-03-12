// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];
let reelAmount = 3;
let symbolOne;
let symbolTwo;
let symbolThree;
let spin = false;
let displayingSymbols = false;
let spinTime;
const ROLL_TIME = 3000;

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = loadImage(`images/${symbol}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createReels();
  symbolOne = floor(random(0, symbols.length));
  symbolTwo = floor(random(0, symbols.length));
  symbolThree = floor(random(0, symbols.length));
  spinTime = millis();
  
}

function draw() {
  background(150);
  drawReels();
  displaySymbols();
  createFrame();
}

function createReels() {
  let firstReelX = width/2 - symbols[0].width;
  for (let i = 0; i < reelAmount; i++) {
    let theReel = {
      x: firstReelX + symbols[0].width * i-1,
      y: height/2,
      w: symbols[0].width,
      h: symbols[0].height*2
    };
    reelArray.push(theReel);
  }  
}

function drawReels() {
  fill(255);
  for (let reel of reelArray) {
    rectMode(CENTER);
    rect(reel.x, reel.y, reel.w, reel.h);
  }
}

function displaySymbols() {
  if (spin) {
    spin = false;
    displayingSymbols = "firstReel";
  }
  if (frameCount % 15 === 0) {
    if (displayingSymbols === "firstReel") {
      symbolOne = (symbolOne + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME) {
        displayingSymbols = "secondReel";
        spinTime = millis();
      }
    }
    if ( displayingSymbols === "secondReel") {
      symbolTwo = (symbolTwo + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME + 250) {
        displayingSymbols = "thirdReel";
        spinTime = millis();
      }
    }
    if ( displayingSymbols === "thirdReel") {
      symbolThree = (symbolThree + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME + 500) {
        displayingSymbols = false;
        spinTime = millis();
      }
    }
  }
  reelOne(symbolOne);
  reelTwo(symbolTwo);
  reelThree(symbolThree);
}

function reelOne(one) {
  let top = (one + 1) % symbols.length;
  let bottom = (one - 1 + symbols.length) % symbols.length;
  imageMode(CENTER);
  image(symbols[top], reelArray[0].x, height/2 - reelArray[0].h/2);
  image(symbols[one], reelArray[0].x, height/2);
  image(symbols[bottom], reelArray[0].x, height/2 + reelArray[0].h/2);
}

function reelTwo(two) {
  let top = (two + 1) % symbols.length;
  let bottom = (two - 1 + symbols.length) % symbols.length;
  imageMode(CENTER);
  image(symbols[top], reelArray[1].x, height/2 - reelArray[0].h/2);
  image(symbols[two], reelArray[1].x, height/2);
  image(symbols[bottom], reelArray[1].x, height/2 + reelArray[0].h/2);
}

function reelThree(three) {
  let top = (three + 1) % symbols.length;
  let bottom = (three - 1 + symbols.length) % symbols.length;
  imageMode(CENTER);
  image(symbols[top], reelArray[2].x, height/2 - reelArray[0].h/2);
  image(symbols[three], reelArray[2].x, height/2);
  image(symbols[bottom], reelArray[2].x, height/2 + reelArray[0].h/2);
}

function createFrame() {
  let middleReel = reelArray[1];
  let reelTop = middleReel.y - middleReel.h/2;
  let reelBottom = middleReel.y + middleReel.h/2;
  
  let topFrameH = symbols[0].height/2;
  let topFrameW = symbols[0].width*4;

  let leftFrameX = middleReel.x - middleReel.w*2

  fill("red");
  rect(middleReel.x, reelTop - topFrameH/2, topFrameW, topFrameH);
  rect(middleReel.x, reelBottom + topFrameH/2, topFrameW, topFrameH);

  rect(leftFrameX, middleReel.y, topFrameH, middleReel.h);
}

function mouseClicked() {
  if (!displayingSymbols) {
    spin = true;
    spinTime = millis();
  }
}