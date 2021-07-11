// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Components
import Form from 'basicComponents/Form'

// Lib MISC
import getformikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
  sharedFormikConfig: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function MapOverviewFormik(props) {
  const { children, sharedFormikConfig, ...restProps } = props
  const formikConfig = getformikConfig(props)

  return (
    <Formik {...sharedFormikConfig} {...formikConfig}>
      {({ submitForm, validateForm, handleReset }) => <Form {...restProps}>{children}</Form>}
    </Formik>
  )
}

MapOverviewFormik.propTypes = propTypes
MapOverviewFormik.defaultProps = defaultProps

export default MapOverviewFormik
