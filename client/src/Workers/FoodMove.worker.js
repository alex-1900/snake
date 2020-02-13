function collisionCheck(x1, y1, r1, x2, y2, r2) {
  const dist = Math.sqrt(
    Math.pow(x1 - x2, 2) +
    Math.pow(y1 - y2, 2)
  );
  return Boolean((r1 + r2) + 40 >= dist);
}

onmessage = function(e) {
  const [ x, y, size, fx, fy, key, fkey ] = e.data;
  const r = size / 2;
  if (collisionCheck(x + r, y + r, r, fx, fy, 4)) {
    postMessage([key, fkey]);
  }
};
