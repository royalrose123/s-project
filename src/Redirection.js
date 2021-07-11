import React, { useEffect, useCallback } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { withAuth, ImplicitCallback } from '@okta/okta-react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import useGlobalState from 'globalState'
import auth from './authConfig'
import { isEmpty } from 'lodash'
import { checkAccessTokenExpired } from 'utils/check-access-token'
import useRoleFunctionList from './views/Home/hooks/useRoleFunctionList'

const Auth = loadable(() => import('./views/Auth'))
const Home = loadable(() => import('./views/Home'))
const Welcome = loadable(() => import('./views/Home/views/Dashboard/components/Welcome')) // 完全獨立於權限，單純為了可以 show 出來，而原本的 /home/welcome 機制一樣

// PropTypes
export const propTypes = {
  location: PropTypes.object,
  auth: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function Redirection(props) {
  const [state, dispatch] = useGlobalState()
  const { isAuthenticated } = state.auth

  const { auth: authHelpers, location } = props
  const { pathname } = location

  const hasAccessToken = Boolean(window.localStorage.getItem('ACCESS_TOKEN'))
  const isSessionStorageAuthenticated = JSON.parse(window.sessionStorage.getItem('isAuthenticated'))

  const { currentPath, galleryPath } = useRoleFunctionList(hasAccessToken)

  const login = useCallback(() => {
    if (checkAccessTokenExpired()) window.localStorage.clear()
    auth.login(authHelpers)
  }, [authHelpers])

  const logout = useCallback(() => auth.logout(authHelpers), [authHelpers])

  const routePath = isAuthenticated || isSessionStorageAuthenticated ? '/home' : '/auth'

  const redirectPath = isAuthenticated || isSessionStorageAuthenticated ? '/home' : '/auth'

  const routeComponent =
    isAuthenticated || isSessionStorageAuthenticated ? (
      <Home currentPath={currentPath} galleryPath={galleryPath} />
    ) : (
      <Auth important='lowImportant' login={login} />
    )

  const oktaTokenStorage = JSON.parse(window.localStorage.getItem('okta-token-storage'))

  const currentUrl = new URL(window.location.href)

  useEffect(() => {
    // 如果是 redirect from DMP portal result page, seachParams 會有 path

    const searchPath = currentUrl.searchParams.get('path')

    const hasPathFromDMP = searchPath
    if (hasPathFromDMP) {
      const pathFromDMP = searchPath

      window.sessionStorage.setItem('pathFromDMP', JSON.stringify(pathFromDMP))
    }
  }, [currentUrl.searchParams])

  useEffect(() => {
    // 如果是從 DMP redirect 過來, 判斷  searchParams 有沒有 isRedirect, 有的話自動 login
    const currentUrl = new URL(window.location.href)
    const isRedirect = currentUrl.searchParams.has('isRedirect')

    if (isAuthenticated && isEmpty(oktaTokenStorage)) {
      logout()
    }

    if (isRedirect) {
      // 如果 accessToken 過期，就清除 localStorage
      if (checkAccessTokenExpired()) window.localStorage.clear()

      document.body.style.display = 'none'
      login()
    }
  }, [isAuthenticated, login, logout, oktaTokenStorage])

  // 偵測是否出現 authError，如果有出現就重新導回根目錄
  useEffect(() => {
    if (pathname !== '/implicit/callback') return

    setTimeout(() => {
      if (window.location.href.includes('home')) return

      login()
    }, 3000)
  }, [pathname, login])

  useEffect(() => {
    const isRedirectToAuth = pathname === '/auth'
    const isRedirectToRoot = pathname === '/'

    if ((isRedirectToAuth || isRedirectToRoot || isSessionStorageAuthenticated) && !isAuthenticated) {
      auth.setAuthenticationState(authHelpers, dispatch)
    }
  }, [authHelpers, dispatch, isAuthenticated, isSessionStorageAuthenticated, pathname])

  // 如果 accessToken 過期，自動 logout
  useEffect(() => {
    if (!isAuthenticated) window.sessionStorage.removeItem('isAuthenticated')
  }, [isAuthenticated])

  return (
    <Switch>
      {(!isAuthenticated || !isSessionStorageAuthenticated) && <Route path='/implicit/callback' component={ImplicitCallback} />}
      <Route strict sensitive path={routePath}>
        {routeComponent}
      </Route>
      {/*  完全獨立於權限，單純為了可以 show 出來，而原本的 /home/welcome 機制一樣 */}
      <Route strict sensitive path='/welcome' component={Welcome} />
      <Redirect replace from='/' to={redirectPath} />
    </Switch>
  )
}

Redirection.propTypes = propTypes
Redirection.defaultProps = defaultProps

export default withRouter(withAuth(Redirection))
