import { isUndefined } from 'lodash'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default (assetSize, assetFile, { campaignStartDate, campaignEndDate, startDate, endDate, ...restData }) => {
  return {
    ...restData,
    ...(!isUndefined(assetFile) && { assetFile }),
    assetSize,
    campaignStartDate: String(new Date(transferDateToUSFormat(campaignStartDate)).setHours(0, 0, 0, 0)),
    campaignEndDate: String(new Date(transferDateToUSFormat(campaignEndDate)).setHours(0, 0, 0, 0)),
    startDate: String(new Date(transferDateToUSFormat(startDate)).setHours(0, 0, 0, 0)),
    endDate: String(new Date(transferDateToUSFormat(endDate)).setHours(0, 0, 0, 0)),
    createdTimestamp: String(new Date().getTime()),
  }
}
