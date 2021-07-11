import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denormalizer'
import normalizer from './normalizer'

class FetchAssetInfoApi extends Service {
  constructor({ assetId }) {
    super()
    this.name = 'FETCH_ASSET_INFO'

    this.config = {
      url: `/program/asset/${assetId}`,
      method: 'GET',
      params: {
        assetId,
      },
    }

    this.normalizer = normalizer
  }
}

export const fetchAssetInfo = (...apiParams) => getCallApiFunction(new FetchAssetInfoApi(...apiParams))
