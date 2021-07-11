import React from 'react'
import PropTypes from 'prop-types'

import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import ExportImageIcon from '../../Icons/ExportImage'

function ExportImage({ uiState, mode, onToggleModal }) {
  const { mapControls } = uiState
  const { exportImage } = mapControls
  const isActive = exportImage.active

  const handleClick = () => {
    onToggleModal('exportImage')
  }

  return (
    <ActionPanel key={0} id='ExportImage' message='Export Image'>
      <RoundedMapControlButton data-tip data-for='ExportImage' onClick={handleClick} isActive={mode === 'light' ? !isActive : isActive}>
        <ExportImageIcon isActive={mode === 'light' ? !isActive : isActive} />
      </RoundedMapControlButton>
    </ActionPanel>
  )
}

ExportImage.propTypes = {
  mode: PropTypes.string,
  uiState: PropTypes.object,
  onToggleModal: PropTypes.func,
}

export default ExportImage
