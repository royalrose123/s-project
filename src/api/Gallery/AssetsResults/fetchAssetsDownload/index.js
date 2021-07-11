import Service, { getCallApiFunction } from '../../../service'
// import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchAssetsDownloadApi extends Service {
  constructor({ assetIds, sheetFileType = 'csv', timezone }) {
    super()
    this.name = 'EXPORT_ASSETS_DATA'
    this.config = {
      url: '/program/assets/download',
      method: 'GET',
      params: { assetIds, sheetFileType, timezone },
      responseType: 'blob',
    }
  }
}

export const fetchAssetsDownload = (...apiParams) => getCallApiFunction(new FetchAssetsDownloadApi(...apiParams))
