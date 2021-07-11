import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { uniqueId, cloneDeep, isEmpty, findIndex } from 'lodash'

// Components
import Icons from 'assets/icons'
import Video from 'basicComponents/Video'
import { Icon, Popover, Position, Menu, Dialog, Pane, Checkbox } from 'evergreen-ui'
import facebookIcon from 'assets/icons/img/logo_facebook.png'
import youtubeIcon from 'assets/icons/img/logo_youtube.png'
import instagramIcon from 'assets/icons/img/logo_instagram.png'
import Html5Image from 'assets/icons/img/HTML5.png'

// Lib MISC
import useGlobalState from 'globalState'
import PLATFORM_TYPE from 'constants/platformType'
import { deleteAsset } from 'api/Gallery/deleteAsset'
import { getLiveStatus } from '../../sharedMethods/getLiveStatus'
import { getCoolDownStatus } from '../../sharedMethods/getCoolDownStatus'

// Style
import getStyle from './style'

// Variables / Functions
import { ACTION_TYPES } from '../../constants/actionTypes'

export const propTypes = {
  updateProgramAssets: PropTypes.func,
  updateProgramList: PropTypes.func,
  initiateCurrentAssetList: PropTypes.func,
  history: PropTypes.object,
  media: PropTypes.object,
  // createdTimestamp: PropTypes.number,
  selectedMedia: PropTypes.array,
  setSelectedMedia: PropTypes.func,
  showActionFooter: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  reachMaxSelectedAssets: PropTypes.bool,
  setIsSelectionModalOpen: PropTypes.func,
  multipleModalInfo: PropTypes.object,
}

