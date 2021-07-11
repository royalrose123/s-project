// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {}

function AssetTitle(props) {
  const style = getStyle(props)
  const { children } = props

  return <div css={style.assetTitle()}>{children}</div>
}

AssetTitle.propTypes = propTypes
AssetTitle.defaultProps = defaultProps

export default AssetTitle
