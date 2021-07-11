import styled, { setLabel } from 'utils/styled'

export default props => ({
  section() {
    return setLabel(styled.rem`
      background: #586274;
      padding: 30px 72px 50px 72px;
      /* margin-bottom: 44px; */
      border-radius: 4px;
      position: relative;
    `)
  },
  sectionTitle() {
    return setLabel(styled.rem`
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
      margin: 0 0px 24px 0px;
    `)
  },
})
