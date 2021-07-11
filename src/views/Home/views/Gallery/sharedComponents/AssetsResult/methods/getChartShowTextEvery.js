export function getChartShowTextEvery(dataLength, divide = 10) {
  const textEvery = Math.ceil(dataLength / divide)
  return textEvery
}
