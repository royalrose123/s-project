import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'
import normalizer from './normalizer'

class FetchProgramOptionsApi extends Service {
  constructor({ programName, createUser, hasAll, isMixPlatform }) {
    super()
    this.name = 'FETCH_PROGRAM_OPTIONS'
    this.config = {
      url: '/program/asset/options',
      method: 'GET',
      params: {
        programName,
        createUser,
        hasAll,
        isMixPlatform,
      },
    }
    this.denormalizer = denormalizer

    this.normalizer = normalizer
  }
}

export const fetchProgramOptions = (...apiParams) => getCallApiFunction(new FetchProgramOptionsApi(...apiParams))
