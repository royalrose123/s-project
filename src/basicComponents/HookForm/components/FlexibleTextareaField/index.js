// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { isEmpty } from 'lodash'

// Components
import FlexibleTextarea from 'basicComponents/FlexibleTextarea'
import ErrorMessage from '../ErrorMessage'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  maxLength: PropTypes.number,
  textareaProps: PropTypes.object,
  disabled: PropTypes.bool,
  isMultiple: PropTypes.bool,
  value: PropTypes.string,
  register: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  onChange: () => {},
  isMultiple: false,
}

function FlexibleTextareaField(props) {
  const style = getStyle(props)
  const { name, maxLength, disabled, isMultiple, value, register, ...restProps } = props

  const hasMaxLength = Boolean(maxLength)

  const { setValue, getValues } = useFormContext()
  const fieldValue = getValues(name)

  useEffect(() => {
    register(name)
  }, [name, register])

  const onChange = event => {
    const value = event.target.value
    const currentLength = value.length

    if (hasMaxLength && currentLength > maxLength) return

    setValue(name, value)
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
      setValue(name, pastedData.slice(0, maxLength))
    } else {
      setValue(name, pastedData)
    }
  }

  return (
    <div css={style.textareaWrapper()}>
      {hasMaxLength && !disabled && (
        <div css={style.maxLength(isMultiple)}>{`${isEmpty(fieldValue) ? value?.length : fieldValue?.length}/${maxLength}`}</div>
      )}
      <FlexibleTextarea
        {...restProps}
        disabled={disabled}
        onChange={onChange}
        onPaste={onPaste}
        hasMaxLength={hasMaxLength}
        name={name}
        value={value}
      />
      <ErrorMessage name={name} />
    </div>
  )
}

FlexibleTextareaField.propTypes = propTypes
FlexibleTextareaField.defaultProps = defaultProps

export default FlexibleTextareaField
