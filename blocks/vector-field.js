class VectorField extends Block {
  init() {
    this.time = 0;

    const geometry = new THREE.PlaneBufferGeometry(this.artParams.size, this.artParams.weight);
    const material = new THREE.MeshBasicMaterial({
      color: this.artParams.color
    });
    const push = this.artParams.size + this.artParams.gap;

    const iterator = (column, row) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = column * push;
      mesh.position.y = -row * push;
      return mesh;
    }

    return this.createGridGroup(
      this.artParams.columns,
      this.artParams.rows,
      iterator
    )
  }

  animate() {
    this.time += song[this.artParams.freq] / 30;

    const iterator = (object, column, row) => {
      const angle = noise(column / this.artParams.noiseFactor + this.time, row / this.artParams.noiseFactor);
      object.rotation.z = map(angle, 0, 1, 0, 2 * Math.PI);
    }

    this.iterateGridGroup(
      this.artParams.columns,
      this.artParams.rows,
      iterator)
  }
}

VectorField.prototype.artDefaults = {
  color: new THREE.Color('#000000'),
  columns: 6,
  rows: 4,
  size: 1.5,
  weight: 0.5,
  gap: 0.35,
  freq: 'highMid',
  noiseFactor: 30
};

Composition.registerType(VectorField);