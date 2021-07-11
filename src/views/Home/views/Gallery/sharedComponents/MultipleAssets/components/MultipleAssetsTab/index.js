import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'

// Components
import Icons from 'assets/icons'
import { Button } from 'evergreen-ui'

// Lib MISC
import { resetAssetList, resetCampaignInfo } from './methods/resetMethod'
import { ACTION_TYPES } from '../../../../constants/actionTypes'

// Variables
import { TAB, TABLE_MODE, CONFIRM_WORDING } from '../../sharedConstants/table'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
  currentTab: PropTypes.string,
  setCurrentTab: PropTypes.func,
  currentMode: PropTypes.string,
  setCurrentMode: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  selectedAssets: PropTypes.array,
  setSelectedAssets: PropTypes.func,
  setIsAddAssetModalOpen: PropTypes.func,
  assetListRef: PropTypes.object,
  campaignInfoRef: PropTypes.object,
  action: PropTypes.string,
}

function MultipleAssetsTab(props) {
  const {
    children,
    currentTab,
    setCurrentTab,
    currentMode,
    setCurrentMode,
    setIsModalOpen,
    selectedAssets,
    setSelectedAssets,
    setIsAddAssetModalOpen,
    assetListRef,
    campaignInfoRef,
    action,
  } = props
  const style = getStyle(props)

  // 指 multiple 的模式
  const isMultipleUpload = action === ACTION_TYPES.UPLOAD
  const isMultipleEdit = action === ACTION_TYPES.EDIT
  const isMultipleMove = action === ACTION_TYPES.MOVE

  const { reset, setValue, control, trigger } = useFormContext()

  const values = useWatch({
    control,
  })

  const { uploadingFiles, ...campaignInfo } = values

  // 指對於 table 的模式
  const isViewMode = currentMode === TABLE_MODE.VIEW
  const isEditMode = currentMode === TABLE_MODE.EDIT
  const isDeleteMode = currentMode === TABLE_MODE.DELETE
  const isAddMode = currentMode === TABLE_MODE.ADD
  const isRemoveMode = currentMode === TABLE_MODE.REMOVE

  const onTabClick = selectedTab => {
    if (currentMode !== TABLE_MODE.VIEW) return setIsModalOpen(true)

    setCurrentTab(selectedTab)
  }

  const onConfirmClick = async () => {
    // ASSET_LIST edit mode
    if (currentTab === TAB.ASSET_LIST && isEditMode) {
      const isValid = await trigger(['uploadingFiles'])

      if (!isValid) return

      assetListRef.current = uploadingFiles

      reset({ uploadingFiles, ...campaignInfo })
    }

    // ASSET_LIST add mode
    if (currentTab === TAB.ASSET_LIST && isAddMode) {
      const isValid = await trigger(['uploadingFiles[0]'])

      if (!isValid) return

      assetListRef.current = uploadingFiles

      reset({ uploadingFiles, ...campaignInfo })
    }

    // CAMPAIGN_INFO edit mode
    if (currentTab === TAB.CAMPAIGN_INFO && isEditMode) {
      const isValid = await trigger(['campaignName', 'campaignDescription', 'campaignStartDate', 'campaignEndDate'])

      if (!isValid) return

      campaignInfoRef.current = campaignInfo

      reset({ uploadingFiles, ...campaignInfo })
    }

    // ASSET_LIST delete/remove mode
    if (currentTab === TAB.ASSET_LIST && (isDeleteMode || isRemoveMode)) {
      selectedAssets.sort()

      const newUploadingFiles = uploadingFiles.filter((item, index) => {
        const isSelected = typeof selectedAssets.find(item => item === index) !== 'undefined'
        return !isSelected
      })

      setSelectedAssets([])
      reset({ uploadingFiles: newUploadingFiles, ...campaignInfo })
      assetListRef.current = newUploadingFiles
    }

    setCurrentMode(TABLE_MODE.VIEW)
  }

  const onCancelClick = () => {
    if (currentTab === TAB.CAMPAIGN_INFO && isEditMode) resetCampaignInfo(campaignInfoRef, setValue)

    if (currentTab === TAB.ASSET_LIST && isEditMode) {
      resetAssetList(assetListRef, setValue)
    }
    if (currentTab === TAB.ASSET_LIST && (isDeleteMode || isRemoveMode)) setSelectedAssets([])
    if (currentTab === TAB.ASSET_LIST && isAddMode) {
      const cloneUploadingFiles = cloneDeep(uploadingFiles)
      const newUploadingFiles = cloneUploadingFiles.slice(1, cloneUploadingFiles.length)

      reset({ uploadingFiles: newUploadingFiles, ...campaignInfo })
    }

    setCurrentMode(TABLE_MODE.VIEW)
  }

  return (
    <>
      <div css={style.multipleAssetsTabWrapper()}>
        <button type='button' css={style.multipleAssetsTab(currentTab === TAB.ASSET_LIST)} onClick={() => onTabClick(TAB.ASSET_LIST)}>
          Asset List
        </button>
        <button type='button' css={style.multipleAssetsTab(currentTab === TAB.CAMPAIGN_INFO)} onClick={() => onTabClick(TAB.CAMPAIGN_INFO)}>
          Campaign Info
        </button>
        <div css={style.actionWrapper()}>
          {isRemoveMode && (
            <p css={style.removeMessage()}>ⓘ This will only remove assets from the moving list, the assets will still exist in the gallery.</p>
          )}
          {(isEditMode || isAddMode || isDeleteMode || isRemoveMode) && (
            <>
              <Button type='button' width={66} css={style.actionButton()} appearance='default' onClick={onCancelClick}>
                Cancel
              </Button>
              <Button type='button' width={66} css={style.actionButton()} appearance='primary' onClick={onConfirmClick}>
                {CONFIRM_WORDING[currentMode]}
              </Button>
            </>
          )}
          {isViewMode && (
            <>
              {isMultipleUpload && currentTab === TAB.ASSET_LIST && (
                <Icons.Add css={style.actionIcon()} onClick={() => setIsAddAssetModalOpen(true)} />
              )}
              {(((isMultipleUpload || isMultipleEdit) && currentTab === TAB.ASSET_LIST) ||
                (isMultipleUpload && currentTab === TAB.CAMPAIGN_INFO)) && (
                // eslint-disable-next-line react/jsx-indent
                <Icons.Edit css={style.actionIcon()} onClick={() => setCurrentMode(TABLE_MODE.EDIT)} />
              )}
              {isMultipleUpload && currentTab === TAB.ASSET_LIST && (
                <Icons.Delete css={style.actionIcon()} onClick={() => setCurrentMode(TABLE_MODE.DELETE)} />
              )}
              {isMultipleMove && currentTab === TAB.ASSET_LIST && (
                <Icons.Remove css={style.actionIcon()} onClick={() => setCurrentMode(TABLE_MODE.REMOVE)} />
              )}
            </>
          )}
        </div>
      </div>
      {children}
    </>
  )
}

MultipleAssetsTab.propTypes = propTypes

export default MultipleAssetsTab
