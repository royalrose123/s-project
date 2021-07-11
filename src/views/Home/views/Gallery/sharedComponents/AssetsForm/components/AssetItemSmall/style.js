import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetItemSmall() {
    return setLabel(styled.rem`
      position: relative;
      width: 195px;
      display: inline-block;
      margin-bottom: 30px;
    `)
  },
})
