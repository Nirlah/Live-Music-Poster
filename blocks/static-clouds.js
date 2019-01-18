class BStaticClouds extends Block {

  init() {
    this.colorA = color(this.artParams.colors[0]);
    this.colorB = color(this.artParams.colors[1]);
  }

  draw() {
    this.iteratePixels((x, y) => {
      const n = noise(x / this.artParams.factor, y / this.artParams.factor);
      this.canvas.stroke(lerpColor(this.colorA, this.colorB, n));
      this.canvas.point(x, y);
    })

    if (this.artParams.noise) this.staticNoise();
  }
}

BStaticClouds.prototype.artDefaults = {
  noise: false,
  factor: 1200,
  colors: [COLORS.babyPink, COLORS.azure]
};