import styled, { setLabel } from 'utils/styled'

export default props => ({
  accessToken() {
    return setLabel(styled.rem`
      word-break: break-all;
      height: 100%;
      cursor: pointer;
    `)
  },

  textareaWrapper() {
    return setLabel(styled.rem`
      pointer-events: none;
      width: 100%;
      height: 100%;
    `)
  },

  textArea() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      font-size: 16px;
      border: 0;
      resize: none;

      &:focus {
        outline: 0;
      }
    `)
  },
})
