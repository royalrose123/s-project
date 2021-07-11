import React from 'react'
import PropTypes from 'prop-types'

// Components
import TabPanelItem from './components/TabPanelItem'

// Style

// Variables / Functions

export const propTypes = {
  children: PropTypes.any.isRequired,
  itemCss: PropTypes.func,
  name: PropTypes.string,
  currentTab: PropTypes.string,
  onItemClick: PropTypes.func,
}

function TabPanelList(props) {
  const { children, itemCss, currentTab, onItemClick, ...restProps } = props

  const TabListChildren = React.Children.map(children, child => {
    if (!child) return
    const { name } = child.props

    return React.cloneElement(child, {
      itemCss: itemCss({ isActive: currentTab === name }),
      currentTab: currentTab,
    })
  })
  return <div {...restProps}>{TabListChildren}</div>
}

TabPanelList.propTypes = propTypes
TabPanelList.Item = TabPanelItem

export default TabPanelList
