import React from 'react'
import PropTypes from 'prop-types'

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  children: PropTypes.any.isRequired,
}

function Main(props) {
  const style = getStyle(props)
  const { children, ...restProps } = props

  return (
    <main css={style.main()} {...restProps}>
      {children}
    </main>
  )
}

Main.propTypes = propTypes

export default Main
