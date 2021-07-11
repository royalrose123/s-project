import styled, { setLabel } from 'utils/styled'

export default props => ({
  sliderWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: relative;
      min-height: 314px;
      display: flex;
      align-items: center;
    `)
  },

  sliderBody() {
    return setLabel(styled.rem`
      width: calc(100% - 15px);
      height: 100%;
      overflow: hidden;
      position: relative;
      min-height: 324px;
      transition: 0.5s;
    `)
  },

  slider(left = 0) {
    return setLabel(styled.rem`
      position: absolute;
      width: 100%;
      height: 314px;
      display: flex;
      //flex-wrap: wrap;
      left: calc(${left}px + 15px);
      transition: 0.5s;
      top: 35px;
    `)
  },

  motionWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 314px;
      display: flex;
      //flex-wrap: wrap;
    `)
  },

  sliderActions({ isPrev = true, height }) {
    return setLabel(styled.rem`
      position: absolute;
      // height: ${height ? height + 'px' : '100%'};
      min-height: 314px;
      top: 35px;
      display: flex;
      align-items: center;
      ${isPrev ? 'left' : 'right'}: calc(-32px + 15px);
      transition: 0.5s;
      z-index: 10;
    `)
  },

  actionButton({ isPrev = true }) {
    return setLabel(styled.rem`
      width: 56px;
      height: 56px;
      background: #1b273d;
      opacity: 0.7;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      cursor: pointer;

      :hover {
        filter: brightness(1.3);
        transform: translateX(${isPrev ? '-5px' : '5px'});
      }
    `)
  },

  actionButtonIcon(isPrev = true) {
    return setLabel(styled.rem`
      transform: rotateZ(${isPrev ? 0 : '180deg'});
      fill: #ffffff;
    `)
  },

  noData() {
    return setLabel(styled.rem`
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #586274;
    `)
  },
})
