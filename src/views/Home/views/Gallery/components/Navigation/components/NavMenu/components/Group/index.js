import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Menu } from 'evergreen-ui'
import Item from './components/Item'

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
}

function Group(props) {
  const style = getStyle(props)
  const { children, title } = props

  return <Menu.Group title={<span css={style.menuGroupTitle()}>{title}</span>}>{children}</Menu.Group>
}

Group.propTypes = propTypes

Group.Item = Item

export default Group
