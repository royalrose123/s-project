import useFetcher from 'effects/useFetcher'
import { fetchCampaignList } from 'api/Gallery/fetchCampaignList'

function useFetchCampaignEffect(params = {}) {
  const { isLoaded, response: campaignOptions } = useFetcher(fetchCampaignList, params)

  const initialOptions = []

  return { campaignOptions: isLoaded ? campaignOptions : initialOptions }
}

export default useFetchCampaignEffect
