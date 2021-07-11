// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import DatePicker from 'react-datepicker'
import PopperContainer from './components/PopperContainer'

import 'react-datepicker/dist/react-datepicker.css'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  className: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  className: '',
}

function DatePickerWithClassName({ className, ...restProps }) {
  const PopperContainerComponent = props => <PopperContainer {...props} {...restProps} />

  return <DatePicker calendarClassName={className} popperContainer={PopperContainerComponent} {...restProps} />
}

DatePickerWithClassName.propTypes = propTypes
DatePickerWithClassName.defaultProps = defaultProps

export default DatePickerWithClassName
