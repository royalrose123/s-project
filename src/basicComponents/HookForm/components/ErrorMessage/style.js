import styled, { setLabel } from 'utils/styled'
import variables from 'styles/variables'

const { colorsError } = variables

export default props => ({
  errorMessageWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      position: relative;
    `)
  },

  errorBorder() {
    return setLabel(styled.rem`
      position: absolute;
      left: 0;
      top: -1px;
      width: 100%;
      height: 1px;
      background: ${colorsError};
    `)
  },

  errorMessage() {
    return setLabel(styled.rem`
      color: ${colorsError};
      font-size: 14px;
      padding-top: 2px;
    `)
  },
})
