import styled, { setLabel } from 'utils/styled'

export default props => ({
  datePicker() {
    return setLabel(styled.rem`
      border-radius: 0 !important;
      border: 0 !important;
      box-shadow: 0 0 1px rgba(67, 90, 111, 0.3), 0 8px 10px -4px rgba(67, 90, 111, 0.47);

      .react-datepicker__triangle:before {
        display: none;
      }

      .react-datepicker__header {
        border-bottom-color: #dbdbdb;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    `)
  },
})
