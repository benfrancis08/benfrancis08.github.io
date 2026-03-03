// Ball Object Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let ball of ballArray) {
    // Move
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Display
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let theBall = {
    x: random(width),
    y: random(height),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
  };
  ballArray.push(theBall);
}