import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class CreateFinalFileChunkApi extends Service {
  constructor({ uploadId, md5, fileType }) {
    super()
    this.name = 'CREATE_FINAL_FILE_CHUNK'

    this.config = {
      url: '/program/asset/file/chunk/complete',
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: {
        uploadId,
        md5,
        fileType,
      },
    }
  }
}

export const createFinalFileChunk = (...apiParams) => getCallApiFunction(new CreateFinalFileChunkApi(...apiParams))
