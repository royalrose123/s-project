import styled, { setLabel } from 'utils/styled'

export default props => ({
  filter() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
    `)
  },

  rangepickerWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 8px;
    `)
  },

  arrowIcon(isPrev, isInfuture) {
    return setLabel(styled.rem`
      width: 14px;
      height: 14px;
      margin: 4px 8px;
      opacity: ${isInfuture ? '.5' : '1'};
      transform: ${isPrev ? '' : 'rotate(180deg)'};
      cursor: ${isInfuture ? 'not-allowed' : 'pointer'};
      fill: #ffffff;
    `)
  },

  dateTypeWrapper() {
    return setLabel(
      styled.rem`
        display: flex;
        flex-direction: row;
      `,
    )
  },
})
