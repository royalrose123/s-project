import styled, { setLabel } from 'utils/styled'

export default props => ({
  actionWrapper() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      margin-bottom: 26px;
    `)
  },

  viewWrapper() {
    return setLabel(styled.rem`
      display: flex;
      height: auto;
    `)
  },

  view() {
    return setLabel(styled.rem`
      font-size: 14px;
      color: #fff;
      margin: 0 8px 0 4px;
    `)
  },

  viewIcon() {
    return setLabel(styled.rem`
      width: 24px;
      height: 16px;
    `)
  },

  legendWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-wrap: wrap;
    `)
  },
})
