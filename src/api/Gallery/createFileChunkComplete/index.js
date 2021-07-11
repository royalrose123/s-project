import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class CreateFileChunkCompleteApi extends Service {
  constructor({ key, uploadId, parts, bucket, type }) {
    super()
    this.name = 'CREATE_FILE_CHUNK_COMPLETE'

    this.config = {
      url: '/program/asset/multipart-upload/complete',
      method: 'POST',
      data: {
        key,
        uploadId,
        parts,
        bucket,
        type,
      },
    }
  }
}

export const createFileChunkComplete = (...apiParams) => getCallApiFunction(new CreateFileChunkCompleteApi(...apiParams))
