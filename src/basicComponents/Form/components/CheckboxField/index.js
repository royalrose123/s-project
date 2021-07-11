// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useField, useFormikContext } from 'formik'

// Components
import Checkbox from 'basicComponents/Checkbox'

// Lib MISC

// Style

// PropTypes
export const propTypes = {
  label: PropTypes.string,
}

function CheckboxField(props) {
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  const onCheckboxChange = () => {
    setFieldValue(field.name, !field.value)
  }

  return <Checkbox checked={field.value} onChange={onCheckboxChange} {...props} />
}

CheckboxField.propTypes = propTypes

export default CheckboxField
