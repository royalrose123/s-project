import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { startCase, isEmpty } from 'lodash'
import { useFormikContext } from 'formik'

// Components
import { Chart } from 'react-google-charts'
import Toggle from '../../../sharedComponents/Toggle'
import NotEnoughData from '../../../sharedComponents/NotEnoughData'

// Lib MISC
import useHeatmapEffect from './hooks/useHeatmapEffect'
import { getErrorMessage } from '../../../methods/getError'
import { errorType } from '../../../constants/errorType'

// Style
import getStyle from './style'

// Variables / Functions

// Color constants
const heatMapMinColor = '#D1E8FF'
const heatMapMaxColor = '#248EFA'
const heatMapDataLessColor = '#FCFCFC'

// Constants

export const propTypes = {
  isVideo: PropTypes.bool,
  heatmapData: PropTypes.object,
  currentCounty: PropTypes.object,
  updateHeatmap: PropTypes.func,
}

function HeatMap(props) {
  const style = getStyle(props)

  const { isVideo, heatmapData, currentCounty, updateHeatmap } = props
  const { activity: defaultToggle, result, unknown } = heatmapData

  const hasUnknown = Boolean(unknown)

  const [toggleList, setToggleList] = useState([])

  const { currentToggle, setToggle, countryData, regionData, chartRegion, chartResolution, setResolutionToCountry } = useHeatmapEffect(
    result,
    currentCounty,
    defaultToggle,
  )

  const { values } = useFormikContext()

  const { country, region } = values

  const isRegionView = chartResolution === 'provinces'
  const currentCountryName = country === 'All' ? '' : country
  const currentRegionName = region === 'All' ? '' : region

  const currentDisplayCountry = currentRegionName ? '' : currentCountryName
  const currentDisplayArea = isRegionView ? currentRegionName || 'Region' : 'Country'

  const isNotEnoughData = isEmpty(result)

  // 根據 isVideo 顯示不同的 data
  useEffect(() => {
    if (isVideo) {
      setToggleList(['impressions', 'reach', 'views', 'clicks'])
    } else {
      setToggleList(['impressions', 'reach', 'clicks'])
    }
  }, [isVideo])

  const onToggleClick = event => {
    const selectedToggle = event.currentTarget.dataset.title

    setToggle(selectedToggle)
    updateHeatmap({ activity: selectedToggle })
  }

  const chartEvents = [
    {
      eventName: 'error',
      callback({ eventArgs }) {
        const errorMessage = eventArgs[0].message
        const currentErrorType = getErrorMessage(errorMessage)

        // 如果該 country 不能在 geomap 顯示 region，就設成 country
        if (currentErrorType === errorType.MAP_ERROR) {
          setResolutionToCountry()
        }
      },
    },
  ]

  return (
    <div css={style.heatMapWrapper()}>
      <p css={style.chartTitle()}>{`${currentDisplayCountry} Activity by ${currentDisplayArea}`}</p>
      {hasUnknown && <p css={style.heatMapUnknown()}>{`${startCase(currentToggle)} in unmatched regions: ${unknown}`}</p>}
      {isNotEnoughData ? (
        <NotEnoughData />
      ) : (
        <Chart
          css={style.heatMapChart()}
          chartType='GeoChart'
          data={chartResolution === 'country' ? countryData : regionData}
          mapsApiKey='AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
          options={{
            colorAxis: { colors: [heatMapMinColor, heatMapMaxColor] },
            datalessRegionColor: heatMapDataLessColor,
            legend: {
              position: 'absolute',
              top: '0',
              color: 'green',
              // numberFormat: '###,###,###,###',
            },
            tooltip: { isHtml: true },
            region: chartRegion,
            resolution: chartResolution,
            sizeAxis: {
              minValue: 0,
              maxValue: 100,
            },
          }}
          chartEvents={chartEvents}
        />
      )}
      <div css={style.toggleWrapper(isNotEnoughData, isVideo)}>
        {toggleList.map((item, index) => {
          return <Toggle title={item} key={index} toggleColor='#51a4f8' isActived={currentToggle === item} onToggleClick={onToggleClick} />
        })}
      </div>
    </div>
  )
}

HeatMap.propTypes = propTypes

export default HeatMap
