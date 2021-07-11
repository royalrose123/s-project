// Libs
import React from 'react'
import ReactCreatableSelect from 'react-select/creatable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// Components
import Menu from './components/Menu'

// Lib MISC
import useSelectState from './hooks/useSelectState'

// Style

// PropTypes
export const propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.object,
  onBlur: PropTypes.func,
  maxLength: PropTypes.number,
  target: PropTypes.any,
  width: PropTypes.number,
  itemId: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  placeholder: '',
  onBlur: () => {},
}

const getStyles = (inputValue, options) => {
  return {
    control: (styles, { isDisabled }) => {
      const inputWrapper = '& > div:first-of-type'
      const input = '& > div:first-of-type input'
      const placeholder = '& > div:first-of-type > div'
      const indicatorsContainer = '& > div[class$="IndicatorsContainer"]'

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

        [indicatorsContainer]: {
          display: 'none',
        },
      }
    },

    menu: (styles, { selectProps }) => {
      const { options: currentOptions } = selectProps

      const filterOptions = options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))

      const isMenuHidden = isEmpty(filterOptions) && !isEmpty(inputValue) && currentOptions.length === options.length

      return {
        ...styles,
        display: isMenuHidden ? 'none' : 'block',
      }
    },

    singleValue: styles => ({
      ...styles,
      color: '#000',
    }),

    indicatorSeparator: styles => ({ ...styles, display: 'none' }),
  }
}

const formatCreateLabel = inputValue => {
  return (
    <>
      Can't find your one? Click to add a new one:
      <strong> {inputValue}</strong>
    </>
  )
}

function CreatableSelect(props) {
  const {
    placeholder,
    onChange: onChangeProps,
    onInputChange: onInputChangeProps,
    onBlur: onBlurProps,
    options,
    value: currentOption,
    maxLength,
    target,
    width,
    itemId,
    ...restProps
  } = props
  const MenuComponent = props => <Menu {...props} width={width} target={target} itemId={itemId} />

  const { inputValue, onInputChange, onChange, onBlur } = useSelectState(
    onChangeProps,
    onInputChangeProps,
    onBlurProps,
    currentOption.value,
    maxLength,
  )

  return (
    <ReactCreatableSelect
      placeholder={placeholder}
      value={currentOption.value ? currentOption : null}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      styles={getStyles(inputValue, options)}
      formatCreateLabel={formatCreateLabel}
      onBlur={onBlur}
      components={{
        Menu: MenuComponent,
      }}
      {...restProps}
    />
  )
}

CreatableSelect.propTypes = propTypes
CreatableSelect.defaultProps = defaultProps

export default CreatableSelect
