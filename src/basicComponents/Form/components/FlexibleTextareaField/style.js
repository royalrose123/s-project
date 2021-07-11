import styled, { setLabel } from 'utils/styled'

export default props => ({
  textareaWrapper() {
    return setLabel(styled.rem`
      position: relative;
      width: 100%;
    `)
  },

  maxLength(isMultiple) {
    return setLabel(styled.rem`
      position: absolute;
      top: ${isMultiple ? '-2px' : '-25px'};
      right: 0;
      font-size: 12px;
      color: #9b9b9b;
    `)
  },

  checkbox(hasError) {
    return setLabel(styled.rem`
      position: absolute;
      width: auto;
      margin-right: 0px;
      right: 0px;
      bottom: ${hasError ? '-2px' : '-20px'};
    `)
  },
})
