// Interactive Scene - Flappy Bird
// Ben Francis
// 3/3/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
let birdHitboxDia = 58;

function preload() {
  imgBg = loadImage("images/FlappyBirdBackground.jpg");
  imgCharacter = loadImage("images/FlappyBirdCharacter.png");
}

function setup() {
  createCanvas(480, 800);
  buttonW = width/2.4;
  buttonH = height / 10;
  buttonX = width / 2 - buttonW / 2;
  buttonY = height / 2 - buttonH / 2;
}

function draw() {
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

function displayMenu() {
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
}


function playGame() {
  if (gameState === "Play") {
    dy += gravity;
    if (imgCharacter.height/2 + characterY - birdHitboxDia <= 630) {
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
    image(imgBg, 0, 0, width, height);
    createBirdSprite();
  }
}

function endGame() {
  image(imgBg, 0, 0, width, height);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("GAME OVER!", width/2, height/4);
  textSize(40);
  text("High Score:", width/2, height/2);
  text(score, width/2, height/1.8);
  text("r to Restart", width/2, height/1.5);
}

function jump() {
  dy = -8;
}

function keyPressed() {
  if (key === "r") {
    gameState = "Menu";
  }
  if (keyCode === 32) {
    jump();
  }
}

function mouseClicked() {
  if (mouseX > buttonX && mouseX < buttonX + buttonW && mouseY > buttonY && mouseY < buttonY + buttonH && gameState === "Menu"
  ) {
    gameState = "Play";
  }
  if (gameState === "Play") {
    jump();
  }
}

function createBirdSprite() {
  push();
  imageMode(CENTER);
  translate(width/2, imgCharacter.height/2 + characterY);
  if (dy < 0) {
    rotate(11*PI/6);
  }
  else {
    rotate(PI/6);
  }
  image(imgCharacter, 0, 0);
  noStroke();
  noFill();
  circle(-5, 0, birdHitboxDia);
  pop();
}