import styled, { setLabel } from 'utils/styled'

export default (props, { isImageHorizontal }) => ({
  mediaDialog(imageWidth, imageHeight) {
    const dialogHeader = '& > div:first-of-type'
    const closeButton = '& > div:first-of-type button'
    const closeIcon = '& > div:first-of-type svg'
    const dialogBody = '& > div:last-of-type'
    const imageWrapper = '& > div:last-of-type > div'
    const image = '& > div:last-of-type > div > img'

    return setLabel(styled.rem`
      max-width: 1100px;
      max-height: 600px;
      margin: auto;
      border-radius: 0;

      ${dialogHeader} {
        border-bottom: 0;
        height: 40px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;

        button:hover {
          background: none;
        }
      }

      ${closeButton} {
        &:not([disabled]):focus {
          box-shadow: none;
        }
      }

      ${closeIcon} {
        width: 25px;
        height: 25px;
      }

      ${dialogBody} {
        padding-top: 0;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 40px;
      }

      ${imageWrapper} {
        width: ${imageWidth}px;
        height: ${imageHeight}px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      ${image} {
        height: ${imageHeight}px;
        width: ${imageWidth}px;
      }
    `)
  },

  iconWrap() {
    return setLabel(styled.rem`
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
    `)
  },

  iconTitle() {
    return setLabel(styled.rem`
      white-space: nowrap;
      margin: 0;
      color: #ffffff;
      font-weight: 700;
    `)
  },

  previewBox() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      justify-content: center;
      background: black;
      width: 420px;
      height: 250px;
      overflow: hidden;
      cursor: pointer;
    `)
  },

  previewImage(mediaPreviewWidth, mediaPreviewHeight) {
    return setLabel(styled.rem`
      width: ${mediaPreviewWidth}px;
      height: ${mediaPreviewHeight}px;
    `)
  },
})
