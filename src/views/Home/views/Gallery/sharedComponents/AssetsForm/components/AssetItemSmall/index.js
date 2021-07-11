// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import AssetTitle from '../AssetTitle'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  hasTitle: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  customCss: PropTypes.object,
  width: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  hasTitle: true,
}

function AssetItemSmall(props) {
  const style = getStyle(props)
  const { hasTitle, title, customCss, children, width } = props

  return (
    <div css={[style.assetItemSmall(), customCss]} style={{ width }}>
      {hasTitle && <AssetTitle>{title}</AssetTitle>}
      {children}
    </div>
  )
}

AssetItemSmall.propTypes = propTypes
AssetItemSmall.defaultProps = defaultProps

export default AssetItemSmall
