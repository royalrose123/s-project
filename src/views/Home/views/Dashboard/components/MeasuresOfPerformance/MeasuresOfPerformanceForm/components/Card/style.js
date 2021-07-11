import styled, { setLabel } from 'utils/styled'

export default props => ({
  cardHeader() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      width: 328px;
    `)
  },

  card({ itemsPerColumn, cardGap }) {
    return setLabel(styled.rem`
      color: #ffffff;
      width: 352px;
      height: 221px;
      //min-height: 213px;
      background-color: #26334d;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 14px;
      margin: 0 ${cardGap}px 22px 0;
      box-shadow: 4px 4px 4px 0 #1b273d;
      border: solid 0.5px #586274;
      border-radius: 4px;
      position: relative;
    `)
  },

  cardHeaderProgram() {
    return setLabel(styled.rem`
      //color: #fff;
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `)
  },

  cardHeaderClient() {
    return setLabel(styled.rem`
      font-size: 12px;
      display: flex;
      align-items: center;
    `)
  },

  cardHeaderClientText() {
    return setLabel(styled.rem`
      border-left: 2px solid #4ea7e8;
      padding-left: 5px;
      line-height: 1;
    `)
  },

  cardBody() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-around;
    `)
  },

  columnWrapper() {
    return setLabel(styled.rem`
      padding: 5px;
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    `)
  },

  columnTitle() {
    return setLabel(styled.rem`
      //color: #ffffff;
      font-size: 14px;
      font-weight: 600;
    `)
  },

  columnFigure() {
    return setLabel(styled.rem`
      color: #4ea7e8;
      font-size: 30px;
      font-weight: 600;
      margin: 5px 0 10px 0;
    `)
  },

  columnGrowthRateWrapper() {
    return setLabel(styled.rem`
      min-height: 30px;
    `)
  },

  columnGrowthRate(growthRate) {
    let color
    if (growthRate > 0) {
      color = '#00d563'
    } else if (growthRate < 0) {
      color = '#f15056'
    } else {
      color = '#ababac'
    }

    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      color: ${color};
      font-size: 20px;
      font-weight: 500;
    `)
  },

  columnGrowthRateText() {
    return setLabel(styled.rem`
      margin-left: 8px;
    `)
  },

  cardFooter() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      align-items: center;
    `)
  },

  liveCampaigns() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
    `)
  },

  liveCampaignsMarker(isLive = false) {
    return setLabel(styled.rem`
      color: ${isLive ? '#00d563' : '#d8d8d8'};
      font-size: 6px;
      margin-right: 6px;
    `)
  },

  campaigns() {
    return setLabel(styled.rem`
      cursor: pointer;
      color: #ffffff;
      display: flex;
      align-items: center;
      margin-left: 8px;
    `)
  },

  allCampaignsIcon(isDropDownOpen) {
    return setLabel(styled.rem`
      transform: rotateZ(${isDropDownOpen ? '-180deg' : 0});
      transition: 0.5s;
      margin-left: 8px;
    `)
  },

  allCampaignsDropDown({ isOpened, dropdownHeight }) {
    return setLabel(styled.rem`
      background: #26334d;
      height: ${isOpened ? dropdownHeight + 'px' : 0};
      max-height: 780px;
      width: 100%;
      transition: 0.5s;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 3;
      box-shadow: 4px 4px 8px 0 #1b273d;
      overflow-y: scroll;
      border-radius: 4px;
      opacity: ${isOpened ? 1 : 0};
      overflow-wrap: break-word;
      display: block;
      padding: 0 14px;
      margin-bottom: 30px;
    `)
  },

  campaignItem() {
    return setLabel(styled.rem`
      width: 100%;
      border-top: 0.5px solid #586274;
      padding-top: 4px;
    `)
  },

  campaignItemHeader() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 16px;
    `)
  },

  campaignItemTitle() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
    `)
  },

  campaignItemTitleText() {
    return setLabel(styled.rem`
      width: 230px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `)
  },

  viewDetails() {
    return setLabel(styled.rem`
      font-size: 12px;
      text-decoration: none;
      color: #ffffff;
      cursor: pointer;
      width: 75px;
    `)
  },

  campaignItemBody() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      padding-bottom: 12px;
    `)
  },

  campaignItemBodyColumn() {
    return setLabel(styled.rem`
      width: 50%;
    `)
  },

  campaignItemSubtitle() {
    return setLabel(styled.rem`
      font-size: 12px;
      padding-left: 4px;
      margin-bottom: 6px;
      border-left: 2px solid #4ea7e8;
    `)
  },

  campaignItemFigure() {
    return setLabel(styled.rem`
      font-size: 18px;
      color: #4ea7e8;
    `)
  },
})
