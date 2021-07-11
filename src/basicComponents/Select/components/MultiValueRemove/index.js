import React from 'react'
import { components as Components } from 'react-select'

// Components
import { Icon } from 'evergreen-ui'

function MultiValueRemove(props) {
  return (
    <Components.MultiValueRemove {...props}>
      <Icon icon='cross' size={12} color='white' />
    </Components.MultiValueRemove>
  )
}

export default MultiValueRemove
