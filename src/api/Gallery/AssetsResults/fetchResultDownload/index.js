import Service, { getCallApiFunction } from '../../../service'
import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchResultDownloadApi extends Service {
  constructor({ campaignId, language, countryCode, region, startDate, endDate, custom, fileType = 'csv' }) {
    super()
    this.name = 'EXPORT_RESULT_DATA'
    this.config = {
      url: '/reports/download',
      method: 'GET',
      params: {
        campaignId,
        language,
        countryCode,
        region,
        startDate,
        endDate,
        custom,
        fileType,
      },
      responseType: fileType === 'csv' ? 'blob' : 'json',
    }
    this.denormalizer = denormalizer
  }
}

export const fetchResultDownload = (...apiParams) => getCallApiFunction(new FetchResultDownloadApi(...apiParams))
