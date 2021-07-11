// Libs
import React from 'react'
// import PropTypes from 'prop-types'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function PRESENTATION(props) {
  const style = getStyle(props)

  return <div css={style.template()}>TEMPLATE</div>
}

PRESENTATION.propTypes = propTypes
PRESENTATION.defaultProps = defaultProps

export default PRESENTATION
