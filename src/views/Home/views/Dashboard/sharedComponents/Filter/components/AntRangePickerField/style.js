import styled, { setLabel } from 'utils/styled'

export default props => ({
  dateType(isActive) {
    return setLabel(styled.rem`
      background: ${isActive ? '#4ea7e8' : '#e5ebed'};
      color: ${isActive ? '#ffffff' : '#747a8d'};
      border-radius: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      margin-right: 10px;
      width: 65px;
      height: 40px;
      cursor: pointer;
      /* transition: 0.5s; */
    `)
  },
})
