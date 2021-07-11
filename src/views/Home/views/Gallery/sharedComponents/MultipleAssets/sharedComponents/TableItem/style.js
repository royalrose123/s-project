import styled, { setLabel } from 'utils/styled'

export default props => ({
  tableItem(width, isFixed, isHeader, index) {
    const isFirstField = index === 0

    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: ${`${width}px`};
      height: ${isHeader ? '40px' : 'auto'};
      min-height: 40px;
      color: #2c313a;
      padding: ${isFirstField ? '4px 16px' : '4px 20px'};
      background-color: ${isHeader ? '#e3e7ed' : isFirstField ? '#F8F7F7' : '#ffffff'};
      font-weight: ${isHeader ? '600' : 'initial'};
      position: ${isFixed ? 'sticky' : 'initial'};
      left: ${isFixed ? (isFirstField ? '0px' : '33px') : 'initial'};
      top: ${isFixed ? '0' : 'initial'};
      z-index: ${isFixed ? (isHeader ? 5 : 3) : 0};
      border-right: ${isFixed ? (isHeader ? 'solid 1px #e3e7ed' : 'solid 1px #d8d8d8') : 'none'};
      overflow: hidden;
    `)
  },
})
