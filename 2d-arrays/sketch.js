// 2d Arrays Project
// Ben Francis
// April 15 2026
//
// Extra for Experts:
// - Explored recursion through a floodfill function to uncover all "0's" in my minesweeper project
// - Explored disabling the right click menu in browser so right click can be used in project
// - Explored local storage through store and get functions to save high scores to browser
// - Explored having a safe first click so that there is no possibility of clicking a mine on the first press
// - Explored making project look 🌟pretty🌟 using different rectangles and stroke sizes to create shadows and a 3d affect

// State/boolean variables used in project
let gameState = "menu";
let scoreState;
let firstClick = true;
let flagCount = 0;

// Variables used in project
let grid;
let gridWidth;
let gridHeight;
let rows;
let cols;
let buttons;
let cellSize;
let mines;
let time;
let finalTime;
let timerDisplay;
let highScoreEasy;
let highScoreMedium;
let highScoreHard;

// Image variables used in project
let flagImg;
let mineImg;

// Constants used in project
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
const COLORS = {
  LIGHT_GREY: 150,
  DARK_GREY: 80,
  BG: 220,
  WHITE: 255,
};
const INDEX_COLORS = ["blue", "green", "red", "purple", "maroon", "teal", "black", "grey"];
const GRID_SIZE_FACTOR = 0.8;
const BUTTON_RADIUS = 20;
const BUTTON_HEIGHT_FACTOR = 8;
const BUTTON_WIDTH_FACTOR = 4;
const BUTTON_INCREASE_ON_HOVER = 25;
const STROKE_WEIGHT = 5;
const SHADOW_THICKNESS = 20;
const CELL_SIZE_MODIFYER = 1.05;

// Built in preload funtion to load images used in project
function preload() {
  mineImg = loadImage("images/mine.png");
  flagImg = loadImage("images/flag.png");
}

// Built in setup function to setup variables for projact
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Found on stack overflow. Needed to disable right click menu in browser so I can use right click in project
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  // Button array stores button variables
  buttons = [
    {x: width/2, y:height/3, w: width/BUTTON_WIDTH_FACTOR, h: height/BUTTON_HEIGHT_FACTOR, r: BUTTON_RADIUS, label: "Easy"},
    {x: width/2, y:height/2, w: width/BUTTON_WIDTH_FACTOR, h: height/BUTTON_HEIGHT_FACTOR, r: BUTTON_RADIUS, label: "Medium"},
    {x: width/2, y:height/1.5, w: width/BUTTON_WIDTH_FACTOR, h: height/BUTTON_HEIGHT_FACTOR, r: BUTTON_RADIUS, label: "Hard"},
    {x: width/2, y:height/1.5, w: width/3, h: height/BUTTON_HEIGHT_FACTOR, r: BUTTON_RADIUS, label: "Play Again"}
  ];
}

// Built in draw function draws main function to canvas
function draw() {
  background(COLORS.BG);
  if (gameState === "menu") {
    displayMenu();
  }
  else {
    displayGrid();
  }
  if (gameState === "Game Over") {
    gameOver();
  }
  checkWin();
  displayWin();
}

// displayMenu functon displays 3 buttons easy, medium, and hard that change size and color when mouse button hovers over
function displayMenu() {
  if (gameState === "menu") {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    
    // Goes through button array one by one excluding play again button and displays on canvas
    for (let i = 0; i < buttons.length - 1; i++) {
      let btn = buttons[i];
      // Recolors and resized button when mouse hovered over
      if (mouseIsInButton(btn)) {
        fill(COLORS.LIGHT_GREY);
        
        
        btn.w = width/BUTTON_WIDTH_FACTOR + BUTTON_INCREASE_ON_HOVER;
        btn.h = height/BUTTON_HEIGHT_FACTOR + BUTTON_INCREASE_ON_HOVER;
      }
      else {
        fill(255);
        btn.w = width/BUTTON_WIDTH_FACTOR;
        btn.h = height/BUTTON_HEIGHT_FACTOR;
      }
      
      // Displays button
      stroke(STROKE_WEIGHT);
      rect(btn.x, btn.y, btn.w, btn.h, btn.r);
      fill(0);

      const TEXT_SIZE_FACTOR = 20;

      // Displays button label in center of button
      textSize(width/TEXT_SIZE_FACTOR);
      noStroke();
      text(btn.label, btn.x, btn.y);
    }
  }
}

