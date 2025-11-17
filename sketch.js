let grid; // LayoutGrid object - manages all blocks and bars
let colorManager; // ColorManager object - stores color palette
let bars = []; // Array to store bar references
let volumeSlider; // p5.Element object - reference to volume slider 

console.log('p5.js version:', p5.VERSION); // check p5.js version

function preload() {
    // Load CSV file containing block positions and colors https://p5js.org/reference/p5/loadTable/
    blockData = loadTable('data/blocks.csv', 'csv', 'header');

    // Initialize audio system that got defined in interaction.js
    setupAudio();
}

function setup() {
    colorManager = new ColorManager();

    let artWorkSize = calculateCanvasSize();

    // Create canvas and attach canvas to specific container
    let canvas = createCanvas(artWorkSize, artWorkSize);
    canvas.parent('canvas-container'); // Attach to the main element https://p5js.org/reference/p5.Element/parent/

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
    
    volumeSlider = select('#volumeSlider');
    volumeSlider.input(updateVolume);

    // Get the tonearm container and attach click event to it
    let tonearmContainer = select('#tonearm-container');
    tonearmContainer.mousePressed(toggleMusic);

    // Set initial volume
    updateVolume();

}

function calculateCanvasSize() {
    
    // Turntable elements heights
    let turntableVisibleHeight = 150;
    let padding = 40;
    
    
    // Available space for canvas
    let availableHeight = windowHeight - turntableVisibleHeight - padding;
    let availableWidth = windowWidth - 40;
    
    // Use smaller dimension to keep it square
    let size = min(availableWidth, availableHeight);
    
    // Add constraints
    size = max(200, size);   // Minimum 200px https://p5js.org/reference/p5/min/
    size = min(900, size);   // Maximum 900px https://p5js.org/reference/p5/max/

    console.log('Canvas size:', size, '| Window:', windowWidth, 'x', windowHeight);

    return size;
}

function updateVolume() {
    let vol = volumeSlider.value() / 100; // Convert 0-100 to 0-1

    // Set audio volume using p5.SoundFile method https://p5js.org/reference/p5.SoundFile/setVolume/
    song.setVolume(vol);
    
    // Update displayed volume percentage and use html() sets its content https://p5js.org/reference/p5.Element/html/
    select('#volumeValue').html(volumeSlider.value() + '%');
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

    // Recalculates the canvas size
    let artWorkSize = calculateCanvasSize();
    resizeCanvas(artWorkSize, artWorkSize);

    // Recalculates cell size based on new canvas dimensions
    grid.handleResize();

}
