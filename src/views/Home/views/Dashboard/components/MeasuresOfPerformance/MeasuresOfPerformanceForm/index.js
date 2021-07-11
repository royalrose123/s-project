// Libs
import React, { useEffect, useState, useRef } from 'react'
import Slider from './components/Slider'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'
import useFetcher from 'effects/useFetcher'
import { fetchProgramList } from 'api/Gallery/fetchProgramList'
import { fetchMeasuresOfPerformanceProgramList } from 'api/Dashboard/fetchMeasuresOfPerformanceProgramList'

// Components
import Section from '../../../sharedComponents/Section'
import Filter from '../../../sharedComponents/Filter'
import Select from '../../../sharedComponents/Select'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  forwardRef: PropTypes.any,
}

// DefaultProps
export const defaultProps = {}

function MeasuresOfPerformanceForm(props) {
  const style = getStyle(props)
  const { forwardRef } = props
  const { values } = useFormikContext()
  const { startDate, endDate } = values

  const [selectedProgram, setSelectedProgram] = useState([])
  const [programOptions, setProgramOptions] = useState([])

  const isLoadedRef = useRef(null)
  const selectRef = useRef(null)

  const {
    response: { programList },
    isLoaded: isProgramListLoaded,
  } = useFetcher(fetchProgramList)

  const programIds = isEmpty(selectedProgram) ? selectedProgram : selectedProgram.filter(item => item.value !== 'All').map(item => item.value)
  const selectStartDate = new Date(transferDateToUSFormat(startDate)).getTime()
  const selectEndDate = new Date(transferDateToUSFormat(endDate)).getTime()

  const {
    response: { programData },
  } = useFetcher(
    fetchMeasuresOfPerformanceProgramList,
    {
      programIds,
      activities: ['impressions', 'clicks'],
      endDate: selectEndDate,
      startDate: selectStartDate,
    },
    { guardValues: [Boolean(programList), !isEmpty(selectedProgram)] },
  )

  useEffect(() => {
    if (isProgramListLoaded && !isLoadedRef.current) {
      const programOptions = programList.map(item => ({ label: item.programName, value: item.id }))

      const initialProgramOptions = [{ label: 'All', value: 'All' }]

      const newProgramOptionsWithAll = initialProgramOptions.concat(programOptions)

      if (isEmpty(selectedProgram)) setSelectedProgram(newProgramOptionsWithAll)

      setProgramOptions(newProgramOptionsWithAll)

      isLoadedRef.current = true
    }
  }, [isProgramListLoaded, programList, selectedProgram])

  return (
    <>
      <Section title='Measures of Performance' forwardRef={forwardRef}>
        <div css={style.actionWrapper()}>
          <Select selectRef={selectRef} programOptions={programOptions} selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} />
          <Filter />
        </div>
        <Slider programData={programData} />
      </Section>
    </>
  )
}

MeasuresOfPerformanceForm.propTypes = propTypes
MeasuresOfPerformanceForm.defaultProps = defaultProps

export default MeasuresOfPerformanceForm
