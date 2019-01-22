class Song {
  constructor(source, camera) {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    this.sound = new THREE.Audio(listener);

    new THREE.AudioLoader().load(source, buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      this.sound.play();
    });

    this.analyser = new THREE.AudioAnalyser(this.sound, 128);
    this.bass = 0;
    this.highMid = 0;
    this.mid = 0;
    this.lowMid = 0;
    this.treble = 0;
  }

  analyze() {
    this.analyser.getFrequencyData();

    this.bass = this.averageForIndexes.apply(this, this._bass) / 256;
    this.lowMid = this.averageForIndexes.apply(this, this._lowMid) / 256;
    this.mid = this.averageForIndexes.apply(this, this._mid) / 256;
    this.highMid = this.averageForIndexes.apply(this, this._highMid) / 256;
    this.treble = this.averageForIndexes.apply(this, this._treble) / 256;
  }

  averageForIndexes(from, to) {
    let total = 0;
    let count = 0;

    for (let i = from; i <= to; i++) {
      total += this.analyser.data[i];
      count++;
    }

    return total / count;
  }
}

Song.prototype._bass = [0, 1];

Song.prototype._lowMid = [1, 2];

Song.prototype._mid = [3, 10];

Song.prototype._highMid = [10, 20];

Song.prototype._treble = [20, 54];