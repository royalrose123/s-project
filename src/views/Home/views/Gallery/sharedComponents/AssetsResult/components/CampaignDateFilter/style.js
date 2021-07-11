import styled, { setLabel } from 'utils/styled'

export default props => ({
  campaignDateFilter() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
    `)
  },

  campaignDateWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 55px;
      width: 100%;
      padding: 8px 16px;
      font-size: 14px;
      border-bottom: 1px solid #d8d8d8;
    `)
  },

  campaignDateTitle() {
    return setLabel(styled.rem`
      margin: 6px 0;
      font-size: 12px;
      color: #9b9b9b;
    `)
  },

  rangeOptionsWrapper() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #9b9b9b;
      border-bottom: 1px solid #d8d8d8;
    `)
  },

  customWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px 16px;
    `)
  },

  customTitleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `)
  },

  customTitle() {
    return setLabel(styled.rem`
      margin: 4px 0;
      font-size: 14px;
      color: #2c313a;
    `)
  },

  datepickerWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  datepickerLabel() {
    return setLabel(styled.rem`
      width: 40px;
      color: #9b9b9b;
      font-size: 12px;
    `)
  },

  runningDatePicker() {
    return setLabel(styled.rem`
      width: 120px;
    `)
  },

  customButton() {
    return setLabel(styled.rem`
      width: 100px;
      margin: 0 auto;
      margin-top: 10px;
      display: flex;
      justify-content: center;
    `)
  },
})
