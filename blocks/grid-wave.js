class GridWave extends Block {

  static preload() {
    this.prototype.texture = new THREE.TextureLoader().load('assets/textures/grid.png');
  }

  init() {
    this.frameCount = 0;

    this.geometry = new THREE.Geometry();

    // Create vertices
    const vertices = [];
    const uv = []
    for (let row = 0; row < this.artParams.rows; row++) {
      const y = map(row, 0, this.artParams.rows - 1, this.artParams.size / 2, -this.artParams.size / 2);
      const uvY = map(row, 0, this.artParams.rows - 1, 1, 0);
      for (let column = 0; column < this.artParams.columns; column++) {
        const x = map(column, 0, this.artParams.columns - 1, -this.artParams.size / 2, this.artParams.size / 2);
        const uvX = map(column, 0, this.artParams.columns - 1, 0, 1);
        vertices.push(new THREE.Vector3(x, y, 0));
        uv.push(new THREE.Vector2(uvX, uvY));
      }
    }
    this.geometry.vertices = vertices;

    // Create faces
    const faces = [];
    for (let row = 0; row < this.artParams.rows - 1; row++) {
      for (let column = 0; column < this.artParams.columns - 1; column++) {
        const i0 = row * this.artParams.columns + column;
        const i1 = i0 + 1;
        const i2 = i0 + this.artParams.columns;
        const i3 = i2 + 1;
        faces.push(new THREE.Face3(i0, i2, i1));
        faces.push(new THREE.Face3(i1, i2, i3));
        this.geometry.faceVertexUvs[0].push([uv[i0], uv[i2], uv[i1]]);
        this.geometry.faceVertexUvs[0].push([uv[i1], uv[i2], uv[i3]]);
      }
    }
    this.geometry.faces = faces;

    const material = new THREE.MeshBasicMaterial({
      map: this.texture
    });
    const mesh = new THREE.Mesh(this.geometry, material);

    return mesh;
  }

  animate() {
    // console.log(speed);
    for (let row = 0; row < this.artParams.rows; row++) {
      const rowZ = Math.sin(this.frameCount / 30 + row * 2);
      for (let column = 0; column < this.artParams.columns; column++) {
        const columnZ = Math.cos(this.frameCount / 30 + column * 2);
        const index = row * this.artParams.columns + column;
        this.geometry.vertices[index].z = rowZ * columnZ * 0.8;
      }
    }

    this.geometry.verticesNeedUpdate = true;
    this.frameCount += map(song.highMid, 0.6, 1, 0.15, 0.6, true);
  }
}

GridWave.prototype.artDefaults = {
  columns: 6,
  rows: 6,
  size: 4
}

Composition.registerType(GridWave);