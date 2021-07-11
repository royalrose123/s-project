import styled, { setLabel } from 'utils/styled'

export default props => ({
  rankingChartWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      height: auto;
      border: solid 1px #b9b9b9;
      margin-top: 10px;
      position: relative;
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

  chartArea(isCountryAll) {
    return setLabel(styled.rem`
      color: ${isCountryAll ? '#2c313a' : '#51a4f8'};
    `)
  },

  chartDescription() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      margin-left: 15px;
      font-size: 10px;
    `)
  },

  dataTypeButtonWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 12px;
      right: 12px;
    `)
  },

  charts() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-left: 16px;
    `)
  },

  labelWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      justify-content: center;
      margin: 8px;
    `)
  },

  toggleWrapper(isNotEnoughData, isVideo) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      height: 100px;
      position: absolute;
      z-index: 2;
      right: ${isNotEnoughData ? '12px' : '0px'};
      bottom: ${isNotEnoughData ? (isVideo ? '4px' : '-16px') : '0px'};
      margin: 0 0px 10px 0;
    `)
  },
})
