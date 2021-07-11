import styled, { setLabel } from 'utils/styled'

export default props => ({
  popup(x, y, isDisplay) {
    return setLabel(styled.rem`
      display: ${isDisplay ? 'flex' : 'none'};
      width: 210px;
      height: auto;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      background-color: #4ea7e8;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    `)
  },

  programWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
    `)
  },

  programNameWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  programName() {
    return setLabel(styled.rem`
      width: 148px;
      height: 18px;
      color: #ffffff;
      font-weight: 600;
      margin: 12px 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `)
  },

  arrowIcon(isPrev) {
    return setLabel(styled.rem`
      width: 12px;
      height: 12px;
      margin: 0px 8px;
      margin-top: 4px;
      transform: ${isPrev ? '' : 'rotate(180deg)'};
      cursor: pointer;
      fill: #ffffff;
    `)
  },

  countryName() {
    return setLabel(styled.rem`
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.46px;
      text-align: center;
      color: #ffffff;
      margin: 8px;
    `)
  },
})
