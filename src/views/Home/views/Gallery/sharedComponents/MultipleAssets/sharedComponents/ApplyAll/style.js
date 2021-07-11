import styled, { setLabel } from 'utils/styled'

export default props => ({
  applyAll() {
    return setLabel(styled.rem`
      cursor: pointer;
      margin-left: -14px;
      z-index: 0;
    `)
  },

  popover() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      width: auto;
      height: auto;
      padding: 8px;
      border-radius: 3px;
      background-color: #4ea7e8;
      color: #ffffff;
      position: relative;
    `)
  },

  message() {
    return setLabel(styled.rem`
      font-size: 12px;
      font-weight: 600;
    `)
  },
})
