import styled, { setLabel } from 'utils/styled'

export default props => ({
  toggle(color, isActived) {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      background-color: ${isActived ? color : '#bfc2c4'};
      width: auto;
      border-radius: 50px;
      margin: 2px 10px;
      padding: 10px 6px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
    `)
  },

  toggleTitle(color) {
    return setLabel(styled.rem`
      color: white;
      font-size: 12px;
    `)
  },
})
