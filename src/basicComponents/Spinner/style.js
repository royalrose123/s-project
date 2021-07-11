import styled, { setLabel } from 'utils/styled'

export default props => ({
  spinnerWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      background-color: #ffffff;

      position: fixed;
      left: 50%;
      top: calc(50% - 60px);
      z-index: 1000;

      color: white;
    `)
  },
})
