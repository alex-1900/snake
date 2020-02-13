const radian = 180 / Math.PI;

function getAngle(clientX, clientY, offsetX, offsetY, startX, startY, horizon) {
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

onmessage = function(e) {
  const [ clientX, clientY, offsetX, offsetY, startX, startY, horizon ] = e.data;
  postMessage(getAngle(clientX, clientY, offsetX, offsetY, startX, startY, horizon));
};
