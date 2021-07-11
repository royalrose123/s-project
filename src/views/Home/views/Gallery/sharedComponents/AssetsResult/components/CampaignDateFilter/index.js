import React, { useEffect } from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

// Components
import RangeOption from './components/RangeOption'
import Form from 'basicComponents/Form'
import { Icon, Button } from 'evergreen-ui'

// Lib MISC
import { getMaxDate, getMinDate, getMaxResultEndDateRange } from './methods/getRangeDate'
import { transferDateToUSFormat } from 'utils/transferDateToUSFormat'

// Style
import getStyle from './style'

// Variables / Functions

// DefaultProps
export const defaultProps = {
  periodOptions: { yesterday: false, last7Days: false, last28Days: false, last3Months: false, custom: false },
}

export const propTypes = {
  isCampaignLive: PropTypes.bool,
  periodOptions: PropTypes.object,
  campaignStartDate: PropTypes.string,
  campaignEndDate: PropTypes.string,
  currentStartDate: PropTypes.string,
  currentEndDate: PropTypes.string,
  setCurrentStartDateRange: PropTypes.func,
  setDateRangeByDatePicker: PropTypes.func,
  currentRange: PropTypes.string,
  setDataRange: PropTypes.func,
  closeFilter: PropTypes.func,
}

function CampaignDateFilter(props) {
  const {
    isCampaignLive,
    periodOptions,
    campaignStartDate,
    campaignEndDate,
    currentStartDate,
    currentEndDate,
    setCurrentStartDateRange,
    setDateRangeByDatePicker,
    currentRange,
    setDataRange,
    closeFilter,
  } = props
  const style = getStyle(props)

  const { yesterday, last7Days, last28Days, last3Months, custom } = periodOptions

  const { values: useFormikValues, setFieldValue } = useFormikContext()
  const { startDate, endDate } = useFormikValues

  const isCustomRange = currentRange === 'custom'

  const onRangeClick = event => {
    const selectedRange = event.currentTarget.dataset.range

    setCurrentStartDateRange(selectedRange, setFieldValue)

    setDataRange(selectedRange)
    closeFilter()
  }

  const onApplyClick = event => {
    const selectedRange = event.currentTarget.dataset.range

    setDataRange(selectedRange)

    setDateRangeByDatePicker(useFormikValues, setFieldValue)

    closeFilter()
  }

  useEffect(() => {
    if (currentStartDate) setFieldValue('startDate', currentStartDate)
  }, [campaignStartDate, currentStartDate, setFieldValue])

  useEffect(() => {
    if (currentEndDate) setFieldValue('endDate', currentEndDate)
  }, [campaignEndDate, currentEndDate, setFieldValue])

  return (
    <div css={style.campaignDateFilter()}>
      <div css={style.campaignDateWrapper()}>
        <p css={style.campaignDateTitle()}>CampaignRunningDate</p>
        {`${format(new Date(transferDateToUSFormat(campaignStartDate) || null), 'dd/MM/yyyy')}
                   - ${format(new Date(transferDateToUSFormat(campaignEndDate) || null), 'dd/MM/yyyy')}`}
      </div>
      <div css={style.rangeOptionsWrapper()}>
        {yesterday && <RangeOption title='Yesterday' value='yesterday' onRangeClick={onRangeClick} currentRange={currentRange} />}
        {last7Days && <RangeOption title='Last 7 days' value='last7Days' onRangeClick={onRangeClick} currentRange={currentRange} />}
        {last28Days && <RangeOption title='Last 28 days' value='last28Days' onRangeClick={onRangeClick} currentRange={currentRange} />}
        {last3Months && <RangeOption title='Last 3 months' value='last3Months' onRangeClick={onRangeClick} currentRange={currentRange} />}
      </div>
      {custom && (
        <div css={style.customWrapper()}>
          <div css={style.customTitleWrapper()}>
            <p css={style.customTitle()}>Custom</p>
            {isCustomRange && <Icon icon='tick-circle' color='black' size={16} />}
          </div>
          <div css={style.datepickerWrapper()}>
            <p css={style.datepickerLabel()}>From:</p>
            <Form.DatePickerField
              inputCss={style.runningDatePicker()}
              name='startDate'
              minDate={new Date(transferDateToUSFormat(campaignStartDate))}
              maxDate={getMaxDate(new Date(transferDateToUSFormat(endDate)))}
            />
          </div>
          <div css={style.datepickerWrapper()}>
            <p css={style.datepickerLabel()}>To:</p>
            <Form.DatePickerField
              inputCss={style.runningDatePicker()}
              name='endDate'
              minDate={getMinDate(new Date(transferDateToUSFormat(startDate)))}
              maxDate={getMaxResultEndDateRange(campaignEndDate, isCampaignLive)}
            />
          </div>
          <Button css={style.customButton()} appearance='primary' onClick={onApplyClick} data-range='custom'>
            Apply
          </Button>
        </div>
      )}
    </div>
  )
}

CampaignDateFilter.defaultProps = defaultProps
CampaignDateFilter.propTypes = propTypes

export default CampaignDateFilter
