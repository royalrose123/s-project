import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default ({ campaignId, language, countryCode, region, startDate, endDate, custom, fileType }) => ({
  campaignId,
  languageName: language === 'All' ? null : language,
  countryCode: countryCode === 'All' ? null : countryCode,
  regionName: region === 'All' ? null : region,
  startDate: new Date(transferDateToUSFormat(startDate)).getTime(),
  endDate: new Date(transferDateToUSFormat(endDate)).getTime(),
  custom,
  fileType,
})
