// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { format } from 'date-fns'

// Components
import AntRangePicker from 'basicComponents/AntRangePicker'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  forwardRef: PropTypes.object,
  setIsInFuture: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function AntRangePickerField(props) {
  const { forwardRef, setIsInFuture } = props

  const { values, setFieldValue } = useFormikContext()
  const { startDate, endDate, displayStartDate, displayEndDate } = values

  const onApplyClick = () => {
    setFieldValue('startDate', displayStartDate)
    setFieldValue('endDate', displayEndDate)
    setFieldValue('dateType', '')

    setIsInFuture(false)
  }

  const onCancelClick = () => {
    setFieldValue('displayStartDate', startDate)
    setFieldValue('displayEndDate', endDate)
  }

  const onOpenChange = (value, mode) => {}

  const onCalendarChange = dates => {
    if (dates.length === 2) {
      const selectedStartDate = format(dates[0]._d, 'dd/MM/yyyy')
      const selectedEndDate = format(dates[1]._d, 'dd/MM/yyyy')

      setFieldValue('displayStartDate', selectedStartDate)
      setFieldValue('displayEndDate', selectedEndDate)
    }
  }

  return (
    <AntRangePicker
      forwardRef={forwardRef}
      startDate={startDate}
      endDate={endDate}
      displayStartDate={displayStartDate}
      displayEndDate={displayEndDate}
      onOpenChangeProp={onOpenChange}
      onApplyClickProp={onApplyClick}
      onCancelClickProp={onCancelClick}
      onCalendarChangeProp={onCalendarChange}
    />
  )
}

AntRangePickerField.propTypes = propTypes
AntRangePickerField.defaultProps = defaultProps

export default AntRangePickerField
