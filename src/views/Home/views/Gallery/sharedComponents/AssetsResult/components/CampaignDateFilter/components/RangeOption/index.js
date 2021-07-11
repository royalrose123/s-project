import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Icon } from 'evergreen-ui'

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onRangeClick: PropTypes.func,
  currentRange: PropTypes.string,
}

function rangeOption(props) {
  const { title, value, onRangeClick, currentRange } = props
  const style = getStyle(props)

  const isSelectedRange = value === currentRange

  return (
    <div css={style.rangeOption()} data-range={value} onClick={onRangeClick}>
      <p css={style.rangeOptionTitle()}>{title}</p>
      {isSelectedRange && <Icon icon='tick-circle' color='black' marginRight={16} size={16} />}
    </div>
  )
}

rangeOption.propTypes = propTypes

export default rangeOption
