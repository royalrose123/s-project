import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Components
import VerticalToolbar from 'kepler.gl/dist/components/common/vertical-toolbar'
import ActionPanel from '../ActionPanel'
import RoundedMapControlButton from '../RoundedMapControlButton'
import PointIcon from '../../Icons/Point'
import ToolbarItem from '../sharedComponents/ToolbarItem'
import Icons from 'assets/icons'

const StyledToolbar = styled(VerticalToolbar)`
  position: absolute;
  right: 10px;
  padding: 0;
`

AddPoint.propTypes = {
  uiState: PropTypes.object,
  mapState: PropTypes.object,
  onToggleMapControl: PropTypes.func,
  onGetPOI: PropTypes.func,
  mode: PropTypes.string,
}

function AddPoint({ mapState, uiState, onToggleMapControl, onGetPOI, mode }) {
  const { mapControls } = uiState
  const { addPoint } = mapControls
  const isActive = addPoint.active

  return (
    <ActionPanel key={4} id='AddPoint' message='Add Point'>
      <StyledToolbar show={isActive}>
        <ToolbarItem
          onClick={() => onGetPOI(mapState.latitude, mapState.longitude, mapState.zoom, 'Community')}
          label='community'
          icon={Icons.Community}
          mode={mode}
        />
        <ToolbarItem
          onClick={() => onGetPOI(mapState.latitude, mapState.longitude, mapState.zoom, 'Strategic')}
          label='strategic'
          icon={Icons.Strategic}
          mode={mode}
        />
        <ToolbarItem
          onClick={() => onGetPOI(mapState.latitude, mapState.longitude, mapState.zoom, 'Development')}
          label='development'
          icon={Icons.Development}
          mode={mode}
          isLastOne
        />
      </StyledToolbar>
      <RoundedMapControlButton
        data-tip
        data-for='AddPoint'
        onClick={() => onToggleMapControl('addPoint')}
        isActive={mode === 'light' ? !isActive : isActive}
      >
        <PointIcon height='22px' isActive={mode === 'light' ? !isActive : isActive} />
      </RoundedMapControlButton>
    </ActionPanel>
  )
}

export default AddPoint
