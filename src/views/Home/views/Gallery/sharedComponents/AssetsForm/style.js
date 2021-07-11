import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetForm(isMultipleUpload) {
    return setLabel(styled.rem`
      width: ${isMultipleUpload ? '100%' : '950px'};
      margin: auto;
      border: ${isMultipleUpload ? 'none' : '2px solid #d8d8d8'};
      border-top: 2px solid #d8d8d8;
      display: flex;
      min-height: 507px;
      padding: ${isMultipleUpload ? '18px 0px' : '35px'};
      flex-wrap: wrap;
    `)
  },

  formTitle() {
    return setLabel(styled.rem`
      width: 100%;
      font-weight: normal;
      font-size: 20px;
      margin-bottom: 20px;
      text-align: left;
    `)
  },

  asset() {
    return setLabel(styled.rem`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 10px;
      width: 100%;
    `)
  },

  column(isMultipleUpload) {
    return setLabel(styled.rem`
      position: relative;
      width: ${isMultipleUpload ? '100%' : '420px'};
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: space-between;

      &:nth-of-type(odd) {
        align-content: baseline;
      }
    `)
  },

  campaignName() {
    return setLabel(styled.rem`
      width: 645px;
      z-index: 3;
      padding: 0;
    `)
  },

  campaignRunningDate() {
    return setLabel(styled.rem`
      width: 420px;
      display: flex;
      justify-content: space-between;
      z-index: 2;
    `)
  },

  assetItemBig() {
    return setLabel(styled.rem`
      width: 100%;
      margin-bottom: 30px;

      & > div[data-child='true'] {
        margin-bottom: 0;
      }
    `)
  },

  datePickerInput() {
    return setLabel(styled.rem`
      width: 179px;
      height: 27px;
    `)
  },

  datePickerDash() {
    return setLabel(styled.rem`
      position: absolute;
      top: 38px;
      right: -22px;
      display: flex;
      align-items: center;
      color: #222;
    `)
  },

  displayOption() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: flex-end;
    `)
  },

  lastItem() {
    return setLabel(styled.rem``)
  },

  assetItemSmall() {
    return setLabel(styled.rem`
      width: 195px;
      display: inline-block;
      margin-bottom: 30px;
    `)
  },

  assetTitle() {
    return setLabel(styled.rem`
      font-weight: bold;
      margin-bottom: 9px;
      min-height: 18px;
    `)
  },

  tagField() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
    `)
  },

  tagSelectWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: flex-end;
    `)
  },

  addTagButton() {
    return setLabel(styled.rem`
      position: absolute;
      top: 0;
      right: 0;
    `)
  },
})
