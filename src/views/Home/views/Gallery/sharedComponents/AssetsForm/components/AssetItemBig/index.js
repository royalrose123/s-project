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
  width: PropTypes.string,
  children: PropTypes.node,
  customCss: PropTypes.object,
  isOptional: PropTypes.bool,
  hasAlignCheckbox: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  hasTitle: true,
  isOptional: false,
  hasAlignCheckbox: false,
}

function AssetItemBig(props) {
  const style = getStyle(props)
  const { customCss, hasTitle, title, children, width, isOptional, hasAlignCheckbox } = props

  return (
    <div css={[style.assetItemBig(hasAlignCheckbox), customCss]} style={{ width }}>
      <div css={style.assetItemTitleWrapper()}>
        {hasTitle && <AssetTitle>{title}</AssetTitle>}
        {isOptional && <p css={style.assetItemTitleComment()}>(optional)</p>}
      </div>
      {children}
    </div>
  )
}

AssetItemBig.propTypes = propTypes
AssetItemBig.defaultProps = defaultProps

export default AssetItemBig
