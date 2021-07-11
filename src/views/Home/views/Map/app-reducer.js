import { createAction, handleActions } from 'redux-actions'
import KeplerGlSchema from 'kepler.gl/dist/schemas'
import { ActionTypes } from 'kepler.gl/actions'

import { SET_SAMPLE_LOADING_STATUS } from './components/load-data-modal/actions'

import { GETDATA } from './actions'

// CONSTANTS
export const INIT = 'INIT'
export const SET_MAP_CONFIG = 'SET_MAP_CONFIG'
export const SHOW_MODAL = 'SHOW_MODAL'

// ACTIONS
export const appInit = createAction(INIT)
export const setMapConfig = createAction(SET_MAP_CONFIG)
export const showModal = createAction(SHOW_MODAL)

// INITIAL_STATE
const initialState = {
  appName: 'example',
  loaded: false,
}

// REDUCER
const appReducer = handleActions(
  {
    [INIT]: (state, action) => ({
      ...state,
      loaded: true,
    }),
    [SET_MAP_CONFIG]: (state, action) => ({
      ...state,
      mapConfig: KeplerGlSchema.getConfigToSave(action.payload),
    }),
    [SHOW_MODAL]: (state, action) => ({
      ...state,
      modal: action.payload,
    }),
    [GETDATA]: (state, action) => ({
      ...state,
      modal: action.payload,
    }),
    [SET_SAMPLE_LOADING_STATUS]: (state, action) => ({
      ...state,
      isMapLoading: action.isMapLoading,
    }),
    [ActionTypes.UPDATE_MAP]: (state, action) => ({
      ...state,
      viewport: action.payload,
    }),
  },
  initialState,
)

export default appReducer
