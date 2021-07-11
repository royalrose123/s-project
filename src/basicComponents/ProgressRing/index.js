import React from 'react'
import PropTypes from 'prop-types'

// Style
import getStyle from './style'

const DEFAULT_RADIUS = 16
const DEFAULT_STROKE = 2
const DEFAULT_PROGRESS = 0

export const propTypes = {
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  progress: PropTypes.number,
  id: PropTypes.string,
  strokeColor: PropTypes.string,
  backgroundStrokeColor: PropTypes.string,
  fillColor: PropTypes.string,
}

export const defaultProps = {
  radius: DEFAULT_RADIUS,
  strokeWidth: DEFAULT_STROKE,
  progress: DEFAULT_PROGRESS,
  strokeColor: '#4ea7e8',
  backgroundStrokeColor: '#c2e0f7',
  fillColor: 'transparent',
}

export const getProgressParams = ({ radius = DEFAULT_RADIUS, strokeWidth = DEFAULT_STROKE, progress = DEFAULT_PROGRESS }) => {
  let renderedProgress
  if (progress > 100) {
    renderedProgress = 100
  } else if (progress < 0) {
    renderedProgress = 0
  } else {
    renderedProgress = progress
  }

  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (renderedProgress / 100) * circumference

  return { normalizedRadius, circumference, strokeDashoffset }
}

// Ref: https://css-tricks.com/building-progress-ring-quickly/
function ProgressRing(props) {
  const style = getStyle(props)
  const { radius, strokeWidth, progress, id, strokeColor, fillColor, backgroundStrokeColor } = props

  const diameter = radius * 2

  const { normalizedRadius, circumference, strokeDashoffset } = getProgressParams({ radius, strokeWidth, progress })

  return (
    <svg height={diameter} width={diameter} css={style.progressRingWrapper()}>
      <circle
        css={style.progressRingBackgroundCircle()}
        stroke={backgroundStrokeColor}
        fill={fillColor}
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        id={id}
        css={style.progressRingCircle()}
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

ProgressRing.propTypes = propTypes
ProgressRing.defaultProps = defaultProps

export default ProgressRing
