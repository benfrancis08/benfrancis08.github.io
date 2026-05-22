// Sierpinkski Triangle Recursion Demo

let initialTriangle = [
  {x: 470, y: 100}, 
  {x: 70, y: 700},
  {x: 870, y: 700}
];
let colors = ['red', 'blue', 'cyan', 'yellow', 'pink', 'black', 'lightgreen', 'purple', 'grey'];
let theDepth = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  sierpinkski(initialTriangle, theDepth);
}

function draw() {
}

function mousePressed() {
  if (theDepth < 8) {
    theDepth ++;
  }
  background(255);
  sierpinkski(initialTriangle, theDepth);
}

function sierpinkski(points, depth) {
  fill(colors[depth]);
  triangle(points[0].x, points[0].y, 
           points[1].x, points[1].y, 
           points[2].x, points[2].y,
  );

  if (depth > 0) {
    // Top
    sierpinkski([points[0],
                 midpoint(points[0], points[1]),
                 midpoint(points[0], points[2])],
                 depth - 1
    );

    // Right
    sierpinkski([points[2],
                 midpoint(points[1], points[2]),
                 midpoint(points[0], points[2])],
                 depth - 1
    );

    // Left
    sierpinkski([points[1],
                 midpoint(points[1], points[2]),
                 midpoint(points[0], points[1])],
                 depth - 1
    );
  }

}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY};
}