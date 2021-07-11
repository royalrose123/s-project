// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { isEmpty } from 'lodash'

// Components
import Select from 'basicComponents/Select'
import ErrorMessage from '../ErrorMessage'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  selectCss: PropTypes.object,
  selectProps: PropTypes.object,
  isDisabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
}

function SelectField(props) {
  const { name, selectCss, options, onChange: onChangeProps, isDisabled, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  const value = isEmpty(options) ? '' : options.find(option => option.value === field.value)
  const hasValue = Boolean(value)

  const onChange = newValue => {
    setFieldValue(field.name, newValue.value)
    onChangeProps(newValue, options)
  }

  return (
    <>
      <Select
        css={selectCss}
        value={value ?? ''}
        onChange={onChange}
        options={options}
        controlShouldRenderValue={hasValue}
        placeholder='Please select'
        isDisabled={isDisabled}
        {...restProps}
      />
      <ErrorMessage name={name} />
    </>
  )
}

SelectField.propTypes = propTypes
SelectField.defaultProps = defaultProps

export default SelectField
