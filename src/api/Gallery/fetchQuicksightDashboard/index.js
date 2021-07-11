import Service, { getCallApiFunction } from '../../service'

class FetchQuicksightDashboardApi extends Service {
  constructor({ dashboardId }) {
    super()
    this.name = 'FETCH_QUICKSIGHT_URL '
    this.config = {
      url: 'quicksight/dashboard',
      method: 'GET',
      params: {
        dashboardId,
      },
    }
  }
}

export const fetchQuicksightDashboard = (...apiParams) => getCallApiFunction(new FetchQuicksightDashboardApi(...apiParams))
