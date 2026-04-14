// Walker OOP Demo

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.speed = 5;
    this.color = "red";
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.x += this.speed;
    }
    else if (choice < 50) {
      this.x -= this.speed;
    }
    else if (choice < 75) {
      this.y += this.speed;
    }
    else if (choice < 100) {
      this.y -= this.speed;
    }
  }
}

let walk;
let walk2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walk = new Walker(width/2, height/2);
  walk2 = new Walker(300, 500);
  walk2.color = "blue";
}

function draw() {
  walk.move();
  walk2.move();

  walk2.display();
  walk.display();
}
