import styled, { setLabel } from 'utils/styled'

export default props => ({
  heatMapWrapper() {
    return setLabel(styled.rem`
      height: 312px;
      border: solid 1px #b9b9b9;
      margin-top: 10px;
      background: #fff;
      position: relative;
    `)
  },

  heatMapChart() {
    return setLabel(styled.rem`
      width: 100%;
      height: 260px;
    `)
  },

  chartTitle() {
    return setLabel(styled.rem`
      color: #2c313a;
      font-weight: bold;
      font-size: 14px;
      width: auto;
      height: 19px;
      margin: 15px auto 0 15px;
    `)
  },

  heatMapUnknown() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      margin: 4px auto 0 15px;
      font-size: 12px;
    `)
  },

  toggleWrapper(isNotEnoughData, isVideo) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      height: 100px;
      position: absolute;
      bottom: ${isNotEnoughData && isVideo ? '8px' : '-8px'};
      right: 12px;
      margin: 0 0px 10px 0;
    `)
  },
})
