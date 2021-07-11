import styled, { setLabel } from 'utils/styled'

export default props => ({
  auth() {
    return setLabel(styled.rem`
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    `)
  },

  logoWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 24px;
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.8);
    `)
  },

  logo() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 240px;
      height: 100px;
    `)
  },

  loginImage() {
    return setLabel(styled.rem`
      width: 100%;
    `)
  },

  loginButton() {
    return setLabel(styled.rem`
      margin-top: 20px;
      font-size: 16px;
      background: #9b9b9b;
      width: 200px;
      height: 50px;
      color: #fff;
    `)
  },

  loginVideoWrapper() {
    return setLabel(styled.rem`
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;

      #login-video {
        width: 100%;
        height: 100%;

        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    `)
  },
})
