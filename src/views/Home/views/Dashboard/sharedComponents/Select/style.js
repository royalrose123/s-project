import styled, { setLabel } from 'utils/styled'

export default props => ({
  selectButton() {
    return setLabel(styled.rem`
      width: 180px;
      height: 40px;
      font-size: 12px;
      font-weight: 600;
      color: #01579b;
      display: flex;
      justify-content: center;
    `)
  },
})
