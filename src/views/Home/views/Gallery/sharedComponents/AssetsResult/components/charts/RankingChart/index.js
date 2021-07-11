import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'

// Components
import { Chart } from 'react-google-charts'
import DataTypeButton from '../../../sharedComponents/DataTypeButton'
import Label from '../../../sharedComponents/Label'
import Toggle from '../../../sharedComponents/Toggle'

// Lib MISC
import useRankingChartEffect from './hooks/useRankingChartEffect'

// Style
import getStyle from './style'
import NotEnoughData from '../../../sharedComponents/NotEnoughData'

// Variables / Functions

export const propTypes = {
  isVideo: PropTypes.bool,
  rankingChartData: PropTypes.object,
  updateRankingChart: PropTypes.func,
}

// color constants
const platformColor = {
  MOBILE: '#d3e6ff',
  DIGITAL_DISPLAY: '#92bef9',
  FACEBOOK: '#5e98e6',
  INSTAGRAM: '#3b70b7',
  YOUTUBE: '#344776',
}

const mobileColor = '#d3e6ff'
const digitalDisplayColor = '#92bef9'
const facebookColor = '#5e98e6'
const instagramColor = '#3b70b7'
const youtubeColor = '#344776'

function RankingChart(props) {
  const style = getStyle(props)
  const { isVideo, rankingChartData, updateRankingChart } = props

  const { platform } = rankingChartData

  const [dataType, setDataType] = useState('country')

  const { values: formikValues } = useFormikContext()
  const { country, region } = formikValues

  const isCountryAll = country === 'All'
  const isRegionAll = region === 'All'
  const currentDisplayArea = isCountryAll ? 'Country' : `${country}`
  const currentRegion = isRegionAll ? '' : `${region}, `

  const { rowData, setToggle, currentToggle } = useRankingChartEffect(rankingChartData, formikValues)

  const onToggleClick = event => {
    const selectedToggle = event.currentTarget.dataset.title

    setToggle(selectedToggle)
    updateRankingChart({ activity: selectedToggle })
  }

  const isNotEnoughData = isEmpty(rankingChartData.result)

  return (
    <div css={style.rankingChartWrapper()}>
      <p css={style.chartTitle()}>
        <span css={style.chartArea(isCountryAll)}>{`${currentRegion}${currentDisplayArea} `}</span>
        <span>Performance Ranking Top 5</span>
      </p>
      <p css={style.chartDescription()}>ⓘ The region code is undefined. Please check the uploaded data.</p>
      <div css={style.dataTypeButtonWrapper()}>
        <DataTypeButton
          title='Region'
          isActive={dataType === 'region'}
          onClick={() => {
            updateRankingChart({ displayBy: 'region' })
            setDataType('region')
          }}
        />
        <DataTypeButton
          title='Country'
          isActive={dataType === 'country'}
          onClick={() => {
            updateRankingChart({ displayBy: 'country' })
            setDataType('country')
          }}
        />
      </div>
      {isNotEnoughData ? (
        <NotEnoughData />
      ) : (
        <>
          <div css={style.charts()}>
            <Chart
              chartType='BarChart'
              data={rowData}
              options={{
                width: 600,
                height: 320,
                titleTextStyle: {
                  color: '#2c313a',
                  fontSize: 12,
                  italic: false,
                },
                chartArea: { width: '60%' },
                legend: 'none',
                isStacked: true,
                focusTarget: 'category',
                series: {
                  0: { color: platformColor.MOBILE },
                  1: { color: platformColor.DIGITAL_DISPLAY },
                  2: { color: platformColor.FACEBOOK },
                  3: { color: platformColor.INSTAGRAM },
                  4: { color: platformColor.YOUTUBE },
                },
                hAxis: {
                  minValue: 1,
                  baselineColor: '#d8d8d8',
                  format: 'short',
                  title: '',
                  textStyle: {
                    color: '#2c313a',
                    fontSize: 12,
                  },
                },
                vAxis: {
                  format: 'short',
                  title: '',
                  textStyle: {
                    color: '#2c313a',
                    fontSize: 12,
                  },
                },
              }}
            />
          </div>
          <div css={style.labelWrapper()}>
            <Label iconColor={mobileColor} hasData={platform.mobile} text='Mobile' />
            <Label iconColor={digitalDisplayColor} hasData={platform.digitalDisplay} text='Digital Display' />
            <Label iconColor={facebookColor} hasData={platform.facebook} text='Facebook' />
            <Label iconColor={instagramColor} hasData={platform.instagram} text='Instagram' />
            <Label iconColor={youtubeColor} hasData={platform.youtube} text='YouTube' />
          </div>
        </>
      )}
      <div css={style.toggleWrapper(isNotEnoughData, isVideo)}>
        <Toggle title='impressions' toggleColor='#51a4f8' isActived={currentToggle === 'impressions'} onToggleClick={onToggleClick} />
        <Toggle title='reach' toggleColor='#51a4f8' isActived={currentToggle === 'reach'} onToggleClick={onToggleClick} />
        {isVideo && <Toggle title='views' toggleColor='#51a4f8' isActived={currentToggle === 'views'} onToggleClick={onToggleClick} />}
        <Toggle title='clicks' toggleColor='#51a4f8' isActived={currentToggle === 'clicks'} onToggleClick={onToggleClick} />
      </div>
    </div>
  )
}

RankingChart.propTypes = propTypes

export default RankingChart
