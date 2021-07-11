import styled, { setLabel } from 'utils/styled'

export default props => ({
  toolbarItemWrapper(isDarkMode, active) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 108px;
      height: 68px;
      position: relative;
      cursor: pointer;

      background-color: ${isDarkMode ? (active ? '#ffffff' : '#586274') : active ? '#586274' : '#ffffff'};

      &:hover {
        background-color: #4ea7e8;
      }
    `)
  },

  toolbarItemIcon(isDarkMode, active) {
    return setLabel(styled.rem`
      color: ${isDarkMode ? (active ? '#586274' : '#ffffff') : active ? '#ffffff' : '#586274'};
      stroke: ${isDarkMode ? (active ? '#586274' : '#ffffff') : active ? '#ffffff' : '#586274'};
    `)
  },

  toolbarItemLabel(isDarkMode, active) {
    return setLabel(styled.rem`
      font-size: 10px;
      font-weight: 600;
      margin-top: 4px;
      color: ${isDarkMode ? (active ? '#586274' : '#ffffff') : active ? '#ffffff' : '#586274'};
    `)
  },

  toolbarItemUnderline(isDarkMode, isLastOne) {
    return setLabel(styled.rem`
      width: 40px;
      height: ${isLastOne ? '0px' : '1px'};
      background-color: ${isDarkMode ? '#ffffff' : '#586274'};
      position: absolute;
      bottom: 0px;
    `)
  },
})
