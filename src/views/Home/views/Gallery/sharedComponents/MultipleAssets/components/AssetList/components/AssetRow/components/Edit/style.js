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

  tableItemWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #ffffff;
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
      align-items: center;
      justify-content: space-between;
      width: 100%;
    `)
  },

  fileInfoWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
    `)
  },

  content() {
    return setLabel(styled.rem`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      line-height: 18px;
      word-break: break-all;
    `)
  },

  runningDateWrapper(width) {
    return setLabel(styled.rem`
      width: ${`${width}px`};
      display: flex;
      flex-direction: row;
      position: relative;

      &:before {
        content: '';
        content: '';
        position: absolute;
        bottom: 4px;
        left: 19px;
        width: 241px;
        border-bottom: 1px solid #ddd;
        display: inline-block;
        z-index: 2;
      }
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

  tagsWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      min-height: 38px;
      height: 100%;
      border-bottom: 0.0625rem solid #ddd;
      display: flex;
      align-items: center;
      line-height: 20px;
      padding: 4px;

      &:focus {
        outline: none;
        box-shadow: rgba(16, 112, 202, 0.14) 0px 0px 0px 3px, rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset,
          rgba(67, 90, 111, 0.14) 0px -1px 1px 0px inset;
        border-radius: 3px;
      }
    `)
  },

  tagsPlaceholder() {
    return setLabel(styled.rem`
      color: #696969;
      font-size: 14px;
    `)
  },

  select() {
    return setLabel(styled.rem`
      width: 100%;
    `)
  },

  textarea() {
    return setLabel(styled.rem`
      width: 100%;
    `)
  },

  datePickerInput() {
    return setLabel(styled.rem`
      width: 100%;
      height: 27px;
    `)
  },

  datePickerDash() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      color: #222;
      background-color: #ffffff;
    `)
  },
})
