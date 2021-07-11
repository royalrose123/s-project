import React from 'react'
import PropTypes from 'prop-types'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  height: 42px;
  background-color: #4ea7e8;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
`

function MapPortal({ children }) {
  return createPortal(<StyledContainer>{children}</StyledContainer>, document.querySelector('.maps'))
}

MapPortal.propTypes = {
  children: PropTypes.node,
}

export default MapPortal
