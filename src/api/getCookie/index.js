import Service, { getCallApiFunction } from '../service'
// import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class GetCookieAPI extends Service {
  constructor() {
    super()
    this.name = 'GET_COOKIE'
    this.config = {
      url: `/user/cookie`,
      method: 'GET',
      params: {},
      withCredentials: true,
    }
    // this.denormalizer = denormalizer
    // this.normalizer = normalizer
  }
}

export const getCookie = (...apiParams) => getCallApiFunction(new GetCookieAPI(...apiParams))
