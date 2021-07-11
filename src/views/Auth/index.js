// Libs
import React from 'react'
import { withAuth } from '@okta/okta-react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'

// Components
import Video from 'basicComponents/Video'
import LoginVideo from 'assets/video/auth.mov'
import LoginLogo from 'assets/icons/img/atomLogo.png'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  login: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function Auth(props) {
  const style = getStyle(props)
  const { login } = props

  return (
    <div css={style.auth()}>
      <div css={style.logoWrapper()}>
        <div css={style.logo()}>
          <img css={style.loginImage()} src={LoginLogo} />
        </div>
        <button css={style.loginButton()} onClick={login}>
          Log In
        </button>
      </div>
      <div css={style.loginVideoWrapper()}>
        <Video
          id='login-video'
          src={LoginVideo}
          sources={[
            {
              src: LoginVideo,
            },
          ]}
          customSetting={{
            controls: false,
            autoplay: true,
            loop: 'loop',
          }}
        />
      </div>
    </div>
  )
}

Auth.propTypes = propTypes
Auth.defaultProps = defaultProps

export default withAuth(hot(Auth))
