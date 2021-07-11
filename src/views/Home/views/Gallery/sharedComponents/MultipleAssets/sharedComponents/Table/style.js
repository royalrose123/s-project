import styled, { setLabel } from 'utils/styled'

export default props => ({
  table(width) {
    return setLabel(styled.rem`
      width: 100%;
      height: auto;
    `)
  },
})