function Media(props) {
  const {
    history,
    media,
    updateProgramAssets,
    updateProgramList,
    initiateCurrentAssetList,
    selectedMedia,
    setSelectedMedia,
    showActionFooter,
    reachMaxSelectedAssets,
    setIsSelectionModalOpen,
    multipleModalInfo,
  } = props
  const style = getStyle(props)
  const { assetId, format, formatType, assetName, platform, campaignName, endDate, startDate, mediaURL, createdTimestamp, tags, program } = media

  const [state] = useGlobalState()
  const { user } = state
  const { userRoleInfo } = user
  const { CMPAccess } = userRoleInfo
  const {
    canEditAsset,
    canEditLiveAsset,
    canEditLiveAssetOver24Hr,
    canMoveAsset,
    canMoveLiveAsset,
    canMoveLiveAssetOver24Hr,
    canDuplicateSingleAsset,
    canDeleteSingleAsset,
    canDeleteSingleLiveAsset,
  } = CMPAccess

  const isChecked = Boolean(selectedMedia.find(item => item.assetId === assetId))

  const icon = {
    [PLATFORM_TYPE.FACEBOOK]: <img src={facebookIcon} css={style.mediaCampaignIcon()} />,
    [PLATFORM_TYPE.DIGITAL_DISPLAY]: <Icons.DigitalDisplay css={style.mediaCampaignIcon()} />,
    [PLATFORM_TYPE.YOUTUBE]: <img src={youtubeIcon} css={style.mediaCampaignIcon()} width='14' height='14' />,
    [PLATFORM_TYPE.INSTAGRAM]: <img src={instagramIcon} css={style.mediaCampaignIcon()} />,
    [PLATFORM_TYPE.MOBILE]: <Icons.Mobile css={style.mediaCampaignIcon()} />,
    [PLATFORM_TYPE.TABLET]: <Icons.Mobile css={style.mediaCampaignIcon()} />,
  }

  // 擁有 edit 跟 delete live asset 權限的人，在 asset 建立的 24 小時內可以 edit 跟 delete
  // 如果超過 24 小時依然不能 edit, delete
  const isLive = getLiveStatus(startDate, endDate)
  const isWithin24Hours = getCoolDownStatus(createdTimestamp)

  const showEditButton = canEditAsset || canEditLiveAsset
  const showDeleteButton = canDeleteSingleAsset || canDeleteSingleLiveAsset
  const canEdit = (isLive && canEditLiveAsset && (isWithin24Hours || canEditLiveAssetOver24Hr)) || (!isLive && canEditAsset)
  const canMove = (isLive && canMoveLiveAsset && (isWithin24Hours || canMoveLiveAssetOver24Hr)) || (!isLive && canMoveAsset)
  const canDelete = (isLive && canDeleteSingleLiveAsset && (isWithin24Hours || canEditLiveAssetOver24Hr)) || (!isLive && canDeleteSingleAsset)

  // more 裡面所有 item 都沒權限時，就把 more button 隱藏
  const showMoreButton = showEditButton || canDuplicateSingleAsset || showDeleteButton

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isMorePopoverOpen, setIsMorePopoverOpen] = useState(false)

  const onAssetClick = () => {
    history.push(`/home/gallery/view/${assetId}/info`)
  }

  const onEditClick = () => {
    history.push(`/home/gallery/edit/${assetId}/info`)
  }

  const onDuplicateClick = () => {
    history.push(`/home/gallery/duplicate/${assetId}/info`)
  }

  const toggleCheck = event => {
    if (!showActionFooter || !showCheckbox) return

    event.preventDefault()

    if (reachMaxSelectedAssets && !isChecked) {
      setIsSelectionModalOpen(true)
      return
    }

    if (isChecked) {
      const selectedIndex = findIndex(selectedMedia, { assetId })
      // 為了不要污染到 state 的陣列，所以 clone 一份新的陣列
      const newSelectedMedia = cloneDeep(selectedMedia)
      newSelectedMedia.splice(selectedIndex, 1)
      setSelectedMedia(newSelectedMedia)
    } else {
      const newSelectedMedia = selectedMedia.concat({ ...media })

      setSelectedMedia(newSelectedMedia)
    }
  }

  const downloadMode = showActionFooter === ACTION_TYPES.DOWNLOAD
  const editMode = showActionFooter === ACTION_TYPES.EDIT
  const moveMode = showActionFooter === ACTION_TYPES.MOVE

  const showCheckbox =
    downloadMode ||
    (editMode && canEdit && program === multipleModalInfo.assetProgram && campaignName === multipleModalInfo.campaignName) ||
    (moveMode && canMove)

  return (
    <div css={style.media(isChecked, showActionFooter)} onClick={toggleCheck}>
      <Dialog
        isShown={isDeleteModalOpen}
        onConfirm={close => {
          return deleteAsset({ assetId })
            .then(() => {
              updateProgramAssets()
              updateProgramList()
              initiateCurrentAssetList()
            })
            .then(close)
        }}
        onCloseComplete={() => setIsDeleteModalOpen(false)}
        title='Delete Asset'
        confirmLabel='Delete'
        cancelLabel='Cancel'
      >
        <Pane marginTop={5} marginBottom={5}>
          Are you sure you want to delete the asset?
        </Pane>
        <Pane marginTop={5} marginBottom={5}>
          The asset will be deleted immediately.
        </Pane>
        <Pane marginTop={5} marginBottom={5}>
          You can’t undo it.
        </Pane>
      </Dialog>
      <div css={style.thumbnailWrapper()}>
        <div>
          {formatType === 'html5' && <img css={style.mediaImage()} src={Html5Image} onClick={onAssetClick} />}
          {formatType === 'image' && <img css={style.mediaImage()} src={mediaURL} onClick={onAssetClick} />}
          {formatType === 'video' && (
            <div css={style.mediaVideoWrapper()} onClick={onAssetClick}>
              <Video
                id={`my-video${uniqueId()}`}
                src={mediaURL}
                css={style.mediaVideo()}
                sources={[{ src: mediaURL }]}
                customSetting={{ controls: false, width: 200, height: 130, preload: 'metadata' }}
              />
            </div>
          )}
          <div css={style.liveIcon(isLive)} />
        </div>
        {showActionFooter && (
          <>
            <div css={style.thumbnailMask()} />
            {showCheckbox && <Checkbox css={style.thumbnailCheckbox()} checked={isChecked} onChange={toggleCheck} />}
          </>
        )}
      </div>
      <div css={style.mediaCampaignWrapper()}>
        <div css={style.mediaCampaignTextWrapper()}>
          {icon[platform]}
          <p css={style.mediaCampaignText()}>{campaignName}</p>
        </div>

        {!showActionFooter && showMoreButton && (
          <Popover
            minWidth={150}
            minHeight={125}
            isShown={isMorePopoverOpen}
            onOpen={() => setIsMorePopoverOpen(true)}
            onClose={() => setIsMorePopoverOpen(false)}
            content={
              <Menu>
                <Menu.Group>
                  {canDuplicateSingleAsset && (
                    <Menu.Item css={style.menuItem()} onSelect={onDuplicateClick}>
                      <div css={style.itemIconWrapper()}>
                        <Icons.Duplicate css={style.itemIcon()} />
                        Duplicate
                      </div>
                    </Menu.Item>
                  )}
                  {showEditButton && (
                    <Menu.Item is='button' css={style.menuItem(canEdit)} icon='edit' onSelect={canEdit ? onEditClick : () => {}}>
                      Edit
                    </Menu.Item>
                  )}
                  {showDeleteButton && (
                    <Menu.Item is='button' css={style.menuItem(canDelete)} onSelect={() => (canDelete ? setIsDeleteModalOpen(true) : () => {})}>
                      <div css={style.itemIconWrapper()}>
                        <Icons.Delete css={style.itemIcon()} />
                        Delete
                      </div>
                    </Menu.Item>
                  )}
                </Menu.Group>
              </Menu>
            }
            position={Position.BOTTOM_RIGHT}
          >
            <Icon icon='more' size={16} css={style.moreIcon(showActionFooter)} />
          </Popover>
        )}
      </div>
      <p css={style.formatName()}>{format}</p>
      <p css={style.mediaName()}>{assetName}</p>
      {!isEmpty(tags) && (
        <div css={style.tagWrapper()}>
          {tags.map((item, index) => {
            return (
              <div key={index} css={style.tag()}>
                <p css={style.tagText()}>{item.valueName}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

Media.propTypes = propTypes

export default withRouter(Media)
