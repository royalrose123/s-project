import { createAction } from 'redux-actions'

// import { loadFiles, toggleModal } from 'kepler.gl/actions'

// import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

export const setMapConfig = createAction('SET_MAP_CONFIG', payload => payload)

export const GETDATA = 'GET_DATA'
