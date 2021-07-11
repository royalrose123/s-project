import { isUndefined, flattenDeep } from 'lodash'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default (
  assetSize,
  assetFile,
  {
    campaignStartDate,
    campaignEndDate,
    startDate,
    endDate,
    fieldAlign,
    tags,
    assetCta,
    message,
    primaryText,
    headline,
    description,
    isCtaSelect,
    ...restData
  },
) => {
  return {
    ...restData,
    ...(!isUndefined(assetFile) && { assetFile }),
    assetCtaOpt: assetCta,
    assetSize,
    campaignStartDate: String(new Date(transferDateToUSFormat(campaignStartDate)).setHours(0, 0, 0, 0)),
    campaignEndDate: String(new Date(transferDateToUSFormat(campaignEndDate)).setHours(0, 0, 0, 0)),
    startDate: String(new Date(transferDateToUSFormat(startDate)).setHours(0, 0, 0, 0)),
    endDate: String(new Date(transferDateToUSFormat(endDate)).setHours(0, 0, 0, 0)),
    captionAlign: fieldAlign ? 'right' : 'left', // 目前 primaryText, headline, message 跟 description 的 align 是連動的
    tags: flattenDeep(tags.map(tag => tag.tagValues.map(tagValue => tagValue))),
    message,
    primaryText,
    primaryTextAlign: fieldAlign ? 'right' : 'left', // 目前 primaryText, headline, message 跟 description 的 align 是連動的
    headline,
    headlineAlign: fieldAlign ? 'right' : 'left', // 目前 primaryText, headline, message 跟 description 的 align 是連動的
    description,
    descriptionAlign: fieldAlign ? 'right' : 'left', // 目前 primaryText, headline, message 跟 description 的 align 是連動的
    isCtaSelect,
  }
}
