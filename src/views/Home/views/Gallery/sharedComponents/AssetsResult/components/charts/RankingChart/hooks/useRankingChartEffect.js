import { useState, useEffect } from 'react'

// Lib MISC

function useRankingChartEffect(rankingChartData, formikValues) {
  const { result } = rankingChartData

  const [currentToggle, setCurrentToggle] = useState('impressions')

  const { country: selectedCountry, region: selectedRegion } = formikValues

  const [rowData, setRowData] = useState([])

  // set row data
  useEffect(() => {
    const newTitleList = ['Country', 'Mobile', 'Digital Display', 'Facebook', 'Instagram', 'YouTube']

    const newRowData = result.map(item => {
      const itemName = item.hasCode ? item.name : `${item.name} ⓘ`

      return [itemName, item.mobile, item.digitalDisplay, item.facebook, item.instagram, item.youTube]
    })

    newRowData.unshift(newTitleList)

    setRowData(newRowData)
  }, [result, selectedCountry, selectedRegion])

  const setToggle = selectedToggle => {
    setCurrentToggle(selectedToggle)
  }

  return { rowData, setToggle, currentToggle }
}

export default useRankingChartEffect
