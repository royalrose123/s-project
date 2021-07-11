import React from 'react'
import PropTypes from 'prop-types'
import VerticalToolbar from 'kepler.gl/dist/components/common/vertical-toolbar'
import styled from 'styled-components'
import { EDITOR_MODES } from 'kepler.gl/dist/constants/default-settings'
import Icons from 'assets/icons'

// Components
import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import MapIcon from '../../Icons/Map'
import ToolbarItem from '../sharedComponents/ToolbarItem'

const StyledToolbar = styled(VerticalToolbar)`
  position: absolute;
  right: 10px;
  padding: 0;
`

const propTypes = {
  uiState: PropTypes.object,
  editor: PropTypes.object,
  onToggleMapControl: PropTypes.func,
  onToggleEditorVisibility: PropTypes.func,
  onSetEditorMode: PropTypes.func,
  mapIndex: PropTypes.number,
  mode: PropTypes.string,
}

function DrawOnMap({ uiState, editor, onToggleEditorVisibility, onToggleMapControl, onSetEditorMode, mapIndex, mode }) {
  const { mapControls } = uiState
  const { mapDraw } = mapControls
  const isActive = mapDraw.active && mapDraw.activeMapIndex === mapIndex

  return mapDraw.show ? (
    <ActionPanel key={2} isShowTooltip={!isActive} id='map-draw' message='Draw on map'>
      <StyledToolbar show={isActive}>
        <ToolbarItem
          onClick={() => onSetEditorMode(EDITOR_MODES.EDIT)}
          label='select'
          icon={Icons.Select}
          active={editor.mode === EDITOR_MODES.EDIT}
          mode={mode}
        />
        <ToolbarItem
          onClick={() => onSetEditorMode(EDITOR_MODES.DRAW_POLYGON)}
          label='polygon'
          icon={Icons.Polygon}
          active={editor.mode === EDITOR_MODES.DRAW_POLYGON}
          mode={mode}
        />
        <ToolbarItem
          onClick={() => onSetEditorMode(EDITOR_MODES.DRAW_RECTANGLE)}
          label='rectangle'
          icon={Icons.Rectangle}
          active={editor.mode === EDITOR_MODES.DRAW_RECTANGLE}
          mode={mode}
        />
        <ToolbarItem onClick={onToggleEditorVisibility} label='hide' icon={Icons.Hide} mode={mode} active={!editor.visible} />
      </StyledToolbar>
      <RoundedMapControlButton
        data-tip
        data-for='map-draw'
        onClick={() => onToggleMapControl('mapDraw')}
        isActive={mode === 'light' ? !isActive : isActive}
      >
        <MapIcon height='22px' isActive={mode === 'light' ? !isActive : isActive} />
      </RoundedMapControlButton>
    </ActionPanel>
  ) : null
}

DrawOnMap.propTypes = propTypes

export default DrawOnMap
