// Libs
import React from 'react'
import PropTypes from 'prop-types'
import getformikConfig from '../../sharedfFormikConfig'

// Components
import MeasuresOfPerformanceForm from './MeasuresOfPerformanceForm'
import MeasuresOfPerformanceFormik from './MeasuresOfPerformanceFormik'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  forwardRef: PropTypes.any,
  programData: PropTypes.any,
}

// DefaultProps
export const defaultProps = {}

function MeasuresOfPerformance(props) {
  const style = getStyle(props)
  const sharedFormikConfig = getformikConfig(props)

  const { forwardRef, programData } = props

  return (
    <MeasuresOfPerformanceFormik formCss={style.measuresOfPerformance()} sharedFormikConfig={sharedFormikConfig}>
      <MeasuresOfPerformanceForm forwardRef={forwardRef} programData={programData} />
    </MeasuresOfPerformanceFormik>
  )
}

MeasuresOfPerformance.propTypes = propTypes
MeasuresOfPerformance.defaultProps = defaultProps

export default MeasuresOfPerformance
