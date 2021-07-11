// Libs
import React from 'react'
import ReactSelect from 'react-select'
import PropTypes from 'prop-types'

// Components
import DropdownIndicator from '../Select/components/DropdownIndicator'
import MultiValueRemove from './components/MultiValueRemove'
// import Menu from './components/Menu'
import Input from './components/Input'

// Style

// PropTypes
export const propTypes = {
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  target: PropTypes.any,
  width: PropTypes.number,
  itemId: PropTypes.string,
  inputProps: PropTypes.object,
}

// DefaultProps
export const defaultProps = {
  placeholder: '',
  inputProps: {},
}

const styles = {
  control: (styles, { isDisabled }) => {
    const input = '& > div:first-of-type'
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

      [input]: {
        padding: 0,
      },

      [placeholder]: {
        fontSize: '14px',
        opacity: isDisabled ? '0.4' : '1',
        height: '16px',
      },
    }
  },

  option: styles => ({ ...styles, fontSize: '14px' }),

  menu: styles => ({ ...styles }),

  indicatorSeparator: styles => ({ ...styles, display: 'none' }),

  singleValue: styles => ({
    ...styles,
    color: '#000',
  }),

  multiValue: (styles, { isDisabled }) => {
    const value = '& > div: first-child'

    return {
      ...styles,
      background: 'none',
      color: '#000',
      alignItems: 'center',
      marginRight: '7px',

      [value]: {
        padding: isDisabled ? 0 : '0 5px 0 0',
        fontSize: '14px',
        height: '16px',
      },
    }
  },

  multiValueRemove: (styles, { isDisabled }) => ({
    ...styles,
    background: '#000',
    borderRadius: '50%',
    padding: '3px',
    cursor: 'pointer',
    display: isDisabled ? 'none' : 'flex',

    '&:hover': {
      background: '#000',
    },
  }),

  menuPortal: base => ({ ...base, zIndex: 9999 }),
}

function Select({ placeholder, isDisabled, target, width, itemId, inputProps, ...restProps }) {
  // const MenuComponent = props => <Menu {...props} width={width} target={target} itemId={itemId} />

  return (
    <ReactSelect
      components={{
        DropdownIndicator: isDisabled ? null : DropdownIndicator,
        MultiValueRemove,
        // Menu: MenuComponent,
        Input,
      }}
      styles={styles}
      placeholder={placeholder}
      isDisabled={isDisabled}
      inputProps={inputProps}
      {...restProps}
    />
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
