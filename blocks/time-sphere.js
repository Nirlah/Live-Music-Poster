class TimeSphere extends Block {

  static preload() {
    this.prototype.texture = new THREE.TextureLoader().load('assets/textures/time.png');
  }

  init() {
    const geometry = new THREE.SphereBufferGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: this.texture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.set(-0.2, 0.3, 0.4);

    return sphere;
  }

  animate() {
    const factor = map(song.highMid, 0, 1, 50, 100, true);
    this.mesh.rotation.y += song.highMid / factor;
  }
}

Composition.registerType(TimeSphere);