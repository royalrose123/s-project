import styled, { setLabel } from 'utils/styled'

export default props => ({
  dashboardOuter() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      display: block;
    `)
  },

  spacer() {
    return setLabel(styled.rem`
      width: 100%;
      height: 97px;
      background: rgb(60, 69, 85);
    `)
  },

  dashboardWrapper() {
    return setLabel(styled.rem`
      padding: 0px 60px 60px 60px;
      width: 100%;
      height: calc(100% - 97px);
      background: rgb(60, 69, 85);
      //overflow: scroll;
      overflow-x: hidden;
      overflow-y: scroll;
      z-index: 9;
    `)
  },

  tabWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      height: 97px;
      position: absolute;
      z-index: 10;
      left: 0;
      //right: 20px; // 避免擋住 scrollbar
      background: rgb(60, 69, 85);
      padding: 0 60px;
      align-items: center;
    `)
  },

  tab(isActive = false) {
    return setLabel(styled.rem`
      color: ${isActive ? '#ffffff' : 'rgb(196,199,204)'};
      padding: 10px;
      border-bottom: ${isActive ? '3px solid #4ea7e8' : '3px solid transparent'};
      cursor: pointer;
      margin-right: 10px;
      font-size: 18px;
      font-weight: 600;
      transition: 0.5s;
    `)
  },

  loadingDiv() {
    return setLabel(styled.rem`
      width: 100%;
      height: 682px;
      margin-bottom: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #586274;
    `)
  },
})
