import { isEqual } from 'lodash'

function showLogger({ action, hasChanged, prevCombinedState, nextCombinedState }) {
  if (!action) return

  const prevStateStyle = 'font-weight: bold; color: #B5B5B5;'
  const actionStyle = 'font-weight: bold; color: #3EB7F8;'
  const nextStateStyle = 'font-weight: bold; color: #4AAD4D;'

  console.groupCollapsed(`action: ${action.type}`)

  console.log('%c prevState', prevStateStyle, prevCombinedState)
  console.log('%c action   ', actionStyle, action)
  console.log('%c nextState', nextStateStyle, nextCombinedState)

  console.groupEnd()
}

export function combineReducers(reducers) {
  // finalReducers 是過濾後的 reducers，它的每一個屬性都是一個 function
  const finalReducers = Object.fromEntries(Object.entries(reducers).filter(([key, value]) => typeof value === 'function'))

  return function combination(prevCombinedState = {}, action) {
    // 遍歷所有 reducers，然後將每個 reducer 返回的 state 組合起來生成一個大的狀態樹
    const nextCombinedState = Object.fromEntries(
      Object.entries(finalReducers).map(([stateName, reducer]) => [stateName, reducer(prevCombinedState[stateName], action)]),
    )

    const hasChanged = !isEqual(prevCombinedState, nextCombinedState)

    showLogger({ action, hasChanged, prevCombinedState, nextCombinedState })

    // 如果當前 action 對應的 reducer 方法執行完後，該處數據沒有變化，則返回原來的 state
    return hasChanged ? nextCombinedState : prevCombinedState
  }
}
