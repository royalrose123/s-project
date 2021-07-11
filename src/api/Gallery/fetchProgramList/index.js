import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'
import normalizer from './normalizer'

class FetchProgramListApi extends Service {
  constructor() {
    super()
    this.name = 'FETCH_PROGRAM_LIST'
    this.config = {
      url: `/role/user/programs/campaigns`,
      method: 'GET',
      params: {},
    }
    this.denormalizer = denormalizer

    this.normalizer = normalizer
  }
}

export const fetchProgramList = (...apiParams) => getCallApiFunction(new FetchProgramListApi(...apiParams))
