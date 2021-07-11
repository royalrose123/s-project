import styled, { setLabel } from 'utils/styled'

export default props => ({
  campaignInfo() {
    return setLabel(styled.rem`
      overflow: scroll;
      border: 1px solid #d8d8d8;
    `)
  },
})
