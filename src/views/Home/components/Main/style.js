import styled, { setLabel } from 'utils/styled'

export default props => ({
  main() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      width: 100%;
      height: calc(100% - 47px);
    `)
  },
})
