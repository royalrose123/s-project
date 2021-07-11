// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { isEmpty } from 'lodash'

// Components
import FlexibleTextarea from 'basicComponents/FlexibleTextarea'
import ErrorMessage from '../ErrorMessage'
import Form from 'basicComponents/Form'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  maxLength: PropTypes.number,
  textareaProps: PropTypes.object,
  disabled: PropTypes.bool,
  isMultiple: PropTypes.bool,
  hasAlignCheckbox: PropTypes.bool,
  alignName: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  onChange: () => {},
  isMultiple: false,
  hasAlignCheckbox: false,
}

function FlexibleTextareaField(props) {
  const style = getStyle(props)
  const { name, maxLength, disabled, isMultiple, hasAlignCheckbox, alignName, ...restProps } = props
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()

  const hasMaxLength = Boolean(maxLength)

  const { touched, error } = meta

  const hasError = touched && !isEmpty(error)

  const onChange = event => {
    const value = event.target.value
    const currentLength = value.length

    if (hasMaxLength && currentLength > maxLength) return

    setFieldValue(field.name, value)
  }

  const onPaste = event => {
    event.stopPropagation()
    event.preventDefault()

    // 從 clipboard API 取得貼上的文字
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')
    const currentLength = pastedData.length

    // 判斷貼上的字數是否超過最大字數限制
    // 如果超過，則超過限制的文字將被刪除
    // 如果沒有超過，則直皆貼上文字
    if (hasMaxLength && currentLength > maxLength) {
      setFieldValue(field.name, pastedData.slice(0, maxLength))
    } else {
      setFieldValue(field.name, pastedData)
    }
  }

  return (
    <div css={style.textareaWrapper()}>
      {hasMaxLength && !disabled && <div css={style.maxLength(isMultiple)}>{`${field.value?.length ?? 0}/${maxLength}`}</div>}
      <FlexibleTextarea {...restProps} disabled={disabled} value={field.value} onChange={onChange} onPaste={onPaste} hasMaxLength={hasMaxLength} />
      {hasAlignCheckbox && <Form.CheckboxField checkboxCss={style.checkbox(hasError)} label='Right-aligned' name={alignName} disabled={disabled} />}
      <ErrorMessage name={name} />
    </div>
  )
}

FlexibleTextareaField.propTypes = propTypes
FlexibleTextareaField.defaultProps = defaultProps

export default FlexibleTextareaField
