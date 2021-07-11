import styled, { setLabel } from 'utils/styled'

export default props => ({
  label() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 20px;
    `)
  },

  labelIcon(color, hasData) {
    return setLabel(styled.rem`
      display: inline-block;
      height: 9px;
      width: 9px;
      color: ${hasData ? color : '#bfc1c3'};
    `)
  },

  labelText() {
    return setLabel(styled.rem`
      color: #9b9b9b;
      font-size: 12px;
      display: inline-block;
      margin-left: 5px;
    `)
  },
})
