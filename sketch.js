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

    let t = millis() / 1000;  // time in seconds
    let scatterDuration = 3;

    // Scatter progress from 0 → 1
    let progress = constrain(t / scatterDuration, 0, 1);

    let centerRow = 16;
    let centerCol = 16;

    for (let block of grid.blocks) {

        // Generate deterministic scatter target
        let scatterRow = (block.row + block.col * 7.3) % 28;
        let scatterCol = (block.col + block.row * 5.7) % 28;

        // Move towards scattered location gradually
        let targetRow = lerp(block.row, scatterRow, progress);
        let targetCol = lerp(block.col, scatterCol, progress);

        block.moveTo(targetRow, targetCol);
    }

    grid.update();
    grid.display();
}