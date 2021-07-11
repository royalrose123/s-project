import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'
class FetchTimeChartDataApi extends Service {
  constructor({ campaignId, language, country, region, dataType, startDate, endDate, custom }) {
    super()
    this.name = 'FETCH_TIME_CHART_DATA'
    this.config = {
      url: '/reports/activities/time-series',
      method: 'GET',
      params: {
        campaignId,
        language,
        country,
        region,
        dataType,
        startDate,
        endDate,
        custom,
      },
    }
    this.denormalizer = denormalizer
  }
}

export const fetchTimeChartData = (...apiParams) => getCallApiFunction(new FetchTimeChartDataApi(...apiParams))
