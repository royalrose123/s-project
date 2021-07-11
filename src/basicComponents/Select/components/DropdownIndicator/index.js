// Libs
import React from 'react'
import { components } from 'react-select'
import PropTypes from 'prop-types'

// Components
import { Icon } from 'evergreen-ui'

// Style

// PropTypes
export const propTypes = {
  selectProps: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function DropdownIndicator(props) {
  const { selectProps } = props
  const { menuIsOpen } = selectProps

  return (
    <components.DropdownIndicator {...props}>
      {/* Adding the size to fixed  React props warning */}
      {menuIsOpen ? <Icon icon='chevron-up' size={20} /> : <Icon icon='chevron-down' size={20} />}
    </components.DropdownIndicator>
  )
}

DropdownIndicator.propTypes = propTypes
DropdownIndicator.defaultProps = defaultProps

export default DropdownIndicator
