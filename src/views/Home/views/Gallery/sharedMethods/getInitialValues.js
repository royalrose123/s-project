import getFieldInfo from './getFieldInfo'
import { find } from 'lodash'

export default function getInitialValues(assetInfo, ctaOptions) {
  const { assetPlatform, assetFormat } = assetInfo

  const { isCTATextDisplay } = getFieldInfo({ assetPlatform, assetFormat })

  // 因為 CTA 有可能為 select 或 input
  // select value 為數字
  // input value 為字串
  // 但後端都回傳數字 (CTA id)
  // 所以前端依據現在是 select 還是 input 給對應的值
  const newAssetCta = isCTATextDisplay ? find(ctaOptions, { value: assetInfo.assetCta })?.label : assetInfo.assetCta

  return {
    assetFile: assetInfo.assetFile,
    assetName: assetInfo.assetName,
    assetProgram: assetInfo.assetProgram,
    assetPlatform: assetInfo.assetPlatform,
    assetFormat: assetInfo.assetFormat,
    assetFormatType: assetInfo.assetFormatType,
    assetFilePath: assetInfo.assetFilePath,
    assetHlsPath: assetInfo.assetHlsPath,
    assetLanguage: assetInfo.assetLanguage,
    assetCta: newAssetCta || '',
    assetSize: assetInfo.assetSize,
    countryCode: assetInfo.countryCode,
    caption: assetInfo.caption,
    captionAlign: assetInfo.captionAlign,
    campaignStartDate: assetInfo.campaignStartDate,
    campaignEndDate: assetInfo.campaignEndDate,
    startDate: assetInfo.startDate,
    endDate: assetInfo.endDate,
    campaignName: assetInfo.campaignName,
    campaignDescription: assetInfo.campaignDescription,
    webUrl: assetInfo.webUrl,
    createUser: assetInfo.createUser,
    campaignId: assetInfo.campaignId,
    tags: assetInfo.tags,
    newNoAccessCampaignList: [],
    message: assetInfo.message,
    primaryText: assetInfo.primaryText,
    headline: assetInfo.headline,
    description: assetInfo.description,
    fieldAlign: assetInfo.fieldAlign,
    isCtaSelect: !isCTATextDisplay,
  }
}
