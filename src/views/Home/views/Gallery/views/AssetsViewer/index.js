// Libs
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import loadable from '@loadable/component'

// Components
import AssetsTab from '../../sharedComponents/AssetsTab'
import AssetsFormik from '../../sharedComponents/AssetsFormik'
import AssetsFooter from '../../sharedComponents/AssetsFooter'

// Lib MISC
import useGlobalState from 'globalState'
import getFormikConfig from './formikConfig'
import PropTypes from 'prop-types'
import useFetchAssetInfoEffect from '../../sharedHooks/useFetchAssetInfoEffect'
import { getLiveStatus } from '../../sharedMethods/getLiveStatus'
import { getCoolDownStatus } from '../../sharedMethods/getCoolDownStatus'
import { ROLES } from '../../../../constants/roles'
import useFetchOptionEffect from '../../sharedHooks/useFetchOptionEffect'
import useAssetFormOptions from '../../sharedHooks/useAssetFormOptions'

// Style
import getStyle from './style'

const AssetsForm = loadable(() => import('../../sharedComponents/AssetsForm'))
const AssetsResult = loadable(() => import('../../sharedComponents/AssetsResult'))

// PropTypes
export const propTypes = {
  match: PropTypes.object,
  isViewMode: PropTypes.bool,
  overPageProps: PropTypes.object,
  assetViewType: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  isViewMode: true,
}

function AssetsViewer(props) {
  const style = getStyle(props)
  const { match, assetViewType, overPageProps, ...restProps } = props
  const { params } = match
  const { assetId, assetFormType } = params

  const { filterOptions } = useFetchOptionEffect()

  const { assetInfo } = useFetchAssetInfoEffect({ assetId })
  const { startDate, endDate, campaignStartDate, campaignEndDate, paramAssetId, createdTimestamp } = assetInfo

  const { ctaOptions } = useAssetFormOptions({
    filterOptions,
    assetPlatform: assetInfo.assetPlatform,
    assetFormat: assetInfo.assetFormat,
    assetFormatType: assetInfo.assetFormatType,
  })
  const formikConfig = getFormikConfig(props, assetInfo, ctaOptions)

  const [state] = useGlobalState()
  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess, roleName } = userRoleInfo
  const { canEditAsset, canEditLiveAsset, canViewAssetResultPage } = CMPAccess
  const isAdmin = roleName === ROLES.ADMINISTRATOR

  const isAssetLive = getLiveStatus(startDate, endDate)
  const isWithin24Hours = getCoolDownStatus(createdTimestamp)
  const isCampaignLive = getLiveStatus(campaignStartDate, campaignEndDate)

  const showViewFooter = (isAssetLive && canEditLiveAsset) || (!isAssetLive && canEditAsset)

  const isWithout24HoursByNoEdit = !isWithin24Hours && isAssetLive && !isAdmin

  return (
    <Switch>
      <AssetsFormik
        title='Asset Management'
        customFormikConfig={formikConfig}
        isResultMode={assetFormType === 'results'}
        overPageProps={{ ...overPageProps, isCustomFooter: showViewFooter }}
        {...restProps}
      >
        <>
          <div css={style.assetIdWrapper()}>
            <span css={style.liveIcon(isAssetLive)} />
            <h4 css={style.assetId()}>ID</h4>
            <span css={style.assetIdTitle()}>{paramAssetId}</span>
          </div>
          <AssetsTab assetViewType={assetViewType} canViewAssetResultPage={canViewAssetResultPage}>
            <Route exact sensitive path={`/home/gallery/view/${assetId}/info`}>
              <AssetsForm isViewMode filterOptions={filterOptions} />
            </Route>
            {canViewAssetResultPage && (
              <Route exact sensitive path={`/home/gallery/view/${assetId}/results`}>
                <AssetsResult isCampaignLive={isCampaignLive} />
              </Route>
            )}
          </AssetsTab>
          {showViewFooter && <AssetsFooter isWithout24HoursByNoEdit={isWithout24HoursByNoEdit} {...overPageProps} />}
        </>
      </AssetsFormik>
    </Switch>
  )
}

AssetsViewer.propTypes = propTypes
AssetsViewer.defaultProps = defaultProps

export default hot(AssetsViewer)
