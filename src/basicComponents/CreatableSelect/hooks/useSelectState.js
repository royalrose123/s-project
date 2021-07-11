import { useState, useEffect } from 'react'

function useSelectState(onChangeProps, onInputChangeProps, onBlurProps, value, maxLength) {
  const [inputValue, setInputValue] = useState('')
  const [currentValue, setCurrentValue] = useState('')

  useEffect(() => {
    setInputValue(value)
    setCurrentValue(value)
  }, [value])

  return {
    inputValue,

    onInputChange(value, { action }) {
      const hasMaxLength = Boolean(maxLength)

      const currentLength = value.length

      if (hasMaxLength && currentLength > maxLength) return

      if (action === 'input-change') {
        setInputValue(value)
        onInputChangeProps(value)
      } else if (action === 'set-value') {
        setCurrentValue(inputValue)
        onInputChangeProps(inputValue)
      }
    },

    onChange(option) {
      onChangeProps(option)
    },

    onBlur(event) {
      const hasValue = Boolean(currentValue)

      if (hasValue) {
        setInputValue(currentValue)
      } else {
        setInputValue('')
      }

      onBlurProps(currentValue)
    },
  }
}

export default useSelectState
