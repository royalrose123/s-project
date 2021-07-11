import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Icon as AntdIcon } from 'antd'
import PropTypes from 'prop-types'

// Components
import FileDrop from 'kepler.gl/dist/components/common/file-uploader/file-drop'
import FileUploadProgress from 'kepler.gl/dist/components/common/file-uploader/file-upload-progress'
import { theme } from 'kepler.gl/dist/styles'
import addIcon from 'assets/icons/svg/add.svg'
import geojsonIcon from 'assets/icons/svg/geo-json.svg'
import csvIcon from 'assets/icons/svg/csvFile.svg'
import jsonIcon from 'assets/icons/svg/json.svg'
import downloadIcon from 'assets/icons/svg/downloadUp.svg'

const StyledItem = styled.div`
  cursor: ${props => (props.cursor ? props.cursor : 'auto')};
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  width: ${props => (props.width ? props.width : 'auto')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.items ? props.items : 'stretch')};
  margin-bottom: ${props => (props.withBottom ? '31px' : 0)};
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.width ? props.width : '140px')};
  height: 40px;
  font-weight: bold;
  border: ${props => (props.type === 'primary' ? 'none' : 'solid 1px #586274')};
  color: ${props => (props.disabled ? '#9da3ad !important' : props.type === 'primary' ? '#fff' : '#586274')};
  background-color: ${props => props.bg};
`

const StyledFileContainer = styled.div`
  width: 518px;
  height: 349px;
  border: solid 1px #b9b9b9;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bg ? props.bg : '#fff')};
  & > img {
    margin-bottom: 5px;
    cursor: pointer;
  }
`
const StyledImg = styled.img`
  filter: invert(0.5);
`

const StyledErrorContainer = styled.div`
  width: 518px;
  height: 90px;
  background-color: #000;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s;
  padding: 26px;
`

const StyledFloated = styled.div`
  width: ${props => (props.width ? props.width : 'auto')};
  position: absolute;
  bottom: ${props => props.bottom};
  left: ${props => (props.left ? props.left : '50%')};
  transform: translateX(-50%);
`

const StyledText = styled.span`
  color: ${props => (props.warning ? '#3961e7' : props.error ? '#fff' : '#9b9b9b')};
  font-size: ${props => (props.fontSize ? props.fontSize : '12px')};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  margin: 5px;
  display: inline-block;
  letter-spacing: normal;
  white-space: ${props => (props.wrap ? props.wrap : 'nowrap')};
`

const fileExtensions = ['csv', 'json', 'geojson']

