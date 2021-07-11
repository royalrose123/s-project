import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default ({ campaignId, language, country, region, displayBy, activity, startDate, endDate, custom }) => ({
  campaignId,
  languageName: language === 'All' ? null : language,
  countryCode: country === 'All' ? null : country,
  regionName: region === 'All' ? null : region,
  sumBy: displayBy,
  activity,
  startDate: new Date(transferDateToUSFormat(startDate)).getTime(),
  endDate: new Date(transferDateToUSFormat(endDate)).getTime(),
  custom,
})
