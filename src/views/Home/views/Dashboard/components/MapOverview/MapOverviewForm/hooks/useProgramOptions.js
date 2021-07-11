import useFetcher from 'effects/useFetcher'
import { fetchMapOverviewProgramOptions } from 'api/Dashboard/fetchMapOverviewProgramOptions'

function useProgramOptions(params = {}) {
  const { isLoaded: isProgramOptionsLoaded, response: programOptions } = useFetcher(fetchMapOverviewProgramOptions, params, {})

  const initialProgramOptions = []

  return {
    programOptions: isProgramOptionsLoaded ? programOptions : initialProgramOptions,
    isProgramOptionsLoaded,
  }
}

export default useProgramOptions
