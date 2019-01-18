class Block {
  constructor(x, y, width, height, artParams, lifespan) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lifespan = lifespan === undefined ? -1 : lifespan;

    const defaults = this.constructor.prototype.artDefaults;
    this.artParams = Object.assign({}, defaults, artParams);

    const renderer = this.constructor.prototype.isWebGL ? WEBGL : P2D;

    this.canvas = createGraphics(width, height, renderer);
    this.canvas.noLoop();
    this.init();

    if (!this.constructor.prototype.isDynamic) {
      if (this.artParams.background) this.canvas.background(this.artParams.background);
      this.draw();
    }
  }

  requestDraw() {
    if (this.constructor.prototype.isDynamic) {
      this.canvas.clear();
      if (this.artParams.background) this.canvas.background(this.artParams.background);
      this.draw();
    }

    if (this.artParams.blend) blendMode(this.artParams.blend);
    copy(this.canvas, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    if (this.artParams.blend) blendMode(BLEND);
  }

  destruct() {
    this.canvas.remove();
  }

  // Implemented by blocks -----------------------------------------------------

  init() {
  }

  draw() {
    throw new Error("Block's draw() not defined");
  }

  // Used by blocks ------------------------------------------------------------

  iterateGrid(size, cb, brickRows) {
    const columns = floor(this.width / size);
    const rows = floor(this.height / size);

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        let x = col * size;
        if (brickRows && row % 2 === 0) x += size / 2;
        const y = row * size;
        cb(x, y);
      }
    }
  }

  iterateColumns(size, cb) {
    const columns = floor(this.width / size);

    for (let col = 0; col < columns; col++) {
      const x = col * size;
      cb(x);
    }
  }

  /**
   * Do not use for dynamic blocks.
   */
  iteratePixels(cb) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        cb(x, y);
      }
    }
  }

  staticNoise() {
    this.canvas.blendMode(OVERLAY);
    this.canvas.copy(staticNoise, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
    this.canvas.blendMode(BLEND);
  }
}

Block.prototype.artDefaults = {
  background: false,
  blend: false
};

Block.prototype.isWebGL = false;

Block.prototype.isDynamic = false;

Block.prototype.isOpaque = true;