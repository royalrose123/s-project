import styled, { setLabel } from 'utils/styled'

export default props => ({
  media(isSelected, showActionFooter) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 256px;
      position: relative;
      box-sizing: content-box;
      padding: ${isSelected ? '5px' : '7px'};
      border: ${isSelected ? '2px solid #3961e7' : 'none'};
      border-radius: 4px;
      cursor: ${showActionFooter ? 'pointer' : 'default'};
    `)
  },

  thumbnailWrapper() {
    return setLabel(styled.rem`
      position: relative;
      width: 200px;
      height: 130px;
      background-color: black;
    `)
  },

  mediaImage() {
    return setLabel(styled.rem`
      width: 100%;
      height: 130px;
      background-color: black;
      object-fit: contain;
      object-position: center;
      cursor: pointer;
    `)
  },

  mediaVideoWrapper() {
    return setLabel(styled.rem`
      width: 200px;
      height: 130px;
      background-color: black;
      cursor: pointer;
    `)
  },

  mediaVideo() {
    return setLabel(styled.rem`
      width: 200px;
      height: 130px;
      position: relative;
      background-color: black;

      video {
        width: 200px;
        height: 130px;
      }

      button {
        position: absolute;
        left: 0;
        top: 0;
      }
    `)
  },

  fullScreenPlayer() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
    `)
  },

  mediaCampaignWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 18px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0 4px 0;
    `)
  },

  mediaCampaignTextWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      min-width: 110px;
      align-items: center;
      height: 18px;
      padding-right: 8px;
      background-color: #d8d8d8;
      border-radius: 9px;
      max-width: 90%;
    `)
  },

  mediaCampaignIcon() {
    return setLabel(styled.rem`
      width: 14px;
      height: 14px;
      margin: 4px;
      /* border-radius: 50%; */
    `)
  },

  mediaCampaignText() {
    return setLabel(styled.rem`
      padding: 4px 0;
      margin: 0;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `)
  },

  formatName() {
    return setLabel(styled.rem`
      padding: 1px 0;
      margin: 8px 0;
      font-size: 12px;
      color: #9b9b9b;
      line-height: 1.33px;
    `)
  },

  liveIcon(isLive) {
    return setLabel(styled.rem`
      width: 9px;
      height: 9px;
      background-color: ${isLive ? '#00d563' : '#9b9b9b'};
      border-radius: 50%;
      position: absolute;
      right: 8px;
      bottom: 8px;
    `)
  },

  moreIcon(isDisabled) {
    return setLabel(styled.rem`
      transform: rotate(90deg);
      color: #d8d8d8;
      cursor: ${isDisabled ? 'default' : 'pointer'};
    `)
  },

  mediaName() {
    return setLabel(styled.rem`
      width: 100%;
      height: 32px;
      line-height: 1.14;
      overflow-y: hidden;
      font-size: 14px;
      margin: 0;
      word-break: break-all;
    `)
  },

  menuItem(isActive = true) {
    return setLabel(styled.rem`
      opacity: ${isActive ? '1' : '0.3'};
      cursor: ${isActive ? 'pointer' : 'auto'};

      svg {
        opacity: ${isActive ? '1' : '0.3'};
      }
    `)
  },

  thumbnailMask() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(#000, transparent);
    `)
  },

  thumbnailCheckbox() {
    return setLabel(styled.rem`
      position: absolute;
      top: 10px;
      right: 10px;
      margin: 0;
      background: #fff;
      border-radius: 3px;
      padding: 1px;
    `)
  },

  itemIconWrapper() {
    return setLabel(styled.rem`
      display: flex;
    `)
  },

  itemIcon() {
    return setLabel(styled.rem`
      margin-right: 8px;
    `)
  },

  tagWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      width: 100%;
      height: 50px;
    `)
  },

  tag() {
    return setLabel(styled.rem`
      display: flex;
      height: 20px;
      margin: 2px;
      padding: 0 5px;
      border: 1px solid #4ea7e8;
      border-radius: 4px;
    `)
  },

  tagText() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #4ea7e8;
      height: 20px;
      line-height: 20px;
    `)
  },
})
