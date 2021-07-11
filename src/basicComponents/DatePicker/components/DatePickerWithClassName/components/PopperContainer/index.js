import React from 'react'
import PropTypes from 'prop-types'
import { Portal } from 'react-overlays'

// Style

export const propTypes = {
  children: PropTypes.object,
  target: PropTypes.any,
}

function PopperContainer(props) {
  const { children, target } = props

  if (target) {
    return <Portal container={target}>{children}</Portal>
  } else {
    return <div>{children}</div>
  }
}

PopperContainer.propTypes = propTypes

export default PopperContainer
