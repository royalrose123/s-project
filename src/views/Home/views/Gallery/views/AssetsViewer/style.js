import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetIdWrapper() {
    return setLabel(styled.rem`
      position: absolute;
      z-index: 4;
      display: flex;
      width: 100%;
      background: #fff;
      justify-content: center;
      left: 0;
      top: 50px;
      border-bottom: 1px solid #a7a7a7;
      align-items: center;
      padding-bottom: 13px;
    `)
  },

  liveIcon(isLive) {
    return setLabel(styled.rem`
      transform: translateX(-12px);
      width: 9px;
      height: 9px;
      background-color: ${isLive ? '#00d563' : '#9b9b9b'};
      border-radius: 50%;
    `)
  },

  assetId() {
    return setLabel(styled.rem`
      font-size: 14px;
      padding-left: 7px;
      transform: translateX(-12px);
      margin: 0;
      font-weight: 700;
      color: #000000;
    `)
  },

  assetIdTitle() {
    return setLabel(styled.rem`
      font-size: 14px;
      padding-left: 7px;
      transform: translateX(-12px);
    `)
  },

  assetMessageWrapper() {
    return setLabel(styled.rem`
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 3;
      width: 926px;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
    `)
  },

  footerMessage() {
    return setLabel(styled.rem`
      color: #2c313a;
      position: relative;
    `)
  },

  disabledButton() {
    return setLabel(styled.rem`
      margin-left: 10px;
      line-height: 32px;
      padding: 2px 17px;
      border-radius: 3px;
      background: #ddd;
      color: #fff;
      z-index: 1;
      cursor: auto;
    `)
  },

  assetDescriptionWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
    `)
  },

  messageDescription() {
    return setLabel(styled.rem`
      color: #2c313a;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
      margin-right: 8px;
    `)
  },
})
