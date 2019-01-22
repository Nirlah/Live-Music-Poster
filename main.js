// 📦
const scene = new THREE.Scene();
scene.background = COLORS.white;

// 📹
const camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.1, 1000);
camera.position.z = 20;

// 🎨
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio(window.devicePixelRatio || 1);
document.body.appendChild(renderer.domElement);

// 🎸
const song = new Song('assets/audio/area.mp3', camera);

// 🧩
const composition = new Composition(scene);
function addCompositionBlocks() {

  // Bottom layer (-∞, 0) ------------------------------------------------------

  composition.addBlock(HalftoneClouds, [-13.5, -8.5, -3], null, {
    columns: 48,
    rows: 170,
    maxScale: 0.4,
    color: COLORS.blue
  });

  // composition.addBlock(GridWave, [-10.75, 3.2, -1.3], [0.5, 0.6, 0]);

  composition.addBlock(HalftoneGradient, [9.75, -7.5, -1], [0, 0, -0.2], {
    columns: 25,
    rows: 50,
    size: 0.1,
    minScale: 0.1,
    maxScale: 0.1,
    color: COLORS.black
  })

  // Middle layer [0, 2) -------------------------------------------------------

  composition.addBlock(ColorClouds, [0.75, 0, 0], [0, 0, 0.08], {
    height: 17,
    width: 18,
    factor: 700,
    colors: [COLORS.babyPink, COLORS.pink]
  });

  composition.addBlock(ColorClouds, [-4.3, -1, 0.01], [0, 0, -0.2], {
    height: 7,
    width: 9,
    factor: 900,
    colors: [COLORS.red, COLORS.orange]
  });


  // composition.addBlock(ColorClouds, [-5.3, 3.8, 0.02], null, {
  //   height: 4,
  //   width: 3,
  //   factor: 800,
  //   colors: [COLORS.purple, COLORS.pink]
  // });


  // composition.addBlock(StepBars, [7, -4, 0.1], [0, 0, Math.PI], {
  //   colorLow: COLORS.pink,
  //   colorHigh: COLORS.babyPink
  // });

  composition.addBlock(CirclesGrid, [-10, -7, 0.1], [0, 0, 0.25], {
    color: COLORS.blue,
    rows: 2,
    columns: 4,
    gap: 1,
    size: 1.2
  });

  composition.addBlock(ColorClouds, [0.75, -4.5, 0.18], [0, 0, -0.2], {
    height: 6,
    width: 7,
    factor: 400,
    colors: [COLORS.yellow, COLORS.turquoise]
  });

  composition.addBlock(VectorField, [-4.75, -2.5, 0.19], null, {
    color: COLORS.blue,
    weight: 0.025,
    size: 0.5,
    gap: 0,
    columns: 30,
    rows: 10,
    freq: 'mid'
  });

  composition.addBlock(CirclesGrid, [-2, -7.8, 0.2], [0, 0, -0.25], {
    color: COLORS.purple,
    rows: 3,
    columns: 2,
    gap: 1,
    size: 3,
    segments: 64
  });

  composition.addBlock(HalftoneGradient, [5.75, -7.5, 0.5], [0, 0, 0.1], {
    columns: 35,
    rows: 40,
    size: 0.13,
    maxScale: 0.4,
    color: COLORS.white
  })

  composition.addBlock(VectorField, [-11.5, 7.25, 0.5], null, {
    color: COLORS.yellow,
    rows: 5
  });

  composition.addBlock(TimeSphere, [-8.3, -4.5, 1]);

  // Top layer [2, +∞) ---------------------------------------------------------

  composition.addBlock(GridWave, [-6.75, 2.5, 3], [0.5, 0.6, -0.1]);
  composition.addBlock(MetaInfo, [-6, 2.5, 5], [0, 0, 0.12]);

  composition.addBlock(LogoPage, [4.15, 4, 4], [0, 0, -0.07]);
}

// 🎞
function animate() {
  requestAnimationFrame(animate);
  song.analyze();
  composition.animate();
  renderer.render(scene, camera);
}

// 🔥
THREE.DefaultLoadingManager.onLoad = () => {
  addCompositionBlocks();
  animate();
};