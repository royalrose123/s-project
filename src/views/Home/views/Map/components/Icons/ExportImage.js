import React from 'react'
import PropTypes from 'prop-types'
import Base from 'kepler.gl/dist/components/common/icons/base'

export default function ExportImage(props) {
  const { isActive, ...restProps } = props

  return (
    <Base {...restProps}>
      <g transform='translate(-10, -10) scale(3.7)'>
        <path
          fill={isActive ? '#586274' : '#FFF'}
          d='M18.533 19.5c.312 0 .573-.104.781-.313.209-.208.313-.468.313-.78V5.593c0-.313-.104-.573-.313-.782-.208-.208-.469-.312-.781-.312H5.463c-.312 0-.572.104-.78.313-.209.208-.313.468-.313.78v12.813c0 .313.104.573.313.782.208.208.468.312.78.312h13.07zm-.156-3.125l-6.75-4.977c-.157-.182-.378-.273-.664-.273-.235 0-.456.104-.664.313L5.62 16.375V6.219c.052-.313.221-.469.508-.469h11.74c.34 0 .509.156.509.469v10.156zm-3.125-5.625c.52 0 .963-.182 1.328-.547.364-.364.547-.807.547-1.328 0-.52-.183-.964-.547-1.328-.365-.365-.807-.547-1.328-.547s-.964.182-1.328.547c-.365.364-.547.807-.547 1.328 0 .52.182.964.547 1.328.364.365.807.547 1.328.547z'
        />
      </g>
    </Base>
  )
}

ExportImage.propTypes = {
  height: PropTypes.string,
  isActive: PropTypes.bool,
}

ExportImage.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-ExportImage',
}
