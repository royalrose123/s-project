import styled, { setLabel } from 'utils/styled'

export default props => ({
  header(isLight) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      background-color: ${isLight ? '#ffffff' : '#586274'};
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 1px 0 rgba(88, 98, 116, 0.2);
      color: ${isLight ? '#2c313a' : '#ffffff'};
      z-index: 20;
    `)
  },
})
