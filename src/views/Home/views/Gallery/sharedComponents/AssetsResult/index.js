import React, { useState } from 'react'
import { Formik, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { isEmpty } from 'lodash'
// import JSPDF from 'jspdf'
import 'jspdf-autotable'
// import base64Str from './unicodeMS.json' // TODO: 目前還沒實作 PDF download，另外直接 import json 檔進來會影響 result 一開始會 freeze

// Components
import { Icon, Popover, Pane } from 'evergreen-ui'
import Form from 'basicComponents/Form'
import AssetItemBig from '../AssetsForm/components/AssetItemBig'
import PieChart from './components/charts/PieChart'
import ComboChart from './components/charts/ComboChart'
import RankingChart from './components/charts/RankingChart'
import HeatMap from './components/charts/HeatMap'
import TimeChart from './components/charts/TimeChart'
import Comparison from './components/charts/Comparison'
import ResultsFooter from './components/ResultsFooter'
import Spinner from 'basicComponents/Spinner'
import CampaignDateFilter from './components/CampaignDateFilter'

// Lib MISC
import useGlobalState from 'globalState'
import getformikConfig from './formikConfig'
import useFetchResultOptionsEffect from './hooks/useFetchResultOptionsEffect'
import useFetchChartDataEffect from './hooks/useFetchChartDataEffect'
import useDefaultDateRangeEffect from './hooks/useDefaultDateRangeEffect'
import { getRegionMethods } from './methods/getRegionMethods'
import { fetchResultDownload } from 'api/Gallery/AssetsResults/fetchResultDownload'
import { exportFile, getFilename } from 'utils/download'
import useCampaignDateFileterEffect from './components/CampaignDateFilter/hooks/useCampaignDateFileterEffect'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

// Style
import getStyle from './style'

// Variables / Functions

// PropTypes
export const propTypes = {
  isCampaignLive: PropTypes.bool,
}

function AssetsResult(props) {
  const style = getStyle(props)

  const { isCampaignLive } = props

  const [state] = useGlobalState()

  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess, DMPAccess } = userRoleInfo
  const { canDownloadCampaignResultCsv } = CMPAccess
  const { canViewDMP, canExportData } = DMPAccess

  const showExportButton = canViewDMP && canExportData

  // footer 裡的功能都沒有權限的話就隱藏 footer
  const showResultFooter = canDownloadCampaignResultCsv || showExportButton

  const [currentCounty, setCurrentCounty] = useState({
    label: 'All',
    value: 'All',
    continentCode: '',
    countryCode: '',
    region: [{ label: 'All', value: 'All' }],
  })
  const [currentRange, setCurrentRange] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const { values: useFormikValues } = useFormikContext()
  const { assetProgram, campaignName, campaignId, campaignStartDate, campaignEndDate } = useFormikValues

  const formikConfig = getformikConfig(props)

  const { isOptionsLoaded, isOptionsFetching, resultOptions } = useFetchResultOptionsEffect({
    campaignId,
  })

  const { hasData, formatType, locationOptions, languageOptions, periodOptions } = resultOptions

  const isVideo = formatType?.includes('video')

  // 如果 isCampaignLive 為 true，defaultStartDate 為 campaignStartDate， defaultEndDate 則為 today
  // 如果 isCampaignLive 為 false，defaultStartDate 為 campaignStartDate， defaultEndDate 則為 campaignEndDate，
  const { defaultStartDate, defaultEndDate } = useDefaultDateRangeEffect(campaignStartDate, campaignEndDate, isCampaignLive)
  const {
    comparisonData,
    timeChartData,
    updateTimeChart,
    heatmapData,
    updateHeatmap,
    rankingChartData,
    updateRankingChart,
    comboChartImageData,
    updateComboChartImage,
    comboChartVideoData,
    updateComboChartVideo,
    pieChartData,
    updateChartsParameters,
    isChartFetching,
  } = useFetchChartDataEffect({
    isOptionsLoaded,
    hasData,
    campaignId,
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    custom: true,
  })

  const { currentStartDate, currentEndDate, setCurrentStartDateRange, setDateRangeByDatePicker, currentCustom } = useCampaignDateFileterEffect(
    resultOptions,
    campaignStartDate,
    campaignEndDate,
    isCampaignLive,
    updateChartsParameters,
  )

  // 解構 timeChart Data
  const { hasData: hasTimeChartData, result: timeChartDataList, startDate: timeChartStartDate } = timeChartData

  const { getRegionOptionsByCountry } = getRegionMethods(resultOptions)

  const hasComparisonData = !isEmpty(comparisonData.result)
  const hasHeatmapData = heatmapData.hasData
  const hasRankingChartData = rankingChartData.hasData
  const hasComboChartImageData = comboChartImageData.hasData
  const hasComboChartVideoData = comboChartVideoData.hasData
  const hasPieChartData = !isEmpty(pieChartData.result)

  const isAllEmptyData =
    !hasTimeChartData &&
    !hasComparisonData &&
    !hasHeatmapData &&
    !hasRankingChartData &&
    !hasComboChartImageData &&
    !hasComboChartVideoData &&
    !hasPieChartData

  const currentEnv = process.env.NODE_ENV

  const onExportClick = () => {
    // click export button 後，將 assetProgram, campaignName, campaignStartDate, campaignEndDate 帶到 DMP
    window.open(
      `${
        process.env[`REDIRECT_${currentEnv.toUpperCase()}_DMP_URL`]
      }&assetProgram=${assetProgram}&campaignName=${campaignName}&campaignStartDate=${campaignStartDate}&campaignEndDate=${campaignEndDate}`,
    )
  }

  const onDownloadClick = async ({ formikValues, fileType = 'csv', responseType }) => {
    // 防止 user 連點下載的 <Menu.Item />，所以若 download 中，則不執行後續
    if (isDownloading) return

    setIsDownloading(true)

    const { campaignLanguage, region } = formikValues
    const apiParams = {
      campaignId,
      language: campaignLanguage,
      countryCode: currentCounty.countryCode,
      region,
      startDate: currentStartDate,
      endDate: currentEndDate,
      custom: currentCustom,
      fileType,
      responseType,
    }

    const response = await fetchResultDownload(apiParams)

    // 下載 csv
    if (fileType === 'csv') {
      const { request, headers } = response
      exportFile({ blob: request.response, fileName: getFilename(headers['content-disposition']) })

      // 下載 pdf
      // 因後端產生 PDF 會很耗 server 效能，所以傳 JSON 格式 data 給前端，由前端轉換成 PDF 格式
    }
    // TODO: 目前還沒實作 PDF download
    // else if (fileType === 'json') {
    //   const { report = [], filename = 'table.pdf', headers } = response

    //   // 若 report (要產生 table 的原始 data) 為空值，則不做後續動作
    //   // if (isArray(report) && isEmpty(report)) return alert('No data!!')

    //   const tableBody = []
    //   const tableHeader = []

    //   // 取第一筆資料，抽出 object 的 key 值作為 table headers
    //   // 將 camel case 轉成 start case （用 lodash）
    //   if (Array.isArray(headers)) {
    //     headers.forEach(item => tableHeader.push(startCase(item)))
    //   }

    //   // 取得 table body 的資料，將數字的欄位加上千分位逗點，並抽出 object 的 value 值
    //   report.forEach(item => {
    //     const convertedTableBody = {
    //       ...item,
    //       impressions: item.impressions.toLocaleString(),
    //       reach: item.reach.toLocaleString(),
    //       views: item.views.toLocaleString(),
    //       clicks: item.clicks.toLocaleString(),
    //       engagements: item.engagements.toLocaleString(),
    //     }
    //     tableBody.push(Object.values(convertedTableBody))
    //   })

    //   // 用 jsPDF 產生一個 pdf 實體
    //   const doc = new JSPDF({ orientation: 'landscape', format: 'a3' })
    //   // 將 base64 格式的字體加入（因為 jsPDF 的預設字體，英文以外的語言會出現亂碼）
    //   // 解決方案，參考這個 repo：https://github.com/DmanCoder/font-test-with-jsPDF/blob/master/src/App.js
    //   // 引入上述 repo 的 base64 字體
    //   // 因為 base64 的字體檔容量過大，導致 node 不允許啟動 node server，所以將字體 js 檔轉成 json 格式
    //   // node 顯示的錯誤訊息：https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory
    //   // 掘金的參考文章：https://juejin.im/post/5d80a4f1e51d453b7779d5e6
    //   doc.addFileToVFS('unicodeMS.ttf', base64Str.font) // 將字體載入 jsPDF 的 vFS (virtual file system ?)
    //   doc.addFont('unicodeMS.ttf', 'unicodeMS', 'normal') // 加入字體

    //   // 用 autoTable 在 PDF 中產生 table
    //   doc.autoTable({
    //     head: [tableHeader],
    //     body: tableBody,
    //     styles: {
    //       font: 'unicodeMS',
    //       fontStyle: 'normal',
    //     },
    //   })

    //   // 儲存 PDF 檔
    //   doc.save(filename)
    // }
    setIsDownloading(false)
  }

  const setDataRange = selectedRange => {
    setCurrentRange(selectedRange)
  }

  return (
    <div css={style.assetsResult()}>
      <Formik {...formikConfig}>
        {formikProps => {
          const { values, setFieldValue } = formikProps
          return (
            <Form>
              <div css={style.filterWrapper()}>
                <p css={style.campaignName()}>{campaignName}</p>
                <p css={style.campaignRunningDateTitle()}>Reporting Period</p>
                <Popover
                  statelessProps={{ style: { overflow: 'visible' } }}
                  content={({ close }) => (
                    <Pane css={style.campaignRunningDatePopover()}>
                      <CampaignDateFilter
                        isCampaignLive={isCampaignLive}
                        periodOptions={periodOptions}
                        campaignStartDate={campaignStartDate}
                        campaignEndDate={campaignEndDate}
                        currentStartDate={currentStartDate}
                        currentEndDate={currentEndDate}
                        setCurrentStartDateRange={setCurrentStartDateRange}
                        setDateRangeByDatePicker={setDateRangeByDatePicker}
                        currentRange={currentRange}
                        setDataRange={setDataRange}
                        closeFilter={close}
                      />
                    </Pane>
                  )}
                >
                  <Pane css={style.campaignRunningDate()}>
                    <Icon icon='full-circle' css={style.runningIcon(isCampaignLive)} size={16} />
                    {`${format(new Date(transferDateToUSFormat(currentStartDate) || null), 'dd/MM/yyyy')}
                   - ${format(new Date(transferDateToUSFormat(currentEndDate) || null), 'dd/MM/yyyy')}`}
                    <Icon icon='chevron-down' css={style.campaignRunningDropdown()} size={16} />
                  </Pane>
                </Popover>

                <AssetItemBig title='Language'>
                  <Form.SelectField
                    selectProps={{
                      placeholder: 'Please select',
                    }}
                    options={languageOptions}
                    onChange={event => {
                      updateChartsParameters({ language: event.value })
                    }}
                    name='campaignLanguage'
                  />
                </AssetItemBig>
                <AssetItemBig title='Country'>
                  <Form.SelectField
                    selectProps={{
                      placeholder: 'Please select',
                    }}
                    options={locationOptions}
                    onChange={event => {
                      setCurrentCounty(event)
                      setFieldValue('region', 'All')
                      updateChartsParameters({
                        country: event.countryCode,
                        region: '',
                        sumBy: event.hasRegionView ? 'region' : 'country',
                      })
                    }}
                    name='country'
                  />
                </AssetItemBig>
                <AssetItemBig title='Region'>
                  <Form.SelectField
                    selectProps={{
                      placeholder: 'Please select',
                    }}
                    onChange={event => {
                      updateChartsParameters({ region: event.value })
                    }}
                    name='region'
                    options={getRegionOptionsByCountry(values?.country)}
                  />
                </AssetItemBig>
              </div>
              <div css={style.assetsResultContent()}>
                <div css={style.resultContentHeader()}>
                  <p css={style.resultContentTitle()}>Campaign Summary</p>
                </div>

                {hasData && (
                  <>
                    {hasComparisonData && <Comparison isVideo={isVideo} comparisonData={comparisonData} />}
                    {hasTimeChartData && (
                      <TimeChart
                        isVideo={isVideo}
                        timeChartData={timeChartDataList}
                        updateTimeChart={updateTimeChart}
                        timeChartStartDate={timeChartStartDate}
                      />
                    )}
                    {hasHeatmapData && (
                      <HeatMap isVideo={isVideo} heatmapData={heatmapData} updateHeatmap={updateHeatmap} currentCounty={currentCounty} />
                    )}
                    {hasRankingChartData && (
                      <RankingChart isVideo={isVideo} rankingChartData={rankingChartData} updateRankingChart={updateRankingChart} />
                    )}
                    {hasComboChartImageData && (
                      <ComboChart
                        title='Digital Display Engagement by Platform'
                        chartType='Display'
                        comboChartData={comboChartImageData}
                        updateComboChart={updateComboChartImage}
                      />
                    )}
                    {isVideo && hasComboChartVideoData && (
                      <ComboChart
                        title='Video Views by Platform'
                        chartType='Video'
                        comboChartData={comboChartVideoData}
                        updateComboChart={updateComboChartVideo}
                      />
                    )}
                    {hasPieChartData && <PieChart pieChartData={pieChartData} />}
                  </>
                )}

                {(!hasData || isAllEmptyData) && (
                  <div css={style.noResultMessageWrapper()}>
                    <p css={style.noResultMessageTitle()}>Data currently unavailable</p>
                    <p css={style.noResultMessageContent()}>
                      Campaign results are still to be received. If campaign is complete, please contact admin@atom.international
                    </p>
                  </div>
                )}
              </div>
              {showResultFooter && (
                <ResultsFooter
                  onExportClick={onExportClick}
                  onDownloadCSVClick={() => onDownloadClick({ formikValues: values, fileType: 'csv' })}
                  onDownloadPDFClick={() => onDownloadClick({ formikValues: values, fileType: 'json' })}
                  isDownloading={isDownloading}
                  canDownloadCampaignResultCsv={canDownloadCampaignResultCsv}
                  showExportButton={showExportButton}
                />
              )}
            </Form>
          )
        }}
      </Formik>
      {(isOptionsFetching || isChartFetching) && <Spinner />}
    </div>
  )
}

AssetsResult.propTypes = propTypes

export default AssetsResult
