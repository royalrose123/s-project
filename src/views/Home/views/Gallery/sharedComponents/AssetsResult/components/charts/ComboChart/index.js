import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isArray } from 'lodash'
import DATA_TYPE_DESCRIPTION from './constants/descriptions'
import { fromEvent } from 'rxjs'

// Components
import { Chart } from 'react-google-charts'
import { Pane, Popover } from 'evergreen-ui'
import Label from '../../../sharedComponents/Label'
import DataTypeButton from '../../../sharedComponents/DataTypeButton'
import NotEnoughData from '../../../sharedComponents/NotEnoughData'

// Lib MISC
import useComboChartEffect from './hooks/useComboChartEffect'
import { getChartShowTextEvery } from '../../../methods/getChartShowTextEvery'

// Style
import getStyle from './style'

// Variables / Functions

const PLATFORM = {
  DIGITAL_DISPLAY: 'Digital Display',
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  YOUTUBE: 'YouTube',
  MOBILE: 'Mobile',
  ENGAGEMENT_RATE: 'Engagement Rate',
}

export const propTypes = {
  title: PropTypes.string,
  chartType: PropTypes.string,
  comboChartData: PropTypes.object,
  updateComboChart: PropTypes.func,
}

function ComboChart(props) {
  const { title, chartType, comboChartData, updateComboChart } = props
  const style = getStyle(props)
  const [dataType, setDataType] = useState('weekly')
  const iconRef = useRef(null)
  const [showPopover, setShowPopover] = useState(false)

  const { rowData, titleList } = useComboChartEffect(comboChartData, dataType)

  // Todo: for test use
  // case 1
  // const dummy = [rowData[0], ['jun 29', 0, 0.000002], ['jun 30', 0, 0.000003], ['jun 31', 0, 0.000005]]
  // const dummy = [rowData[0], ['jun 29', 0, 0.0002]]
  // const dummy = [rowData[0], ['jun 29', 0, 0]]
  // const dummy = [rowData[0], ['jun 29', 0, 0], ['jun 30', 0, 0], ['jun 31', 0, 0]]
  // const dummy = [rowData[0], ['jun 29', 0, 1], ['jun 30', 0, 0.5], ['jun 31', 0, 1.5]]

  // case 2
  // const dummy = [rowData[0], ['jun 29', 2000, 0], ['jun 30', 3000, 0], ['jun 31', 4000, 0]]
  // const dummy = [rowData[0], ['jun 29', 2000, 0]]
  // const dummy = [rowData[0], ['jun 29', 0, 0]]
  // const dummy = [rowData[0], ['jun 29', 0, 0], ['jun 30', 0, 0], ['jun 31', 0, 0]]
  // const dummy = [rowData[0], ['jun 29', 1000, 1], ['jun 30', 500, 0], ['jun 31', 1500, 0]]

  // engagement rate 在 titleList 的 index
  const rateIndex = titleList.indexOf(PLATFORM.ENGAGEMENT_RATE)

  // 將 header 的資料去除（['Date', 'Mobile', 'Facebook', 'Engagement Rate']）
  const filterHeaderData = rowData.filter((item, index) => index !== 0)

  // 將所有 data 裡的 engagement rate 數值取出來，並組成陣列
  const engagementRates = rateIndex !== -1 && isArray(filterHeaderData) && filterHeaderData.map(item => item[rateIndex])

  // 檢查是否所有資料都為零
  const hasAllZeroDataInEngagementRate = isArray(engagementRates) && engagementRates.every(item => item === 0)

  // 若所有 engagement rate 皆為零，則設定 chart 的 y 軸顯示範圍，否則，依 data 自行判斷 y 軸上下界線
  const viewWindow = hasAllZeroDataInEngagementRate
    ? {
        min: 0,
        max: 0.1,
      }
    : {}

  const dataLength = rowData.length

  // color constants
  const digitalDisplayColor = '#92bef9'
  const facebookColor = '#5e98e6'
  const instagramColor = '#3b70b7'
  const youtubeColor = '#344776'
  const mobileColor = '#d3e6ff'
  const engagementRateColor = '#f7cc6d'

  // platform index in titleList
  const mobileIndex = titleList.indexOf(PLATFORM.MOBILE) - 1
  const digitalDisplayIndex = titleList.indexOf(PLATFORM.DIGITAL_DISPLAY) - 1
  const facebookIndex = titleList.indexOf(PLATFORM.FACEBOOK) - 1
  const instagramIndex = titleList.indexOf(PLATFORM.INSTAGRAM) - 1
  const youtubeIndex = titleList.indexOf(PLATFORM.YOUTUBE) - 1
  const engagementRateIndex = titleList.indexOf(PLATFORM.ENGAGEMENT_RATE) - 1

  // does this campaign has platform data
  const hasMobile = mobileIndex >= 0
  const hasDigitalDisplay = digitalDisplayIndex >= 0
  const hasFacebook = facebookIndex >= 0
  const hasInstagram = instagramIndex >= 0
  const hasYoutube = youtubeIndex >= 0
  const hasEngagementRate = engagementRateIndex >= 0

  const chartEvents = [
    {
      eventName: 'error',
      callback({ eventArgs }) {
        // 如果有錯誤就把顯示 error 的 div 隱藏
        const chart = document.getElementsByName('comboChart')[0]
        const chartError = chart.childNodes[0]

        chartError.style.display = 'none'
      },
    },
  ]

  useEffect(() => {
    let mouseEnterSubscription
    if (iconRef.current) {
      mouseEnterSubscription = fromEvent(iconRef.current, 'mouseenter').subscribe(() => setShowPopover(true))
    }

    return () => {
      if (mouseEnterSubscription) {
        mouseEnterSubscription.unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    let mouseLeaveSubscription
    if (iconRef.current) {
      mouseLeaveSubscription = fromEvent(iconRef.current, 'mouseleave').subscribe(() => setShowPopover(false))
    }

    return () => {
      if (mouseLeaveSubscription) {
        mouseLeaveSubscription.unsubscribe()
      }
    }
  }, [])

  return (
    <div css={style.comboChartWrapper()}>
      <p css={style.chartTitle()}>{title}</p>
      <div css={style.dataTypeButtonWrapper()}>
        <DataTypeButton
          title='Day'
          isActive={dataType === 'daily'}
          onClick={() => {
            updateComboChart({ dataType: 'daily' })
            setDataType('daily')
          }}
        />
        <DataTypeButton
          title='Week'
          isActive={dataType === 'weekly'}
          onClick={() => {
            updateComboChart({ dataType: 'weekly' })
            setDataType('weekly')
          }}
        />
        <DataTypeButton
          title='Month'
          isActive={dataType === 'monthly'}
          onClick={() => {
            updateComboChart({ dataType: 'monthly' })
            setDataType('monthly')
          }}
        />
      </div>
      {isEmpty(comboChartData.result) ? (
        <NotEnoughData />
      ) : (
        <Chart
          css={style.comboChart()}
          chartType='ComboChart'
          data={rowData}
          options={{
            bar: { groupWidth: '50%' },
            chartArea: {
              width: '85%',
              height: '75%',
            },
            focusTarget: 'category',
            hAxis: {
              showTextEvery: getChartShowTextEvery(dataLength),
            },
            vAxis: {
              baselineColor: '#d8d8d8',
              fontSize: 16,
            },
            isStacked: true,
            legend: {
              position: 'none',
              textStyle: { color: '#9b9b9b' },
            },
            title: '',
            pointSize: 4,
            seriesType: 'bars',
            series: {
              [mobileIndex]: {
                targetAxisIndex: 0,
                color: mobileColor,
              },
              [digitalDisplayIndex]: {
                targetAxisIndex: 0,
                color: digitalDisplayColor,
              },
              [facebookIndex]: {
                targetAxisIndex: 0,
                color: facebookColor,
              },
              [instagramIndex]: {
                targetAxisIndex: 0,
                color: instagramColor,
              },
              [youtubeIndex]: {
                targetAxisIndex: 0,
                color: youtubeColor,
              },
              [engagementRateIndex]: {
                targetAxisIndex: 1,
                color: engagementRateColor,
                type: 'line',
                // curveType: 'function',
              },
            },
            vAxes: {
              0: {
                format: 'short',
                minValue: 1,
              },
              1: {
                viewWindow,
                format: '##,###.#####%',
              },
            },
          }}
          rootProps={{ name: 'comboChart' }}
          chartEvents={chartEvents}
          // tooltip 顯示格式的客製化
          // React Google Chart Document: https://react-google-charts.com/formatters
          // Google Chart Document: https://developers.google.com/chart/interactive/docs/reference#numberformat
          // Google chart 文件對 NumberFormat 的 pattern 沒有太多的解釋，但 amcharts 文件中有提到關於 pattern 的用法可以參考，如下：
          // amcharts Document: https://www.amcharts.com/docs/v4/concepts/formatters/formatting-numbers/#Modifiers
          formatters={[
            {
              type: 'NumberFormat',
              column: engagementRateIndex + 1,
              options: { pattern: '#,###.######%' },
            },
          ]}
        />
      )}
      <div css={style.labelWrapper()}>
        <Label iconColor={mobileColor} hasData={hasMobile} text='Mobile' />
        <Label iconColor={digitalDisplayColor} hasData={hasDigitalDisplay} text='Digital Display' />
        <Label iconColor={facebookColor} hasData={hasFacebook} text='Facebook' />
        <Label iconColor={instagramColor} hasData={hasInstagram} text='Instagram' />
        <Label iconColor={youtubeColor} hasData={hasYoutube} text='YouTube' />
        <Label iconColor={engagementRateColor} hasData={hasEngagementRate} text='Engagement Rate'>
          <Popover
            // trigger='hover'
            isShown={showPopover}
            content={
              <div css={style.popover()}>
                <p css={style.popoverTitle()}>{`Engagement Rate (${chartType})`}</p>
                <p css={style.detail()}>{DATA_TYPE_DESCRIPTION[chartType]}</p>
              </div>
            }
          >
            <Pane css={style.infoIcon()}>
              <div ref={iconRef}>ⓘ</div>
            </Pane>
          </Popover>
        </Label>
      </div>
    </div>
  )
}

ComboChart.propTypes = propTypes

export default ComboChart
