import React from 'react'
import PropTypes from 'prop-types'
// import { Icons } from 'kepler.gl/components'

function CustomSidePanelsFactory() {
  const propTypes = {
    activeSidePanel: PropTypes.string,
  }

  const CustomPanels = props => {
    const { activeSidePanel } = props

    if (activeSidePanel === 'rocket') {
      return <div className='rocket-panel'>THIS IS THE ADDITIONAL CONTENT WE CAN START TO BUILD OUT FOR AN APP</div>
    } else if (activeSidePanel === 'chart') {
      return <div className='rocket-panel'>Charts?</div>
    }

    return null
  }

  CustomPanels.defaultProps = {
    panels: [
      // {
      //   id: 'rocket',
      //   label: 'Rocket',
      //   iconComponent: Icons.Rocket
      // },
      // {
      //   id: 'chart',
      //   label: 'Chart',
      //   iconComponent: Icons.LineChart
      // }
    ],
    getProps: props => ({
      layers: props.layers,
    }),
  }

  CustomPanels.propTypes = propTypes

  return CustomPanels
}

export default CustomSidePanelsFactory
