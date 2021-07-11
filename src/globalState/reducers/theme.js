import { createReducer } from '../helpers/createReducer'

export const types = {
  SET_MODE: 'SET_MODE',
  SET_THEME: 'SET_THEME',
}

const initState = {
  mode: 'light',
  title: '',
}

function setModeState(state, action) {
  return { ...state, mode: action.mode }
}

function setThemeState(state, action) {
  return { ...state, mode: action.mode, title: action.title }
}

const reducer = createReducer(initState, {
  [types.SET_MODE]: setModeState,
  [types.SET_THEME]: setThemeState,
})

export default reducer
