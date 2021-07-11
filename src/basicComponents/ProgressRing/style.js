import styled, { setLabel } from 'utils/styled'

export default props => ({
  progressRingWrapper() {
    return setLabel(styled.rem`
      position: relative;
    `)
  },

  progressRingBackgroundCircle() {
    return setLabel(styled.rem`
      position: absolute;
      top: 0;
      left: 0;
    `)
  },
  progressRingCircle() {
    return setLabel(styled.rem`
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transition: stroke-dashoffset 0.35s;
    `)
  },
})
