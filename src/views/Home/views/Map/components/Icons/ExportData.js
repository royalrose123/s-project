import React from 'react'
import PropTypes from 'prop-types'
import Base from 'kepler.gl/dist/components/common/icons/base'

export default function ExportData(props) {
  const { isActive, ...restProps } = props

  return (
    <Base {...restProps}>
      <g transform='translate(-8, -8) scale(3.5)'>
        <path fill={isActive ? '#586274' : '#FFF'} d='M13.933 9.8v5.56H16.5L12 19.8l-4.5-4.44h2.567V9.8h3.866zM19 5.8v2H5v-2h14z' />
      </g>
    </Base>
  )
}

ExportData.propTypes = {
  height: PropTypes.string,
  isActive: PropTypes.bool,
}

ExportData.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-ExportData',
}
