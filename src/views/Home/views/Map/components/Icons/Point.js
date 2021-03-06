import React from 'react'
import PropTypes from 'prop-types'
import Base from 'kepler.gl/dist/components/common/icons/base'

export default function Point(props) {
  const { isActive, ...restProps } = props

  return (
    <Base {...restProps}>
      <g transform='translate(-10, -10) scale(3.5)'>
        <path
          fill={isActive ? '#586274' : '#FFF'}
          d='M12.02 20.34c1.52 0 2.927-.38 4.22-1.14 1.253-.72 2.24-1.707 2.96-2.96.76-1.293 1.14-2.7 1.14-4.22 0-1.52-.38-2.927-1.14-4.22-.72-1.253-1.707-2.24-2.96-2.96-1.293-.76-2.7-1.14-4.22-1.14-1.507 0-2.907.38-4.2 1.14-1.253.733-2.247 1.727-2.98 2.98-.76 1.293-1.14 2.693-1.14 4.2 0 1.507.38 2.907 1.14 4.2.72 1.253 1.707 2.247 2.96 2.98 1.293.76 2.7 1.14 4.22 1.14zm0-1.64c-1.2 0-2.32-.307-3.36-.92-1.013-.587-1.813-1.387-2.4-2.4-.613-1.04-.92-2.16-.92-3.36 0-1.2.307-2.32.92-3.36.587-1.013 1.387-1.813 2.4-2.4 1.04-.613 2.16-.92 3.36-.92 1.2 0 2.32.307 3.36.92 1.013.587 1.813 1.387 2.4 2.4.613 1.04.92 2.16.92 3.36 0 1.2-.307 2.32-.92 3.36-.587 1.013-1.387 1.813-2.4 2.4-1.04.613-2.16.92-3.36.92zm0-4.18c.44 0 .853-.113 1.24-.34.387-.227.693-.533.92-.92.227-.387.34-.8.34-1.24 0-.44-.113-.853-.34-1.24-.227-.387-.533-.693-.92-.92-.387-.227-.8-.34-1.24-.34-.44 0-.853.113-1.24.34-.387.227-.693.533-.92.92-.227.387-.34.8-.34 1.24 0 .44.113.853.34 1.24.227.387.533.693.92.92.387.227.8.34 1.24.34z'
        />
      </g>
    </Base>
  )
}

Point.propTypes = {
  height: PropTypes.string,
  isActive: PropTypes.bool,
}

Point.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-point',
}
