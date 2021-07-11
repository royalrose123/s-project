import styled, { setLabel } from 'utils/styled'

export default props => ({
  rangePicker() {
    const inputWrapper = '& > span'
    const separator = '& > span > span'
    const input = '& > span > input'
    const icon = '& > span > i'

    const popupWrapper = '& > div > div > div > div > div > div:nth-of-type(1)'

    const insideSeparator = '& > div > div > div > div > div > div:nth-of-type(1) > span'
    const leftCalendar = '& > div > div > div > div > div > div:nth-of-type(1) > div:nth-of-type(1)'
    const rightCalendar = '& > div > div > div > div > div > div:nth-of-type(1) > div:nth-of-type(2)'
    const calendarHeader = '& > div:nth-of-type(2) > div:nth-of-type(1)'
    const date = '& > div:nth-of-type(1) > div '
    const headerText = '& > div > span > a'
    const headerButton = 'div > a'

    const footerWrapper = '& > div > div > div > div > div > div:nth-of-type(2) > div > div'
    // const antCalenderHeader = '& > div > div > div > div > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1)'
    // const antCalenderMySelect =
    //   '& > div > div > div > div > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > span > a'
    // const yearBtn =
    //   '& > div > div > div > div > div > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > a::after, & > div > div > div > div > div > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div > a::before'

    return setLabel(styled.rem`
      width: 260px;
      cursor: pointer !important;

      ${inputWrapper} {
        border-radius: 48px;
        padding-left: 38px;
        color: #01579b;
      }

      ${input} {
        cursor: pointer;
        box-shadow: none;
      }

      ${separator} {
        color: #01579b;
      }

      ${icon} {
        left: 18px;
      }

      ${popupWrapper} {
      }

      ${insideSeparator} {
        left: 102px;
        padding: 0;
        color: #01579b;
      }

      ${leftCalendar} {
        ${calendarHeader} {
          background-color: #4ea7e8;

          ${headerButton}::before {
            color: #ffffff;
            border: 0px solid #ffffff;
            border-width: 1.5px 0 0 1.5px;
          }

          ${headerButton}::after {
            color: #ffffff;
            border: 0px solid #ffffff;
            border-width: 1.5px 0 0 1.5px;
          }

          ${headerText} {
            color: #fff;
            font-weight: bold;
          }
        }

        ${date} {
          & > input {
            color: #01579b;
          }
        }
      }

      ${rightCalendar} {
        ${calendarHeader} {
          background-color: #4ea7e8;

          ${headerButton}::before {
            color: #ffffff;
            border: 0px solid #ffffff;
            border-width: 1.5px 0 0 1.5px;
          }

          ${headerButton}::after {
            color: #ffffff;
            border: 0px solid #ffffff;
            border-width: 1.5px 0 0 1.5px;
          }

          ${headerText} {
            color: #fff;
            font-weight: bold;
          }
        }

        ${date} {
          margin-left: -172px;
          color: #01579b;
          & > input {
            color: #01579b;
          }
        }
      }

      ${footerWrapper} {
        width: 100%;
      }
    `)
  },
  buttonWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      justify-content: flex-end;
    `)
  },

  cancelButton() {
    return setLabel(styled.rem`
      width: 90px;
      margin: 4px;
      border-radius: 4px;
      color: #01579b;
      font-weight: 600;
      background-color: #e5ebed;
    `)
  },

  applyButton(isDisabled) {
    return setLabel(styled.rem`
      width: 90px;
      margin: 4px;
      border-radius: 4px;
      color: #ffffff;
      font-weight: 600;
      background-color: ${isDisabled ? '#ABABAC' : '#01579B'};
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    `)
  },
})
