import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// Components
import Autosuggest from 'react-autosuggest'

import getStyle from './style'

export const defaultProps = {
  value: '',
}

export const propTypes = {
  inputCss: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  campaignListProps: PropTypes.array,
  updateCampaignList: PropTypes.func,
  onValueChange: PropTypes.func,
  containerProps: PropTypes.object,
  children: PropTypes.object,
  query: PropTypes.object,
}

function AutocompleteComponent(props) {
  const style = getStyle(props)
  const { inputCss, value, placeholder, disabled, campaignListProps, updateCampaignList, onValueChange } = props

  const [inputValue, setInputValue] = useState('')
  const [campaignList, setCampaignList] = useState([])

  useEffect(() => {
    setCampaignList(campaignListProps)
  }, [campaignListProps])

  const onInputChange = (event, { newValue, method }) => {
    setInputValue(newValue)
    onValueChange(newValue)
  }

  const getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return inputValue
    }

    return suggestion
  }

  const renderSuggestion = suggestion => {
    if (suggestion.isAddNew) {
      return (
        <span>
          can't find your one? click to add a new one: <strong>{inputValue}</strong>
        </span>
      )
    }

    return suggestion
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    updateCampaignList({ campaignName: value })
  }

  const onSuggestionsClearRequested = () => {}

  const onSuggestionSelected = (event, { suggestion }) => {}

  const inputProps = {
    placeholder: placeholder,
    value: value,
    disabled: disabled,
    onChange: onInputChange,
  }

  const renderInputComponent = inputProps => (
    <div css={style.autocompleteWrapper()}>
      <input css={[style.autocompleteInput(), inputCss]} {...inputProps} />
    </div>
  )

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div css={style.autocomplete(!isEmpty(children))} {...containerProps}>
        {children}
      </div>
    )
  }

  const getSuggestions = () => {
    const suggestions = campaignList?.map(campaign => campaign.campaignName) || []

    if (suggestions?.length === 0) {
      return [{ isAddNew: true }]
    }

    return suggestions
  }

  return (
    <Autosuggest
      suggestions={getSuggestions()}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      renderSuggestionsContainer={renderSuggestionsContainer}
      {...props}
    />
  )
}

AutocompleteComponent.propTypes = propTypes
AutocompleteComponent.defaultProps = defaultProps

export default AutocompleteComponent
