import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

// Components
import { Button } from 'evergreen-ui'
import Form from 'basicComponents/Form'
import AssetItemSmall from '../../../../sharedComponents/AssetsForm/components/AssetItemSmall'
import AssetItemBig from '../../../../sharedComponents/AssetsForm/components/AssetItemBig'

// Lib MISC
import useFetchOptionEffect from '../../../../sharedHooks/useFetchOptionEffect'
import useFetchCampaignEffect from '../../../../sharedHooks/useFetchCampaignEffect'
import useCampaignNameState from '../../../../sharedComponents/AssetsForm/hooks/useCampaignNameState'

// Variables

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  title: PropTypes.string,
  confirmLabel: PropTypes.string,
  setIsMultipleModalOpen: PropTypes.func,
  isMultipleMove: PropTypes.bool,
}

export const defaultProps = {
  setCurrentMode: () => {},
}

function MultipleModalForm(props) {
  const style = getStyle(props)

  const { setIsMultipleModalOpen, isMultipleMove } = props

  const { values, setFieldValue, handleSubmit } = useFormikContext()

  const { filterOptions } = useFetchOptionEffect()
  const { campaignOptions } = useFetchCampaignEffect()

  const { programCampaignList } = filterOptions

  const { campainNameSelectProps, clearCampain, campaignList } = useCampaignNameState({
    values,
    setFieldValue,
    programCampaignList,
    campaignOptions,
  })

  const { campaignName } = values

  return (
    <>
      <p css={style.title()}>Campaign Information</p>
      <div css={style.selectWrapper()}>
        <AssetItemSmall title='Program' width='195px'>
          <Form.SelectField placeholder='Please select' options={filterOptions.programOptions} onChange={clearCampain} name='assetProgram' />
        </AssetItemSmall>

        <AssetItemBig title='Campaign Name' width='420px'>
          <Form.CreatableSelectField
            placeholder='Enter campaign name'
            name='campaignName'
            options={campaignList}
            filterOption={(option, inputValue) => {
              return !option.data.isNew && typeof option.label === 'string' && option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }}
            {...campainNameSelectProps}
          />
        </AssetItemBig>
      </div>
      {!isMultipleMove && <p css={style.comment()}>ⓘ Edit Multiple Assets only available for assets from the same campaign.</p>}
      {isMultipleMove && (
        <p css={style.comment()}>ⓘ The selected assets will be moved to your designated campaign and their dates revised accordingly.</p>
      )}
      <div css={style.footer()}>
        <Button css={style.button()} onClick={() => setIsMultipleModalOpen(false)}>
          Cancel
        </Button>
        <Button css={style.button()} appearance='primary' disabled={!campaignName} onClick={handleSubmit}>
          {isMultipleMove ? 'Move' : 'Filter'}
        </Button>
      </div>
    </>
  )
}

MultipleModalForm.defaultProps = defaultProps
MultipleModalForm.propTypes = propTypes

export default MultipleModalForm
