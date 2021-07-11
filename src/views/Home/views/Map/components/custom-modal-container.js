// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @author Woody 20200911
 * @description
 * Story SAAT-386 對於 Kepler 的 improvement：
 * 在 export image modal 中加入一個 input 欄位，當使用者輸入文字之後，
 * export 的 image 將替換成使用者在 input 輸入的文字作為檔名（原本預設檔名是 kepler-gl.jpg）
 *
 * Kepler 的 export image 函式並沒有提供修改檔名的參數，因此將 export image 相關的兩支檔案（modal-container.js 及 export-utils）複製出來修改，
 * 接上未修改的 kepler component 及修改過的 component（custom modal 等等），
 * 於 Map/index.js 的 injectComponents 中注入並替換原本 Kepler 的 modal-container.js
 *
 * PS. export-utils.js 置於 redux 資料匣中
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { findDOMNode } from 'react-dom'
import { createSelector } from 'reselect'
import get from 'lodash.get'
import document from 'global/document'

import { CustomModalFactory as ModalDialogFactory } from './custom-modal' // 客製化的 ModalDialogFactory
import { ModalContainerFactory, withState } from 'kepler.gl/dist/components'
import KeplerGlSchema from 'kepler.gl/dist/schemas'
import { exportJson, exportHtml, exportData, exportImage, exportMap } from '../../../../../redux/export-utils' // 客製化的 export-utils
import { isValidMapInfo } from 'kepler.gl/dist/utils/map-info-utils'

// modals
import DeleteDatasetModalFactory from 'kepler.gl/dist/components/modals/delete-data-modal'
import OverWriteMapModalFactory from 'kepler.gl/dist/components/modals/overwrite-map-modal'
import DataTableModalFactory from 'kepler.gl/dist/components/modals/data-table-modal'
import DataTableFactory from 'kepler.gl/dist/components/common/data-table'
import { CustomAddDataFactory as LoadDataModalFactory } from './customAddData' // 客製化的 LoadDataModalFactory

import { CustomExportImageModalFactory as ExportImageModalFactory } from './map-control/ExportImage/CustomImageModal' // 客製化的 ExportImageModalFactory

import ExportDataModalFactory from 'kepler.gl/dist/components/modals/export-data-modal'
import ExportMapModalFactory from 'kepler.gl/dist/components/modals/export-map-modal/export-map-modal'
import AddMapStyleModalFactory from 'kepler.gl/dist/components/modals/add-map-style-modal'
import SaveMapModalFactory from 'kepler.gl/dist/components/modals/save-map-modal'
import ShareMapModalFactory from 'kepler.gl/dist/components/modals/share-map-modal'

import FileUploadFactory from 'kepler.gl/dist/components/common/file-uploader/file-upload'
import LoadStorageMapFactory from 'kepler.gl/dist/components/modals/load-storage-map'
import ModalTabsFactory from 'kepler.gl/dist/components/modals/modal-tabs'
// Breakpoints
import { media } from 'kepler.gl/dist/styles/media-breakpoints'

// Template
import {
  ADD_DATA_ID,
  DATA_TABLE_ID,
  DELETE_DATA_ID,
  EXPORT_DATA_ID,
  EXPORT_IMAGE_ID,
  EXPORT_MAP_ID,
  ADD_MAP_STYLE_ID,
  SAVE_MAP_ID,
  SHARE_MAP_ID,
  OVERWRITE_MAP_ID,
  EXPORT_MAP_FORMATS,
} from 'kepler.gl/dist/constants/default-settings'
import KeyEvent from 'kepler.gl/dist/constants/keyevent'

const DataTableModalStyle = css`
  top: 80px;
  padding: 32px 0 0 0;
  width: 90vw;
  max-width: 90vw;

  ${media.portable`
    padding: 0;
  `}

  ${media.palm`
    padding: 0;
    margin: 0 auto;
  `}
`
const smallModalCss = css`
  width: 40%;
  padding: 40px 40px 32px 40px;
`

const LoadDataModalStyle = css`
  top: 60px;
`

const DefaultStyle = css`
  max-width: 960px;
`

