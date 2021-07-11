// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

// Components
import Autocomplete from 'basicComponents/Autocomplete'
import ErrorMessage from '../ErrorMessage'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  maxLength: PropTypes.number,
  autocompleteProps: PropTypes.object,
  onChange: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  onChange: () => {},
}

function AutocompleteField(props) {
  const style = getStyle(props)
  const { name, maxLength, autocompleteProps, onChange } = props
  const { campaignList } = autocompleteProps
  const [field] = useField(props)
  const hasMaxLength = Boolean(maxLength)

  const onValueChange = campaign => {
    onChange(campaign)
  }

  return (
    <div css={style.autocompleteWrapper()}>
      {hasMaxLength && <div css={style.maxLength()}>{`${field.value?.length ?? 0}/${maxLength}`}</div>}
      <Autocomplete campaignListProps={campaignList} onValueChange={onValueChange} value={field.value} {...autocompleteProps} />
      <ErrorMessage name={name} />
    </div>
  )
}

AutocompleteField.propTypes = propTypes
AutocompleteField.defaultProps = defaultProps

export default AutocompleteField
