import { createReducer } from '../helpers/createReducer'

export const types = {
  SET_USER_ROLE: 'SET_USER_ROLE',
}

const initState = {
  userRoleInfo: {
    CMPAccess: {
      canCreateCampaign: false,
      canDeleteSingleAsset: false,
      canDeleteSingleLiveAsset: false,
      canDownloadCampaignResultCsv: false,
      canDownloadFile: false,
      canDownloadMultipleAssetZip: false,
      canDuplicateMultipleAsset: false,
      canDuplicateSingleAsset: false,
      canEditAsset: false,
      canEditLiveAsset: false,
      canViewGallery: false,
      canViewAssetInfoPage: false,
      canViewAssetResultPage: false,
      canSearch: false,
      canUploadAsset: false,
      canViewWelcome: false, // 透過 roleName 來判斷，非後端 API 原有的值
      canViewMap: false,
      canViewDashboard: false,
      canViewQuicksight: false,
    },
    DMPAccess: { canViewDMP: false, canExportData: false, canImportData: false },
  },
}

function setUserRoleInfo(state, action) {
  return { ...state, userRoleInfo: action.userRoleInfo }
}

const reducer = createReducer(initState, {
  [types.SET_USER_ROLE]: setUserRoleInfo,
})

export default reducer
