import styled, { setLabel } from 'utils/styled'

export default props => ({
  errorMessageWrapper() {
    return setLabel(styled.rem`
      margin-top: 16px;
    `)
  },

  errorMessageRow() {
    return setLabel(styled.rem`
      margin: 10px 0;
      color: red;
    `)
  },
})
