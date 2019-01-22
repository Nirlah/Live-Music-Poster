class HalftoneGradient extends Block {

  init() {
    const geometry = new THREE.CircleBufferGeometry(this.artParams.size, 16);
    const material = new THREE.MeshBasicMaterial({
      color: this.artParams.color
    });

    const isHorizontal = [DIRECTIONS.left, DIRECTIONS.right].indexOf(this.artParams.direction) > -1;

    const iterator = (column, row) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = column * this.artParams.size;
      mesh.position.y = row * this.artParams.size;
      let scale;
      if (isHorizontal) {
        mesh.position.x += (row % 2 === 0) ? this.artParams.size / 2 : 0;
        scale = this.artParams.direction === DIRECTIONS.left
          ? map(column, 0, this.artParams.columns, this.artParams.minScale, this.artParams.maxScale)
          : map(column, 0, this.artParams.columns, this.artParams.maxScale, this.artParams.minScale);
      } else {
        mesh.position.y += (column % 2 === 0) ? this.artParams.size / 2 : 0;
        scale = this.artParams.direction === DIRECTIONS.bottom
          ? map(row, 0, this.artParams.rows, this.artParams.minScale, this.artParams.maxScale)
          : map(row, 0, this.artParams.rows, this.artParams.maxScale, this.artParams.minScale);
      }
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

HalftoneGradient.prototype.artDefaults = {
  color: COLORS.black,
  columns: 10,
  rows: 10,
  size: 0.1,
  minScale: 0.001,
  maxScale: 0.6,
  direction: DIRECTIONS.left
};

Composition.registerType(HalftoneGradient);