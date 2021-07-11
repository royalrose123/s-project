// Libs
import React from 'react'
import PropTypes from 'prop-types'
import abbreviate from 'number-abbreviate'
import { toUpper } from 'lodash'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  info: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function Campaign(props) {
  const style = getStyle(props)

  const { info } = props

  return (
    <div css={style.campaignWrapper()}>
      <div css={style.campaignNameWrapper()}>
        <div>
          <div css={style.liveIcon(info.isLive)} />
        </div>
        <div css={style.campaignName()}>{info.campaignName}</div>
      </div>
      <div css={style.valuesWrapper()}>
        <div css={style.impressionsWrapper()}>
          <p css={style.valueTitle()}>Impressions</p>
          <p css={style.value()}>{toUpper(abbreviate(info.impressions))}</p>
        </div>
        <div css={style.clicksWrapper()}>
          <p css={style.valueTitle()}>Clicks</p>
          <p css={style.value()}>{toUpper(abbreviate(info.clicks))}</p>
        </div>
      </div>
    </div>
  )
}

Campaign.propTypes = propTypes
Campaign.defaultProps = defaultProps

export default Campaign
