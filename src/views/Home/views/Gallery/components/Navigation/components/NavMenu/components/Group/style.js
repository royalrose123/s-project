import styled, { setLabel } from 'utils/styled'

export default props => ({
  menuGroupTitle() {
    return setLabel(styled.rem`
      font-size: 14px;
      text-transform: capitalize;
    `)
  },
})
