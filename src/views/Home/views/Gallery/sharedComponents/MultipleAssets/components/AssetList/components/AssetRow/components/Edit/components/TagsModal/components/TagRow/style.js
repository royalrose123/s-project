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

  addTagButton() {
    return setLabel(styled.rem`
      position: absolute;
      top: 0;
      right: 0;
    `)
  },
})
