import getInitialValues from '../../sharedMethods/getInitialValues'
import { createAssets } from 'api/Gallery/createAssets'
import { duplicateAssetUploadFile } from 'api/Gallery/duplicateAssetUploadFile'
import { isEmpty, cloneDeep } from 'lodash'
import { showToaster } from '../../sharedMethods/showToaster'
import { CHUNK_SIZE } from 'constants/upload'
import { getChunkFileMethod } from 'basicComponents/MultiUpload/methods/getChunkFile'
import { handleSubmittedForm } from '../../sharedMethods/handleSubmittedForm'

export default (props, assetInfo, dispatch, ctaOptions, setIsUploading) => {
  const { updateProgramList, initiateCurrentAssetList } = props

  return {
    initialValues: getInitialValues(assetInfo, ctaOptions),

    async onSubmit(data) {
      const submitData = cloneDeep(data)

      const isNewFile = !isEmpty(data?.uploadingFiles)

      if (isNewFile) {
        setIsUploading(true)

        const currentUploadingFile = submitData.uploadingFiles[0]

        const mediaSize =
          currentUploadingFile.fileFormat === 'html5'
            ? ''
            : currentUploadingFile.fileFormat === 'image'
            ? `W${currentUploadingFile.width} x H${currentUploadingFile.height}`
            : `${currentUploadingFile.duration} sec`

        const chunkFile = await getChunkFileMethod(currentUploadingFile.file, CHUNK_SIZE)

        const fileInfo = currentUploadingFile

        handleSubmittedForm({
          submitData,
          updateProgramList,
          initiateCurrentAssetList,
          mediaSize,
          dispatch,
          fileInfo,
          chunkFile,
          uploadAssetsMethod: createAssets,
          toasterMessage: 'Duplicate complete',
        })
      } else {
        duplicateAssetUploadFile({
          fileId: submitData.assetFile,
          fileType: submitData.assetFormatType,
        }).then(result => {
          if (result.isResponseError) return showToaster(result)

          createAssets({ data: submitData, assetSize: submitData.assetSize, assetFile: result.id }).then(result => {
            initiateCurrentAssetList()
            showToaster(result, 'Duplicate complete')
            updateProgramList()
          })
        })
      }
    },
  }
}
