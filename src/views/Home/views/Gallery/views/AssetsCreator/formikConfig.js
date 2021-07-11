import { cloneDeep } from 'lodash'
import { CHUNK_SIZE } from 'constants/upload'
import { getChunkFileMethod } from 'basicComponents/MultiUpload/methods/getChunkFile'
import { handleSubmittedForm } from '../../sharedMethods/handleSubmittedForm'
import { createAssets } from 'api/Gallery/createAssets'

export default (props, dispatch, setIsUploading) => {
  const { updateProgramList, initiateCurrentAssetList } = props

  return {
    initialValues: {
      assetName: '',
      assetProgram: '',
      assetPlatform: '',
      assetFormat: '',
      assetCta: '',
      assetLanguage: '',
      countryCode: [],
      caption: '',
      fieldAlign: false,
      campaignStartDate: '',
      campaignEndDate: '',
      startDate: '',
      endDate: '',
      campaignName: '',
      campaignDescription: '',
      webUrl: '',
      createUser: '',
      tags: [],
      message: '',
      primaryText: '',
      headline: '',
      description: '',
      newNoAccessCampaignList: [],
    },

    async onSubmit(data) {
      const submitData = cloneDeep(data)

      setIsUploading(true)

      const uploadActionsPromise = data.uploadingFiles.map(async file => {
        const mediaSize = file.fileFormat === 'html5' ? '' : file.fileFormat === 'image' ? `W${file.width} x H${file.height}` : `${file.duration} sec`
        const chunkFile = await getChunkFileMethod(file.file, CHUNK_SIZE)

        const fileInfo = file

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
    },
  }
}
