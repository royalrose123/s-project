/**
 * @author Woody 20200913
 * @description Story SAAT-540: Hide right side icons when exporting image
 *
 * kepler.gl 的 redux store（以下稱 state） 中有兩個 mapControls，
 * state.mapControls 及 state.uiState.mapControls，資料結構如下：
 * {
 *   addPoint: { show: true, active: false, activeMapIndex: 0 },
 *   exportData: { show: true, active: false, activeMapIndex: 0 },
 *   exportImage: { show: true, active: false, activeMapIndex: 0 },
 *   mapDraw: { show: true, active: false, activeMapIndex: 0 },
 *   mapLegend: { show: true, active: false, activeMapIndex: 0 },
 *   mapLocale: { show: true, active: false, activeMapIndex: 0 },
 *   share: { show: true, active: false, activeMapIndex: 0 },
 *   splitMap: { show: true, active: false, activeMapIndex: 0 },
 *   toggle3d: { show: true, active: false, activeMapIndex: 0 },
 *   visibleLayers: { show: true, active: false, activeMapIndex: 0 },
 * }
 *
 * 平時這兩者的值一模一樣，只有在 state.isExport 值變成 true 的時候不一樣，
 * 當點選 exportImage icon 開啟 exportImage modal 時（此時 state.uiState.currentModal === 'exportImage'），
 * exportImage modal 會開始產生要匯出的縮圖，平常都是 undefined 的 state.isExport，
 * 在此時會轉為 true，且 state.mapControls 變成 { mapLegend: { show: false, active: false} } (只剩 mapLegend，且 show 為 false），
 * 一開始很困惑為何地圖上的 icon 有顯示，匯出的圖片卻沒有任何 icon，
 * 參考原始碼（kepler.gl/src/components/map/map-control.js）之後才發現，
 * state.uiState.mapControls 控制的是地圖右側的 map control icons，
 * state.mapControls 來負責，則控制是否在 export image 顯示這些 icon
 *
 * @summary
 * 依照原始碼的方式，在渲染 icons 的地方加上 state（例如：{state.mapControls.exportImage.show && <ExportImage />}，
 * 即可將 icon 從匯出的圖片中移除
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import useGlobalState from 'globalState'
import AddPoint from './map-control/AddPoint'
import DrawOnMap from './map-control/DrawOnMap'
import ExportData from './map-control/ExportData'
import ExportImage from './map-control/ExportImage'
import Map3D from './map-control/Map3D'
// import Share from './map-control/Share'
import ShowLegend from './map-control/ShowLegend'
import Mode from './map-control/Mode'

const StyledMapControlOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 15px;
`

function CustomMapControl(props) {
  const [state, dispatch] = useGlobalState()
  const { theme } = state
  const { mapControls } = props
  const { mapLegend = {}, toggle3d = {}, mapDraw = {}, exportImage = {}, addPoint = {}, exportData = {} } = mapControls

  return (
    <StyledMapControlOverlay>
      <div>
        {exportImage.show && <ExportImage {...props} mode={theme.mode} />}
        {mapLegend.show && <ShowLegend {...props} mode={theme.mode} />}
        {mapDraw.show && <DrawOnMap {...props} mode={theme.mode} />}
        {toggle3d.show && <Map3D {...props} mode={theme.mode} />}
        {addPoint.show && <AddPoint {...props} mode={theme.mode} />}
        {/* {share.show && <Share {...props} mode={theme.mode} />} */}
        {exportData.show && <ExportData {...props} mode={theme.mode} />}
      </div>
      {/* 因為 kepler state 裡沒有給 mode 的狀態，所以借用 exportImage.show */}
      {exportImage.show && <Mode {...props} mode={theme.mode} dispatch={dispatch} />}
    </StyledMapControlOverlay>
  )
}

CustomMapControl.propTypes = {
  mapControls: PropTypes.shape({
    mapLegend: PropTypes.shape({
      show: PropTypes.bool,
    }),
    toggle3d: PropTypes.shape({
      show: PropTypes.bool,
    }),
    mapDraw: PropTypes.shape({
      show: PropTypes.bool,
    }),
    exportImage: PropTypes.shape({
      show: PropTypes.bool,
    }),
    addPoint: PropTypes.shape({
      show: PropTypes.bool,
    }),
    // share: PropTypes.shape({
    //   show: PropTypes.bool,
    // }),
    exportData: PropTypes.shape({
      show: PropTypes.bool,
    }),
  }),
}

export default CustomMapControl
