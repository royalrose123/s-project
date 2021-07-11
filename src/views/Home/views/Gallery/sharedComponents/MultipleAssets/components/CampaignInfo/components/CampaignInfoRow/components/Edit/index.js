import React from 'react'
import PropTypes from 'prop-types'
import useFetchCampaignEffect from '../../../../../../../../sharedHooks/useFetchCampaignEffect'
import useCampaignNameState from './hooks/useCampaignNameState'
import { useFormContext } from 'react-hook-form'

// Components
import TableItem from '../../../../../../sharedComponents/TableItem'
import HookForm from 'basicComponents/HookForm'

// Lib MISC
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

// variables
import { HEADER_WIDTH } from '../../../../constants/header'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  assetProgram: PropTypes.string,
  campaignStartDate: PropTypes.string,
  campaignEndDate: PropTypes.string,
  campaignDescription: PropTypes.string,
  filterOptions: PropTypes.object,
  formRef: PropTypes.object,
}

function Edit(props) {
  const { assetProgram, campaignStartDate, campaignEndDate, campaignDescription, filterOptions, formRef } = props
  const style = getStyle(props)

  const { setValue, register, watch } = useFormContext()

  const seletedCampaignStartDate = watch('campaignStartDate')
  const seletedCampaignEndDate = watch('campaignEndDate')

  const { programCampaignList } = filterOptions

  const { campaignOptions } = useFetchCampaignEffect()

  const { campainNameSelectProps, isAddNew, campaignList, clearCampain } = useCampaignNameState({
    assetProgram,
    setValue,
    programCampaignList,
    campaignOptions,
    register,
  })

  const rowIndex = 1 // campaign info 只有一行

  return (
    <div css={style.campaignInfoRow()}>
      <TableItem width={HEADER_WIDTH.ROW_INDEX} index={0} isFixed>
        <div css={style.rowIndexWrapper()}>
          <p css={style.rowIndex()}>{rowIndex}</p>
        </div>
      </TableItem>

      <TableItem id='assetProgram' width={HEADER_WIDTH.PROGRAM} index={1} field='assetProgram'>
        <HookForm.SelectField
          css={style.select()}
          itemId='assetProgram'
          name='assetProgram'
          placeholder='Please select'
          width={HEADER_WIDTH.PROGRAM}
          target={formRef.current}
          options={filterOptions.programOptions}
          defaultValue={assetProgram}
          onChange={clearCampain}
        />
      </TableItem>
      <TableItem id='campaignName' width={HEADER_WIDTH.CAMPAIGN_NAME} field='campaignName'>
        <HookForm.CreatableSelectField
          itemId='campaignName'
          css={style.select(HEADER_WIDTH.CAMPAIGN_NAME)}
          width={HEADER_WIDTH.CAMPAIGN_NAME}
          target={formRef.current}
          placeholder='Enter campaign name'
          maxLength={250}
          name='campaignName'
          options={campaignList}
          isMultiple
          {...campainNameSelectProps}
        />
      </TableItem>
      <div css={style.campaignRunningDateWrapper(HEADER_WIDTH.CAMPAIGN_RUNNING_DATE)}>
        <TableItem width={HEADER_WIDTH.CAMPAIGN_RUNNING_DATE} field='campaignRunningDate'>
          <HookForm.DatePickerField
            popperClassName='datepicker-popper'
            inputCss={style.datePickerInput()}
            target={formRef.current}
            name='campaignStartDate'
            placeholder='Select start date'
            disabled={!assetProgram || !isAddNew}
            maxDate={
              seletedCampaignEndDate ? new Date(transferDateToUSFormat(seletedCampaignEndDate)) : new Date(transferDateToUSFormat(campaignEndDate))
            }
            isMultiple
            defaultValue={campaignStartDate}
          />
        </TableItem>
        <span css={style.datePickerDash()}>－</span>
        <TableItem width={HEADER_WIDTH.CAMPAIGN_RUNNING_DATE} field='campaignRunningDate'>
          <HookForm.DatePickerField
            popperClassName='datepicker-popper'
            inputCss={style.datePickerInput()}
            target={formRef.current}
            name='campaignEndDate'
            placeholder='Select end date'
            disabled={!assetProgram || !isAddNew}
            minDate={
              seletedCampaignStartDate
                ? new Date(transferDateToUSFormat(seletedCampaignStartDate))
                : new Date(transferDateToUSFormat(campaignStartDate))
            }
            isMultiple
            defaultValue={campaignEndDate}
          />
        </TableItem>
      </div>
      <TableItem width={HEADER_WIDTH.CAMPAIGN_DESCRIPTION} field='campaignDescription'>
        <HookForm.FlexibleTextareaField
          css={style.textarea()}
          isMultiple
          maxLength={500}
          placeholder='Enter campaign description'
          name='campaignDescription'
          register={register}
          value={campaignDescription}
          disabled={!isAddNew || !assetProgram}
        />
      </TableItem>
    </div>
  )
}

Edit.propTypes = propTypes

export default Edit
