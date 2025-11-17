// For animation and grain control
let zoff = 0;
const Z_SPEED = 0.05;  // Controls how fast time moves forward

// Grain texture parameters
// These values control how rough or smooth each block looks
const PIX = 2;             // Pixel size for texture tiles
const GRAIN_REZ = 0.08;    // Noise frequency
const GRAIN_BINS = 6;      // Number of noise levels
const GRAIN_CONTRAST = 24; // Brightness difference between pixels
const GRAIN_TIME = 0.0;    // If >0, texture will slowly move
let   GRAIN_SEED = 0;      // Random seed to make each run unique

let grid;
let colorManager;
let blockData;

console.log('p5.js version:', p5.VERSION);

function preload() {
  // Load the CSV file that defines block positions and colors
  blockData = loadTable('data/blocks.csv', 'csv', 'header');
}

function setup() {
  colorManager = new ColorManager();

  // Use the smaller side of the window to keep artwork square
  const artWorkSize = min(windowWidth, windowHeight) - 40;
  createCanvas(artWorkSize, artWorkSize);

  // Create a 32x32 grid
  grid = new LayoutGrid(32, 32, colorManager.getAllColors());

  // Load all blocks from the CSV file into the grid
  loadBlocksFromCSV(blockData, grid);
  console.log(`Loaded ${grid.blocks.length} blocks total`);

  // Random seed so the texture pattern changes each reload
  GRAIN_SEED = random(1000);

  rectMode(CORNER);
}

function loadBlocksFromCSV(table, grid) {
  // Read each row from the CSV and add a Block object
  for (let i = 0; i < table.getRowCount(); i++) {
    const row     = table.getNum(i, 'Row');
    const col     = table.getNum(i, 'Col');
    const rowSpan = table.getNum(i, 'RowSpan');
    const colSpan = table.getNum(i, 'ColSpan');
    const color   = table.getString(i, 'Color');
    grid.addBlock(row, col, rowSpan, colSpan, color);
  }
}

function draw() {
  // Keep the same background color as original artwork
  background(colorManager.palette.background);

  // Draw the entire grid (each block now has texture)
  grid.display(zoff);

  // Move time forward for subtle animation
  zoff += Z_SPEED;
}

function windowResized() {
  // Recalculate cell size and canvas if window changes
  grid.handleResize();
}
