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
        let size = min(windowWidth, windowHeight) - 40; // Calculate canvas size with 20px padding each size
        this.cellSize = size / this.cols; // Calculate cell size by dividing the canvas size by the number of columns
        this.canvasSize = size; // Store canvas size to use later when resizing
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

    // add block in horizontal bar base on column span inputted
    addHorizontalBar(row, startCol, colSpan, colorKey) {
        return this.addBlock(row, startCol, 1, colSpan, colorKey); // always makes it 1 row tall, so it's a bar
    }

    display() {
        for (let block of this.blocks) {
         block.display(this.cellSize);
        }
    }

    getCanvasSize() {
         return this.canvasSize;
    }

    handleResize() {
        this.updateCellSize();
    resizeCanvas(this.canvasSize, this.canvasSize);
     }
}
