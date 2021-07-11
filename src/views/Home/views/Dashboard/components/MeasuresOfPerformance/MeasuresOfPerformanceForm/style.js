import styled, { setLabel } from 'utils/styled'

export default props => ({
  actionWrapper() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26px;
    `)
  },

  programFilterButton() {
    return setLabel(styled.rem`
      background: #e5ebed;
      //box-shadow: none;
      color: #01579b;
      transition: 0.4s;
      width: auto;
      height: 40px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 16px;
    `)
  },

  programFilterButtonIcon() {
    return setLabel(styled.rem`
      margin-left: 21px;
    `)
  },

  timeFilterWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      margin-bottom: 21px;
    `)
  },

  datePicker() {
    return setLabel(styled.rem`
      padding: 5px;
      border-radius: 50px;
      background: #ffffff;
      margin-right: 10px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    `)
  },

  dateFilter(isActive = false) {
    return setLabel(styled.rem`
      background: ${isActive ? '#4ea7e8' : '#e5ebed'};
      color: ${isActive ? '#ffffff' : '#747a8d'};
      border-radius: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      margin-left: 10px;
      height: 40px;
      cursor: pointer;
      transition: 0.5s;
    `)
  },

  overflowMaskLeft() {
    return setLabel(styled.rem`
      height: 100%;
      width: 500px;
      position: absolute;
      background: rgb(60, 69, 85);
      top: 0;
      left: -500px;
      z-index: 5;
    `)
  },

  overflowMaskRight() {
    return setLabel(styled.rem`
      height: 100%;
      width: 500px;
      position: absolute;
      background: rgb(60, 69, 85);
      top: 0;
      right: -500px;
      z-index: 5;
    `)
  },
})
