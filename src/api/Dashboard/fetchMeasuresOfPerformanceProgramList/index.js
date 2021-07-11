import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'
import normalizer from './normalizer'

class FetchMeasuresOfPerformanceProgramListApi extends Service {
  constructor({ programIds, activities, endDate, startDate }) {
    super()
    this.name = 'FETCH_MEASURES_OF_PERFORMANCE_PROGRAM_LIST'
    this.config = {
      url: `/high_level_campaign/programs/campaigns/comparison`,
      method: 'GET',
      params: {
        programIds,
        activities,
        endDate,
        startDate,
      },
    }
    this.denormalizer = denormalizer

    this.normalizer = normalizer
  }
}

export const fetchMeasuresOfPerformanceProgramList = (...apiParams) => getCallApiFunction(new FetchMeasuresOfPerformanceProgramListApi(...apiParams))
