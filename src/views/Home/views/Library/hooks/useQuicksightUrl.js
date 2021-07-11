import useFetcher from 'effects/useFetcher'
import { fetchQuicksightDashboard } from 'api/Gallery/fetchQuicksightDashboard'

function useQuicksightUrl(dashboardId) {
  const { response, isLoaded } = useFetcher(fetchQuicksightDashboard, { dashboardId }, { guardValues: [dashboardId] })
  const { embeddedUrl } = response

  return { embeddedUrl, isLoaded }
}

export default useQuicksightUrl
