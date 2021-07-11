import { useState, useEffect } from 'react'
import useGlobalState from 'globalState'
import { types as userTypes } from 'globalStateReducer/user'
import useFetcher from 'effects/useFetcher'
import { fetchRoleFunction } from 'api/Gallery/fetchRoleFunction'
import { ROLES } from '../constants/roles'

// feature 空字串代表此 route 沒有 role access 限制
// 如果 feature 有值則 對應 fetchRoleFunction API 的 true/false
const currentPathList = [
  { path: 'welcome', feature: 'canViewWelcome' },
  { path: 'gallery/program/All', feature: '' },
  { path: 'gallery/program/:program', feature: '' },
  { path: 'gallery/program/:program/:campaign', feature: '' },
  { path: 'gallery/createAssets', feature: 'canUploadAsset' },
  { path: 'gallery/createMultipleAssets', feature: 'canUploadAsset' },
  { path: 'gallery/editMultipleAssets', feature: 'canEditAsset' },
  { path: 'gallery/moveMultipleAssets', feature: 'canEditAsset' },
  { path: 'gallery/view/:assetId/:assetFormType', feature: 'canViewAssetInfoPage' },
  { path: 'gallery/edit/:assetId/:assetFormType', feature: 'canEditAsset' },
  { path: 'gallery/duplicate/:assetId/:assetFormType', feature: 'canDuplicateSingleAsset' },
  // { path: 'quicksight', feature: '' },  //TODO: Quicksight 不上 PROD，先註解掉
  { path: 'dashboard', feature: 'canViewDashboard' },
  { path: 'map', feature: 'canViewMap' },
]

const galleryPathList = [
  { path: '/home/gallery/program/:program', feature: '' },
  { path: '/home/gallery/program/:program/:campaign', feature: '' },
  { path: '/home/gallery/createAssets', feature: 'canUploadAsset' },
  { path: '/home/gallery/createMultipleAssets', feature: 'canUploadAsset' },
  { path: '/home/gallery/editMultipleAssets', feature: 'canEditAsset' },
  { path: '/home/gallery/moveMultipleAssets', feature: 'canEditAsset' },
  { path: '/home/gallery/view/:assetId/:assetFormType', feature: 'canViewAssetInfoPage' },
  { path: '/home/gallery/edit/:assetId/:assetFormType', feature: 'canEditAsset' },
  { path: '/home/gallery/duplicate/:assetId/:assetFormType', feature: 'canDuplicateSingleAsset' },
]

function useRoleFunctionList(hasAccessToken) {
  const [state, dispatch] = useGlobalState()
  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess } = userRoleInfo

  const { isLoaded: isRoleFunctionLoaded, response } = useFetcher(fetchRoleFunction, {}, { guardValues: [hasAccessToken] })

  const [currentPath, setCurrentPath] = useState([])
  const [galleryPath, setGalleryPath] = useState([])
  const [isRoleDispatched, setIsRoleDispatched] = useState(false)

  useEffect(() => {
    if (isRoleFunctionLoaded) {
      const canViewWelcome = response.roleName === ROLES.DIRECTOR

      // Director 登入時要自動導到 welcome page
      const isViewedWelcome = window.localStorage.getItem('isViewedWelcome')

      const newResponse = { ...response, CMPAccess: { ...response.CMPAccess, canViewWelcome: canViewWelcome && !isViewedWelcome } }

      dispatch({
        type: userTypes.SET_USER_ROLE,
        userRoleInfo: newResponse,
      })

      setIsRoleDispatched(true)
    }
  }, [dispatch, isRoleFunctionLoaded, response])

  useEffect(() => {
    if (isRoleFunctionLoaded && isRoleDispatched) {
      const newCurrentPathList = currentPathList.filter(item => !item.feature || CMPAccess[item.feature]).map(item => item.path)

      setCurrentPath(newCurrentPathList)
    }
  }, [CMPAccess, isRoleDispatched, isRoleFunctionLoaded])

  useEffect(() => {
    if (isRoleFunctionLoaded && isRoleDispatched) {
      const newGalleryPath = galleryPathList.filter(item => !item.feature || CMPAccess[item.feature]).map(item => item.path)

      setGalleryPath(newGalleryPath)
    }
  }, [CMPAccess, isRoleDispatched, isRoleFunctionLoaded])

  return { currentPath, galleryPath, isRoleFunctionLoaded }
}

export default useRoleFunctionList
