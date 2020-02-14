const webWorker: Worker = self as any;

function collisionCheck(
  x1: number, y1: number, r1: number, x2: number, y2: number, r2: number
): boolean {
  const dist = Math.sqrt(
    Math.pow(x1 - x2, 2) +
    Math.pow(y1 - y2, 2)
  );
  return Boolean((r1 + r2) + 40 >= dist);
}

webWorker.addEventListener('message', function(e) {
  const [ x, y, size, fx, fy, key, fkey ] = e.data;
  const r = size / 2;
  if (collisionCheck(x + r, y + size / 3, r, fx, fy, 4)) {
    webWorker.postMessage([key, fkey]);
  }
});

export default null as any;