function UploadFile(props) {
  const [files, setFiles] = useState([])
  const [errorFiles, setErrorFiles] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [dragOver, setDragOver] = useState(false)
  const frame = useRef(null)
  const fileInput = useRef(null)
  const errorContainerRef = useRef(null)
  const timer = useRef(null)
  const { onCancel } = props

  useEffect(() => {
    function toggleErrorElement(opacity = 0.5, isShow = 1) {
      errorContainerRef.current.style.opacity = opacity
      const time = opacity === 1 ? 2000 : 300
      const newIsShow = opacity === 1 ? -1 : isShow
      const newOpacity = opacity + 0.5 * newIsShow

      if (newOpacity >= 0) {
        timer.current = setTimeout(() => {
          toggleErrorElement(newOpacity, newIsShow)
        }, time)
      } else {
        setErrorFiles([])
      }
    }
    if (errorFiles.length) {
      toggleErrorElement()
    }

    return () => clearTimeout(timer.current)
  }, [errorFiles])

  const submit = () => {
    props.onFileUpload(files)
  }

  const isValidFileType = filename => {
    const fileExt = fileExtensions.find(ext => filename.endsWith(ext))

    return Boolean(fileExt)
  }

  const fileUploadChange = event => {
    const {
      target: { files },
    } = event

    if (files.length) {
      handleFileInput(files, event)
    }
  }

  const handleFileInput = (fileList, event) => {
    if (event) {
      event.stopPropagation()
    }

    const newFiles = [...fileList].filter(Boolean)

    const { disableExtensionFilter = false } = props

    // TODO - move this code out of the component
    const filesToLoad = []
    const errorFiles = []
    for (const file of newFiles) {
      if (disableExtensionFilter || isValidFileType(file.name)) {
        filesToLoad.push(file)
      } else {
        errorFiles.push(file.name)
      }
    }

    setFiles(filesToLoad)
    setDragOver(false)
    setErrorFiles(errorFiles)
  }

  const fileUpload = () => {
    fileInput.current.click()
  }

  const renderFileIcon = file => {
    if (/csv/.test(file.type)) {
      return csvIcon
    } else if (/geojson/.test(file.type)) {
      return geojsonIcon
    } else {
      return jsonIcon
    }
  }

  return (
    <div ref={frame}>
      <input type='file' ref={fileInput} style={{ display: 'none' }} onChange={fileUploadChange} />
      {props.loadFiles.fileLoading ? (
        <FileUploadProgress fileLoadingProgress={props.fileLoadingProgress} theme={theme} />
      ) : (
        <>
          {files.length ? (
            <StyledFileContainer bg='#d8d8d8'>
              <StyledFloated bottom='323px' left='492px' onClick={() => setFiles([])}>
                <AntdIcon type='close' style={{ cursor: 'pointer' }} />
              </StyledFloated>
              <StyledFloated bottom='0px' width='100%'>
                <StyledButton width='100%' bg='#969696' type='primary' onClick={fileUpload}>
                  <img src={downloadIcon} alt='download icon' />
                  Reload
                </StyledButton>
              </StyledFloated>
              <StyledItem items='center'>
                <StyledImg src={renderFileIcon(files[0])} alt='file icon' height='80px' />
                <StyledText>{files[0].name}</StyledText>
              </StyledItem>
            </StyledFileContainer>
          ) : (
            <FileDrop
              frame={frame.current || document}
              onDragOver={() => setDragOver(true)}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileInput}
            >
              <StyledFileContainer>
                <img src={addIcon} alt='add icon' onClick={fileUpload} />
                <StyledText fontSize='14px'>Drag and drop, or click to upload file</StyledText>
                <StyledText>(Maximum upload per file size: 2GB)</StyledText>
                <StyledItem direction='row' width='154px' justify='space-between' marginTop='20px'>
                  <img src={csvIcon} alt='csv icon' />
                  <img src={jsonIcon} alt='json icon' />
                  <img src={geojsonIcon} alt='geo json icon' />
                </StyledItem>
                {errorFiles.length ? (
                  <StyledFloated bottom='135px'>
                    <StyledErrorContainer ref={errorContainerRef}>
                      <StyledText error fontSize='20px'>
                        ⓘ
                      </StyledText>
                      <StyledText fontSize='14px' error wrap='normal'>
                        {errorFiles[0]} is not supported, please reselect your file and upload again.
                      </StyledText>
                    </StyledErrorContainer>
                  </StyledFloated>
                ) : null}
                <StyledFloated bottom='12px'>
                  <StyledText warning>
                    ⓘ Upload <strong>CSV</strong>, <strong>GeoJson</strong> or saved map <strong>Json</strong>. Read more about{' '}
                    <u>supported file formats</u>.
                  </StyledText>
                </StyledFloated>
              </StyledFileContainer>
            </FileDrop>
          )}
          <StyledItem width='100%' justify='flex-end' direction='row'>
            <StyledItem direction='row' width='300px' justify='space-between' marginTop='55px'>
              <StyledButton onClick={onCancel} bg='#fff'>
                Cancel
              </StyledButton>
              <StyledButton type='primary' onClick={submit} bg={!files.length ? '#c7cace !important' : '#586274'} disabled={!files.length}>
                Confirm
              </StyledButton>
            </StyledItem>
          </StyledItem>
        </>
      )}
    </div>
  )
}

UploadFile.propTypes = {
  onCancel: PropTypes.func,
  disableExtensionFilter: PropTypes.bool,
  fileLoadingProgress: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.object]),
  onFileUpload: PropTypes.func,
  loadFiles: PropTypes.object,
}

export default UploadFile
