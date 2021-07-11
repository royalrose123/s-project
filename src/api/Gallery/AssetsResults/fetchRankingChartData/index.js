import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchRankingChartDataApi extends Service {
  constructor({ campaignId, language, country, region, displayBy, activity, startDate, endDate, custom }) {
    super()
    this.name = 'FETCH_RANKINGCHART_DATA'
    this.config = {
      url: '/reports/activities/ranking',
      method: 'GET',
      params: {
        campaignId,
        language,
        country,
        region,
        displayBy,
        activity,
        startDate,
        endDate,
        custom,
      },
    }
    this.denormalizer = denormalizer
  }
}

export const fetchRankingChartData = (...apiParams) => getCallApiFunction(new FetchRankingChartDataApi(...apiParams))
