// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import TableItem from '../../../../../../sharedComponents/TableItem'

// Lib MISC

// variables
import { HEADER_WIDTH } from '../../../../constants/header'
import { DATE_LENGTH } from '../../../../../../sharedConstants/table'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  assetProgram: PropTypes.string,
  campaignName: PropTypes.string,
  campaignDescription: PropTypes.string,
  campaignStartDate: PropTypes.string,
  campaignEndDate: PropTypes.string,
}

function View(props) {
  const { assetProgram, campaignName, campaignDescription, campaignStartDate, campaignEndDate } = props
  const style = getStyle(props)

  const rowIndex = 1 // campaign info 只有一行

  return (
    <div css={style.campaignInfoRow()}>
      <TableItem width={HEADER_WIDTH.ROW_INDEX} index={0} isFixed>
        <div css={style.rowIndexWrapper()}>
          <p css={style.rowIndex()}>{rowIndex}</p>
        </div>
      </TableItem>

      <TableItem width={HEADER_WIDTH.PROGRAM} field='program' isFixed>
        <p css={style.content()}>{assetProgram}</p>
      </TableItem>
      <TableItem width={HEADER_WIDTH.CAMPAIGN_NAME} field='campaignName'>
        <p css={style.content()}>{campaignName}</p>
      </TableItem>
      <TableItem width={HEADER_WIDTH.CAMPAIGN_RUNNING_DATE} field='campaignRunningDate'>
        <p css={style.content()}>
          {campaignStartDate && campaignEndDate ? `${campaignStartDate.slice(0, DATE_LENGTH)}-${campaignEndDate.slice(0, DATE_LENGTH)}` : '-'}
        </p>
      </TableItem>
      <TableItem width={HEADER_WIDTH.CAMPAIGN_DESCRIPTION} field='campaignDescription'>
        <p css={style.content()}>{campaignDescription}</p>
      </TableItem>
    </div>
  )
}

View.propTypes = propTypes

export default View
