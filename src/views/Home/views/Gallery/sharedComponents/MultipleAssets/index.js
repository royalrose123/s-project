import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'
import NavigationPrompt from 'react-router-navigation-prompt'

// Components
import OverPage from 'basicComponents/OverPage'
import MultipleAssetsTab from './components/MultipleAssetsTab'
import AssetList from './components/AssetList'
import CampaignInfo from './components/CampaignInfo'
import Spinner from 'basicComponents/Spinner'
import { Dialog, Pane, Paragraph } from 'evergreen-ui'
import ErrorMessage from './components/ErrorMessage'

// Libs
import useGlobalState from 'globalState'
import getInitialValues from './methods/getInitialValues'
import { ACTION_TYPES } from '../../constants/actionTypes'

// Style
import getStyle from './style'

// Variables
import { TAB, TABLE_MODE } from './sharedConstants/table'
import { handleSubmitMethod } from './methods/handleSubmit'
import { schema } from './validation'

// PropTypes
export const propTypes = {
  isShown: PropTypes.bool,
  filterOptions: PropTypes.object,
  onAssetModalClose: PropTypes.func,
  multipleAssets: PropTypes.object,
  updateProgramList: PropTypes.func,
  initiateCurrentAssetList: PropTypes.func,
  action: PropTypes.string,
  setShowActionFooter: PropTypes.func,
  setIsMultipleAssetsShown: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  setIsMultipleAssetsShown: () => {},
  setShowActionFooter: () => {},
}

