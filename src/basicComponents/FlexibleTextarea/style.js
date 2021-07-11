import styled from 'utils/styled'

export default props => ({
  flexibleTextareaWrapper() {
    return styled.rem`
      padding-bottom: 4px;
      border-bottom: 1px solid #ddd;
    `
  },

  flexibleTextarea(alignRight, hasMaxLength) {
    return styled.rem`
      width: 100%;
      height: 16px;
      font-size: 14px;
      margin-top: ${hasMaxLength ? '8px' : '0px'};
      padding: 0;
      border: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      resize: none;
      text-align: ${alignRight ? 'right' : 'left'};
      font-family: sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue';

      &:focus {
        box-shadow: none;
        outline: none;
      }

      &:disabled {
        opacity: 0.4;
      }
    `
  },
})
