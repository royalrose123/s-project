import styled, { setLabel } from 'utils/styled'

export default props => ({
  system() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 24px;
      cursor: pointer;
      color: #000000;
    `)
  },

  systemPopover(isDarkMode) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 250px;
      background-color: ${isDarkMode ? '#2c313a' : '#ffffff'};
    `)
  },

  userInfo() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0px 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    `)
  },

  userName(isDarkMode) {
    return setLabel(styled.rem`
      font-size: 18px;
      font-weight: bold;
      color: ${isDarkMode ? '#ffffff' : '#2c313a'};
      margin: 12px 0 3px 0px;
    `)
  },

  userMail() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #9b9b9b;
      margin: 0;
    `)
  },

  userRoleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  userRoleIcon() {
    return setLabel(styled.rem`
      width: 16px;
      height: 16px;
    `)
  },

  userRole() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #469ddd;
      margin: 12px 0 12px 4px;
      font-size: 14px;
    `)
  },

  systemItemWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: 100%;
      min-height: 138px;
      padding: 8px 22px 4px 22px;
    `)
  },

  systemItem() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 8px 16px;
      cursor: pointer;
    `)
  },

  systemItemIconWrapper(isDarkMode, isDashboardIcon) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background-color: ${isDashboardIcon ? '#085187' : isDarkMode ? '#586274' : '#e8e8e8'};
      border-radius: 50%;
    `)
  },

  systemItemIcon(isDarkMode, isMapIcon) {
    return setLabel(styled.rem`
      color: ${isDarkMode ? '#000000' : '#ffffff'};
      fill: ${isDarkMode ? '#ffffff' : '#000000'};
      stroke: ${isMapIcon ? (isDarkMode ? '#ffffff' : '#000000') : 'initial'};
    `)
  },

  systemTitle(isDarkMode, isDashboardIcon) {
    return setLabel(styled.rem`
      margin: 6px;
      font-size: 14px;
      font-weight: bold;
      color: ${isDarkMode ? '#ffffff' : isDashboardIcon ? '#085187' : '#2c313a'};
    `)
  },

  logoutButton(isDarkMode) {
    return setLabel(styled.rem`
      width: 100%;
      height: 40px;
      text-align: center;
      justify-content: center;
      background-color: ${isDarkMode ? '#4ea7e8' : '#000000'};
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    `)
  },

  portalButton(isDarkMode) {
    return setLabel(styled.rem`
      color: ${isDarkMode ? '#ffffff' : '#000000'};
    `)
  },
})
