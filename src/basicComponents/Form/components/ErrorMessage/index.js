// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage as ErrorMessageComponent } from 'formik'

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

  return (
    <ErrorMessageComponent name={name}>
      {message => (
        <div css={style.errorMessageWrapper()}>
          <div css={style.errorBorder()} />
          <div css={style.errorMessage()}>{message}</div>
        </div>
      )}
    </ErrorMessageComponent>
  )
}

ErrorMessage.propTypes = propTypes
ErrorMessage.defaultProps = defaultProps

export default ErrorMessage
