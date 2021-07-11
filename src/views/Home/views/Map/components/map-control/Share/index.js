import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RoundedMapControlButton from '../RoundedMapControlButton'
import ActionPanel from '../ActionPanel'
import ShareIcon from '../../Icons/Share'
import MapPortal from './MapPortal'

const StyledText = styled.span`
  //font-family: OpenSans;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  user-select: none;
`
function Share({ uiState, mode }) {
  const [isOpen, setIsOpen] = useState(false)
  const timer = useRef(null)
  const { mapControls } = uiState
  const { share } = mapControls
  const isActive = share.active

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  const handleClick = () => {
    setIsOpen(true)
    navigator.clipboard.writeText(location.href)

    timer.current = setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  return (
    <>
      <ActionPanel key={5} id='Shares' message='Share'>
        <RoundedMapControlButton data-tip data-for='Shares' onClick={handleClick} isActive={mode === 'light' ? !isActive : isActive}>
          <ShareIcon isActive={mode === 'light' ? !isActive : isActive} />
        </RoundedMapControlButton>
      </ActionPanel>
      {isOpen && (
        <MapPortal>
          <StyledText>Copied the URL to clipboard.</StyledText>
        </MapPortal>
      )}
    </>
  )
}

Share.propTypes = {
  mode: PropTypes.string,
  uiState: PropTypes.object,
}

export default Share
