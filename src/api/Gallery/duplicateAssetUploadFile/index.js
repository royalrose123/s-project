import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class DuplicateAssetUploadFileApi extends Service {
  constructor({ fileId, fileType }) {
    super()
    this.name = 'DUPLICATE_ASSET_UPLOAD_FILE'
    this.config = {
      url: '/program/asset/file/duplicate',
      method: 'POST',
      data: {
        fileId,
        fileType,
      },
    }
    this.denormalizer = denormalizer
  }
}

export const duplicateAssetUploadFile = (...apiParams) => getCallApiFunction(new DuplicateAssetUploadFileApi(...apiParams))
