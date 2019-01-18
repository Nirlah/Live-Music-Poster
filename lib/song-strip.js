function drawSongStrip() {
  fill(255);
  noStroke();
  rect(STRIP_X, 0, STRIP_WIDTH, HEIGHT);

  // Transform matrix
  rotate(PI * 0.5);
  translate(0, -WIDTH);

  // NOTE: x controls y, y controls x

  image(logo, 180, (STRIP_WIDTH - 16) / 2, 160, 14);

  fill(0);
  textSize(16);
  textFont(fontMonoBold);
  text(song.name, 750, (STRIP_WIDTH - 24) / 2, 60, 20);

  textFont(fontMono);
  text(formatDuration(song.currentTime), 960, (STRIP_WIDTH - 22) / 2, 40, 20);
  text('/', 1000, (STRIP_WIDTH - 22) / 2, 40, 20);
  text(formatDuration(song.duration), 1010, (STRIP_WIDTH - 22) / 2, 40, 20);

  resetMatrix();
}

function formatDuration(duration) {
  const secs = duration % 60;
  const mins = (duration - secs) / 60;

  return `${mins}:${(secs + '').padStart(2, '0')}`;
}