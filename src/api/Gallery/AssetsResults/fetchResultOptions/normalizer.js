export default ({ hasData, formatType, location, language, period, defaultPeriod }) => {
  return {
    hasData,
    formatType,
    locationOptions: location
      .filter(item => item.countryCode !== 'n/a') // options 把 unknown 過濾掉
      .map(location => {
        return {
          label: location.countryName,
          value: location.countryName,
          continentCode: location.continentCode,
          countryCode: location.countryCode,
          hasRegionView: location.hasDivisions,
          region: location.region
            .filter(item => item.regionCode !== 'n/a') // options 把 unknown 過濾掉
            .map(region => {
              return {
                label: region.regionName,
                value: region.regionName,
              }
            }),
        }
      }),
    languageOptions: language.map(language => {
      return { label: language, value: language }
    }),
    periodOptions: period,
    defaultPeriod,
  }
}
