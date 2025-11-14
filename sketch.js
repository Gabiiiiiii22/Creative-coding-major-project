let startDelay = 1000; // 1 second delay before animation starts
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

    let t = millis() - startDelay;  // start timing AFTER delay

// If delay not finished → just show the artwork and exit draw()
// using conditionals statements here
if (t < 0) {
    grid.display();  // show original art
    return;          // stop animation until delay finishes
}
    
t = t / 1000;  // convert to seconds AFTER delay is done

    let scatterDuration = 3;
    let pulseDuration = 5;
    let returnDuration = 3;

    // constrain() : https://p5js.org/reference/p5/constrain/

    let returnT = (t - scatterDuration - pulseDuration) / returnDuration;
    returnT = constrain(returnT, 0, 1);

    // Continue the same colour sequence from Phase 2
    // floor():https://p5js.org/reference/p5/floor/
    let pulseColors = ["yellow", "blue1", "red", "grey"];
    let sequenceT = (t - scatterDuration);      // total time since pulsing began
    let pulseIndex = floor(sequenceT % 4);      // which colour is active
    let activeColorKey = pulseColors[pulseIndex];

    for (let block of grid.blocks) {

        // Calculate scatter location again
        // technique inspired by p5.js random patterns:
        // https://p5js.org/reference/p5/random/
        let scatterRow = (block.row + block.col * 7.3) % 28;
        let scatterCol = (block.col + block.row * 5.7) % 28;

        // Move scattered → home
        let targetRow = lerp(scatterRow, block.row, returnT);
        let targetCol = lerp(scatterCol, block.col, returnT);
        block.moveTo(targetRow, targetCol);

        // Pulsing continues during return
        if (returnT < 1) {
            // same colour sequence as Phase 2
            // activeColorKey selects one of: "yellow", "blue1", "red", "grey"
            // reference for object[property]: 
            if (block.color === colorManager.palette[activeColorKey]) {
                block.scale = sin((sequenceT % 1) * TWO_PI) * 0.3 + 1;
            } else {
                block.scale = 1;
            }
        }

        // When fully home (returnT == 1) → stop pulsing
        if (returnT === 1) {
            block.scale = 1;

            // Fade out randomly after return is complete 
            // disappear randomly after return but after 2 sec
            if (returnT === 1) {
                if (t > scatterDuration + pulseDuration + returnDuration + 2) {
    if (random() < 0.03) {
        block.opacity = 0;
    }
}
            }
        }
    }

    grid.update();
    grid.display();
}

// tutorials used for reference:
// Simple sine wave animation in p5.js: https://www.youtube.com/watch?v=ktPnruyC6cc
// Scatter effect: generated using pseudo-random target positions inspired by random pattern: https://p5js.org/reference/p5/random/