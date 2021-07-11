import { useState, useEffect } from 'react'

function useSelectState(onChangeProps, onInputChangeProps, onBlurProps, value) {
  const [inputValue, setInputValue] = useState('')
  const [currentValue, setCurrentValue] = useState('')

  useEffect(() => {
    setInputValue(value)
    setCurrentValue(value)
  }, [value])

  return {
    inputValue,

    onInputChange(value, { action }) {
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
