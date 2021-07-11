import { cloneDeep } from 'lodash'
import { createReducer } from '../helpers/createReducer'

export const types = {
  DELETE_ASSET_UPLOAD_ITEM: 'DELETE_ASSET_UPLOAD_ITEM',
  SET_ASSET_UPLOAD_LIST: 'SET_ASSET_UPLOAD_LIST',
  SET_IS_UPLOAD_FIXED: 'SET_IS_UPLOAD_FIXED',
  SET_IS_EDITING: 'SET_IS_EDITING',
  CLEAR_UPLOAD_LIST: 'CLEAR_UPLOAD_LIST',
}

const initState = {
  assetUploadList: {},
  isUploadFixed: false, // 如果是 multiple edit 就為 true
  isEditing: false, // 如果是 multiple edit 就為 true，包括 updateAssetInfo API
}

function setAssetUploadList(state, action) {
  return {
    ...state,
    assetUploadList: {
      ...state.assetUploadList,
      ...action.uploadingItem,
    },
  }
}

function setIsUploadFixed(state, action) {
  return {
    ...state,
    isUploadFixed: action.isUploadFixed,
  }
}

function setIsEditing(state, action) {
  return {
    ...state,
    isEditing: action.isEditing,
  }
}

function deleteAssetUploadItem(state, action) {
  const clonedAssetUploadList = cloneDeep(state.assetUploadList)

  delete clonedAssetUploadList[action.id]

  return {
    ...state,
    assetUploadList: clonedAssetUploadList,
  }
}

function clearUploadList(state, action) {
  return {
    ...state,
    assetUploadList: initState.assetUploadList,
    isUploadFixed: false,
  }
}

const reducer = createReducer(initState, {
  [types.SET_ASSET_UPLOAD_LIST]: setAssetUploadList,
  [types.DELETE_ASSET_UPLOAD_ITEM]: deleteAssetUploadItem,
  [types.CLEAR_UPLOAD_LIST]: clearUploadList,
  [types.SET_IS_UPLOAD_FIXED]: setIsUploadFixed,
  [types.SET_IS_EDITING]: setIsEditing,
})

export default reducer
