import { PLATFORM, PLACEMENT } from '../sharedComponents/AssetsForm/shareConstants/platformInfo'

function getFieldInfo({ assetPlatform, assetFormat }) {
  // field 是否顯示
  const isPrimaryTextDisplay =
    (assetPlatform === PLATFORM.FACEBOOK &&
      (assetFormat === PLACEMENT.FACEBOOK.IN_FEED_STATIC ||
        assetFormat === PLACEMENT.FACEBOOK.IN_FEED_VIDEO ||
        assetFormat === PLACEMENT.FACEBOOK.STORY_STATIC ||
        assetFormat === PLACEMENT.FACEBOOK.STORY_VIDEO)) ||
    (assetPlatform === PLATFORM.INSTAGRAM && (assetFormat === PLACEMENT.INSTAGRAM.STORY_STATIC || assetFormat === PLACEMENT.INSTAGRAM.STORY_VIDEO))

  const isHeadlineDisplay =
    (assetPlatform === PLATFORM.FACEBOOK &&
      (assetFormat === PLACEMENT.FACEBOOK.IN_FEED_STATIC || assetFormat === PLACEMENT.FACEBOOK.IN_FEED_VIDEO)) ||
    (assetPlatform === PLATFORM.YOUTUBE &&
      (assetFormat === PLACEMENT.YOUTUBE.SKIPPABLE_VIDEO_AD ||
        assetFormat === PLACEMENT.YOUTUBE.NON_SKIPPABLE_VIDEO_AD ||
        assetFormat === PLACEMENT.YOUTUBE.BUMPER_AD ||
        assetFormat === PLACEMENT.YOUTUBE.DISCOVERY))

  const isDescriptionDisplay =
    (assetPlatform === PLATFORM.FACEBOOK &&
      (assetFormat === PLACEMENT.FACEBOOK.IN_FEED_STATIC || assetFormat === PLACEMENT.FACEBOOK.IN_FEED_VIDEO)) ||
    (assetPlatform === PLATFORM.YOUTUBE && assetFormat === PLACEMENT.YOUTUBE.DISCOVERY)

  const isCaptionDisplay =
    assetPlatform === PLATFORM.INSTAGRAM && (assetFormat === PLACEMENT.INSTAGRAM.IN_FEED_STATIC || assetFormat === PLACEMENT.INSTAGRAM.IN_FEED_VIDEO)

  const isCTASelectDisplay = (assetPlatform === PLATFORM.INSTAGRAM || assetPlatform === PLATFORM.FACEBOOK) && assetFormat

  const isCTATextDisplay =
    assetPlatform === PLATFORM.YOUTUBE &&
    (assetFormat === PLACEMENT.YOUTUBE.SKIPPABLE_VIDEO_AD ||
      assetFormat === PLACEMENT.YOUTUBE.NON_SKIPPABLE_VIDEO_AD ||
      assetFormat === PLACEMENT.YOUTUBE.BUMPER_AD)

  // field 是否為必填
  const isPrimaryTextCompulsory =
    assetPlatform === PLATFORM.FACEBOOK &&
    (assetFormat === PLACEMENT.FACEBOOK.IN_FEED_STATIC ||
      assetFormat === PLACEMENT.FACEBOOK.IN_FEED_VIDEO ||
      assetFormat === PLACEMENT.FACEBOOK.STORY_STATIC ||
      assetFormat === PLACEMENT.FACEBOOK.STORY_VIDEO) &&
    (assetFormat === PLACEMENT.FACEBOOK.IN_FEED_STATIC || assetFormat === PLACEMENT.FACEBOOK.IN_FEED_VIDEO)

  const isHeadlineCompulsory = assetPlatform === PLATFORM.YOUTUBE && assetFormat === PLACEMENT.YOUTUBE.DISCOVERY

  const isDescriptionCompulsory = assetPlatform === PLATFORM.YOUTUBE && assetFormat === PLACEMENT.YOUTUBE.DISCOVERY

  const isCaptionCompulsory =
    assetPlatform === PLATFORM.INSTAGRAM && (assetFormat === PLACEMENT.INSTAGRAM.IN_FEED_STATIC || assetFormat === PLACEMENT.INSTAGRAM.IN_FEED_VIDEO)

  // field maxlength
  const headlineMaxLength =
    assetPlatform === PLATFORM.YOUTUBE &&
    (assetFormat === PLACEMENT.YOUTUBE.SKIPPABLE_VIDEO_AD ||
      assetFormat === PLACEMENT.YOUTUBE.NON_SKIPPABLE_VIDEO_AD ||
      assetFormat === PLACEMENT.YOUTUBE.BUMPER_AD)
      ? 10
      : 25

  const descriptionMaxLength =
    assetPlatform === PLATFORM.FACEBOOK && (assetFormat === PLACEMENT.FACEBOOK.IN_FEED_STATIC || assetFormat === PLACEMENT.FACEBOOK.IN_FEED_VIDEO)
      ? 30
      : 70

  return {
    headlineMaxLength,
    descriptionMaxLength,
    isPrimaryTextDisplay,
    isHeadlineDisplay,
    isDescriptionDisplay,
    isCaptionDisplay,
    isCTASelectDisplay,
    isCTATextDisplay,
    isPrimaryTextCompulsory,
    isHeadlineCompulsory,
    isDescriptionCompulsory,
    isCaptionCompulsory,
  }
}

export default getFieldInfo
