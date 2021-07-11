import { createReducer } from '../helpers/createReducer'

export const types = {
  SET_AUTHENTICATION_STATE: 'SET_AUTHENTICATION_STATE',
}

const initState = {
  isAuthenticated: false,
}

function setAuthenticationState(state, action) {
  return { ...state, isAuthenticated: action.isAuthenticated }
}

const reducer = createReducer(initState, {
  [types.SET_AUTHENTICATION_STATE]: setAuthenticationState,
})

export default reducer
