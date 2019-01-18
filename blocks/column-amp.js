class BColumnAmp extends Block {

  init() {
    this.push = 0;
    this.canvas.rectMode(CENTER);
    this.canvas.fill(this.artParams.color);
    this.canvas.noStroke();
  }

  draw() {
    const centerY = this.height / 2;
    const halfSize = this.artParams.size;
    const maxCurrent = this.height / 2;

    this.iterateColumns(this.artParams.size, x => {
      const strengh = x / (this.width);
      const baseGap = map(strengh, 0, 1, 5 + song.low, 20 * song.low);
      const columnX = x + halfSize;

      this.canvas.rect(columnX, centerY, this.artParams.size, this.artParams.weight);

      let i = 0;
      while (true) {
        const currentY = (baseGap * i + this.artParams.weight * strengh) * i;
        const weight = map(currentY / maxCurrent, 0, 1, 0.7, 0.25) * this.artParams.weight;

        this.canvas.rect(columnX, centerY - currentY, this.artParams.size, weight);
        this.canvas.rect(columnX, centerY + currentY, this.artParams.size, weight);

        if (currentY > maxCurrent) break;
        i++;
      }
    });
  }
}

BColumnAmp.prototype.isDynamic = true;

BColumnAmp.prototype.artDefaults = {
  color: '0',
  size: 60,
  weight: 4
};