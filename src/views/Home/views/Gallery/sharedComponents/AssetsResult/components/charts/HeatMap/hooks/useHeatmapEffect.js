import { useState, useEffect } from 'react'
import { flattenDepth } from 'lodash'
import { getTooltipTitle, getTooltipValue } from '../methods/getTooltipDetail'

// Lib MISC

function useHeatmapEffect(result = [], currentCounty) {
  const [currentToggle, setCurrentToggle] = useState('impressions')
  const [chartRegion, setChartRegion] = useState(currentCounty.countryCode)
  const [chartResolution, setChartResolution] = useState('country')
  const [countryData, setCountryData] = useState([])
  const [regionData, setRegionData] = useState([])

  useEffect(() => {
    if (currentCounty.label === 'All') {
      setChartRegion('world')
      setChartResolution('country')
    } else {
      setChartRegion(currentCounty.countryCode)
      setChartResolution('provinces')
    }
  }, [currentCounty.countryCode, currentCounty.label])

  // set country data
  useEffect(() => {
    const newCountryData = result?.map(item => {
      const countryDetail = `${getTooltipTitle(item.countryName)} ${getTooltipValue(currentToggle, item.values)}`

      return [item.countryCode, item.values, countryDetail]
    })

    const chartDataTitle = ['country', currentToggle, { role: 'tooltip', type: 'string', p: { html: true } }]

    newCountryData.unshift(chartDataTitle)

    setCountryData(newCountryData)
  }, [currentToggle, result])

  // set region data
  useEffect(() => {
    let newRegionData = result
      ?.filter(item => item.countryName === currentCounty.value)
      .map(item => {
        if (!item.regions) return []

        const regionData = item?.regions.map(region => {
          const regionDetail = `${getTooltipTitle(region.regionName)} ${getTooltipValue(currentToggle, region.values)}`

          return [region.regionCode, region.values, regionDetail]
        })

        return regionData
      })

    const chartDataTitle = ['region', currentToggle, { role: 'tooltip', type: 'string', p: { html: true } }]

    newRegionData = flattenDepth(newRegionData, 1)
    newRegionData.unshift(chartDataTitle)

    setRegionData(newRegionData)
  }, [currentCounty.value, currentToggle, result])

  const setResolutionToCountry = () => {
    setChartRegion(currentCounty.continentCode)
    setChartResolution('country')
  }

  const setToggle = selectedToggle => {
    setCurrentToggle(selectedToggle)
  }

  return {
    currentToggle,
    setToggle,
    countryData,
    regionData,
    chartRegion,
    chartResolution,
    setResolutionToCountry,
  }
}

export default useHeatmapEffect
