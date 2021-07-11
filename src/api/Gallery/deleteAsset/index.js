import Service, { getCallApiFunction } from '../../service'

class DeleteAssetApi extends Service {
  constructor({ assetId }) {
    super()
    this.name = 'DELETE_ASSET'
    this.config = {
      url: `/program/asset/${assetId}`,
      method: 'DELETE',
    }
  }
}

export const deleteAsset = (...apiParams) => getCallApiFunction(new DeleteAssetApi(...apiParams))
