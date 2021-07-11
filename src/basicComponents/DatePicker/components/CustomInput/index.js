// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import dateIcon from 'assets/icons/img/date.png'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  datePickerWidth: PropTypes.string,
  value: PropTypes.string,
  placeholderValue: PropTypes.string,
  onClick: PropTypes.func,
  css: PropTypes.object,
  disabled: PropTypes.bool,
  withoutShadow: PropTypes.bool,
  withoutPadding: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {}

const CustomInput = React.forwardRef((props, ref) => {
  const style = getStyle(props)
  const { withoutPadding, withoutShadow, datePickerWidth, css, disabled, value, onClick, placeholderValue, ...restProps } = props

  return (
    <div className='example-custom-input' css={style.datePickerInputWrapper(datePickerWidth)}>
      <input
        ref={ref}
        readOnly
        onClick={onClick}
        value={value}
        disabled={disabled}
        css={[style.datePickerInput(disabled, datePickerWidth, withoutShadow, withoutPadding), css]}
        {...restProps}
        placeholder={placeholderValue}
      />
      <img onClick={onClick} css={style.dateIcon(disabled)} src={dateIcon} />
    </div>
  )
})

CustomInput.propTypes = propTypes
CustomInput.defaultProps = defaultProps

export default CustomInput
