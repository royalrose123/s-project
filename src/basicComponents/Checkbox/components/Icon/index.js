import React from 'react'
import PropTypes from 'prop-types'

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

function Icon(props) {
  const style = getStyle(props)
  const { checked, className, disabled, onChange, ...restProps } = props

  const spaceKeyCode = 32

  const onKeyDown = event => {
    const isSpace = event.keyCode === spaceKeyCode

    if (isSpace && !disabled) {
      onChange()
    }
  }

  return <span css={style.icon(checked, disabled)} {...restProps} onKeyDown={onKeyDown} />
}

Icon.propTypes = propTypes

export default Icon
