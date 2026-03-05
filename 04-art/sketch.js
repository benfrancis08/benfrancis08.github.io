// Generative Art Demo

let theTiles = [];
const THE_SIZE = 5;
let someTile;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let y = THE_SIZE/2; y <= height; y += THE_SIZE) {
    for (let x = THE_SIZE/2; x <= width; x += THE_SIZE) {
      someTile = spawnTile(x, y, THE_SIZE);
      theTiles.push(someTile);
    }
  }
}

function draw() {
  background(220);

  for (let tile of theTiles) {
    line(tile.x1, tile.y1, tile.x2, tile.y2);
  } 
}

function spawnTile(x, y, tileSize) {
  let choice = random(100);
  let tile;
  if (choice < 50) {
    // Positive Slope
    tile = {
      x1: x - tileSize/2,
      y1: y + tileSize/2,
      x2: x + tileSize/2,
      y2: y - tileSize/2,
    };
  }
  else {
    // Negative Slope
    tile = {
      x1: x - tileSize/2,
      y1: y - tileSize/2,
      x2: x + tileSize/2,
      y2: y + tileSize/2,
    };
  }
  return tile;
}