let grid;
let colorManager;
let bars = []; // Array to store bar references
let playPauseBtn; // link to the id in html

console.log('p5.js version:', p5.VERSION); // check p5.js version

function preload() {
    //put the csv files here :))))
    blockData = loadTable('data/blocks.csv', 'csv', 'header');

    setupAudio();
}

function setup() {
    colorManager = new ColorManager();

    let artWorkSize = min(windowWidth, windowHeight) - 40;

    // Create canvas and attach canvas to specific container
    let canvas = createCanvas(artWorkSize, artWorkSize);
    canvas.parent('canvas-container'); // Attach to the main element

    // create new grid set to 32 rows and columns to match the modified reference artwork
    grid = new LayoutGrid(32, 32, colorManager.getAllColors());

    //add the bars separate from the blocks to keep them static
    //add horizontal bars
    bars.push(grid.addHorizontalBar(1,0,4));
    bars.push(grid.addHorizontalBar(5,0,32));
    bars.push(grid.addHorizontalBar(5,0,32));
    bars.push(grid.addHorizontalBar(9,0,25));
    bars.push(grid.addHorizontalBar(14,0,22));
    bars.push(grid.addHorizontalBar(14,24,32));
    bars.push(grid.addHorizontalBar(17,0,32));
    bars.push(grid.addHorizontalBar(22,0,18));
    bars.push(grid.addHorizontalBar(22,24,32));
    bars.push(grid.addHorizontalBar(26,0,32));
    bars.push(grid.addHorizontalBar(26,0,32));
    bars.push(grid.addHorizontalBar(29,0,13));

    //add vertical bars
    bars.push(grid.addVerticalBar(3,0,32));
    bars.push(grid.addVerticalBar(7,0,32));
    bars.push(grid.addVerticalBar(12,0,32));
    bars.push(grid.addVerticalBar(14,17,32));
    bars.push(grid.addVerticalBar(18,17,32));
    bars.push(grid.addVerticalBar(21,0,18));
    bars.push(grid.addVerticalBar(24,5,18));
    bars.push(grid.addVerticalBar(25,17,32));
    bars.push(grid.addVerticalBar(27,5,13));

    // load the blocks
    loadBlocksFromCSV(blockData, grid);

    // Setup play/pause button
    playPauseBtn = select('#playPauseBtn');
    playPauseBtn.mousePressed(toggleMusic);

}

// function to load blocks from a CSV table into the grid
function loadBlocksFromCSV(table, grid) {
  
    // Loop through each row in the CSV
    for (let i = 0; i < table.getRowCount(); i++) {

        // Read values from CSV columns
        let row = table.getNum(i, 'Row');
        let col = table.getNum(i, 'Col');
        let rowSpan = table.getNum(i, 'RowSpan');
        let colSpan = table.getNum(i, 'ColSpan');
        let color = table.getString(i, 'Color');
    
    // Add block to grid
    grid.addBlock(row, col, rowSpan, colSpan, color);
  }
}

function draw() {

    // Set background color
    background(colorManager.palette.background);

    applyAudioToSmallBlocks(grid);

    // display the blocks on the grid
    grid.display();

}

function windowResized() {
  grid.handleResize();
}
