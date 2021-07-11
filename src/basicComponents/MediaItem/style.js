import styled, { setLabel } from 'utils/styled'

export default props => ({
  mediaItemWrapper(isMultipleUpload, hasFileAction) {
    return setLabel(styled.rem`
      width: ${isMultipleUpload ? '205px' : hasFileAction ? '520px' : '420px'};
      height: ${isMultipleUpload ? '120px' : '250px'};
      margin-bottom: ${isMultipleUpload ? '10px' : '0px'};
      margin: ${isMultipleUpload ? '4px' : '0px'};
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
      cursor: pointer;
    `)
  },

  mediaItem(mediaPreviewWidth, mediaPreviewHeight) {
    return setLabel(styled.rem`
      width: ${mediaPreviewWidth}px;
      height: ${mediaPreviewHeight}px;
    `)
  },

  iconWrap(isMultipleUpload) {
    return setLabel(styled.rem`
      position: absolute;
      bottom: ${isMultipleUpload ? '12px' : '30px'};
      transform: translateX(-50%);
      left: 50%;
      color: #fff;
      font-size: ${isMultipleUpload ? '12px' : '16px'};
      padding: ${isMultipleUpload ? '4px' : '10px'};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
    `)
  },

  iconTitle() {
    return setLabel(styled.rem`
      white-space: nowrap;
    `)
  },

  removeButton(isMultipleUpload) {
    return setLabel(styled.rem`
      font-size: ${isMultipleUpload ? '12px' : '16px'};
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      position: absolute;
      right: 8px;
      top: 8px;
      width: ${isMultipleUpload ? '16px' : '20px'};
      height: ${isMultipleUpload ? '16px' : '20px'};
      border-radius: 50%;
      z-index: 1;
      line-height: 16px;
    `)
  },
})
