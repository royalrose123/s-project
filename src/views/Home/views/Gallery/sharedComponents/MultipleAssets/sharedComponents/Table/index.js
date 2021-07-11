// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import getStyle from './style'

// Variables
import { TABLE_MODE } from '../../sharedConstants/table'

// PropTypes
export const propTypes = {
  children: PropTypes.array,
}

export const defaultProps = {
  data: [],
  currentMode: TABLE_MODE.VIEW,
}

function Table(props) {
  const style = getStyle(props)
  const { children } = props

  return (
    <div css={style.table()}>
      <div style={{ display: 'table-row-group' }}>{children}</div>
    </div>
  )
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps

export default Table
