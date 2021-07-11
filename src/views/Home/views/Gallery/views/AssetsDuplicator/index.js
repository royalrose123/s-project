// Libs
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import loadable from '@loadable/component'

// Style
import getStyle from './style'

// Components
import AssetsTab from '../../sharedComponents/AssetsTab'
import AssetsFormik from '../../sharedComponents/AssetsFormik'

// Lib MISC
import PropTypes from 'prop-types'
import useGlobalState from 'globalState'
import useFetchAssetInfoEffect from '../../sharedHooks/useFetchAssetInfoEffect'
import getFormikConfig from './formikConfig'
import { getLiveStatus } from '../../sharedMethods/getLiveStatus'
import useFetchOptionEffect from '../../sharedHooks/useFetchOptionEffect'
import useAssetFormOptions from '../../sharedHooks/useAssetFormOptions'

const AssetsForm = loadable(() => import('../../sharedComponents/AssetsForm'))
const AssetsResult = loadable(() => import('../../sharedComponents/AssetsResult'))

// PropTypes
export const propTypes = {
  match: PropTypes.object,
  overPageProps: PropTypes.object,
  assetViewType: PropTypes.string,
}

function AssetsDuplicator(props) {
  const style = getStyle(props)
  const { match, assetViewType } = props
  const { params } = match
  const [state, dispatch] = useGlobalState()

  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess } = userRoleInfo
  const { canViewAssetResultPage } = CMPAccess

  const { assetId, assetFormType } = params

  const { filterOptions } = useFetchOptionEffect()

  const { assetInfo } = useFetchAssetInfoEffect({ assetId })
  const { startDate, endDate, campaignStartDate, campaignEndDate, paramAssetId } = assetInfo

  const { ctaOptions } = useAssetFormOptions({
    filterOptions,
    assetPlatform: assetInfo.assetPlatform,
    assetFormat: assetInfo.assetFormat,
    assetFormatType: assetInfo.assetFormatType,
  })

  const [isUploading, setIsUploading] = useState(false)

  const formikConfig = getFormikConfig(props, assetInfo, dispatch, ctaOptions, setIsUploading)
  const isAssetLive = getLiveStatus(startDate, endDate)
  const isCampaignLive = getLiveStatus(campaignStartDate, campaignEndDate)

  return (
    <Switch>
      <AssetsFormik title='Asset Management' customFormikConfig={formikConfig} isResultMode={assetFormType === 'results'} {...props}>
        <>
          <div css={style.assetIdWrapper()}>
            <span css={style.liveIcon(isAssetLive)} />
            <h4 css={style.assetId()}>ID</h4>
            <span css={style.assetIdTitle()}>{paramAssetId}</span>
          </div>
          <AssetsTab assetViewType={assetViewType} canViewAssetResultPage={canViewAssetResultPage}>
            <Route exact sensitive path={`/home/gallery/duplicate/${assetId}/info`}>
              <AssetsForm filterOptions={filterOptions} isUploading={isUploading} />
            </Route>
            {canViewAssetResultPage && (
              <Route exact sensitive path={`/home/gallery/duplicate/${assetId}/results`}>
                <AssetsResult isCampaignLive={isCampaignLive} />
              </Route>
            )}
          </AssetsTab>
        </>
      </AssetsFormik>
    </Switch>
  )
}

AssetsDuplicator.propTypes = propTypes

export default hot(AssetsDuplicator)
