import styled, { setLabel } from 'utils/styled'

export default props => ({
  multipleAssetsTabWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin: 0 auto;
    `)
  },

  multipleAssetsTab(isActive) {
    return setLabel(styled.rem`
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 150px;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 600;
      color: ${isActive ? 'white' : 'black'};
      background-color: ${isActive ? '#000000' : 'transparent'};
      border: solid 1px #979797;
      margin-right: -1px;
      border-bottom: none;
      cursor: pointer;
    `)
  },

  actionWrapper() {
    return setLabel(styled.rem`
      width: calc(100% - 300px);
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    `)
  },

  removeMessage() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #3961e7;
      margin-right: 18px;
    `)
  },

  actionButton() {
    return setLabel(styled.rem`
      justify-content: center;
      margin: 4px;
    `)
  },

  actionIcon() {
    return setLabel(styled.rem`
      margin: 0px 8px;
      cursor: pointer;
    `)
  },
})
