import React from 'react'
import PropTypes from 'prop-types'

import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import ModeIcon from '../../Icons/Mode'

function Mode({ mode, dispatch }) {
  const toggleMode = () => {
    dispatch({ type: 'SET_MODE', mode: mode === 'light' ? 'dark' : 'light' })
  }

  return (
    <ActionPanel key={7} id='Modes' message={mode === 'light' ? 'Dark mode' : 'Light mode'}>
      <RoundedMapControlButton data-tip data-for='Modes' onClick={toggleMode} isActive={mode === 'light'}>
        <ModeIcon isActive={mode === 'light'} />
      </RoundedMapControlButton>
    </ActionPanel>
  )
}

Mode.propTypes = {
  mode: PropTypes.string,
  dispatch: PropTypes.func,
}

export default Mode
