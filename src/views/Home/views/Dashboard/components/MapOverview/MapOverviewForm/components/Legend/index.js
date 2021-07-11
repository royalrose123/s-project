// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import Icons from 'assets/icons'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  info: PropTypes.object,
  selectRef: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function Legend(props) {
  const style = getStyle(props)

  const { info, selectRef } = props
  const { label, color, isMulti } = info
  const { backgroundColor, borderColor } = color

  return (
    <div css={style.legendWrapper(backgroundColor, borderColor, isMulti)}>
      <div css={style.title()}>{label}</div>
      <Icons.Close css={style.closeIcon()} onClick={() => selectRef.props.onDeselect(info)} />
    </div>
  )
}

Legend.propTypes = propTypes
Legend.defaultProps = defaultProps

export default Legend
