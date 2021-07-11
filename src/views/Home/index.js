import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter, useRouteMatch, Redirect } from 'react-router-dom'
import { withAuth } from '@okta/okta-react'
import loadable from '@loadable/component'
import { isEmpty } from 'lodash'
import auth from '../../authConfig'

// Components
import Header from './components/Header'
import Main from './components/Main'
import UploadPopover from './components/UploadPopover'

// Lib MISC
import useGlobalState from 'globalState'
import findStaticPath from 'utils/find-static-path'

// Style
import getStyle from './style'

const Gallery = loadable(() => import('./views/Gallery'))
const Map = loadable(() => import('./views/Map'))
const Dashboard = loadable(() => import('./views/Dashboard'))
// const Quicksight = loadable(() => import('./views/Quicksight'))  //TODO: Quicksight 不上 PROD，先註解掉
const Library = loadable(() => import('./views/Library'))

// PropTypes
export const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  auth: PropTypes.object,
  currentPath: PropTypes.array,
  galleryPath: PropTypes.array,
}

// DefaultProps
export const defaultProps = {}

// Variables / Functions

function Home(props) {
  const style = getStyle(props)
  const { match, history, auth: authHelpers, currentPath, galleryPath } = props

  const [state] = useGlobalState()
  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess } = userRoleInfo

  const { canViewMap, canViewDashboard, canViewQuicksight } = CMPAccess

  const useMatch = useRouteMatch(['/home/welcome', '/home/dashboard'])
  const isNotGallery = Boolean(useMatch)

  //  如果 isRedirectFromDMPPortal 為 true, 就 redirect 到 pathFromDMP
  const pathFromDMP = JSON.parse(window.sessionStorage.getItem('pathFromDMP'))
  const isRedirectFromDMPPortal = !isEmpty(pathFromDMP)

  useEffect(() => {
    if (isRedirectFromDMPPortal) {
      history.push(`/home/${pathFromDMP}`)
    }
  }, [history, isRedirectFromDMPPortal, pathFromDMP])

  useEffect(() => {
    if (isNotGallery) {
      document.body.style.background = 'rgb(60,69,85)'
    }
  }, [isNotGallery])

  useEffect(() => {
    const oktaTokenStorage = window.localStorage.getItem('okta-token-storage')

    if (isEmpty(oktaTokenStorage)) auth.logout(authHelpers)
  }, [authHelpers])

  return (
    <div css={style.home()}>
      <Header>
        <Header.Title />
        <Header.SystemIcon />
      </Header>
      <Main>
        <UploadPopover history={history} />
        <Switch>
          {canViewMap && <Route exact sensitive path='/home/map' component={Map} />}
          {/* {canViewQuicksight && <Route exact sensitive path='/home/quicksight' component={Quicksight} />} //TODO: Quicksight 不上 PROD，先註解掉 */}
          {canViewDashboard && (
            <Route exact sensitive path={['/home/welcome', '/home/dashboard']}>
              <Dashboard />
            </Route>
          )}
          <Route exact sensitive path={galleryPath} component={Gallery} />
          {canViewQuicksight && <Route exact sensitive path='/home/library' component={Library} />}
          <Redirect from={match.url} to={`${match.url}/${findStaticPath(currentPath)}`} />
        </Switch>
      </Main>
    </div>
  )
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default hot(withRouter(withAuth(Home)))
