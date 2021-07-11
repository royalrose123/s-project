import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
// import { AppLogo as KeplerGlLogo } from 'kepler.gl/components'
import { IconRoundSmall } from 'kepler.gl/dist/components/common/styled-components'
import Close from 'kepler.gl/dist/components/common/icons/close'

const StyledMapControlPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.mapPanelHeaderBackgroundColor};
  height: 32px;
  padding: 6px 12px;
  font-size: 11px;
  color: ${props => props.theme.titleTextColor};
  position: relative;

  button {
    width: 18px;
    height: 18px;
  }
`

const StyledMapControlPanel = styled.div`
  background-color: ${props => props.theme.mapPanelBackgroundColor};
  flex-grow: 1;
  z-index: 1;
  p {
    margin-bottom: 0;
  }
`

const StyledMapControlPanelContent = styled.div`
  ${props => props.theme.dropdownScrollBar};
  max-height: 500px;
  min-height: 100px;
  overflow: auto;
`

const MapControlPanel = React.memo(({ children, header, onClick, scale = 1, isExport }) => {
  // console.log(isExport)

  return (
    <StyledMapControlPanel
      style={{
        transform: `scale(${scale}) translate(calc(-${25 * (scale - 1)}% - ${10 * scale}px), calc(${25 * (scale - 1)}% + ${10 * scale}px))`,
        marginBottom: '8px',
      }}
    >
      <StyledMapControlPanelHeader>
        {/* {isExport ? ( */}
        {/*  <KeplerGlLogo version='' appName='kepler.gl' /> */}
        {/* ) : ( */}
        {/*  <span style={{ verticalAlign: 'middle' }}> */}
        {/*    <FormattedMessage id={header} /> */}
        {/*  </span> */}
        {/* )} */}
        <span style={{ verticalAlign: 'middle' }}>
          <FormattedMessage id={header} />
        </span>
        {isExport ? null : (
          <IconRoundSmall className='close-map-control-item' onClick={onClick}>
            <Close height='16px' />
          </IconRoundSmall>
        )}
      </StyledMapControlPanelHeader>
      <StyledMapControlPanelContent>{children}</StyledMapControlPanelContent>
    </StyledMapControlPanel>
  )
})

MapControlPanel.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  onClick: PropTypes.func,
  scale: PropTypes.number,
  isExport: PropTypes.bool,
}

export default MapControlPanel
