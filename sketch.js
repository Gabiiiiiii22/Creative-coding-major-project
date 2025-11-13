let grid;
let colorManager;
let blockData;

function preload() {
    blockData = loadTable('data/blocks.csv', 'csv', 'header');
}

function setup() {
    colorManager = new ColorManager();
    let artWorkSize = min(windowWidth, windowHeight) - 40;
    createCanvas(artWorkSize, artWorkSize);

    grid = new LayoutGrid(32, 32, colorManager.getAllColors());
    loadBlocksFromCSV(blockData, grid);
    
    console.log(`Loaded ${grid.blocks.length} blocks total`);
}

function loadBlocksFromCSV(table, grid) {
    for (let i = 0; i < table.getRowCount(); i++) {
        let row = table.getNum(i, 'Row');
        let col = table.getNum(i, 'Col');
        let rowSpan = table.getNum(i, 'RowSpan');
        let colSpan = table.getNum(i, 'ColSpan');
        let color = table.getString(i, 'Color');
        grid.addBlock(row, col, rowSpan, colSpan, color);
    }
}

function draw() {
    background(colorManager.palette.background);
    
    // Update all block animations each frame
    grid.update();
    
    grid.display();
    
}

function windowResized() {
    grid.handleResize();
}