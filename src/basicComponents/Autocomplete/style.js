import styled from 'utils/styled'

export default props => ({
  autocompleteWrapper() {
    return styled.rem`
      padding-bottom: 4px;
      border-bottom: 1px solid #ddd;
    `
  },

  autocompleteInput() {
    return styled.rem`
      width: 100%;
      height: 16px;
      font-size: 14px;
      padding: 0;
      border: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      resize: none;

      &:focus {
        box-shadow: none;
        outline: none;
      }
    `
  },

  autocomplete(isOpen) {
    return styled.rem`
      display: ${isOpen ? 'block' : 'none'};
      position: absolute;
      width: 100%;
      border: 1px solid #aaa;
      background-color: #fff;
      font-family: Helvetica, sans-serif;
      font-weight: 300;
      font-size: 16px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      z-index: 2;

      ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
      }

      li {
        padding: 8px;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    `
  },
})
