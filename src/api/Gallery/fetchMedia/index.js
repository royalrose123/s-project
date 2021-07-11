import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class FetchMediaApi extends Service {
  constructor({ mediaUrl }) {
    super()
    this.name = 'FETCH_MEDIA'
    this.config = {
      url: mediaUrl,
      method: 'GET',
      responseType: 'blob',
    }
  }
}

export const fetchMedia = (...apiParams) => getCallApiFunction(new FetchMediaApi(...apiParams))
