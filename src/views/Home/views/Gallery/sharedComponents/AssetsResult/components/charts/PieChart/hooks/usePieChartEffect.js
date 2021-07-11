import { useState, useEffect, useRef } from 'react'
import { startSwitch } from 'utils/start-switch'
import { setPieColor } from '../methods/setPieColor'

// Lib MISC

function usePieChartEffect(piechartData) {
  const [rowData, setRowData] = useState([])
  const [platformFormatList, setPlatformFormatList] = useState([])

  const totalClicksRef = useRef(0)

  useEffect(() => {
    const newRowData = piechartData.map(item => {
      totalClicksRef.current += item.clicks

      return [`${item.platformName} ${item.formatName}`, item.clicks]
    })

    const pieChartDataTitle = ['Platform', 'Total Clicks']

    newRowData.unshift(pieChartDataTitle)

    setRowData(newRowData)

    return () => {
      totalClicksRef.current = 0
    }
  }, [piechartData])

  useEffect(() => {
    const newPlatformFormatList = piechartData.map(({ platformName, formatName }) => {
      const getColor = startSwitch(() => setPieColor('Facebook', platformName, formatName))
        .next(() => setPieColor('Digital Display', platformName, formatName))
        .next(() => setPieColor('YouTube', platformName, formatName))
        .next(() => setPieColor('Instagram', platformName, formatName))
        .end(() => setPieColor('Mobile', platformName, formatName))

      return {
        color: getColor(),
      }
    })

    setPlatformFormatList(newPlatformFormatList)
  }, [piechartData])

  return { rowData, totalClicksRef, platformFormatList }
}

export default usePieChartEffect
