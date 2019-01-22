class LogoWave extends Block {

  static preload() {
    this.prototype.texture = new THREE.TextureLoader().load('assets/textures/logo.png');
  }

  init() {
    const width = 14;
    const height = 7;

    this.rowsCount = 20;
    this.columnsCount = 30;

    this.frameCount = 0;

    this.geometry = new THREE.Geometry();
    this.geometry.faceVertexUvs[0] = [];

    // Create vertices
    const vertices = [];
    const uv = []
    for (let row = 0; row < this.rowsCount; row++) {
      const y = map(row, 0, this.rowsCount - 1, height / 2, -height / 2);
      const uvY = map(row, 0, this.rowsCount - 1, 1, 0);
      for (let column = 0; column < this.columnsCount; column++) {
        const x = map(column, 0, this.columnsCount - 1, -width / 2, width / 2);
        const uvX = map(column, 0, this.columnsCount - 1, 0, 1);
        vertices.push(new THREE.Vector3(x, y, 0));
        uv.push(new THREE.Vector2(uvX, uvY));
      }
    }
    this.geometry.vertices = vertices;

    // Create faces
    const faces = [];
    for (let row = 0; row < this.rowsCount - 1; row++) {
      for (let column = 0; column < this.columnsCount - 1; column++) {
        const i0 = row * this.columnsCount + column;
        const i1 = i0 + 1;
        const i2 = i0 + this.columnsCount;
        const i3 = i2 + 1;
        faces.push(new THREE.Face3(i0, i2, i1));
        faces.push(new THREE.Face3(i1, i2, i3));
        this.geometry.faceVertexUvs[0].push([uv[i0], uv[i2], uv[i1]]);
        this.geometry.faceVertexUvs[0].push([uv[i1], uv[i2], uv[i3]]);
      }
    }
    this.geometry.faces = faces;

    const material = new THREE.MeshBasicMaterial({
      map: this.texture, transparent: true
    });
    const mesh = new THREE.Mesh(this.geometry, material);

    // mesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -0.08);
    mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -0.3);
    mesh.scale.set(0.95, 0.95, 0.85);

    return mesh;
  }

  animate() {
    for (let row = 0; row < this.rowsCount; row++) {
      const z = Math.sin((this.frameCount + row * 10) / 45);
      for (let column = 0; column < this.columnsCount; column++) {
        const index = row * this.columnsCount + column;
        this.geometry.vertices[index].z = z * 0.8;
      }
    }

    this.geometry.verticesNeedUpdate = true;
    this.frameCount += map(song.bass, 0.6, 1, 0.3, 2.5, true);
  }
}

Composition.registerType(LogoWave);