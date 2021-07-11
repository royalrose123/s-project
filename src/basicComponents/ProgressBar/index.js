import React from 'react'
import PropTypes from 'prop-types'

// Style
import getStyle from './style'

export const propTypes = {
  completed: (props, propName) => {
    if (typeof props[propName] !== 'number') return console.error('Invalid Props: "completed" should be number')
    if (props[propName] < 0 || props[propName] > 100) {
      return console.error('Invalid Props: "completed" should be between 0 and 100')
    }
  },
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  animation: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
}

export const defaultProps = {
  completed: 0,
  color: 'black',
  animation: 200,
  height: 2,
}

function ProgressBar(props) {
  const style = getStyle(props)
  const { children, id, ...rest } = props

  return (
    <div css={style.progressbarContainer()} {...rest}>
      <div id={`${id}`} css={style.progressbarProgress()} style={style}>
        {children}
      </div>
    </div>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
