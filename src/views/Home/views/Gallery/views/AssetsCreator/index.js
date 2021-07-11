// Libs
import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'

// Components
import AssetsForm from '../../sharedComponents/AssetsForm'
import AssetsFormik from '../../sharedComponents/AssetsFormik'

// Lib MISC
import useGlobalState from 'globalState'
import getformikConfig from './formikConfig'
import useFetchOptionEffect from '../../sharedHooks/useFetchOptionEffect'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function AssetsCreator(props) {
  const [, dispatch] = useGlobalState()
  const [isUploading, setIsUploading] = useState(false)

  const formikConfig = getformikConfig(props, dispatch, setIsUploading)

  const { filterOptions } = useFetchOptionEffect()

  return (
    <AssetsFormik title='Upload Asset' customFormikConfig={formikConfig} {...props}>
      <AssetsForm filterOptions={filterOptions} isUploading={isUploading} />
    </AssetsFormik>
  )
}

AssetsCreator.propTypes = propTypes
AssetsCreator.defaultProps = defaultProps

export default hot(AssetsCreator)
