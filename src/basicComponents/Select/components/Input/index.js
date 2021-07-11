// Libs
import React from 'react'
import { components as Components } from 'react-select'
import PropTypes from 'prop-types'

// Components

// Style

// PropTypes
export const propTypes = {
  inputProps: PropTypes.object,
  selectProps: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function Input(props) {
  const { selectProps, ...restProps } = props

  const { onMenuClose, inputProps } = selectProps

  const { onPaste: onPasteProps = () => {}, onCopy: onCopyProps = () => {} } = inputProps

  const onPaste = event => {
    onPasteProps(event)
    onMenuClose()
    event.preventDefault()
  }

  const onCopy = event => {
    onCopyProps(event)
  }

  return <Components.Input {...restProps} onPaste={onPaste} onCopy={onCopy} />
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
