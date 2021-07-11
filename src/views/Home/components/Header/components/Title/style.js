import styled, { setLabel } from 'utils/styled'

export default props => ({
  titleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  logo() {
    return setLabel(styled.rem`
      width: 108px;
      height: 72px;
      margin-left: 8px;
      margin-top: -1px;
      cursor: pointer;
      object-fit: contain;
    `)
  },

  title() {
    return setLabel(styled.rem`
      color: inherit;
      font-size: 18px;
      font-weight: 800;
    `)
  },
})
