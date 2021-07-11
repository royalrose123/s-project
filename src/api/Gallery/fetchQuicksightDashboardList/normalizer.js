export default data => ({
  dashboardList: data.dashboardList.map(item => ({
    arn: item.arn,
    createdTime: item.createdTime,
    dashboardId: item.dashboardId,
    lastPublishedTime: item.lastPublishedTime,
    lastUpdatedTime: item.lastUpdatedTime,
    title: item.name,
  })),
})
