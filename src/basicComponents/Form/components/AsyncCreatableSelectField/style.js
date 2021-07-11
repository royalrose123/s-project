import styled, { setLabel } from 'utils/styled'

export default props => ({
  wrapper() {
    return setLabel(styled.rem`
      position: relative;
    `)
  },

  maxLength() {
    return setLabel(styled.rem`
      position: absolute;
      top: -25px;
      right: 0;
      font-size: 12px;
      color: #9b9b9b;
    `)
  },
})
