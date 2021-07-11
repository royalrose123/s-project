import styled, { setLabel } from 'utils/styled'

export default props => ({
  mapOverview() {
    return setLabel(styled.rem`
      height: auto;
      margin-bottom: 44px;
    `)
  },
})
