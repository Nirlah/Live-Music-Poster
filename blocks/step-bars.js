class StepBars extends Block {

  static preload() {
    ShadersBag.load('uv-gradient.frag', 'uv.vert');
  }

  init() {
    const group = new THREE.Group();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        c0: { value: this.artParams.colorLow },
        c1: { value: this.artParams.colorHigh }
      },
      vertexShader: ShadersBag.get('uv.vert'),
      fragmentShader: ShadersBag.get('uv-gradient.frag')
    });
    const geometry1 = new THREE.PlaneBufferGeometry(1, 0.3);
    const geometry13 = new THREE.PlaneBufferGeometry(1, 0.65);
    const geometry2 = new THREE.PlaneBufferGeometry(1, 1);

    this.mesh1 = new THREE.Mesh(geometry1, material);
    this.mesh1.scale.set(1, 2, 1);
    group.add(this.mesh1);

    this.mesh2 = new THREE.Mesh(geometry13, material);
    this.mesh2.scale.set(1, 3, 1);
    this.mesh2.position.y = 0.475;
    group.add(this.mesh2);

    this.mesh3 = new THREE.Mesh(geometry13, material);
    this.mesh3.scale.set(1, 4, 1);
    this.mesh3.position.y = 1.125;
    group.add(this.mesh3);

    this.mesh4 = new THREE.Mesh(geometry2, material);
    this.mesh4.scale.set(1, 6, 1);
    this.mesh4.position.y = 1.95;
    group.add(this.mesh4);

    this.mesh5 = new THREE.Mesh(geometry1, material);
    this.mesh5.scale.set(1, 5, 1);
    this.mesh5.position.y = 2.6;
    group.add(this.mesh5);

    return group;
  }

  animate() {
    this.mesh1.scale.set(map(song.bass, 0, 1, 1, 2), 1, 1);
    this.mesh2.scale.set(map(song.highMid, 0, 1, 1, 3), 1, 1);
    this.mesh3.scale.set(map(song.mid, 0, 1, 1, 4), 1, 1);
    this.mesh4.scale.set(map(song.lowMid, 0, 1, 1, 6), 1, 1);
    this.mesh5.scale.set(map(song.treble, 0, 1, 1, 5), 1, 1);
  }
}

StepBars.prototype.artDefaults = {
  colorLow: COLORS.black,
  colorHigh: COLORS.white
};

Composition.registerType(StepBars);