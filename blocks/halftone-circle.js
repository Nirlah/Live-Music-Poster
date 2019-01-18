class BHalftoneCircle extends Block {

  init() {
    this.canvas.fill(this.artParams.color);
    this.canvas.noStroke();
  }

  draw() {
    const halfSize = this.artParams.size / 2;
    const maxDistance = this.width < this.height ? this.width / 2 : this.height / 2;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const maxSize = map(song.low, 0, 1, 1, 1.8) * this.artParams.size;

    this.iterateGrid(this.artParams.size, (x, y) => {

      const distance = Math.hypot(x - centerX, y - centerY);
      if (distance / maxDistance > song.low) return;

      const strength = map(distance / maxDistance, song.low, 0, 0, 1, true);

      this.canvas.ellipse(x + halfSize, y + halfSize, strength * maxSize);
    }, true);
  }
}

BHalftoneCircle.prototype.isDynamic = true;

BHalftoneCircle.prototype.artDefaults = {
  color: '0',
  size: 10
};