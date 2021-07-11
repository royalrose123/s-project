import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denomalizer'
import normalizer from './normalizer'

import axios from 'axios'
export let cancelProgramAssetsRequest // if there is a request is executing, then cancel it first before sending new request

const CancelToken = axios.CancelToken

class FetchProgramAssetsApi extends Service {
  constructor({
    programName,
    campaignName,
    platform,
    format,
    countryCode,
    language,
    runningDate,
    assetName,
    page,
    pageSize,
    isMixPlatform,
    tagKey,
    tagValue,
  }) {
    super()
    this.name = 'FETCH_PROGRAM_ASSETS'
    this.config = {
      // name: 'program_assets',
      url: '/program/assets',
      method: 'GET',
      params: {
        programName,
        campaignName,
        platform,
        format,
        countryCode,
        language,
        runningDate,
        assetName,
        page,
        pageSize,
        isMixPlatform,
        tagKey,
        tagValue,
      },
      cancelToken: new CancelToken(function executor(onCancel) {
        // An executor function receives a cancel function as a parameter
        cancelProgramAssetsRequest = onCancel
      }),
    }
    this.denormalizer = denormalizer
    this.normalizer = normalizer
  }
}

export const fetchProgramAssets = (...apiParams) => getCallApiFunction(new FetchProgramAssetsApi(...apiParams))
