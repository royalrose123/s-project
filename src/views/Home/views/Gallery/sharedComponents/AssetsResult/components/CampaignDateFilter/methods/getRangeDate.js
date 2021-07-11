import { subDays, addDays, format } from 'date-fns'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

import { getCurrentTime } from 'utils/get-current-time'

export const getMaxDate = date => {
  return subDays(new Date(transferDateToUSFormat(date)), 1)
}

export const getMinDate = date => {
  return addDays(new Date(transferDateToUSFormat(date)), 1)
}

export const getMaxResultStartDateRange = (rangeType = null, periodOptions, days, campaignStartDate) => {
  if (!periodOptions) return

  if (periodOptions[rangeType]) {
    const dateByRangeType = new Date(subDays(new Date(), days)).getTime()

    return dateByRangeType <= campaignStartDate
      ? campaignStartDate
      : `${format(new Date(transferDateToUSFormat(dateByRangeType)), 'dd/MM/yyyy')} ${getCurrentTime()}`
  }
}

export const getMaxResultEndDateRange = (campaignEndDate, isCampaignLive) => {
  if (isCampaignLive) {
    return new Date()
  } else {
    return new Date(transferDateToUSFormat(campaignEndDate))
  }
}
