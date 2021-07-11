import { useState, useEffect, useCallback } from 'react'

// todo: 跟 basic component / mediaItem component 的 hooks 一樣，之後會將其移到上一層以共用
function useMediaSizeEffect({ maxMediaWidth, maxMediaHeight, src, mediaType }) {
  const [mediaWidth, setMediaWidth] = useState(maxMediaWidth)
  const [mediaHeight, setMediaHeight] = useState(maxMediaHeight)
  const frameWidth = maxMediaWidth
  const frameHeight = maxMediaHeight

  const setMinifiedHeight = useCallback(
    (uploadedImgWidth, uploadedImgHeight, ratio) => {
      setMediaWidth(frameWidth)

      let minifiedHeight

      if (uploadedImgWidth > uploadedImgHeight) {
        minifiedHeight = frameWidth / ratio
      } else {
        minifiedHeight = frameWidth * ratio
      }

      setMediaHeight(minifiedHeight)
    },
    [frameWidth],
  )

  const setMinifiedWidth = useCallback(
    (uploadedImgWidth, uploadedImgHeight, ratio) => {
      let minifiedWidth

      if (uploadedImgWidth > uploadedImgHeight) {
        minifiedWidth = frameHeight * ratio
      } else {
        minifiedWidth = frameHeight / ratio
      }

      setMediaWidth(minifiedWidth)
      setMediaHeight(frameHeight)

      if (minifiedWidth > frameWidth) {
        setMinifiedHeight(uploadedImgWidth, uploadedImgHeight, ratio)
      }
    },
    [frameHeight, frameWidth, setMinifiedHeight],
  )

  const setImageSize = useCallback(() => {
    if (mediaType !== 'image') return

    const newImage = new Image()

    newImage.addEventListener('load', event => {
      const uploadedImgWidth = event.target.width
      const uploadedImgHeight = event.target.height

      const ratio = Math.max(uploadedImgWidth, uploadedImgHeight) / Math.min(uploadedImgWidth, uploadedImgHeight)

      if (uploadedImgHeight > frameHeight) {
        setMinifiedWidth(uploadedImgWidth, uploadedImgHeight, ratio)
      } else if (uploadedImgWidth > frameWidth) {
        setMinifiedHeight(uploadedImgWidth, uploadedImgHeight, ratio)
      } else {
        setMediaWidth(uploadedImgWidth)
        setMediaHeight(uploadedImgHeight)
      }
    })

    newImage.src = src
  }, [mediaType, src, frameWidth, frameHeight, setMinifiedWidth, setMinifiedHeight])

  useEffect(() => {
    if (mediaType === 'image') {
      setImageSize()
    } else if (mediaType === 'video') {
      setMediaWidth(maxMediaWidth)
      setMediaHeight(maxMediaHeight)
    }
  }, [maxMediaWidth, maxMediaHeight, mediaType, setImageSize])

  return { mediaWidth, mediaHeight }
}

export default useMediaSizeEffect
