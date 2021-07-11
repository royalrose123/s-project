import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

// Components
import Icons from 'assets/icons'
import { Pane, Popover } from 'evergreen-ui'

// Lib MISC
import useMouseEnterLeave from 'effects/useMouseEnterLeave'

// Variables

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  handleMassUpdate: PropTypes.func,
  field: PropTypes.string,
}

export const defaultProps = {}

const tooltipMessage = {
  runningDate: 'Apply the date range to all assets',
  assetFormat: 'Apply to all assets that share the same platform and file type',
  primaryText: 'Apply to all assets that share the same platform and placement',
  headline: 'Apply to all assets that share the same platform and placement',
  description: 'Apply to all assets that share the same platform and placement',
  caption: 'Apply to all assets that share the same platform and placement',
  assetCta: 'Apply to all assets that share the same platform and placement',
}

function ApplyAll(props) {
  const style = getStyle(props)
  const { index, handleMassUpdate, field } = props

  const iconRef = useRef(null)

  const [isShowTooltip, setIsShowTooltip] = useState(false)

  useMouseEnterLeave(iconRef, setIsShowTooltip)

  return (
    <Popover
      css={style.applyAll()}
      isShown={isShowTooltip}
      statelessProps={{ style: { boxShadow: 'none', minWidth: 0, minHeight: 0 } }}
      position='top'
      content={
        <div css={style.popover()}>
          <p css={style.message()}>{tooltipMessage[field] ?? 'Apply to all assets'}</p>
        </div>
      }
    >
      <Pane css={style.applyAll()}>
        <Icons.ApplyAll ref={iconRef} onClick={() => handleMassUpdate({ field, index })} />
      </Pane>
    </Popover>
  )
}

ApplyAll.defaultProps = defaultProps
ApplyAll.propTypes = propTypes

export default ApplyAll
