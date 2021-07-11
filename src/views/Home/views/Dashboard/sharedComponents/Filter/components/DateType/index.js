// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { format, subDays } from 'date-fns'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  setIsInFuture: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function DateType(props) {
  const style = getStyle(props)
  const { title, value, setIsInFuture } = props

  const { values, setFieldValue } = useFormikContext()

  const { dateType } = values

  const onDateTypeClick = () => {
    let lastDaysAmount

    if (value === 'week') {
      lastDaysAmount = 7
    } else if (value === 'month') {
      lastDaysAmount = 28
    } else if (value === 'quarter') {
      lastDaysAmount = 84
    }

    setFieldValue('dateType', value)

    setFieldValue('startDate', format(subDays(new Date(), lastDaysAmount), 'dd/MM/yyyy'))
    setFieldValue('displayStartDate', format(subDays(new Date(), lastDaysAmount), 'dd/MM/yyyy'))

    setFieldValue('endDate', format(subDays(new Date(), 1), 'dd/MM/yyyy'))
    setFieldValue('displayEndDate', format(subDays(new Date(), 1), 'dd/MM/yyyy'))
    setIsInFuture(true)
  }

  return (
    <div css={style.dateType(dateType === value)} onClick={onDateTypeClick}>
      {title}
    </div>
  )
}

DateType.propTypes = propTypes
DateType.defaultProps = defaultProps

export default DateType
