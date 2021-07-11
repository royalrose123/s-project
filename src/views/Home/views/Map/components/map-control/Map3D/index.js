import React from 'react'
import PropTypes from 'prop-types'

import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import Cube3DIcon from '../../Icons/Cube3D'

const Map3D = React.memo(({ dragRotate, onTogglePerspective, mode }) => {
  return (
    <ActionPanel className='toggle-3d' key={3} id='Map3D' message={dragRotate ? 'Disable 3D Map' : '3D Map'}>
      <RoundedMapControlButton data-tip data-for='Map3D' onClick={onTogglePerspective} isActive={mode === 'light'}>
        <Cube3DIcon height='22px' isActive={mode === 'light'} />
      </RoundedMapControlButton>
    </ActionPanel>
  )
})

Map3D.propTypes = {
  dragRotate: PropTypes.bool,
  onTogglePerspective: PropTypes.func,
  mode: PropTypes.string,
}

export default Map3D
