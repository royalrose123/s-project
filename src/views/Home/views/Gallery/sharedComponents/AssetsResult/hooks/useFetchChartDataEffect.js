import useFetcher from 'effects/useFetcher'
import { fetchComparisonData } from 'api/Gallery/AssetsResults/fetchComparisonData'
import { fetchTimeChartData } from 'api/Gallery/AssetsResults/fetchTimeChartData'
import { fetchHeatmapData } from 'api/Gallery/AssetsResults/fetchHeatmapData'
import { fetchRankingChartData } from 'api/Gallery/AssetsResults/fetchRankingChartData'
import { fetchComboChartImageData } from 'api/Gallery/AssetsResults/fetchComboChartImageData'
import { fetchComboChartVideoData } from 'api/Gallery/AssetsResults/fetchComboChartVideoData'
import { fetchPieChartData } from 'api/Gallery/AssetsResults/fetchPieChartData'

function useFetchChartDataEffect(params = {}) {
  const guard = { guardValues: [params.isOptionsLoaded, params.campaignId, params.startDate, params.endDate, params.hasData] }

  // comparison chart
  const initialComparisonData = { result: {} }

  const { isLoaded: isComparisonLoaded, isFetching: isComparisonFetching, updateParameters: updateComparison, response: comparisonData } = useFetcher(
    fetchComparisonData,
    params,
    guard,
  )

  // time series chart
  const initialTimeChartData = {}

  const { isLoaded: isTimeChartLoaded, isFetching: isTimeChartFetching, updateParameters: updateTimeChart, response: timeChartData } = useFetcher(
    fetchTimeChartData,
    {
      ...params,
      dataType: 'weekly',
    },
    guard,
  )

  // heatmap
  const initialHeatmapData = {}

  const { isLoaded: isHeatmapLoaded, isFetching: isHeatMapFetching, updateParameters: updateHeatmap, response: heatmapData } = useFetcher(
    fetchHeatmapData,
    {
      ...params,
      activity: 'impressions',
      sumBy: 'country',
    },
    guard,
  )

  // ranking bar chart
  const initialRankingChartData = {
    platform: {},
    result: [],
    hasData: false,
  }

  const {
    isLoaded: isRankingChartLoaded,
    isFetching: isRankingChartFetching,
    updateParameters: updateRankingChart,
    response: rankingChartData,
  } = useFetcher(
    fetchRankingChartData,
    {
      ...params,
      displayBy: 'country',
      activity: 'impressions',
    },
    guard,
  )

  // combo chart image
  const initialComboChartImageData = { platform: {}, result: [] }

  const {
    isLoaded: isComboChartImageLoaded,
    isFetching: isComboChartImageFetching,
    updateParameters: updateComboChartImage,
    response: comboChartImageData,
  } = useFetcher(
    fetchComboChartImageData,
    {
      ...params,
      dataType: 'weekly',
    },
    guard,
  )

  // combo chart video
  const initialComboChartVideoData = { platform: {}, result: [] }

  const {
    isLoaded: isComboChartVideoLoaded,
    isFetching: isComboChartVideoFetching,
    updateParameters: updateComboChartVideo,
    response: comboChartVideoData,
  } = useFetcher(
    fetchComboChartVideoData,
    {
      ...params,
      dataType: 'weekly',
    },
    guard,
  )

  // pie chart
  const initialPieChartData = { result: [] }

  const { isLoaded: isPieChartLoaded, isFetching: isPieChartFetching, updateParameters: updatePieChart, response: pieChartData } = useFetcher(
    fetchPieChartData,
    params,
    guard,
  )

  const updateChartsParameters = params => {
    updateComparison({ ...params })
    updateTimeChart({ ...params })
    updateHeatmap({ ...params })
    updateRankingChart({ ...params })
    updateComboChartImage({ ...params })
    updateComboChartVideo({ ...params })
    updatePieChart({ ...params })
  }

  const isChartFetching =
    isComparisonFetching ||
    isTimeChartFetching ||
    isHeatMapFetching ||
    isRankingChartFetching ||
    isComboChartImageFetching ||
    isComboChartVideoFetching ||
    isPieChartFetching

  return {
    comparisonData: isComparisonLoaded ? comparisonData : initialComparisonData,
    timeChartData: isTimeChartLoaded ? timeChartData : initialTimeChartData,
    heatmapData: isHeatmapLoaded ? heatmapData : initialHeatmapData,
    rankingChartData: isRankingChartLoaded ? rankingChartData : initialRankingChartData,
    comboChartImageData: isComboChartImageLoaded ? comboChartImageData : initialComboChartImageData,
    comboChartVideoData: isComboChartVideoLoaded ? comboChartVideoData : initialComboChartVideoData,
    pieChartData: isPieChartLoaded ? pieChartData : initialPieChartData,
    updateChartsParameters: updateChartsParameters,
    updateTimeChart: updateTimeChart,
    updateHeatmap: updateHeatmap,
    updateRankingChart: updateRankingChart,
    updateComboChartImage: updateComboChartImage,
    updateComboChartVideo: updateComboChartVideo,
    isChartFetching,
  }
}

export default useFetchChartDataEffect
