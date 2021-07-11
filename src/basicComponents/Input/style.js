import styled, { setLabel } from 'utils/styled'

export default props => ({
  input() {
    return setLabel(styled.rem`
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      border-bottom: 1px solid #ddd;
      box-shadow: none;

      &:focus {
        box-shadow: none;
      }
    `)
  },
})
