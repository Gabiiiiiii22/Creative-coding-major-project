let grid;
let colorManager;

console.log('p5.js version:', p5.VERSION); // check p5.js version

function preload() {
    //put the csv files here :))))
    grayData = loadTable('data/grayBlocks.csv', 'csv', 'header');
    //yellowData = loadTable('data/yellowBlocks.csv', 'csv', 'header');
    //blueData = loadTable('data/blueBlocks.csv', 'csv', 'header');
    //redData = loadTable('data/redBlocks.csv', 'csv', 'header');
}

function setup() {
    colorManager = new ColorManager();

    let artWorkSize = min(windowWidth, windowHeight) - 40;
    createCanvas(artWorkSize, artWorkSize);

    // create new grid set to 32 rows and columns to match the modified reference artwork
    grid = new LayoutGrid(32, 32, colorManager.getAllColors());

    // load the blocks
    loadBlocksFromCSV(grayData, grid);
    //loadBlocksFromCSV(yellowData, grid);
    //loadBlocksFromCSV(blueData, grid);
    //loadBlocksFromCSV(redData, grid);

    // Log how many blocks were loaded
    console.log(`Loaded ${grid.blocks.length} blocks total`);
}

// Helper function: Load blocks from a CSV table into the grid
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

function draw() { //add bars (horizontal/ vertical) here
    
    // Set background color
    background(colorManager.palette.background);

    // display the blocks on the grid
    grid.display();
}

function windowResized() {
  grid.handleResize();
}