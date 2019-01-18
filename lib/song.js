class Song {

  constructor(audio) {
    this._audio = audio;
    this._audio.setVolume(AUDIO_VOLUME);
    this._audio.setLoop(true);

    // this.peaks = false;
    // this._asudio.processPeaks(list => {
    // this.peaks = list;
    // console.log(list);
    // this.play();
    // });

    // TODO: Load dynamicly with ID3
    this.name = 'Area';
    this.duration = Math.floor(this._audio.duration());

    this._fft = new p5.FFT();
    this._fft.setInput(this._audio); // , [smoothing] 

    this.bass = 0;
    this.low = 0
    this.mid = 0;
    this.high = 0;
    this.treble = 0;
  }

  get currentTime() {
    return Math.floor(this._audio.currentTime());
  }

  play() {
    this._audio.play();
  }

  pause() {
    this._audio.pause();
  }

  analyzeForFrame() {
    this._fft.analyze();

    this.bass = this.normalizeEnergy('bass');
    this.low = this.normalizeEnergy('lowMid');
    this.mid = this.normalizeEnergy('mid');
    this.high = this.normalizeEnergy('highMid');
    this.treble = this.normalizeEnergy('treble');
  }

  normalizeEnergy(frequency) {
    return map(this._fft.getEnergy(frequency), 0, 255, 0, 1.0);
  }
}