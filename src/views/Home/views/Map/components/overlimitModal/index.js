import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Constants
import { limitCount } from 'constants/map'

const StyledContainer = styled.div`
  width: 100%;
  //font-family: OpenSans;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #2c313a;
  display: flex;
  flex-direction: column;
`

const StyledButton = styled.button`
  width: 140px;
  height: 40px;
  background-color: #586274;
  color: #fff;
  //font-family: OpenSans;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  margin-top: 82px;
  margin-left: auto;
`

function OverlimitModal({ onCancel }) {
  return (
    <StyledContainer>
      <span>Data is limited to {limitCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} rows, only partial results will be displayed.</span>
      <StyledButton onClick={onCancel}>Got it</StyledButton>
    </StyledContainer>
  )
}

OverlimitModal.propTypes = {
  onCancel: PropTypes.func,
}

export default OverlimitModal
