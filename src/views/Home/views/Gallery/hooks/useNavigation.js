import { useState, useEffect } from 'react'
import { sortBy, isEmpty } from 'lodash'
import useFetcher from 'effects/useFetcher'
import { fetchProgramList } from 'api/Gallery/fetchProgramList'

export function useNavigation() {
  const [navigations, setNavigations] = useState([])

  const { isLoaded: isProgramListLoaded, response: detail, updateParameters: updateProgramList } = useFetcher(fetchProgramList)

  useEffect(() => {
    if (isProgramListLoaded) {
      const newNavigation = sortBy(detail.programList, 'programName').map(({ id, programName, createUser, campaign }, index) => {
        return {
          id: id,
          path: programName,
          name: programName,
          program: programName,
          hasSub: !isEmpty(campaign),
          isProgram: true,
          nest: campaign.sort().map((campaign, nestIndex) => {
            return {
              id: id,
              path: campaign,
              name: campaign,
              program: programName,
              hasSub: false,
              isProgram: false,
            }
          }),
        }
      })
      setNavigations(newNavigation)
    }
  }, [detail.programList, isProgramListLoaded])

  return { navigations, updateProgramList, isProgramListLoaded }
}
