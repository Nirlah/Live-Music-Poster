class LogoPage extends Block {

  static preload() {
    ShadersBag.load('logo.frag', 'uv.vert');
    this.prototype.circleTexture = new THREE.TextureLoader().load('assets/textures/blur-circle.png');
  }

  init() {
    const waveRenderer = this.createWaveRenderer();
    const mixRenderer = this.createMixRenderer();

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        textMap: { type: 't', value: waveRenderer.texture },
        mixMap: { type: 't', value: mixRenderer.texture },
        mixAmount: { type: 'f', value: 0.5 }
      },
      vertexShader: ShadersBag.get('uv.vert'),
      fragmentShader: ShadersBag.get('logo.frag')
    });
    const geometry = new THREE.PlaneBufferGeometry(12, 12);
    const mesh = new THREE.Mesh(geometry, this.material);

    return mesh;
  }

  createWaveRenderer() {
    const scene = new THREE.Scene();
    scene.background = COLORS.white;

    const logo = new LogoWave();
    logo.mesh.position.set(0, -2.5, 0);
    scene.add(logo.mesh);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = 20;

    const size = 1024 * (window.devicePixelRatio || 1);
    const renderTarget = new THREE.WebGLRenderTarget(size, size, {
      depthBuffer: false,
      stencilBuffer: false
    });

    this.waveAnimate = () => {
      logo.animate();
      renderer.render(scene, camera, renderTarget);
    }

    return renderTarget;
  }

  createMixRenderer() {
    const scene = new THREE.Scene();
    scene.background = COLORS.white;

    const circles = [];
    const circlesPush = [];

    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({
      map: this.circleTexture,
      transparent: true
    });

    function addCircle() {
      const mesh = new THREE.Mesh(geometry, material);
      const x = map(Math.random(), 0, 1, -7.5, 7);
      const y = map(Math.random(), 0, 1, -7.5, 2.5);
      mesh.position.set(x, y, 0);
      const scale = map(Math.random(), 0, 1, 1, 3);
      mesh.scale.set(scale, scale, 1);
      scene.add(mesh);
      circles.push(mesh);
      const pushX = Math.random() > 0.5 ? 1 : -1;
      const pushY = Math.random() > 0.5 ? 1 : -1;
      circlesPush.push([pushX, pushY]);
    }

    for (let i = 0; i < 12; i++) {
      addCircle();
    }

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = 20;

    const renderTarget = new THREE.WebGLRenderTarget(256, 256, {
      depthBuffer: false,
      stencilBuffer: false
    });

    this.mixAnimate = () => {
      renderer.render(scene, camera, renderTarget);

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        circle.position.x += circlesPush[i][0] * noise(i, i + 1, circle.position.x / 100) / 50;
        if (circle.position.x > 7) {
          circle.position.x = 7;
          circlesPush[i][0] = -1;
        } else if (circle.position.x < -7.5) {
          circle.position.x = -7.5;
          circlesPush[i][0] = 1;
        }
        circle.position.y += circlesPush[i][1] * noise(i, i - 1, circle.position.y / 100) / 50;
        if (circle.position.y > 2.5) {
          circle.position.y = 2.5;
          circlesPush[i][1] = -1;
        } else if (circle.position.y < -7.5) {
          circle.position.y = -7.5;
          circlesPush[i][1] = 1;
        }
      }
    }

    return renderTarget;
  }

  animate() {
    this.material.uniforms.mixAmount.value = map(song.treble, 0.0, 0.5, 0.4, 0.8, true);
    this.waveAnimate();
    this.mixAnimate();
  }
}

Composition.registerType(LogoPage);