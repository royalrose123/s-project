// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import haloImage from 'assets/icons/img/glowing-light.png'
import rectangleImage from 'assets/icons/img/rectangle-reflection.png'
import lineImage from 'assets/icons/img/line.png'
import earthImage from 'assets/icons/img/earth.jpg'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

// Components

// constants
import { pageVariants, pageTransition } from '../../constants/transitionParams'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  setIsShowDashboard: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function Welcome(props) {
  const { setIsShowDashboard } = props
  const style = getStyle(props)

  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      // 透過 /welcome 而不是 /home/welcome 進入 welcome 的話一樣五秒後切到 /home/dashboard
      history.push('/home/dashboard')
    }, 5000)
  }, [history])

  return (
    <motion.div
      key='welcome'
      css={style.welcomeWrapper()}
      initial='initial'
      animate='in'
      exit='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <div css={style.welcome()} onClick={() => setIsShowDashboard(true)}>
        <div css={style.background()} />
        <img css={style.halo()} src={haloImage} />
        <img css={style.rectangle()} src={rectangleImage} />
        <img css={style.line()} src={lineImage} />
        <div css={style.door()}>
          <img css={style.earth()} src={earthImage} />
        </div>
        <div css={style.welcomeText()}>WELCOME</div>
      </div>
    </motion.div>
  )
}

Welcome.propTypes = propTypes
Welcome.defaultProps = defaultProps

export default Welcome
