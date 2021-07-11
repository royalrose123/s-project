import styled, { setLabel } from 'utils/styled'

export default props => ({
  quicksightDashboard() {
    return setLabel(styled.rem`
      height: calc(100% - 54px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #586274;
    `)
  },
})
