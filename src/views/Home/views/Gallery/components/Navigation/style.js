import styled, { setLabel } from 'utils/styled'

export default props => ({
  navigation() {
    return setLabel(styled.rem`
      width: 260px;
      min-width: 260px;
      height: auto;
      background-color: #ffffff;
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      overflow-y: scroll;
      overflow-x: hidden;
      padding-top: 36px;
    `)
  },

  quicksightWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      background-color: transparent;
      color: black;
      padding: 16px;
      height: 24px;
      margin-top: 80px;
      border-top: 1px solid black;

      :hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
      }

      :focus {
        outline: none;
      }
    `)
  },

  navLink() {
    return setLabel(styled.rem`
      text-decoration: none;
      color: #2c313a;

      :hover {
        color: #2c313a;
      }

      :focus {
        outline: none;
      }
    `)
  },
})
