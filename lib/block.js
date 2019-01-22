class Block {

  constructor(artParams) {
    const defaults = this.constructor.prototype.artDefaults;
    this.artParams = Object.assign({}, defaults, artParams);

    this.mesh = this.init();
  }

  static preload() {
  }

  init() {
    throw new Error("Block's `init` method is not implemented");
  }

  animate() {
  }

  createGridGroup(columns, rows, cb) {
    const group = new THREE.Group();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const mesh = cb(column, row);
        group.add(mesh);
      }
    }

    return group;
  }

  iterateGridGroup(columns, rows, cb) {
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        const object = this.mesh.children[index];
        cb(object, column, row);
      }
    }
  }
}

Block.prototype.artDefaults = {};