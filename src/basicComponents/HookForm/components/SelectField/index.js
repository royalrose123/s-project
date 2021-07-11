// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, find } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'

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
  defaultValue: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
  defaultValue: '',
}

function SelectField(props) {
  const { name, selectCss, options, onChange: onChangeProps, isDisabled, defaultValue, ...restProps } = props

  const { setValue, register, control } = useFormContext()

  const currentSelected = useWatch({
    control,
    name,
  })

  const value = isEmpty(options) ? '' : options.find(option => option.value === currentSelected)
  const hasValue = Boolean(value)

  useEffect(() => {
    register(name)
  }, [name, register])

  const onChange = newValue => {
    setValue(name, newValue.value)

    onChangeProps(newValue, options)
  }

  const onPaste = event => {
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')

    const pastedDataWithSelect = { value: pastedData }

    const isPastedDataExisted = find(options, pastedDataWithSelect)

    if (!isPastedDataExisted) return

    setValue(name, pastedData)
    onChangeProps(pastedDataWithSelect, options)
  }

  const onCopy = event => {
    event.clipboardData.setData('text/plain', value.value)
    event.preventDefault()
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
        inputProps={{ onPaste, onCopy }}
        menuPosition='absolute' // 因為 hookForm 的 select 包在 table 裡面，但 table 要 overflow: scroll
        menuPlacement='auto' // 所以這裡透過 menuPortalTarget 把 select 的 menu 拉出來不被 table cover
        menuPortalTarget={document.body}
        {...restProps}
      />
      <ErrorMessage name={name} />
    </>
  )
}

SelectField.propTypes = propTypes
SelectField.defaultProps = defaultProps

export default SelectField
