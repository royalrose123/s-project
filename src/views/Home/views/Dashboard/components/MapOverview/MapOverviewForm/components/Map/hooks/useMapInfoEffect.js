import { useState, useEffect } from 'react'
import { flattenDeep, isEmpty } from 'lodash'

export function useMapInfoEffect(programOptionList) {
  const [programColorList, setProgramColorList] = useState([])
  const [programBorderList, setProgramBorderList] = useState([])

  useEffect(() => {
    if (!isEmpty(programOptionList)) {
      const newProgramColorList = flattenDeep(
        programOptionList.filter(item => item.value !== 'All').map(item => [item.label, item.color.backgroundColor]),
      )

      const newColorList = ['match', ['get', 'program']] // mapbox match expression
        .concat(newProgramColorList)
        .concat(['multi', '#2c3842'])
        .concat(['blue'])

      setProgramColorList(newColorList)
    }
  }, [programOptionList])

  useEffect(() => {
    if (!isEmpty(programOptionList)) {
      const newProgramBorderList = flattenDeep(
        programOptionList.filter(item => item.value !== 'All').map(item => [item.label, item.color.borderColor]),
      )

      const newBorderList = ['match', ['get', 'program']] // mapbox match expression
        .concat(newProgramBorderList)
        .concat(['multi', '#ffffff'])
        .concat(['#ffffff'])

      setProgramBorderList(newBorderList)
    }
  }, [programOptionList])

  return { programColorList, programBorderList }
}
