import React from 'react'
import styled from 'styled-components'

import { PanelToggleFactory, withState } from 'kepler.gl/dist/components'
import { visStateLens } from 'kepler.gl/dist/reducers'

import { setMapConfig } from '../app-reducer'

const StyledPanelToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  background-color: ${props => props.theme.sidePanelHeaderBg};
`

// const ButtonWrapper = styled.div`
//   margin-bottom: 4px;
// `

const PanelToggle = PanelToggleFactory()

const PanelToggleWrapper = props => (
  <StyledPanelToggleWrapper>
    <PanelToggle {...props} />
    {/* <div>gogogoog</div> */}
  </StyledPanelToggleWrapper>
)

// <ButtonWrapper>
//       <Button onClick={() => props.onClickSaveConfig(props.mapState)} width="120px">
//         <Icons.Files height="12px" />
//         Save Config
//       </Button>
//     </ButtonWrapper>

const CustomPanelToggleFactory = () =>
  withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    state => ({ mapState: state.keplerGl.map1 }),
    {
      onClickSaveConfig: setMapConfig,
    },
  )(PanelToggleWrapper)

export default CustomPanelToggleFactory
