import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import abbreviate from 'number-abbreviate'
import { toUpper } from 'lodash'
import { fromEvent } from 'rxjs'

// Components
import CARD_DETAIL from '../../constants/descriptions'

// Lib MISC
import { Pane, Popover } from 'evergreen-ui'

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
}

function ComparisonCard(props) {
  const { title, data } = props
  const style = getStyle(props)
  const iconRef = useRef(null)
  const [showPopover, setShowPopover] = useState(false)

  useEffect(() => {
    let mouseEnterSubscription
    if (iconRef.current) {
      mouseEnterSubscription = fromEvent(iconRef.current, 'mouseenter').subscribe(() => setShowPopover(true))
    }

    return () => {
      if (mouseEnterSubscription) {
        mouseEnterSubscription.unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    let mouseLeaveSubscription
    if (iconRef.current) {
      mouseLeaveSubscription = fromEvent(iconRef.current, 'mouseleave').subscribe(() => setShowPopover(false))
    }

    return () => {
      if (mouseLeaveSubscription) {
        mouseLeaveSubscription.unsubscribe()
      }
    }
  }, [])

  const isNegative = Math.sign(data?.growthRate) === -1

  return (
    <div css={style.comparisonCard()}>
      <div css={style.comparisonTitleWrapper()}>
        <p css={style.comparisonTitle()}>{title}</p>
        <Popover
          isShown={showPopover}
          content={
            <div css={style.popover()}>
              <p css={style.popoverTitle()}>{title}</p>
              <p css={style.detail()}>{CARD_DETAIL[title]}</p>
            </div>
          }
        >
          <Pane css={style.infoIcon()}>
            <div ref={iconRef}>ⓘ</div>
          </Pane>
        </Popover>
      </div>
      <p css={style.result()}>{toUpper(abbreviate(data?.result, 1))}</p>
      {data?.growthRate !== null && (
        <>
          <p css={style.comparisonPercent(isNegative)}>{`${data?.growthRate.toFixed(1)}%`}</p>
          <p css={style.previousText()}>vs previous reporting period</p>
        </>
      )}
    </div>
  )
}

ComparisonCard.propTypes = propTypes

export default ComparisonCard
