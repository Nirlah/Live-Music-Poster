class HalftoneClouds extends Block {

  init() {
    const geometry = new THREE.CircleBufferGeometry(this.artParams.size, 16);
    const material = new THREE.MeshBasicMaterial({
      color: this.artParams.color
    });

    const iterator = (column, row) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = column * this.artParams.size;
      mesh.position.y = row * this.artParams.size;
      const n = noise(column / this.artParams.noiseFactor, row / this.artParams.noiseFactor);
      let scale = map(n, 0, 1, this.artParams.minScale, this.artParams.maxScale);
      mesh.scale.set(scale, scale, 1);
      return mesh;
    }

    return this.createGridGroup(
      this.artParams.columns,
      this.artParams.rows,
      iterator
    )
  }
}

HalftoneClouds.prototype.artDefaults = {
  color: COLORS.black,
  columns: 10,
  rows: 10,
  size: 0.1,
  minScale: 0.001,
  maxScale: 0.65,
  noiseFactor: 30
};

Composition.registerType(HalftoneClouds);