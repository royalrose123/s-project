import React from 'react'
import PropTypes from 'prop-types'
import { upperFirst } from 'lodash'

import { Icon } from 'evergreen-ui'

import getStyle from './style'

export const propTypes = {
  title: PropTypes.string,
  toggleColor: PropTypes.string,
  isActived: PropTypes.bool,
  onToggleClick: PropTypes.func,
}

function Toggle(props) {
  const style = getStyle(props)
  const { title, toggleColor, isActived, onToggleClick } = props

  return (
    <div css={style.toggle(toggleColor, isActived)} onClick={onToggleClick} data-title={title}>
      <Icon size={9} margin={4} color='white' icon='full-circle' />
      <p css={style.toggleTitle()}>{upperFirst(title)}</p>
    </div>
  )
}

Toggle.propTypes = propTypes

export default Toggle
