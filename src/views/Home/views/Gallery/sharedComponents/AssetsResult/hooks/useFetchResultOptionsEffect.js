import useFetcher from 'effects/useFetcher'
import { fetchResultOptions } from 'api/Gallery/AssetsResults/fetchResultOptions'

function useFetchResultOptionsEffect(params = {}) {
  const { isLoaded, isFetching: isOptionsFetching, response: resultOptions } = useFetcher(fetchResultOptions, params, {
    guardValues: [params.campaignId],
  })

  const initialResultOptions = { hasData: false }

  return {
    resultOptions: isLoaded ? resultOptions : initialResultOptions,
    isOptionsLoaded: isLoaded,
    isOptionsFetching,
  }
}

export default useFetchResultOptionsEffect
