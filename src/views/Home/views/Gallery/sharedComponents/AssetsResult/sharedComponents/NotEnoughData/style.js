import styled, { setLabel } from 'utils/styled'

export default props => ({
  notEnoughDataWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100% - 60px);
      min-height: 220px;
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 12px;
      margin-bottom: 8px;
      background-color: #f1f1f1;
      color: #2c313a;
    `)
  },

  notEnoughDataTitle() {
    return setLabel(styled.rem`
      font-size: 18px;
      font-weight: bold;
      margin: 6px;
    `)
  },

  notEnoughDataContent() {
    return setLabel(styled.rem`
      padding: 0 24px;
      font-size: 16px;
      line-height: 18px;
    `)
  },
})
