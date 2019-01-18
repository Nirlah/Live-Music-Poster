class BEchoCircles extends Block {

  init() {
    this.canvas.noFill();
    this.canvas.stroke(this.artParams.color);
  }

  draw() {
    const gap = map(song.mid, 0, 1, 6, 40);

    const weight = map(song.bass, 0, 1, 1, 3);
    this.canvas.strokeWeight(weight);

    const maxSide = (this.width > this.height ? this.width : this.height);
    const maxSize = Math.hypot(maxSide, maxSide);
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    let current = gap;

    while (current < maxSize) {
      this.canvas.ellipse(centerX, centerY, current);
      current += weight + gap;
    }
  }
}

BEchoCircles.prototype.isDynamic = true;

BEchoCircles.prototype.artDefaults = {
  color: '0'
}