import React, { useState, useRef } from 'react'
// import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { differenceInDays, subDays, addDays, format } from 'date-fns'

// Libs
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

// Components
import DateType from './components/DateType'
import AntRangePickerField from './components/AntRangePickerField'
import Icons from 'assets/icons'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function Filter(props) {
  const style = getStyle(props)

  const [isInFuture, setIsInFuture] = useState(true)
  const rangepickerRef = useRef(null)

  const { values, setFieldValue } = useFormikContext()
  const { startDate, endDate } = values

  const onPreviousPeriodClick = () => {
    setIsInFuture(false)
    const USStartDate = new Date(transferDateToUSFormat(startDate))
    const USEndDate = new Date(transferDateToUSFormat(endDate))

    const intervalDays = Math.abs(differenceInDays(USStartDate, USEndDate)) + 1

    const newStartDate = format(subDays(USStartDate, intervalDays), 'dd/MM/yyyy')
    const newEndDate = format(subDays(USEndDate, intervalDays), 'dd/MM/yyyy')

    setFieldValue('startDate', newStartDate)
    setFieldValue('endDate', newEndDate)
    setFieldValue('displayStartDate', newStartDate)
    setFieldValue('displayEndDate', newEndDate)
    setFieldValue('dateType', '')
  }

  const onNextPeriodClick = () => {
    setIsInFuture(false)

    const USStartDate = new Date(transferDateToUSFormat(startDate))
    const USEndDate = new Date(transferDateToUSFormat(endDate))

    const intervalDays = Math.abs(differenceInDays(USStartDate, USEndDate)) + 1

    const isInFuture = intervalDays >= Math.abs(differenceInDays(USEndDate, new Date()))

    const yesterday = format(subDays(new Date(), 1), 'dd/MM/yyyy')

    const newStartDate = format(addDays(USStartDate, intervalDays), 'dd/MM/yyyy')
    const newEndDate = isInFuture ? yesterday : format(addDays(USEndDate, intervalDays), 'dd/MM/yyyy')

    // 如果 endDate 會超過昨天就 disabled button
    if (yesterday === newEndDate) setIsInFuture(true)
    if (yesterday === format(USEndDate, 'dd/MM/yyyy')) return

    setFieldValue('startDate', newStartDate)
    setFieldValue('endDate', newEndDate)
    setFieldValue('displayStartDate', newStartDate)
    setFieldValue('displayEndDate', newEndDate)
    setFieldValue('dateType', '')
  }

  return (
    <div css={style.filter()}>
      <div css={style.rangepickerWrapper()}>
        <Icons.Arrow css={style.arrowIcon(true)} onClick={onPreviousPeriodClick} />
        <AntRangePickerField forwardRef={rangepickerRef} setIsInFuture={setIsInFuture} />
        <Icons.Arrow css={style.arrowIcon(false, isInFuture)} onClick={onNextPeriodClick} />
      </div>
      <div css={style.dateTypeWrapper()}>
        <DateType title='Week' value='week' setIsInFuture={setIsInFuture} />
        <DateType title='Month' value='month' setIsInFuture={setIsInFuture} />
        <DateType title='Quarter' value='quarter' setIsInFuture={setIsInFuture} />
      </div>
    </div>
  )
}

Filter.propTypes = propTypes
Filter.defaultProps = defaultProps

export default Filter
