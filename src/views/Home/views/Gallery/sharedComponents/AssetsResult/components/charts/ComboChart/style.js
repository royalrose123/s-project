import styled, { setLabel } from 'utils/styled'

export default props => ({
  comboChartWrapper() {
    return setLabel(styled.rem`
      height: auto;
      border: solid 1px #b9b9b9;
      margin-top: 10px;
      background: #fff;
      position: relative;
    `)
  },

  comboChart() {
    return setLabel(styled.rem`
      height: 159px;
      width: 100%;
    `)
  },

  chartTitle() {
    return setLabel(styled.rem`
      color: #2c313a;
      font-weight: bold;
      font-size: 14px;
      display: inline-block;
      width: auto;
      height: 19px;
      margin: 15px auto 0 15px;
    `)
  },

  dataTypeButtonWrapper() {
    return setLabel(styled.rem`
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
    `)
  },

  labelWrapper() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 8px;
    `)
  },

  infoIcon() {
    return setLabel(styled.rem`
      width: 10px;
      margin-left: 2px;
      color: #9b9b9b;
      font-size: 10px;
      cursor: default;
    `)
  },

  popover() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      width: 220px;
      height: auto;
      padding: 8px 16px;
    `)
  },

  popoverTitle() {
    return setLabel(styled.rem`
      color: #2c313a;
      font-size: 12px;
    `)
  },

  detail() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      font-size: 10px;
      margin: 8px 0;
    `)
  },
})
