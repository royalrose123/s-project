import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denormalizer'

class CreateAssetsApi extends Service {
  constructor({ data, assetSize, assetFile }) {
    super()
    this.name = 'CREATE_ASSETS'
    this.config = {
      url: '/program/assets',
      method: 'POST',
      data,
    }

    this.denormalizer = denormalizer.bind(this, assetSize, assetFile)
  }
}

export const createAssets = (...apiParams) => getCallApiFunction(new CreateAssetsApi(...apiParams))
