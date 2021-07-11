import React from 'react'
// import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {}

function NoAssets(props) {
  const style = getStyle(props)

  return (
    <div css={style.noAssetsWrapper()}>
      <p css={style.noAssetsTitle()}>No assets found which match your selection</p>
    </div>
  )
}

NoAssets.propTypes = propTypes

export default NoAssets
