import getInitialValues from '../../sharedMethods/getInitialValues'
import { cloneDeep, isEmpty } from 'lodash'
import { CHUNK_SIZE } from 'constants/upload'
import { updateAssetInfo } from 'api/Gallery/updateAssetInfo'
import { showToaster } from '../../sharedMethods/showToaster'
import { getChunkFileMethod } from 'basicComponents/MultiUpload/methods/getChunkFile'
import { handleSubmittedForm } from '../../sharedMethods/handleSubmittedForm'

export default (props, assetInfo, assetId, dispatch, ctaOptions, setIsUploading) => {
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
          assetId,
          uploadAssetsMethod: updateAssetInfo,
          toasterMessage: 'Edit complete',
        })
      } else {
        updateAssetInfo({ assetId, data: submitData }).then(result => {
          initiateCurrentAssetList()
          showToaster(result, 'Edit complete')
          updateProgramList()
        })
      }
    },
  }
}
