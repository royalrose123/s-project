import { cloneDeep, isEmpty } from 'lodash'
import { CHUNK_SIZE } from 'constants/upload'
import { getChunkFileMethod } from 'basicComponents/MultiUpload/methods/getChunkFile'
import { handleSubmittedForm } from '../../../sharedMethods/handleSubmittedForm'
import { createAssets } from 'api/Gallery/createAssets'
import { updateAssetInfo } from 'api/Gallery/updateAssetInfo'
import { toaster } from 'evergreen-ui'
import { types as assetUploadTypes } from 'globalStateReducer/assetUpload'
import { ACTION_TYPES } from '../../../constants/actionTypes'

export const handleSubmitMethod = async ({
  data,
  setIsUploading,
  onAssetModalClose,
  updateProgramList,
  initiateCurrentAssetList,
  dispatch,
  action,
  history,
  setIsValidSubmit,
}) => {
  const cloneData = cloneDeep(data)

  const isMultipleUpload = action === ACTION_TYPES.UPLOAD
  const isMultipleEdit = action === ACTION_TYPES.EDIT
  const isMultipleMove = action === ACTION_TYPES.MOVE

  setIsValidSubmit(true)

  if (isMultipleUpload) {
    // multiple upload
    setIsUploading(true)

    const uploadActionsPromise = cloneData.uploadingFiles.map(async (file, index) => {
      const mediaSize =
        file.assetFormatType === 'html5' ? '' : file.assetFormatType === 'image' ? `W${file.width} x H${file.height}` : `${file.duration} sec`
      const chunkFile = await getChunkFileMethod(file.file, CHUNK_SIZE)

      const fileInfo = { ...file, fileFormat: file.assetFormatType }

      const submitData = { ...cloneData, ...file }

      console.log('uploadActionsPromise index :>> ', index)

      return () =>
        handleSubmittedForm({
          submitData,
          updateProgramList,
          initiateCurrentAssetList,
          mediaSize,
          dispatch,
          fileInfo,
          chunkFile,
          uploadAssetsMethod: createAssets,
          toasterMessage: 'Create complete',
        })
    })

    const uploadActions = await Promise.all(uploadActionsPromise)

    for (const action of uploadActions) action()

    onAssetModalClose()
  } else if (isMultipleEdit || isMultipleMove) {
    // multiple edit or multiple move
    setIsUploading(true)

    const errorList = []
    let isAnyFileChange = false

    const editActionsPromise = cloneData.uploadingFiles.map(async (file, index) => {
      const isNewFile = typeof file.file === 'object' // 沒改檔案會是後端傳來的 file id，改檔案則會是 blob 檔

      const submitData = { ...cloneData, ...file }
      const assetId = file.assetId

      if (isNewFile) {
        isAnyFileChange = true

        const mediaSize =
          file.assetFormatType === 'html5' ? '' : file.assetFormatType === 'image' ? `W${file.width} x H${file.height}` : `${file.duration} sec`
        const chunkFile = await getChunkFileMethod(file.file, CHUNK_SIZE)

        const fileInfo = { ...file, fileFormat: file.assetFormatType }

        console.log('uploadActionsPromise index :>> ', index)

        return () =>
          handleSubmittedForm({
            submitData,
            updateProgramList,
            initiateCurrentAssetList,
            mediaSize,
            dispatch,
            fileInfo,
            chunkFile,
            assetId,
            uploadAssetsMethod: updateAssetInfo,
            toasterMessage: false,
          })
      } else {
        return () =>
          updateAssetInfo({ assetId, data: submitData })
            .then(result => {})
            .catch(error => {
              errorList.concat(error)
            })
      }
    })

    const editActions = await Promise.all(editActionsPromise)

    if (isAnyFileChange) {
      dispatch({
        type: assetUploadTypes.SET_IS_UPLOAD_FIXED,
        isUploadFixed: true,
      })
    }

    dispatch({
      type: assetUploadTypes.SET_IS_EDITING,
      isEditing: true,
    })

    for (const action of editActions) await action()

    // edit API 執行完後跳 toaster
    if (isEmpty(errorList)) {
      if (!isAnyFileChange) {
        history.push('/')

        toaster.success(`${isMultipleEdit ? 'Multiple assets edited.' : 'Migration completed.'}`, {
          duration: 3,
        })
      } else {
        dispatch({
          type: assetUploadTypes.SET_IS_EDITING,
          isEditing: false,
        })
        setIsUploading(false)
      }
    } else {
      console.log('errorList :>> ', errorList)

      toaster.danger(`${isMultipleEdit ? 'Multiple assets failed.' : 'Migration failed.'}`, {
        duration: 5,
      })
    }
  }
}
