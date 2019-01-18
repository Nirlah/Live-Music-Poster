class BTextBall extends Block {

  init() {
    this.canvas.noStroke();

    this.maxHorz = PI * 1.5;
    this.minHorz = PI * 1.35;

    this.canvas.rotateY(this.maxHorz);
    this.currentHorz = this.maxHorz;

    this.canvas.rotateZ(PI / 12);

    // this.currentVert = 0;
  }

  draw() {


    if (song.treble >= 0.05) {
      const addAmount = map(song.treble, 0.05, 0.2, 0.01, 0.025);
      this.removeHorz(addAmount);
    }
    const removeAmount = map(song.treble, 0, 0.3, 0.003, 0.032);
    this.addHorz(removeAmount);

    const radius = (this.width > this.height ? this.height : this.width) / 3;

    this.canvas.texture(tempBox);
    // this.canvas.rotateY(PI / 200);
    this.canvas.sphere(radius, this.width / 15, this.height / 15);

  }

  addHorz(amount) {
    if (this.currentHorz > this.maxHorz) return;

    let adjustedAmount;
    if (this.currentHorz + amount > this.maxHorz) {
      adjustedAmount = this.maxHorz - this.currentHorz;
    } else {
      adjustedAmount = amount;
    }

    this.currentHorz += adjustedAmount;
    this.canvas.rotateY(adjustedAmount);
  }

  removeHorz(amount) {
    if (this.currentHorz <= this.minHorz) return;

    let adjustedAmount;
    if (this.currentHorz - amount < this.minHorz) {
      adjustedAmount = this.currentHorz - this.minHorz;
    } else {
      adjustedAmount = amount;
    }

    this.currentHorz -= adjustedAmount;
    this.canvas.rotateY(-adjustedAmount);
  }
}

BTextBall.prototype.isWebGL = true;

BTextBall.prototype.isDynamic = true;

BTextBall.prototype.artDefaults = {
}