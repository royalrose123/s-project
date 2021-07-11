import { uniqueId } from 'lodash'
import { updateUploadingItem } from '../../../sharedMethods/updateUploadingItem'
import { getStartMultipleUploadMethod } from '../sharedMethods/getStartMultipleUploadMethod'

export const handleSubmittedForm = ({
  submitData,
  updateProgramList,
  initiateCurrentAssetList,
  mediaSize,
  dispatch,
  fileInfo,
  chunkFile,
  assetId,
  uploadAssetsMethod,
  toasterMessage,
}) => {
  const uploadingFileId = uniqueId('assetFile')

  const startMultipleUpload = getStartMultipleUploadMethod({
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
  })

  updateUploadingItem(uploadingFileId, dispatch, {
    id: uploadingFileId,
    name: chunkFile.name,
    startRequest: startMultipleUpload,
    mediaCreatedTime: new Date().getTime(),
    fileSize: fileInfo.file.size,
    uploadedChunkLength: 0,
    fileChunkList: chunkFile.fileChunkList,
    isUploading: true,
  })

  startMultipleUpload()
}
