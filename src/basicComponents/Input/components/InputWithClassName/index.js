// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import { TextInput } from 'evergreen-ui'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  className: PropTypes.string,
}

// DefaultProps
export const defaultProps = {}

function Input({ className, ...restProps }) {
  return <TextInput className={className} {...restProps} />
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
