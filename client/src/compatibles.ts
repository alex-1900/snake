/**
 * 计算并获取游戏显示界面的宽度和高度 [width, height]
 * 
 * @param clientWidth 可用区域宽度
 * @param clientHeight 可用区域高度
 */
export function getInterfaceSize(clientWidth: number, clientHeight: number) {
  const max = Math.max(clientWidth, clientHeight);
  const min = Math.min(clientWidth, clientHeight);
  const estimateLongSide = max * 9 / 16;
  if (estimateLongSide > min) {
    return [min * 16 / 9, min]
  }
  return [max, estimateLongSide];
}
