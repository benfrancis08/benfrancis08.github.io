// 2d Arrays Project
// Ben Francis
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "menu"
let grid;
let rows;
let cols;

let buttons;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttons = [
    {x: width/2, y:height/3, w: width/4, h: height/8, r: 20, label: "Easy"},
    {x: width/2, y:height/2, w: width/4, h: height/8, r: 20, label: "Medium"},
    {x: width/2, y:height/1.5, w: width/4, h: height/8, r: 20, label: "Hard"}
  ]
}

function draw() {
  background(220);
  displayMenu();
}

function displayMenu() {
  if (gameState === "menu") {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(width/20);
    
    for (let btn of buttons) {
      if (mouseIsIn(btn)) {
        fill(150);
      }
      else {
        fill(255);
      }

      rect(btn.x, btn.y, btn.w, btn.h, btn.r);
      fill(0);
      text(btn.label, btn.x, btn.y);
    }
  }
}

function mouseIsIn(btn) {
  return mouseX > btn.x - btn.w/2 &&
         mouseX < btn.x + btn.w/2 &&
         mouseY > btn.y - btn.h/2 &&
         mouseY < btn.y + btn.h/2;
}