// mouseIsInButton function returns true or false if mouse is in button or not given btn
function mouseIsInButton(btn) {
  return mouseX > btn.x - btn.w/2 &&
         mouseX < btn.x + btn.w/2 &&
         mouseY > btn.y - btn.h/2 &&
         mouseY < btn.y + btn.h/2;
}

// mouseIsInCell function returns true or false if mouse is in cell or not given x and y of cell
function mouseIsInCell(x, y) {
  return mouseX > grid[y][x].x &&
         mouseX < grid[y][x].x + cellSize &&
         mouseY > grid[y][x].y &&
         mouseY < grid[y][x].y + cellSize;
}

// createGrid function creates the main grid for the project changing the size based on the gameState
function createGrid() {
  if (gameState === "Easy") {
    rows = EASY_GRID.ROWS;
    cols = EASY_GRID.COLS;
    mines = EASY_GRID.MINES;
    scoreState = "Easy";
  }
  else if (gameState === "Medium") {
    rows = MEDIUM_GRID.ROWS;
    cols = MEDIUM_GRID.COLS;
    mines = MEDIUM_GRID.MINES;
    scoreState = "Medium";
  }
  else if (gameState === "Hard") {
    rows = HARD_GRID.ROWS;
    cols = HARD_GRID.COLS;
    mines = HARD_GRID.MINES;
    scoreState = "Hard";
  }

  let cellSizeWidth = width/cols;
  let cellSizeHeight = height/rows;

  if (cellSizeWidth > cellSizeHeight) {
    cellSize = Math.floor(cellSizeHeight)*GRID_SIZE_FACTOR;
  }
  else {
    cellSize = Math.floor(cellSizeWidth)*GRID_SIZE_FACTOR;
  }

  grid = [];
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      grid[y].push({index: undefined, mine: false, flag: false, clicked: false, x: 0, y: 0});
    }
  }
}

// spawnMines function spawns mines on the grid in a random x and y
function spawnMines(x, y) {
  let placedMines = 0;

  // Creates a 3x3 "safe zone" around the first click
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows) {
        grid[y + j][x + i].index = 0;
      }
    }
  }

  // Spawns mines until placedMines matches set amount of mines for each difficulty
  while (placedMines < mines) {
    let x = Math.floor(random(cols));
    let y = Math.floor(random(rows));
    
    // Makes sure that mines are not spawned on a spot with a mine or in a 3x3 around the first click
    if (!grid[y][x].mine && grid[y][x].index === undefined) {
      grid[y][x].mine = true;
      placedMines ++;
    }
  }
  detectMines();
}

// detectMines function goes through grid and sets index value based on how many mines touching
function detectMines() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let count = 0;
      
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          
          if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows && !grid[y][x].mine) {
            if (grid[y + j][x + i].mine) {
              count ++;
            }
            grid[y][x].index = count;
          }
        }
      }
    }
  }
}

