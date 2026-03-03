// Interactive Scene - Flappy Bird
// Ben Francis
// 3/3/2026
//
// Extra for Experts:
// - Imported images using preload function (Done before shown in class)
// - Rotated bird sprite based on direction of travel using transform to set the center of bird to (0, 0) and rotate to rotate the image. Paired with push/pop to be able to only change/rotate the bird and not the entire canvas/world
// - Used complicated(ish) math to detect collisions: floor = death, celing = dont let bird go any higher, and detected if the bird was in the safe zone of the hoops as they passed otherwise death

// Global variables used in project
let gameState = "Menu";
let buttonW = 200;
let buttonH = 80;
let buttonX;
let buttonY;
let dy;
let characterY;
let gravity;
let currentTime = 0;
let score = 0;
let highScore = 0;
let birdHitboxDia = 58;
let safeZoneHeight = birdHitboxDia*3;
let safeZoneY;
let floor = 630;
let dx = -2;
let safeZoneX;

// Built in preload function to load images before getting used in game
function preload() {
  imgBg = loadImage("images/FlappyBirdBackground.jpg");
  imgCharacter = loadImage("images/FlappyBirdCharacter.png");
}

// Built in setup function to setup canvas and set variables used for the menu screen
function setup() {
  createCanvas(480, 800);
  buttonW = width/2.4;
  buttonH = height / 10;
  buttonX = width / 2 - buttonW / 2;
  buttonY = height / 2 - buttonH / 2;
}

// Built in draw function cleaned up to only call the three "scenes" of the game
function draw() {
  // gameState variable used to tell game what "scene" to display
  if (gameState === "Menu") {
    displayMenu();
  }
  else if (gameState === "Play") {
    playGame();
  }
  else {
    endGame();
  }
}

// displayMenu function creates the main background, text, and clickable button to start the game. Also resets variables needed for hoop logic
function displayMenu() {
  strokeWeight(1);
  image(imgBg, 0, 0, width, height);
  fill("green");
  rect(buttonX, buttonY, buttonW, buttonH);
  fill(255);
  textSize(buttonW / 4);
  textAlign(CENTER, CENTER);
  text("PLAY", width / 2, height / 2);
  fill(0);
  text("FLAPPY BIRD", width/2, height/4);
  textSize(30);
  text("Press SPACE or LMB to jump", width/2, height/1.5);
  dy = 0;
  characterY = height/2 - imgCharacter.height/2;
  gravity = 0.5;
  safeZoneY = random(birdHitboxDia, floor - safeZoneHeight - birdHitboxDia);
  safeZoneX = width - birdHitboxDia;
}

// playGame function creates the main playable game, where most logic is held
function playGame() {
  // Creates bg img and adjusts dy according to gravity
  image(imgBg, 0, 0, width, height);
  dy += gravity;
  // Detects if the bird is within floor and celing constraints and ends game if bird hits floor or restricts bird from going higher than celing
  if (imgCharacter.height/2 + characterY - birdHitboxDia <= floor) {
    if (characterY > -birdHitboxDia/2-15) {
      characterY += dy;
    }
    else {
      characterY = -birdHitboxDia/2-14;
      dy = 0;
    }
  }
  else {
    gameState = "End Game";
  }
  // Calls createBirdSprite and moveHoop function to create the bird and create/move the hoops
  createBirdSprite();
  moveHoop();
  // Detects when a hoop goes offscreen and changes the y variable to create a hoop at a diffent height as well as update score variable
  if (safeZoneX <= 0) {
    safeZoneX = width - birdHitboxDia;
    safeZoneY = random(birdHitboxDia, floor - safeZoneHeight/2 - birdHitboxDia/2);
    score += 1;
  }
  // Detects if the bird is in the constrains of the hoops as they pass and end game if bird is not in hoop or touches upper/lower hoop wall
  let birdYupper = characterY + imgCharacter.height/2 - birdHitboxDia/2;
  let birdYlower = characterY + imgCharacter.height/2 + birdHitboxDia/2;
  if (safeZoneX < width/4 + birdHitboxDia/2 - 5 && safeZoneX > width/4 - birdHitboxDia*1.5 - birdHitboxDia/2 - 5) {
    if (!(birdYupper > safeZoneY && birdYlower < safeZoneY + safeZoneHeight)) {
      gameState = "End Game";
    }
  }
  // Creates score text at top of screen
  fill(0);
  text("SCORE:", width/2, birdHitboxDia);
  text(score, width/2, birdHitboxDia*1.5);
}

// endGame function desplays the endgame "scene"
function endGame() {
  // Sets highscore to the highest score of local session
  if (score > highScore) {
    highScore = score;
  }
  score = 0;
  strokeWeight(1);
  fill(0);
  image(imgBg, 0, 0, width, height);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("GAME OVER!", width/2, height/4);
  textSize(40);
  text("High Score:", width/2, height/2);
  text(highScore, width/2, height/1.8);
  text("r to Restart", width/2, height/1.5);
}

// jump function adjusts dy of bird
function jump() {
  dy = -8;
}

// moveHoop function moves the hoop's x value according to dx
function moveHoop() {
  safeZoneX += dx;
  createHoop(safeZoneX);
}

// Built in keyPressed function monitors keypresses on keyboard
function keyPressed() {
  // Sets "scene" to menu if r key is pressed
  if (key === "r") {
    gameState = "Menu";
  }
  // Bird jumps if SPACE bar is pressed
  if (keyCode === 32) {
    jump();
  }
}

// Built in mouseClicked function detects if mouse button is clicked
function mouseClicked() {
  // Detects if button on menu scene is pressed and sets gameState to Play
  if (mouseX > buttonX && mouseX < buttonX + buttonW && mouseY > buttonY && mouseY < buttonY + buttonH && gameState === "Menu"
  ) {
    gameState = "Play";
  }
  // Bird jumps if LMB is clicked
  if (gameState === "Play") {
    jump();
  }
}

// createBirdSprite function creates the bird and hitbox that collisions are detected off of
function createBirdSprite() {
  // Creates a scope so only the bird is affected by translate and rotate functions
  push();
  imageMode(CENTER);
  // Sets the center of the bird to (0, 0)
  translate(width/4, imgCharacter.height/2 + characterY);
  // Rotates the beak down if falling
  if (dy < 0) {
    rotate(11*PI/6);
  }
  // Rotates the beak up if rising
  else {
    rotate(PI/6);
  }
  image(imgCharacter, 0, 0);
  // Creates invisible hitbox so collisions can be calculated
  noStroke();
  noFill();
  circle(-5, 0, birdHitboxDia);
  // Closes temporary scope and resets (0, 0) to top left corner
  pop();
}

// createHoop function creates the hoop and takes in a x value so hoop can move accoss the screen
function createHoop(x) {
  strokeWeight(5);
  noFill();
  rect(x, safeZoneY, birdHitboxDia*1.5, safeZoneHeight);
}