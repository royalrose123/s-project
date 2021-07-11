import Service, { getCallApiFunction } from '../../service'

class FetchCampaignListApi extends Service {
  constructor({ campaignName, programName }) {
    super()
    this.name = 'FETCH_CAMPAIGN_LIST'
    this.config = {
      url: 'program/campaigns',
      method: 'GET',
      params: {
        campaignName,
        programName,
      },
    }
  }
}

export const fetchCampaignList = (...apiParams) => getCallApiFunction(new FetchCampaignListApi(...apiParams))
