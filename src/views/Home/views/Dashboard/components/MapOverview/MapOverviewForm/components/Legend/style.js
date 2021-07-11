import styled, { setLabel } from 'utils/styled'

export default props => ({
  legendWrapper(backgroundColor, borderColor, isMulti) {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      width: 192px;
      height: 38px;
      color: #fff;
      font-size: 14px;
      padding: 8px 10px;
      background-color: ${backgroundColor};
      border: solid 2px ${isMulti ? '#ffffff' : borderColor};
      border-radius: 20px;
      margin: 0px 8px 16px 0px;
    `)
  },

  title() {
    return setLabel(styled.rem`
      width: 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `)
  },

  closeIcon() {
    return setLabel(styled.rem`
      width: 20px;
      height: 20px;
      cursor: pointer;
    `)
  },
})
