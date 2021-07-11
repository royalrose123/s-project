import React from 'react'
import PropTypes from 'prop-types'
import Base from 'kepler.gl/dist/components/common/icons/base'

export default function Cube3D(props) {
  const { isActive, ...restProps } = props

  return (
    <Base {...restProps}>
      <g transform='translate(-8, -8) scale(3.5)'>
        <path
          fill={isActive ? '#586274' : '#FFF'}
          d='M12.158 3.886l7.5 2.55c.204.069.342.263.342.483v10.144c0 .217-.138.41-.342.479l-7.5 2.527c-.051.017-.105.026-.158.026-.053 0-.107-.009-.158-.026l-7.5-2.527c-.204-.069-.342-.262-.342-.48V6.92c0-.22.138-.414.342-.484l7.5-2.549c.103-.035.214-.035.316 0zM19 7.626l-6.53 2.218v9.054l6.53-2.2V7.626zm-7-2.72L6.081 6.92 12 8.93l5.919-2.011L12 4.907z'
        />
      </g>
    </Base>
  )
}

Cube3D.propTypes = {
  height: PropTypes.string,
  isActive: PropTypes.bool,
}

Cube3D.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-cube3D',
}
