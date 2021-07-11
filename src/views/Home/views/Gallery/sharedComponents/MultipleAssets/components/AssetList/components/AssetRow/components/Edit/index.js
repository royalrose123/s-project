import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, flattenDeep, isEqual } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'

// Components
import Icons from 'assets/icons'
import TableItem from '../../../../../../sharedComponents/TableItem'
import { Button } from 'evergreen-ui'
import FileModal from '../../../../sharedComponents/FileModal'
import TagsModal from './components/TagsModal'
import HookForm from 'basicComponents/HookForm'
import ApplyAll from '../../../../../../sharedComponents/ApplyAll'

// Lib MISC
import { start } from 'utils/start-flow'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'
import useAssetFormOptions from 'src/views/Home/views/Gallery/sharedHooks/useAssetFormOptions'
import getFieldInfo from '../../../../../../../../sharedMethods/getFieldInfo'
import { useMassUpdate } from './hooks/useMassUpdate'
import useMouseEnterLeave from 'effects/useMouseEnterLeave'

// variables
import { HEADER_WIDTH } from '../../../../constants/header'
import { TABLE_MODE, FIELD_NAME } from '../../../../../../sharedConstants/table'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  filterOptions: PropTypes.object,
  formRef: PropTypes.object,
  currentMode: PropTypes.string,
}

