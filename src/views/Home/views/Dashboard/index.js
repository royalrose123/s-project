import React, { useEffect, useRef, useState } from 'react'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import useGlobalState from 'globalState'

// Libs

// Components
import MeasuresOfPerformance from './components/MeasuresOfPerformance'
import MapOverview from './components/MapOverview'
import Lottie from 'react-lottie'
import animationData from 'assets/icons/lottie/loading.json'
import Welcome from './components/Welcome'

// Style
import getStyle from './style'

// constants
import { pageVariants, pageTransition } from './constants/transitionParams'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

const TABS = {
  MEASURE_OF_PERFORMANCE: 1,
  MAP_OVERVIEW: 2,
}

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

function Dashboard(props) {
  const style = getStyle(props)

  const [state] = useGlobalState()
  const { user } = state
  const { userRoleInfo } = user
  const { roleName } = userRoleInfo

  const history = useHistory()

  const isDirector = roleName === 'Director'
  const isViewedWelcome = JSON.parse(window.localStorage.getItem('isViewedWelcome'))
  const isShowWelcome = !isViewedWelcome && isDirector

  const welcomePageTimeOut = isShowWelcome ? 5000 : 0 // welcome page 顯示的時間

  const [tabStatus, setTabStatus] = useState(TABS.MEASURE_OF_PERFORMANCE)
  const [isShowContent, setIsShowContent] = useState(false)
  const [isShowDashboard, setIsShowDashboard] = useState(!isShowWelcome)

  const measuresOfPerformanceRef = useRef(null)
  const mapOverviewRef = useRef(null)
  const dashboardRef = useRef(null)

  const scrollToView = target => {
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    let scrollSubscription
    if (dashboardRef.current && mapOverviewRef.current) {
      scrollSubscription = fromEvent(dashboardRef.current, 'scroll')
        .pipe(debounceTime(100))
        .subscribe(() => {
          const { top: mapPositionTop } = mapOverviewRef.current.getBoundingClientRect()
          if (mapPositionTop > 487) {
            setTabStatus(TABS.MEASURE_OF_PERFORMANCE)
          } else {
            setTabStatus(TABS.MAP_OVERVIEW)
          }
        })
    }

    // 延遲 3 秒再開始載入有資料的 dom 結構，讓轉場動畫更流暢
    // 先顯示 welcome 畫面（若要顯示）約 5 秒，
    let transitionTimer = setTimeout(() => {
      // 關掉 welcome 畫面，顯示 dashboard 畫面
      setIsShowDashboard(true)
      window.localStorage.setItem('isViewedWelcome', true)
      history.replace('/home/dashboard')

      // 顯示 dashboard 的 fake loading 約 3 秒，再換上有 data 的 dashboard component
      transitionTimer = setTimeout(() => setIsShowContent(true), 3000)
    }, welcomePageTimeOut)

    return () => {
      if (scrollSubscription) {
        scrollSubscription.unsubscribe()
      }

      clearTimeout(transitionTimer)
    }
  }, [history, welcomePageTimeOut, isShowContent])

  return (
    <>
      <AnimatePresence>
        {isShowDashboard ? (
          <motion.div
            css={style.dashboardOuter()}
            key='dashboard'
            initial='initial'
            animate='in'
            exit='out'
            variants={isShowWelcome && pageVariants}
            transition={isShowWelcome && pageTransition}
          >
            <div css={style.tabWrapper()}>
              <div
                css={style.tab(tabStatus === TABS.MEASURE_OF_PERFORMANCE)}
                onClick={() => {
                  setTabStatus(TABS.MEASURE_OF_PERFORMANCE)
                  scrollToView(measuresOfPerformanceRef.current)
                }}
              >
                Measures of Performance
              </div>
              <div
                css={style.tab(tabStatus === TABS.MAP_OVERVIEW)}
                onClick={() => {
                  setTabStatus(TABS.MAP_OVERVIEW)
                  scrollToView(mapOverviewRef.current)
                }}
              >
                Map Overview
              </div>
            </div>
            <div css={style.spacer()} />
            <div css={style.dashboardWrapper()} ref={dashboardRef}>
              {isShowContent ? (
                <>
                  <MeasuresOfPerformance forwardRef={measuresOfPerformanceRef} />
                  <MapOverview forwardRef={mapOverviewRef} />
                </>
              ) : (
                <>
                  <div css={style.loadingDiv()}>
                    <Lottie options={lottieOptions} height={60} width={60} isStopped={false} isPaused={false} />
                  </div>
                  <div css={style.loadingDiv()}>
                    <Lottie options={lottieOptions} height={60} width={60} isStopped={false} isPaused={false} />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <Welcome setIsShowDashboard={setIsShowDashboard} />
        )}
      </AnimatePresence>
    </>
  )
}

Dashboard.propTypes = propTypes
Dashboard.defaultProps = defaultProps

export default Dashboard
