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

        // 1. Calculate scatter location again
        // technique inspired by p5.js random patterns:
        // https://p5js.org/reference/p5/random/
        let scatterRow = (block.row + block.col * 7.3) % 28;
        let scatterCol = (block.col + block.row * 5.7) % 28;

        // 2. Move scattered → home
        let targetRow = lerp(scatterRow, block.row, returnT);
        let targetCol = lerp(scatterCol, block.col, returnT);
        block.moveTo(targetRow, targetCol);

        // 3. Pulsing continues during return
        if (returnT < 1) {
            // same colour sequence as Phase 2
            // activeColorKey selects one of: "yellow", "blue1", "red", "grey"
            // reference for object[property]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
            if (block.color === colorManager.palette[activeColorKey]) {
                block.scale = sin((sequenceT % 1) * TWO_PI) * 0.3 + 1;
            } else {
                block.scale = 1;
            }
        }

        // 4. When fully home (returnT == 1) → stop pulsing
        if (returnT === 1) {
            block.scale = 1;
        }
    }

    grid.update();
    grid.display();
}

