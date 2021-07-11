import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import auth from 'src/authConfig'
import { withAuth } from '@okta/okta-react'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'

// Components
import { Icon, Popover, Position, Pane, Paragraph } from 'evergreen-ui'
import Icons from 'assets/icons'
import DialogWithClassName from 'basicComponents/DialogWithClassName'

// Libs
import useGlobalState from 'globalState'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  auth: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function SystemIcon(props) {
  const style = getStyle(props)
  const { auth: authHelpers } = props

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const urlRef = useRef('')

  const history = useHistory()

  const [state] = useGlobalState()
  const { user, theme, assetUpload } = state
  const { userRoleInfo } = user
  const { CMPAccess, DMPAccess } = userRoleInfo

  const { canViewMap, canViewDashboard, canViewQuicksight } = CMPAccess
  const { canViewDMP } = DMPAccess

  const { mode } = theme

  const isDarkMode = mode === 'dark'
  const isDashboardIcon = true
  const isMapIcon = true
  const hasFileUploading = !isEmpty(assetUpload.assetUploadList)

  const currentEnv = process.env.NODE_ENV

  const onDMPClick = close => {
    const dmpUrl = process.env[`REDIRECT_${currentEnv.toUpperCase()}_DMP_URL`]
    if (hasFileUploading) {
      urlRef.current = dmpUrl
      setIsDialogOpen(true)
    } else {
      window.location.href = dmpUrl
    }
    close()
  }

  const onCMPClick = close => {
    const cmpUrl = process.env[`REDIRECT_${currentEnv.toUpperCase()}_CMP_URL`]
    if (hasFileUploading) {
      urlRef.current = cmpUrl
      setIsDialogOpen(true)
    } else {
      window.location.href = cmpUrl
    }
    close()
  }

  const onMapClick = close => {
    history.push('/home/map')
    close()
  }

  const onDashboardClick = close => {
    history.push('/home/dashboard')
    close()
  }

  const onLibraryClick = close => {
    history.push('/home/library')
    close()
  }

  const handleConfirm = () => {
    window.location.href = urlRef.current
    urlRef.current = ''
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    urlRef.current = ''
    setIsDialogOpen(false)
  }

  return (
    <div css={style.system()}>
      <Popover
        minWidth={227}
        minHeight={213}
        statelessProps={{ style: { zIndex: '111' } }}
        content={({ close }) => (
          <div css={style.systemPopover(isDarkMode)}>
            <div css={style.userInfo()}>
              <p css={style.userName(isDarkMode)}>{`${userRoleInfo?.userFirstName} ${userRoleInfo?.userLastName}`}</p>
              <p css={style.userMail()}>{userRoleInfo?.userEmail}</p>
              <div css={style.userRoleWrapper()}>
                <Icons.Role css={style.userRoleIcon()} />
                <p css={style.userRole()}>{userRoleInfo?.roleName}</p>
              </div>
            </div>
            <div css={style.systemItemWrapper()}>
              {canViewDashboard && (
                <div css={style.systemItem(isDashboardIcon)} onClick={() => onDashboardClick(close)}>
                  <div css={style.systemItemIconWrapper(isDarkMode, isDashboardIcon)}>
                    <Icons.Dashboard css={style.systemItemIcon(isDashboardIcon)} />
                  </div>
                  <p css={style.systemTitle(isDarkMode, isDashboardIcon)}>REPORT OVERVIEW</p>
                </div>
              )}
              <div css={style.systemItem()} onClick={() => onCMPClick(close)}>
                <div css={style.systemItemIconWrapper(isDarkMode)}>
                  <Icons.CMP css={style.systemItemIcon(isDarkMode)} />
                </div>
                <p css={style.systemTitle(isDarkMode)}>CMP</p>
              </div>
              {canViewDMP && (
                <div css={style.systemItem()} onClick={() => onDMPClick(close)}>
                  <div css={style.systemItemIconWrapper(isDarkMode)}>
                    <Icons.DMP css={style.systemItemIcon(isDarkMode)} />
                  </div>
                  <p css={style.systemTitle(isDarkMode)}>DMP</p>
                </div>
              )}
              {canViewMap && (
                <div css={style.systemItem()} onClick={() => onMapClick(close)}>
                  <div css={style.systemItemIconWrapper(isDarkMode)}>
                    <Icons.Map css={style.systemItemIcon(isDarkMode, isMapIcon)} />
                  </div>
                  <p css={style.systemTitle(isDarkMode)}>MAP</p>
                </div>
              )}
              {canViewQuicksight && (
                <div css={style.systemItem()} onClick={() => onLibraryClick(close)}>
                  <div css={style.systemItemIconWrapper(isDarkMode)}>
                    <Icons.Library css={style.systemItemIcon(isDarkMode)} />
                  </div>
                  <p css={style.systemTitle(isDarkMode)}>LIBRARY</p>
                </div>
              )}
            </div>
            <button css={style.logoutButton(isDarkMode)} onClick={() => auth.logout(authHelpers)}>
              Log Out
            </button>
          </div>
        )}
        position={Position.BOTTOM_RIGHT}
      >
        <Icon css={style.portalButton(isDarkMode)} icon='layout-grid' size={18} />
      </Popover>
      <DialogWithClassName
        title='Cancel File Upload'
        shouldCloseOnOverlayClick={false}
        isShown={isDialogOpen}
        preventBodyScrolling
        hasFooter
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <Pane>
          <Paragraph>Are you sure you want to cancel this upload?</Paragraph>
          <Paragraph>Any asset upload progress will be lost.</Paragraph>
        </Pane>
      </DialogWithClassName>
    </div>
  )
}

SystemIcon.propTypes = propTypes
SystemIcon.defaultProps = defaultProps

export default withAuth(SystemIcon)
