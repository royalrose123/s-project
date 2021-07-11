import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { stopPropagation, preventDefault } from 'utils/event-methods'
import { start } from 'utils/start-flow'
import { getImageSize, getVideoSize } from 'utils/getAssetSize'

function useMediaEffect({ assetFormatType, assetSize, fileInput, isMultipleUpload, onUploadFileSelected }) {
  const [currentImageWidth, setCurrentImageWidth] = useState('')
  const [currentImageHeight, setCurrentImageHeight] = useState('')
  const [currentVideoDuration, setCurrentVideoDuration] = useState('')

  // 如果不是 view mode 就用 formik values 的 assetSize 來算圖片寬高或影片長度
  useEffect(() => {
    if (!isEmpty(assetSize)) {
      if (assetFormatType === 'image') {
        const { imageWidth, imageHeight } = getImageSize(assetSize)

        setCurrentImageWidth(imageWidth)
        setCurrentImageHeight(imageHeight)
      } else {
        const { videoDuration } = getVideoSize(assetSize)

        setCurrentVideoDuration(videoDuration)
      }
    }
  }, [assetFormatType, assetSize])

  const clearFileInput = () => {
    fileInput.current.value = ''
  }

  const handleFiles = files => {
    if (!isMultipleUpload && files.length !== 1) return alert('Only upload one file!!')

    if (!files) return

    onUploadFileSelected(files, clearFileInput)
    fileInput.current.value = null
  }

  const onDrop = event => {
    const dataTransfer = event.dataTransfer
    const files = dataTransfer.files
    const fileList = Object.values(files)

    handleFiles(fileList)
  }

  const dropBoxProps = {
    onClick: () => {
      fileInput.current.click()
    },
    onDragEnter: start(stopPropagation).end(preventDefault),
    onDragOver: start(stopPropagation).end(preventDefault),
    onDrop: start(stopPropagation)
      .next(preventDefault)
      .end(onDrop),
  }

  return { imageWidth: currentImageWidth, imageHeight: currentImageHeight, videoDuration: currentVideoDuration, dropBoxProps, handleFiles }
}

export default useMediaEffect
