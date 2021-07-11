export default ({ program, platform, language, country, tag }) => {
  return {
    programOptions: program.map(program => {
      return { label: program.programName, value: program.programName }
    }),
    programCampaignList: program
      .filter(program => program.programName) // 後端加了 fake campaign，導致 program 可能為空字串，所以要把空字串過濾掉
      .map(program => {
        return {
          name: program.programName,
          campaignList: program.campaign.map(campaign => ({
            label: campaign.campaignName,
            value: campaign.campaignName,
            campaignName: campaign.campaignName,
            hasPermission: campaign.hasPerm,
          })),
        }
      }),
    platformOptions: platform.map(platform => {
      return {
        label: platform.platformName,
        value: platform.platformName,
        formatOptions: platform.platformFormat.map(format => ({
          label: format.formatName,
          value: format.formatName,
          type: format.formatType,
          ctaOptions: format.cta.map(({ ctaName, id }) => ({ label: ctaName, value: id })),
        })),
      }
    }),
    countryOptions: country.map(({ countryName, countryCode }) => {
      return { label: countryName, value: countryCode }
    }),
    languageOptions: language.map(language => {
      return { label: language, value: language }
    }),
    tagOptions: tag.map(tag => {
      return {
        label: tag.keyName,
        value: tag.id,
        tagValueOptions: tag.tagValues.map(tagValue => ({
          label: tagValue.valueName,
          value: tagValue.id,
        })),
      }
    }),
  }
}
