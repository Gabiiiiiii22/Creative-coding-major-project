class Block {
  constructor(row, col, rowSpan, colSpan, color) {
    this.row = row;
    this.col = col;
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
    this.color = color;  // Just one color variable!
  }

   display(cellSize) {
    let x = this.col * cellSize;
    let y = this.row * cellSize;
    let w = this.colSpan * cellSize;
    let h = this.rowSpan * cellSize;
    
    fill(this.color);
    noStroke();
    rect(x, y, w, h);
  }
  
}