import styled, { setLabel } from 'utils/styled'

export default props => ({
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

  arrowIconWrapper(isPrev = true) {
    return setLabel(styled.rem`
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: ${isPrev ? '20px' : 'initial'};
      right: ${isPrev ? 'initial' : '20px'};
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      z-index: 30;
    `)
  },

  arrowIcon(isPrev = true) {
    return setLabel(styled.rem`
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: rotateZ(${isPrev ? 0 : '180deg'});
      fill: #ffffff;
    `)
  },
})
