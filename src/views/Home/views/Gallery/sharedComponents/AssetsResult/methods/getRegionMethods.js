export function getRegionMethods(resultOptions) {
  return {
    getRegionOptionsByCountry(campaignCountry) {
      const { locationOptions } = resultOptions

      const countryRegion = locationOptions?.find(list => list.value === campaignCountry).region

      return countryRegion
    },
  }
}
