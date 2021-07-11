// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Dialog } from 'evergreen-ui'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {}

function DialogWithClassName(props) {
  const { className, style, children, ...restProps } = props

  return (
    <Dialog containerProps={{ style, className }} {...restProps}>
      {children}
    </Dialog>
  )
}

DialogWithClassName.propTypes = propTypes
DialogWithClassName.defaultProps = defaultProps

export default DialogWithClassName
