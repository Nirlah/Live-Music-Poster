class CirclesGrid extends Block {

  init() {
    const geometry = new THREE.CircleBufferGeometry(this.artParams.size, this.artParams.segments);
    const material = new THREE.MeshBasicMaterial({
      color: this.artParams.color
    });

    const push = this.artParams.size * 2 + this.artParams.gap;
    const iterator = (column, row) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = column * push;
      mesh.position.y = row * push;
      return mesh;
    }

    return this.createGridGroup(
      this.artParams.columns,
      this.artParams.rows,
      iterator
    )
  }
}

CirclesGrid.prototype.artDefaults = {
  color: COLORS.black,
  size: 1,
  gap: 0.75,
  rows: 5,
  columns: 5,
  segments: 32
};

Composition.registerType(CirclesGrid);