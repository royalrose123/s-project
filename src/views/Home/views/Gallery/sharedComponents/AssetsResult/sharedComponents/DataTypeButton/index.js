import React from 'react'
import PropTypes from 'prop-types'

import getStyle from './style'

export const propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

function DataTypeButton(props) {
  const style = getStyle(props)
  const { title, isActive, onClick } = props

  return (
    <div css={style.dataTypeButton(isActive)} onClick={onClick}>
      <p css={style.dataTypeTitle(isActive)}>{title}</p>
    </div>
  )
}

DataTypeButton.propTypes = propTypes

export default DataTypeButton
