// Libs
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

// Components
import { Icon } from 'evergreen-ui'
import ProgressRing from 'basicComponents/ProgressRing'

// Lib MISC
import useGlobalState from 'globalState'
import { updateUploadingItem } from '../../../../sharedMethods/updateUploadingItem'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  history: PropTypes.object,
  uploadItemData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    errorMessage: PropTypes.string,
    assetPath: PropTypes.string,
    progress: PropTypes.number,
    startRequest: PropTypes.func,
    isUploadSuccess: PropTypes.bool,
    isUploadFailed: PropTypes.bool,
  }),
}

// DefaultProps
export const defaultProps = {
  uploadItemData: PropTypes.shape({
    id: '',
    name: '',
    errorMessage: '',
    progress: 0,
    isUploadSuccess: false,
    isUploadFailed: false,
  }),
}

function UploadItem(props) {
  const style = getStyle(props)
  const [state, dispatch] = useGlobalState()
  const { assetUpload } = state
  const { isUploadFixed } = assetUpload
  const { uploadItemData, history } = props
  const { id, progress, name, startRequest, isUploadSuccess, isUploadFailed, errorMessage, assetPath } = uploadItemData

  const uploadState = {
    uploading: {
      icon: <ProgressRing progress={progress} id={id} />,
      onMouseEnterState: 'uploadingHovered',
    },

    uploadingHovered: {
      icon: (
        <div css={style.stopUpload}>
          <Icon icon='cross' size={20} color='white' />
        </div>
      ),

      handleOnClick: () => {
        updateUploadingItem(id, dispatch, {
          isCanceled: true,
          isUploading: false,
        })

        setStateName('uploadFailed')
      },

      onMouseLeaveState: 'uploading',
    },

    uploadSuccess: {
      icon: <Icon icon='tick-circle' size={24} color='#0c9f50' />,
    },

    uploadFailed: {
      icon: <Icon icon='error' size={24} color='#d0021b' />,

      onMouseEnterState: 'uploadFailedHovered',
    },

    uploadFailedHovered: {
      icon: (
        <div css={style.cancelUpload()}>
          <Icon icon='refresh' color='#d0021b' size={18} />
        </div>
      ),

      // handleOnDelete: () => dispatch({ type: assetUploadTypes.DELETE_ASSET_UPLOAD_ITEM, id }),

      handleOnClick: () => {
        updateUploadingItem(id, dispatch, {
          isCanceled: false,
          isUploadFailed: false,
          isUploading: true,
          errorMessage: '',
          progress: 0,
        })

        startRequest()
        setStateName('uploading')
      },

      onMouseLeaveState: 'uploadFailed',
    },

    uploadCanceled: {
      icon: (
        <div css={style.cancelUpload()}>
          <Icon icon='refresh' color='white' size={12} />
        </div>
      ),

      handleOnClick: () => {
        updateUploadingItem(id, dispatch, {
          isCanceled: false,
          isUploading: true,
          progress: 0,
        })

        startRequest()
        setStateName('uploading')
      },
    },
  }

  useEffect(() => {
    isUploadSuccess && setStateName('uploadSuccess')
  }, [isUploadSuccess])

  useEffect(() => {
    isUploadFailed && setStateName('uploadFailed')
  }, [isUploadFailed])

  const [stateName, setStateName] = useState('uploading')
  const iconWrapperRef = useRef(null)
  const currentState = uploadState[stateName]
  const hasErrorMessage = Boolean(errorMessage)

  const onItemMouseOver = event => {
    const { current: currentIconWrapperRef } = iconWrapperRef
    const { onMouseEnterState, onMouseLeaveState } = currentState

    const iconArea = [currentIconWrapperRef, ...currentIconWrapperRef.querySelectorAll('*')]

    const isMouseOverIconArea = iconArea.some(item => item === event.target)
    const hasOnMouseEnterState = Boolean(onMouseEnterState)
    const hasOnMouseLeaveState = Boolean(onMouseLeaveState)

    if (isMouseOverIconArea && hasOnMouseEnterState) {
      setStateName(onMouseEnterState)
    } else if (!isMouseOverIconArea && hasOnMouseLeaveState) {
      setStateName(onMouseLeaveState)
    }
  }

  return (
    <li css={style.uploadItem()} onMouseOver={onItemMouseOver}>
      <div css={style.fileNameWrapper()}>
        {!assetPath && <div css={style.fileName()}>{name}</div>}
        {assetPath && (
          <div
            css={style.fileName()}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (!isUploadFixed) history.push(assetPath)
            }}
          >
            {name}
          </div>
        )}

        {hasErrorMessage && (
          <>
            <div css={style.errorMessage()}>{errorMessage}</div>
            {/* <button css={style.failedButton()} onClick={currentState.handleOnRetry}> */}
            {/*  Retry */}
            {/* </button> */}
            {/* <button css={style.failedButton()} onClick={currentState.handleOnDelete}> */}
            {/*  Cancel */}
            {/* </button> */}
          </>
        )}
      </div>
      <div css={style.iconWrapper()} onClick={currentState.handleOnClick} ref={iconWrapperRef}>
        {currentState.icon}
      </div>
    </li>
  )
}

UploadItem.propTypes = propTypes
UploadItem.defaultProps = defaultProps

export default UploadItem
