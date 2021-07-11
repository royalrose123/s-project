// Libs
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { isEmpty } from 'lodash'

// Components
import AsyncCreatableSelect from 'basicComponents/AsyncCreatableSelect'
import ErrorMessage from '../ErrorMessage'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  maxLength: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onCreateOption: PropTypes.func,
  selectCss: PropTypes.object,
  selectProps: PropTypes.object,
  isDisabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
  onCreateOption: () => {},
}

function AsyncCreatableSelectField(props) {
  const style = getStyle(props)

  const { name, selectCss, options, onChange, onCreateOption, isDisabled, maxLength, ...restProps } = props

  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()
  const [inputValue, setInputValue] = useState('')
  const { value: fieldValue } = field
  const hasValue = Boolean(fieldValue)
  const hasMaxLength = Boolean(maxLength)

  const onChangeAction = option => {
    setFieldValue(field.name, option.value)
    onChange(option, options)
  }

  const onCreateOptionAction = newValue => {
    setFieldValue(field.name, newValue)
    onCreateOption(newValue, options)
  }

  const onBlur = () => {
    if (isEmpty(inputValue) && !isEmpty(fieldValue)) {
      setInputValue(fieldValue)
    }
  }

  useEffect(() => {
    setInputValue(fieldValue)
  }, [fieldValue])

  return (
    <div css={style.wrapper()}>
      {hasMaxLength && !isDisabled && <div css={style.maxLength()}>{`${inputValue?.length ?? 0}/${maxLength}`}</div>}
      <AsyncCreatableSelect
        css={selectCss}
        value={{ label: fieldValue, value: fieldValue }}
        onCreateOption={onCreateOptionAction}
        onInputChange={value => setInputValue(value)}
        onBlur={onBlur}
        onChange={onChangeAction}
        controlShouldRenderValue={hasValue}
        placeholder='Please select'
        isDisabled={isDisabled}
        {...restProps}
      />
      <ErrorMessage name={name} />
    </div>
  )
}

AsyncCreatableSelectField.propTypes = propTypes
AsyncCreatableSelectField.defaultProps = defaultProps

export default AsyncCreatableSelectField
