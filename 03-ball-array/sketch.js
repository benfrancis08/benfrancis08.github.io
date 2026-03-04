// Ball Object Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  spawnBall(mouseX, mouseY);

  for (let ball of ballArray) {
    // Move
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius > width + ball.radius) {
      ball.x = -ball.radius;
    }
    if (ball.x < -ball.radius) {
      ball.x = width + ball.radius;
    }
    if (ball.y - ball.radius > height + ball.radius) {
      ball.y = -ball.radius;
    }
    if (ball.y < -ball.radius) {
      ball.y = height + ball.radius;
    }

    // Display
    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y) {
  let theBall = {
    x: _x,
    y: _y,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
    r: random(255),
    g: random(255),
    b: random(255),
  };
  ballArray.push(theBall);
}