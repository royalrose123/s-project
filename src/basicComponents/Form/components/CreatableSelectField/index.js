// Libs
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'

// Components
import CreatableSelect from 'basicComponents/CreatableSelect'
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
  isMultiple: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
  onCreateOption: () => {},
  isMultiple: false,
}

function CreatableSelectField(props) {
  const style = getStyle(props)

  const { name, selectCss, options, onChange, onCreateOption, isDisabled, maxLength, isMultiple, ...restProps } = props

  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()
  const [inputValue, setInputValue] = useState('')
  const { value: fieldValue } = field
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
    setInputValue(fieldValue)
  }

  const onInputChange = value => {
    const hasMaxLength = Boolean(maxLength)

    const currentLength = value.length

    if (hasMaxLength && currentLength > maxLength) return

    setInputValue(value)
  }

  useEffect(() => {
    setInputValue(fieldValue)
  }, [fieldValue])

  return (
    <div css={style.wrapper()}>
      {hasMaxLength && !isDisabled && <div css={style.maxLength(isMultiple)}>{`${inputValue?.length ?? 0}/${maxLength}`}</div>}
      <CreatableSelect
        css={selectCss}
        value={{ label: fieldValue, value: fieldValue }}
        onCreateOption={onCreateOptionAction}
        onInputChange={onInputChange}
        onBlur={onBlur}
        onChange={onChangeAction}
        placeholder='Please select'
        isDisabled={isDisabled}
        options={options}
        maxLength={maxLength}
        {...restProps}
      />
      <ErrorMessage name={name} />
    </div>
  )
}

CreatableSelectField.propTypes = propTypes
CreatableSelectField.defaultProps = defaultProps

export default CreatableSelectField
