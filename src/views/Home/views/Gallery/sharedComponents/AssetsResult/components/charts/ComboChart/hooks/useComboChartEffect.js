import { useState, useEffect } from 'react'
import { format } from 'date-fns'

// Lib MISC

function useComboChartEffect(comboChartData, dataType) {
  const { platform, result: chartData, startDate: comboChartStartDate } = comboChartData
  const [rowData, setRowData] = useState([])
  const [titleList, setTitleList] = useState([])

  useEffect(() => {
    const newTitleList = [
      'Date',
      platform?.mobile ? 'Mobile' : null,
      platform?.digitalDisplay ? 'Digital Display' : null,
      platform?.facebook ? 'Facebook' : null,
      platform?.instagram ? 'Instagram' : null,
      platform?.youTube ? 'YouTube' : null,
      'Engagement Rate',
    ].filter(item => item !== null)

    setTitleList(newTitleList)

    const newRowData = chartData?.map((item, index) => {
      const selectStartDate = new Date(comboChartStartDate)

      // 如果 dataType 是 weekly 或 monthly 且第一筆資料的日期小於 selectStartDate
      // 第一筆資料就顯示 selectStartDate
      const rowDate = dataType !== 'daily' && index === 0 && selectStartDate >= item.date ? new Date(comboChartStartDate) : item.date

      const date = `${format(rowDate, 'MMM')} ${format(rowDate, 'd')}`

      const engagementRate = (item.engagementRate / 100).toFixed(6)

      return [
        date,
        platform?.mobile ? item.mobile : null,
        platform?.digitalDisplay ? item.digitalDisplay : null,
        platform?.facebook ? item.facebook : null,
        platform?.instagram ? item.instagram : null,
        platform?.youTube ? item.youTube : null,
        Number(engagementRate),
      ].filter(item => item !== null)
    })

    newRowData.unshift(newTitleList)

    setRowData(newRowData)
  }, [chartData, comboChartStartDate, dataType, platform])

  return { rowData, titleList, platform }
}

export default useComboChartEffect
