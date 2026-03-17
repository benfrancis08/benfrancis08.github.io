// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - Explored putting images in an array using a for loop
// - Explored saving to local storage using getItem and storeItem
// - Explored functions such as parseFloat and to toFixed to make the money in the correct format ($__.00)


let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];
let symbolChoiceArray = [];

let spin = false;
let displayingSymbols = false;
let displayingPayout = false;
let changingBet = false;

let spinTime;
let payoutTableButton;
let changeBetButton;
let sevenIndex;
let rollTime;
let rollSpeedTime;
let winFactor;
let balance;
let bet;

const REEL_AMOUNT = 3;
const ROLL_SPEED = 50;
const ROLL_OFFSET = 250;
const ROLL_FLOOR = 500;
const ROLL_ROOF = 2500; 

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
  balance = getItem("balance");
  if (balance === null) {
    balance = 1000;
  }
  else {
    balance = parseFloat(balance);
  }
  bet = getItem("bet");
  if (bet === null) {
    bet = 5;
  }
  else {
    bet = parseFloat(bet);
  }
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
  createChangeBetButton();
  displaymoney();
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
    balance -= bet;
    storeItem("balance", balance);
    rollSpeedTime = millis() + ROLL_SPEED;
    rollTime = random(ROLL_FLOOR, ROLL_ROOF);
    displayingSymbols = "firstReel";
  }
  if (millis() > rollSpeedTime) {
    rollSpeedTime = millis() + ROLL_SPEED;
    if (displayingSymbols === "firstReel") {
      symbolChoiceArray[0] = (symbolChoiceArray[0] + 1) % symbols.length;
      if (millis() > spinTime + rollTime) {
        displayingSymbols = "secondReel";
        rollTime = random(ROLL_FLOOR, ROLL_ROOF);
        spinTime = millis();
      }
    }
    else if ( displayingSymbols === "secondReel") {
      symbolChoiceArray[1] = (symbolChoiceArray[1] + 1) % symbols.length;
      if (millis() > spinTime + rollTime) {
        displayingSymbols = "thirdReel";
        rollTime = random(ROLL_FLOOR, ROLL_ROOF);
        spinTime = millis();
      }
    }
    else if ( displayingSymbols === "thirdReel") {
      symbolChoiceArray[2] = (symbolChoiceArray[2] + 1) % symbols.length;
      if (millis() > spinTime + rollTime) {
        displayingSymbols = false;
        spinTime = millis();
        checkWin();
        changeBalance();
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
      winFactor = 150;
    }
    else if (symbolOne === symbolTwo && symbolTwo === symbolThree) {
      winFactor = 10;
    }
    else if (symbolOne === sevenIndex && symbolTwo === sevenIndex ||
             symbolOne === sevenIndex && symbolThree === sevenIndex ||
             symbolTwo === sevenIndex && symbolThree === sevenIndex) {
      winFactor = 2;
    }
    else if (symbolOne === symbolTwo ||
             symbolOne === symbolThree ||
             symbolTwo === symbolThree) {
      winFactor = 1.5;
    }
    else {
      winFactor = 0;
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
    x: width/3,
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

function createChangeBetButton() {
  changeBetButton = {
    x: width/1.5,
    y: height - 100,
    w: 100,
    h: 100,
    r: 15
  };
  fill(80);
  stroke(0);
  rect(changeBetButton.x, changeBetButton.y, changeBetButton.w, changeBetButton.h, changeBetButton.r);
  fill(220);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Change", changeBetButton.x, changeBetButton.y - 15);
  text("Bet", changeBetButton.x, changeBetButton.y + 15);
}

function changeBet() {
  let tempBet;
  tempBet = prompt(`Enter a bet amount\nBalance: $${balance}`);
  if (tempBet === null) {
    return;
  }
  tempBet = parseFloat(tempBet);
  if (!isNaN(tempBet) && balance - tempBet >= 0 && tempBet > 0) {
    bet = tempBet;
    storeItem("bet", bet);
  }
  else {
    alert("Please enter a valid number");
    changeBet();
  }
}

function displaymoney() {
  fill(0);
  noStroke();
  text(`Balance: $${balance.toFixed(2)}`, width/2, 20);
  text(`Bet: $${bet.toFixed(2)}`, width/2, 40);
}

function changeBalance() {
  let tempBet = bet;
  if (!displayingSymbols) {
    balance += tempBet*winFactor;
  }
  storeItem("balance", balance);
}

function mouseClicked() {
  let mouseInPayoutButtonLeft = mouseX > payoutTableButton.x - payoutTableButton.w/2;
  let mouseInPayoutButtonRight = mouseX < payoutTableButton.x + payoutTableButton.w/2;
  let mouseInPayoutButtonTop = mouseY > payoutTableButton.y - payoutTableButton.h/2;
  let mouseInPayoutButtonBottom = mouseY < payoutTableButton.y + payoutTableButton.h/2;

  let mouseInChangeBetButtonLeft = mouseX > changeBetButton.x - changeBetButton.w/2;
  let mouseInChangeBetButtonRight = mouseX < changeBetButton.x + changeBetButton.w/2;
  let mouseInChangeBetButtonTop = mouseY > changeBetButton.y - changeBetButton.h/2;
  let mouseInChangeBetButtonBottom = mouseY < changeBetButton.y + changeBetButton.h/2;

  if (mouseInPayoutButtonLeft && mouseInPayoutButtonRight && mouseInPayoutButtonTop && mouseInPayoutButtonBottom) {
    displayingPayout = !displayingPayout;
  }
  else if (mouseInChangeBetButtonLeft && mouseInChangeBetButtonRight && mouseInChangeBetButtonTop && mouseInChangeBetButtonBottom && !displayingSymbols) {
    changeBet();
  }
  else if (balance - bet < 0) {
    alert("Lower your bet\n(Or press up arrow to increase balance)");
  }
  else if (!displayingSymbols && !displayingPayout) {
    spin = true;
    spinTime = millis();
  }
}

function keyPressed() {
  if (keyCode === 38) {
    balance += 1000;
    storeItem("balance", balance);
  }
}