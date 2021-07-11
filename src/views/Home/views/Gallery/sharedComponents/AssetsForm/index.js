import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { isEmpty, isArray } from 'lodash'
import { addDays, subDays } from 'date-fns'
import { useFormikContext, FieldArray } from 'formik'

// Components
import Form from 'basicComponents/Form'
import MultiMediaModifier from './components/MultiMediaModifier'
import AssetItemBig from './components/AssetItemBig'
import AssetItemSmall from './components/AssetItemSmall'
import { IconButton, Button } from 'evergreen-ui'
import MultipleAssets from '../MultipleAssets'
import Spinner from 'basicComponents/Spinner'

// Lib MISC
import useFetchCampaignEffect from '../../sharedHooks/useFetchCampaignEffect'
import useAssetFormOptions from '../../sharedHooks/useAssetFormOptions'
import useCampaignNameState from './hooks/useCampaignNameState'
import getFieldInfo from '../../sharedMethods/getFieldInfo'

import { start } from 'utils/start-flow'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  isViewMode: PropTypes.bool,
  isMultipleUpload: PropTypes.bool,
  isMultipleAssetsShown: PropTypes.bool,
  updateProgramList: PropTypes.func,
  initiateCurrentAssetList: PropTypes.func,
  onAssetModalClose: PropTypes.func,
  filterOptions: PropTypes.object,
  isUploading: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  isViewMode: false,
  isMultipleUpload: false,
  isUploading: false,
}

