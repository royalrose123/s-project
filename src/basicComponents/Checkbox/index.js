// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import Icon from './components/Icon'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  checkboxCss: PropTypes.object,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
}

// DefaultProps
export const defaultProps = {}

function CheckBoxComponent(props) {
  const style = getStyle(props)

  const { checkboxCss, label, checked, disabled, onChange, tabIndex } = props

  return (
    <label css={[style.checkbox(checked), checkboxCss]}>
      <input css={style.checkboxInput()} type='checkbox' checked={checked} onChange={onChange} disabled={disabled} />

      <Icon checked={checked} disabled={disabled} tabIndex={tabIndex} onChange={onChange} />
      <span css={style.checkboxName(disabled)}>{label}</span>
    </label>
  )
}

CheckBoxComponent.propTypes = propTypes
CheckBoxComponent.defaultProps = defaultProps

export default CheckBoxComponent
