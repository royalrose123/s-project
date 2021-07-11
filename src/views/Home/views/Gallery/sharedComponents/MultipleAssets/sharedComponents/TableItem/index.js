// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  children: PropTypes.node,
  width: PropTypes.number,
  item: PropTypes.object,
  isHeader: PropTypes.bool,
  isFixed: PropTypes.bool,
}

export const defaultProps = {
  item: {
    width: 200,
    content: '-',
  },
}

function TableItem(props) {
  const style = getStyle(props)
  const { index, children, width, item, isHeader, isFixed, ...restProps } = props

  const { content, width: itemWidth } = item

  return (
    <>
      {isHeader && (
        <div css={style.tableItem(itemWidth, isFixed, isHeader, index)} {...restProps}>
          {content}
        </div>
      )}
      {!isHeader && (
        <div css={style.tableItem(width, isFixed, isHeader, index)} {...restProps}>
          {children}
        </div>
      )}
    </>
  )
}

TableItem.propTypes = propTypes
TableItem.defaultProps = defaultProps

export default TableItem
