import styled, { setLabel } from 'utils/styled'

export default props => ({
  measuresOfPerformance() {
    return setLabel(styled.rem`
      height: auto;
      margin-bottom: 44px;
    `)
  },
})
