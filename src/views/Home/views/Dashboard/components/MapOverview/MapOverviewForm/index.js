import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, find, isEqual } from 'lodash'
import { useFormikContext } from 'formik'

// Libs
import { useMapDataEffect } from './hooks/useMapDataEffect'
import useProgramOptions from './hooks/useProgramOptions'
import useMapOverviewData from './hooks/useMapOverviewData'

// Components
import Map from './components/Map'

import Section from '../../../sharedComponents/Section'
import Filter from '../../../sharedComponents/Filter'
import Legend from './components/Legend'
import Select from '../../../sharedComponents/Select'
import Icons from 'assets/icons'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  forwardRef: PropTypes.any,
}

// DefaultProps
export const defaultProps = {}

const colorList = [
  { id: 0, backgroundColor: '#0d587b', borderColor: '#0d7aa7' },
  { id: 1, backgroundColor: '#376b50', borderColor: '#4b9367' },
  { id: 2, backgroundColor: '#dbbd51', borderColor: '#a28e46' },
  { id: 3, backgroundColor: '#9f513b', borderColor: '#e26f4b' },
  { id: 4, backgroundColor: '#69597e', borderColor: '#a28ab9' },
  { id: 5, backgroundColor: '#792e31', borderColor: '#b13f40' },
  { id: 6, backgroundColor: '#76328b', borderColor: '#a344bc' },
  { id: 7, backgroundColor: '#4a562b', borderColor: '#788a38' },
  { id: 8, backgroundColor: '#745830', borderColor: '#b28640' },
  { id: 9, backgroundColor: '#434c8c', borderColor: '#6774d3' },
  { id: 10, backgroundColor: '#364d58', borderColor: '#557782' },
  { id: 11, backgroundColor: '#794031', borderColor: '#b75a3e' },
]

function MapOverviewForm(props) {
  const style = getStyle(props)

  const isLoadedRef = useRef(false)

  const selectRef = useRef(null)
  const mapDataRef = useRef({ features: [] })

  const { forwardRef } = props

  const [programOptions, setProgramOptions] = useState([])
  const [selectedProgram, setSelectedProgram] = useState([])

  const { values } = useFormikContext()
  const { startDate, endDate } = values

  const { programOptions: programOptionsByAPI, isProgramOptionsLoaded } = useProgramOptions({ hasDataOnly: true })
  const { mapOverviewData, isMapOverviewDataLoaded } = useMapOverviewData({
    programIds: selectedProgram.filter(item => item.value !== 'All').map(item => item.programId),
    activities: ['impressions', 'clicks'], // 目前寫死 impressions, clicks，未來可能變成動態或新增其他值
    isProgramOptionsLoaded: isLoadedRef.current, // 如果 isProgramOptionsLoaded 是 false 就先不 call mapOverview API
    startDate,
    endDate,
  })

  const { mapData, tempProgramList } = useMapDataEffect(
    isProgramOptionsLoaded,
    isMapOverviewDataLoaded,
    selectedProgram,
    programOptionsByAPI,
    mapOverviewData,
  )

  useEffect(() => {
    if (isProgramOptionsLoaded && !isLoadedRef.current && !isEmpty(tempProgramList)) {
      // 目前 program 顏色以 12 個色碼循環
      const newProgramList = tempProgramList.map((item, index) => {
        const colorIndex = index % 12

        return { ...item, color: colorList[colorIndex], isMulti: false }
      })

      const allOptions = [{ label: 'All', value: 'All', isMulti: false }]

      const newProgramListWithAll = allOptions.concat(newProgramList)

      if (isEmpty(selectedProgram)) setSelectedProgram(newProgramListWithAll)

      setProgramOptions(newProgramListWithAll)

      isLoadedRef.current = true
    }
  }, [isProgramOptionsLoaded, selectedProgram, tempProgramList])

  useEffect(() => {
    if (!isEmpty(mapData.features) && !isEqual(mapData.features, mapDataRef.current.features)) {
      // 如果某個 country 裡的 program 不只一個，就把裡面的 program 都視為 multiProgram
      // 將 multiProgram 裡的 item 設白色 border
      const multiProgram = []

      mapData.features.forEach(item => {
        if (item.properties.data.length > 1) {
          item.properties.data.forEach(item => {
            multiProgram.push({ programName: item.programName })
          })
        }
      })

      const newSelectedProgram = selectedProgram.map(option => {
        const isMultiProgram = find(multiProgram, { programName: option.label })

        if (isMultiProgram) {
          return { ...option, isMulti: true }
        } else {
          return { ...option, isMulti: false }
        }
      })

      setSelectedProgram(newSelectedProgram)

      mapDataRef.current = mapData
    }
  }, [mapData, selectedProgram])

  return (
    <Section title='Map Overview' forwardRef={forwardRef}>
      <div css={style.actionWrapper()}>
        <Select selectRef={selectRef} programOptions={programOptions} selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} />
        <Filter />
      </div>
      <div css={style.viewWrapper()}>
        <div style={{ display: 'flex', height: `100%`, alignItems: 'center', marginTop: '8px' }}>
          <Icons.View css={style.viewIcon()}></Icons.View>
          <span css={style.view()}>View</span>
        </div>
        <div css={style.legendWrapper()}>
          {selectedProgram
            .filter(item => item.value !== 'All')
            .map((info, index) => (
              <Legend key={index} info={info} selectRef={selectRef.current} />
            ))}
        </div>
      </div>
      {isLoadedRef.current && <Map mapData={mapData} programOptions={programOptions} isMapOverviewDataLoaded={isMapOverviewDataLoaded} />}
    </Section>
  )
}

MapOverviewForm.propTypes = propTypes
MapOverviewForm.defaultProps = defaultProps

export default MapOverviewForm
