// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Spinner } from 'evergreen-ui'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  spinnerCss: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function SpinnerComponent(props) {
  const { spinnerCss } = props
  const style = getStyle(props)

  return (
    <div css={[style.spinnerWrapper(), spinnerCss]}>
      <Spinner size={32} color='white' />
    </div>
  )
}

SpinnerComponent.propTypes = propTypes
SpinnerComponent.defaultProps = defaultProps

export default SpinnerComponent
