export const resetAssetList = (assetListRef, setValue) => {
  setValue('uploadingFiles', assetListRef.current)
}

export const resetCampaignInfo = (campaignInfoRef, setValue) => {
  const { assetProgram, campaignName, campaignStartDate, campaignEndDate, campaignDescription } = campaignInfoRef.current

  setValue('assetProgram', assetProgram)
  setValue('campaignName', campaignName)
  setValue('campaignStartDate', campaignStartDate)
  setValue('campaignEndDate', campaignEndDate)
  setValue('campaignDescription', campaignDescription)
}
