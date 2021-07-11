// Libs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useMediaSizeEffect from './hooks/useMediaSizeEffect'
import { isEmpty, uniqueId } from 'lodash'

// Components
import Video from 'basicComponents/Video'
import PreviewMedia from './components/PreviewMedia'
import Html5Image from 'assets/icons/img/HTML5.png'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  fileFormat: PropTypes.string,
  fileUrl: PropTypes.string,
  duration: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMediaItemRemove: PropTypes.func,
  isMultipleUpload: PropTypes.bool,
  hasPreviewMedia: PropTypes.bool,
  fileAction: PropTypes.string,
  currentFileList: PropTypes.array,
}

// DefaultProps
export const defaultProps = {
  index: 0,
  fileFormat: '',
  duration: '',
  width: 0,
  height: 0,
}

function MediaItem(props) {
  const {
    index,
    fileFormat,
    fileUrl,
    duration,
    width,
    height,
    onMediaItemRemove,
    isMultipleUpload,
    hasPreviewMedia,
    fileAction,
    currentFileList,
  } = props

  const style = getStyle(props)

  const [isDialogShown, setIsDialogShown] = useState(false)

  const isImage = fileFormat === 'image'
  const isVideo = fileFormat === 'video'
  const isHtml5 = fileFormat === 'html5'

  const hasFileAction = !isEmpty(fileAction)

  // media thumbnail 寬高
  const { mediaWidth: mediaPreviewWidth, mediaHeight: mediaPreviewHeight } = useMediaSizeEffect({
    maxMediaWidth: isMultipleUpload ? 205 : hasFileAction ? 520 : 420,
    maxMediaHeight: isMultipleUpload ? 120 : 250,
    src: fileUrl,
    mediaType: fileFormat,
    width,
    height,
  })

  const onPreviewBoxClick = event => {
    event.stopPropagation()

    const hasMedia = Boolean(fileUrl)

    hasMedia && setIsDialogShown(true)
  }

  return (
    <>
      <div css={style.mediaItemWrapper(isMultipleUpload, hasFileAction)} onClick={onPreviewBoxClick}>
        {!hasPreviewMedia && (
          <button css={style.removeButton(isMultipleUpload)} onClick={onMediaItemRemove} data-index={index}>
            x
          </button>
        )}

        {isVideo && (
          <>
            <div css={style.iconWrap(isMultipleUpload)}>
              <h4 css={style.iconTitle()}>{`Video Length: ${duration} sec`}</h4>
            </div>
            <div>
              <Video
                id={`previewVideo-${uniqueId()}`}
                src={fileUrl}
                sources={[
                  {
                    src: fileUrl,
                    type: hasPreviewMedia ? '' : 'video/mp4',
                    preload: 'metadata',
                  },
                ]}
                customSetting={{ controls: false, width: isMultipleUpload ? 205 : 420, height: isMultipleUpload ? 120 : 250 }}
              />
            </div>
          </>
        )}

        {isImage && (
          <>
            <div css={style.iconWrap(isMultipleUpload)}>
              <h4 css={style.iconTitle()}>{`Image Size: W${width} x H${height}`}</h4>
            </div>
            <img css={style.mediaItem(mediaPreviewWidth, mediaPreviewHeight)} src={fileUrl} />
          </>
        )}

        {isHtml5 && <img css={style.mediaItem(mediaPreviewWidth, mediaPreviewHeight)} src={Html5Image} />}
      </div>

      {isDialogShown && (
        <PreviewMedia
          index={index}
          mediaInfo={{ fileFormat, fileUrl, width, height }}
          currentFileList={currentFileList}
          isDialogShown={isDialogShown}
          setIsDialogShown={setIsDialogShown}
          isMultipleUpload={isMultipleUpload}
          hasPreviewMedia={hasPreviewMedia}
        />
      )}
    </>
  )
}

MediaItem.propTypes = propTypes
MediaItem.defaultProps = defaultProps

export default MediaItem
