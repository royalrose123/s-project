import * as Yup from 'yup'
import { isBefore, isAfter, format } from 'date-fns'
import { find } from 'lodash'
import { start } from 'utils/start-flow'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'
import { PLATFORM, PLACEMENT } from '../AssetsForm/shareConstants/platformInfo'
import getFieldInfo from '../../sharedMethods/getFieldInfo'

export default props => {
  return {
    enableReinitialize: true,

    validationSchema: Yup.lazy(values => {
      const { isPrimaryTextCompulsory, isHeadlineCompulsory, isDescriptionCompulsory, isCaptionCompulsory } = getFieldInfo({
        assetPlatform: values.assetPlatform,
        assetFormat: values.assetFormat,
      })

      // 驗證時不考慮 hours, minutes, 但記得送給後端的 timestamp 需要考慮 hours, minutes
      const campaignStartDate = format(new Date(transferDateToUSFormat(values.campaignStartDate) || null), 'dd/MM/yyyy')
      const campaignEndDate = format(new Date(transferDateToUSFormat(values.campaignEndDate) || null), 'dd/MM/yyyy')

      const checkIsOutOfRange = date => {
        date = format(new Date(transferDateToUSFormat(date) || null), 'dd/MM/yyyy')

        return (
          isBefore(new Date(transferDateToUSFormat(date)), new Date(transferDateToUSFormat(campaignStartDate))) ||
          isAfter(new Date(transferDateToUSFormat(date)), new Date(transferDateToUSFormat(campaignEndDate)))
        )
      }

      const checkIsSameDate = (isOutOfRange, date, campaignDate) => {
        const isSameDate = date === campaignDate

        return !isOutOfRange || isSameDate
      }

      const checkAssetStartDate = start(checkIsOutOfRange).end((...parameters) => checkIsSameDate(...parameters, campaignStartDate))

      const checkAssetEndDate = start(checkIsOutOfRange).end((...parameters) => checkIsSameDate(...parameters, campaignEndDate))

      // 檢查新創建的 campaign 是否因為沒有權限才沒有出現在選單
      // 如果是的話就顯示 error message
      const checkIsCampaignExistByNoAccess = () => {
        const { assetProgram, campaignName, newNoAccessCampaignList } = values

        const existCampaign = find(
          newNoAccessCampaignList.filter(item => item.name === assetProgram),
          program => find(program.campaignList, { campaignName: campaignName }),
        )

        return !existCampaign
      }

      return Yup.object().shape({
        assetName: Yup.string().required('This field is mandatory'),

        assetProgram: Yup.string().required('This field is mandatory'),

        assetPlatform: Yup.string().required('This field is mandatory'),

        assetFormat: Yup.string().required('This field is mandatory'),

        caption: Yup.string().when('assetPlatform', {
          is: value => isCaptionCompulsory,
          then: Yup.string().required('This field is mandatory'),
          otherwise: () => {},
        }),

        assetLanguage: Yup.string().required('This field is mandatory'),

        countryCode: Yup.array().required('This field is mandatory'),

        campaignStartDate: Yup.string().required('This field is mandatory'),

        campaignEndDate: Yup.string().required('This field is mandatory'),

        startDate: Yup.string()
          .required('This field is mandatory')
          .test('isOutOfRange', 'Date exceeds the campaign running dates.', checkAssetStartDate),

        endDate: Yup.string()
          .required('This field is mandatory')
          .test('isOutOfRange', 'Date exceeds the campaign running dates.', checkAssetEndDate),

        campaignName: Yup.string()
          .required('This field is mandatory')
          .min(10, 'Campaign Name should contain at least 10 characters')
          .test(
            'hasNoAccess',
            `You don't have access to this campaign, please contact admin@atom.international for any concerns.`,
            checkIsCampaignExistByNoAccess,
          ),

        campaignDescription: Yup.string()
          .required('This field is mandatory')
          .min(10, 'Campaign Description should be at least 10 characters'),

        webUrl: Yup.string()
          .required('This field is mandatory')
          .matches(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
            'URL Entered does not appear to be valid, please try again.',
          ),

        assetCta: Yup.string()
          .when('assetPlatform', {
            is: value => value === PLATFORM.FACEBOOK || value === PLATFORM.INSTAGRAM,
            then: Yup.string().required('This field is mandatory'),
            otherwise: () => {},
          })
          .when('assetPlatform', {
            is: value =>
              value === PLATFORM.YOUTUBE &&
              (values.assetFormat === PLACEMENT.YOUTUBE.SKIPPABLE_VIDEO_AD ||
                values.assetFormat === PLACEMENT.YOUTUBE.NON_SKIPPABLE_VIDEO_AD ||
                values.assetFormat === PLACEMENT.YOUTUBE.BUMPER_AD),
            then: Yup.string().required('This field is mandatory'),
            otherwise: () => {},
          }),

        tags: Yup.array().of(
          Yup.object().shape({
            tagKey: Yup.string().required('This field is mandatory'),
            tagValues: Yup.string().required('This field is mandatory'),
          }),
        ),
        primaryText: Yup.string().when('assetPlatform', {
          is: value => isPrimaryTextCompulsory,
          then: Yup.string().required('This field is mandatory'),
          otherwise: () => {},
        }),
        headline: Yup.string().when('assetPlatform', {
          is: value => isHeadlineCompulsory,
          then: Yup.string().required('This field is mandatory'),
          otherwise: () => {},
        }),
        description: Yup.string().when('assetPlatform', {
          is: value => isDescriptionCompulsory,
          then: Yup.string().required('This field is mandatory'),
          otherwise: () => {},
        }),

        message: Yup.string().required('This field is mandatory'),
      })
    }),
  }
}