// displayGrid function displays the grid on screen
function displayGrid() {
  rectMode(CORNER);
  textAlign(CENTER, CENTER);

  const TEXT_SIZE_FACTOR = 30;

  // Displays how many mines and how many flags are placed
  fill(0);
  noStroke();
  textSize(height/TEXT_SIZE_FACTOR);
  text(`Mines: ${mines}\nFlags: ${flagCount}`, width/3, height/20);

  // Displays timer while game is running and stops it when game over on win
  if (firstClick) {
    timerDisplay = 0;
  }
  else if (gameState !== "Game Over" && gameState !== "Win") {
    finalTime = ((millis() - time)/1000).toFixed(2);
    timerDisplay = finalTime;
  }
  else {
    timerDisplay = finalTime;
  }
  text(`Timer: ${timerDisplay}`, width/1.5, height/20);

  gridWidth = cols*cellSize;
  gridHeight = rows*cellSize;

  let startX = (width - gridWidth)/2;
  let startY = (height - gridHeight)/2;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let gridX = startX + x*cellSize;
      let gridY = startY + y*cellSize;

      grid[y][x].x = gridX;
      grid[y][x].y = gridY;

      // If cell clicked display either nothing, index, or mineImg
      if (grid[y][x].clicked) {
        stroke(STROKE_WEIGHT);
        fill(255);
        square(gridX, gridY, cellSize);
        if (grid[y][x].mine) {
          image(mineImg, gridX, gridY, cellSize, cellSize);
        }
        else {
          fill(180);
          fill(0);
          if (grid[y][x].index !== 0) {
            noStroke();
            fill(INDEX_COLORS[grid[y][x].index - 1]);
            text(grid[y][x].index, gridX + cellSize/2, gridY + cellSize/2);
          }
        }
      }
      // Else display grey cell with shadow to have better immersion
      else {
        fill(COLORS.LIGHT_GREY);
        stroke(STROKE_WEIGHT);
        square(gridX, gridY, cellSize);
        

        fill(255);
        noStroke();
        rect(gridX, gridY, cellSize, cellSize/SHADOW_THICKNESS);
        rect(gridX, gridY, cellSize/SHADOW_THICKNESS, cellSize);

        fill(COLORS.DARK_GREY);
        rect(gridX + cellSize/CELL_SIZE_MODIFYER, gridY, cellSize/SHADOW_THICKNESS, cellSize);
        rect(gridX, gridY + cellSize/CELL_SIZE_MODIFYER, cellSize, cellSize/SHADOW_THICKNESS);

        if (grid[y][x].flag) {
          image(flagImg, gridX, gridY, cellSize, cellSize);
        }
      }
    }
  }
}

// gameOver screen displays the game over menu with a red tint and play again button
function gameOver() {
  gameState = "Game Over";

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[y][x].clicked = true;
    }
  }

  fill(255, 0, 0, 200);
  rectMode(CENTER);
  rect(width/2, height/2, width, height);

  fill(255);
  stroke(STROKE_WEIGHT);
  rect(width/2, height/3, width/1.5, height/8, BUTTON_RADIUS);
  
  fill(0);
  textSize(width/10);
  text("GAME OVER", width/2, height/3);
  
  let btn = buttons[buttons.length - 1];
  if (mouseIsInButton(btn)) {
    fill(COLORS.LIGHT_GREY);
    btn.w = width/3 + BUTTON_INCREASE_ON_HOVER;
    btn.h = height/8 + BUTTON_INCREASE_ON_HOVER;
  }
  else {
    fill(255);
    btn.w = width/3;
    btn.h = height/8;
  }
  
  stroke(STROKE_WEIGHT);
  rect(btn.x, btn.y, btn.w, btn.h, btn.r);
  
  fill(0);
  noStroke();
  textSize(width/20);
  text(btn.label, btn.x, btn.y);
}

// Check win function cycles through grid checking if all non mine cells are clicked
function checkWin() {
  let clickedCount = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[y][x].clicked) {
        clickedCount ++;
      }
    }
  }
  // Sets gameState to "Win" if win is present
  if (clickedCount === cols * rows - mines && gameState !== "menu") {
    gameState = "Win";
  }
}

