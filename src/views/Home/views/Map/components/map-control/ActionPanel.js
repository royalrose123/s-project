import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Tooltip } from 'kepler.gl/dist/components/common/styled-components'
// import { FormattedMessage } from 'react-intl'

const StyledMapControlAction = styled.div`
  padding: 6px;
  display: flex;
  justify-content: flex-end;
  margin: 6px 0;
`

const ActionPanel = ({ className, children, isShowTooltip = true, id, message }) => (
  <StyledMapControlAction className={className}>
    {children}
    {isShowTooltip && (
      <Tooltip id={id} place='left' effect='solid' theme={{ tooltipBg: '#4ea7e8', tooltipColor: '#fff' }}>
        <span>
          {message}
          {/* <FormattedMessage id={message} /> */}
        </span>
      </Tooltip>
    )}
  </StyledMapControlAction>
)

ActionPanel.defaultProps = {
  isShowTooltip: true,
}

ActionPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isShowTooltip: PropTypes.bool.isRequired,
  id: PropTypes.string,
  message: PropTypes.string,
}

ActionPanel.displayName = 'ActionPanel'

export default ActionPanel
