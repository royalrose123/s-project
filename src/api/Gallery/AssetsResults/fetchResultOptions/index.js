import Service, { getCallApiFunction } from '../../../service'
// import denormalizer from './denormalizer'
import normalizer from './normalizer'

class FetchResultOptionsApi extends Service {
  constructor({ campaignId }) {
    super()
    this.name = 'FETCH_RESULT_OPTIONS'
    this.config = {
      url: '/report/options',
      method: 'GET',
      params: {
        campaignId,
      },
    }
    this.normalizer = normalizer
  }
}

export const fetchResultOptions = (...apiParams) => getCallApiFunction(new FetchResultOptionsApi(...apiParams))
