import { useState, useEffect } from 'react'
import useFetcher from 'effects/useFetcher'
import { fetchMaterialCategories } from 'api/Library/fetchMaterialCategories'
import { fetchMaterialList } from 'api/Library/fetchMaterialList'
import { isArray, isEmpty } from 'lodash'
import { LIBRARY_CATEGORIES, TRIGGER_SEARCH_THRESHOLD } from '../constant'

const defaultParams = {
  category: '',
  search: '',
  col: '',
  no: '',
  order: '',
  tags: [],
}

const getSearchValue = search => {
  const shouldTriggerSearch = search.length >= TRIGGER_SEARCH_THRESHOLD || search.length === 0
  return shouldTriggerSearch ? search : ''
}

function useLibraryData(params = defaultParams) {
  const { category = '', search = '' } = params
  const [categoryList, setCategoryList] = useState([])

  const shouldFetchQuicksight = category ? category === LIBRARY_CATEGORIES.QUICKSIGHT : true
  const shouldFetchPresentation = category ? category === LIBRARY_CATEGORIES.PRESENTATION : true
  const shouldFetchResources = category ? category === LIBRARY_CATEGORIES.DATA_RESOURCE : true
  const shouldFetchExternalUrl = category ? category === LIBRARY_CATEGORIES.EXTERNAL_URL : true

  const quicksightCategoryId = categoryList.find(category => category.categoryName === LIBRARY_CATEGORIES.QUICKSIGHT)?.categoryId
  const presentationCategoryId = categoryList.find(category => category.categoryName === LIBRARY_CATEGORIES.PRESENTATION)?.categoryId
  const dataResourcesCategoryId = categoryList.find(category => category.categoryName === LIBRARY_CATEGORIES.DATA_RESOURCE)?.categoryId
  const externalUrlCategoryId = categoryList.find(category => category.categoryName === LIBRARY_CATEGORIES.EXTERNAL_URL)?.categoryId

  // Get library categories data
  const { response: categoriesListData, isLoaded: isCategoriesListLoaded } = useFetcher(fetchMaterialCategories)

  useEffect(() => {
    if (isArray(categoriesListData) && !isEmpty(categoriesListData)) {
      setCategoryList(categoriesListData)
    }
  }, [categoriesListData])

  // Category 1
  // fetch 'Quicksight Dashboard' data
  const {
    response: quicksightResponse,
    isLoaded: isQuicksightLoaded,
    isFetching: isQuicksightFetching,
    updateParameters: updateQuicksight,
  } = useFetcher(
    fetchMaterialList,
    { ...params, categoryId: quicksightCategoryId, search: getSearchValue(search) },
    { guardValues: [isCategoriesListLoaded, Boolean(quicksightCategoryId), shouldFetchQuicksight] },
  )
  const { results: quicksightResults = [] } = quicksightResponse

  // Category 2
  // fetch 'Presentation Resources' data
  const {
    response: presentationResponse,
    isLoaded: isPresentationLoaded,
    isFetching: isPresentationFetching,
    updateParameters: updatePresentation,
  } = useFetcher(
    fetchMaterialList,
    { ...params, categoryId: presentationCategoryId, search: getSearchValue(search) },
    { guardValues: [isCategoriesListLoaded, Boolean(presentationCategoryId), shouldFetchPresentation] },
  )
  const { results: presentationResults = [] } = presentationResponse

  // Category 3
  // fetch 'Data Resources' data
  const {
    response: dataResourcesResponse,
    isLoaded: isDataResourcesLoaded,
    isFetching: isDataResourcesFetching,
    updateParameters: updateDataResources,
  } = useFetcher(
    fetchMaterialList,
    { ...params, categoryId: dataResourcesCategoryId, search: getSearchValue(search) },
    { guardValues: [isCategoriesListLoaded, Boolean(dataResourcesCategoryId), shouldFetchResources] },
  )
  const { results: dataResourcesResults = [] } = dataResourcesResponse

  // Category 4
  // fetch 'Useful Links' data
  const {
    response: externalUrlResponse,
    isLoaded: isExternalUrlLoaded,
    isFetching: isExternalUrlFetching,
    updateParameters: updateExternalUrl,
  } = useFetcher(
    fetchMaterialList,
    { ...params, categoryId: externalUrlCategoryId, search: getSearchValue(search) },
    { guardValues: [isCategoriesListLoaded, Boolean(externalUrlCategoryId), shouldFetchExternalUrl] },
  )
  const { results: externalUrlResults = [] } = externalUrlResponse

  // export inner page data
  let innerPageData = {}

  switch (category) {
    case LIBRARY_CATEGORIES.QUICKSIGHT:
      innerPageData = {
        result: quicksightResults,
        isLoaded: isQuicksightLoaded,
        isFetching: isQuicksightFetching,
        updateParameter: updateQuicksight,
      }
      break
    case LIBRARY_CATEGORIES.PRESENTATION:
      innerPageData = {
        result: presentationResults,
        isLoaded: isPresentationLoaded,
        isFetching: isPresentationFetching,
        updateParameter: updatePresentation,
      }
      break
    case LIBRARY_CATEGORIES.DATA_RESOURCE:
      innerPageData = {
        result: dataResourcesResults,
        isLoaded: isDataResourcesLoaded,
        isFetching: isDataResourcesFetching,
        updateParameter: updateDataResources,
      }
      break
    case LIBRARY_CATEGORIES.EXTERNAL_URL:
      innerPageData = {
        result: externalUrlResults,
        isLoaded: isExternalUrlLoaded,
        isFetching: isExternalUrlFetching,
        updateParameter: updateExternalUrl,
      }
      break
    default:
      innerPageData = {
        result: [],
        isLoaded: true,
        isFetching: false,
        updateParameter: params => console.alert('No update parameter!'),
      }
  }

  const updateLibraryParameters = params => {
    updateQuicksight({ ...params })
    updatePresentation({ ...params })
    updateDataResources({ ...params })
    updateExternalUrl({ ...params })
  }

  return {
    // Category 1
    // 'Quicksight Dashboard' response
    quicksightResults,
    isQuicksightLoaded,
    isQuicksightFetching,
    updateQuicksight,

    // Category 2
    // 'Presentation Resources' response
    presentationResults,
    isPresentationLoaded,
    isPresentationFetching,
    updatePresentation,

    // Category 3
    // 'Data Resources' response
    dataResourcesResults,
    isDataResourcesLoaded,
    isDataResourcesFetching,
    updateDataResources,

    // Category 4
    // 'Useful Links' response
    externalUrlResults,
    isExternalUrlLoaded,
    isExternalUrlFetching,

    // inner page response
    updateExternalUrl,
    innerPageData,

    updateLibraryParameters,
  }
}

export default useLibraryData
