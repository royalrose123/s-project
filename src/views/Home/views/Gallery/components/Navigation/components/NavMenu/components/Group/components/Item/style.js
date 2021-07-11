import styled, { setLabel } from 'utils/styled'

export default props => ({
  menuItem(isActive) {
    return setLabel(styled.rem`
      font-size: 14px;
      cursor: pointer;
      background-color: ${isActive ? 'black' : 'transparent'};
      color: ${isActive ? 'white' : 'black'};
      padding: 5px 0;

      :hover {
        background-color: ${isActive ? 'black' : 'rgba(0, 0, 0, 0.1)'};
        color: ${isActive ? 'white' : 'black'};
      }

      :focus {
        outline: none;
      }
    `)
  },

  menuItemName(isProgram) {
    return setLabel(styled.rem`
      padding-left: ${isProgram ? '0px' : '16px'};
      display: block;
      word-break: break-all;
    `)
  },

  menuCampignList(isOpen) {
    return setLabel(styled.rem`
      display: ${isOpen ? 'block' : 'none'};
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
