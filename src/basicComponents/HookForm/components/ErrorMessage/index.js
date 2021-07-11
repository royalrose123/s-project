// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage as ErrorMessageComponent } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  onChange: () => {},
}

function ErrorMessage(props) {
  const style = getStyle(props)
  const { name } = props

  const { errors } = useFormContext

  return (
    <ErrorMessageComponent
      name={name}
      errors={errors}
      render={({ message }) => (
        <div css={style.errorMessageWrapper()}>
          <div css={style.errorBorder()} />
          <div css={style.errorMessage()}>{message}</div>
        </div>
      )}
    />
  )
}

ErrorMessage.propTypes = propTypes
ErrorMessage.defaultProps = defaultProps

export default ErrorMessage
