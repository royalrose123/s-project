// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, flattenDeep, isEqual } from 'lodash'
import { useFormContext } from 'react-hook-form'

// Components
import Icons from 'assets/icons'
import TableItem from '../../../../../../sharedComponents/TableItem'
import HookForm from 'basicComponents/HookForm'

// Lib MISC
import getFieldInfo from '../../../../../../../../sharedMethods/getFieldInfo'

// variables
import { HEADER_WIDTH } from '../../../../constants/header'
import { DATE_LENGTH } from '../../../../../../sharedConstants/table'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  assetName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  assetPlatform: PropTypes.string,
  assetFormat: PropTypes.string,
  assetFormatType: PropTypes.string,
  countryNames: PropTypes.array,
  assetLanguage: PropTypes.string,
  message: PropTypes.string,
  primaryText: PropTypes.string,
  headline: PropTypes.string,
  description: PropTypes.string,
  assetCtaName: PropTypes.string,
  caption: PropTypes.string,
  webUrl: PropTypes.string,
  fileName: PropTypes.string,
  tags: PropTypes.array,
}

function View(props) {
  const {
    index,
    assetName,
    startDate,
    endDate,
    assetPlatform,
    assetFormat,
    assetFormatType,
    countryNames,
    assetLanguage,
    message,
    primaryText,
    headline,
    description,
    assetCtaName,
    caption,
    webUrl,
    fileName,
    tags,
  } = props
  const style = getStyle(props)

  const { register, unregister } = useFormContext()

  useEffect(() => {
    register(`uploadingFiles[${index}]`)

    return () => {
      unregister(`uploadingFiles[${index}]`)
    }
  }, [index, register, unregister])

  const { isPrimaryTextDisplay, isHeadlineDisplay, isDescriptionDisplay, isCaptionDisplay } = getFieldInfo({
    assetPlatform,
    assetFormat,
  })

  const showAlignment = isPrimaryTextDisplay || isHeadlineDisplay || isDescriptionDisplay || isCaptionDisplay
  const rowIndex = index + 1

  return (
    <div css={style.assetRow()}>
      <TableItem width={HEADER_WIDTH.ROW_INDEX} index={0} isFixed>
        <div css={style.rowIndexWrapper()}>
          <p css={style.rowIndex()}>{rowIndex}</p>
        </div>
      </TableItem>

      <TableItem width={HEADER_WIDTH.ASSET_NAME} index={1} field='assetName' isFixed>
        <p css={style.content()}>{assetName}</p>
      </TableItem>
      <TableItem width={HEADER_WIDTH.RUNNING_DATE} field='runningDate'>
        {startDate && endDate ? `${startDate.slice(0, DATE_LENGTH)}-${endDate.slice(0, DATE_LENGTH)}` : '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.COUNTRY} field='country'>
        {isEmpty(countryNames) && '-'}
        {!isEmpty(countryNames) && countryNames.join(', ')}
      </TableItem>
      <TableItem width={HEADER_WIDTH.LANGUAGE} field='language'>
        {assetLanguage || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.MESSAGE} field='message'>
        {message || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.URL} field='URL'>
        {webUrl || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.TAGS} field='tags'>
        {isEmpty(tags) && '-'}
        {!isEmpty(tags) && flattenDeep(tags.map(item => Object.values(item.tagName))).join(', ')}
      </TableItem>
      <TableItem width={HEADER_WIDTH.PLATFORM} field='platForm'>
        {assetPlatform || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.PLACEMENT} field='format'>
        {assetFormat || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.PRIMARY_TEXT} field='primaryText'>
        {primaryText || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.HEADLINE} field='headline'>
        {headline || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.DESCRIPTION} field='description'>
        {description || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.CAPTION} field='caption'>
        {caption || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.CTA} field='CTA'>
        {assetCtaName || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.ALIGNMENT} field='ALIGNMENT'>
        {!showAlignment && '-'}
        {showAlignment && <HookForm.CheckboxField label='Right-aligned' name={`uploadingFiles[${index}].fieldAlign`} disabled />}
      </TableItem>
      <TableItem width={HEADER_WIDTH.FILE} field='file'>
        <div css={style.fileWrapper()}>
          <div css={style.fileIconWrapper()}>{assetFormatType === 'image' ? <Icons.ImageFile /> : <Icons.VideoFile />}</div>
          <p css={style.content()}> {fileName}</p>
        </div>
      </TableItem>
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps)
}

View.propTypes = propTypes

export default React.memo(View, areEqual)
