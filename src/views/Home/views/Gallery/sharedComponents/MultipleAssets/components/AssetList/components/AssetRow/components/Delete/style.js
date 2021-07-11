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
      cursor: pointer;
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

  content(hasCheckbox) {
    return setLabel(styled.rem`
      margin-left: ${hasCheckbox ? '16px' : '0px'};
      line-height: 18px;
      word-break: break-all;
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

  deleteCheckbox() {
    return setLabel(styled.rem`
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      margin: 0;
      background: #fff;
      border-radius: 3px;
      padding: 1px;
    `)
  },
})
