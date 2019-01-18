class BVectorField extends Block {

  init() {
    this.push = 0;
    this.canvas.rectMode(CENTER);
    this.canvas.fill(this.artParams.color);
    this.canvas.noStroke();
  }

  draw() {
    this.push += song[this.artParams.freq] / 15;

    const halfSize = this.artParams.size / 2;

    this.iterateGrid(this.artParams.size, (x, y) => {
      let angle;
      if (this.artParams.vertical) {
        angle = noise(x / this.artParams.noiseFactor, y / this.artParams.noiseFactor + this.push);
      } else {
        angle = noise(x / this.artParams.noiseFactor + this.push, y / this.artParams.noiseFactor);
      }
      this.canvas.translate(x + halfSize, y + halfSize);
      // const angle = base + this.push % 1.0;
      this.canvas.rotate(map(angle, 0, 1, 0, TWO_PI))
      this.canvas.rect(0, 0, this.artParams.size, this.artParams.weight);


      this.canvas.resetMatrix();
    });
  }
}

BVectorField.prototype.isDynamic = true;

BVectorField.prototype.artDefaults = {
  color: '0',
  size: 50,
  weight: 3,
  noiseFactor: 1000,
  freq: 'high',
  vertical: false
}
