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

    let t = millis() / 1000;
    // millis reference was taken from the p5.js org site

    let scatterDuration = 3;
    let pulseDuration = 5;

    // Time inside the pulse phase
    let pulseT = t - scatterDuration;
    let pulseIndex = floor(pulseT); // 0 to 4
    // floor() – selecting active colour group reference :

    let pulseColors = ["yellow", "blue1", "red", "grey"];
    let activeColorKey = pulseColors[pulseIndex] || null;

    for (let block of grid.blocks) {

        // Keep block in scattered position
        let scatterRow = (block.row + block.col * 7.3) % 28;
        let scatterCol = (block.col + block.row * 5.7) % 28;

        block.moveTo(scatterRow, scatterCol);

        // Pulsing effect (scale)
        if (activeColorKey && block.color === colorManager.palette[activeColorKey]) {
            // pulse between 1.0 and 1.3
            let pulse = sin((pulseT % 1) * TWO_PI) * 0.3 + 1; 
            // p5 sine wave for smooth animation: https://p5js.org/reference/#/p5/sin
            // full sine cycle reference two_pi: https://p5js.org/reference/p5/TWO_PI/
            block.scale = pulse;
        } else {
            block.scale = 1;
        }
    }

    grid.update();
    grid.display();
}

// tutorial for reference:
// Simple sine wave animation in p5.js: https://youtu.be/ktPnruyC6cc?si=BJWWQ9A7_i5VUGv-