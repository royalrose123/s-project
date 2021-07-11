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
import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function AssetsMultipleCreator(props) {
  const style = getStyle(props)

  const [isMultipleAssetsShown, setIsMultipleAssetsShown] = useState(false)

  const [, dispatch] = useGlobalState()
  const formikConfig = getformikConfig(props, dispatch)

  const { filterOptions } = useFetchOptionEffect()

  return (
    <AssetsFormik title='Multiple Upload Asset' customFormikConfig={formikConfig} setIsMultipleAssetsShown={setIsMultipleAssetsShown} {...props}>
      <p css={style.title()}>Multiple Asset Upload</p>
      <AssetsForm isMultipleUpload isMultipleAssetsShown={isMultipleAssetsShown} filterOptions={filterOptions} {...props} />
    </AssetsFormik>
  )
}

AssetsMultipleCreator.propTypes = propTypes
AssetsMultipleCreator.defaultProps = defaultProps

export default hot(AssetsMultipleCreator)
