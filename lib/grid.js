class Grid {

  constructor() {
    this.activeBlocks = [];

    this.cells = [];
    for (let x = 0; x < GRID_SIZE_HORZ; x++) {
      const column = [];
      for (let y = 0; y < GRID_SIZE_VERT; y++) {
        column[y] = false;
      }
      this.cells[x] = column;
    }
  }

  addBlock(type, position, size, artParams, lifespan) {
    const { x, y } = this.positionToPixels.apply(null, position);
    const { width, height } = this.sizeToPixels.apply(null, size.concat(position));

    const block = new type(x, y, width, height, artParams, lifespan);
    this.activeBlocks.push(block);

    // TODO add to cells
  }

  drawBlocks() {
    this.activeBlocks.forEach(block => block.requestDraw());
  }

  positionToPixels(sourceX, sourceY) {
    let x = sourceX * CELL_SIZE;
    if (sourceX > 0) x += EDGE_CELL_HORZ_PADD;

    let y = sourceY * CELL_SIZE;
    if (sourceY > 0) y += EDGE_CELL_VERT_PADD;

    return { x, y };
  }

  sizeToPixels(cols, rows, x, y) {
    let width = cols * CELL_SIZE;
    if (x === 0) width += EDGE_CELL_HORZ_PADD;
    if (x === GRID_SIZE_HORZ - 1 || cols + x === GRID_SIZE_HORZ) width += EDGE_CELL_HORZ_PADD;

    let height = rows * CELL_SIZE;
    if (y === 0) height += EDGE_CELL_VERT_PADD;
    if (y === GRID_SIZE_HORZ - 1 || rows + y === GRID_SIZE_VERT) height += EDGE_CELL_VERT_PADD;

    return { width, height };
  }
}

