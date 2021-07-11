import React from 'react'
import PropTypes from 'prop-types'

import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import ExportDataIcon from '../../Icons/ExportData'

function ExportData({ uiState, mode, onToggleModal }) {
  const { mapControls } = uiState
  const { exportData } = mapControls
  const isActive = exportData.active

  const handleClick = () => {
    onToggleModal('exportData')
  }

  return (
    <ActionPanel key={6} id='DataExport' message='Export Data'>
      <RoundedMapControlButton data-tip data-for='DataExport' onClick={handleClick} isActive={mode === 'light' ? !isActive : isActive}>
        <ExportDataIcon isActive={mode === 'light' ? !isActive : isActive} />
      </RoundedMapControlButton>
    </ActionPanel>
  )
}

ExportData.propTypes = {
  mode: PropTypes.string,
  uiState: PropTypes.object,
  onToggleModal: PropTypes.func,
}

export default ExportData
