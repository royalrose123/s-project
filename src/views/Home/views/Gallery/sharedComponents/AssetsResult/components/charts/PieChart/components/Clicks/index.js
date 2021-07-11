import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Icon } from 'evergreen-ui'

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  platform: PropTypes.string,
  format: PropTypes.string,
  values: PropTypes.number,
  totalClicks: PropTypes.number,
  color: PropTypes.string,
}

function Clicks(props) {
  const { platform, format, values, totalClicks, color } = props
  const style = getStyle(props)

  const valuesPercantage = ((values / totalClicks) * 100).toFixed(1)

  return (
    <div css={style.clicks()}>
      <div css={style.labelWrapper()}>
        <Icon icon='full-circle' css={style.legendIcon(color)} size={16} />
        <div css={style.platformFormatWrapper()}>
          <p css={style.platform()}>{platform}</p>
          <p css={style.format()}>{format}</p>
        </div>
      </div>
      <div css={style.valuesWrapper()}>
        <p css={style.values()}>{values.toLocaleString()}</p>
        <p css={style.valuesPercentage()}>{`(${valuesPercantage}%)`}</p>
      </div>
    </div>
  )
}

Clicks.propTypes = propTypes

export default Clicks
