import useFetcher from 'effects/useFetcher'
import { fetchMapOverviewData } from 'api/Dashboard/fetchMapOverviewData'

function useMapOverviewData(params = {}, guardValues) {
  const { isProgramOptionsLoaded } = params
  const { isLoaded: isMapOverviewDataLoaded, response: mapOverviewData } = useFetcher(fetchMapOverviewData, params, {
    guardValues: [isProgramOptionsLoaded],
  })

  const initalMapOverviewData = []

  return {
    mapOverviewData: isMapOverviewDataLoaded ? mapOverviewData : initalMapOverviewData,
    isMapOverviewDataLoaded,
  }
}

export default useMapOverviewData
