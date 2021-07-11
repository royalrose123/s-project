import styled, { setLabel } from 'utils/styled'

export default props => ({
  form() {
    return setLabel(styled.rem`
      display: inherit;
      flex: inherit;
      flex-direction: inherit;
      width: inherit;
      height: inherit;
    `)
  },
})
