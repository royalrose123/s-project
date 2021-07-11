import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class CreateFileInitialChunkApi extends Service {
  constructor({ filename, type }) {
    super()
    this.name = 'CREATE_FILE_INITIAL_CHUNK'

    this.config = {
      url: '/program/asset/multipart-upload/init',
      method: 'POST',
      data: {
        filename,
        type,
      },
    }
  }
}

export const createFileInitialChunk = (...apiParams) => getCallApiFunction(new CreateFileInitialChunkApi(...apiParams))
