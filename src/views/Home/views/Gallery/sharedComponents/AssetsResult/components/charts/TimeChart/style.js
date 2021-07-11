import styled, { setLabel } from 'utils/styled'

export default props => ({
  timeChartWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      border: solid 1px #b9b9b9;
      background: #fff;
      margin-top: 10px;
      height: auto;
      position: relative;
    `)
  },

  timeChart() {
    return setLabel(styled.rem`
      width: 100%;
      height: 200px;
      margin: 0 auto;
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

  toggleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
    `)
  },
})
