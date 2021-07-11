import styled, { setLabel } from 'utils/styled'
import variables from 'styles/variables'

const { colorsError } = variables

export default props => ({
  errorMessageWrapper() {
    return setLabel(styled.rem`
      position: relative;
    `)
  },

  errorBorder() {
    return setLabel(styled.rem`
      position: absolute;
      left: 0;
      top: -4px;
      width: 100%;
      height: 1px;
      background: ${colorsError};
    `)
  },

  errorMessage() {
    return setLabel(styled.rem`
      margin-top: 3px;
      color: ${colorsError};
      font-size: 14px;
    `)
  },
})
