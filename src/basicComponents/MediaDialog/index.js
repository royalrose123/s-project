// Libs
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// Components
import Video from 'basicComponents/Video'
import DialogWithClassName from '../DialogWithClassName'
import useMediaSrcEffect from './hooks/useMediaSrcEffect'
import useMediaSizeEffect from './hooks/useMediaSizeEffect'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  videoFormat: PropTypes.string,
  assetFormatType: PropTypes.string,
  videoWithoutHlsSrc: PropTypes.string,
  src: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  onMediaSizeChanged: PropTypes.func,
  previewBoxCss: PropTypes.object,
}

// DefaultProps
export const defaultProps = {
  src: '',
  mediaType: '',
  videoFormat: '',
}

function MediaDialog(props) {
  const { mediaType, onMediaSizeChanged, previewBoxCss, videoWithoutHlsSrc, src: newSrc, assetFormatType, videoFormat } = props

  const imageRef = useRef(null)
  const assetType = !isEmpty(mediaType) ? mediaType : assetFormatType
  const { src, size, duration, isRenderPreviewImage, isRenderPreviewVideo } = useMediaSrcEffect(
    newSrc,
    videoWithoutHlsSrc,
    assetType,
    onMediaSizeChanged,
  )

  const { mediaWidth: mediaDialogWidth, mediaHeight: mediaDialogHeight } = useMediaSizeEffect({
    maxMediaWidth: 1020,
    maxMediaHeight: 520,
    src,
    mediaType: assetType,
  })

  const { mediaWidth: mediaPreviewWidth, mediaHeight: mediaPreviewHeight } = useMediaSizeEffect({
    maxMediaWidth: 420,
    maxMediaHeight: 250,
    src,
    mediaType: assetType,
  })

  const [isDialogShown, setIsDialogShown] = useState(false)
  const style = getStyle(props, { isImageHorizontal: mediaDialogWidth > mediaDialogHeight })
  const hasVideoFormat = Boolean(videoFormat)

  const onPreviewBoxClick = () => {
    const hasMedia = Boolean(src)

    hasMedia && setIsDialogShown(true)
  }

  return (
    <>
      <div css={[style.previewBox(), previewBoxCss]} onClick={onPreviewBoxClick}>
        {isRenderPreviewVideo && (
          <div>
            <div css={style.iconWrap()}>
              <h4 css={style.iconTitle()}>{duration}</h4>
            </div>
            <Video
              id='previewVideo'
              sources={[
                {
                  src,
                  ...(hasVideoFormat && { type: videoFormat }),
                },
              ]}
              customSetting={{ controls: false, width: 420, height: 250 }}
            />
          </div>
        )}

        {isRenderPreviewImage && (
          <>
            <div css={style.iconWrap()}>
              <h4 css={style.iconTitle()}>{size}</h4>
            </div>
            <img ref={imageRef} src={src} css={style.previewImage(mediaPreviewWidth, mediaPreviewHeight)} />
          </>
        )}
      </div>

      <DialogWithClassName
        hasFooter={false}
        minHeightContent={560}
        preventBodyScrolling
        isShown={isDialogShown}
        onCloseComplete={() => setIsDialogShown(false)}
        style={{ width: Math.round(mediaDialogWidth + 80), height: Math.round(mediaDialogHeight + 80) }}
        css={style.mediaDialog(mediaDialogWidth, mediaDialogHeight)}
      >
        {assetType === 'video' && (
          <Video
            id='playVideo'
            sources={[
              {
                src,
                ...(hasVideoFormat && { type: videoFormat }),
              },
            ]}
            customSetting={{
              controlBar: true,
              width: mediaDialogWidth,
              height: mediaDialogHeight,
            }}
          />
        )}
        {assetType === 'image' && <img src={src} />}
      </DialogWithClassName>
    </>
  )
}

MediaDialog.propTypes = propTypes
MediaDialog.defaultProps = defaultProps

export default MediaDialog
