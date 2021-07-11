import styled, { setLabel } from 'utils/styled'

export default props => ({
  datePickerInputWrapper(datePickerWidth) {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
      justify-content: space-between;
      width: ${datePickerWidth || 'auto'};
      &:focus {
        box-shadow: none;
        outline: 0;
      }
    `)
  },

  datePickerInput(isDisabled, datePickerWidth, withoutShadow, withoutPadding) {
    return setLabel(styled.rem`
      border: none;
      font-size: 14px;
      color: #000;
      cursor: ${isDisabled ? 'auto' : 'pointer'};
      width: ${datePickerWidth ? 'auto' : '120px'};
      box-shadow: none;
      padding: ${withoutPadding ? 0 : '3px 0px'};

      &:focus {
        box-shadow: none;
        outline: none;
      }

      &:disabled {
        opacity: 0.4;
      }
    `)
  },

  dateIcon(isDisabled) {
    return setLabel(styled.rem`
      cursor: ${isDisabled ? 'auto' : 'pointer'};
      opacity: ${isDisabled ? '0' : '1'};
    `)
  },
})
