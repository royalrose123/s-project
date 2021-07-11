import styled, { setLabel } from 'utils/styled'

export default props => ({
  campaignInfoRow() {
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
})
