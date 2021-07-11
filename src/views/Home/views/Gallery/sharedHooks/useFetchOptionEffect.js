import useFetcher from 'effects/useFetcher'
import { fetchProgramOptions } from 'api/Gallery/fetchProgramOptions'

function useFetchOptionsEffect(params = {}) {
  const { isLoaded, response: filterOptions } = useFetcher(fetchProgramOptions, params)

  const initialOptions = {
    programOptions: [],
    programCampaignList: [],
    campaignOptions: [],
    platformOptions: [],
    formatOptions: [],
    languageOptions: [],
    imageSizeOptions: [],
    videoSizeOptions: [],
    tag: [],
  }

  return { filterOptions: isLoaded ? filterOptions : initialOptions }
}

export default useFetchOptionsEffect
