import { useState, useEffect } from 'react'
import useGlobalState from 'globalState'
import { isEmpty } from 'lodash'
import { types as assetUploadTypes } from 'globalStateReducer/assetUpload'

const uploadItemState = {
  uplaodList: {},
  uploadCancelList: [],
}

function useUploadListState() {
  const [state, dispatch] = useGlobalState()
  const { assetUpload } = state
  const { assetUploadList, isUploadFixed } = assetUpload

  const [uploadList, setUploadList] = useState(assetUploadList)

  const setNewUploadList = assetUploadList => {
    setUploadList(assetUploadList)
    uploadItemState.uplaodList = assetUploadList
  }

  useEffect(() => {
    const uploadItems = Object.values(uploadList)

    const isAllItemSuccess =
      !isEmpty(uploadItems) &&
      uploadItems.every(item => {
        return item.isUploadSuccess
      })

    if (isAllItemSuccess && !isUploadFixed) {
      setTimeout(
        () =>
          dispatch({
            type: assetUploadTypes.CLEAR_UPLOAD_LIST,
          }),
        3000,
      )
    }

    setNewUploadList(assetUploadList)
  }, [uploadList, assetUploadList, dispatch, isUploadFixed])

  return [state]
}

export function getUploadList() {
  return uploadItemState.uplaodList
}

export default useUploadListState
