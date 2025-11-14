class Block {

    // Creates a new block with position, size, and color 
    constructor(row, col, rowSpan, colSpan, color) {
        this.row = row; // Grid position where the block starts (row: 0-31)
        this.col = col; // Grid position where the block starts (column: 0-31)
        this.rowSpan = rowSpan;
        this.colSpan = colSpan;
        this.color = color;  // Just one color variable!

        this.isBar = false;

        this.scaleX = 1;
        this.scaleY = 1;
        this.offsetX = 0;
        this.offsetY = 0;

        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.animationPhase = random(TWO_PI);
    }

    display(cellSize) {

        push(); // Save current transformation state

        // Calculate pixel position from grid coordinates
        // Multiply grid position by cell size to get pixel position
        let x = this.col * cellSize; // Left edge
        let y = this.row * cellSize; // top edge
        let w = this.colSpan * cellSize;
        let h = this.rowSpan * cellSize;

        // Apply transformations to the blocks
        translate(x + w/2, y + h/2); // Move origin to center of block
        translate(this.offsetX, this.offsetY); // Move by animation offset
        scale(this.scaleX, this.scaleY); // Scale from center
    
        fill(this.color); // // Set fill color for this block
        noStroke();

        rectMode(CENTER);
        rect(0, 0, w, h);

        pop(); // Restore original transformation state
     }

    update() { //Smooth animation using lerp, to be called every frame for animated blocks

        this.offsetX = lerp(this.offsetX, this.targetOffsetX, 0.2);
        this.offsetY = lerp(this.offsetY, this.targetOffsetY, 0.2);

    }

    resetTransform() { // when music stops
    this.scaleX = 1;
    this.scaleY = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.targetOffsetX = 0;
    this.targetOffsetY = 0;
    }
}