import React from 'react'
import PropTypes from 'prop-types'
import Base from 'kepler.gl/dist/components/common/icons/base'

export default function Legend(props) {
  const { isActive, ...restProps } = props

  return (
    <Base {...restProps}>
      <g transform='translate(-8, -8) scale(3.5)'>
        <path
          fill={isActive ? '#586274' : '#FFF'}
          d='M12.69 19c.381 0 .712-.129.993-.387l4.93-4.93c.258-.28.387-.612.387-.993 0-.382-.129-.712-.387-.993l-6.31-6.31c-.28-.258-.611-.387-.993-.387H6.38c-.382 0-.707.135-.976.404-.27.27-.404.594-.404.976v4.93c0 .382.129.712.387.993l6.31 6.31c.28.258.611.387.993.387zM7.44 8.483c-.303 0-.555-.104-.757-.311-.202-.208-.303-.457-.303-.749s.104-.538.311-.74c.208-.202.457-.303.749-.303s.538.098.74.294c.202.197.303.446.303.75 0 .302-.1.554-.303.756-.202.202-.448.303-.74.303z'
        />
      </g>
    </Base>
  )
}

Legend.propTypes = {
  height: PropTypes.string,
  isActive: PropTypes.bool,
}

Legend.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-legend',
}
