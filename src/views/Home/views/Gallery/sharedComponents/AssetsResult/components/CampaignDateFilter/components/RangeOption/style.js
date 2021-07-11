import styled, { setLabel } from 'utils/styled'

export default props => ({
  rangeOption() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 32px;
      cursor: pointer;
      :hover {
        background-color: rgba(146, 190, 249, 0.6);
      }
    `)
  },

  rangeOptionTitle() {
    return setLabel(styled.rem`
      padding: 0px 16px;
      font-size: 14px;
      color: #2c313a;
    `)
  },
})
