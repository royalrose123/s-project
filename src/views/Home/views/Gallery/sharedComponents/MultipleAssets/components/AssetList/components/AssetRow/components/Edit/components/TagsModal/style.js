import styled, { setLabel } from 'utils/styled'

export default props => ({
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

  headerWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `)
  },

  headerTitle() {
    return setLabel(styled.rem`
      font-size: 24px;
      color: #2c313a;
    `)
  },

  addTagButton() {
    return setLabel(styled.rem`
      width: 66px;
      height: 25px;
      border-radius: 4px;
      color: #586274;
      border: solid 0.8px #586274;
      background-color: #ffffff;
      cursor: pointer;
    `)
  },
})
