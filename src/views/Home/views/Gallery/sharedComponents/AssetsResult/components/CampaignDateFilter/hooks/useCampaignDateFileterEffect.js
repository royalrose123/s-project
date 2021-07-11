import { useState, useEffect } from 'react'
import { getMaxResultStartDateRange } from '../methods/getRangeDate'
import { RANGE_DAYS } from '../../../constants/dateRange'
import { format } from 'date-fns'
import { getCurrentTime } from 'utils/get-current-time'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

function useCampaignDateFileterEffect(resultOptions, campaignStartDate, campaignEndDate, isCampaignLive, updateChartsParameters) {
  const [currentCustom, setCurrentCustom] = useState(true)
  const [currentStartDate, setCurrentStartDate] = useState(campaignStartDate)
  const [currentEndDate, setCurrentEndDate] = useState(`${format(new Date(), 'dd/MM/yyyy')} ${getCurrentTime()}`)

  const { periodOptions } = resultOptions

  // 點選 range option call 顯示對應的日期，並且 call APIs
  const setCurrentStartDateRange = (selectedRange, setFieldValue) => {
    const newCurrentCurrentDate = getMaxResultStartDateRange(selectedRange, periodOptions, RANGE_DAYS[selectedRange], campaignStartDate)
    setCurrentStartDate(newCurrentCurrentDate)
    setCurrentEndDate(`${format(new Date(), 'dd/MM/yyyy')} ${getCurrentTime()}`)
    setFieldValue('startDate', newCurrentCurrentDate)
    setFieldValue('endDate', `${format(new Date(), 'dd/MM/yyyy')} ${getCurrentTime()}`)
    setCurrentCustom(false)

    updateChartsParameters({ startDate: newCurrentCurrentDate, endDate: `${format(new Date(), 'dd/MM/yyyy')} ${getCurrentTime()}`, custom: false })
  }

  // 點選 datePicker 日期，並且 call APIs
  const setDateRangeByDatePicker = (values, setFieldValue) => {
    const { startDate, endDate } = values

    setCurrentStartDate(startDate)
    setCurrentEndDate(endDate)
    setFieldValue('startDate', startDate)
    setFieldValue('endDate', endDate)
    setCurrentCustom(true)

    updateChartsParameters({
      startDate: `${format(new Date(transferDateToUSFormat(startDate)), 'dd/MM/yyyy')} ${getCurrentTime()}`,
      endDate: `${format(new Date(transferDateToUSFormat(endDate)), 'dd/MM/yyyy')} ${getCurrentTime()}`,
      custom: true,
    })
  }

  useEffect(() => {
    if (!campaignStartDate) return

    setCurrentStartDate(`${format(new Date(transferDateToUSFormat(campaignStartDate)), 'dd/MM/yyyy')} ${getCurrentTime()}`)
  }, [campaignStartDate])

  return {
    currentStartDate,
    setCurrentStartDateRange,
    currentEndDate: isCampaignLive ? currentEndDate : campaignEndDate,
    setCurrentEndDate,
    setDateRangeByDatePicker,
    currentCustom,
  }
}

export default useCampaignDateFileterEffect
