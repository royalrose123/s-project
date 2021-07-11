export default ({ programIds, activities, endDate, startDate }) => ({
  programIds: programIds.join(),
  activities: activities.join(),
  endDate,
  startDate,
})
