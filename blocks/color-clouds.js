class ColorClouds extends Block {

  static preload() {
    ShadersBag.load('clouds.frag');
  }

  init() {
    const geometry = new THREE.PlaneBufferGeometry(this.artParams.width, this.artParams.height);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        factor: { value: this.artParams.factor },
        c0: { value: this.artParams.colors[0] },
        c1: { value: this.artParams.colors[1] }
      },
      fragmentShader: ShadersBag.get('clouds.frag')
    });

    return new THREE.Mesh(geometry, this.material);
  }

  animate() {

  }
}

ColorClouds.prototype.artDefaults = {
  width: 1,
  height: 1,
  factor: 500,
  colors: [
    COLORS.black,
    COLORS.white
  ]
};

Composition.registerType(ColorClouds);