// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import CustomInput from './components/CustomInput'
import DatePickerWithClassName from './components/DatePickerWithClassName'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
  inputProps: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function DatePicker(props) {
  const style = getStyle(props)
  const { inputProps } = props

  return <DatePickerWithClassName css={style.datePicker()} dateFormat='dd/MM/yyyy' customInput={<CustomInput {...inputProps} />} {...props} />
}

DatePicker.propTypes = propTypes
DatePicker.defaultProps = defaultProps

export default DatePicker
