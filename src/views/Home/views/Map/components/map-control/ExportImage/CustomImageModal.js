import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Button as AntdButton } from 'antd'

import { ExportImageModalFactory, withState } from 'kepler.gl/components'
import ImagePreview from 'kepler.gl/dist/components/common/image-preview'
import { EXPORT_IMG_RATIO_OPTIONS, EXPORT_IMG_RESOLUTION_OPTIONS, EXPORT_IMG_RATIOS } from 'kepler.gl/dist/constants/default-settings'
import { injectIntl } from 'react-intl'

import Select from '../../../../../../../basicComponents/Select'
import Checkbox from '../../../../../../../basicComponents/Checkbox'

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledText = styled.span`
  height: 16px;
  //font-family: OpenSans;
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'bold')};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: #2c313a;
  margin: ${props => (props.margin ? props.margin : 0)};
`

const StyledItem = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  width: ${props => (typeof props.width === 'string' ? props.width : `${props.width}px`)};
  margin: ${props => (props.margin ? props.margin : 0)};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.items ? props.items : 'stretch')};
  & > label {
    width: auto;
    margin-right: 9px;
    margin-left: -8px;
  }
`
const StyledButton = styled(AntdButton)`
  width: 140px;
  height: 40px;
  font-weight: bold;
  border: ${props => (props.type === 'primary' ? 'none' : 'solid 1px #586274')};
  color: ${props => (props.type === 'primary' ? '#fff' : '#586274')};
  background-color: ${props => (props.type === 'primary' ? '#586274' : 'fff')};
`

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  height: 38px;
  padding: 0;
`

const CustomExportImageModal = props => {
  const { exportImage, onUpdateSetting, intl, mapH, mapW, onCancel, onConfirm, toggleMapControl, mapControls } = props
  const { legend, ratio, resolution } = exportImage
  const { mapLegend } = mapControls
  const { active } = mapLegend
  const ratioOptions = EXPORT_IMG_RATIO_OPTIONS.filter(op => !op.hidden).map(op => ({ value: op.id, label: intl.formatMessage({ id: op.label }) }))
  const resolutionOptions = EXPORT_IMG_RESOLUTION_OPTIONS.map(op => ({ value: op.id, label: op.label }))
  const ratioValue = ratioOptions.find(op => op.value === ratio)
  const resolutionValue = resolutionOptions.find(op => op.value === resolution)

  const [fileName, setFileName] = useState('')

  useEffect(() => {
    function _updateMapDim() {
      if (mapH !== exportImage.mapH || mapW !== exportImage.mapW) {
        onUpdateSetting({
          mapH,
          mapW,
          ratio: EXPORT_IMG_RATIOS.CUSTOM,
          legend: false,
        })
      }
    }

    _updateMapDim()
  }, [exportImage.mapH, exportImage.mapW, mapH, mapW, onUpdateSetting])

  const handleCheck = () => {
    if (!active) {
      toggleMapControl('mapLegend')
    }
    onUpdateSetting({ legend: !legend })
  }

  const handleCancel = () => {
    onCancel()
    onUpdateSetting({ legend: false })
    if (active) toggleMapControl('mapLegend')
  }

  return (
    <StyledContainer>
      <StyledItem width={195} margin='0px 30px 0px 0px'>
        <StyledText>Ratio</StyledText>
        <Select
          isSearchable={false}
          options={ratioOptions}
          value={ratioValue}
          onChange={op => onUpdateSetting({ ratio: op.value })}
          placeholder='Select Ratio'
        />
      </StyledItem>
      <StyledItem width={195}>
        <StyledText>Resolution</StyledText>
        <Select
          isSearchable={false}
          options={resolutionOptions}
          value={resolutionValue}
          onChange={op => onUpdateSetting({ resolution: op.value })}
          placeholder='Select Resolution'
        />
      </StyledItem>
      <StyledItem width={195} margin='30px 0'>
        <StyledText>Image Name</StyledText>
        <StyledInput onChange={event => setFileName(event.target.value)} placeholder='Enter Image Name' />
      </StyledItem>
      <StyledItem width='100%' margin='0px 0px 0px -76px'>
        <StyledText margin='30px 0px -10px 76px'>Preview</StyledText>
        <ImagePreview exportImage={exportImage} />
      </StyledItem>
      <StyledItem width='100%' direction='row' margin='10px 0px 0px' justify='space-between'>
        <StyledItem direction='row' width={170} items='flex-end'>
          <Checkbox checked={legend} onChange={handleCheck} />
          <StyledText fontWeight='normal'>Include legend</StyledText>
        </StyledItem>
        <StyledItem width={300} direction='row' justify='space-between'>
          <StyledButton onClick={handleCancel}>Cancel</StyledButton>
          <StyledButton type='primary' onClick={() => onConfirm(fileName)}>
            Confirm
          </StyledButton>
        </StyledItem>
      </StyledItem>
    </StyledContainer>
  )
}

CustomExportImageModal.propTypes = {
  exportImage: PropTypes.object,
  onUpdateSetting: PropTypes.func,
  intl: PropTypes.object,
  mapH: PropTypes.number,
  mapW: PropTypes.number,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  toggleMapControl: PropTypes.func,
  mapControls: PropTypes.shape({
    mapLegend: PropTypes.shape({
      active: PropTypes.bool,
    }),
  }),
}

export const CustomExportImageModalFactory = (...deps) => {
  const ExportImageModal = ExportImageModalFactory(...deps)
  // const defaultLoadingMethods = ExportImageModal.defaultProps.loadingMethods

  // The following adds the method to the factory
  ExportImageModal.defaultProps = {
    ...ExportImageModal.defaultProps,
    // loadingMethods: [ExportImageModal.database, defaultLoadingMethods.find(lm => lm.id === 'upload')],
  }

  return withState([], state => ({ ...state.keplerGl.app, ...state.keplerGl.map1.uiState }), {
    // handleLoadRemoteMap: loadRemoteMap,
    // onGetColours: getcolours,
  })(injectIntl(CustomExportImageModal))
}

CustomExportImageModalFactory.deps = ExportImageModalFactory.deps

export function replaceExportImageModal() {
  return [ExportImageModalFactory, CustomExportImageModalFactory]
}
