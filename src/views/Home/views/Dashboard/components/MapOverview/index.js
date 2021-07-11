// Libs
import React from 'react'
import PropTypes from 'prop-types'
import getformikConfig from '../../sharedfFormikConfig'

// Components
import MapOverviewForm from './MapOverviewForm'
import MapOverviewFormik from './MapOverviewFormik'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  forwardRef: PropTypes.any,
}

// DefaultProps
export const defaultProps = {}

function MapOverview(props) {
  const style = getStyle(props)
  const sharedFormikConfig = getformikConfig(props)

  const { forwardRef } = props

  return (
    <MapOverviewFormik formCss={style.mapOverview()} sharedFormikConfig={sharedFormikConfig}>
      <MapOverviewForm forwardRef={forwardRef} />
    </MapOverviewFormik>
  )
}

MapOverview.propTypes = propTypes
MapOverview.defaultProps = defaultProps

export default MapOverview
