// Libs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'antd/lib/date-picker/style/css'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  forwardRef: PropTypes.object,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  displayStartDate: PropTypes.string,
  displayEndDate: PropTypes.string,
  onOpenChangeProp: PropTypes.func,
  onApplyClickProp: PropTypes.func,
  onCancelClickProp: PropTypes.func,
  onCalendarChangeProp: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function RangePicker(props) {
  const style = getStyle(props)
  const {
    forwardRef,
    startDate,
    endDate,
    displayStartDate,
    displayEndDate,
    onOpenChangeProp,
    onApplyClickProp,
    onCancelClickProp,
    onCalendarChangeProp,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const { RangePicker } = DatePicker

  const dateFormat = 'DD/MM/YYYY'

  const onApplyClick = event => {
    setIsOpen(false)
    onApplyClickProp()
  }

  const onCancelClick = () => {
    setIsOpen(false)
    onCancelClickProp()
  }

  const disabledDate = current => {
    return current > moment(new Date())
  }

  const isDisabledApply = startDate === displayStartDate && endDate === displayEndDate

  return (
    <RangePicker
      ref={forwardRef}
      css={style.rangePicker()}
      defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
      value={[moment(displayStartDate, dateFormat), moment(displayEndDate, dateFormat)]}
      format={dateFormat}
      allowClear={false}
      renderExtraFooter={() => (
        <div css={style.buttonWrapper()}>
          <button css={style.cancelButton()} onClick={onCancelClick}>
            Cancel
          </button>
          <button css={style.applyButton(isDisabledApply)} onClick={onApplyClick} disabled={isDisabledApply}>
            Apply
          </button>
        </div>
      )}
      open={isOpen}
      onFocus={() => setIsOpen(true)}
      getCalendarContainer={triggerNode => triggerNode.parentNode}
      onOpenChange={onOpenChangeProp}
      onCalendarChange={onCalendarChangeProp}
      disabledDate={disabledDate}
    />
  )
}

RangePicker.propTypes = propTypes
RangePicker.defaultProps = defaultProps

export default RangePicker
