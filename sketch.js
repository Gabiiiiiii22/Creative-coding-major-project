let grid;
let colorManager;
let blockData;
let animationMode = 'idle'; 
let trainProgress = 0;     
console.log('p5.js version:', p5.VERSION); 

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
    let activeCol = -1;
    if (animationMode === 'train') {
        
        trainProgress += 0.05;
        activeCol = floor(trainProgress) % grid.cols;
    }

   
    grid.display(animationMode, activeCol);
}

function keyPressed() {
 
    if (key === 't' || key === 'T') {
        if (animationMode === 'train') {
            animationMode = 'idle';
        } else {
            animationMode = 'train';
            trainProgress = 0; 
        }
    }
}

function windowResized() {
    grid.handleResize();
}
