import styled, { setLabel } from 'utils/styled'
import { itemStyle } from './sharedStyle'

export default (props, isPopoverExpand) => ({
  uploadPopover(isUploadFixed) {
    return setLabel(styled.rem`
      position: fixed;
      right: ${isUploadFixed ? '50%' : '25px'};
      bottom: ${isUploadFixed ? '60%' : '25px'};
      transform: ${isUploadFixed ? 'translate(50%, 0%)' : 'initial'};
      width: ${isUploadFixed ? '600px' : isPopoverExpand ? '400px' : '60px'};
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      z-index: 100;
    `)
  },

  uploadPopoverCover() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.3);
    `)
  },

  uploadList() {
    return setLabel(styled.rem`
      display: ${isPopoverExpand ? 'block' : 'none'};
      max-height: 480px;
      overflow-y: scroll;
    `)
  },

  header() {
    return setLabel(styled.rem`
      background: #26334d;
      color: #fff;
      padding: 16px 30px;
      justify-content: ${isPopoverExpand ? 'space-between' : 'center'};
      ${itemStyle}
    `)
  },

  closeIcon() {
    return setLabel(styled.rem`
      cursor: pointer;
    `)
  },
})
