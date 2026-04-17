// Ball Collision OOP Demo

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(15, 40);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.dy *= -1;
    }
    else if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.dx *= -1;
    }
  }

  bounceOff(otherBall) {
    let radiusSum = this.radius + otherBall.radius;
    let distanceAppart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (radiusSum > distanceAppart) {
      // this.r = 255;
      // this.g = 0;
      // this.b = 0;
      let tempX = this.dx;
      let tempY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let theBall of ballArray) {
    theBall.move();
    for (let otherBall of ballArray) {
      if (theBall !== otherBall) {
        theBall.bounceOff(otherBall);
      }
    }
    theBall.display();
  }
}

function mousePressed() {
  let someBall = new Ball(mouseX, mouseY);
  ballArray.push(someBall);
}