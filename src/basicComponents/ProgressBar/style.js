import styled, { setLabel } from 'utils/styled'

export default props => ({
  progressbarContainer() {
    return setLabel(styled.rem`
      width: 100%;
      border: 2px solid #000;
    `)
  },
  progressbarProgress() {
    const { color, completed, animation, height } = props

    return setLabel(styled.rem`
      /* background-color: ${color};
      width: ${completed}%;
      transition: width ${animation}ms; */
      /* height: ${height}px; */
      height: 5px;
    `)
  },
})
