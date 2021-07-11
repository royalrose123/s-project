import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
import normalizer from './normalizer'

class FetchHeatmapDataApi extends Service {
  constructor({ campaignId, language, country, dataType, activity, startDate, endDate, custom, sumBy }) {
    super()
    this.name = 'FETCH_HEATMAP_DATA'
    this.config = {
      url: '/reports/activities/locations',
      method: 'GET',
      params: {
        campaignId,
        language,
        country,
        dataType,
        activity,
        startDate,
        endDate,
        custom,
        sumBy,
      },
    }
    this.denormalizer = denormalizer
    this.normalizer = normalizer
  }
}

export const fetchHeatmapData = (...apiParams) => getCallApiFunction(new FetchHeatmapDataApi(...apiParams))
