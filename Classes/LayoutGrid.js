 class LayoutGrid { // blueprint for creating a grid that manages all the blocks.
    constructor(rows, cols, colors) {
        this.rows = rows;
        this.cols = cols;
        this.colors = colors;
        this.blocks = []; // empty array to store all the Blocks created
        this.updateCellSize(); // calculates the cell size based on current window size.
    }

    // Method to calculate how big each grid cell will be based on the window size
    updateCellSize() {
        let artWorkSize = min(windowWidth, windowHeight) - 40; // Calculate canvas size with 20px padding each size
        this.cellSize = artWorkSize / this.cols; // Calculate cell size by dividing the art work size by the number of columns
        this.canvasSize = artWorkSize; // Store canvas size to use later when resizing
    }

    // add block to the layout grid
    addBlock(row, col, rowSpan, colSpan, colorKey) {
        const block = new Block(
        row, 
        col, 
        rowSpan, // how many rows tall 
        colSpan, // how many columns wide
        this.colors[colorKey]
        );
        this.blocks.push(block); // Adds the new block to the array of all blocks
        return block;
    }
    
    //Helper function to add block in horizontal bar base on column/row span inputted to be used in phase 2
    addHorizontalBar(row, startCol, colSpan, colorKey) {
        let bar = this.addBlock(row, startCol, 1, colSpan, 'yellow'); // always makes it 1 row tall and yellow, so it's a bar
        bar.isBar = true;
        return bar;
    }

    
    addVerticalBar(col, startRow, rowSpan, colorKey) {
        let bar = this.addBlock(startRow, col, rowSpan, 1, 'yellow'); // always makes it 1 column wide and yellow
        bar.isBar = true;
        return bar;
    }
    

    display() {
        for (let block of this.blocks) {
         block.display(this.cellSize);
        }
    }

    getCanvasSize() {
         return this.canvasSize; //// Output whatever the current size is)
    }

    handleResize() { // to call in sketch.js and update cell size base on the new canvas size
        
        // Calls the updateCellSize() method
        // Gets new window dimensions
        // Calculates new canvas size
        // Calculates new cell size:
        this.updateCellSize(); 
        
        resizeCanvas(this.canvasSize, this.canvasSize); // updates p5.js canvas
     }
}
