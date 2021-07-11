export function getCampaignOptions({ filterOptions, assetProgram }) {
  if (!filterOptions) return

  const { programCampaignList } = filterOptions

  if (!programCampaignList || !assetProgram) return

  const newCampaignOptions = programCampaignList?.find(list => list.name === assetProgram)?.campaignList.filter(campaign => campaign.hasPermission)

  return newCampaignOptions
}
