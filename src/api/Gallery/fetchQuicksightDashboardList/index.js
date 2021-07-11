import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denormalizer'
import normalizer from './normalizer'

class FetchQuicksightDashboardListApi extends Service {
  constructor() {
    super()
    this.name = 'FETCH_QUICKSIGHT_URL '
    this.config = {
      url: 'quicksight/dashboard-list',
      method: 'GET',
      params: {},
    }
    // this.denormalizer = denormalizer

    this.normalizer = normalizer
  }
}

export const fetchQuicksightDashboardList = (...apiParams) => getCallApiFunction(new FetchQuicksightDashboardListApi(...apiParams))
