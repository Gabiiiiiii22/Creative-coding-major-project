class LayoutGrid {
    constructor(rows, cols, colors) {
        this.rows = rows;
        this.cols = cols;
        this.colors = colors;
        this.blocks = [];
        this.updateCellSize();
    }

    updateCellSize() {
        let artWorkSize = min(windowWidth, windowHeight) - 40;
        this.cellSize = artWorkSize / this.cols; 
        this.canvasSize = artWorkSize;
    }

   
    addBlock(row, col, rowSpan, colSpan, colorKey) {
        const block = new Block(
            row,
            col,
            rowSpan, 
            colSpan,
            this.colors[colorKey]
        );
        this.blocks.push(block); 
        return block;
    }

    display(mode = 'idle', activeCol = -1) {
        for (let block of this.blocks) {
            block.display(this.cellSize, mode, activeCol);
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
