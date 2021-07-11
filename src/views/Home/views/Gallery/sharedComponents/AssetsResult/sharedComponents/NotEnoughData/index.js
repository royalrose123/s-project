import React from 'react'
// import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {}

function NotEnoughData(props) {
  const style = getStyle(props)

  return (
    <div css={style.notEnoughDataWrapper()}>
      <p css={style.notEnoughDataTitle()}>Data insufficient to show</p>
      <p css={style.notEnoughDataContent()}>Please review date range</p>
    </div>
  )
}

NotEnoughData.propTypes = propTypes

export default NotEnoughData
