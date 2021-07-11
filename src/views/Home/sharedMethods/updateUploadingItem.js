import { types as assetUploadTypes } from 'globalStateReducer/assetUpload'
import { getUploadList } from '../sharedHooks/useUploadListState'

export function getCurrentUploadingItem(itemId) {
  const oldUploadList = getUploadList()
  const currentitem = oldUploadList[itemId]

  return !currentitem ? {} : currentitem
}

export function updateUploadingItem(itemId, dispatch, updateProps) {
  const newAssetUploaditem = {
    ...getCurrentUploadingItem(itemId),
    ...updateProps,
  }

  dispatch({
    type: assetUploadTypes.SET_ASSET_UPLOAD_LIST,
    uploadingItem: { [itemId]: newAssetUploaditem },
  })
}
