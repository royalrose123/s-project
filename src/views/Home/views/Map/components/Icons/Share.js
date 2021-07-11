import React from 'react'
import PropTypes from 'prop-types'
import Base from 'kepler.gl/dist/components/common/icons/base'

export default function Share(props) {
  const { isActive, ...restProps } = props

  return (
    <Base {...restProps}>
      <g transform='translate(-8, -8) scale(3.5)'>
        <path
          fill={isActive ? '#586274' : '#FFF'}
          d='M4.5 18.2c1.042-1.484 2.246-2.565 3.613-3.242s3.08-1.016 5.137-1.016v3.438l6.25-5.742L13.25 5.7v3.32c-4.766.677-7.682 3.737-8.75 9.18z'
        />
      </g>
    </Base>
  )
}

Share.propTypes = {
  height: PropTypes.string,
  isActive: PropTypes.bool,
}

Share.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-Share',
}
