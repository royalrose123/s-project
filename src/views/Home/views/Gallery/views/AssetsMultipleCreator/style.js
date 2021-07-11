import styled, { setLabel } from 'utils/styled'

export default props => ({
  title() {
    return setLabel(styled.rem`
      font-size: 24px;
      font-weight: normal;
      color: #2c313a;
      text-align: left;
      margin-bottom: 12px;
    `)
  },
})
