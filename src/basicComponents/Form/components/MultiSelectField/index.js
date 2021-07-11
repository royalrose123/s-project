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

function MultiSelectField(props) {
  const { name, selectCss, options, onChange: onChangeProps, isDisabled, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()
  const isValueEmpty = isEmpty(options) || !field.value

  const value = isValueEmpty ? '' : options.filter(option => field.value.includes(option.value))
  const hasValue = Boolean(value)

  const onChange = option => {
    // isMulti 模式時，點擊 multi value 上的刪除按鈕到沒有值時，onChange 事件的 option 會回傳 null
    const newOption = option === null ? [] : option

    setFieldValue(
      field.name,
      newOption.map(o => o.value),
    )

    if (typeof onChange === 'function') {
      onChangeProps(option)
    }
  }

  return (
    <>
      <Select
        isMulti
        css={selectCss}
        value={value ?? []}
        onChange={onChange}
        options={options}
        controlShouldRenderValue={hasValue}
        closeMenuOnSelect={false}
        placeholder='Please select'
        isDisabled={isDisabled}
        {...restProps}
      />
      <ErrorMessage name={name} />
    </>
  )
}

MultiSelectField.propTypes = propTypes
MultiSelectField.defaultProps = defaultProps

export default MultiSelectField
