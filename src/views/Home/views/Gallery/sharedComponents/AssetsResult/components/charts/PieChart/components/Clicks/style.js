import styled, { setLabel } from 'utils/styled'

export default props => ({
  clicks() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      width: 200px;
      margin: 8px 0;
    `)
  },

  labelWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
    `)
  },

  legendIcon(color) {
    return setLabel(styled.rem`
      display: inline-block;
      height: 9px;
      width: 9px;
      color: ${color};
    `)
  },

  platformFormatWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    `)
  },

  platform() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      font-size: 12px;
      font-weight: bold;
      margin-left: 5px;
    `)
  },

  format() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      font-size: 12px;
      margin-left: 5px;
    `)
  },

  valuesWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      margin: 4px 0;
    `)
  },

  values() {
    return setLabel(styled.rem`
      font-size: 20px;
      font-weight: bold;
      margin-right: 4px;
    `)
  },

  valuesPercentage() {
    return setLabel(styled.rem`
      font-size: 20px;
    `)
  },
})
