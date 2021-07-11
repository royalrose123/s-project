import Service, { getCallApiFunction } from '../../service'

class FetchQuicksightUrlApi extends Service {
  constructor() {
    super()
    this.name = 'FETCH_QUICKSIGHT_URL '
    this.config = {
      url: 'quicksight/dashboard',
      method: 'GET',
      params: {},
    }
  }
}

export const fetchQuicksightUrl = (...apiParams) => getCallApiFunction(new FetchQuicksightUrlApi(...apiParams))
