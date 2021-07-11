// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { getCurrentTime } from 'utils/get-current-time'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'
import { useFormContext, useWatch } from 'react-hook-form'

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
  defaultValue: PropTypes.string,
}

// DefaultProps
export const defaultProps = {}

function DatePickerField(props) {
  const { name, inputCss, placeholder, defaultValue, ...restProps } = props

  const { control, setValue, register } = useFormContext()

  const currentDate = useWatch({
    control,
    name,
  })

  useEffect(() => {
    register(name)
  }, [name, register])

  return (
    <>
      <DatePicker
        selected={currentDate ? new Date(transferDateToUSFormat(currentDate)) : ''}
        inputProps={{ css: inputCss, placeholderValue: placeholder || 'Select Date' }}
        onChange={date => {
          setValue(name, `${format(date, 'dd/MM/yyyy')} ${getCurrentTime()}`)
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
