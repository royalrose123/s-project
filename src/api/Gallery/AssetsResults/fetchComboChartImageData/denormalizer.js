import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default ({ campaignId, language, country, region, dataType, startDate, endDate, custom }) => ({
  campaignId,
  languageName: language === 'All' ? null : language,
  countryCode: country === 'All' ? null : country,
  regionName: region === 'All' ? null : region,
  dataType,
  startDate: new Date(transferDateToUSFormat(startDate)).getTime(),
  endDate: new Date(transferDateToUSFormat(endDate)).getTime(),
  custom,
})
