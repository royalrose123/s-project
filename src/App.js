import React from 'react'
import { useGlobalReducer, GlobalReducerContext } from './globalState'
import { Security } from '@okta/okta-react'
import { Global } from '@emotion/core'
import Redirection from './Redirection'
import globalStyle from 'styles/reboot'
import auth from './authConfig'

import { Provider } from 'react-redux'
import store from 'src/redux/store'

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <GlobalReducerContext.Provider value={useGlobalReducer()}>
        <Security {...auth.config}>
          <Provider store={store}>
            <Redirection />
          </Provider>
        </Security>
      </GlobalReducerContext.Provider>
    </>
  )
}

export default App
