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
})
