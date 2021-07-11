import styled, { setLabel } from 'utils/styled'

export default props => ({
  menu(width, xOffset, yOffset) {
    const selectHeight = 38
    const itemPadding = 20

    return setLabel(styled.rem`
      width: ${`${width - itemPadding * 2}px`};
      left: ${`${xOffset + itemPadding}px`};
      top: ${`${yOffset + selectHeight}px`};
      z-index: 10;
    `)
  },
})
