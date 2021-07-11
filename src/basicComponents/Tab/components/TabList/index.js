import React from 'react'
import PropTypes from 'prop-types'

// Components
import TabItem from './components/TabItem'

// Style

// Variables / Functions

export const propTypes = {
  children: PropTypes.any.isRequired,
  itemCss: PropTypes.func,
  currentTab: PropTypes.string,
  onItemClick: PropTypes.func,
  onTabItemClickProps: PropTypes.func,
  icon: PropTypes.object,
}

function TabList(props) {
  const { children, itemCss, currentTab, onItemClick, onTabItemClickProps, ...restProps } = props

  const TabListChildren = React.Children.map(children, child => {
    if (!child) return
    const { name } = child.props

    return React.cloneElement(child, {
      itemCss: itemCss({ isActive: currentTab === name }),
      onItemClick: onItemClick,
      onTabItemClickProps: onTabItemClickProps,
      currentTab: currentTab,
    })
  })
  return <div {...restProps}>{TabListChildren}</div>
}

TabList.propTypes = propTypes

TabList.Item = TabItem

export default TabList
