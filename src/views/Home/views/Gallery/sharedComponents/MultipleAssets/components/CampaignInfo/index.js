// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

// Components
import Table from '../../sharedComponents/Table'
import TableHeaderRow from '../../sharedComponents/TableHeaderRow'
import CampaignInfoRow from './components/CampaignInfoRow'

// Lib MISC

// Style
import getStyle from './style'

// variables
import { headerList } from './constants/header'
import { TABLE_MODE, TAB } from '../../sharedConstants/table'

// PropTypes
export const propTypes = {
  currentTab: PropTypes.string,
  currentMode: PropTypes.string,
  filterOptions: PropTypes.object,
  formRef: PropTypes.object,
}

function CampaignInfo(props) {
  const { currentTab, currentMode, filterOptions, formRef } = props
  const style = getStyle(props)

  const { watch } = useFormContext()
  const values = watch()

  const { assetProgram, campaignName, campaignStartDate, campaignEndDate, campaignDescription } = values
  const campaignInfo = { assetProgram, campaignName, campaignStartDate, campaignEndDate, campaignDescription }

  const isViewMode = currentMode === TABLE_MODE.VIEW
  const isEditMode = currentMode === TABLE_MODE.EDIT

  return (
    <div css={style.campaignInfo()}>
      <Table>
        <TableHeaderRow headerList={headerList} />

        {isViewMode && <CampaignInfoRow.View {...campaignInfo} />}
        {isEditMode && currentTab === TAB.CAMPAIGN_INFO && <CampaignInfoRow.Edit filterOptions={filterOptions} formRef={formRef} {...campaignInfo} />}
      </Table>
    </div>
  )
}

CampaignInfo.propTypes = propTypes

export default CampaignInfo
