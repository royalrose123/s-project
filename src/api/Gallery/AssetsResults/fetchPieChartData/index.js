import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchPieChartDataApi extends Service {
  constructor({ campaignId, language, country, region, startDate, endDate, custom }) {
    super()
    this.name = 'FETCH_PIE_CHART_DATA'
    this.config = {
      url: '/reports/format-type/clicks',
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

export const fetchPieChartData = (...apiParams) => getCallApiFunction(new FetchPieChartDataApi(...apiParams))
