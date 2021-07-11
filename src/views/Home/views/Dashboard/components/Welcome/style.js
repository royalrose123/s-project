import styled, { setLabel } from 'utils/styled'

export default props => ({
  welcomeWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
    `)
  },

  welcome() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      cursor: pointer;
    `)
  },

  background() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background-color: #0c112b;
    `)
  },

  door() {
    return setLabel(styled.rem`
      display: inline-block;
      position: fixed;
      width: 160px;
      height: 236px;
      bottom: 285px;
      left: calc(50% - 80px);
      //transform: translate(-62%, 0);
      overflow: hidden;
      z-index: 11;
      opacity: 0.65;
    `)
  },

  earth() {
    return setLabel(styled.rem`
      width: 600px;
      height: 600px;
      position: absolute;
      top: -100%;
      left: -10%;
      transform: rotate(-33deg);
      animation: houseVMove 10s linear;
      transform-origin: bottom left;

      @keyframes houseVMove {
        0% {
          left: 40%;
          transform: rotate(-28deg);
        }
        100% {
          left: -10%;
          transform: rotate(-33deg);
        }
      }
    `)
  },

  halo() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      z-index: 10;
      opacity: 0.42;
    `)
  },

  rectangle() {
    return setLabel(styled.rem`
      width: 955px;
      height: 284px;
      bottom: 0;
      left: 51.5%;
      transform: translate(-50%, 0%);
      position: fixed;
    `)
  },

  line() {
    return setLabel(styled.rem`
      width: 100%;
      height: 285px;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      position: fixed;
    `)
  },

  welcomeText() {
    return setLabel(styled.rem`
      width: 100%;
      position: fixed;
      font-size: 60px;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 6px 5px 15px rgba(255, 255, 255, 0.61);
      font-family: Avenir, serif;
      letter-spacing: 100px;
      z-index: 11;
      text-align: center;
      // letter-spacing 會影響置中，故需要加上 offset
      // REF: https://stackoverflow.com/questions/21612058/letter-spacing-wrong-text-center-alignment
      text-indent: 0.9em;
      bottom: 308px;
      opacity: 1;
      animation: textFadeInAndOut 4s;
      transform: translateY(0) scale(1.2);
      transform-origin: 50% 50%;

      @keyframes textFadeInAndOut {
        0% {
          transform: translateY(0) scale(1);
        }
        25% {
          transform: translateY(0) scale(1);
        }
        100% {
          transform: translateY(0) scale(1.2);
        }
      }
    `)
  },
})
