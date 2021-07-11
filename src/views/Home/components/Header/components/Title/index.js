// Libs
import React from 'react'
import { useHistory } from 'react-router-dom'

// Components
import AtomLogo from 'assets/icons/img/atomLogo.png'
import AtomLogoWhite from 'assets/icons/img/atomLogo_white.png'

// Style
import getStyle from './style'

// Variables / Functions
import useGlobalState from 'globalState'
import { PATH } from 'constants/path'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function Title(props) {
  const style = getStyle(props)
  const [state] = useGlobalState()
  const { theme } = state
  const { mode, title } = theme
  const history = useHistory()

  return (
    <div css={style.titleWrapper()}>
      <img css={style.logo()} src={mode === 'light' ? AtomLogo : AtomLogoWhite} onClick={() => history.push('/home/gallery/program/All')} />
      <span css={style.title()}>{PATH[title]}</span>
    </div>
  )
}

Title.propTypes = propTypes
Title.defaultProps = defaultProps

export default Title
