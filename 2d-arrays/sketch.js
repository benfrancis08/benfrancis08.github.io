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
let cellSize;
let mines;
let mineImg;

const EASY_GRID = {
  ROWS: 10,
  COLS: 10,
  MINES: 10
};
const MEDIUM_GRID = {
  ROWS: 12,
  COLS: 12,
  MINES: 20
};
const HARD_GRID = {
  ROWS: 14,
  COLS: 14,
  MINES: 30
};
const MINE = 9;

function preload() {
  mineImg = loadImage("images/mine.png");
}

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
  displayGrid();
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
    rows = EASY_GRID.ROWS;
    cols = EASY_GRID.COLS;
    mines = EASY_GRID.MINES;
  }
  else if (gameState === "Medium") {
    rows = MEDIUM_GRID.ROWS;
    cols = MEDIUM_GRID.COLS;
    mines = MEDIUM_GRID.MINES;
  }
  else if (gameState === "Hard") {
    rows = HARD_GRID.ROWS;
    cols = HARD_GRID.COLS;
    mines = HARD_GRID.MINES;
  }

  let cellSizeWidth = width/cols;
  let cellSizeHeight = height/rows;
  if (cellSizeWidth > cellSizeHeight) {
    cellSize = Math.floor(cellSizeHeight)*0.95;
  }
  else {
    cellSize = Math.floor(cellSizeWidth)*0.95;
  }

  grid = [];
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      grid[y].push(0);
    }
  }
  spawnMines();
  detectMines();
}

function spawnMines() {
  let placedMines = 0;
  while (placedMines < mines) {
    let x = Math.floor(random(cols));
    let y = Math.floor(random(rows));

    if (grid[y][x] === 0) {
      grid[y][x] = MINE;
      placedMines ++;
    }
  }
}

function detectMines() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let count = 0;
      
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          
          if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows && grid[y][x] !== MINE) {
            if (grid[y + j][x + i] === MINE) {
              count += 1;
            }
            grid[y][x] = count;
          }
        }
      }
    }
  }
}

function displayGrid() {
  rectMode(CORNER);
  textAlign(CENTER, CENTER);

  let gridWidth = cols*cellSize;
  let gridHeight = rows*cellSize;

  let startX = (width - gridWidth)/2;
  let startY = (height - gridHeight)/2;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === MINE) {
        image(mineImg, startX + x*cellSize, startY + y*cellSize, cellSize, cellSize);
      }
      else {
        fill(180);
        square(startX + x*cellSize, startY + y*cellSize, cellSize);
        fill(0);
        text(grid[y][x], startX + x*cellSize + cellSize/2, startY + y*cellSize + cellSize/2);
      }
    }
  }
}

function mouseClicked() {
  for (let btn of buttons) {
    if (mouseIsIn(btn)) {
      gameState = btn.label;
      createGrid();
    }
  }
}