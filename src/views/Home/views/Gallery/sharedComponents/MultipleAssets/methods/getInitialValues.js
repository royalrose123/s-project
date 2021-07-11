import { getImageSize, getVideoSize } from 'utils/getAssetSize'
import transferTagsGroupByKey from './transferTagsGroupByKey'
import getFileNameByMediaURL from './getFileNameByMediaURL'
import getCtaOption from './getCtaOption'
import getFieldInfo from '../../../sharedMethods/getFieldInfo'

const getInitialValues = ({ isUpload, multipleAssets, filterOptions }) => {
  const { uploadingFiles, assetProgram, campaignName, campaignDescription, campaignStartDate, campaignEndDate } = multipleAssets

  if (isUpload) {
    // 如果是 multiple upload 就設定初始值
    const newUploadingFiles = uploadingFiles.map(item => {
      const { fileName, fileFormat, ...restItem } = item

      return {
        ...restItem,
        fileName,
        assetName: fileName,
        assetPlatform: '',
        assetFormat: '',
        assetFormatType: fileFormat,
        assetLanguage: '',
        assetCta: '',
        assetCtaName: '',
        countryCode: [],
        countryNames: [],
        caption: '',
        fieldAlign: false,
        startDate: campaignStartDate,
        endDate: campaignEndDate,
        tags: [],
        tagsNames: [],
        webUrl: '',
        createUser: '',
        message: '',
        primaryText: '',
        headline: '',
        description: '',
      }
    })

    return newUploadingFiles
  } else {
    // 如果是 multiple edit/move 就將初始值設定成選取 asset 的 info
    const newUploadingFiles = uploadingFiles.map(item => {
      const { assetName, ...restItem } = item

      const { imageWidth, imageHeight } = getImageSize(item?.size)
      const { videoDuration } = getVideoSize(item?.size)

      const { tagOptions } = filterOptions

      const newTagsOptions = transferTagsGroupByKey(item.tags, tagOptions)

      const fileName = getFileNameByMediaURL(item.mediaURL)

      const { isCTATextDisplay } = getFieldInfo({ assetPlatform: item.platform, assetFormat: item.format })

      const { ctaValue, ctaName } = getCtaOption({
        filterOptions,
        assetPlatform: item.platform,
        assetFormat: item.format,
        assetCta: item.assetCta,
      })

      return {
        ...restItem,
        fileName,
        assetName,
        program: assetProgram,
        campaignName,
        campaignDescription,
        campaignStartDate,
        campaignEndDate,
        assetPlatform: item.platform,
        assetFormat: item.format,
        assetFormatType: item.formatType,
        assetLanguage: item.language,
        fieldAlign: item.captionAlign !== 'left', // 目前 primaryText, headline, message 跟 description 的 align 是連動的，所以 setValue 時都只改 fieldAlign，在 denormalize 時再給對應的 key
        startDate: campaignStartDate,
        endDate: campaignEndDate,
        width: item.formatType === 'image' ? imageWidth : '',
        height: item.formatType === 'image' ? imageHeight : '',
        duration: item.formatType === 'video' ? videoDuration : '',
        tags: newTagsOptions,
        assetCta: isCTATextDisplay ? ctaName : ctaValue,
        assetCtaName: ctaName,
        isCtaSelect: !isCTATextDisplay,
        assetFile: item.file,
      }
    })

    return newUploadingFiles
  }
}

export default getInitialValues
