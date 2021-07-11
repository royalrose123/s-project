import { useRef, useState, useCallback } from 'react'

function useTab() {
  const tabRef = useRef(null)
  const [tab, setTab] = useState('')
  const onTabChange = useCallback(tabName => setTab(tabName), [])

  const setCurrentTab = tabName => {
    tabRef.current.setCurrentTab(tabName)
    onTabChange(tabName)
  }

  const tabProps = {
    ref: tabRef,
    onTabChange,
  }

  return { currentTab: tab, setCurrentTab, tabProps }
}

export default useTab