function Edit(props) {
  const { index, filterOptions, formRef, currentMode } = props
  const style = getStyle(props)

  const isEditMode = currentMode === TABLE_MODE.EDIT

  const { setValue, getValues, control, register } = useFormContext()

  const [isFileModalOpen, setIsFileModalOpen] = useState(false)
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false)
  const [isApplyAllShow, setisApplyAllShow] = useState(false)

  const rowRef = useRef(null)

  useMouseEnterLeave(rowRef, setisApplyAllShow)

  useEffect(() => {
    register(`uploadingFiles[${index}].assetFormatType`)
    register(`uploadingFiles[${index}].assetFormat`)
    register(`uploadingFiles[${index}].countryNames`)
    register(`uploadingFiles[${index}].tags`)
    register(`uploadingFiles[${index}].fileName`)
    register(`uploadingFiles[${index}].file`)
    register(`uploadingFiles[${index}].fileUrl`)
    register(`uploadingFiles[${index}].width`)
    register(`uploadingFiles[${index}].height`)
    register(`uploadingFiles[${index}].duration`)
    register(`uploadingFiles[${index}].assetCta`)
    register(`uploadingFiles[${index}].assetCtaName`)
    register(`uploadingFiles[${index}].caption`)
    register(`uploadingFiles[${index}].captionAlign`)
    register(`uploadingFiles[${index}].message`)
    register(`uploadingFiles[${index}].primaryText`)
    register(`uploadingFiles[${index}].headline`)
    register(`uploadingFiles[${index}].description`)
    register(`uploadingFiles[${index}].isCtaSelect`)
    register(`uploadingFiles[${index}].assetId`)
    register(`uploadingFiles[${index}].assetFile`)
  }, [index, register])

  const assetInfo = useWatch({
    control,
    name: `uploadingFiles[${index}]`,
  })

  const tags = useWatch({
    control,
    name: `uploadingFiles[${index}].tags`,
  })

  const assetFormatType = useWatch({
    control,
    name: `uploadingFiles[${index}].assetFormatType`,
  })

  const assetName = useWatch({
    control,
    name: `uploadingFiles[${index}].assetName`,
  })

  const assetPlatform = useWatch({
    control,
    name: `uploadingFiles[${index}].assetPlatform`,
  })

  const message = useWatch({
    control,
    name: `uploadingFiles[${index}].message`,
  })

  const primaryText = useWatch({
    control,
    name: `uploadingFiles[${index}].primaryText`,
  })

  const headline = useWatch({
    control,
    name: `uploadingFiles[${index}].headline`,
  })

  const description = useWatch({
    control,
    name: `uploadingFiles[${index}].description`,
  })

  const assetCta = useWatch({
    control,
    name: `uploadingFiles[${index}].assetCta`,
  })

  const { caption, webUrl, fileName, assetFormat } = assetInfo

  const selectedStartDate = getValues(`uploadingFiles[${index}].startDate`)
  const selectedEndDate = getValues(`uploadingFiles[${index}].endDate`)
  const campaignStartDate = getValues(`campaignStartDate`)
  const campaignEndDate = getValues(`campaignEndDate`)

  const { formatOptions, ctaOptions, currentTagOptions } = useAssetFormOptions({
    filterOptions,
    assetPlatform,
    assetFormat,
    assetFormatType,
    tags,
  })

  const {
    headlineMaxLength,
    descriptionMaxLength,
    isPrimaryTextDisplay,
    isHeadlineDisplay,
    isDescriptionDisplay,
    isCaptionDisplay,
    isCTASelectDisplay,
    isCTATextDisplay,
  } = getFieldInfo({
    assetPlatform,
    assetFormat,
  })

  const showAlignment = isPrimaryTextDisplay || isHeadlineDisplay || isDescriptionDisplay || isCaptionDisplay

  useEffect(() => {
    // 因為 CTA 有可能為 select 或 input
    // select value 為數字
    // input value 為字串
    // 但後端無法將同一個 field 同時設定為接受數字跟字串
    // 所以前端傳一個值告訴後端現在是字串還是數字，後端再對應處理
    if (isCTATextDisplay) {
      setValue(`uploadingFiles[${index}].isCtaSelect`, false)
    } else {
      setValue(`uploadingFiles[${index}].isCtaSelect`, true)
    }
  }, [index, isCTATextDisplay, setValue])

  const { handleMassUpdate } = useMassUpdate({ setValue, filterOptions })
  const rowIndex = index + 1

  const handleTagsKeyDown = event => {
    const spaceKeyCode = 32
    const isSpace = event.keyCode === spaceKeyCode

    if (isSpace) {
      setIsTagsModalOpen(true)
    }
  }

  return (
    <div css={style.assetRow()} ref={rowRef}>
      <TableItem width={HEADER_WIDTH.ROW_INDEX} index={0} isFixed>
        <div css={style.rowIndexWrapper()}>
          <p css={style.rowIndex()}>{rowIndex}</p>
        </div>
      </TableItem>

      <TableItem width={HEADER_WIDTH.ASSET_NAME} index={1} field='assetName' isFixed>
        <HookForm.FlexibleTextareaField
          css={style.textarea()}
          isMultiple
          maxLength={200}
          placeholder='Enter asset name'
          name={`uploadingFiles[${index}].assetName`}
          register={register}
          value={assetName}
        />
      </TableItem>

      <div css={style.tableItemWrapper()}>
        <div css={style.runningDateWrapper(HEADER_WIDTH.RUNNING_DATE)}>
          <TableItem width={HEADER_WIDTH.RUNNING_DATE} field='runningDate'>
            <HookForm.DatePickerField
              popperClassName='datepicker-popper'
              inputCss={style.datePickerInput()}
              target={formRef?.current}
              name={`uploadingFiles[${index}].startDate`}
              placeholder='Select start date'
              minDate={new Date(transferDateToUSFormat(campaignStartDate))}
              maxDate={selectedEndDate ? new Date(transferDateToUSFormat(selectedEndDate)) : new Date(transferDateToUSFormat(campaignEndDate))}
              isMultiple
            />
          </TableItem>
          <span css={style.datePickerDash()}>－</span>
          <TableItem width={HEADER_WIDTH.RUNNING_DATE} field='runningDate'>
            <HookForm.DatePickerField
              popperClassName='datepicker-popper'
              inputCss={style.datePickerInput()}
              target={formRef?.current}
              name={`uploadingFiles[${index}].endDate`}
              placeholder='Select end date'
              minDate={selectedStartDate ? new Date(transferDateToUSFormat(selectedStartDate)) : new Date(transferDateToUSFormat(campaignStartDate))}
              maxDate={new Date(transferDateToUSFormat(campaignEndDate))}
              isMultiple
            />
          </TableItem>
        </div>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.RUNNING_DATE} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem id={`countryCode-${index}`} width={HEADER_WIDTH.COUNTRY} field='country'>
          <HookForm.MultiSelectField
            css={style.select()}
            itemId={`countryCode-${index}`}
            name={`uploadingFiles[${index}].countryCode`}
            placeholder='Please select'
            width={HEADER_WIDTH.COUNTRY}
            target={formRef.current}
            options={filterOptions.countryOptions}
            onChange={options => {
              setValue(
                `uploadingFiles[${index}].countryNames`,
                options.map(item => item.label),
              )
            }}
          />
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.COUNTRY} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem id={`assetLanguage-${index}`} width={HEADER_WIDTH.LANGUAGE} field='assetLanguage'>
          <HookForm.SelectField
            css={style.select()}
            itemId={`assetLanguage-${index}`}
            name={`uploadingFiles[${index}].assetLanguage`}
            placeholder='Please select'
            width={HEADER_WIDTH.LANGUAGE}
            target={formRef.current}
            options={filterOptions.languageOptions}
          />
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.LANGUAGE} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.MESSAGE} field='message'>
          <HookForm.FlexibleTextareaField
            css={style.textarea()}
            isMultiple
            maxLength={30}
            placeholder='Enter asset message'
            name={`uploadingFiles[${index}].message`}
            register={register}
            value={message}
          />
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.MESSAGE} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.URL} field='URL'>
          <HookForm.FlexibleTextareaField
            css={style.textarea()}
            isMultiple
            placeholder='Enter the Landing Page URL that the ad redirects to'
            name={`uploadingFiles[${index}].webUrl`}
            register={register}
            value={webUrl}
          />
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.URL} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.TAGS} field='tags'>
          <div css={style.tagsWrapper()} onClick={() => setIsTagsModalOpen(true)} tabIndex={0} onKeyDown={handleTagsKeyDown}>
            {isEmpty(tags) && <p css={style.tagsPlaceholder()}>Click to add tags</p>}
            {!isEmpty(tags) && flattenDeep(tags.map(item => Object.values(item.tagName))).join(', ')}
          </div>
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.TAGS} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem id={`assetPlatform-${index}`} width={HEADER_WIDTH.PLATFORM} field='assetPlatform'>
          <HookForm.SelectField
            css={style.select()}
            itemId={`assetPlatform-${index}`}
            name={`uploadingFiles[${index}].assetPlatform`}
            placeholder='Please select'
            width={HEADER_WIDTH.PLATFORM}
            target={formRef?.current}
            options={filterOptions?.platformOptions}
            onChange={start(() => setValue(`uploadingFiles[${index}].assetFormat`, '')).end(() => {
              setValue(`uploadingFiles[${index}].assetCta`, '')
              setValue(`uploadingFiles[${index}].assetCtaName`, '')
            })}
          />
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.ASSET_PLATFORM} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem id={`assetFormat-${index}`} width={HEADER_WIDTH.PLACEMENT} field='assetFormat'>
          <HookForm.SelectField
            css={style.select()}
            itemId={`assetFormat-${index}`}
            name={`uploadingFiles[${index}].assetFormat`}
            placeholder='Please select'
            width={HEADER_WIDTH.PLACEMENT}
            target={formRef?.current}
            options={formatOptions}
            onChange={() => {
              setValue(`uploadingFiles[${index}].assetCta`, '')
              setValue(`uploadingFiles[${index}].assetCtaName`, '')
            }}
            isDisabled={!assetPlatform || isEmpty(formatOptions)}
          />
        </TableItem>
        {isEditMode && isApplyAllShow && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.ASSET_FORMAT} />}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.PRIMARY_TEXT} field='primaryText'>
          {!isPrimaryTextDisplay && '-'}
          {isPrimaryTextDisplay && (
            <HookForm.FlexibleTextareaField
              css={style.textarea()}
              isMultiple
              maxLength={125}
              placeholder='Enter asset primary text'
              name={`uploadingFiles[${index}].primaryText`}
              register={register}
              value={primaryText}
            />
          )}
        </TableItem>
        {isEditMode && isApplyAllShow && isPrimaryTextDisplay && (
          <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.PRIMARY_TEXT} />
        )}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.HEADLINE} field='headline'>
          {!isHeadlineDisplay && '-'}
          {isHeadlineDisplay && (
            <HookForm.FlexibleTextareaField
              css={style.textarea()}
              isMultiple
              maxLength={headlineMaxLength}
              placeholder='Enter asset headline'
              name={`uploadingFiles[${index}].headline`}
              register={register}
              value={headline}
            />
          )}
        </TableItem>
        {isEditMode && isApplyAllShow && isHeadlineDisplay && (
          <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.HEADLINE} />
        )}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.DESCRIPTION} field='description'>
          {!isDescriptionDisplay && '-'}
          {isDescriptionDisplay && (
            <HookForm.FlexibleTextareaField
              css={style.textarea()}
              isMultiple
              maxLength={descriptionMaxLength}
              placeholder='Enter asset description'
              name={`uploadingFiles[${index}].description`}
              register={register}
              value={description}
            />
          )}
        </TableItem>
        {isEditMode && isApplyAllShow && isDescriptionDisplay && (
          <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.DESCRIPTION} />
        )}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.CAPTION} field='caption'>
          {!isCaptionDisplay && '-'}
          {isCaptionDisplay && (
            <>
              <HookForm.FlexibleTextareaField
                css={style.textarea()}
                isMultiple
                maxLength={2200}
                placeholder='Enter caption'
                name={`uploadingFiles[${index}].caption`}
                register={register}
                value={caption}
              />
            </>
          )}
        </TableItem>
        {isEditMode && isApplyAllShow && isCaptionDisplay && (
          <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.CAPTION} />
        )}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem id={`assetCta-${index}`} width={HEADER_WIDTH.CTA} field='CTA'>
          {isEmpty(ctaOptions) && !isCTASelectDisplay && !isCTATextDisplay && '-'}
          {!isEmpty(ctaOptions) && isCTASelectDisplay && (
            <HookForm.SelectField
              css={style.select()}
              itemId={`assetCta-${index}`}
              name={`uploadingFiles[${index}].assetCta`}
              placeholder='Please select'
              width={HEADER_WIDTH.CTA}
              target={formRef.current}
              options={ctaOptions}
              isDisabled={isEmpty(ctaOptions)}
              onChange={option => {
                setValue(`uploadingFiles[${index}].assetCtaName`, option.label)
              }}
            />
          )}
          {isCTATextDisplay && (
            <HookForm.FlexibleTextareaField
              css={style.textarea()}
              isMultiple
              maxLength={10}
              placeholder='Enter CTA'
              name={`uploadingFiles[${index}].assetCta`}
              register={register}
              value={assetCta}
            />
          )}
        </TableItem>
        {isEditMode && isApplyAllShow && (isCTATextDisplay || isCTASelectDisplay) && (
          <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.CTA} />
        )}
      </div>

      <div css={style.tableItemWrapper()}>
        <TableItem width={HEADER_WIDTH.ALIGNMENT} field='alignment'>
          {!showAlignment && '-'}
          {showAlignment && <HookForm.CheckboxField label='Right-aligned' name={`uploadingFiles[${index}].fieldAlign`} tabIndex={0} />}
        </TableItem>
        {isEditMode && isApplyAllShow && showAlignment && <ApplyAll index={index} handleMassUpdate={handleMassUpdate} field={FIELD_NAME.ALIGNMENT} />}
      </div>

      <TableItem width={HEADER_WIDTH.FILE} field='file'>
        <div css={style.fileWrapper()}>
          <div css={style.fileInfoWrapper()}>
            {assetFormatType === 'image' && <div css={style.fileIconWrapper()}>{<Icons.ImageFile />}</div>}
            {assetFormatType === 'video' && <div css={style.fileIconWrapper()}>{<Icons.VideoFile />}</div>}
            {assetFormatType === 'html5' && <div css={style.fileIconWrapper()}>{<Icons.HTML5 />}</div>}
            <p css={style.content()}> {fileName}</p>
          </div>
          <Button width={66} height={25} marginLeft={4} type='button' onClick={() => setIsFileModalOpen(true)}>
            Change
          </Button>
        </div>
      </TableItem>

      {isFileModalOpen && (
        <FileModal
          index={index}
          title='Change File'
          confirmLabel='Change'
          fileAction={TABLE_MODE.EDIT}
          isShown={isFileModalOpen}
          setIsFileModalOpen={setIsFileModalOpen}
          setValueProps={setValue}
          assetInfo={assetInfo}
          registerProps={register}
          currentMode={currentMode}
        />
      )}
      {isTagsModalOpen && (
        <TagsModal
          index={index}
          confirmLabel='Save'
          isShown={isTagsModalOpen}
          setIsTagsModalOpen={setIsTagsModalOpen}
          setValueProps={setValue}
          tags={tags}
          filterOptions={filterOptions}
          currentTagOptions={currentTagOptions}
        />
      )}
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps)
}

Edit.propTypes = propTypes

export default React.memo(Edit, areEqual)
