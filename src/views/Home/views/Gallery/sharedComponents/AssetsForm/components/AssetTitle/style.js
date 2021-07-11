import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetTitle() {
    return setLabel(styled.rem`
      font-weight: bold;
      margin-bottom: 9px;
      min-height: 18px;
    `)
  },
})
