// Fireworks OOP Demo

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    // Move
    this.x += this.dx;
    this.y += this.dy;

    // Fade away over time
    this.opacity --;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];
const NUMBER_OF_PARTACLES_PER_CLICK = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let aFirework of theFireworks) {
    if (aFirework.isDead()) {
      let index = theFireworks.indexOf(aFirework);
      theFireworks.splice(index, 1);
    }
    else {
      aFirework.update();
      aFirework.display();
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < NUMBER_OF_PARTACLES_PER_CLICK; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}