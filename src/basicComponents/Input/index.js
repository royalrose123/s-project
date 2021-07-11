// Libs
import React from 'react'
// import PropTypes from 'prop-types'

// Components
import InputWithClassName from './components/InputWithClassName'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function Input(props) {
  const style = getStyle(props)

  return <InputWithClassName width='100%' css={style.input()} {...props} />
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
