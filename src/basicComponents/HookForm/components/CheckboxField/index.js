// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, useWatch } from 'react-hook-form'

// Components
import Checkbox from 'basicComponents/Checkbox'

// Lib MISC

// Style

// PropTypes
export const propTypes = {
  name: PropTypes.string,
}

function CheckboxField(props) {
  const { name } = props

  const { setValue, register, control } = useFormContext()

  const currentChecked = useWatch({
    control,
    name,
  })

  useEffect(() => {
    register(name)
  }, [name, register])

  const onCheckboxChange = () => {
    setValue(name, !currentChecked)
  }
  return <Checkbox checked={currentChecked} onChange={onCheckboxChange} {...props} />
}

CheckboxField.propTypes = propTypes

export default CheckboxField
