import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class FetchMapOverviewDataApi extends Service {
  constructor({ programIds, activities, startDate, endDate }) {
    super()
    this.name = 'FETCH_MAP_OVERVIEW_DATA'
    this.config = {
      url: `/high_level_campaign/programs/campaigns/map`,
      method: 'GET',
      params: { programIds, activities, startDate, endDate },
    }
    this.denormalizer = denormalizer

    // this.normalizer = normalizer
  }
}

export const fetchMapOverviewData = (...apiParams) => getCallApiFunction(new FetchMapOverviewDataApi(...apiParams))
