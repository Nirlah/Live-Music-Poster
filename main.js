// Resources
let audio, logo, staticNoise, tempBox;
let textures = {};
let fontSans, fontSansItalic, fontSerif, fontMono, fontMonoBold;

// Managers
let song, grid;

function preload() {
  // Load Song
  audio = loadSound('assets/songs/area.mp3');

  // Load Fonts
  fontSans = loadFont('assets/fonts/IBMPlexSans-Regular.otf');
  fontSansItalic = loadFont('assets/fonts/IBMPlexSans-Italic.otf');
  fontSerif = loadFont('assets/fonts/IBMPlexSerif-Medium.otf');
  fontMono = loadFont('assets/fonts/IBMPlexMono-Regular.otf');
  fontMonoBold = loadFont('assets/fonts/IBMPlexMono-MediumItalic.otf');

  // Load Images
  logo = loadImage('assets/logo.svg');
  staticNoise = loadImage('assets/noise.jpg');
  tempBox = loadImage('assets/temp-box.png');

  // Load Textures
  textures.bigdot = loadImage('assets/textures/bigdot.png');
  textures.contours = loadImage('assets/textures/contours.png');
  textures.funkygerms = loadImage('assets/textures/funkygerms.png');
  textures.leppard = loadImage('assets/textures/leppard.png');
  textures.littlesticks = loadImage('assets/textures/littlesticks.png');
  textures.smalldot = loadImage('assets/textures/smalldot.png');
  textures.worms = loadImage('assets/textures/worms.png');
}

function setup() {
  createCanvas(WIDTH, HEIGHT);

  grid = new Grid();
  song = new Song(audio);

  grid.addBlock(BLOCK_TYPES.staticClouds, [0, 0], [6, 12]);
  grid.addBlock(BLOCK_TYPES.staticClouds, [3, 7], [7, 13], { noise: true, colors: [COLORS.pink, COLORS.blue] });
  grid.addBlock(BLOCK_TYPES.halftoneCircle, [2, 3], [8, 8], { color: 255, blend: SOFT_LIGHT });
  grid.addBlock(BLOCK_TYPES.staticClouds, [0, 0], [2, 4], { noise: true, colors: [COLORS.blue, COLORS.azure] });
  grid.addBlock(BLOCK_TYPES.staticClouds, [6, 0], [2, 8], { colors: [COLORS.babyPink, COLORS.pink] });
  grid.addBlock(BLOCK_TYPES.vectorField, [1, 3], [4, 3], { color: COLORS.blue, background: COLORS.babyPink, size: 30, weight: 8, noiseFactor: 750, freq: 'mid', vertical: true });
  grid.addBlock(BLOCK_TYPES.vectorField, [4, 12.5], [4, 4], { weight: 3, color: 255, blend: OVERLAY });
  grid.addBlock(BLOCK_TYPES.columnAmp, [0, 9], [3, 3], { color: 255 });
  grid.addBlock(BLOCK_TYPES.staticClouds, [0, 12], [5, 4], { colors: [COLORS.babyPink, COLORS.lightYellow] });
  grid.addBlock(BLOCK_TYPES.echoCircles, [6, 1], [2, 2], { color: COLORS.yellow });

  song.play();
}

function draw() {
  background(255);

  song.analyzeForFrame();

  grid.drawBlocks();
  drawSongStrip();
  drawInfoBox();
}
