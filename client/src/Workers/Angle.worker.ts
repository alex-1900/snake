const webWorker: Worker = self as any;

webWorker.addEventListener('message', function(e: MessageEvent) {
  const [ angle, toAngle, speed ] = e.data;
  let nextAngle = angle;
  const accelerate = speed * 2.8;
  const step = toAngle - angle;
  const absStep = Math.abs(step);

  const fixed = Math.min(absStep, accelerate);
  if (absStep <= 180) {
    nextAngle += step > 0 ? fixed : -fixed;
  } else if (absStep > 180) {
    nextAngle += step > 0 ? -fixed : fixed;
  }

  if (nextAngle > 360) {
    nextAngle -= 360
  }
  if (nextAngle < 0) {
    nextAngle += 360
  }

  if (absStep < accelerate) {
    nextAngle = toAngle;
  }
  webWorker.postMessage(Math.floor(nextAngle));
});

export default null as any;
