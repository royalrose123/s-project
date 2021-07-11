// Libs
import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

// Components

// Lib MISC

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.node,
  assetViewType: PropTypes.string,
  isDisabledResult: PropTypes.bool,
  canViewAssetResultPage: PropTypes.bool.isRequired,
}

function AssetsTab(props) {
  const { match, history, children, assetViewType, isDisabledResult, canViewAssetResultPage } = props
  const { params } = match
  const { assetId, assetFormType } = params
  const style = getStyle(props)

  const { handleReset } = useFormikContext()

  const onInfoClick = () => {
    history.push(`/home/gallery/${assetViewType}/${assetId}/info`)
  }

  const onResultsClick = () => {
    history.push(`/home/gallery/${assetViewType}/${assetId}/results`)
    handleReset()
  }

  return (
    <>
      <div css={style.assetsTabWrapper()}>
        <button css={style.assetsTab(assetFormType === 'info')} onClick={onInfoClick}>
          Information
        </button>
        {canViewAssetResultPage && (
          <button css={style.assetsTab(assetFormType === 'results', isDisabledResult)} onClick={onResultsClick} disabled={isDisabledResult}>
            {isDisabledResult ? 'Results (Not Live)' : 'Results'}
          </button>
        )}
      </div>
      {children}
    </>
  )
}

AssetsTab.propTypes = propTypes

export default withRouter(AssetsTab)
