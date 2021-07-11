import { useState, useEffect } from 'react'
import { start } from 'utils/start-flow'
import usePrevious from 'effects/usePrevious'

function setVideoDuration(withoutHlsSrc, setDuration, onMediaSizeChanged) {
  const video = document.createElement('video')

  video.src = withoutHlsSrc

  video.onloadedmetadata = () => {
    setDuration(`Video Length: ${video.duration.toFixed(0)} sec`)
    onMediaSizeChanged(`${video.duration.toFixed(0)} sec`)
  }
}

function setImageSize(src, setSize, onMediaSizeChanged) {
  const image = new Image()

  image.src = src

  image.onload = () => {
    setSize(`Image Size: W${image.width} x H${image.height}`)
    onMediaSizeChanged(`W${image.width} x H${image.height}`)
  }
}

function useMediaSrcEffect(newSrc, videoWithoutHlsSrc, mediaType, onMediaSizeChanged) {
  const [src, setSrc] = useState('')
  const [withoutHlsSrc, setWithoutHlsSrc] = useState('')
  const [srcType, setSrcType] = useState('')
  const [size, setSize] = useState('')
  const [duration, setDuration] = useState('')
  const previousSrc = usePrevious(src)
  const previousSrcType = usePrevious(srcType)
  const isImageReset = srcType === 'reset'
  const isImageMedia = mediaType === 'image'
  const isVideoMedia = mediaType === 'video'

  const isRenderPreviewImage = !isImageReset && src !== '' && srcType === 'image' && isImageMedia

  const isRenderPreviewVideo = !isImageReset && src !== '' && srcType === 'video' && isVideoMedia

  useEffect(() => {
    if (previousSrc !== newSrc && previousSrcType === 'reset') return
    if (previousSrc === newSrc) return

    if (srcType === 'reset') {
      setSrc(newSrc)
      setWithoutHlsSrc(videoWithoutHlsSrc)
      setSrcType(mediaType)
    } else {
      setSrc('')
      setWithoutHlsSrc('')
      setSrcType('reset')
    }
  }, [videoWithoutHlsSrc, mediaType, src, srcType, previousSrc, previousSrcType, newSrc])

  useEffect(() => {
    const shouldSetMediaSize = Boolean(srcType) && srcType !== 'reset'

    if (!shouldSetMediaSize) return

    const setMediaSize = {
      video: () => setVideoDuration(withoutHlsSrc, setDuration, onMediaSizeChanged),
      image: () => setImageSize(src, setSize, onMediaSizeChanged),
      reset: () => start(() => setSize('')).end(() => setDuration('')),
    }

    setMediaSize[srcType]()
  }, [withoutHlsSrc, src, srcType, onMediaSizeChanged])

  return {
    videoWithoutHlsSrc,
    src,
    size,
    duration,
    isRenderPreviewImage,
    isRenderPreviewVideo,
  }
}

export default useMediaSrcEffect
