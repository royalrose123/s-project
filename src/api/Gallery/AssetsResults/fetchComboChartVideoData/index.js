import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchComboChartVideoDataApi extends Service {
  constructor({ campaignId, language, country, region, dataType, startDate, endDate, custom }) {
    super()
    this.name = 'FETCH_COMBO_CHART_VIDEO_DATA'
    this.config = {
      url: '/reports/engagement-rate/video',
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

export const fetchComboChartVideoData = (...apiParams) => getCallApiFunction(new FetchComboChartVideoDataApi(...apiParams))
