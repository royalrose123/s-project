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
 * Story SAAT-432 Remove Kepler copyright logo
 * 為了移除 kepler attribution 字樣，所以複製一份 map-container.js 出來修改
 */

// libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapboxGLMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { createSelector } from 'reselect'
import WebMercatorViewport from 'viewport-mercator-project'

// components
// import MapPopoverFactory from 'kepler.gl/dist/components/map/map-popover'
// import MapControlFactory from 'components/map/map-control'
import { StyledMapContainer } from 'kepler.gl/dist/components/common/styled-components'
import { CustomMapControlFactory as MapControlFactory } from './map-control'
import { CustomMapPopoverFactory as MapPopoverFactory } from './custom-popover'

import EditorFactory from 'kepler.gl/dist/components/editor/editor'

// utils
import { generateMapboxLayers, updateMapboxLayers } from 'kepler.gl/dist/layers/mapbox-utils'
import { OVERLAY_TYPE } from 'kepler.gl/dist/layers/base-layer'
import { setLayerBlending } from 'kepler.gl/dist/utils/gl-utils'
import { transformRequest } from 'kepler.gl/dist/utils/map-style-utils/mapbox-utils'
import { getLayerHoverProp } from 'kepler.gl/dist/utils/layer-utils'

// default-settings
import ThreeDBuildingLayer from 'kepler.gl/dist/deckgl-layers/3d-building-layer/3d-building-layer'
import { FILTER_TYPES } from 'kepler.gl/dist/constants/default-settings'
import { MapContainerFactory, withState } from 'kepler.gl/dist/components'

const MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative',
  },
  top: {
    position: 'absolute',
    top: '0px',
    pointerEvents: 'none',
  },
}

const MAPBOXGL_STYLE_UPDATE = 'style.load'
const MAPBOXGL_RENDER = 'render'
const TRANSITION_DURATION = 0

// const Attribution = () => (
//   <StyledAttrbution>
//     <a href='https://kepler.gl/policy/' target='_blank' rel='noopener noreferrer'>
//       © kepler.gl |{' '}
//     </a>
//     <a href='https://www.mapbox.com/about/maps/' target='_blank' rel='noopener noreferrer'>
//       © Mapbox |{' '}
//     </a>
//     <a href='http://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>
//       © OpenStreetMap |{' '}
//     </a>
//     <a href='https://www.mapbox.com/map-feedback/' target='_blank' rel='noopener noreferrer'>
//       <strong>Improve this map123</strong>
//     </a>
//   </StyledAttrbution>
// )

CustomMapContainer.deps = [MapPopoverFactory, MapControlFactory, EditorFactory]

const MapControl = MapControlFactory()
const Editor = EditorFactory()
const MapOver = MapPopoverFactory()

