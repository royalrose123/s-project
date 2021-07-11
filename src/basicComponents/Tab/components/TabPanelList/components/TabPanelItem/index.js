import React from 'react'
import PropTypes from 'prop-types'

// Components

// Style

// Variables / Functions

export const propTypes = {
  children: PropTypes.any,
  itemCss: PropTypes.object,
  customCss: PropTypes.object,
  name: PropTypes.string,
  currentTab: PropTypes.string,
}

function TabPanelItem(props) {
  const { children, itemCss, name, currentTab, customCss, ...restProps } = props

  return (
    <div css={[itemCss, customCss]} {...restProps}>
      {children}
    </div>
  )
}

TabPanelItem.propTypes = propTypes

export default TabPanelItem
