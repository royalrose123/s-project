// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { isEmpty } from 'lodash'

// Components
import OverPage from 'basicComponents/OverPage'

// Lib MISC
import getformikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  title: PropTypes.string,
  overPageProps: PropTypes.object,
  children: PropTypes.node,
  customFormikConfig: PropTypes.object,
  isResultMode: PropTypes.bool,
  setIsMultipleAssetsShown: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  isViewMode: false,
  isResultMode: false,
}

function AssetsFormik(props) {
  const { title, overPageProps, isResultMode, children, customFormikConfig, setIsMultipleAssetsShown } = props

  const { isMultipleUpload } = overPageProps

  const formikConfig = getformikConfig(props)

  const onConfirm = (close, submitForm, validateForm) => {
    validateForm().then(errors => {
      submitForm().then(() => {
        if (isMultipleUpload) {
          isEmpty(errors) && setIsMultipleAssetsShown(true)
        } else {
          isEmpty(errors) && close()
        }
      })
    })
  }

  return (
    <Formik {...formikConfig} {...customFormikConfig}>
      {({ values, submitForm, validateForm }) => {
        // 如果是 multiple upload form
        // 就要判斷有選檔案 comfirm 才 enable
        const { uploadingFiles } = values
        const hasFile = !isEmpty(uploadingFiles)

        return (
          <OverPage
            title={title}
            onConfirm={close => onConfirm(close, submitForm, validateForm)}
            hasFooter={!isResultMode}
            isConfirmDisabled={isMultipleUpload && !hasFile}
            {...overPageProps}
          >
            {children}
          </OverPage>
        )
      }}
    </Formik>
  )
}

AssetsFormik.propTypes = propTypes
AssetsFormik.defaultProps = defaultProps

export default AssetsFormik
