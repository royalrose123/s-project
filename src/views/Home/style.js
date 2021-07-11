import styled, { setLabel } from 'utils/styled'

export default props => ({
  home() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      overflow: hidden;
    `)
  },
})
