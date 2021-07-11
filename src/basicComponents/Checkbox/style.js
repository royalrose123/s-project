import styled, { setLabel } from 'utils/styled'

export default props => ({
  checkbox() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 16px;
      width: 160px;
      margin-right: 24px;
    `)
  },

  checkboxInput() {
    return setLabel(styled.rem`
      display: none;
    `)
  },

  checkboxName(disabled) {
    return setLabel(styled.rem`
      font-size: 14px;
      color: #2c313a;
      line-height: 16px;
      opacity: ${disabled ? 0.4 : 1};
    `)
  },
})
