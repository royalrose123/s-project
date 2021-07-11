import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, cloneDeep } from 'lodash'
import { useForm } from 'react-hook-form'

// Components
import { Dialog } from 'evergreen-ui'
import MultiMediaModifier from '../../../../../AssetsForm/components/MultiMediaModifier'

// Lib MISC

// Variables
import { TABLE_MODE } from '../../../../sharedConstants/table'

// Style

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  isShown: PropTypes.bool,
  setIsFileModalOpen: PropTypes.func,
  title: PropTypes.string,
  confirmLabel: PropTypes.string,
  fileAction: PropTypes.string,
  setValueProps: PropTypes.func,
  resetProps: PropTypes.func,
  currentMode: PropTypes.string,
  setCurrentMode: PropTypes.func,
  uploadingFilesProps: PropTypes.array,
  campaignInfo: PropTypes.object,
}

export const defaultProps = {
  setCurrentMode: () => {},
  campaignInfo: { campaignStartDate: '', campaignEndDate: '' },
}

function FileModal(props) {
  const {
    index,
    isShown,
    setIsFileModalOpen,
    title,
    confirmLabel,
    fileAction,
    setValueProps,
    resetProps,
    currentMode,
    setCurrentMode,
    uploadingFilesProps,
    campaignInfo,
  } = props

  const { campaignStartDate, campaignEndDate } = campaignInfo

  const methods = useForm({ defaultValues: { uploadingFiles: [] } })

  const { setValue, register, handleSubmit, watch } = methods

  useEffect(() => {
    register('uploadingFiles')
  }, [register])

  const uploadingFiles = watch('uploadingFiles')

  const initialData = {
    fileName: '',
    assetName: '',
    assetPlatform: '',
    assetFormat: '',
    assetFormatType: '',
    assetLanguage: '',
    assetCta: '',
    assetCtaName: '',
    countryCode: [],
    countryNames: [],
    caption: '',
    fieldAlign: false,
    startDate: campaignStartDate,
    endDate: campaignEndDate,
    placement: '',
    tags: [],
    webUrl: '',
    createUser: '',
    message: '',
    primaryText: '',
    headline: '',
    description: '',
  }

  const onSubmit = data => {
    const selectedFile = data.uploadingFiles[0]

    const isViewMode = currentMode === TABLE_MODE.VIEW

    if (isViewMode) {
      const addUploadingFile = data.uploadingFiles[0]

      const cloneUploadingProps = cloneDeep(uploadingFilesProps)

      const newAddUploadingFile = {
        ...initialData,
        ...addUploadingFile,
        assetName: addUploadingFile.fileName,
        assetFormatType: addUploadingFile.fileFormat,
      }

      cloneUploadingProps.unshift(newAddUploadingFile)

      resetProps({ uploadingFiles: cloneUploadingProps, ...campaignInfo })

      setCurrentMode(TABLE_MODE.ADD)
    } else {
      setValueProps(`uploadingFiles[${index}].assetName`, selectedFile.fileName)
      setValueProps(`uploadingFiles[${index}].assetFormat`, '')
      setValueProps(`uploadingFiles[${index}].caption`, '')
      setValueProps(`uploadingFiles[${index}].file`, selectedFile.file)
      setValueProps(`uploadingFiles[${index}].fileName`, selectedFile.fileName)
      setValueProps(`uploadingFiles[${index}].fileUrl`, selectedFile.fileUrl)

      setValueProps(`uploadingFiles[${index}].assetFormatType`, selectedFile.fileFormat)

      if (selectedFile.fileFormat === 'image') {
        setValueProps(`uploadingFiles[${index}].width`, selectedFile.width)
        setValueProps(`uploadingFiles[${index}].height`, selectedFile.height)
      } else {
        setValueProps(`uploadingFiles[${index}].duration`, selectedFile.duration)
      }
    }

    setIsFileModalOpen(false)
  }

  return (
    <Dialog
      title={title}
      isShown={isShown}
      confirmLabel={confirmLabel}
      onConfirm={handleSubmit(onSubmit)}
      isConfirmDisabled={isEmpty(uploadingFiles)}
      onCloseComplete={() => setIsFileModalOpen(false)}
      shouldCloseOnEscapePress={false}
      shouldCloseOnOverlayClick={false}
    >
      <form>
        <MultiMediaModifier
          fileAction={fileAction}
          action='upload'
          setFieldValue={setValue}
          assetFormatType=''
          assetFilePath=''
          videoWithoutHlsSrc=''
          assetSize=''
        />
      </form>
    </Dialog>
  )
}

FileModal.defaultProps = defaultProps
FileModal.propTypes = propTypes

export default FileModal
