import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Menu } from 'evergreen-ui'
import Group from './components/Group'

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  children: PropTypes.object.isRequired,
}

function NavMenu(props) {
  const style = getStyle(props)
  const { children } = props

  return <Menu css={style.menu()}>{children}</Menu>
}

NavMenu.propTypes = propTypes

NavMenu.Group = Group

export default NavMenu
