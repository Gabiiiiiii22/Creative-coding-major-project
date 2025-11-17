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
        // Divide canvas width by number of columns
        this.cellSize = width / this.cols;
        this.canvasSize = width;
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
         return this.canvasSize; //// Output whatever the current size is
    }

    handleResize() { // to call in sketch.js and update cell size base on the new canvas size
        
        this.updateCellSize(); 
        
     }
}
