// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components

// Style
import getStyle from './style'

// Variables / Functions

// PropTypes
export const propTypes = {
  onClose: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.func]),
  onClick: PropTypes.func,
  icon: PropTypes.any,
  label: PropTypes.string,
  mode: PropTypes.string,
  isLastOne: PropTypes.bool,
  active: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  isLastOne: false,
  active: false,
}

function ToolbarItem(props) {
  const style = getStyle(props)

  const { icon: Icon, label, onClose, onClick, mode, isLastOne, active } = props

  const isDarkMode = mode === 'dark'

  return (
    <div
      css={style.toolbarItemWrapper(isDarkMode, active)}
      onClick={event => {
        event.stopPropagation()
        event.preventDefault()
        if (typeof onClose === 'function') {
          onClose()
        }
        onClick(event)
      }}
    >
      {Icon && <Icon css={style.toolbarItemIcon(isDarkMode, active)} />}
      <div css={style.toolbarItemLabel(isDarkMode, active)}>{label}</div>
      <div css={style.toolbarItemUnderline(isDarkMode, isLastOne)} />
    </div>
  )
}

ToolbarItem.propTypes = propTypes
ToolbarItem.defaultProps = defaultProps

export default ToolbarItem
