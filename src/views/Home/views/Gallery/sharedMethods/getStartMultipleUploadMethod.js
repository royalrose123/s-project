import { createChunkUploadFile } from './createChunkUploadFile'
import { updateUploadingItem } from '../../../sharedMethods/updateUploadingItem'

import { showToaster } from './showToaster'

export function getStartMultipleUploadMethod({
  submitData,
  dispatch,
  updateProgramList,
  uploadingFileId,
  uploadAssetsMethod,
  toasterMessage,
  initiateCurrentAssetList,
  chunkFile,
  fileInfo,
  mediaSize,
  assetId,
}) {
  const { fileFormat: fileType } = fileInfo

  return () =>
    createChunkUploadFile({
      chunkFile,
      fileType,
      dispatch,
      uploadingFileId,
    }).then(response => {
      if (!response) return

      uploadAssetsMethod({
        data: submitData,
        assetSize: mediaSize,
        assetFile: response.id,
        assetId,
      }).then(result => {
        if (result.isResponseError) {
          return updateUploadingItem(uploadingFileId, dispatch, {
            isUploadFailed: true,
            isUploading: false,
            errorMessage: result.message,
          })
        }

        updateUploadingItem(uploadingFileId, dispatch, {
          isUploadSuccess: true,
          isUploading: false,
          file: response.id,
        })

        showToaster(result, toasterMessage)

        initiateCurrentAssetList()
        updateProgramList()
      })
    })
}
