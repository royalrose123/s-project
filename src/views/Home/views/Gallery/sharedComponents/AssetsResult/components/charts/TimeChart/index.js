import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'

// Components
import { Chart } from 'react-google-charts'
import Toggle from '../../../sharedComponents/Toggle'
import DataTypeButton from '../../../sharedComponents/DataTypeButton'
import NotEnoughData from '../../../sharedComponents/NotEnoughData'

// Lib MISC
import useTimeChartEffect from './hooks/useTimeChartEffect'
import { getChartShowTextEvery } from '../../../methods/getChartShowTextEvery'

// Style
import getStyle from './style'

// Variables / Functions

export const defaultProps = {
  timeChartData: [],
}

export const propTypes = {
  isVideo: PropTypes.bool,
  timeChartData: PropTypes.array,
  updateTimeChart: PropTypes.func,
  timeChartStartDate: PropTypes.string,
}

function TimeChart(props) {
  const { isVideo, timeChartData, updateTimeChart, timeChartStartDate } = props
  const style = getStyle(props)

  const [dataType, setDataType] = useState('weekly')

  const { setDataColumnByType, setDataList, onToggleClick, rowData, timeChartState, resetTimeChartState } = useTimeChartEffect(
    timeChartData,
    timeChartStartDate,
    dataType,
  )

  const titleList = rowData[0]
  const impressionsIndex = titleList?.indexOf('Impressions') - 1
  const clicksIndex = titleList?.indexOf('Clicks') - 1
  const viewsIndex = titleList?.indexOf('Views') - 1

  const impressionsColor = timeChartState.find(item => item.title === 'Impressions').color
  const clicksColor = timeChartState.find(item => item.title === 'Clicks').color
  const viewsColor = timeChartState.find(item => item.title === 'Views').color

  const getLeftYAxisTitle = () => (isVideo ? 'Impressions / Views' : 'Impressions')

  const { values } = useFormikContext()

  const dataLength = timeChartData.length

  // 如果 timeChartData 改變需要 reset state
  useEffect(() => {
    resetTimeChartState()
  }, [resetTimeChartState, values])

  // 根據 isVideo 顯示不同的 data
  useEffect(() => {
    setDataColumnByType(isVideo)
  }, [isVideo, setDataColumnByType, timeChartData])

  // timeChartData 改變重新 set data
  useEffect(() => {
    setDataList()
  }, [setDataList, timeChartData])

  const chartEvents = [
    {
      eventName: 'error',
      callback({ eventArgs }) {
        // 如果有錯誤就把顯示 error 的 div 隱藏
        const chart = document.getElementsByName('timeChart')[0]
        const chartError = chart.childNodes[0]

        chartError.style.display = 'none'
      },
    },
  ]

  return (
    <div css={style.timeChartWrapper()}>
      <p css={style.chartTitle()}>Total</p>
      <div css={style.dataTypeButtonWrapper()}>
        <DataTypeButton
          title='Day'
          isActive={dataType === 'daily'}
          onClick={() => {
            updateTimeChart({ dataType: 'daily' })
            setDataType('daily')
          }}
        />
        <DataTypeButton
          title='Week'
          isActive={dataType === 'weekly'}
          onClick={() => {
            updateTimeChart({ dataType: 'weekly' })
            setDataType('weekly')
          }}
        />
        <DataTypeButton
          title='Month'
          isActive={dataType === 'monthly'}
          onClick={() => {
            updateTimeChart({ dataType: 'monthly' })
            setDataType('monthly')
          }}
        />
      </div>
      {isEmpty(timeChartData) ? (
        <NotEnoughData />
      ) : (
        <>
          <Chart
            className='chart'
            css={style.timeChart()}
            chartType='LineChart'
            data={rowData}
            options={{
              colors: timeChartState.filter(item => item.isActived && item.hasData).map(item => item.color),
              legend: 'none',
              pointSize: 4,
              hAxis: {
                minValue: 1,
                showTextEvery: getChartShowTextEvery(dataLength, 8),
              },
              vAxes: {
                0: {
                  format: 'short',
                  minValue: 1,
                  title: getLeftYAxisTitle(),
                },
                1: {
                  format: 'short',
                  minValue: 1,
                  title: 'Clicks',
                },
              },
              series: {
                [impressionsIndex]: {
                  targetAxisIndex: 0,
                  color: impressionsColor,
                },
                [viewsIndex]: {
                  targetAxisIndex: 0,
                  color: viewsColor,
                },
                [clicksIndex]: {
                  targetAxisIndex: 1,
                  color: clicksColor,
                },
              },
            }}
            chartPackages={['corechart', 'controls']}
            chartEvents={chartEvents}
            rootProps={{ name: 'timeChart' }}
          />
          <div css={style.toggleWrapper()}>
            {timeChartState
              .filter(item => item.hasData)
              .map((item, index) => {
                return <Toggle key={index} title={item.title} toggleColor={item.color} isActived={item.isActived} onToggleClick={onToggleClick} />
              })}
          </div>
        </>
      )}
    </div>
  )
}

TimeChart.defaultProps = defaultProps
TimeChart.propTypes = propTypes

export default TimeChart
