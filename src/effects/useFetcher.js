import { useEffect, useState, useReducer } from 'react'
import { isEmpty } from 'lodash'

import useDeepCompareEffect from './useDeepCompareEffect'

const actionTypes = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  DEFAULT: 'DEFAULT',
}

const initialState = {
  isLoaded: false,
  isFetching: false,
  hasError: false,
  response: {},
  error: null,
}

const reducer = (state, { type = 'DEFAULT', response, error }) => {
  const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, DEFAULT } = actionTypes

  const actions = {
    [FETCH_REQUEST]: { ...state, isFetching: true },
    [FETCH_SUCCESS]: { ...state, isFetching: false, isLoaded: true, hasError: false, response },
    [FETCH_FAILURE]: { ...state, isFetching: false, isLoaded: false, hasError: true, error },
    [DEFAULT]: state,
  }

  return actions[type]
}

const useFetcher = (fetcher, variables = {}, { guardValues } = {}) => {
  const [parameters, setParameters] = useState(variables)
  const [state, dispatch] = useReducer(reducer, { ...initialState })
  const isGuardFetcher = !isEmpty(guardValues)
  const [shouldFetching, setShouldFetching] = useState(() => !isGuardFetcher)

  useEffect(() => {
    if (!isGuardFetcher) return

    const isAllValueValid = guardValues.every(value => Boolean(value) || value === 0)

    if (isAllValueValid) {
      setShouldFetching(true)
    }
  }, [guardValues, isGuardFetcher])

  useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: actionTypes.FETCH_REQUEST })

      try {
        const response = await fetcher(parameters)

        if (didCancel) return

        dispatch({ type: actionTypes.FETCH_SUCCESS, response })
      } catch (error) {
        console.error('error :', error)

        if (didCancel) return

        dispatch({ type: actionTypes.FETCH_FAILURE, error })
      }
    }

    if (shouldFetching) {
      fetchData()
    }

    return () => (didCancel = true)
  }, [shouldFetching, fetcher, parameters])

  useDeepCompareEffect(() => {
    setParameters(variables)
  }, [variables])

  const updateParameters = (newParameters = {}) => setParameters({ ...parameters, ...newParameters })

  return { ...state, updateParameters }
}

export default useFetcher
