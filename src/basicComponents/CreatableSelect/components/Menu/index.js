import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { components as Components } from 'react-select'

// Style
import getStyle from './style'

export const propTypes = {
  children: PropTypes.object,
  target: PropTypes.any,
  width: PropTypes.number,
  itemId: PropTypes.string,
}

function Menu(props) {
  const style = getStyle(props)

  const { children, target, width, itemId } = props

  if (target) {
    const select = document.getElementById(`${itemId}`)
    const selectPosition = select.getBoundingClientRect()
    const xOffset = selectPosition.x
    const yOffset = selectPosition.y

    return ReactDOM.createPortal(
      <Components.Menu css={style.menu(width, xOffset, yOffset)} {...props}>
        {children}
      </Components.Menu>,
      target,
    )
  } else {
    return <Components.Menu {...props}>{children}</Components.Menu>
  }
}

Menu.propTypes = propTypes

export default Menu
