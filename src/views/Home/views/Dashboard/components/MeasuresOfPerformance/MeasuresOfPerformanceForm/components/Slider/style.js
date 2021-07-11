import styled, { setLabel } from 'utils/styled'

export default props => ({
  sliderWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: auto;
      position: relative;
      min-height: 470px;
    `)
  },

  sliderBody({ isOverflowHidden, height }) {
    return setLabel(styled.rem`
      width: 100%;
      height: ${height ? height + 'px' : 'auto'};
      /* height: 480px; */
      overflow: ${isOverflowHidden ? 'hidden' : 'visible'};
      position: relative;
      min-height: 470px;
      transition: 0.5s;
    `)
  },

  slider() {
    return setLabel(styled.rem`
      position: absolute;
      width: 100%;
      height: 480px;
      display: flex;
      flex-wrap: wrap;
    `)
  },

  motionWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 480px;
      display: flex;
      flex-wrap: wrap;
    `)
  },

  sliderActions({ isPrev = true, height }) {
    return setLabel(styled.rem`
      position: absolute;
      height: ${height ? height + 'px' : '100%'};
      min-height: 470px;
      top: 0;
      display: flex;
      align-items: center;
      ${isPrev ? 'left' : 'right'}: -57px;
      transition: 0.5s;
    `)
  },

  actionButton() {
    return setLabel(styled.rem`
      width: 40px;
      height: 40px;
      background: rgb(60, 69, 80);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      cursor: pointer;

      :hover {
        filter: brightness(1.3);
      }
    `)
  },

  actionButtonIcon(isPrev = true) {
    return setLabel(styled.rem`
      transform: rotateZ(${isPrev ? 0 : '180deg'});
      fill: #ffffff;
    `)
  },
})
