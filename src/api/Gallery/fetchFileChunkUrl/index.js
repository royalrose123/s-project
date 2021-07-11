import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class FetchFileChunkUrlAPI extends Service {
  constructor({ key, partNumber, uploadId, bucket }) {
    super()
    this.name = 'FETCH_FILE_CHUNK_URL'
    this.config = {
      url: '/program/asset/multipart-upload/get-url',
      method: 'GET',
      params: {
        key,
        partNumber,
        uploadId,
        bucket,
      },
    }
  }
}

export const fetchFileChunkUrl = (...apiParams) => getCallApiFunction(new FetchFileChunkUrlAPI(...apiParams))