ModalContainerFactory.deps = [
  DeleteDatasetModalFactory,
  OverWriteMapModalFactory,
  DataTableModalFactory,
  LoadDataModalFactory,
  ExportImageModalFactory,
  ExportDataModalFactory,
  ExportMapModalFactory,
  AddMapStyleModalFactory,
  ModalDialogFactory,
  SaveMapModalFactory,
  ShareMapModalFactory,
]

const DeleteDatasetModal = DeleteDatasetModalFactory()
const OverWriteMapModal = OverWriteMapModalFactory()
const DataTableModal = DataTableModalFactory(DataTableFactory())
const LoadDataModal = LoadDataModalFactory(ModalTabsFactory(), FileUploadFactory(), LoadStorageMapFactory())
const ExportImageModal = ExportImageModalFactory()
const ExportDataModal = ExportDataModalFactory()
const ExportMapModal = ExportMapModalFactory()
const AddMapStyleModal = AddMapStyleModalFactory()
const ModalDialog = ModalDialogFactory()
const SaveMapModal = SaveMapModalFactory()
const ShareMapModal = ShareMapModalFactory()

export default function CustomModalContainer(
  DeleteDatasetModal,
  OverWriteMapModal,
  DataTableModal,
  LoadDataModal,
  ExportImageModal,
  ExportDataModal,
  ExportMapModal,
  AddMapStyleModal,
  ModalDialog,
  SaveMapModal,
  ShareMapModal,
) {
  class ModalWrapper extends Component {
    static propTypes = {
      rootNode: PropTypes.object,
      containerW: PropTypes.number,
      containerH: PropTypes.number,
      mapboxApiAccessToken: PropTypes.string.isRequired,
      mapboxApiUrl: PropTypes.string,
      mapState: PropTypes.object.isRequired,
      mapStyle: PropTypes.object.isRequired,
      uiState: PropTypes.object.isRequired,
      visState: PropTypes.object.isRequired,
      visStateActions: PropTypes.object.isRequired,
      uiStateActions: PropTypes.object.isRequired,
      mapStyleActions: PropTypes.object.isRequired,
      onSaveToStorage: PropTypes.func,
      cloudProviders: PropTypes.arrayOf(PropTypes.object),
    }

    componentDidMount = () => {
      document.addEventListener('keyup', this._onKeyUp)
    }

    componentWillUnmount() {
      document.removeEventListener('keyup', this._onKeyUp)
    }

    cloudProviders = props => props.cloudProviders
    providerWithStorage = createSelector(this.cloudProviders, cloudProviders => cloudProviders.filter(p => p.hasPrivateStorage()))
    providerWithShare = createSelector(this.cloudProviders, cloudProviders => cloudProviders.filter(p => p.hasSharingUrl()))

    _onKeyUp = event => {
      const keyCode = event.keyCode
      if (keyCode === KeyEvent.DOM_VK_ESCAPE) {
        this._closeModal()
      }
    }

    _closeModal = () => {
      this.props.uiStateActions.toggleModal(null)
    }

    _deleteDataset = key => {
      this.props.visStateActions.removeDataset(key)
      this._closeModal()
    }

    _onAddCustomMapStyle = () => {
      this.props.mapStyleActions.addCustomMapStyle()
      this._closeModal()
    }

    _onFileUpload = blob => {
      this.props.visStateActions.loadFiles(blob)
    }

    _onExportImage = fileName => {
      if (!this.props.uiState.exportImage.exporting) {
        // exportImage(this.props, this.props.uiState.exportImage);
        // kepler 原本沒有帶入 fileName 的參數，下面是客製化後的 exportImage，將 fileName 帶入
        exportImage(this.props, fileName)
        this.props.uiStateActions.cleanupExportImage()
        this._closeModal()
      }
    }

    _onExportData = () => {
      exportData(this.props, this.props.uiState.exportData)
      this._closeModal()
    }

    _onExportMap = () => {
      const { uiState } = this.props
      const { format } = uiState.exportMap
      ;(format === EXPORT_MAP_FORMATS.HTML ? exportHtml : exportJson)(this.props, this.props.uiState.exportMap[format] || {})
      this._closeModal()
    }

    _exportFileToCloud = ({ provider, isPublic, overwrite, closeModal }) => {
      const toSave = exportMap(this.props)

      // eslint-disable-next-line react/prop-types
      this.props.providerActions.exportFileToCloud({
        mapData: toSave,
        provider,
        options: {
          isPublic,
          overwrite,
        },
        closeModal,
        // eslint-disable-next-line react/prop-types
        onSuccess: this.props.onExportToCloudSuccess,
        // eslint-disable-next-line react/prop-types
        onError: this.props.onExportToCloudError,
      })
    }

    _onSaveMap = (overwrite = false) => {
      // eslint-disable-next-line react/prop-types
      const { currentProvider } = this.props.providerState
      const provider = this.props.cloudProviders.find(p => p.name === currentProvider)
      this._exportFileToCloud({
        provider,
        isPublic: false,
        overwrite,
        closeModal: true,
      })
    }

    _onOverwriteMap = () => {
      this._onSaveMap(true)
    }

    _onShareMapUrl = provider => {
      this._exportFileToCloud({ provider, isPublic: true, overwrite: false, closeModal: false })
    }

    _onCloseSaveMap = () => {
      // eslint-disable-next-line react/prop-types
      this.props.providerActions.resetProviderStatus()
      this._closeModal()
    }

    _onLoadCloudMap = payload => {
      // eslint-disable-next-line react/prop-types
      this.props.providerActions.loadCloudMap({
        ...payload,
        // eslint-disable-next-line react/prop-types
        onSuccess: this.props.onLoadCloudMapSuccess,
        // eslint-disable-next-line react/prop-types
        onError: this.props.onLoadCloudMapError,
      })
    }

    /* eslint-disable complexity */
    render() {
      // eslint-disable-next-line react/prop-types
      const { containerW, containerH, mapStyle, mapState, uiState, visState, rootNode, visStateActions, uiStateActions, providerState } = this.props

      const { currentModal, datasetKeyToRemove } = uiState
      const { datasets, layers, editingDataset } = visState

      let template = null
      let modalProps = {}
      if (currentModal && currentModal.id && currentModal.template) {
        // if currentMdoal template is already provided
        // TODO: need to check whether template is valid
        template = <currentModal.template />
        modalProps = currentModal.modalProps
      } else {
        switch (currentModal) {
          case DATA_TABLE_ID:
            // eslint-disable-next-line no-case-declarations
            const width = containerW * 0.9
            template = (
              <DataTableModal
                width={containerW * 0.9}
                height={containerH * 0.85}
                datasets={datasets}
                dataId={editingDataset}
                showDatasetTable={visStateActions.showDatasetTable}
                sortTableColumn={visStateActions.sortTableColumn}
                pinTableColumn={visStateActions.pinTableColumn}
                copyTableColumn={visStateActions.copyTableColumn}
              />
            )

            // TODO: we need to make this width consistent with the css rule defined modal.js:32 max-width: 70vw
            modalProps.cssStyle = css`
              ${DataTableModalStyle};
              ${media.palm`
                width: ${width}px;
              `}
            `
            break
          case DELETE_DATA_ID:
            // validate options
            if (datasetKeyToRemove && datasets && datasets[datasetKeyToRemove]) {
              template = <DeleteDatasetModal dataset={datasets[datasetKeyToRemove]} layers={layers} />
              modalProps = {
                title: 'modal.title.deleteDataset',
                cssStyle: smallModalCss,
                footer: true,
                onConfirm: () => this._deleteDataset(datasetKeyToRemove),
                onCancel: this._closeModal,
                confirmButton: {
                  negative: true,
                  large: true,
                  children: 'modal.button.delete',
                },
              }
            }
            break // in case we add a new case after this one
          case ADD_DATA_ID:
            template = (
              <LoadDataModal
                {...providerState}
                /* eslint-disable-next-line react/jsx-handler-names */
                onClose={this._closeModal}
                /* eslint-disable-next-line react/jsx-handler-names */
                onFileUpload={this._onFileUpload}
                /* eslint-disable-next-line react/jsx-handler-names */
                onLoadCloudMap={this._onLoadCloudMap}
                cloudProviders={this.providerWithStorage(this.props)}
                /* eslint-disable-next-line react/jsx-handler-names,react/prop-types */
                onSetCloudProvider={this.props.providerActions.setCloudProvider}
                /* eslint-disable-next-line react/prop-types */
                getSavedMaps={this.props.providerActions.getSavedMaps}
                loadFiles={uiState.loadFiles}
                fileLoading={visState.fileLoading}
                fileLoadingProgress={visState.fileLoadingProgress}
              />
            )
            modalProps = {
              title: 'modal.title.addDataToMap',
              cssStyle: LoadDataModalStyle,
              footer: false,
              onConfirm: this._closeModal,
            }
            break
          case EXPORT_IMAGE_ID:
            template = (
              <ExportImageModal
                exportImage={uiState.exportImage}
                mapW={containerW}
                mapH={containerH}
                /* eslint-disable-next-line react/jsx-handler-names */
                onUpdateSetting={uiStateActions.setExportImageSetting}
                toggleMapControl={uiStateActions.toggleMapControl}
              />
            )
            modalProps = {
              title: 'modal.title.exportImage',
              footer: true,
              onCancel: this._closeModal,
              onConfirm: fileName => this._onExportImage(fileName),
              confirmButton: {
                large: true,
                disabled: uiState.exportImage.exporting,
                children: 'modal.button.download',
              },
            }
            break
          case EXPORT_DATA_ID:
            template = (
              <ExportDataModal
                {...uiState.exportData}
                datasets={datasets}
                applyCPUFilter={this.props.visStateActions.applyCPUFilter}
                /* eslint-disable-next-line react/jsx-handler-names */
                onClose={this._closeModal}
                /* eslint-disable-next-line react/jsx-handler-names */
                onChangeExportDataType={uiStateActions.setExportDataType}
                /* eslint-disable-next-line react/jsx-handler-names */
                onChangeExportSelectedDataset={uiStateActions.setExportSelectedDataset}
                /* eslint-disable-next-line react/jsx-handler-names */
                onChangeExportFiltered={uiStateActions.setExportFiltered}
              />
            )
            modalProps = {
              title: 'modal.title.exportData',
              footer: true,
              onCancel: this._closeModal,
              onConfirm: this._onExportData,
              confirmButton: {
                large: true,
                children: 'modal.button.export',
              },
            }
            break
          case EXPORT_MAP_ID:
            // eslint-disable-next-line no-case-declarations
            const keplerGlConfig = KeplerGlSchema.getConfigToSave({
              mapStyle,
              visState,
              mapState,
              uiState,
            })
            template = (
              <ExportMapModal
                config={keplerGlConfig}
                options={uiState.exportMap}
                /* eslint-disable-next-line react/jsx-handler-names */
                onChangeExportMapFormat={uiStateActions.setExportMapFormat}
                /* eslint-disable-next-line react/jsx-handler-names */
                onEditUserMapboxAccessToken={uiStateActions.setUserMapboxAccessToken}
                /* eslint-disable-next-line react/jsx-handler-names */
                onChangeExportMapHTMLMode={uiStateActions.setExportHTMLMapMode}
              />
            )
            modalProps = {
              title: 'modal.title.exportMap',
              footer: true,
              onCancel: this._closeModal,
              onConfirm: this._onExportMap,
              confirmButton: {
                large: true,
                children: 'modal.button.export',
              },
            }
            break
          case ADD_MAP_STYLE_ID:
            template = (
              <AddMapStyleModal
                mapboxApiAccessToken={this.props.mapboxApiAccessToken}
                mapboxApiUrl={this.props.mapboxApiUrl}
                mapState={this.props.mapState}
                inputStyle={mapStyle.inputStyle}
                inputMapStyle={this.props.mapStyleActions.inputMapStyle}
                loadCustomMapStyle={this.props.mapStyleActions.loadCustomMapStyle}
              />
            )
            modalProps = {
              title: 'modal.title.addCustomMapboxStyle',
              footer: true,
              onCancel: this._closeModal,
              onConfirm: this._onAddCustomMapStyle,
              confirmButton: {
                large: true,
                disabled: !mapStyle.inputStyle.style,
                children: 'modal.button.addStyle',
              },
            }
            break
          case SAVE_MAP_ID:
            template = (
              <SaveMapModal
                {...providerState}
                exportImage={uiState.exportImage}
                mapInfo={visState.mapInfo}
                /* eslint-disable-next-line react/jsx-handler-names */
                onSetMapInfo={visStateActions.setMapInfo}
                /* eslint-disable-next-line react/jsx-handler-names */
                onUpdateImageSetting={uiStateActions.setExportImageSetting}
                cloudProviders={this.providerWithStorage(this.props)}
                /* eslint-disable-next-line react/jsx-handler-names,react/prop-types */
                onSetCloudProvider={this.props.providerActions.setCloudProvider}
              />
            )
            modalProps = {
              title: 'modal.title.saveMap',
              footer: true,
              onCancel: this._closeModal,
              onConfirm: () => this._onSaveMap(false),
              confirmButton: {
                large: true,
                // eslint-disable-next-line react/prop-types
                disabled: uiState.exportImage.exporting || !isValidMapInfo(visState.mapInfo) || !providerState.currentProvider,
                children: 'modal.button.save',
              },
            }
            break
          case OVERWRITE_MAP_ID:
            template = (
              <OverWriteMapModal
                {...providerState}
                cloudProviders={this.props.cloudProviders}
                title={get(visState, ['mapInfo', 'title'])}
                /* eslint-disable-next-line react/jsx-handler-names,react/prop-types */
                onSetCloudProvider={this.props.providerActions.setCloudProvider}
                /* eslint-disable-next-line react/jsx-handler-names */
                onUpdateImageSetting={uiStateActions.setExportImageSetting}
              />
            )
            modalProps = {
              title: 'Overwrite Existing File?',
              cssStyle: smallModalCss,
              footer: true,
              onConfirm: this._onOverwriteMap,
              onCancel: this._closeModal,
              confirmButton: {
                large: true,
                children: 'Yes',
                // eslint-disable-next-line react/prop-types
                disabled: uiState.exportImage.exporting || !isValidMapInfo(visState.mapInfo) || !providerState.currentProvider,
              },
            }
            break
          case SHARE_MAP_ID:
            template = (
              <ShareMapModal
                {...providerState}
                isReady={!uiState.exportImage.exporting}
                cloudProviders={this.providerWithShare(this.props)}
                /* eslint-disable-next-line react/jsx-handler-names */
                onExport={this._onShareMapUrl}
                /* eslint-disable-next-line react/jsx-handler-names,react/prop-types */
                onSetCloudProvider={this.props.providerActions.setCloudProvider}
                /* eslint-disable-next-line react/jsx-handler-names */
                onUpdateImageSetting={uiStateActions.setExportImageSetting}
              />
            )
            modalProps = {
              title: 'modal.title.shareURL',
              onCancel: this._onCloseSaveMap,
            }
            break
          default:
            break
        }
      }

      return this.props.rootNode ? (
        <ModalDialog
          parentSelector={() => findDOMNode(rootNode)}
          isOpen={Boolean(currentModal)}
          /* eslint-disable-next-line react/jsx-handler-names */
          onCancel={this._closeModal}
          {...modalProps}
          cssStyle={DefaultStyle.concat(modalProps.cssStyle || '')}
        >
          {template}
        </ModalDialog>
      ) : null
    }
    /* eslint-enable complexity */
  }

  return ModalWrapper
}

const CustomModalContainerFactory = () =>
  withState([], state => ({ ...state.keplerGl.map1 }))(
    CustomModalContainer(
      DeleteDatasetModal,
      OverWriteMapModal,
      DataTableModal,
      LoadDataModal,
      ExportImageModal,
      ExportDataModal,
      ExportMapModal,
      AddMapStyleModal,
      ModalDialog,
      SaveMapModal,
      ShareMapModal,
    ),
  )

CustomModalContainerFactory.deps = ModalContainerFactory.deps

export function replaceModalContainer() {
  return [ModalContainerFactory, CustomModalContainerFactory]
}
