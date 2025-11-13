class Block {
    constructor(row, col, rowSpan, colSpan, color) {
        this.row = row;
        this.col = col;
        this.rowSpan = rowSpan;
        this.colSpan = colSpan;
        this.color = color;
        
        //Animation properties
        this.currentX = col;  // Current animated position
        this.currentY = row;
        this.targetX = col;   // Target position to move towards
        this.targetY = row;
        this.speed = 0.05;    // Movement speed (5% per frame)

        this.scale = 1; // updated this to support the scale
    }

    // Method to set a new target position
    moveTo(newRow, newCol) {
        this.targetX = newCol;
        this.targetY = newRow;
    }

    // Update animation each frame
    update() {
        // interpolate towards target using lerp
        this.currentX = lerp(this.currentX, this.targetX, this.speed);
        this.currentY = lerp(this.currentY, this.targetY, this.speed);
    }

    // modified the display() to support the pulsing animation
    display(cellSize) {
    let w = this.colSpan * cellSize * this.scale;
    let h = this.rowSpan * cellSize * this.scale;

    let x = this.currentX * cellSize - (w - this.colSpan * cellSize) / 2;
    let y = this.currentY * cellSize - (h - this.rowSpan * cellSize) / 2;

    fill(this.color);
    noStroke();
    rect(x, y, w, h);
}
}