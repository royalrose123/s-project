// Libs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, cloneDeep, isEqual } from 'lodash'

// Components
import Icons from 'assets/icons'
import TableItem from '../../../../../../sharedComponents/TableItem'
import { Checkbox } from 'evergreen-ui'

// Lib MISC

// variables
import { HEADER_WIDTH } from '../../../../constants/header'
import { DATE_LENGTH } from '../../../../../../sharedConstants/table'

// Style
import getStyle from './style'

const hasCheckbox = true

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  assetName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  assetPlatform: PropTypes.string,
  assetFormat: PropTypes.string,
  assetFormatType: PropTypes.string,
  // countryCode: PropTypes.array,
  countryNames: PropTypes.array,
  assetLanguage: PropTypes.string,
  assetCtaName: PropTypes.string,
  caption: PropTypes.string,
  webUrl: PropTypes.string,
  fileName: PropTypes.string,
  selectedAssets: PropTypes.array,
  setSelectedAssets: PropTypes.func,
}

function Delete(props) {
  const {
    index,
    assetName,
    startDate,
    endDate,
    assetPlatform,
    assetFormat,
    assetFormatType,
    // countryCode,
    countryNames,
    assetLanguage,
    assetCtaName,
    caption,
    webUrl,
    fileName,
    selectedAssets,
    setSelectedAssets,
  } = props
  const style = getStyle(props)

  const [isChecked, setIsChecked] = useState(false)

  const toggleCheck = event => {
    event.preventDefault()

    setIsChecked(prevState => !prevState)

    if (isChecked) {
      const selectedIndex = selectedAssets.indexOf(index)
      // 為了不要污染到 state 的陣列，所以 clone 一份新的陣列
      const newSelectedAssets = cloneDeep(selectedAssets)
      newSelectedAssets.splice(selectedIndex, 1)
      setSelectedAssets(newSelectedAssets)
    } else {
      setSelectedAssets(prevState => [...prevState, index])
    }
  }

  const rowIndex = index + 1

  return (
    <div css={style.assetRow()} onClick={toggleCheck}>
      <TableItem width={HEADER_WIDTH.ROW_INDEX} index={0} isFixed>
        <div css={style.rowIndexWrapper()}>
          <p css={style.rowIndex()}>{rowIndex}</p>
        </div>
      </TableItem>

      <TableItem width={HEADER_WIDTH.ASSET_NAME} index={1} field='assetName' isFixed>
        <Checkbox css={style.deleteCheckbox()} checked={isChecked} onChange={toggleCheck} />
        <p css={style.content(hasCheckbox)}>{assetName}</p>
      </TableItem>
      <TableItem width={HEADER_WIDTH.RUNNING_DATE} field='runningDate'>
        {startDate && endDate ? `${startDate.slice(0, DATE_LENGTH)}-${endDate.slice(0, DATE_LENGTH)}` : '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.PLATFORM} field='platForm'>
        {assetPlatform || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.PLACEMENT} field='format'>
        {assetFormat || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.COUNTRY} field='country'>
        {isEmpty(countryNames) && '-'}
        {!isEmpty(countryNames) && countryNames.join(', ')}
      </TableItem>
      <TableItem width={HEADER_WIDTH.LANGUAGE} field='language'>
        {assetLanguage || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.CTA} field='CTA'>
        {assetCtaName || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.TAGS} field='tags'>
        -
      </TableItem>
      <TableItem width={HEADER_WIDTH.CAPTION} field='caption'>
        {caption || '-'}
      </TableItem>
      <TableItem width={HEADER_WIDTH.URL} field='URL'>
        {webUrl || '-'}
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

Delete.propTypes = propTypes

export default React.memo(Delete, areEqual)
