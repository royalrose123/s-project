// Libs
import React from 'react'
import ReactAsyncCreatableSelect from 'react-select/async-creatable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// Components

// Lib MISC
import useSelectState from './hooks/useSelectState'

// Style

// PropTypes
export const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  placeholder: '',
  onBlur: () => {},
}

const getStyles = inputValue => ({
  control: (styles, { isDisabled }) => {
    const inputWrapper = '& > div:first-of-type'
    const input = '& > div:first-of-type input'
    const valueViewer = 'div[class$="singleValue"]'
    const placeholder = '& > div:first-of-type > div'

    return {
      ...styles,
      background: 'transparent',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'solid 1px #d8d8d8',
      boxShadow: 'none',
      borderRadius: 0,

      '&:hover': {
        borderBottom: 'solid 1px #d8d8d8',
      },

      [inputWrapper]: {
        padding: 0,
      },

      [input]: {
        opacity: '1 !important',
      },

      [placeholder]: {
        fontSize: '14px',
        opacity: isDisabled ? '0.4' : '1',
      },

      [valueViewer]: {
        color: isEmpty(inputValue) ? 'transparent' : '#000',
      },
    }
  },

  singleValue: styles => ({
    ...styles,
    color: '#000',
  }),

  indicatorSeparator: styles => ({ ...styles, display: 'none' }),

  menu: (styles, { selectProps }) => {
    const { value: currentValue, inputValue } = selectProps
    const isMenuHidden = currentValue.label === inputValue || inputValue.trim() === ''

    return {
      ...styles,
      display: isMenuHidden ? 'none' : 'block',
    }
  },
})

const formatCreateLabel = inputValue => {
  return (
    <>
      Can't find your one? Click to add a new one:
      <strong> {inputValue}</strong>
    </>
  )
}

function AsyncCreatableSelect({
  placeholder,
  isDisabled,
  loadOptions,
  onChange: onChangeProps,
  onInputChange: onInputChangeProps,
  onBlur: onBlurProps,
  value: currentOption,
  ...restProps
}) {
  const { inputValue, onInputChange, onChange, onBlur } = useSelectState(onChangeProps, onInputChangeProps, onBlurProps, currentOption.value)

  return (
    <ReactAsyncCreatableSelect
      value={currentOption}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      onBlur={onBlur}
      components={{ DropdownIndicator: () => null }}
      styles={getStyles(inputValue)}
      placeholder={placeholder}
      isDisabled={isDisabled}
      defaultOptions
      loadOptions={loadOptions}
      formatCreateLabel={formatCreateLabel}
      {...restProps}
    />
  )
}

AsyncCreatableSelect.propTypes = propTypes
AsyncCreatableSelect.defaultProps = defaultProps

export default AsyncCreatableSelect
