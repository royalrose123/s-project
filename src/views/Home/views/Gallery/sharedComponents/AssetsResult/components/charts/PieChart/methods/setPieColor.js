import { PLATFORM_FORMAT_COLOR } from '../constants/platformFormatColor'

export function setPieColor(platformName, itemPlatform, itemFormat) {
  if (itemPlatform !== platformName) return

  return PLATFORM_FORMAT_COLOR[itemPlatform][itemFormat]
}
