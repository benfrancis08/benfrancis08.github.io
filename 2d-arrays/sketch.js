// 2d Arrays Project
// Ben Francis
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "menu";

let grid;
let rows;
let cols;
let buttons;

const EASY_GRID = {
  ROWS: 10,
  COLS: 10
};
const MEDIUM_GRID = {
  ROWS: 15,
  COLS: 20
};
const HARD_GRID = {
  ROWS: 20,
  COLS: 30
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttons = [
    {x: width/2, y:height/3, w: width/4, h: height/8, r: 20, label: "Easy"},
    {x: width/2, y:height/2, w: width/4, h: height/8, r: 20, label: "Medium"},
    {x: width/2, y:height/1.5, w: width/4, h: height/8, r: 20, label: "Hard"}
  ];
}

function draw() {
  background(220);
  displayMenu();
  console.log(gameState);
}

function displayMenu() {
  if (gameState === "menu") {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(width/20);
    
    for (let btn of buttons) {
      if (mouseIsIn(btn)) {
        fill(150);
        btn.w = width/4 + 25;
        btn.h = height/8 + 25;
      }
      else {
        fill(255);
        btn.w = width/4;
        btn.h = height/8;
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

function createGrid() {
  if (gameState === "Easy") {
    rows = Math.floor(height/EASY_GRID.ROWS);
    cols = Math.floor(width/EASY_GRID.COLS);
  }
  else if (gameState === "Medium") {
    rows = Math.floor(height/MEDIUM_GRID.ROWS);
    cols = Math.floor(width/MEDIUM_GRID.COLS);
  }
  else if (gameState === "Hard") {
    rows = Math.floor(height/HARD_GRID.ROWS);
    cols = Math.floor(width/HARD_GRID.COLS);
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      
    }
  }
}

function mouseClicked() {
  for (let btn of buttons) {
    if (mouseIsIn(btn)) {
      gameState = btn.label;
    }
  }
}