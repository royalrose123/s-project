import { useState, useReducer, useCallback } from 'react'
import { initialState, reducer as timeChartReducer, types as timeChartTypes } from '../reducers'
import { pull } from 'lodash'
import { format } from 'date-fns'

// Lib MISC

function useTimeChartEffect(timeChartData, timeChartStartDate, dataType) {
  const [rowData, setRowData] = useState([])

  const [state, dispatch] = useReducer(timeChartReducer, initialState)
  const { timeChartState } = state

  // 根據 isVideo 顯示不同的 data
  const setDataColumnByType = useCallback(isVideo => {
    if (isVideo) {
      dispatch({
        type: timeChartTypes.SET_HAS_DATA,
        dataList: ['Impressions', 'Views', 'Clicks'],
      })
    } else {
      dispatch({
        type: timeChartTypes.SET_HAS_DATA,
        dataList: ['Impressions', 'Clicks'],
      })
    }
  }, [])

  const setDataList = useCallback(() => {
    // 篩選出目前要顯示的 data
    const hasDataList = timeChartState.filter(item => item.isActived && item.hasData).map(item => item.title)

    const hasImpressions = hasDataList.includes('Impressions')
    const hasViews = hasDataList.includes('Views')
    const hasClicks = hasDataList.includes('Clicks')

    // 將要顯示的 data 放進陣列
    const newTimeChartData = timeChartData.map((item, index) => {
      const selectStartDate = new Date(timeChartStartDate)

      // 如果 dataType 是 weekly 或 monthly 且第一筆資料的日期小於 selectStartDate
      // 第一筆資料就顯示 selectStartDate
      const rowDate = dataType !== 'daily' && index === 0 && selectStartDate >= item.date ? new Date(timeChartStartDate) : item.date
      const date = `${format(rowDate, 'MMM')} ${format(rowDate, 'd')}`
      return pull([date, hasImpressions ? item.impressions : null, hasViews ? item.views : null, hasClicks ? item.clicks : null], null)
    })

    // 篩選出要顯示的 data title
    const chartTitleList = timeChartState
      .filter(item => {
        const isDate = item.title === 'Date'

        if (isDate || (item.isActived && item.hasData)) return [item.title]
      })
      .map(item => item.title)

    // 將要顯示的 data title 放進 data 的第一個 index ( for google charts)
    newTimeChartData.unshift(chartTitleList)

    setRowData(newTimeChartData)
  }, [dataType, timeChartData, timeChartStartDate, timeChartState])

  // 如果 timeChartData 改變需要 reset state
  const resetTimeChartState = useCallback(() => {
    dispatch({ type: timeChartTypes.RESET_STATE })
  }, [])

  const onToggleClick = event => {
    const selectToggle = event.currentTarget.dataset.title

    const activedList = timeChartState.filter(item => item.isActived && item.hasData)
    const isActivedData = activedList.find(item => item.title === selectToggle)
    const isOnlyOneData = activedList.length === 1

    // 如果 actived 只剩一個就直接 return
    if (isOnlyOneData && isActivedData) return

    dispatch({ type: timeChartTypes.SET_ACTIVED, title: selectToggle })
  }

  return {
    setDataColumnByType,
    setDataList,
    onToggleClick,
    rowData,
    timeChartState,
    resetTimeChartState,
  }
}

export default useTimeChartEffect
