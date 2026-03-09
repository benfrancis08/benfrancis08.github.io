// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = loadImage(`images/${symbol}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(150);
  createReels();
}

function createReels() {
  let theReel = {
    width: symbols[0].width,
    height: symbols[0].height*2
  };
  reelArray.push(theReel);
  
  rect(width/2 - reel.width/2, height/2 - reel.height/2, reel.width, reel.height);
  
}
