class MetaInfo extends Block {
  static preload() {
    this.prototype.texture = new THREE.TextureLoader().load('assets/textures/meta.png');
  }

  init() {
    const geometry = new THREE.PlaneBufferGeometry(2.75, 2.75);
    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.1, 1.1, 1);
    return mesh;
  }
}

Composition.registerType(MetaInfo);