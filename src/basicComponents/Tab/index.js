import React, { useState, useRef, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// Components
import TabList from './components/TabList'
import TabPanelList from './components/TabPanelList'

// Style

// Variables / Functions

export const propTypes = {
  onTabChange: PropTypes.func,
  children: PropTypes.any.isRequired,
}

export const defaultProps = {
  onTabChange: () => {},
}

const Tab = React.forwardRef((props, ref) => {
  const { children, onTabChange, ...restProps } = props
  const [currentTab, setCurrentTab] = useState('')
  const tabRef = useRef(null)

  useImperativeHandle(ref, () => ({
    setCurrentTab,
    currentTab,
  }))

  useEffect(() => {
    const firstTab = tabRef.current.querySelector('div[data-for]')
    const firstTabName = firstTab.dataset.for

    setCurrentTab(firstTabName)
    onTabChange(firstTabName)
  }, [onTabChange])

  const onItemClick = event => {
    const selectTab = event.currentTarget.dataset.for

    setCurrentTab(selectTab)
    onTabChange(selectTab)
  }

  const TabChildren = React.Children.map(children, child => {
    return React.cloneElement(child, {
      onItemClick: onItemClick,
      currentTab: currentTab,
    })
  })
  return (
    <div ref={tabRef} {...restProps}>
      {TabChildren}
    </div>
  )
})

Tab.propTypes = propTypes
Tab.defaultProps = defaultProps

Tab.TabList = TabList
Tab.TabPanelList = TabPanelList

export default Tab
