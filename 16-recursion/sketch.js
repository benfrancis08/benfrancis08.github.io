// Recursion Circles Demo



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircle(width/2, width/2);
}

function drawCircle(x, radius) {
  let fillColor = map(radius, width/2, 5, 255, 50);
  fill(fillColor);
  circle(x, height/2, radius*2);
  
  let MaxRadius = map(mouseX, 0, width, width/2, 10);
  if (radius > MaxRadius) {
    drawCircle(x - radius/2, radius/2);
    drawCircle(x + radius/2, radius/2);
  }
}