// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'

// Components
import Form from 'basicComponents/Form'
import OverPage from 'basicComponents/OverPage'

// Lib MISC
import getformikConfig from './formikConfig'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  title: PropTypes.string,
  overPageProps: PropTypes.object,
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {
  isViewMode: false,
}

function MultipleModalFormik(props) {
  const style = getStyle(props)
  const { title, overPageProps, children } = props
  const history = useHistory()
  const formikConfig = getformikConfig(props, history)

  const onConfirm = (submitForm, validateForm, handleReset) => {
    validateForm().then(errors => {
      submitForm().then(() => {
        if (isEmpty(errors)) {
          handleReset()
        }
      })
    })
  }

  const header = props => {
    return (
      // 因為 Overpage 裡的 style 直接取 dom element 的位子改 style
      // 導致要客制 header 時 會受影響，所以這裡用 inline 確保 css 權重不被影響
      <div style={{ width: '100%', height: '76px', display: 'flex', alignItems: 'flex-end' }}>
        <p css={style.headerTitle()}>{title}</p>
      </div>
    )
  }

  const overPageConfig = {
    hasHeader: false,
    hasFooter: false,
    header,
    style: { width: 725, height: 328, padding: '0px 40px' },
    contentContainerProps: { style: { overflow: 'visible', padding: 0, height: '100%' } },
    childrenWrapperCss: style.wrapper(),
  }

  return (
    <Formik {...formikConfig}>
      {({ submitForm, validateForm, handleReset }) => (
        <Form>
          <OverPage title={title} onConfirm={() => onConfirm(submitForm, validateForm, handleReset)} {...overPageProps} {...overPageConfig}>
            {children}
          </OverPage>
        </Form>
      )}
    </Formik>
  )
}

MultipleModalFormik.propTypes = propTypes
MultipleModalFormik.defaultProps = defaultProps

export default MultipleModalFormik
