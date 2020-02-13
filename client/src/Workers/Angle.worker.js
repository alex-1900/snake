onmessage = function(e) {
  const [ angle, toAngle, speed ] = e.data;
  let nextAngle = angle;
  const accelerate = speed * 2.8;
  const step = toAngle - angle;
  if (Math.abs(toAngle - angle) <= 180 && step !== 0) {
    nextAngle += step > 0 ? accelerate : -accelerate;
  } else if (Math.abs(toAngle - angle) > 180 && step !== 0) {
    nextAngle += step > 0 ? -accelerate : accelerate;
  }
  if (angle > 360) {
    nextAngle -= 360
  }
  if (angle <= 0) {
    nextAngle += 360
  }
  if (Math.abs(toAngle - angle) < accelerate) {
    nextAngle = toAngle;
  }
  postMessage(nextAngle);
}
