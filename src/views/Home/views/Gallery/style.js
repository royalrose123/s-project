import styled, { setLabel } from 'utils/styled'

export default props => ({
  galleryWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      flex-direction: row;
    `)
  },

  gallery() {
    return setLabel(styled.rem`
      width: calc(100% - 250px);
      height: auto;
      background-color: #ffffff;
      padding: 30px 40px;
      overflow-y: hidden;
      position: relative;
    `)
  },

  inputButtonWrapper(isShowTop) {
    return setLabel(styled.rem`
      display: flex;
      opacity: ${isShowTop ? '1' : '0'};
      height: ${isShowTop ? '40px' : '0px'};
      margin: ${isShowTop ? '16px 0px' : '0px'};

      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      transition: 0.5s;
    `)
  },

  buttonWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  tabs() {
    return setLabel(styled.rem`
      width: 100%;
    `)
  },

  tabsList(isShowTop) {
    return setLabel(styled.rem`
      display: flex;
      opacity: ${isShowTop ? '1' : '0'};
      height: ${isShowTop ? '40px' : '0px'};
      align-items: center;
      width: 100%;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      transition: 0.5s;
    `)
  },

  tabsListItem(isActive) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 36px;
      position: relative;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 600;
      background-color: transparent;
      border: none;
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translateY(100%);
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${isActive ? '#000000' : 'transparent'};
      }
    `)
  },

  tabsItemIcon(width) {
    return setLabel(styled.rem`
      width: ${width ? `${width}px` : '15px'};
      height: 15px;
      margin-right: 10px;
    `)
  },

  tabsPanelList() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `)
  },

  tabsPanelItem() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
    `)
  },

  mediaWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      height: 100%;
    `)
  },

  collection() {
    return setLabel(styled.rem`
      &:focus {
        outline: none;
      }
    `)
  },

  listEnd() {
    return setLabel(styled.rem`
      position: absolute;
      width: 120px;
      height: 200px;
      bottom: 0px;
      z-index: -1;
    `)
  },

  spinnerWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      min-height: calc(100vh - 184px);
      display: flex;
      align-items: center;
      justify-content: center;
    `)
  },

  spinner() {
    return setLabel(styled.rem`
      position: static;
    `)
  },

  itemText() {
    return setLabel(styled.rem`
      color: #2c313a;
      cursor: pointer;
    `)
  },

  uploadMenu() {
    return setLabel(styled.rem`
      display: flex;
    `)
  },

  uploadButton() {
    return setLabel(styled.rem`
      margin-left: 16px;
    `)
  },

  itemIconWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
    `)
  },

  itemIcon() {
    return setLabel(styled.rem`
      width: 18px;
      height: 18px;
      margin-right: 6px;
    `)
  },

  actionButton() {
    return setLabel(styled.rem`
      justify-content: center;
      margin: 4px;
    `)
  },

  actionFooter(showActionFooter) {
    return setLabel(styled.rem`
      width: 100%;
      height: auto;
      background: #fff;
      position: fixed;
      transition: 0.5s;
      left: 0;
      right: 0;
      bottom: ${showActionFooter ? 0 : '-100px'};
      box-shadow: 0 6px 16px 0 #dddfe7;
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 106px 16px 256px;
    `)
  },

  rightButtonGroup() {
    return setLabel(styled.rem`
      display: flex;
    `)
  },

  selectTextWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 150px;
      align-items: center;
    `)
  },
})
