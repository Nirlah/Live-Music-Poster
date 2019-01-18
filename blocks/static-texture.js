class BStaticTexture extends Block {

  draw() {
    const texture = textures[this.artParams.texture];
    this.canvas.background(this.artParams.color);

    this.canvas.blendMode(OVERLAY);
    this.canvas.image(texture, 0, 0, texture.width / 2, texture.height / 2);
    this.canvas.blendMode(BLEND);
  }

}

BStaticTexture.prototype.artDefaults = {
  texture: 'smalldot',
  color: COLORS.azure
};
