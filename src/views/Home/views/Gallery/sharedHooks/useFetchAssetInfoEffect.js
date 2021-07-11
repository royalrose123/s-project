import useFetcher from 'effects/useFetcher'
import { fetchAssetInfo } from 'api/Gallery/fetchAssetInfo'

function useFetchAssetInfoEffect(params = {}) {
  const { isLoaded, response: assetInfo } = useFetcher(fetchAssetInfo, params)

  const initialAssetInfo = { captionAlign: [] }

  return { assetInfo: isLoaded ? assetInfo : initialAssetInfo, isLoaded }
}

export default useFetchAssetInfoEffect
