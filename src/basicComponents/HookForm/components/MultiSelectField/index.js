// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isArray } from 'lodash'
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
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
}

function MultiSelectField(props) {
  const { name, selectCss, options, onChange: onChangeProps, isDisabled, ...restProps } = props

  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { setValue, register, control } = useFormContext()

  const currentSelected = useWatch({
    control,
    name,
  })

  const isValueEmpty = isEmpty(options) || !currentSelected

  const value = isValueEmpty ? '' : options.filter(option => currentSelected.includes(option.value))
  const hasValue = Boolean(value)

  useEffect(() => {
    register(name)
  }, [name, register])

  const onChange = option => {
    // isMulti 模式時，點擊 multi value 上的刪除按鈕到沒有值時，onChange 事件的 option 會回傳 null
    const newOption = option === null ? [] : option

    setValue(
      name,
      newOption.map(o => o.value),
    )

    if (typeof onChange === 'function') {
      onChangeProps(option)
    }
  }

  const onPaste = event => {
    const clipboardData = event.clipboardData || window.clipboardData
    const clipboardText = clipboardData.getData('text/plain')
    const pastedData = typeof clipboardText === 'string' ? JSON.parse(clipboardText) : []

    const existedData = pastedData.filter(pastedItem => options.find(optionItem => optionItem.value === pastedItem.value))

    if (isEmpty(existedData)) return

    setValue(
      name,
      existedData.map(option => option.value),
    )
    onChangeProps(existedData, options)
  }

  const onCopy = event => {
    const copiedContent = isArray(value) ? JSON.stringify(value) : []

    event.clipboardData.setData('text/plain', copiedContent)
    event.preventDefault()
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

MultiSelectField.propTypes = propTypes
MultiSelectField.defaultProps = defaultProps

export default MultiSelectField
