const shadersBagLoader = new THREE.FileLoader();

class ShadersBag {

  static load() {
    for (let i = 0; i < arguments.length; i++) {
      const shader = arguments[i];

      if (this.prototype.registered.indexOf(shader) > -1) continue;
      this.prototype.registered.push(shader);

      shadersBagLoader.load(`shaders/${shader}`, data => {
        this.prototype.shaders[shader] = data;
      });
    }
  }

  static get(shader) {
    return this.prototype.shaders[shader];
  }
}

ShadersBag.prototype.registered = [];

ShadersBag.prototype.shaders = {};