function AssetsForm(props) {
  const {
    isViewMode,
    isMultipleUpload,
    isMultipleAssetsShown,
    updateProgramList,
    initiateCurrentAssetList,
    onAssetModalClose,
    filterOptions,
    isUploading,
  } = props
  const style = getStyle(props)

  const { campaignOptions } = useFetchCampaignEffect()
  const { values, setFieldValue } = useFormikContext()
  const [selectedRemoveItem, setSelectedRemoveItem] = useState(null)

  const {
    assetFilePath: filePath,
    assetHlsPath,
    assetPlatform,
    assetFormat,
    endDate,
    startDate,
    campaignEndDate,
    campaignStartDate,
    assetProgram,
    assetFormatType,
    tags,
    assetSize,
    uploadingFiles,
  } = values

  const { programCampaignList } = filterOptions

  const { campainNameSelectProps, clearCampain, isAddNew, campaignList } = useCampaignNameState({
    values,
    setFieldValue,
    isViewMode,
    programCampaignList,
    campaignOptions,
  })

  const { formatOptions, ctaOptions, currentTagOptions } = useAssetFormOptions({
    filterOptions,
    assetPlatform,
    assetFormat,
    assetFormatType,
    tags,
  })

  const getTagValueOptions = tagKey => {
    if (tagKey) {
      const currentTagValueOptions = currentTagOptions.find(item => item.value === tagKey)
      return currentTagValueOptions?.tagValueOptions
    }
  }

  const onMultiMediaModifierSelect = mediaList => {
    setFieldValue('assetFormatType', mediaList[0].fileFormat)
    setFieldValue('assetFormat', '')
  }

  const assetFilePath = !assetHlsPath ? filePath : assetHlsPath
  const videoWithoutHlsSrc = assetFormatType === 'video' && filePath ? filePath : ''

  const {
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
  } = getFieldInfo({
    assetPlatform,
    assetFormat,
  })

  const hasMedia = !isEmpty(uploadingFiles) || assetFilePath

  useEffect(() => {
    // 因為 CTA 有可能為 select 或 input
    // select value 為數字
    // input value 為字串
    // 但後端無法將同一個 field 同時設定為接受數字跟字串
    // 所以前端傳一個值告訴後端現在是字串還是數字，後端再對應處理
    if (isCTATextDisplay) {
      setFieldValue('isCtaSelect', false)
    } else {
      setFieldValue('isCtaSelect', true)
    }
  }, [isCTATextDisplay, setFieldValue])

  return (
    <div css={style.assetForm(isMultipleUpload)}>
      <div css={[style.column(), style.campaignName()]}>
        <h2 css={style.formTitle()}>Campaign Information</h2>

        <AssetItemSmall title='Program'>
          <Form.SelectField
            isDisabled={isViewMode}
            placeholder='Please select'
            options={filterOptions.programOptions}
            onChange={clearCampain}
            name='assetProgram'
          />
        </AssetItemSmall>

        <AssetItemBig width='420px' title='Campaign Name'>
          <Form.CreatableSelectField
            placeholder='Enter campaign name'
            maxLength={250}
            name='campaignName'
            options={campaignList}
            {...campainNameSelectProps}
          />
        </AssetItemBig>
      </div>

      <div css={[style.column(), style.campaignRunningDate()]}>
        <AssetItemSmall title='Campaign Running Date'>
          <Form.DatePickerField
            inputCss={style.datePickerInput()}
            name='campaignStartDate'
            placeholder='Select start date'
            disabled={!values.assetProgram || isViewMode || !isAddNew}
            maxDate={subDays(new Date(transferDateToUSFormat(campaignEndDate)), 1)}
          />
          <span css={style.datePickerDash()}>－</span>
        </AssetItemSmall>

        <AssetItemSmall>
          <Form.DatePickerField
            inputCss={style.datePickerInput()}
            name='campaignEndDate'
            placeholder='Select end date'
            disabled={!values.assetProgram || isViewMode || !isAddNew}
            minDate={addDays(new Date(transferDateToUSFormat(campaignStartDate)), 1)}
          />
        </AssetItemSmall>
      </div>

      <AssetItemBig title='Campaign Description'>
        <Form.FlexibleTextareaField
          maxLength={500}
          disabled={isViewMode || !isAddNew || !assetProgram}
          placeholder='Enter campaign description'
          name='campaignDescription'
        />
      </AssetItemBig>

      <div css={style.asset()}>
        <h2 css={style.formTitle()}>Asset Information</h2>

        <div css={style.column(isMultipleUpload)}>
          <MultiMediaModifier
            onSelected={mediaList => {
              onMultiMediaModifierSelect(mediaList)
            }}
            action={isViewMode ? 'download' : 'upload'}
            isMultipleUpload={isMultipleUpload}
            setFieldValue={setFieldValue}
            assetFormatType={assetFormatType}
            assetFilePath={assetFilePath}
            videoWithoutHlsSrc={videoWithoutHlsSrc}
            assetSize={assetSize}
          />
          {!isMultipleUpload && (
            <>
              <AssetItemSmall title='Platform'>
                <Form.SelectField
                  isDisabled={isViewMode}
                  placeholder='Please select'
                  options={filterOptions.platformOptions}
                  onChange={start(() => setFieldValue('assetFormat', '')).end(() => setFieldValue('assetCta', ''))}
                  name='assetPlatform'
                />
              </AssetItemSmall>

              <AssetItemSmall title='Placement'>
                <Form.SelectField
                  isDisabled={isViewMode || !hasMedia || !assetPlatform || isEmpty(formatOptions)}
                  placeholder='Please select'
                  options={formatOptions}
                  name='assetFormat'
                  onChange={() => setFieldValue('assetCta', '')}
                />
              </AssetItemSmall>

              {isPrimaryTextDisplay && (
                <AssetItemBig title='Primary Text' isOptional={!isPrimaryTextCompulsory} hasAlignCheckbox>
                  <Form.FlexibleTextareaField
                    maxLength={125}
                    disabled={isViewMode}
                    placeholder='Enter asset primary text'
                    name='primaryText'
                    alignName='fieldAlign'
                    hasAlignCheckbox
                  />
                </AssetItemBig>
              )}

              {isHeadlineDisplay && (
                <AssetItemBig title='Headline' isOptional={!isHeadlineCompulsory} hasAlignCheckbox>
                  <Form.FlexibleTextareaField
                    maxLength={headlineMaxLength}
                    disabled={isViewMode}
                    placeholder='Enter asset headline'
                    name='headline'
                    alignName='fieldAlign'
                    hasAlignCheckbox
                  />
                </AssetItemBig>
              )}

              {isCaptionDisplay && (
                <AssetItemBig title='Caption' disabled={isViewMode} hasAlignCheckbox>
                  <Form.FlexibleTextareaField
                    maxLength={2200}
                    disabled={isViewMode}
                    placeholder='Enter caption'
                    name='caption'
                    alignName='fieldAlign'
                    hasAlignCheckbox
                  />
                </AssetItemBig>
              )}

              <AssetItemBig title='Message'>
                <Form.FlexibleTextareaField maxLength={30} disabled={isViewMode} placeholder='Enter asset message' name='message' />
              </AssetItemBig>
            </>
          )}
        </div>
        {!isMultipleUpload && (
          <div css={style.column()}>
            <AssetItemBig title='Asset Name'>
              <Form.FlexibleTextareaField maxLength={200} disabled={isViewMode} placeholder='Enter asset name' name='assetName' />
            </AssetItemBig>

            <AssetItemSmall title='Running Date'>
              <Form.DatePickerField
                inputCss={style.datePickerInput()}
                name='startDate'
                placeholder='Select start date'
                disabled={isViewMode}
                minDate={new Date(transferDateToUSFormat(campaignStartDate))}
                maxDate={endDate ? new Date(transferDateToUSFormat(endDate)) : new Date(transferDateToUSFormat(campaignEndDate))}
              />
              <span css={style.datePickerDash()}>－</span>
            </AssetItemSmall>

            <AssetItemSmall>
              <Form.DatePickerField
                inputCss={style.datePickerInput()}
                name='endDate'
                placeholder='Select end date'
                disabled={isViewMode}
                minDate={startDate ? new Date(transferDateToUSFormat(startDate)) : new Date(transferDateToUSFormat(campaignStartDate))}
                maxDate={new Date(transferDateToUSFormat(campaignEndDate))}
              />
            </AssetItemSmall>

            <AssetItemBig title='Country'>
              <Form.MultiSelectField isDisabled={isViewMode} placeholder='Please select' options={filterOptions.countryOptions} name='countryCode' />
            </AssetItemBig>

            <AssetItemBig hasTitle={false} hasChild>
              <AssetItemSmall title='Language'>
                <Form.SelectField isDisabled={isViewMode} placeholder='Please select' options={filterOptions.languageOptions} name='assetLanguage' />
              </AssetItemSmall>
            </AssetItemBig>

            <AssetItemBig title='Click through URL'>
              <Form.FlexibleTextareaField disabled={isViewMode} placeholder='Enter the Landing Page URL that the ad redirects to' name='webUrl' />
            </AssetItemBig>

            {!isEmpty(ctaOptions) && isCTASelectDisplay && (
              <AssetItemBig hasTitle={false} hasChild>
                <AssetItemSmall customCss={style.lastItem()} title='CTA'>
                  <Form.SelectField isDisabled={isViewMode || isEmpty(ctaOptions)} placeholder='Please select' options={ctaOptions} name='assetCta' />
                </AssetItemSmall>
              </AssetItemBig>
            )}
            {isCTATextDisplay && (
              <AssetItemBig title='CTA'>
                <Form.FlexibleTextareaField maxLength={10} disabled={isViewMode} placeholder='Enter asset CTA' name='assetCta' />
              </AssetItemBig>
            )}

            {isDescriptionDisplay && (
              <AssetItemBig title='Description' isOptional={!isDescriptionCompulsory} hasAlignCheckbox>
                <Form.FlexibleTextareaField
                  maxLength={descriptionMaxLength}
                  disabled={isViewMode}
                  placeholder='Enter asset description'
                  name='description'
                  alignName='fieldAlign'
                  hasAlignCheckbox
                />
              </AssetItemBig>
            )}

            <AssetItemBig title='Tags' isOptional customCss={{ position: 'relative' }}>
              <FieldArray
                name='tags'
                render={arrayHelpers => (
                  <>
                    {isArray(tags) &&
                      !isEmpty(tags) &&
                      tags.map((item, index) => (
                        <div key={index} css={style.tagField()}>
                          <div css={style.tagSelectWrapper()}>
                            <AssetItemSmall hasTitle={false} customCss={{ width: 125, marginRight: 15 }}>
                              <Form.SelectField
                                isDisabled={isViewMode}
                                placeholder='Select key'
                                options={currentTagOptions}
                                name={`tags.${index}.tagKey`}
                                onChange={() => setFieldValue(`tags.${index}.tagValues`, '')}
                              />
                            </AssetItemSmall>
                            <AssetItemSmall hasTitle={false} customCss={{ width: isViewMode ? 280 : 260 }}>
                              <Form.MultiSelectField
                                isDisabled={isViewMode}
                                placeholder='Select value'
                                options={getTagValueOptions(tags[index].tagKey)}
                                name={`tags.${index}.tagValues`}
                              />
                            </AssetItemSmall>
                            {!isViewMode &&
                              (selectedRemoveItem === index ? (
                                <IconButton
                                  appearance='minimal'
                                  intent='danger'
                                  icon='delete'
                                  onBlur={() => setSelectedRemoveItem(null)}
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                    setSelectedRemoveItem(null)
                                  }}
                                  marginBottom={30}
                                />
                              ) : (
                                <IconButton
                                  appearance='minimal'
                                  icon='remove'
                                  onBlur={() => setSelectedRemoveItem(null)}
                                  onClick={() => setSelectedRemoveItem(index)}
                                  marginBottom={30}
                                />
                              ))}
                          </div>
                        </div>
                      ))}
                    {!isViewMode && (
                      <Button
                        appearance='minimal'
                        height={18}
                        iconBefore='plus'
                        css={style.addTagButton()}
                        onClick={() => arrayHelpers.push({ tagKey: '', tagValues: '' })}
                      >
                        Add tag
                      </Button>
                    )}
                  </>
                )}
              />
            </AssetItemBig>
          </div>
        )}
        {/* 只有 multiple upload 時會出現 */}
        {isUploading && ReactDOM.createPortal(<Spinner />, document.body)}
        {isMultipleUpload && isMultipleAssetsShown && (
          <MultipleAssets
            isShown={isMultipleAssetsShown}
            multipleAssets={values}
            filterOptions={filterOptions}
            updateProgramList={updateProgramList}
            initiateCurrentAssetList={initiateCurrentAssetList}
            onAssetModalClose={onAssetModalClose}
            action='upload'
          />
        )}
      </div>
    </div>
  )
}

AssetsForm.propTypes = propTypes
AssetsForm.defaultProps = defaultProps

export default AssetsForm
