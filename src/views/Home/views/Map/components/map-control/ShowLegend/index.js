import React from 'react'
import MapLegend from 'kepler.gl/dist/components/map/map-legend'
import PropTypes from 'prop-types'
import { EXPORT_IMAGE_ID } from 'kepler.gl/dist/constants'
import { SAVE_MAP_ID, SHARE_MAP_ID, OVERWRITE_MAP_ID } from 'kepler.gl/dist/constants/default-settings'

import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import MapControlPanel from '../MapControlPanel'
import LegendIcon from '../../Icons/Legend'

function ShowLegend({ layers, uiState, scale, onToggleMapControl, mode }) {
  const { mapControls, currentModal } = uiState
  const { mapLegend } = mapControls
  const isExport =
    currentModal === EXPORT_IMAGE_ID || currentModal === SAVE_MAP_ID || currentModal === SHARE_MAP_ID || currentModal === OVERWRITE_MAP_ID
  const isActive = mapLegend.active

  return mapLegend.show ? (
    <ActionPanel key={1} isShowTooltip={!isActive} id='ShowLegend' message='Show Legend'>
      {!isActive ? (
        <RoundedMapControlButton
          data-tip
          data-for='ShowLegend'
          className='map-control-button show-legend'
          onClick={e => {
            e.preventDefault()
            onToggleMapControl('mapLegend')
          }}
          isActive={mode === 'light'}
        >
          <LegendIcon height='22px' isActive={mode === 'light'} />
        </RoundedMapControlButton>
      ) : (
        <MapControlPanel scale={scale} header='header.layerLegend' onClick={() => onToggleMapControl('mapLegend')} isExport={isExport}>
          <MapLegend layers={layers} />
        </MapControlPanel>
      )}
    </ActionPanel>
  ) : null
}

ShowLegend.propTypes = {
  layers: PropTypes.array,
  uiState: PropTypes.object,
  scale: PropTypes.number,
  onToggleMapControl: PropTypes.func,
  mode: PropTypes.string,
}

export default ShowLegend
