import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'

class UpdateAssetInfoApi extends Service {
  constructor({ assetId, data, assetSize, assetFile }) {
    super()
    this.name = 'UPDATE_ASSET_INFO'
    this.config = {
      url: `/program/asset/${assetId}`,
      method: 'PATCH',
      data,
    }

    this.denormalizer = denormalizer.bind(this, assetSize, assetFile)
  }
}

export const updateAssetInfo = (...apiParams) => getCallApiFunction(new UpdateAssetInfoApi(...apiParams))
