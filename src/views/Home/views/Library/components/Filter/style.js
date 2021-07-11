import styled, { setLabel } from 'utils/styled'

export default props => ({
  example() {
    return setLabel(styled.rem``)
  },

  filterWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      background: #ffffff;
      padding: 26px 21px;
    `)
  },

  titleWrapper() {
    return setLabel(styled.rem`
      color: #586274;
      font-size: 18px;
      font-weight: bold;
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      margin-bottom: 27px;
    `)
  },

  spinner() {
    return setLabel(styled.rem`
      margin: 100px auto;
    `)
  },
  noDataText() {
    return setLabel(styled.rem`
      margin: 100px auto;
      color: #586274;
      width: 100%;
      display: flex;
      justify-content: center;
    `)
  },
})
