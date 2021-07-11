// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import DialogWithClassName from '../DialogWithClassName'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
  isShown: PropTypes.bool,
  isMultipleUpload: PropTypes.bool,
  childrenWrapperCss: PropTypes.object,
  isCustomFooter: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  isMultipleUpload: false,
  hasHeader: true,
  isCustomFooter: false,
}

function OverPage(props) {
  const style = getStyle(props)
  const { children, isShown, isMultipleUpload, childrenWrapperCss, isCustomFooter, ...restProps } = props

  const overPageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: 0,
  }

  return (
    <DialogWithClassName
      css={style.overPage(isMultipleUpload, isCustomFooter)}
      style={overPageStyle}
      minHeightContent='calc(100% - 130px)'
      preventBodyScrolling
      isShown={isShown}
      {...restProps}
    >
      <div css={[style.childrenWrapper(), childrenWrapperCss]}>{children}</div>
    </DialogWithClassName>
  )
}

OverPage.propTypes = propTypes
OverPage.defaultProps = defaultProps

export default OverPage
