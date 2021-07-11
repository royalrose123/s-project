import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'
import { getCurrentTime } from 'utils/get-current-time'
import { format } from 'date-fns'

export function getLiveStatus(startDate, endDate) {
  if (!startDate || !endDate) return false
  // 後端給的時間都是 00:00，所以比較時間時必須考慮到時跟分

  const currentStartDate = `${format(new Date(transferDateToUSFormat(startDate)), 'MM/dd/yyyy')} ${getCurrentTime()}`
  const currentStartTimestamp = new Date(currentStartDate).getTime()
  const currentEndDate = `${format(new Date(transferDateToUSFormat(endDate)), 'MM/dd/yyyy')} ${getCurrentTime()}`
  const currentEndTimestamp = new Date(currentEndDate).getTime()
  const currentDate = `${format(new Date(), 'MM/dd/yyyy')} ${getCurrentTime()}`
  const currentTimestamp = new Date(currentDate).getTime()

  return currentTimestamp >= currentStartTimestamp && currentTimestamp <= currentEndTimestamp
}
