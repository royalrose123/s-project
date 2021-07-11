// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import keplerGlReducer from './root'
import { enhanceReduxMiddleware } from 'kepler.gl/middleware'
import { uiStateUpdaters } from 'kepler.gl/dist/reducers'
import appReducer from '../views/Home/views/Map/app-reducer'
import thunk from 'redux-thunk'

const DEFAULT_MAP_CONTROLS_FEATURES = {
  show: true,
  active: false,
  // defines which map index users are interacting with (through map controls)
  activeMapIndex: 0,
}

const CUSTOM_MAP_CONTROLS = ['addPoint', 'exportImage', 'share', 'exportData'].reduce(
  (final, current) => ({
    ...final,
    [current]: DEFAULT_MAP_CONTROLS_FEATURES,
  }),
  {},
)

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    // hide side panel when mounted
    activeSidePanel: null,
    // hide all modals when mounted
    currentModal: null,
    mapControls: {
      ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
      ...CUSTOM_MAP_CONTROLS,
    },
  },
})

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer,
  app: appReducer,
})

const middlewares = enhanceReduxMiddleware([thunk])
const enhancers = [applyMiddleware(...middlewares)]

export default createStore(reducers, {}, compose(...enhancers))
