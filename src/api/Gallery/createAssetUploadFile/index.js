import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class CreateAssetUploadFileApi extends Service {
  constructor({ file, fileType }) {
    super()
    this.name = 'CREATE_ASSET_UPLOAD_FILE'
    this.config = {
      url: '/program/asset/files',
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: {
        file,
        fileType,
      },
    }
  }
}

export const createAssetUploadFile = (...apiParams) => getCallApiFunction(new CreateAssetUploadFileApi(...apiParams))
