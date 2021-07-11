// Libs
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, useWatch } from 'react-hook-form'

// Components
import Table from '../../sharedComponents/Table'
import TableHeaderRow from '../../sharedComponents/TableHeaderRow'
import AssetRow from './components/AssetRow'

// Lib MISC

// Variables
import { headerList } from './constants/header'
import { TABLE_MODE, TAB } from '../../sharedConstants/table'

// Style
import getStyle from './style'
import FileModal from './sharedComponents/FileModal'

// PropTypes
export const propTypes = {
  currentTab: PropTypes.string,
  currentMode: PropTypes.string,
  setCurrentMode: PropTypes.func,
  filterOptions: PropTypes.object,
  formRef: PropTypes.object,
  selectedAssets: PropTypes.array,
  setSelectedAssets: PropTypes.func,
  isAddAssetModalOpen: PropTypes.bool,
  setIsAddAssetModalOpen: PropTypes.func,
}

function AssetList(props) {
  const style = getStyle(props)
  const {
    currentTab,
    currentMode,
    setCurrentMode,
    filterOptions,
    formRef,
    selectedAssets,
    setSelectedAssets,
    isAddAssetModalOpen,
    setIsAddAssetModalOpen,
  } = props

  const { getValues, setValue, reset, control } = useFormContext()

  const uploadingFiles = getValues('uploadingFiles')
  const { uploadingFiles: uploadingFilesProps, ...campaignInfo } = getValues()

  const isEditMode = currentMode === TABLE_MODE.EDIT
  const isDeleteMode = currentMode === TABLE_MODE.DELETE
  const isAddMode = currentMode === TABLE_MODE.ADD
  const isRemoveMode = currentMode === TABLE_MODE.REMOVE

  const uploadingFilesWatch = useWatch({
    control,
    name: 'uploadingFiles',
  })

  useEffect(() => {
    // 因為 watch 會導致畫面 re-render，所以對於 AssetRow 有包 React.memo
    // 但 AssetRow 又需要拿到更新過的 uploadingFiles
    // 這時如果當 props 傳就會使 React.memo re-render
    // 所以不用 props 傳而是存到 localStorage，AssetRow 要用的時候再去 localStorage 拿
    // 主要是處理在 assetRow 裡按 apply all 時可以去判斷別行 row 的 value，又不要觸發 re-render
    const newAssetList = JSON.stringify(uploadingFilesWatch)

    window.localStorage.setItem('assetList', newAssetList)
  }, [uploadingFilesWatch])

  return (
    <div css={style.assetList()}>
      <Table>
        <TableHeaderRow headerList={headerList} />
        {uploadingFiles?.map((item, index) => {
          if (isEditMode && currentTab === TAB.ASSET_LIST) {
            // edit mode
            return <AssetRow.Edit key={index} index={index} filterOptions={filterOptions} currentMode={currentMode} formRef={formRef} {...item} />
          } else if ((isDeleteMode || isRemoveMode) && currentTab === TAB.ASSET_LIST) {
            // delete mode
            return <AssetRow.Delete key={index} index={index} selectedAssets={selectedAssets} setSelectedAssets={setSelectedAssets} {...item} />
          } else if (isAddMode && currentTab === TAB.ASSET_LIST) {
            // add mode
            const isFirstRow = index === 0

            if (isFirstRow) {
              return <AssetRow.Edit key={index} index={index} filterOptions={filterOptions} currentMode={currentMode} formRef={formRef} {...item} />
            } else {
              return <AssetRow.View key={index} index={index} currentMode={currentMode} {...item} />
            }
          } else {
            // view mode
            return <AssetRow.View key={index} index={index} currentMode={currentMode} {...item} />
          }
        })}
      </Table>

      {isAddAssetModalOpen && (
        <FileModal
          title='Upload File'
          confirmLabel='Upload'
          fileAction={TABLE_MODE.ADD}
          isShown={isAddAssetModalOpen}
          setIsFileModalOpen={setIsAddAssetModalOpen}
          setValueProps={setValue}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          uploadingFilesProps={uploadingFiles}
          campaignInfo={campaignInfo}
          resetProps={reset}
        />
      )}
    </div>
  )
}

AssetList.propTypes = propTypes

export default AssetList
