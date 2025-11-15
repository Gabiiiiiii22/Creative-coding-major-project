class Block {

    constructor(row, col, rowSpan, colSpan, color) {
      
        this.row = row;
        this.col = col;
        this.rowSpan = rowSpan;
        this.colSpan = colSpan;
        this.color = color;  // Base color for this block
    }

  // p5js idle theory
    display(cellSize, mode = 'idle', activeCol = -1) {
      
        let x = this.col * cellSize; 
        let y = this.row * cellSize; 
        let w = this.colSpan * cellSize;
        let h = this.rowSpan * cellSize;
        let baseColor = color(this.color);
        let finalColor = baseColor;
        let centerX = x + w / 2;
        let centerY = y + h / 2;
        let d = dist(mouseX, mouseY, centerX, centerY);
        let influenceRadius = cellSize * 6;

        if (d < influenceRadius) {
            // t goes from 0 (far) to 1 (directly on top)
            let t = 1 - d / influenceRadius;
            // Blend towards white for a glowing effect
            finalColor = lerpColor(baseColor, color(255, 255, 255), t * 0.8);
        }

        if (mode === 'train' && activeCol >= 0) {
            // Check if this block covers the active column
            let coversActiveCol =
                this.col <= activeCol && (this.col + this.colSpan) > activeCol;

            if (coversActiveCol) {
                // Blend towards a warm red to simulate train lights
                finalColor = lerpColor(finalColor, color(255, 80, 80), 0.7);
            }
        }

        noStroke();
        fill(finalColor);
        rect(x, y, w, h);
    }

}
