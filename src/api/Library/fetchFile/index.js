import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchMaterialListAPI extends Service {
  constructor({ url }) {
    super()
    this.name = 'FETCH_FILE'
    this.config = {
      url,
      method: 'GET',
      params: {},
      withCredentials: true,
      responseType: 'blob',
    }

    // this.denormalizer = denormalizer
    // this.normalizer = normalizer
  }
}

export const fetchFile = (...apiParams) => getCallApiFunction(new FetchMaterialListAPI(...apiParams))
