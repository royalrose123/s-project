import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Icon } from 'evergreen-ui'

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  text: PropTypes.string,
  iconColor: PropTypes.string,
  hasData: PropTypes.bool,
  children: PropTypes.object,
}

function Label(props) {
  const { text, iconColor, hasData, children } = props
  const style = getStyle(props)

  return (
    <div css={style.label()}>
      <Icon icon='full-circle' css={style.labelIcon(iconColor, hasData)} size={16} />
      <span css={style.labelText()}>{text}</span>
      {children}
    </div>
  )
}

Label.propTypes = propTypes

export default Label
