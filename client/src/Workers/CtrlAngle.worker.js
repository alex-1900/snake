function getAngle(clientX, clientY, offsetX, offsetY, startX, startY) {
  const radian = 180 / Math.PI;
  if (clientX >= startX && clientY >= startY) {
    return Math.floor((Math.atan(offsetY / offsetX) * radian));
  } else if (clientX <= startX && clientY >= startY) {
    return Math.floor((Math.atan(-offsetX / offsetY) * radian)) + 90;
  } else if (clientX < startX && clientY < startY) {
    return Math.floor((Math.atan(-offsetY / -offsetX) * radian)) + 180;
  } else if (clientX > startX && clientY < startY) {
    return Math.floor((Math.atan(-offsetX / offsetY) * radian)) + 270;
  }
  return 0;
}

onmessage = function(e) {
  const [ clientX, clientY, offsetX, offsetY, startX, startY ] = e.data;
  postMessage(getAngle(clientX, clientY, offsetX, offsetY, startX, startY));
};
