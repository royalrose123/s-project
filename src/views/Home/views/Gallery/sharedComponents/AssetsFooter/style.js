import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetsFooterWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: fixed;
      left: 0px;
      bottom: 0px;
      border-top: 1px solid #a7a7a7;
      background-color: #ffffff;
    `)
  },

  assetsFooter(isWithout24HoursByNoEdit) {
    return setLabel(styled.rem`
      width: 950px;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: ${isWithout24HoursByNoEdit ? 'space-between' : 'flex-end'};
    `)
  },

  button() {
    return setLabel(styled.rem``)
  },

  footerMessage() {
    return setLabel(styled.rem`
      color: #2c313a;
      position: relative;
    `)
  },

  assetDescriptionWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      margin-left: 4px;
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
