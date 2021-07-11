import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchComboChartImageDataApi extends Service {
  constructor({ campaignId, language, country, region, dataType, startDate, endDate, custom }) {
    super()
    this.name = 'FETCH_COMBO_CHART_IMAGE_DATA'
    this.config = {
      url: '/reports/engagement-rate/image',
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

export const fetchComboChartImageData = (...apiParams) => getCallApiFunction(new FetchComboChartImageDataApi(...apiParams))
