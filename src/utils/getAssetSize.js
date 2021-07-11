export const getImageSize = assetSize => {
  if (!assetSize) return { imageWidth: 0, imageHeight: 0 } // 如果沒有 assetSize 就 return 0

  const imageSize = assetSize?.split('x')

  const imageWidth = imageSize[0]
    ?.split('W')
    .join('')
    .trim()
  const imageHeight = imageSize[1]
    ?.split('H')
    .join('')
    .trim()

  return { imageWidth, imageHeight }
}

export const getVideoSize = assetSize => {
  if (!assetSize) return { videoDuration: 0 } // 如果沒有 assetSize 就 return 0

  const videoDuration = assetSize
    ?.split('sec')
    .join('')
    .trim()

  return { videoDuration }
}
