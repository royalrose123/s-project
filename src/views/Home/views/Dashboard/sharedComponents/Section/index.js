// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  forwardRef: PropTypes.any,
}

// DefaultProps
export const defaultProps = {}

function Section(props) {
  const style = getStyle(props)
  const { children, title, forwardRef } = props

  return (
    <div css={style.section()} ref={forwardRef}>
      <h2 css={style.sectionTitle()}>{title}</h2>
      {children}
    </div>
  )
}

Section.propTypes = propTypes
Section.defaultProps = defaultProps

export default Section
