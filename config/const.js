// Size ------------------------------------------------------------------------

const WIDTH = 1080;

const HEIGHT = 1920;

// Audio -----------------------------------------------------------------------

const AUDIO_VOLUME = 0.3;

// Music Strip -----------------------------------------------------------------

const STRIP_WIDTH = 80;

/**/ const STRIP_X = WIDTH - STRIP_WIDTH;

// Info Box --------------------------------------------------------------------

const BOX_WIDTH = 450;

const BOX_HEIGHT = 610;

const BOX_X = 80;

const BOX_Y = 1230;

// Grid ------------------------------------------------------------------------

/**/ const GRID_WIDTH = STRIP_X;

/**/ const GRID_HEIGHT = HEIGHT;

const CELL_SIZE = 120;

/**/ const GRID_SIZE_HORZ = Math.floor(GRID_WIDTH / CELL_SIZE);

/**/ const GRID_SIZE_VERT = Math.floor(GRID_HEIGHT / CELL_SIZE);

/**/ const EDGE_CELL_HORZ_PADD = (GRID_WIDTH - CELL_SIZE * GRID_SIZE_HORZ) / 2;

/**/ const EDGE_CELL_VERT_PADD = (GRID_HEIGHT - CELL_SIZE * GRID_SIZE_VERT) / 2;

// Blocks ----------------------------------------------------------------------

const BLOCK_TYPES = {
  halftoneCircle: BHalftoneCircle,
  vectorField: BVectorField,
  columnAmp: BColumnAmp,
  echoCircles: BEchoCircles,
  textBall: BTextBall,
  staticTexture: BStaticTexture,
  staticGradient: BStaticGradient,
  staticClouds: BStaticClouds
};