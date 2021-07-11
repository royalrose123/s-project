import differenceInHours from 'date-fns/differenceInHours'

export function getCoolDownStatus(createdTimestamp) {
  if (!createdTimestamp && !(createdTimestamp instanceof Date)) return

  const now = new Date()
  const createDate = new Date(Number(createdTimestamp)).getTime()
  const differenceDaysWithCreatedDate = differenceInHours(now, createDate)
  const isWithin24Hours = differenceDaysWithCreatedDate < 24

  return isWithin24Hours
}
