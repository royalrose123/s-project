import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
import normalizer from './normalizer'

class FetchMapOverviewProgramOptionsApi extends Service {
  constructor({ hasDataOnly }) {
    super()
    this.name = 'FETCH_MAP_OVERVIEW_PROGRAM_OPTIONS'
    this.config = {
      url: `/high_level_campaign/programs`,
      method: 'GET',
      params: { hasDataOnly },
    }
    // this.denormalizer = denormalizer

    this.normalizer = normalizer
  }
}

export const fetchMapOverviewProgramOptions = (...apiParams) => getCallApiFunction(new FetchMapOverviewProgramOptionsApi(...apiParams))
