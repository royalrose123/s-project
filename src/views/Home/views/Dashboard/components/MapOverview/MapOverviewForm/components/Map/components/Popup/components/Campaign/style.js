import styled, { setLabel } from 'utils/styled'

export default props => ({
  campaignWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      width: 90%;
      border-bottom: solid 1px #085187;
      padding: 0 16px;
    `)
  },

  campaignNameWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: -8px;
    `)
  },

  campaignName() {
    return setLabel(styled.rem`
      color: #085187;
      margin-top: 8px;
      margin-bottom: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `)
  },

  liveIcon(isLive) {
    return setLabel(styled.rem`
      width: 9px;
      height: 9px;
      background-color: ${isLive ? '#00d563' : '#9b9b9b'};
      border-radius: 50%;
      margin-right: 4px;
    `)
  },

  valuesWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      margin-bottom: 12px;
    `)
  },

  impressionsWrapper() {
    return setLabel(styled.rem`
      width: 96px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `)
  },

  clicksWrapper() {
    return setLabel(styled.rem`
      width: 68px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `)
  },

  valueTitle() {
    return setLabel(styled.rem`
      color: #ffffff;
      margin: 0;
      font-weight: 600;
    `)
  },

  value() {
    return setLabel(styled.rem`
      color: #085187;
      margin: 0;
      width: 41px;
      height: 19px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1.33px;
      color: #085187;
    `)
  },
})
