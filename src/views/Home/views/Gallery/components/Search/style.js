import styled, { setLabel } from 'utils/styled'

export default props => ({
  searchInputWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      width: 260px;
      height: 40px;
    `)
  },

  searchInput() {
    return setLabel(styled.rem`
      z-index: 1;
      :focus {
        border: 1px rgba(67, 90, 111, 0.3) solid;
        border-right: none;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        box-shadow: none;
        outline: none;
      }
    `)
  },

  filterRow() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 4px;
    `)
  },

  filterLabel() {
    return setLabel(styled.rem`
      width: 120px;
      font-size: 16px;
      line-height: 16px;
      margin: 0;
      margin-left: 16px;
    `)
  },

  filterSearchRow() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    `)
  },

  filterSelect() {
    return setLabel(styled.rem`
      width: 240px;
      height: 29px;
      font-size: 15px;
    `)
  },

  filterPopover() {
    return setLabel(styled.rem`
      position: absolute;
    `)
  },

  datePickerInput() {
    return setLabel(styled.rem`
      width: 110px;
      height: 29px;
      font-size: 15px;
      padding-left: 2px;
    `)
  },

  filterButton() {
    return setLabel(styled.rem`
      z-index: 10;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 40px;
      height: 40px;
      border: 1px rgba(67, 90, 111, 0.3) solid;
      border-left: none;
      background-color: white;
      cursor: pointer;

      :focus {
        outline: none;
        box-shadow: none;
      }
    `)
  },
})
