import styled, { setLabel } from 'utils/styled'

export default props => ({
  title() {
    return setLabel(styled.rem`
      font-size: 18px;
      margin-bottom: 20px;
    `)
  },

  selectWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 76px;
    `)
  },

  comment() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #3961e7;
    `)
  },

  footer() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 30px;
    `)
  },

  button() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: center;
      width: 140px;
      height: 40px;
      font-size: 14px;
      margin-left: 20px;
    `)
  },
})
