import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { isEmpty } from 'lodash'

// Libs
import { useMapInfoEffect } from './hooks/useMapInfoEffect'

// Components
import Popup from './components/Popup'

// Style
import getStyle from './style'

// Variables
import { MAPBOX_TOKEN } from 'constants/map'

// PropTypes
export const propTypes = {
  mapData: PropTypes.object,
  programOptions: PropTypes.array,
}

// DefaultProps
export const defaultProps = {
  programOptions: [],
}

mapboxgl.accessToken = MAPBOX_TOKEN

// zoom: 1.010048918033448, width: 1016
// zoom: 1.4791548224744895, width: 1465
// 擷取兩個 div width 及相對應的 zoom 值，算出斜率，其他的點則用內插法及外插法推算
const slope = (1.4791548224744895 - 1.010048918033448) / (1465 - 1016)

function Map(props) {
  const style = getStyle(props)

  const { mapData, programOptions } = props

  const [currentMapbox, setCurrentMapbox] = useState(null)
  const [currentPoint, setCurrentPoint] = useState({})
  const [currentInfo, setCurrentInfo] = useState(null)
  const [isHovering, setisHovering] = useState(false)
  const [isFocusPopup, setIsFocusPopup] = useState(false)

  const hoverIdref = useRef(null)

  const { programColorList, programBorderList } = useMapInfoEffect(programOptions)

  const mapboxRef = useRef(null)

  useEffect(() => {
    if (!isEmpty(mapboxRef.current)) {
      const currentMapboxWidth = mapboxRef.current.offsetWidth
      const mapInitialZoom = currentMapboxWidth * slope
      const mapbox = new mapboxgl.Map({
        container: mapboxRef.current,
        zoom: mapInitialZoom,
        center: [-11.415477409308807, 47.648537537889524],
        style: 'mapbox://styles/royalchen/ckcmujrfy1zc81io67jm17dek',
      })

      setCurrentMapbox(mapbox)
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(mapData.features) && !isEmpty(currentMapbox)) {
      const currentSource = currentMapbox.getSource('country')

      if (!isEmpty(currentSource)) return

      currentMapbox.addSource('country', {
        type: 'geojson',
        data: mapData,
      })
    }
  }, [currentMapbox, mapData])

  useEffect(() => {
    if (!isEmpty(mapData.features) && !isEmpty(currentMapbox)) {
      const fillLayer = currentMapbox.getLayer('state-fills')

      if (fillLayer) return

      currentMapbox.addLayer({
        id: 'state-fills',
        type: 'fill',
        source: 'country',
        'souce-layer': 'country',
        layout: {},
        paint: {
          'fill-color': programColorList,
        },
      })
    }
  }, [currentMapbox, mapData, mapData.features, programColorList])

  useEffect(() => {
    if (!isEmpty(mapData.features) && !isEmpty(currentMapbox)) {
      const borderLayer = currentMapbox.getLayer('state-borders')

      if (borderLayer) return

      currentMapbox.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'country',
        layout: {},
        paint: {
          'line-color': programBorderList,
        },
      })
    }
  }, [currentMapbox, mapData.features, programBorderList])

  useEffect(() => {
    if (!isEmpty(mapData.features) && !isEmpty(currentMapbox)) {
      currentMapbox.getSource('country').setData(mapData)
    }
  }, [currentMapbox, mapData, mapData.features])

  useEffect(() => {
    if (isEmpty(mapData.features) && !isEmpty(currentMapbox)) {
      const borderLayer = currentMapbox.getLayer('state-borders')
      if (borderLayer) currentMapbox.removeLayer('state-borders')

      const fillLayer = currentMapbox.getLayer('state-fills')
      if (fillLayer) currentMapbox.removeLayer('state-fills')
    }
  }, [currentMapbox, mapData.features])

  const currentSource = currentMapbox?.getSource('country')

  useEffect(() => {
    if (!isEmpty(currentMapbox)) {
      if (!currentSource) return

      currentMapbox.on('mousemove', 'state-fills', function(event) {
        const hoverId = event.features[0].properties.ISO_A2

        if (hoverIdref.current !== hoverId) {
          setCurrentInfo(event.features[0].properties)
          setCurrentPoint(event.point)
          setisHovering(true)
        }

        hoverIdref.current = hoverId
      })

      currentMapbox.on('mouseleave', 'state-fills', function(event) {
        setisHovering(false)
      })
    }
  }, [currentMapbox, currentSource])

  useEffect(() => {
    if (!isHovering && !isFocusPopup) {
      hoverIdref.current = null
      setCurrentInfo(null)
    }
  }, [isFocusPopup, isHovering])

  useEffect(() => {
    if (!isEmpty(mapboxRef.current)) {
      // 將 mapbox logo 拿掉
      const mapboxWording = mapboxRef?.current?.children

      mapboxWording[2].style.display = 'none'
    }
  }, [mapboxRef])

  return (
    <div css={style.mapWrapper()}>
      <div css={style.map()} id='map' ref={mapboxRef} />
      <Popup
        info={currentInfo}
        currentPoint={currentPoint}
        isHovering={isHovering}
        isFocusPopup={isFocusPopup}
        setIsFocusPopup={setIsFocusPopup}
        onMouseEnter={() => setIsFocusPopup(true)}
        onMouseLeave={() => setIsFocusPopup(false)}
      />
    </div>
  )
}

Map.propTypes = propTypes
Map.defaultProps = defaultProps

export default Map
