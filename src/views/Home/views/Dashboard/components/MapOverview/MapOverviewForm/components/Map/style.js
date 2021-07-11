import styled, { setLabel } from 'utils/styled'

export default props => ({
  mapWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
    `)
  },

  map() {
    return setLabel(styled.rem`
      width: 100%;
      padding-bottom: 67%;
      height: 0;
    `)
  },

  popup(x, y, isDisplay) {
    return setLabel(styled.rem`
      display: ${isDisplay ? 'flex' : 'none'};
      width: 90px;
      height: 90px;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    `)
  },
})
