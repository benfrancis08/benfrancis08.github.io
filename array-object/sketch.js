// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];
let symbolChoiceArray = [];

let spin = false;
let displayingSymbols = "No roll";
let displayingPayout = false;

let spinTime;
let payoutTableButton;
let sevenIndex;

const REEL_AMOUNT = 3;
const ROLL_TIME = 1500;
const ROLL_OFFSET = 250;

function preload() {
  sevenIndex = symbols.indexOf("seven");
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
  payoutTable();
}

function createReels() {
  let firstReelX = width/2 - symbols[0].width;
  for (let i = 0; i < REEL_AMOUNT; i++) {
    let theReel = {
      x: firstReelX + symbols[0].width * i,
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
  if (frameCount % 5 === 0) {
    if (displayingSymbols === "firstReel") {
      symbolChoiceArray[0] = (symbolChoiceArray[0] + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME) {
        displayingSymbols = "secondReel";
        spinTime = millis();
      }
    }
    else if ( displayingSymbols === "secondReel") {
      symbolChoiceArray[1] = (symbolChoiceArray[1] + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME + ROLL_OFFSET) {
        displayingSymbols = "thirdReel";
        spinTime = millis();
      }
    }
    else if ( displayingSymbols === "thirdReel") {
      symbolChoiceArray[2] = (symbolChoiceArray[2] + 1) % symbols.length;
      if (millis() > spinTime + ROLL_TIME + ROLL_OFFSET*2) {
        displayingSymbols = false;
        spinTime = millis();
        checkWin();
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
  if (!displayingSymbols) {
    let symbolOne = symbolChoiceArray[0];
    let symbolTwo = symbolChoiceArray[1];
    let symbolThree = symbolChoiceArray[2];

    if (symbolOne === sevenIndex && symbolTwo === sevenIndex && symbolThree === sevenIndex) {
      console.log("150x");
    }
    else if (symbolOne === symbolTwo && symbolTwo === symbolThree) {
      console.log("10x");
    }
    else if ((symbolOne === sevenIndex && symbolTwo === sevenIndex) ||
             (symbolOne === sevenIndex && symbolThree === sevenIndex) ||
             (symbolTwo === sevenIndex && symbolThree === sevenIndex)) {
      console.log("2x");
    }
    else if ((symbolOne === symbolTwo) ||
             (symbolOne === symbolThree) ||
             (symbolTwo === symbolThree)) {
      console.log("1.5x");
    }
  }
}

function createFrame() {
  let middleReel = reelArray[1];
  let reelTop = middleReel.y - middleReel.h/2;
  let reelBottom = middleReel.y + middleReel.h/2;
  
  let topFrameH = symbols[0].height/2;
  let topFrameW = symbols[0].width*4;

  let leftFrameX = middleReel.x - middleReel.w*2  + topFrameH/2;
  let rightFrameX = middleReel.x + middleReel.w*2  - topFrameH/2;

  fill("red");
  noStroke();
  rect(middleReel.x, reelTop - topFrameH/2, topFrameW, topFrameH);
  rect(middleReel.x, reelBottom + topFrameH/2, topFrameW, topFrameH);

  rect(leftFrameX, middleReel.y, topFrameH, middleReel.h);
  rect(rightFrameX, middleReel.y, topFrameH, middleReel.h);
  push();
  strokeWeight(5);
  stroke("red");
  line(leftFrameX, middleReel.y, rightFrameX, middleReel.y);
  pop();
}

function payoutTable() {
  payoutTableButton = {
    x: width/2,
    y: height - 100,
    w: 100,
    h: 100,
    r: 15
  };
  fill(80);
  stroke(0);
  rect(payoutTableButton.x, payoutTableButton.y, payoutTableButton.w, payoutTableButton.h, payoutTableButton.r);
  fill(220);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Payout", payoutTableButton.x, payoutTableButton.y - 15);
  text("Table", payoutTableButton.x, payoutTableButton.y + 15);

  if (displayingPayout) {
    let payoutBox = {
      x: width/2,
      y: height/2,
      w: reelArray[1].w*6,
      h: reelArray[1].h*2
    };
    let lineOne = "3 of a kind: 7's - 150x";
    let lineTwo = "2 of a kind: 7's - 2x";
    let lineThree = "3 of a kind: Any Symbol - 10x";
    let lineFour = "2 of a kind: Any Symbol - 1.5x";

    fill(255);
    stroke(0);
    rect(payoutBox.x, payoutBox.y, payoutBox.w, payoutBox.h);
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    noStroke();
    text(`${lineOne}\n${lineTwo}\n${lineThree}\n${lineFour}`, payoutBox.x, payoutBox.y);
  }
}

function mouseClicked() {
  let mouseInPayoutButtonLeft = mouseX > payoutTableButton.x - payoutTableButton.w/2;
  let mouseInPayoutButtonRight = mouseX < payoutTableButton.x + payoutTableButton.w/2;
  let mouseInPayoutButtonTop = mouseY > payoutTableButton.y - payoutTableButton.h/2;
  let mouseInPayoutButtonBottom = mouseY < payoutTableButton.y + payoutTableButton.h/2;

  if (mouseInPayoutButtonLeft && mouseInPayoutButtonRight && mouseInPayoutButtonTop && mouseInPayoutButtonBottom) {
    displayingPayout = !displayingPayout;
  }
  else if ((!displayingSymbols || displayingSymbols === "No roll") && !displayingPayout) {
    spin = true;
    spinTime = millis();
  }
}