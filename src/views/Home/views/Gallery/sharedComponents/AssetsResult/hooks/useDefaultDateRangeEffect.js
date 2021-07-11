import { useState, useEffect } from 'react'

const liveEndDate = new Date().getTime()

function useDefaultDateRangeEffect(campaignStartDate, campaignEndDate, isCampaignLive) {
  const [defaultStartDate, setDefaultStartDate] = useState('')

  useEffect(() => {
    if (defaultStartDate) return

    setDefaultStartDate(campaignStartDate)
  }, [campaignStartDate, defaultStartDate])

  return { defaultStartDate, defaultEndDate: isCampaignLive ? liveEndDate : campaignEndDate }
}

export default useDefaultDateRangeEffect
