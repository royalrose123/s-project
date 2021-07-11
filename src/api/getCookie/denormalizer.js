import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

export default ({ programIds, activities, startDate, endDate }) => ({
  programIds: programIds.join(),
  activities: activities.join(),
  startDate: new Date(transferDateToUSFormat(startDate)).getTime(),
  endDate: new Date(transferDateToUSFormat(endDate)).getTime(),
})
