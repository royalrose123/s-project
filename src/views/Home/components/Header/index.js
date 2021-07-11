import React from 'react'
import PropTypes from 'prop-types'

import useTheme from 'src/views/Home/sharedHooks/useTheme'

// Components
import Title from './components/Title'
import SystemIcon from './components/SystemIcon'

// Style
import getStyle from './style'

// Variables / Functions
import useGlobalState from 'globalState'

export const propTypes = {
  children: PropTypes.any.isRequired,
}

function Header(props) {
  const style = getStyle(props)
  const { children, ...restProps } = props
  const [state] = useGlobalState()
  const { theme, user } = state
  const { mode } = theme
  const { userRoleInfo } = user
  const { roleName } = userRoleInfo

  useTheme({ title: 'gallery' })

  if (roleName) {
    return (
      <header css={style.header(mode === 'light')} {...restProps}>
        {children}
      </header>
    )
  } else {
    return null
  }
}

Header.propTypes = propTypes

Header.Title = Title
Header.SystemIcon = SystemIcon

export default Header
