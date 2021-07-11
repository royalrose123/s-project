import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, sortBy } from 'lodash'

// Libs
import { setFileInfo } from './methods/setFileInfo'
import { isUniqueFile, isValidFile, isValidSize, isValidFileName } from './methods/checkFile'
import { removeArrayItem } from 'utils/remove-array-item'
import useMediaEffect from './hooks/useMediaEffect'

// Components
import MultiUpload from 'basicComponents/MultiUpload'
import MediaItem from 'basicComponents/MediaItem'
import Icons from 'assets/icons'
import Spinner from 'basicComponents/Spinner'
import { Dialog, Pane } from 'evergreen-ui'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  onSelected: PropTypes.func,
  action: PropTypes.string,
  isMultipleUpload: PropTypes.bool,
  setFieldValue: PropTypes.func,
  assetFormatType: PropTypes.string,
  assetFilePath: PropTypes.string,
  videoWithoutHlsSrc: PropTypes.string,
  assetSize: PropTypes.string,
  fileAction: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  onSelected: () => {},
}

const MAX_FILE_AMOUNT = 100

function MultiMediaModifier(props) {
  const style = getStyle(props)

  const { onSelected, action, isMultipleUpload, setFieldValue, assetFormatType, assetFilePath, videoWithoutHlsSrc, assetSize, fileAction } = props

  const [currentFileList, setCurrentFileList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFileAmountModalOpen, setIsFileAmountModalOpen] = useState(false)
  const [currentErrorList, setCurrentErrorList] = useState([])

  const fileInput = useRef(null)

  const hasPreviewMedia = Boolean(assetFilePath) || Boolean(videoWithoutHlsSrc)
  const hasCurrentFile = !isEmpty(currentFileList)

  const hasFileAction = !isEmpty(fileAction)

  const onUploadFileSelected = async files => {
    if (!isMultipleUpload && isValidFile(files[0])) {
      setCurrentFileList([])
      setFieldValue('uploadingFiles', [])
    }

    if (files.length > MAX_FILE_AMOUNT || currentFileList.length + files.length > MAX_FILE_AMOUNT) return setIsFileAmountModalOpen(true)

    setIsLoading(true)

    const fileListPromise = files.map(async file => {
      const fileTypes = [
        { format: /image.*/, name: 'image' },
        { format: /video.*/, name: 'video' },
        { format: /zip.*/, name: 'zip' },
      ]
      const currentFileType = fileTypes.find(type => file.type.match(type.format))?.name

      const fileUrl = window.URL.createObjectURL(file)

      const fileWithSize = await setFileInfo(file, currentFileType, fileUrl)

      const extensionIndex = fileWithSize.name.lastIndexOf('.')
      const fileName = fileWithSize.name.slice(0, extensionIndex)

      return {
        fileName,
        file,
        fileUrl,
        isValidFile: isValidFile(file),
        isUniqueFile: isUniqueFile(currentFileList, file),
        isValidSize: isValidSize(file),
        isValidFileName: isValidFileName(file),
        type: currentFileType,
        ...fileWithSize,
      }
    })

    const newFileList = await Promise.all(fileListPromise)

    const errorFileList = []

    const correctFileList = newFileList.filter(item => {
      if (!item.isValidFile || !item.isUniqueFile || !item.isValidSize || !item.isValidFileName) errorFileList.push(item)

      return item.isValidFile && item.isUniqueFile && item.isValidSize && item.isValidFileName
    })

    if (!isEmpty(errorFileList)) setCurrentErrorList(errorFileList)

    if (isMultipleUpload) {
      setCurrentFileList(currentFileList.concat(correctFileList))
      setFieldValue('uploadingFiles', currentFileList.concat(correctFileList))
    } else {
      setCurrentFileList(correctFileList)
      setFieldValue('uploadingFiles', correctFileList)
    }

    onSelected(newFileList)
    setIsLoading(false)
  }

  const onMediaItemRemove = event => {
    event.stopPropagation()

    const selectedMediaItemIndex = Number(event.currentTarget.dataset.index)

    setCurrentFileList(removeArrayItem(selectedMediaItemIndex, currentFileList))
    setFieldValue('uploadingFiles', removeArrayItem(selectedMediaItemIndex, currentFileList))
  }

  const { imageWidth, imageHeight, videoDuration, dropBoxProps, handleFiles } = useMediaEffect({
    assetFormatType,
    assetSize,
    fileInput,
    isMultipleUpload,
    onUploadFileSelected,
  })

  return (
    <div css={style.multiMediaModifier(hasCurrentFile || hasPreviewMedia, isMultipleUpload, hasFileAction)}>
      {(hasCurrentFile || hasPreviewMedia) && isMultipleUpload && (
        <div css={style.multiMediaWrapper()}>
          {currentFileList.map((item, index) => (
            <MediaItem
              key={index}
              index={index}
              {...item}
              isMultipleUpload
              onMediaItemRemove={onMediaItemRemove}
              currentFileList={currentFileList}
              hasPreviewMedia={hasPreviewMedia}
            />
          ))}
        </div>
      )}

      {(hasCurrentFile || hasPreviewMedia) && !isMultipleUpload && (
        <div css={style.singleMediaWrapper()}>
          <MediaItem
            fileFormat={hasCurrentFile ? currentFileList[0]?.fileFormat : assetFormatType}
            fileUrl={hasCurrentFile ? currentFileList[0]?.fileUrl : assetFilePath}
            duration={hasCurrentFile ? currentFileList[0]?.duration : videoDuration}
            width={hasCurrentFile ? currentFileList[0]?.width : imageWidth}
            height={hasCurrentFile ? currentFileList[0]?.height : imageHeight}
            onMediaItemRemove={onMediaItemRemove}
            isMultipleUpload={false}
            videoFormat={hasCurrentFile ? currentFileList[0].file.type : ''}
            hasPreviewMedia={hasPreviewMedia}
            fileAction={fileAction}
          />
        </div>
      )}

      {action === 'upload' && (
        <MultiUpload
          accept='image/*,video/*,application/zip'
          uploadCss={style.uploadBox(hasCurrentFile, hasPreviewMedia || hasCurrentFile)}
          hasFile={hasCurrentFile}
          isMultipleUpload={isMultipleUpload}
          dropBoxProps={dropBoxProps}
          fileInput={fileInput}
          handleFiles={handleFiles}
        />
      )}

      {action === 'upload' && !isMultipleUpload && (hasCurrentFile || hasPreviewMedia) && (
        <div css={style.downloadButton()} {...dropBoxProps}>
          <Icons.Upload css={style.uploadButton()} />
          Reupload
        </div>
      )}

      {action === 'upload' && isMultipleUpload && (hasCurrentFile || hasPreviewMedia) && (
        <div css={style.downloadButton()} {...dropBoxProps}>
          <Icons.Upload css={style.uploadButton()} />
          {`Upload (${currentFileList.length})`}
        </div>
      )}

      {action === 'download' && hasPreviewMedia && (
        <a href={!videoWithoutHlsSrc ? assetFilePath : videoWithoutHlsSrc} css={style.downloadButton()} download>
          Download
        </a>
      )}
      {isLoading && <Spinner />}
      <Dialog
        isShown={isFileAmountModalOpen}
        onConfirm={close => close()}
        onCloseComplete={() => setIsFileAmountModalOpen(false)}
        title='Exceed upload limit'
        confirmLabel='Got it'
        cancelLabel='Cancel'
      >
        <Pane marginTop={5} marginBottom={5}>
          File upload is limited to a maximum of 100 files.
        </Pane>
      </Dialog>
      <Dialog
        isShown={!isEmpty(currentErrorList)}
        onConfirm={close => close()}
        onCloseComplete={() => setCurrentErrorList([])}
        title='Invalid File'
        confirmLabel='Got it'
        cancelLabel='Cancel'
        width='auto'
      >
        {sortBy(currentErrorList, ['isUniqueFile', 'isValidFile', 'isValidSize', 'isValidFileName']).map((item, index) => {
          if (!item.isUniqueFile) {
            return (
              <Pane key={index} marginTop={5} marginBottom={5}>
                {`The file of ${item.file.name} is already selected.`}
              </Pane>
            )
          } else if (!item.isValidFile) {
            return (
              <Pane key={index} marginTop={5} marginBottom={5}>
                {`We only support images & videos, ${item.file.name}'s file format is not supported.`}
              </Pane>
            )
          } else if (!item.isValidSize) {
            return (
              <Pane key={index} marginTop={5} marginBottom={5}>
                {`${item.file.name} exceeds file size, maximum upload per file size: 2GB.`}
              </Pane>
            )
          } else if (!item.isValidFileName) {
            return (
              <Pane key={index} marginTop={5} marginBottom={5}>
                {`The filename of ${item.file.name} is invalid . Can not include space or +/@!#$%^&*()<>?/|}{~:].`}
              </Pane>
            )
          }
        })}
      </Dialog>
    </div>
  )
}

MultiMediaModifier.propTypes = propTypes
MultiMediaModifier.defaultProps = defaultProps

export default MultiMediaModifier
