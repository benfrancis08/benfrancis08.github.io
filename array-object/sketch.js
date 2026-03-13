// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];
let symbolChoiceArray = [];
let reelAmount = 3;
let spin = false;
let displayingSymbols = false;
let spinTime;
const ROLL_TIME = 3000;
const ROLL_OFFSET = 250;

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = loadImage(`images/${symbol}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createReels();
  for (let i = 0; i < 3; i++) {
    symbolChoiceArray.push(floor(random(0, symbols.length)));
  }
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
  stroke(0);
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
      symbolChoiceArray[0] = (symbolChoiceArray[0] + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME) {
        displayingSymbols = "secondReel";
        spinTime = millis();
      }
    }
    if ( displayingSymbols === "secondReel") {
      symbolChoiceArray[1] = (symbolChoiceArray[1] + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME + ROLL_OFFSET) {
        displayingSymbols = "thirdReel";
        spinTime = millis();
      }
    }
    if ( displayingSymbols === "thirdReel") {
      symbolChoiceArray[2] = (symbolChoiceArray[2] + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME + ROLL_OFFSET*2) {
        displayingSymbols = false;
        spinTime = millis();
      }
    }
  }
  for (let i = 0; i < 3; i ++) {
    displaySymbolsOnReel(symbolChoiceArray[i], i);
  }
}

function displaySymbolsOnReel(symbol, reel) {
  let top = (symbol + 1) % symbols.length;
  let bottom = (symbol - 1 + symbols.length) % symbols.length;
  imageMode(CENTER);
  image(symbols[top], reelArray[reel].x, height/2 - reelArray[0].h/2);
  image(symbols[symbol], reelArray[reel].x, height/2);
  image(symbols[bottom], reelArray[reel].x, height/2 + reelArray[0].h/2);
}

function checkWin() {
  
}

function createFrame() {
  let middleReel = reelArray[1];
  let reelTop = middleReel.y - middleReel.h/2;
  let reelBottom = middleReel.y + middleReel.h/2;
  
  let topFrameH = symbols[0].height/2;
  let topFrameW = symbols[0].width*4;

  let leftFrameX = middleReel.x - middleReel.w*2;
  let rightFrameX = middleReel.x + middleReel.w*2;

  fill("red");
  noStroke();
  rect(middleReel.x, reelTop - topFrameH/2, topFrameW, topFrameH);
  rect(middleReel.x, reelBottom + topFrameH/2, topFrameW, topFrameH);

  rect(leftFrameX + topFrameH/2, middleReel.y, topFrameH, middleReel.h);
  rect(rightFrameX - topFrameH/2, middleReel.y, topFrameH, middleReel.h);
}

function mouseClicked() {
  if (!displayingSymbols) {
    spin = true;
    spinTime = millis();
  }
}