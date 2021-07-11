import styled, { setLabel } from 'utils/styled'

export default props => ({
  tableHeaderRow() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      background-color: #e3e7ed;
      position: sticky;
      top: 0;
      z-index: 3;
      border-bottom: 1px solid #d8d8d8;
      border-right: 1px solid #d8d8d8;
    `)
  },
})
