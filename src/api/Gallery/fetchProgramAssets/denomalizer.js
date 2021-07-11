import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default ({
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
}) => ({
  programName: programName === 'All' ? null : programName,
  campaignName: campaignName === 'All' ? null : campaignName,
  assetPlatform: platform === 'All' ? null : platform,
  assetFormat: format === 'All' ? null : format,
  countryCode: countryCode === 'All' ? null : countryCode,
  assetLanguage: language === 'All' ? null : language,
  runningDate: runningDate ? new Date(transferDateToUSFormat(runningDate)).getTime() : null,
  assetName,
  page,
  pageSize,
  isMixPlatform,
  // testNum: 500, // TODO: 後端為了方便測 lazy loading 而加的參數，正常不用加
  // 若只有選 tag key（亦即 tag value 為 All），則給 tag key id 參數
  // 若有選 tag value，則不用給 tag key id 參數
  tagKeyUuid: tagKey === 'All' || tagValue !== 'All' ? null : tagKey,
  tagValueUuid: tagValue === 'All' ? null : tagValue,
})
