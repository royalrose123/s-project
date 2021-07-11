import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchComparisonDataApi extends Service {
  constructor({ campaignId, language, country, region, startDate, endDate, custom }) {
    super()
    this.name = 'FETCH_COMPARISON_DATA'
    this.config = {
      url: '/reports/activities/comparison',
      method: 'GET',
      params: {
        campaignId,
        language,
        country,
        region,
        startDate,
        endDate,
        custom,
      },
    }
    this.denormalizer = denormalizer
  }
}

export const fetchComparisonData = (...apiParams) => getCallApiFunction(new FetchComparisonDataApi(...apiParams))
