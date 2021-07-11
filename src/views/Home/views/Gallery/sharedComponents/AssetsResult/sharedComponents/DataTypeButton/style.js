import styled, { setLabel } from 'utils/styled'

export default props => ({
  dataTypeButton(isActive) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 20px;
      background: ${isActive ? '#2c313a' : '#ffffff'};
      cursor: pointer;
      border: solid 1px #b9b9b9;
      padding: 8px 28px;
      margin-right: -1px;
    `)
  },

  dataTypeTitle(isActive) {
    return setLabel(styled.rem`
      color: ${isActive ? '#ffffff' : '#2c313a'};
      font-size: 12px;
    `)
  },
})
