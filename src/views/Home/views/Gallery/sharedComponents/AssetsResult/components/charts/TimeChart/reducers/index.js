export const types = {
  SET_ACTIVED: 'SET_ACTIVED',
  SET_HAS_DATA: 'SET_HAS_DATA',
  RESET_STATE: 'RESET_STATE',
  SET_IS_REFRESH: 'SET_IS_REFRESH',
}

export const initialState = {
  timeChartState: [
    { title: 'Date', isActived: false, hasData: false, color: '' },
    { title: 'Impressions', isActived: true, hasData: false, color: '#51a4f8' },
    { title: 'Views', isActived: true, hasData: false, color: '#76d7d7' },
    { title: 'Clicks', isActived: true, hasData: false, color: '#f1ce7b' },
  ],
  isRefresh: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVED':
      return setIsActived(state, action)
    case 'SET_HAS_DATA':
      return setHasData(state, action)
    case 'RESET_STATE':
      return initialState
    case 'SET_IS_REFRESH':
      return setIsRefresh(state, action)
    default:
      throw new Error()
  }
}

function setIsActived(state, action) {
  const selectToggleTitle = action.title
  const selectToggleState = state.timeChartState.find(item => item.title === selectToggleTitle)

  return {
    ...state,
    timeChartState: state.timeChartState.map(item => {
      if (item.title === selectToggleTitle) {
        return { ...item, isActived: !selectToggleState.isActived }
      } else {
        return item
      }
    }),
  }
}

function setHasData(state, action) {
  return {
    ...state,
    timeChartState: state.timeChartState.map(item => {
      const hasData = action.dataList.includes(item.title)

      if (hasData) {
        return { ...item, hasData: true }
      } else {
        return item
      }
    }),
  }
}

function setIsRefresh(state, action) {
  return {
    ...state,
    isRefresh: action.isRefresh,
  }
}
