// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import TableItem from '../TableItem'

// Lib MISC

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  headerList: PropTypes.array,
}

function TableHeaderRow(props) {
  const { headerList } = props
  const style = getStyle(props)

  return (
    <div css={style.tableHeaderRow()}>
      {headerList.map((item, index) => {
        return <TableItem key={index} index={index} item={item} isHeader isFixed={item.isFixed} />
      })}
    </div>
  )
}

TableHeaderRow.propTypes = propTypes

export default TableHeaderRow
