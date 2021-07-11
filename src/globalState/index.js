import { createContext, useContext, useReducer } from 'react'

import rootReducer from './reducers'

const initialState = rootReducer()

export const GlobalReducerContext = createContext()

// for provider
export function useGlobalReducer() {
  return useReducer(rootReducer, initialState)
}

// for consumer
export default function() {
  return useContext(GlobalReducerContext)
}
