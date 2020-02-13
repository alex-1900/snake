const webWorker: Worker = self as any;

const radian = 180 / Math.PI;

function getAngle(
  clientX: number,
  clientY: number,
  offsetX: number,
  offsetY: number,
  startX: number,
  startY: number,
  horizon: number
): number {
  if (clientX > startX && clientY > startY) {
    return Math.floor((Math.atan(offsetY / offsetX) * radian)) + (horizon ? 0 : 360);
  } else if (clientX < startX && clientY > startY) {
    return Math.floor((Math.atan(-offsetX / offsetY) * radian)) + 90;
  } else if (clientX < startX && clientY < startY) {
    return Math.floor((Math.atan(-offsetY / -offsetX) * radian)) + 180;
  } else if (clientX > startX && clientY < startY) {
    return Math.floor((Math.atan(-offsetX / offsetY) * radian)) + 270;
  }
  return 0;
}

webWorker.addEventListener('message', function(e: MessageEvent) {
  const [ clientX, clientY, offsetX, offsetY, startX, startY, horizon ] = e.data;
  webWorker.postMessage(getAngle(clientX, clientY, offsetX, offsetY, startX, startY, horizon));
});

export default null as any;
