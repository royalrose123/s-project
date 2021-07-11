import Service, { getCallApiFunction } from '../../service'
import normalizer from './normalizer'

class FetchRoleFunctionApi extends Service {
  constructor() {
    super()
    this.name = 'FETCH_ROLE_FUNCTION'
    this.config = {
      url: `/role/user/me`,
      method: 'GET',
      params: {},
    }
    this.normalizer = normalizer
  }
}

export const fetchRoleFunction = (...apiParams) => getCallApiFunction(new FetchRoleFunctionApi(...apiParams))