export default function CustomMapContainer(MapPopover, MapControl, Editor) {
  class MapContainer extends Component {
    static propTypes = {
      // required
      datasets: PropTypes.object,
      interactionConfig: PropTypes.object.isRequired,
      layerBlending: PropTypes.string.isRequired,
      layerOrder: PropTypes.arrayOf(PropTypes.any).isRequired,
      layerData: PropTypes.arrayOf(PropTypes.any).isRequired,
      layers: PropTypes.arrayOf(PropTypes.any).isRequired,
      filters: PropTypes.arrayOf(PropTypes.any).isRequired,
      mapState: PropTypes.object.isRequired,
      mapControls: PropTypes.object.isRequired,
      uiState: PropTypes.object.isRequired,
      mapStyle: PropTypes.object.isRequired,
      mousePos: PropTypes.object.isRequired,
      mapboxApiAccessToken: PropTypes.string.isRequired,
      mapboxApiUrl: PropTypes.string,
      visStateActions: PropTypes.object.isRequired,
      mapStateActions: PropTypes.object.isRequired,
      uiStateActions: PropTypes.object.isRequired,

      // optional
      readOnly: PropTypes.bool,
      isExport: PropTypes.bool,
      clicked: PropTypes.object,
      hoverInfo: PropTypes.object,
      mapLayers: PropTypes.object,
      onMapToggleLayer: PropTypes.func,
      onMapStyleLoaded: PropTypes.func,
      onMapRender: PropTypes.func,
      getMapboxRef: PropTypes.func,
      index: PropTypes.number,
    }

    static defaultProps = {
      MapComponent: MapboxGLMap,
      deckGlProps: {},
      index: 0,
    }

    constructor(props) {
      super(props)

      this.previousLayers = {
        // [layers.id]: mapboxLayerConfig
      }

      this._deck = null
    }

    componentWillUnmount() {
      // unbind mapboxgl event listener
      if (this._map) {
        this._map.off(MAPBOXGL_STYLE_UPDATE)
        this._map.off(MAPBOXGL_RENDER)
      }
    }

    layersSelector = props => props.layers
    layerDataSelector = props => props.layerData
    mapLayersSelector = props => props.mapLayers
    layerOrderSelector = props => props.layerOrder
    layersToRenderSelector = createSelector(
      this.layersSelector,
      this.layerDataSelector,
      this.mapLayersSelector,
      // {[id]: true \ false}
      (layers, layerData, mapLayers) =>
        layers.reduce(
          (accu, layer, idx) => ({
            ...accu,
            [layer.id]: layer.shouldRenderLayer(layerData[idx]) && this._isVisibleMapLayer(layer, mapLayers),
          }),
          {},
        ),
    )

    filtersSelector = props => props.filters
    polygonFilters = createSelector(this.filtersSelector, filters => filters.filter(f => f.type === FILTER_TYPES.polygon))

    mapboxLayersSelector = createSelector(
      this.layersSelector,
      this.layerDataSelector,
      this.layerOrderSelector,
      this.layersToRenderSelector,
      generateMapboxLayers,
    )

    /* component private functions */
    _isVisibleMapLayer(layer, mapLayers) {
      // if layer.id is not in mapLayers, don't render it
      return !mapLayers || (mapLayers && mapLayers[layer.id])
    }

    _onCloseMapPopover = () => {
      this.props.visStateActions.onLayerClick(null)
    }

    _onLayerSetDomain = (idx, colorDomain) => {
      this.props.visStateActions.layerConfigChange(this.props.layers[idx], {
        colorDomain,
      })
    }

    _handleMapToggleLayer = layerId => {
      const { index: mapIndex = 0, visStateActions } = this.props
      visStateActions.toggleLayerForMap(mapIndex, layerId)
    }

    _onMapboxStyleUpdate = () => {
      // force refresh mapboxgl layers
      this.previousLayers = {}
      this._updateMapboxLayers()

      if (typeof this.props.onMapStyleLoaded === 'function') {
        this.props.onMapStyleLoaded(this._map)
      }
    }

    _setMapboxMap = mapbox => {
      if (!this._map && mapbox) {
        this._map = mapbox.getMap()
        // i noticed in certain context we don't access the actual map element
        if (!this._map) {
          return
        }
        // bind mapboxgl event listener
        this._map.on(MAPBOXGL_STYLE_UPDATE, this._onMapboxStyleUpdate)

        this._map.on(MAPBOXGL_RENDER, () => {
          if (typeof this.props.onMapRender === 'function') {
            this.props.onMapRender(this._map)
          }
        })
      }

      if (this.props.getMapboxRef) {
        // The parent component can gain access to our MapboxGlMap by
        // providing this callback. Note that 'mapbox' will be null when the
        // ref is unset (e.g. when a split map is closed).
        this.props.getMapboxRef(mapbox, this.props.index)
      }
    }

    _onBeforeRender = ({ gl }) => {
      setLayerBlending(gl, this.props.layerBlending)
    }

    /* component render functions */

    /* eslint-disable complexity */
    _renderMapPopover(layersToRender) {
      // TODO: move this into reducer so it can be tested
      const {
        mapState,
        hoverInfo,
        clicked,
        datasets,
        interactionConfig,
        layers,
        mousePos: { mousePosition, coordinate, pinned },
      } = this.props

      if (!mousePosition) {
        return null
      }
      // if clicked something, ignore hover behavior
      let layerHoverProp = null
      let layerPinnedProp = null
      const position = { x: mousePosition[0], y: mousePosition[1] }
      let pinnedPosition = {}

      layerHoverProp = getLayerHoverProp({
        interactionConfig,
        hoverInfo,
        layers,
        layersToRender,
        datasets,
      })

      const compareMode = interactionConfig.tooltip.config ? interactionConfig.tooltip.config.compareMode : false

      const hasTooltip = pinned || clicked
      const hasComparisonTooltip = compareMode || (!clicked && !pinned)

      if (hasTooltip) {
        // project lnglat to screen so that tooltip follows the object on zoom
        const viewport = new WebMercatorViewport(mapState)
        const lngLat = clicked ? clicked.lngLat : pinned.coordinate
        pinnedPosition = this._getHoverXY(viewport, lngLat)
        layerPinnedProp = getLayerHoverProp({
          interactionConfig,
          hoverInfo: clicked,
          layers,
          layersToRender,
          datasets,
        })
        if (layerHoverProp) {
          layerHoverProp.primaryData = layerPinnedProp.data
          layerHoverProp.compareType = interactionConfig.tooltip.config.compareType
        }
      }
      return (
        <div>
          {hasTooltip && (
            <MapPopover
              {...pinnedPosition}
              layerHoverProp={layerPinnedProp}
              coordinate={interactionConfig.coordinate.enabled && (pinned || {}).coordinate}
              frozen={Boolean(hasTooltip)}
              /* eslint-disable-next-line react/jsx-handler-names */
              onClose={this._onCloseMapPopover}
              mapW={mapState.width}
              mapH={mapState.height}
              isBase={compareMode}
            />
          )}
          {hasComparisonTooltip && (
            <MapPopover
              {...position}
              layerHoverProp={layerHoverProp}
              coordinate={interactionConfig.coordinate.enabled && coordinate}
              /* eslint-disable-next-line react/jsx-handler-names */
              onClose={this._onCloseMapPopover}
              mapW={mapState.width}
              mapH={mapState.height}
            />
          )}
        </div>
      )
    }

    /* eslint-enable complexity */

    _getHoverXY(viewport, lngLat) {
      const screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat)
      return screenCoord && { x: screenCoord[0], y: screenCoord[1] }
    }

    _renderLayer = (overlays, idx) => {
      // eslint-disable-next-line react/prop-types
      const { datasets, layers, layerData, hoverInfo, clicked, mapState, interactionConfig, animationConfig } = this.props
      const layer = layers[idx]
      const data = layerData[idx]
      const { gpuFilter } = datasets[layer.config.dataId] || {}

      const objectHovered = clicked || hoverInfo
      const layerCallbacks = {
        onSetLayerDomain: val => this._onLayerSetDomain(idx, val),
      }

      // Layer is Layer class
      const layerOverlay = layer.renderLayer({
        data,
        gpuFilter,
        idx,
        interactionConfig,
        layerCallbacks,
        mapState,
        animationConfig,
        objectHovered,
      })

      return overlays.concat(layerOverlay || [])
    }

    _renderDeckOverlay(layersToRender) {
      const { mapState, mapStyle, layerData, layerOrder, layers, visStateActions, mapboxApiAccessToken, mapboxApiUrl } = this.props

      let deckGlLayers = []
      // wait until data is ready before render data layers
      if (layerData && layerData.length) {
        // last layer render first
        deckGlLayers = layerOrder
          .slice()
          .reverse()
          .filter(idx => layers[idx].overlayType === OVERLAY_TYPE.deckgl && layersToRender[layers[idx].id])
          .reduce(this._renderLayer, [])
      }

      if (mapStyle.visibleLayerGroups['3d building']) {
        deckGlLayers.push(
          new ThreeDBuildingLayer({
            id: '_keplergl_3d-building',
            mapboxApiAccessToken,
            mapboxApiUrl,
            threeDBuildingColor: mapStyle.threeDBuildingColor,
            updateTriggers: {
              getFillColor: mapStyle.threeDBuildingColor,
            },
          }),
        )
      }

      return (
        <DeckGL
          /* eslint-disable-next-line react/prop-types */
          {...this.props.deckGlProps}
          viewState={mapState}
          id='default-deckgl-overlay'
          layers={deckGlLayers}
          /* eslint-disable-next-line react/jsx-handler-names */
          onBeforeRender={this._onBeforeRender}
          /* eslint-disable-next-line react/jsx-handler-names */
          onHover={visStateActions.onLayerHover}
          /* eslint-disable-next-line react/jsx-handler-names */
          onClick={visStateActions.onLayerClick}
          ref={comp => {
            if (comp && comp.deck && !this._deck) {
              this._deck = comp.deck
            }
          }}
        />
      )
    }

    _updateMapboxLayers() {
      const mapboxLayers = this.mapboxLayersSelector(this.props)
      if (!Object.keys(mapboxLayers).length && !Object.keys(this.previousLayers).length) {
        return
      }

      updateMapboxLayers(this._map, mapboxLayers, this.previousLayers)

      this.previousLayers = mapboxLayers
    }

    _renderMapboxOverlays() {
      if (this._map && this._map.isStyleLoaded()) {
        this._updateMapboxLayers()
      }
    }

    _onViewportChange = viewState => {
      // eslint-disable-next-line react/prop-types
      if (typeof this.props.onViewStateChange === 'function') {
        // eslint-disable-next-line react/prop-types
        this.props.onViewStateChange(viewState)
      }
      this.props.mapStateActions.updateMap(viewState)
    }

    _toggleMapControl = panelId => {
      const { index, uiStateActions } = this.props

      uiStateActions.toggleMapControl(panelId, index)
    }

    render() {
      const {
        mapState,
        mapStyle,
        mapStateActions,
        mapLayers,
        layers,
        // eslint-disable-next-line react/prop-types
        MapComponent,
        datasets,
        mapboxApiAccessToken,
        mapboxApiUrl,
        mapControls,
        uiState,
        uiStateActions,
        visStateActions,
        // eslint-disable-next-line react/prop-types
        editor,
        index,
      } = this.props

      const layersToRender = this.layersToRenderSelector(this.props)

      if (!mapStyle.bottomMapStyle) {
        // style not yet loaded
        return <div />
      }

      const mapProps = {
        ...mapState,
        preserveDrawingBuffer: true,
        mapboxApiAccessToken,
        mapboxApiUrl,
        onViewportChange: this._onViewportChange,
        transformRequest,
      }

      const isEdit = uiState.mapControls.mapDraw.active

      return (
        <StyledMapContainer style={MAP_STYLE.container}>
          <MapControl
            datasets={datasets}
            dragRotate={mapState.dragRotate}
            isSplit={Boolean(mapLayers)}
            isExport={this.props.isExport}
            layers={layers}
            layersToRender={layersToRender}
            mapIndex={index}
            mapControls={mapControls}
            readOnly={this.props.readOnly}
            scale={mapState.scale || 1}
            top={0}
            editor={editor}
            locale={uiState.locale}
            /* eslint-disable-next-line react/jsx-handler-names */
            onTogglePerspective={mapStateActions.togglePerspective}
            /* eslint-disable-next-line react/jsx-handler-names */
            onToggleSplitMap={mapStateActions.toggleSplitMap}
            /* eslint-disable-next-line react/jsx-handler-names */
            onMapToggleLayer={this._handleMapToggleLayer}
            /* eslint-disable-next-line react/jsx-handler-names */
            onToggleMapControl={this._toggleMapControl}
            /* eslint-disable-next-line react/jsx-handler-names */
            onSetEditorMode={visStateActions.setEditorMode}
            /* eslint-disable-next-line react/jsx-handler-names */
            onSetLocale={uiStateActions.setLocale}
            /* eslint-disable-next-line react/jsx-handler-names */
            onToggleEditorVisibility={visStateActions.toggleEditorVisibility}
          />
          <MapComponent
            {...mapProps}
            key='bottom'
            ref={this._setMapboxMap}
            mapStyle={mapStyle.bottomMapStyle}
            getCursor={this.props.hoverInfo ? () => 'pointer' : undefined}
            transitionDuration={TRANSITION_DURATION}
            /* eslint-disable-next-line react/jsx-handler-names */
            onMouseMove={this.props.visStateActions.onMouseMove}
          >
            {this._renderDeckOverlay(layersToRender)}
            {this._renderMapboxOverlays(layersToRender)}
            <Editor
              index={index}
              datasets={datasets}
              editor={editor}
              filters={this.polygonFilters(this.props)}
              isEnabled={isEdit}
              layers={layers}
              layersToRender={layersToRender}
              /* eslint-disable-next-line react/jsx-handler-names */
              onDeleteFeature={visStateActions.deleteFeature}
              /* eslint-disable-next-line react/jsx-handler-names */
              onSelect={visStateActions.setSelectedFeature}
              /* eslint-disable-next-line react/jsx-handler-names */
              onUpdate={visStateActions.setFeatures}
              /* eslint-disable-next-line react/jsx-handler-names */
              onTogglePolygonFilter={visStateActions.setPolygonFilterLayer}
              style={{
                pointerEvents: isEdit ? 'all' : 'none',
                position: 'absolute',
                // eslint-disable-next-line react/prop-types
                display: editor.visible ? 'block' : 'none',
              }}
            />
          </MapComponent>
          {mapStyle.topMapStyle && (
            <div style={MAP_STYLE.top}>
              <MapComponent {...mapProps} key='top' mapStyle={mapStyle.topMapStyle} />
            </div>
          )}
          {this._renderMapPopover(layersToRender)}
          {/* <Attribution /> */}
        </StyledMapContainer>
      )
    }
  }

  MapContainer.displayName = 'MapContainer'

  return MapContainer
}

const CustomMapContainerFactory = () => withState([], state => ({ ...state.keplerGl.map1 }))(CustomMapContainer(MapOver, MapControl, Editor))

CustomMapContainerFactory.deps = MapContainerFactory.deps

export function replaceMapContainer() {
  return [MapContainerFactory, CustomMapContainerFactory]
}
