import * as Yup from 'yup'
import { find } from 'lodash'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'
import { PLATFORM, PLACEMENT } from '../AssetsForm/shareConstants/platformInfo'
import getFieldInfo from '../../sharedMethods/getFieldInfo'

export const schema = Yup.lazy(values => {
  // 驗證時不考慮 hours, minutes, 但記得送給後端的 timestamp 需要考慮 hours, minutes
  const campaignStartDate = new Date(transferDateToUSFormat(values.campaignStartDate)).getTime()
  const campaignEndDate = new Date(transferDateToUSFormat(values.campaignEndDate)).getTime()

  const checkIsCampaignExistByNoAccess = () => {
    const { assetProgram, campaignName, newNoAccessCampaignList } = values

    const existCampaign = find(
      newNoAccessCampaignList.filter(item => item.name === assetProgram),
      program => find(program.campaignList, { campaignName: campaignName }),
    )

    return !existCampaign
  }

  const checkAssetStartDate = date => {
    const startDate = new Date(transferDateToUSFormat(date)).getTime()

    return startDate >= campaignStartDate
  }

  const checkAssetEndDate = date => {
    const endDate = new Date(transferDateToUSFormat(date)).getTime()

    return endDate <= campaignEndDate
  }

  return Yup.object().shape({
    campaignName: Yup.string()
      .required('This field is mandatory')
      .min(10, 'Campaign Name should contain at least 10 characters')
      .test(
        'hasNoAccess',
        `You don't have access to this campaign, please contact admin@atom.international for any concerns.`,
        checkIsCampaignExistByNoAccess,
      ),
    campaignStartDate: Yup.string().required('This field is mandatory'),

    campaignEndDate: Yup.string().required('This field is mandatory'),
    campaignDescription: Yup.string()
      .required('This field is mandatory')
      .min(10, 'Campaign Description should be at least 10 characters'),
    uploadingFiles: Yup.array()
      .of(
        Yup.object().shape({
          assetName: Yup.string().required('This field is mandatory'),
          assetPlatform: Yup.string().required('This field is mandatory'),
          assetFormat: Yup.string().required('This field is mandatory'),
          caption: Yup.string().when(['assetPlatform', 'assetFormat'], {
            is: (assetPlatform, assetFormat) => {
              const { isCaptionCompulsory } = getFieldInfo({
                assetPlatform,
                assetFormat,
              })

              return isCaptionCompulsory
            },
            then: Yup.string().required('This field is mandatory'),
            otherwise: () => {},
          }),
          assetLanguage: Yup.string().required('This field is mandatory'),
          assetCta: Yup.string()
            .when('assetPlatform', {
              is: value => value === PLATFORM.FACEBOOK || value === PLATFORM.INSTAGRAM,
              then: Yup.string().required('This field is mandatory'),
              otherwise: () => {},
            })
            .when(['assetPlatform', 'assetFormat'], {
              is: (assetPlatform, assetFormat) =>
                assetPlatform === PLATFORM.YOUTUBE &&
                (assetFormat === PLACEMENT.YOUTUBE.SKIPPABLE_VIDEO_AD ||
                  assetFormat === PLACEMENT.YOUTUBE.NON_SKIPPABLE_VIDEO_AD ||
                  assetFormat === PLACEMENT.YOUTUBE.BUMPER_AD),
              then: Yup.string().required('This field is mandatory'),
              otherwise: () => {},
            }),
          countryCode: Yup.array().required('This field is mandatory'),
          webUrl: Yup.string()
            .required('This field is mandatory')
            .matches(
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
              'URL Entered does not appear to be valid, please try again.',
            ),
          tags: Yup.array().of(
            Yup.object().shape({
              tagKey: Yup.string().required('This field is mandatory'),
              tagValues: Yup.array().required('This field is mandatory'),
            }),
          ),
          startDate: Yup.string()
            .required('This field is mandatory')
            .test('isOutOfRange', 'Date exceeds the campaign running dates.', checkAssetStartDate),
          endDate: Yup.string()
            .required('This field is mandatory')
            .test('isOutOfRange', 'Date exceeds the campaign running dates.', checkAssetEndDate),
          primaryText: Yup.string().when(['assetPlatform', 'assetFormat'], {
            is: (assetPlatform, assetFormat) => {
              const { isPrimaryTextCompulsory } = getFieldInfo({
                assetPlatform,
                assetFormat,
              })

              return isPrimaryTextCompulsory
            },

            then: Yup.string().required('This field is mandatory'),
            otherwise: () => {},
          }),
          headline: Yup.string().when(['assetPlatform', 'assetFormat'], {
            is: (assetPlatform, assetFormat) => {
              const { isHeadlineCompulsory } = getFieldInfo({
                assetPlatform,
                assetFormat,
              })

              return isHeadlineCompulsory
            },
            then: Yup.string().required('This field is mandatory'),
            otherwise: () => {},
          }),
          description: Yup.string().when(['assetPlatform', 'assetFormat'], {
            is: (assetPlatform, assetFormat) => {
              const { isDescriptionCompulsory } = getFieldInfo({
                assetPlatform,
                assetFormat,
              })

              return isDescriptionCompulsory
            },
            then: Yup.string().required('This field is mandatory'),
            otherwise: () => {},
          }),
          message: Yup.string().required('This field is mandatory'),
        }),
      )
      .required(),
  })
})
