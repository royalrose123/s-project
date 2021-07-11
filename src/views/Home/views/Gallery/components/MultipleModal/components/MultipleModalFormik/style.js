import styled, { setLabel } from 'utils/styled'

export default props => ({
  headerTitle() {
    return setLabel(styled.rem`
      font-size: 24px;
      margin-bottom: 12px;
    `)
  },

  wrapper() {
    return setLabel(styled.rem`
      padding: 0;
    `)
  },
})
