class Block {

    // Creates a new block with position, size, and color 
    constructor(row, col, rowSpan, colSpan, color) {
        this.row = row; // Grid position where the block starts (row: 0-31)
        this.col = col; // Grid position where the block starts (column: 0-31)
        this.rowSpan = rowSpan;
        this.colSpan = colSpan;
        this.color = color;  // Just one color variable!
    }

    display(cellSize, t = 0) {   // Receive time offset "t" for animation

        // Convert grid position into pixel coordinates

        const x = this.col * cellSize; 
        const y = this.row * cellSize; 
        const w = this.colSpan * cellSize;
        const h = this.rowSpan * cellSize;


           // Use the base color of this block
    const base = color(this.color);
    noStroke();
    rectMode(CORNER);

    // Draw small pixel tiles inside each block
    // This creates a "grain" or "asphalt" texture
    for (let yy = y; yy < y + h; yy += PIX) {
      for (let xx = x; xx < x + w; xx += PIX) {
        // Use Perlin noise to generate smooth randomness for texture
        // Multiply x,y by GRAIN_REZ to control the density
        // Add t * GRAIN_TIME to make it move slightly over time
        const n = noise(
          xx * GRAIN_REZ,
          yy * GRAIN_REZ,
          t * GRAIN_TIME + GRAIN_SEED
        );

        // Quantize the noise (turn smooth noise into steps)
        // Gives the texture more visible small "chunks"
        const q = Math.floor(n * GRAIN_BINS);

        // Map the quantized value to a brightness offset
        // Makes some pixels lighter/darker to create contrast
        const delta = map(q, 0, GRAIN_BINS - 1, -GRAIN_CONTRAST, GRAIN_CONTRAST);

        // Slightly vary RGB channels to look more natural
        const r = constrain(red(base)   + delta * 1.00, 0, 255);
        const g = constrain(green(base) + delta * 0.95, 0, 255);
        const b = constrain(blue(base)  + delta * 0.90, 0, 255);

        // Draw a small rectangle (pixel block)
        fill(r, g, b);
        rect(xx, yy, PIX, PIX);
      }
    }
  }
}