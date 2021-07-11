import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetsResult() {
    return setLabel(styled.rem`
      width: 950px;
      margin: auto;
      border: 2px solid #d8d8d8;
      min-height: 507px;
      padding: 35px 40px;
      display: flex;
      color: #2c313a;
    `)
  },

  filterWrapper() {
    return setLabel(styled.rem`
      width: 200px;
      height: auto;
      display: block;
    `)
  },

  campaignName() {
    return setLabel(styled.rem`
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `)
  },

  campaignRunningDateTitle() {
    return setLabel(styled.rem`
      font-size: 12px;
      margin-top: 4px;
      color: #9b9b9b;
    `)
  },

  campaignRunningDatePopover() {
    return setLabel(styled.rem``)
  },

  campaignRunningDate() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 12px;
      margin: 0px 0 35px 0;
      cursor: pointer;
    `)
  },

  runningIcon(runningIcon) {
    return setLabel(styled.rem`
      color: ${runningIcon ? '#00d563' : '#9b9b9b'};
      height: 9px;
      width: 9px;
      display: inline-block;
      margin-right: 5px;
    `)
  },

  campaignRunningDropdown() {
    return setLabel(styled.rem`
      margin: 4px;
      color: #9b9b9b;
    `)
  },

  assetsResultContent() {
    return setLabel(styled.rem`
      width: 640px;
      height: auto;
      margin-left: 30px;
    `)
  },

  resultContentHeader() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    `)
  },

  resultContentTitle() {
    return setLabel(styled.rem`
      display: flex;
      font-size: 18px;
    `)
  },

  noResultMessageWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #2c313a;
      height: 100px;
      font-size: 18px;
      background: #f1f1f1;
      padding: 30px;
    `)
  },

  noResultMessageTitle() {
    return setLabel(styled.rem`
      font-weight: bold;
      margin: 6px;
    `)
  },

  noResultMessageContent() {
    return setLabel(styled.rem`
      padding: 0 24px;
      font-size: 16px;
      line-height: 18px;
    `)
  },
})
