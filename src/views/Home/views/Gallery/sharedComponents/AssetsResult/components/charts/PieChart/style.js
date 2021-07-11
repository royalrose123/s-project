import styled, { setLabel } from 'utils/styled'

export default props => ({
  pieChartWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      border: solid 1px #b9b9b9;
      margin-top: 10px;
      position: relative;
    `)
  },

  chartWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;
    `)
  },

  chartTitle() {
    return setLabel(styled.rem`
      color: #2c313a;
      font-weight: bold;
      font-size: 14px;
      margin-top: 12px;
    `)
  },

  pieChart() {
    return setLabel(styled.rem`
      width: 170px;
      height: 150px;
      margin-top: 8px;
    `)
  },

  resultWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      margin-left: 32px;
    `)
  },

  totalTitle() {
    return setLabel(styled.rem`
      margin: 48px 0 4px 0;
      font-size: 12px;
      color: #9b9b9b;
    `)
  },

  totalValue() {
    return setLabel(styled.rem`
      margin-bottom: 20px;
      font-size: 40px;
      font-weight: bold;
      color: #2c313a;
    `)
  },

  clicksWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: 18px;
    `)
  },
})
