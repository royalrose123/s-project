import { useState, useEffect, useRef } from 'react'
import useParamsEffect from './useParamsEffect'
import useFetcher from 'effects/useFetcher'
import { fetchProgramAssets, cancelProgramAssetsRequest } from 'api/Gallery/fetchProgramAssets'
import { isEmpty, isEqual } from 'lodash'

export const DEFAULT_PAGE_SIZE = 50

const initialSearchForm = {
  assetName: '',
  programName: 'All',
  campaignName: 'All',
  platform: 'All',
  format: 'All',
  countryCode: 'All',
  language: 'All',
  tagKey: 'All',
  tagValue: 'All',
  runningDate: '',
}

export const TABS = {
  ALL: 'All',
  FACEBOOK: 'Facebook',
  DIGITAL_DISPLAY: 'Digital Display',
  YOUTUBE: 'YouTube',
  INSTAGRAM: 'Instagram',
  MOBILE: 'Mobile',
}

export function useProgramAssets(match, history, currentObserver, setCurrentObserver, setCurrentTab, currentTab, tabProps) {
  const { params } = match
  const { program, campaign } = params

  const { currentProgram, currentCampaign } = useParamsEffect(match)
  const currentPath = currentCampaign ? `${currentProgram}/${currentCampaign}` : currentProgram

  const [searchForm, setSearchForm] = useState(initialSearchForm)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [isFirstFetch, setIsFirstFetch] = useState(true)
  const [currentAssetList, setCurrentAssetList] = useState([])
  const [fetchDataStatus, setFetchDataStatus] = useState('')

  const programAssetsRef = useRef({})
  const currentPathRef = useRef('All')

  // 為了重新整理可以 keep program 跟 campaign 且更動時不會觸發 fetchProgramAssets
  // 一開始將 program 跟 campaign 存在 useRef
  const currentProgramRef = useRef(program)
  const currentCampaignRef = useRef(campaign)

  const { isLoaded: isAssetsLoaded, response: programAssets, updateParameters: updateProgramAssets, error, isFetching } = useFetcher(
    fetchProgramAssets,
    {
      programName: window.decodeURIComponent(currentProgramRef.current),
      campaignName: isEmpty(currentCampaignRef.current) ? '' : window.decodeURIComponent(currentCampaignRef.current),
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      isMixPlatform: true,
    },
  )

  useEffect(() => {
    if (isAssetsLoaded && programAssets?.programAssetList) {
      setIsFirstFetch(false)
    }
  }, [isAssetsLoaded, programAssets])

  // 如果 programAssets 更新就清空 programAssetsRef
  useEffect(() => {
    if (isEmpty(programAssets)) {
      programAssetsRef.current = programAssets
    }
  }, [programAssets])

  useEffect(() => {
    if (isAssetsLoaded && isFirstFetch) {
      setCurrentAssetList(programAssets?.programAssetList)

      programAssetsRef.current = programAssets
    }
  }, [isAssetsLoaded, isFirstFetch, programAssets])

  // 切換 navigation 時重 call API，且將 tab, searchForm 重置
  useEffect(() => {
    if (currentPathRef.current !== currentPath) {
      if (currentObserver) {
        setCurrentObserver(null)
        currentObserver.disconnect()
      }

      if (fetchDataStatus !== 'searchClick') {
        cancelProgramAssetsRequest()
        const newSearchForm = { ...initialSearchForm, programName: currentProgram, campaignName: currentCampaign || 'All' }

        setSearchForm(newSearchForm)

        setCurrentTab(TABS.ALL)
        setSearchInputValue('')

        updateProgramAssets({
          programName: window.decodeURIComponent(currentProgram),
          campaignName: isEmpty(currentCampaign) ? null : window.decodeURIComponent(currentCampaign),
          platform: '',
          format: '',
          assetName: '',
          language: '',
          runningDate: '',
          countryCode: '',
          tagKey: '',
          tagValue: '',
          page: 1,
          pageSize: DEFAULT_PAGE_SIZE,
        })

        setTimeout(() => {
          // 確保先執行 updateProgramAssets 才 setFetchDataStatus
          setFetchDataStatus('navigationClick')
        }, 0)
      }
    }
    return () => {}
  }, [currentCampaign, currentObserver, currentPath, currentProgram, fetchDataStatus, setCurrentObserver, setCurrentTab, updateProgramAssets])

  // 切換 program 時 setRouterParams
  useEffect(() => {
    if (!isEmpty(currentProgram)) {
      currentPathRef.current = currentPath
    }
  }, [currentPath, currentProgram])

  useEffect(() => {
    if (!isEqual(programAssetsRef.current, programAssets) && !isEmpty(programAssets)) {
      switch (fetchDataStatus) {
        case 'loadmore':
          if (isEmpty(programAssetsRef.current.next)) return

          programAssetsRef.current = programAssets

          setCurrentAssetList(currentAssetList.concat(programAssets?.programAssetList))
          setFetchDataStatus('')
          break
        case 'navigationClick':
          programAssetsRef.current = programAssets
          setCurrentAssetList(programAssets?.programAssetList)
          setFetchDataStatus('')
          break
        case 'tabItemClick':
        case 'searchClick':
          programAssetsRef.current = programAssets
          setCurrentAssetList(programAssets?.programAssetList)
          setFetchDataStatus('')
          break

        case 'initialize':
          programAssetsRef.current = programAssets
          setCurrentAssetList(programAssets?.programAssetList)
          setFetchDataStatus('')
          break
        case 'inputChange':
          programAssetsRef.current = programAssets

          setCurrentAssetList([])
          setCurrentAssetList(programAssets?.programAssetList)
          break
      }
    }
  }, [currentAssetList, fetchDataStatus, programAssets])

  const handleLoadmore = currentPage => {
    cancelProgramAssetsRequest()

    updateProgramAssets({
      ...searchForm,
      programName: window.decodeURIComponent(currentProgram),
      campaignName: isEmpty(currentCampaign) ? null : window.decodeURIComponent(currentCampaign),
      platform: tabProps.ref.current.currentTab,
      assetName: searchInputValue,
      page: currentPage,
      pageSize: DEFAULT_PAGE_SIZE,
    })

    setFetchDataStatus('loadmore')
  }

  const onTabItemClick = event => {
    cancelProgramAssetsRequest()

    setCurrentAssetList([])

    if (currentObserver) {
      setCurrentObserver(null)
      currentObserver.disconnect()
    }

    const selectTab = event.currentTarget.dataset.for
    setSearchForm({ ...initialSearchForm, platform: selectTab })

    updateProgramAssets({
      programName: window.decodeURIComponent(currentProgram),
      campaignName: isEmpty(currentCampaign) ? null : window.decodeURIComponent(currentCampaign),
      platform: selectTab,
      format: '',
      assetName: '',
      language: '',
      runningDate: '',
      countryCode: '',
      tagKey: '',
      tagValue: '',
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    })

    setTimeout(() => {
      // 確保先執行 updateProgramAssets 才 setFetchDataStatus
      setFetchDataStatus('tabItemClick')
    }, 0)
  }

  const onInputChange = inputValue => {
    cancelProgramAssetsRequest()

    if (currentObserver) {
      setCurrentObserver(null)
      currentObserver.disconnect()
    }

    setSearchForm({ ...searchForm, assetName: inputValue })

    if (inputValue.length >= 3) {
      setSearchInputValue(inputValue)
    } else {
      inputValue = ''
      setSearchInputValue('')
    }

    if (inputValue === '__accessToken__') history.push('/home/accessToken')

    updateProgramAssets({
      programName: currentProgram,
      platform: currentTab,
      assetName: inputValue,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    })

    setTimeout(() => {
      // 確保先執行 updateProgramAssets 才 setFetchDataStatus
      setFetchDataStatus('inputChange')
    }, 0)
  }

  const onSearchClick = values => {
    cancelProgramAssetsRequest()
    setSearchForm(values)
    setCurrentTab(values.platform)

    if (currentObserver) {
      setCurrentObserver(null)
      currentObserver.disconnect()
    }

    const { programName, campaignName } = values
    const programNameUrl = program === 'All' ? window.encodeURIComponent(programName) : window.encodeURIComponent(program)
    const campaignNameUrl =
      program === 'All'
        ? window.encodeURIComponent(campaignName)
        : campaign
        ? window.encodeURIComponent(campaign)
        : window.encodeURIComponent(campaignName)
    setFetchDataStatus('searchClick')
    updateProgramAssets({
      ...values,
      programName: program === 'All' ? programName : program,
      campaignName: campaign || campaignName,
      platform: values.platform,
      assetName: searchInputValue,
      pageSize: DEFAULT_PAGE_SIZE,
      page: 1,
    })

    setTimeout(() => {
      // 確保先執行 updateProgramAssets 才 setFetchDataStatus
      setFetchDataStatus('searchClick')
    }, 0)

    if (campaignNameUrl === 'All') {
      history.push(`/home/gallery/program/${programNameUrl}`)
    } else {
      history.push(`/home/gallery/program/${programNameUrl}/${campaignNameUrl}`)
    }
  }

  // create, duplicate, edit assest 時都要 initiateCurrentAssetList
  const initiateCurrentAssetList = () => {
    cancelProgramAssetsRequest()

    if (currentObserver) {
      setCurrentObserver(null)
      currentObserver.disconnect()
    }

    updateProgramAssets({
      ...searchForm,
      programName: window.decodeURIComponent(currentProgram),
      campaignName: isEmpty(currentCampaign) ? null : window.decodeURIComponent(currentCampaign),
      platform: tabProps?.ref?.current?.currentTab || currentTab, // TODO: 基本上要拿 tabProps 裡的 currentTab，但因為切換畫面時 tabProps 會變成 null
      assetName: searchInputValue,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    })

    setTimeout(() => {
      // 確保先執行 updateProgramAssets 才 setFetchDataStatus
      setFetchDataStatus('initialize')
    }, 0)
  }

  return {
    isAssetsLoaded,
    programAssets,
    updateProgramAssets,
    error,
    currentProgram,
    currentCampaign,
    handleLoadmore,
    onTabItemClick,
    currentAssetList,
    setCurrentAssetList,
    isFetching,
    searchForm,
    onInputChange,
    onSearchClick,
    initiateCurrentAssetList,
  }
}

export default useProgramAssets
