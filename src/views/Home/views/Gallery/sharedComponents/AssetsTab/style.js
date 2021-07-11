import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetsTabWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 950px;
      margin: auto;
    `)
  },

  assetsTab(isActive, isDisabledResult) {
    return setLabel(styled.rem`
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 150px;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 600;
      color: ${isDisabledResult ? '#979797' : isActive ? 'white' : 'black'};
      background-color: ${isActive ? '#000000' : 'transparent'};
      border: solid 1px #979797;
      margin-right: -1px;
      border-bottom: none;
      cursor: pointer;
    `)
  },

  resultTab(isDisabled) {
    return setLabel(styled.rem`
      color: ${isDisabled ? '#ddd' : '#000'};
      pointer-events: ${isDisabled ? 'none' : 'auto'};
    `)
  },
})
