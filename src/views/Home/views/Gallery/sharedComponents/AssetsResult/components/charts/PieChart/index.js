import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Chart } from 'react-google-charts'

// Lib MISC
import usePieChartEffect from './hooks/usePieChartEffect'

// Style
import getStyle from './style'
import Clicks from './components/Clicks'

// Variables / Functions
import { PLATFORM_FORMAT_COLOR } from './constants/platformFormatColor'

export const propTypes = {
  pieChartData: PropTypes.object,
}

function PieChart(props) {
  const { pieChartData } = props
  const style = getStyle(props)

  const { result } = pieChartData
  const { rowData, totalClicksRef, platformFormatList } = usePieChartEffect(result)

  const getColor = item => {
    if (
      item.platformName && // 有 platform name
      item.formatName && // 有 format name
      Object.keys(PLATFORM_FORMAT_COLOR).includes(item.platformName) && // 有定義的 platform name color
      Object.keys(PLATFORM_FORMAT_COLOR[item.platformName]).includes(item.formatName) // 有定義的 format name color
    ) {
      return PLATFORM_FORMAT_COLOR[item.platformName][item.formatName]
    } else {
      return PLATFORM_FORMAT_COLOR.Default // 沒有顏色定義，則顯示預設顏色
    }
  }

  return (
    <div css={style.pieChartWrapper()}>
      <div css={style.chartWrapper()}>
        <p css={style.chartTitle()}>Clicks To Website</p>
        <Chart
          css={style.pieChart()}
          chartType='PieChart'
          data={rowData}
          options={{
            chartArea: {
              height: '90%',
              width: '90%',
            },
            pieSliceBorderColor: 'none',
            legend: 'none',
            pieSliceText: 'none',
            slices: platformFormatList,
            tooltip: { trigger: 'none' },
          }}
        />
      </div>
      <div css={style.resultWrapper()}>
        <p css={style.totalTitle()}>Total Clicks</p>
        <p css={style.totalValue()}>{totalClicksRef.current.toLocaleString()}</p>
        <div css={style.clicksWrapper()}>
          {result.map((item, index) => (
            <Clicks
              key={index}
              platform={item.platformName}
              format={item.formatName}
              values={item.clicks}
              totalClicks={totalClicksRef.current}
              color={getColor(item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

PieChart.propTypes = propTypes

export default PieChart
