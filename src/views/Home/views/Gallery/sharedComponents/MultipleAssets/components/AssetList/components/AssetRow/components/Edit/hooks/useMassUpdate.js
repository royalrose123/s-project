import { FIELD_NAME } from '../../../../../../../sharedConstants/table'
import getFieldInfo from '../../../../../../../../../sharedMethods/getFieldInfo'
import getCtaOption from '../../../../../../../methods/getCtaOption'

export function useMassUpdate({ setValue, filterOptions }) {
  const handleMassUpdate = ({ field, index }) => {
    const assetList = window.localStorage.getItem('assetList')
    const uploadingFiles = JSON.parse(assetList)

    const selectedItem = uploadingFiles[index]
    const selectedItemValue = selectedItem[field]

    const {
      assetPlatform: selectedAssetPlatform,
      assetFormat: selectedAssetFormat,
      assetFormatType: selectedAssetFormatType,
      countryNames: selectedCountryName,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    } = selectedItem

    const isUpdateRunningDate = field === FIELD_NAME.RUNNING_DATE
    const isUpdateFormat = field === FIELD_NAME.ASSET_FORMAT
    const isUpdatePlatform = field === FIELD_NAME.ASSET_PLATFORM

    const isUpdateLanguage = field === FIELD_NAME.LANGUAGE
    const isUpdateMessage = field === FIELD_NAME.MESSAGE
    const isUpdateUrl = field === FIELD_NAME.URL
    const isUpdateTags = field === FIELD_NAME.TAGS
    const isUpdatePrimaryText = field === FIELD_NAME.PRIMARY_TEXT
    const isUpdateHeadline = field === FIELD_NAME.HEADLINE
    const isUpdateDescription = field === FIELD_NAME.DESCRIPTION
    const isUpdateCaption = field === FIELD_NAME.CAPTION
    const isUpdateAlign = field === FIELD_NAME.ALIGNMENT
    const isUpdateCTA = field === FIELD_NAME.CTA
    const isUpdateCountry = field === FIELD_NAME.COUNTRY

    const isIndependentField = isUpdateLanguage || isUpdateMessage || isUpdateUrl || isUpdateTags
    const isRelateToPlatformAndFormat = isUpdatePrimaryText || isUpdateHeadline || isUpdateDescription || isUpdateCaption

    const { ctaValue, ctaName } = getCtaOption({
      filterOptions,
      assetPlatform: selectedAssetPlatform,
      assetFormat: selectedAssetFormat,
      assetCta: selectedItemValue,
    })

    uploadingFiles.forEach((item, itemIndex) => {
      const { assetPlatform, assetFormat, assetFormatType } = item

      const { isPrimaryTextDisplay, isHeadlineDisplay, isDescriptionDisplay, isCaptionDisplay, isCTASelectDisplay, isCTATextDisplay } = getFieldInfo({
        assetPlatform,
        assetFormat,
      })

      const showAlignment = isPrimaryTextDisplay || isHeadlineDisplay || isDescriptionDisplay || isCaptionDisplay
      if (isUpdateRunningDate) {
        // ?????? mass update runningDate?????????????????? startDate ??? endDate
        setValue(`uploadingFiles[${itemIndex}].startDate`, selectedStartDate)
        setValue(`uploadingFiles[${itemIndex}].endDate`, selectedEndDate)
      } else if (isUpdatePlatform) {
        // ?????? mass update platform??? ?????? clear assetFormat, assetCta, assetCtaName
        setValue(`uploadingFiles[${itemIndex}].${field}`, selectedItemValue)
        setValue(`uploadingFiles[${itemIndex}].assetFormat`, '')
        setValue(`uploadingFiles[${itemIndex}].assetCta`, '')
        setValue(`uploadingFiles[${itemIndex}].assetCtaName`, '')
      } else if (isUpdateFormat && selectedAssetPlatform === assetPlatform && selectedAssetFormatType === assetFormatType) {
        // ?????? mass update format???????????? platform ??? formatType ????????? asset
        setValue(`uploadingFiles[${itemIndex}].${field}`, selectedItemValue)
        setValue(`uploadingFiles[${itemIndex}].assetCta`, '')
        setValue(`uploadingFiles[${itemIndex}].assetCtaName`, '')
      } else if (isRelateToPlatformAndFormat && selectedAssetPlatform === assetPlatform && selectedAssetFormat === assetFormat) {
        // ?????? mass update primaryText, headline, description, caption???????????? platform ??? format ????????? asset
        setValue(`uploadingFiles[${itemIndex}].${field}`, selectedItemValue)
      } else if (isUpdateAlign && showAlignment) {
        // ?????? mass update alignment???????????? showAlignment ??? true ??? asset
        setValue(`uploadingFiles[${itemIndex}].${field}`, selectedItemValue)
      } else if (isUpdateCTA && selectedAssetPlatform === assetPlatform && selectedAssetFormat === assetFormat) {
        // ?????? mass update CTA???????????? platform ??? format ????????? asset
        // ???????????? select ??? text ??????????????????
        if (isCTASelectDisplay) {
          setValue(`uploadingFiles[${itemIndex}].assetCta`, ctaValue)
          setValue(`uploadingFiles[${itemIndex}].assetCtaName`, ctaName)
        } else if (isCTATextDisplay) {
          setValue(`uploadingFiles[${itemIndex}].assetCta`, selectedItemValue)
          setValue(`uploadingFiles[${itemIndex}].assetCtaName`, selectedItemValue)
        }
      } else if (isUpdateCountry) {
        // ?????? mass update country??? ??????????????? countryCode ??? countryNames
        setValue(`uploadingFiles[${itemIndex}].${field}`, selectedItemValue)
        setValue(`uploadingFiles[${itemIndex}].countryNames`, selectedCountryName)
      } else if (isIndependentField) {
        setValue(`uploadingFiles[${itemIndex}].${field}`, selectedItemValue)
      }
    })
  }

  return { handleMassUpdate }
}
