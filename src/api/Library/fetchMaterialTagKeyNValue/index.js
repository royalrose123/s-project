import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denormalizer'
import normalizer from './normalizer'

class FetchMaterialTagKeyNValueAPI extends Service {
  constructor() {
    super()
    this.name = 'FETCH_MATERIAL_TAG_KEY_N_VALUE'
    this.config = {
      url: `/library/material/library-tag-key-n-value`,
      method: 'GET',
      params: {},
    }
    // this.denormalizer = denormalizer
    this.normalizer = normalizer
  }
}

export const fetchMaterialTagKeyNValue = (...apiParams) => getCallApiFunction(new FetchMaterialTagKeyNValueAPI(...apiParams))
