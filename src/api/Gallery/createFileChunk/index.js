import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class CreateFileChunkApi extends Service {
  constructor({ uploadId, file, fileType, contentRange }) {
    super()
    this.name = 'CREATE_FILE_CHUNK'

    this.config = {
      url: '/program/asset/file/chunk/upload',
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: {
        contentRange,
        uploadId,
        file,
      },
    }
  }
}

export const createFileChunk = (...apiParams) => getCallApiFunction(new CreateFileChunkApi(...apiParams))
