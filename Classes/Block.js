class Block {

    // Creates a new block with position, size, and color 
    constructor(row, col, rowSpan, colSpan, color) {
        this.row = row; // Grid position where the block starts (row: 0-31)
        this.col = col; // Grid position where the block starts (column: 0-31)
        this.rowSpan = rowSpan;
        this.colSpan = colSpan;
        this.color = color;  // Just one color variable!
    }

    display(cellSize) {

        // Calculate pixel position from grid coordinates
        // Multiply grid position by cell size to get pixel position
        let x = this.col * cellSize; // Left edge
        let y = this.row * cellSize; // top edge
        let w = this.colSpan * cellSize;
        let h = this.rowSpan * cellSize;
    
        fill(this.color); // // Set fill color for this block
        noStroke();
        rect(x, y, w, h);
     }

}