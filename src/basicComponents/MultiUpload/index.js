// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Icon } from 'evergreen-ui'

// Lib MISC

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  hasFile: PropTypes.bool,
  accept: PropTypes.string.isRequired,
  onFileSelected: PropTypes.func.isRequired,
  uploadCss: PropTypes.object,
  isMultipleUpload: PropTypes.bool,
  isDisabled: PropTypes.bool,
  dropBoxProps: PropTypes.object,
  fileInput: PropTypes.object,
  handleFiles: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  onFileSelected: () => {},
}

function MultiUpload(props) {
  const style = getStyle(props)

  const { accept, uploadCss, hasFile, isMultipleUpload, dropBoxProps, fileInput, handleFiles } = props

  return (
    <div css={uploadCss} onClick={() => {}}>
      {!hasFile && (
        <div css={style.dropBoxBig()} {...dropBoxProps}>
          <div css={style.plusIconBox()}>
            <div css={style.plusIconWrapper()}>
              <Icon icon='plus' size={60} color='#9b9b9b' />
            </div>
            <div css={style.dropBoxTitle()}>Drag and drop, or click to upload file</div>
            <div css={style.dropBoxTitle()}>Maximum upload size: 2GB</div>
          </div>
        </div>
      )}

      <input
        css={style.fileInput()}
        ref={fileInput}
        onChange={event => {
          const fileList = Object.values(event.target.files)

          handleFiles(fileList)
        }}
        type='file'
        accept={accept}
        multiple={isMultipleUpload}
      />
    </div>
  )
}

MultiUpload.propTypes = propTypes
MultiUpload.defaultProps = defaultProps

export default MultiUpload
