export default data => ({
  CMPAccess: {
    canCreateCampaign: data.apps.cmp.createCampaign,
    canDeleteSingleAsset: data.apps.cmp.deleteSingleNotLiveAsset,
    canDeleteSingleLiveAsset: data.apps.cmp.deleteSingleLiveAsset,
    canDownloadCampaignResultCsv: data.apps.cmp.downloadCampaignResultCsv,
    canDownloadFile: data.apps.cmp.downloadFile,
    canDownloadMultipleAssetZip: data.apps.cmp.downloadMultipleAssetZip,
    canDuplicateMultipleAsset: data.apps.cmp.duplicateMultipleAsset,
    canDuplicateSingleAsset: data.apps.cmp.duplicateSingleAsset,
    canEditAsset: data.apps.cmp.editAsset,
    canEditLiveAsset: data.apps.cmp.editLiveAsset,
    canEditLiveAssetOver24Hr: data.apps.cmp.editAssetOver24h,
    canMoveAsset: data.apps.cmp.moveSingleNotLiveAsset,
    canMoveLiveAsset: data.apps.cmp.moveSingleLiveAsset,
    canMoveLiveAssetOver24Hr: data.apps.cmp.moveAssetOver24h,
    canViewGallery: data.apps.cmp.gallery,
    canViewAssetInfoPage: data.apps.cmp.informationPage,
    canViewAssetResultPage: data.apps.cmp.resultPage,
    canSearch: data.apps.cmp.search,
    canUploadAsset: data.apps.cmp.uploadAsset,
    canViewMap: data.apps.cmp.mapView,
    canViewDashboard: data.apps.cmp.highLevelCampaignProgramLevel,
    canViewQuicksight: data.apps.cmp.highLevelCampaignCampaignLevel,
  },
  DMPAccess: {
    canViewDMP: data.apps.dmp.dmpMainPage,
    canExportData: data.apps.dmp.exportCampaignReport,
    canImportData: data.apps.dmp.importCampaignReport,
  },
  userEmail: data.userEmail,
  userFirstName: data.userFirstName,
  userLastName: data.userLastName,
  roleName: data.roleName,
})
