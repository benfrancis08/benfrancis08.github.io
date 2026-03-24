// Game of Life Demo

const CELL_SIZE = 10;
const RENDER_FRAME_MULTIPLE = 2;
const DEAD_CELL = 0;
const LIVE_CELL = 1;
let autoPlayIsOn = false;
let rows;
let cols;
let grid;
let gosper;

function preload() {
  gosper = loadJSON("gosper.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
  if (autoPlayIsOn && frameCount % RENDER_FRAME_MULTIPLE === 0) {
    grid = takeTurn();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === "a") {
    autoPlayIsOn = !autoPlayIsOn;
  }
  else if (key === "g") {
    grid = gosper;
  }
}

function takeTurn() {
  let nextTurn = generateEmptyGrid(cols, rows);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows) {
            neighbours += grid[y+j][x+i];
          }
        }
      }

      neighbours -= grid[y][x];
    
      if (grid[y][x] === LIVE_CELL) {
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = LIVE_CELL;
        }
        else {
          nextTurn[y][x] = DEAD_CELL;
        }
      }
      if (grid[y][x] === DEAD_CELL) {
        if (neighbours === 3) {
          nextTurn[y][x] = LIVE_CELL;
        }
        else {
          nextTurn[y][x] = DEAD_CELL;
        }
      }
    }
  }
  return nextTurn;
}

function generateEmptyGrid() {
  newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(DEAD_CELL);
    }
  }
  return newGrid;
}

function generateRandomGrid(cols, rows) {
  newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(Math.floor(random(2)));
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y< rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === DEAD_CELL) {
        fill(255);
      }
      else if (grid[y][x] === LIVE_CELL) {
        fill(0);
      }
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}

function toggleCell(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === DEAD_CELL) {
      grid[y][x] = LIVE_CELL;
    }
    else if (grid[y][x] === LIVE_CELL) {
      grid[y][x] = DEAD_CELL;
    }
  }
}