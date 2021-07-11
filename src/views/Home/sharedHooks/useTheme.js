import { useEffect } from 'react'
import useGlobalState from 'globalState'
import { types as themeTypes } from 'globalStateReducer/theme'
import { PATH } from 'constants/path'
import { useRouteMatch } from 'react-router-dom'

function useTheme({ title }) {
  const [, dispatch] = useGlobalState()

  const isGallery = Boolean(useRouteMatch('/home/gallery'))
  const isMap = Boolean(useRouteMatch('/home/map'))
  const isDashboard = Boolean(useRouteMatch('/home/dashboard'))
  const isWelcome = Boolean(useRouteMatch('/home/welcome'))
  const isLibrary = Boolean(useRouteMatch('/home/library'))

  // 進到對應的 path 設定成對應的 mode 跟 title
  useEffect(() => {
    switch (true) {
      case isGallery:
        dispatch({ type: themeTypes.SET_THEME, mode: 'light', title: 'gallery' })
        document.title = `ATOM ${PATH.gallery}`
        break
      case isMap:
        dispatch({ type: themeTypes.SET_THEME, mode: 'dark', title: 'map' })
        document.title = `ATOM ${PATH.map}`
        break
      case isDashboard:
        dispatch({ type: themeTypes.SET_THEME, mode: 'dark', title: 'dashboard' })
        document.title = `ATOM ${PATH.dashboard}`
        break
      case isWelcome:
        dispatch({ type: themeTypes.SET_THEME, mode: 'dark', title: 'welcome' })
        document.title = `ATOM ${PATH.welcome}`
        break
      case isLibrary:
        dispatch({ type: themeTypes.SET_THEME, mode: 'light', title: 'library' })
        document.title = `ATOM ${PATH.library}`
        break
      default:
        dispatch({ type: themeTypes.SET_THEME, mode: 'light', title: 'gallery' })
        document.title = `ATOM ${PATH.gallery}`
        break
    }

    //  進到對應的 page 要把 sessionStorage 的 pathFromDMP remove
    window.sessionStorage.removeItem('pathFromDMP')
  }, [dispatch, isDashboard, isGallery, isLibrary, isMap, isWelcome, title])
}

export default useTheme
