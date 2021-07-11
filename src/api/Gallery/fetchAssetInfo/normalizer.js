import { format } from 'date-fns'
import { getCurrentTime } from 'utils/get-current-time'

export default ({ campaignStartDate, campaignEndDate, startDate, endDate, captionAlign, tags, assetCtaOpt, ...restData }) => {
  return {
    campaignStartDate: `${format(new Date(Number(campaignStartDate)), 'dd/MM/yyyy')} ${getCurrentTime()}`,
    campaignEndDate: `${format(new Date(Number(campaignEndDate)), 'dd/MM/yyyy')} ${getCurrentTime()}`,
    startDate: format(new Date(Number(startDate)), 'dd/MM/yyyy'),
    endDate: format(new Date(Number(endDate)), 'dd/MM/yyyy'),
    fieldAlign: captionAlign !== 'left', // 目前 primaryText, headline, message 跟 description 的 align 是連動的，所以 setValue 時都只改 fieldAlign，在 denormalize 時再給對應的 key
    tags: tags.map(tag => ({
      tagKey: tag.id,
      tagValues: tag.tagValues.map(tagValue => tagValue.id),
      tagKeyNameForDebugUse: tag.keyName, // 因 id 使用 UUID 難以閱讀，故新增此欄位
      tagValuesForDebugUse: tag.tagValues.map(tagValue => tagValue.valueName), // 因 id 使用 UUID，難以閱讀，故新增此欄位
    })),
    assetCta: assetCtaOpt,
    ...restData,
  }
}