// displayWin screen displays the win menu with a green tint and play again button with current time and best time
function displayWin() {
  if (gameState === "Win") {
    let highScore = getItem(`${scoreState}`);
    if (timerDisplay < highScore || highScore === null) {
      storeItem(`${scoreState}`, timerDisplay);
    }

    rectMode(CENTER);
    fill(0, 255, 0, 100);
    noStroke();
    rect(width/2, height/2, width, height);
    
    
    fill(255);
    stroke(STROKE_WEIGHT);
    rect(width/2, height/3, width/2, height/8, BUTTON_RADIUS);
    
    fill(0);
    textSize(width/10);
    text("WINNER!!", width/2, height/3);
    
    fill(255);
    stroke(STROKE_WEIGHT);
    rect(width/2, height/2, width/1.5, height/6, BUTTON_RADIUS);
    
    fill(0);
    noStroke();
    textSize(width/20);
    text(`Time:\n${finalTime}s`, width/3, height/2);
    if (scoreState === "Easy") {
      highScoreEasy = getItem("Easy");
      text(`High Score:\n${highScoreEasy}s`, width/1.5, height/2);
    }
    else if (scoreState === "Medium") {
      highScoreMedium = getItem("Medium");
      text(`High Score:\n${highScoreMedium}s`, width/1.5, height/2);
    }
    else if (scoreState === "Hard") {
      highScoreHard = getItem("Hard");
      text(`High Score:\n${highScoreHard}s`, width/1.5, height/2);
    }

    let btn = buttons[buttons.length - 1];
    if (mouseIsInButton(btn)) {
      fill(COLORS.LIGHT_GREY);
      btn.w = width/3 + BUTTON_INCREASE_ON_HOVER;
      btn.h = height/8 + BUTTON_INCREASE_ON_HOVER;
    }
    else {
      fill(255);
      btn.w = width/3;
      btn.h = height/8;
    }
    stroke(STROKE_WEIGHT);
    rect(btn.x, btn.y, btn.w, btn.h, btn.r);
    
    fill(0);
    noStroke();
    textSize(width/20);
    text(btn.label, btn.x, btn.y);
  }
}

// Used Gemini to give me Pseudocode on the logic for my floodFill function
function floodFill(x, y) {
  if (grid[y][x].clicked) {
    return;
  }
  if (grid[y][x].flag) {
    return;
  }
  if (grid[y][x].mine) {
    grid[y][x].clicked = true;
    gameOver();
    return;
  }

  grid[y][x].clicked = true;

  if (grid[y][x].index === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows && !grid[y + j][x + i].mine) {
          if (i !== 0 || j !== 0) {
            floodFill(x + i,y + j);
          }
        }
      }
    }
  }
}

// Built in mouseReleased function runs when a mouse button is clicked then released
function mouseReleased() {
  // Checks if difficulty select buttons are clicked and sets gameState to whatever was clicked
  if (gameState === "menu") {
    for (let i = 0; i < buttons.length - 1; i++) {
      let btn = buttons[i];
      if (mouseIsInButton(btn)) {
        gameState = btn.label;
        createGrid();
      }
    }
  }
  // Checks if play again button is clicked during gameOver or win screen is active
  else if (gameState === "Game Over" || gameState === "Win") {
    let btn = buttons[buttons.length - 1];
    if (mouseIsInButton(btn)) {
      gameState = "menu";
      firstClick = true;
      flagCount = 0;
    }
  }
  // Checks if LMB is clicked on a cell
  else if (mouseButton === LEFT) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (mouseIsInCell(x, y)) {
          // If it is the first click setup mines so its not possible to click a mine on the first click
          if (firstClick) {
            firstClick = false;
            time = millis();
            grid[y][x].index = 0;
            spawnMines(x, y);
          }
          // Runs the floodfill function to uncover all "0's" if clicked else just display the one cell
          floodFill(x, y);
        }
      }
    }
  }
  // Checks if RMB is clicked and not first click set a flag or remove flag
  else if (mouseButton === RIGHT && !firstClick) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (mouseIsInCell(x, y) && !grid[y][x].clicked) {
          grid[y][x].flag = !grid[y][x].flag;
          if (grid[y][x].flag) {
            flagCount ++;
          }
          else if (!grid[y][x].flag) {
            flagCount --;
          }
        }
      }
    }
  }
}