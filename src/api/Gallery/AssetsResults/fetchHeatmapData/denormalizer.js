import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default ({ campaignId, language, country, dataType, activity, startDate, endDate, custom, sumBy }) => ({
  campaignId,
  languageName: language === 'All' ? null : language,
  countryCode: country === 'All' ? null : country,
  dataType,
  activity,
  startDate: new Date(transferDateToUSFormat(startDate)).getTime(),
  endDate: new Date(transferDateToUSFormat(endDate)).getTime(),
  custom,
  sumBy,
})
