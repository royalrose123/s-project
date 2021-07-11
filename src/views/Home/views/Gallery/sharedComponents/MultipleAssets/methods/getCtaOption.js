import { find } from 'lodash'

const getCtaOption = ({ assetCta, filterOptions, assetPlatform, assetFormat }) => {
  const { platformOptions } = filterOptions

  const formatOptions = find(platformOptions, { label: assetPlatform })?.formatOptions
  const ctaOptions = find(formatOptions, { label: assetFormat })?.ctaOptions
  const currentCta = find(ctaOptions, { value: assetCta })

  return { ctaValue: currentCta?.value, ctaName: currentCta?.label }
}

export default getCtaOption
