import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Libs
import useMediaSizeEffect from '../../hooks/useMediaSizeEffect'

// Components
import Video from 'basicComponents/Video'
import DialogWithClassName from 'basicComponents/DialogWithClassName'
import Icons from 'assets/icons'
import Html5Image from 'assets/icons/img/HTML5.png'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  isMultipleUpload: PropTypes.bool,
  isDialogShown: PropTypes.bool,
  setIsDialogShown: PropTypes.func,
  index: PropTypes.number,
  mediaInfo: PropTypes.shape({
    fileFormat: PropTypes.string,
    fileUrl: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  currentFileList: PropTypes.array,
  hasPreviewMedia: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  index: 0,
  isMultipleUpload: false,
  mediaInfo: { fileFormat: '', duration: '', width: 0, height: 0, index: 0 },
  currentFileList: [],
}

function PreviewMedia(props) {
  const { index, isDialogShown, setIsDialogShown, isMultipleUpload, mediaInfo, currentFileList, hasPreviewMedia } = props

  const [currentIndex, setCurrentIndex] = useState(index)
  const [currentMediaInfo, setCurrentMediaInfo] = useState(mediaInfo)
  const { fileFormat, fileUrl, width, height } = currentMediaInfo

  const maxIndex = currentFileList.length - 1

  useEffect(() => {
    if (isMultipleUpload) {
      const newCurrentMediaInfo = currentFileList[currentIndex]

      setCurrentMediaInfo(newCurrentMediaInfo)
    }
  }, [currentFileList, currentIndex, isMultipleUpload])

  const style = getStyle(props)

  const isImage = fileFormat === 'image'
  const isVideo = fileFormat === 'video'
  const isHtml5 = fileFormat === 'html5'

  // media popup 寬高
  const { mediaWidth: mediaDialogWidth, mediaHeight: mediaDialogHeight } = useMediaSizeEffect({
    maxMediaWidth: 1020,
    maxMediaHeight: 520,
    src: fileUrl,
    mediaType: fileFormat,
    width,
    height,
  })

  const onNextMediaClick = () => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const onPreviousMediaClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(maxIndex)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <>
      <DialogWithClassName
        hasFooter={false}
        minHeightContent={560}
        preventBodyScrolling
        isShown={isDialogShown}
        onCloseComplete={() => setIsDialogShown(false)}
        style={{ width: Math.round(mediaDialogWidth + 80), height: Math.round(mediaDialogHeight + 80) }}
        css={style.mediaDialog(mediaDialogWidth, mediaDialogHeight)}
      >
        <>
          {isMultipleUpload &&
            ReactDOM.createPortal(
              <div css={style.arrowIconWrapper(true)} onClick={onPreviousMediaClick}>
                <Icons.Arrow css={style.arrowIcon(true)} />
              </div>,
              document.body,
            )}
          {isVideo && (
            <div>
              <Video
                id={`playVideo-${index}`}
                src={fileUrl}
                sources={[
                  {
                    src: fileUrl,
                    type: hasPreviewMedia ? '' : 'video/mp4',
                  },
                ]}
                customSetting={{
                  controlBar: true,
                  width: 1020,
                  height: 520,
                  preload: 'auto',
                }}
              />
            </div>
          )}
          {isImage && <img src={fileUrl} />}
          {isHtml5 && <img src={Html5Image} />}
          {isMultipleUpload &&
            ReactDOM.createPortal(
              <div css={style.arrowIconWrapper(false)} onClick={onNextMediaClick}>
                <Icons.Arrow css={style.arrowIcon(false)} />
              </div>,
              document.body,
            )}
        </>
      </DialogWithClassName>
    </>
  )
}

PreviewMedia.propTypes = propTypes
PreviewMedia.defaultProps = defaultProps

export default PreviewMedia
