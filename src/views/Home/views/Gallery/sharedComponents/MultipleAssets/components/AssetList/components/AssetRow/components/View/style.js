import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetRow() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      background-color: #e3e7ed;
      position: sticky;
      top: 0;
      z-index: 2;
      border-bottom: 1px solid #d8d8d8;
      border-right: 1px solid #d8d8d8;
    `)
  },

  rowIndexWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    `)
  },

  rowIndex() {
    return setLabel(styled.rem`
      font-size: 12px;
    `)
  },

  fileWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
    `)
  },

  content() {
    return setLabel(styled.rem`
      white-space: normal;
      line-height: 18px;
    `)
  },

  fileIconWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      width: 20px;
      height: inherit;
      margin-right: 4px;
    `)
  },
})
