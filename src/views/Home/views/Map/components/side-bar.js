import React from 'react'
import PropTypes from 'prop-types'
import { SidebarFactory, Icons } from 'kepler.gl/dist/components'
import styled from 'styled-components'

const StyledSideBarContainer = styled.div`
  .side-panel--container {
    transform: scale(0.85);
    transform-origin: top left;
    height: 117.64%;
    padding: 0;
    z-index: 1;
  }
`

// props.theme.floatingBtnBgdHover : props.theme.floatingBtnBgd;
// }, function (props) {
//   return props.active ? props.theme.floatingBtnActColor : props.theme.floatingBtnColor;
// }, function (props) {
//   return props.theme.floatingBtnBgdHover;
// }, function (props) {
//   return props.theme.floatingBtnActColor;

const StyledCloseButton = styled.div`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.floatingBtnBgdHover};
  color: ${props => props.theme.primaryBtnColor};
  height: 46px;
  position: absolute;
  top: 0;
  width: 80px;
  right: 0;
  display: flex;

  :hover {
    cursor: pointer;
    background-color: ${props => props.theme.floatingBtnColor};
  }
`

const CloseButtonFactory = () => {
  const propTypes = {
    onClick: PropTypes.func,
    isOpen: PropTypes.bool,
  }

  const CloseButton = ({ onClick, isOpen }) => (
    // <StyledCloseButton className="side-bar__close" style = {{display: isOpen? 'flex' : 'none'}} onClick={onClick}>
    <StyledCloseButton className='side-bar__close' onClick={onClick}>
      <Icons.ArrowRight height='18px' style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, marginLeft: isOpen ? 0 : '30px' }} />
    </StyledCloseButton>
  )

  CloseButton.propTypes = propTypes

  return CloseButton
}

// Custom sidebar will render kepler.gl default side bar
// adding a wrapper component to edit its style
function CustomSidebarFactory(CloseButton) {
  const SideBar = SidebarFactory(CloseButton)
  const CustomSidebar = props => (
    <StyledSideBarContainer>
      <SideBar {...props} />
    </StyledSideBarContainer>
  )
  return CustomSidebar
}

// You can add custom dependencies to your custom factory
CustomSidebarFactory.deps = [CloseButtonFactory]

export default CustomSidebarFactory
