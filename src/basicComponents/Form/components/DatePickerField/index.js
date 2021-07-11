// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { format } from 'date-fns'
import { getCurrentTime } from 'utils/get-current-time'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

// Components
import ErrorMessage from '../ErrorMessage'
import DatePicker from 'basicComponents/DatePicker'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  inputCss: PropTypes.object,
  datePickerProps: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function DatePickerField(props) {
  const { name, inputCss, placeholder, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  return (
    <>
      <DatePicker
        selected={field.value ? new Date(transferDateToUSFormat(field.value)) : ''}
        inputProps={{ css: inputCss, placeholderValue: placeholder || 'Select Date' }}
        onChange={date => {
          setFieldValue(field.name, `${format(date, 'dd/MM/yyyy')} ${getCurrentTime()}`)
        }}
        {...restProps}
      />
      <ErrorMessage name={name} />
    </>
  )
}

DatePickerField.propTypes = propTypes
DatePickerField.defaultProps = defaultProps

export default DatePickerField