function MultipleAssets(props) {
  const style = getStyle(props)

  const history = useHistory()

  const { multipleAssets, filterOptions, updateProgramList, initiateCurrentAssetList, action, setShowActionFooter, setIsMultipleAssetsShown } = props
  const { uploadingFiles, ...campaignInfo } = multipleAssets

  const isMultipleUpload = action === ACTION_TYPES.UPLOAD
  const isMultipleEdit = action === ACTION_TYPES.EDIT
  const isMultipleMove = action === ACTION_TYPES.MOVE

  const confirmLabel = isMultipleUpload ? 'Upload' : isMultipleEdit ? 'Save' : 'Move'
  const title = isMultipleUpload ? 'Multiple Asset Upload' : isMultipleEdit ? 'Edit Multiple Assets' : 'Move Multiple Assets'
  const promptText = isMultipleUpload ? 'upload' : isMultipleEdit ? 'edit' : 'move'

  const initailValues = getInitialValues({ isUpload: isMultipleUpload, multipleAssets, filterOptions })

  const [, dispatch] = useGlobalState()

  // 因為每次 field onChange/onSelect 就會 setFieldValue
  // 但取消時要回到上一次儲存過的 data
  // 所以 assetListRef, campaignInfoRef 在每次 save 時都會變更
  // 在按 cancel 後將 ref setFieldValue
  const assetListRef = useRef(initailValues)
  const campaignInfoRef = useRef(campaignInfo)
  const defaultValues = { uploadingFiles: assetListRef.current, ...campaignInfoRef.current }

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) })

  const { handleSubmit, errors } = methods

  const [isUploading, setIsUploading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isValidSubmit, setIsValidSubmit] = useState(false)

  const { isShown, onAssetModalClose } = props

  const formRef = useRef(null) // 將 select menu 透過 createPortal 掛載在 form 上

  const [currentTab, setCurrentTab] = useState(TAB.ASSET_LIST)
  const [currentMode, setCurrentMode] = useState(isMultipleMove ? TABLE_MODE.VIEW : TABLE_MODE.EDIT)

  const [selectedAssets, setSelectedAssets] = useState([])
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false)

  const isViewMode = currentMode === TABLE_MODE.VIEW
  const isEditMode = currentMode === TABLE_MODE.EDIT

  useEffect(() => {
    if (isViewMode) {
      if (!isEmpty(errors.uploadingFiles)) setIsErrorModalOpen(true)
    }
  }, [currentMode, currentTab, errors, isViewMode])

  const onSubmit = data => {
    handleSubmitMethod({
      data,
      setIsUploading,
      onAssetModalClose,
      updateProgramList,
      initiateCurrentAssetList,
      dispatch,
      action,
      history,
      setIsValidSubmit,
    })
  }

  const hasError = !isEmpty(errors?.uploadingFiles)

  return (
    <>
      <OverPage
        title={title}
        childrenWrapperCss={style.multipleAssetWrapper()}
        isShown={isShown}
        isMultipleUpload
        confirmLabel={confirmLabel}
        onConfirm={handleSubmit(onSubmit)}
        onCancel={() => onAssetModalClose()}
        isConfirmDisabled={currentMode !== TABLE_MODE.VIEW}
        shouldCloseOnEscapePress={false}
      >
        <FormProvider {...methods}>
          <form css={style.form()}>
            <div css={style.multipleAssetForm(currentTab === TAB.CAMPAIGN_INFO)} ref={formRef}>
              <MultipleAssetsTab
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                currentMode={currentMode}
                setCurrentMode={setCurrentMode}
                setIsModalOpen={setIsModalOpen}
                selectedAssets={selectedAssets}
                setSelectedAssets={setSelectedAssets}
                assetListRef={assetListRef}
                campaignInfoRef={campaignInfoRef}
                setIsAddAssetModalOpen={setIsAddAssetModalOpen}
                action={action}
              >
                {currentTab === TAB.ASSET_LIST && (
                  <AssetList
                    currentTab={currentTab}
                    currentMode={currentMode}
                    setCurrentMode={setCurrentMode}
                    filterOptions={filterOptions}
                    formRef={formRef}
                    selectedAssets={selectedAssets}
                    setSelectedAssets={setSelectedAssets}
                    isAddAssetModalOpen={isAddAssetModalOpen}
                    setIsAddAssetModalOpen={setIsAddAssetModalOpen}
                  />
                )}
                {currentTab === TAB.CAMPAIGN_INFO && (
                  <CampaignInfo currentTab={currentTab} currentMode={currentMode} filterOptions={filterOptions} formRef={formRef} />
                )}
              </MultipleAssetsTab>
              {isUploading && ReactDOM.createPortal(<Spinner />, document.body)}

              <Dialog
                isShown={isModalOpen}
                hasHeader={false}
                onConfirm={close => close()}
                onCloseComplete={() => setIsModalOpen(false)}
                confirmLabel='Got it'
                cancelLabel='Cancel'
              >
                <Pane marginTop={5} marginBottom={5}>
                  Please finish the previous action.
                </Pane>
              </Dialog>
              <Dialog
                isShown={isErrorModalOpen}
                hasHeader={false}
                onConfirm={close => close()}
                onCloseComplete={() => setIsErrorModalOpen(false)}
                confirmLabel='Got it'
                cancelLabel='Cancel'
              >
                <Pane marginTop={5} marginBottom={5}>
                  Please enter the fields first.
                </Pane>
              </Dialog>
            </div>
          </form>
          {hasError && isEditMode && currentTab === TAB.ASSET_LIST && <ErrorMessage errors={errors.uploadingFiles} />}
        </FormProvider>
      </OverPage>
      {/* 如果成功送出表單，就不跳 NavigationPrompt */}
      <NavigationPrompt when={!isValidSubmit} disableNative>
        {({ onConfirm, onCancel }) => (
          <Dialog
            isShown
            title={`Are you sure you want to quit the ${promptText}?`}
            onConfirm={() => {
              onAssetModalClose() // 在觸發「上一頁」（非 modal onCancel）的時候將 gallery footer 關閉
              setIsMultipleAssetsShown(false)
              setShowActionFooter(ACTION_TYPES.NULL)
              onConfirm()
            }}
            onCloseComplete={onCancel}
          >
            <Paragraph>Assets {promptText} progress will be lost.</Paragraph>
          </Dialog>
        )}
      </NavigationPrompt>
    </>
  )
}

MultipleAssets.propTypes = propTypes
MultipleAssets.defaultProps = defaultProps

export default MultipleAssets
