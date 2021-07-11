import styled, { setLabel } from 'utils/styled'

export default props => ({
  resultsFooter() {
    return setLabel(styled.rem`
      width: 100%;
      height: 64px;
      border-top: 1px solid #a7a7a7;
      position: absolute;
      background-color: #ffffff;
      bottom: 0px;
      left: 0px;
      z-index: 10;
    `)
  },

  buttonWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      width: 958px;
      height: inherit;
      margin: auto;
      padding: 12px;
    `)
  },

  button() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: center;
      margin: 4px;
      width: 108px;
    `)
  },

  itemText() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      text-align: center;
      cursor: pointer;
    `)
  },

  itemIcon() {
    return setLabel(styled.rem`
      margin-right: 6px;
      padding-top: 5px;
    `)
  },
})
