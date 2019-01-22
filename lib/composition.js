class Composition {

  static registerType(type) {
    this.prototype.types.push(type);
  }

  constructor(scene) {
    this.scene = scene;
    this.blocks = [];

    Object.values(this.types).forEach(t => t.preload());
  }

  addBlock(type, position, rotation, artParams) {
    const block = new (type)(artParams);
    this.blocks.push(block);

    if (position) block.mesh.position.set.apply(block.mesh.position, position);
    if (rotation) block.mesh.rotation.set.apply(block.mesh.rotation, rotation);

    this.scene.add(block.mesh);
  }

  animate() {
    this.blocks.forEach(b => b.animate());
  }
}

Composition.prototype.types = [];