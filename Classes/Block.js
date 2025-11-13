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

    display(cellSize) {
        // Use currentX/currentY instead of col/row for smooth animation
        let x = this.currentX * cellSize;
        let y = this.currentY * cellSize;
        let w = this.colSpan * cellSize;
        let h = this.rowSpan * cellSize;
    
        fill(this.color);
        noStroke();
        rect(x, y, w, h);
    }
}