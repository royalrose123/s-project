import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

// Components
import DatePickerField from './components/DatePickerField'
import SelectField from './components/SelectField'
import MultiSelectField from './components/MultiSelectField'
import AsyncCreatableSelectField from './components/AsyncCreatableSelectField'
import FlexibleTextareaField from './components/FlexibleTextareaField'
import CheckboxField from './components/CheckboxField'
import AutocompleteField from './components/AutocompleteField'
import CreatableSelectField from './components/CreatableSelectField'

// Style
import getStyle from './style'

export const propTypes = {
  className: PropTypes.string,
  forwardRef: PropTypes.any,
  formik: PropTypes.object,
  formCss: PropTypes.object,
}

function Form(props) {
  const style = getStyle(props)
  const { className, formCss, forwardRef, formik, ...restProps } = props

  return <form css={[style.form(), formCss]} ref={forwardRef} onReset={formik.handleReset} onSubmit={formik.handleSubmit} {...restProps} />
}

Form.propTypes = propTypes

const ConnectedForm = connect(Form)
const ConnectedFormWithRef = React.forwardRef((props, ref) => <ConnectedForm {...props} forwardRef={ref} />)

ConnectedFormWithRef.DatePickerField = DatePickerField
ConnectedFormWithRef.MultiSelectField = MultiSelectField
ConnectedFormWithRef.SelectField = SelectField
ConnectedFormWithRef.AsyncCreatableSelectField = AsyncCreatableSelectField
ConnectedFormWithRef.FlexibleTextareaField = FlexibleTextareaField
ConnectedFormWithRef.CheckboxField = CheckboxField
ConnectedFormWithRef.AutocompleteField = AutocompleteField
ConnectedFormWithRef.CreatableSelectField = CreatableSelectField

export default ConnectedFormWithRef
