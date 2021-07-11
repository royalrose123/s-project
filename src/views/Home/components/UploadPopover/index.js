// Libs
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

// Lib MISC
import useUploadListState from '../../sharedHooks/useUploadListState'
import { types as assetUploadTypes } from 'globalStateReducer/assetUpload'
import useGlobalState from 'globalState'

// Components
import UploadItem from './components/UploadItem'
import { Icon, Dialog, Pane, toaster } from 'evergreen-ui'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  history: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function UploadPopover(props) {
  const { history } = props
  const [globalState] = useUploadListState()
  const [isPopoverExpand, setIsPopoverExpand] = useState(true)
  const style = getStyle(props, isPopoverExpand)
  const { assetUpload } = globalState
  const { assetUploadList, isUploadFixed, isEditing } = assetUpload

  const [, dispatch] = useGlobalState()

  const [isModalOpen, setisModalOpen] = useState(false)

  const uploadAssets = Object.values(assetUploadList)

  const isSomeItemUploading =
    !isEmpty(uploadAssets) &&
    uploadAssets.some(item => {
      return item.isUploading
    })

  const isSomeItemCanceled =
    !isEmpty(uploadAssets) &&
    uploadAssets.some(item => {
      return item.isCanceled
    })

  const isSomeItemFailed =
    !isEmpty(uploadAssets) &&
    uploadAssets.some(item => {
      return item.isUploadFailed
    })

  const onCloseClick = () => {
    // 如果有
    if (isSomeItemUploading || isEditing) return setisModalOpen(true)

    dispatch({
      type: assetUploadTypes.CLEAR_UPLOAD_LIST,
    })

    history.push('/')
  }

  useEffect(() => {
    // multiple edit 時要等全部 asset 都 edit 完才能離開 UploadPopover
    if (!isEmpty(uploadAssets) && isUploadFixed && !isSomeItemUploading && !isSomeItemCanceled && !isSomeItemFailed && !isEditing) {
      dispatch({
        type: assetUploadTypes.CLEAR_UPLOAD_LIST,
      })
      toaster.success('Multiple assets edited.', {
        duration: 3,
      })
      history.push('/')
    }
  }, [dispatch, history, isEditing, isSomeItemCanceled, isSomeItemFailed, isSomeItemUploading, isUploadFixed, uploadAssets])

  return ReactDOM.createPortal(
    <>
      {!isEmpty(uploadAssets) && (
        <>
          {isUploadFixed && <div css={style.uploadPopoverCover()} />}
          <div css={style.uploadPopover(isUploadFixed)}>
            <div css={style.header()}>
              {isPopoverExpand && <div>Uploading {uploadAssets.length} files</div>}
              {isUploadFixed && <Icon css={style.closeIcon()} icon='cross' size={20} color='#fff' onClick={onCloseClick} />}
              {!isUploadFixed && (
                <button onClick={() => setIsPopoverExpand(isExpand => !isExpand)}>
                  <Icon transform={`rotate(${isPopoverExpand ? '0' : '180'}deg)`} transition='0.3s' icon='chevron-down' size={20} color='#fff' />
                </button>
              )}
            </div>

            <ul css={style.uploadList()}>
              {uploadAssets.map((uploadItemData, index) => (
                <UploadItem history={history} key={index} uploadItemData={uploadItemData} />
              ))}
            </ul>
            <Dialog
              isShown={isModalOpen}
              title='Upload in Progress'
              onConfirm={close => close()}
              onCloseComplete={() => setisModalOpen(false)}
              confirmLabel='Got it'
              hasCancel={false}
              overlayProps={{ style: { zIndex: 101 } }}
            >
              <Pane marginTop={5} marginBottom={5}>
                The upload popup window can’t be cleared until the upload complete.
              </Pane>
            </Dialog>
          </div>
        </>
      )}
    </>,
    document.body,
  )
}

UploadPopover.propTypes = propTypes
UploadPopover.defaultProps = defaultProps

export default UploadPopover
