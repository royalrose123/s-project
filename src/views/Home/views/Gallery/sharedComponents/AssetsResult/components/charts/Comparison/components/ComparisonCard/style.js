import styled, { setLabel } from 'utils/styled'

export default props => ({
  comparisonCard() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 0 10px 15px;
      margin-right: -1px;
      border: solid 0.5px #b9b9b9;
    `)
  },

  comparisonTitleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  comparisonTitle() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #9b9b9b;
      margin: 0;
    `)
  },

  infoIcon() {
    return setLabel(styled.rem`
      width: 10px;
      margin-left: 4px;
      color: #9b9b9b;
      font-size: 4px;
      cursor: default;
    `)
  },

  result() {
    return setLabel(styled.rem`
      font-size: 22px;
      font-weight: bold;
      color: #2c313a;
      margin: 6px 0;
    `)
  },

  comparisonPercent(isNegative) {
    return setLabel(styled.rem`
      font-size: 12px;
      font-weight: bold;
      color: ${isNegative ? '#ec6b85' : '#76d7d7'};
    `)
  },

  previousText() {
    return setLabel(styled.rem`
      font-size: 10px;
      color: #9b9b9b;
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
