import { types as authTypes } from 'globalStateReducer/auth'

const currentEnv = process.env.NODE_ENV

export default {
  ACCESS_TOKEN: 'ACCESS_TOKEN',

  config: {
    clientId: process.env[`CLIENT_ID_${currentEnv.toUpperCase()}`],
    issuer: 'https://atom.okta.com/oauth2/default',
    redirectUri: `${window.location.origin}/implicit/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },

  login(authHelpers) {
    authHelpers.login('/')
  },

  async logout(authHelpers) {
    await authHelpers.logout('/').catch(error => console.log('error: ', error))

    window.location.href = '/'
    window.localStorage.clear()
    window.sessionStorage.removeItem('isAuthenticated')
  },

  async setAuthenticationState(authHelpers, dispatch) {
    const isAuthenticated = await authHelpers.isAuthenticated()

    await dispatch({ type: authTypes.SET_AUTHENTICATION_STATE, isAuthenticated })

    if (isAuthenticated) {
      this.setAccessToken(authHelpers, dispatch)
      window.sessionStorage.setItem('isAuthenticated', true)
    }
  },

  async setAccessToken(authHelpers, dispatch) {
    const accessToken = await authHelpers.getAccessToken()

    window.localStorage.setItem(this.ACCESS_TOKEN, accessToken)
  },
}
