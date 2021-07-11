import styled, { setLabel } from 'utils/styled'

export default props => ({
  comparisonWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      position: relative;
    `)
  },
})
