import { toggleModal, updateMap, addDataToMap, wrapTo } from 'kepler.gl/actions'

// import OktaSignIn from '@okta/okta-signin-widget'
// import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import { COLOR_RANGES } from 'kepler.gl/src/constants/color-ranges'
import osmtogeojson from 'osmtogeojson'

import { processGeojson } from 'kepler.gl/processors'

import { showModal } from '../../app-reducer'

// colorRanges.find(({name}) => name ==== 'Global Warming');

// CONSTANTS
export const INIT = 'INIT'
export const SET_SAMPLE_LOADING_STATUS = 'SET_SAMPLE_LOADING_STATUS'

// ACTIONS
export function initApp() {
  return {
    type: INIT,
  }
}

export function setLoadingMapStatus(isMapLoading) {
  return {
    type: SET_SAMPLE_LOADING_STATUS,
    isMapLoading,
  }
}

export function togglemodal(modal) {
  return dispatch => {
    dispatch(toggleModal(modal))
  }
}

export function loadRemoteMap(
  countries,
  startd,
  endd,
  campa,
  datsource,
  styles,
  coloursets,
  colours,
  mapcolour,
  latitude,
  longitude,
  zoom,
  bearing,
  pitch,
) {
  return dispatch => {
    let colourby
    let colourtype
    if (coloursets === 'Category' && datsource !== 'Survey Data') {
      colourby = { name: 'languages', type: 'string' }
      colourtype = 'ordinal'
    }
    if (coloursets === 'Category' && datsource === 'Survey Data') {
      colourby = { name: 'largestdriver', type: 'string' }
      colourtype = 'ordinal'
    }
    if (coloursets === 'Quantity') {
      console.log('this triggered')
      colourby = { name: 'sum', type: 'integer' }
      colourtype = 'quantile'
      console.log(colourby)
    }
    if (coloursets === 'Single Colour') {
      colourby = null
      colourtype = null
      console.log('single colour got triggered')
    }

    console.log(colours)
    colours = COLOR_RANGES.find(colour => colour.name === colours)
    if (colours === null) {
      colours = {
        name: 'Pink Wine 7',
        type: 'sequential',
        category: 'Uber',
        colors: ['#2C1E3D', '#4F315A', '#774976', '#956485', '#B28294', '#CFA4A8', '#EDD1CA'],
      }
      console.log(colours)
    }

    var dataid = startd + '_' + endd + '_' + campa + '_' + countries + '_' + datsource + '_' + styles + '_' + coloursets

    dispatch(setLoadingMapStatus(true))
    dispatch(toggleModal(null))
    dispatch(showModal('loading'))

    var style = null
    const dataoptions = { readOnly: false, keepExistingConfig: true }

    var mapstate = {
      bearing: 0,
      dragRotate: false,
      latitude: 5.395279769661643,
      longitude: 100.31427283582383,
      pitch: 0,
      zoom: 12.175451627084428,
      isSplit: false,
    }

    var interactionConfig = {
      tooltip: {
        fieldsToShow: {
          performancedata: ['mobile_id', 'languages'],
        },
        enabled: true,
      },
      brush: {
        size: 0.5,
        enabled: false,
      },
      coordinate: {
        enabled: true,
      },
    }

    var mapstyle = {
      styleType: mapcolour,
      topLayerGroups: {},
      visibleLayerGroups: {
        label: true,
        road: true,
        border: false,
        building: true,
        water: true,
        land: true,
        '3d building': false,
      },
      threeDBuildingColor: [218.82023004728686, 223.47597962276103, 223.47597962276103],
      mapStyles: {},
    }

    var hex = [
      {
        id: '16h6btk',
        type: 'hexagon',
        config: {
          dataId: 'performancedata',
          label: dataid,
          columns: { lat: 'latitude', lng: 'longitude' },
          isVisible: true,
          visConfig: {
            opacity: 0.5,
            worldUnitSize: 0.35,
            resolution: 8,
            colorRange: colours,
            coverage: 1,
            sizeRange: [0, 500],
            percentile: [0, 100],
            elevationPercentile: [0, 100],
            elevationScale: 5,
            colorAggregation: 'count',
            sizeAggregation: 'count',
            enable3d: false,
          },
          textLabel: [],
        },
        visualChannels: {
          colorField: colourby,
          colorScale: colourtype,
          sizeField: null,
          sizeScale: 'linear',
        },
      },
    ]

    var cluster = [
      {
        id: 'eiq0fdl',
        type: 'cluster',
        config: {
          dataId: 'performancedata',
          label: dataid,
          columns: {
            lat: 'latitude',
            lng: 'longitude',
          },
          isVisible: true,
          visConfig: {
            opacity: 0.5,
            clusterRadius: 40,
            colorRange: colours,
            radiusRange: [1, 40],
            colorAggregation: 'count',
          },
          textLabel: [],
        },
        visualChannels: {
          colorField: colourby,
          colorScale: colourtype,
          sizeField: null,
          sizeScale: 'linear',
        },
      },
    ]

    var point = [
      {
        id: '3nl4e3h',
        type: 'point',
        config: {
          dataId: 'performancedata',
          label: dataid,
          columns: {
            lat: 'latitude',
            lng: 'longitude',
            altitude: null,
          },
          isVisible: true,
          visConfig: {
            radius: 10,
            fixedRadius: false,
            opacity: 0.8,
            outline: false,
            thickness: 2,
            strokeColor: null,
            colorRange: colours,
            strokeColorRange: colours,
            radiusRange: [0, 50],
            filled: true,
          },
          textLabel: [],
        },
        visualChannels: {
          colorField: colourby,
          colorScale: colourtype,
          strokeColorField: null,
          strokeColorScale: 'quantile',
          sizeField: null,
          sizeScale: 'linear',
        },
      },
    ]

    var heatmap = [
      {
        id: '1t7nslb',
        type: 'heatmap',
        config: {
          dataId: 'performancedata',
          label: dataid,
          color: [16, 129, 136],
          columns: {
            lat: 'latitude',
            lng: 'longitude',
          },
          isVisible: true,
          visConfig: {
            opacity: 0.8,
            colorRange: colours,
            radius: 20,
          },
          textLabel: [],
        },
        visualChannels: {
          weightField: null,
          weightScale: 'linear',
        },
      },
    ]

    var geojson = [
      {
        id: 'SurveyCentre',
        type: 'point',
        config: {
          dataId: 'Surveys',
          label: dataid,
          columns: {
            lat: 'lat',
            lng: 'lng',
            altitude: null,
          },
          isVisible: true,
          visConfig: {
            radius: 10,
            fixedRadius: false,
            opacity: 0.8,
            outline: false,
            thickness: 2,
            radiusRange: [0, 50],
            filled: true,
          },
          textLabel: [
            {
              field: {
                name: 'name',
                type: 'string',
              },
              color: [255, 255, 255],
              size: 18,
              offset: [0, 0],
              anchor: 'middle',
              alignment: 'top',
            },
            {
              field: {
                name: 'sum',
                type: 'integer',
              },
              color: [255, 255, 255],
              size: 18,
              offset: [0, 0],
              anchor: 'middle',
              alignment: 'center',
            },
            {
              field: {
                name: 'largestdrivervalue',
                type: 'string',
              },
              color: [255, 255, 255],
              size: 18,
              offset: [0, 0],
              anchor: 'middle',
              alignment: 'bottom',
            },
          ],
        },
        visualChannels: {
          colorField: null,
          colorScale: 'ordinal',
          strokeColorField: null,
          strokeColorScale: 'quantile',
          sizeField: null,
          sizeScale: 'linear',
        },
      },
      {
        id: 'Surveys',
        type: 'geojson',
        visualChannels: {
          colorField: colourby,
          colorScale: colourtype,
          strokeColorField: null,
        },
        config: {
          dataId: 'Surveys',
          label: dataid,
          // "color":[231,159,213]
          columns: {
            geojson: '_geojson',
          },
          isVisible: true,
          visConfig: {
            opacity: 0.8,
            strokeOpacity: 0.8,
            thickness: 0.5,
            strokeColor: [30, 150, 190],
            colorRange: colours,
            radius: 10,
            sizeRange: [0, 10],
            radiusRange: [0, 50],
            heightRange: [0, 500],
            elevationScale: 5,
            stroked: true,
            filled: true,
            enable3d: false,
            wireframe: false,
          },
        },
      },
    ]

    switch (styles) {
      case 'Points':
        style = point
        break
      case 'Hex Tiles':
        style = hex
        break
      case 'Heatmap':
        style = heatmap
        break
      case 'GeoJson':
        style = geojson
        break
      case 'Cluster':
        style = cluster
        break
    }

    var configsetup = {
      version: 'v1',
      config: {
        visState: {
          filters: [],
          layers: style,
          interactionConfig: interactionConfig,
          layerBlending: 'normal',
          splitMaps: [],
          animationConfig: {
            currentTime: null,
            speed: 1,
          },
        },
        mapState: mapstate,
        mapStyle: mapstyle,
      },
    }
    console.log(configsetup)

    const data = getpoints(countries, startd, endd, campa, datsource).then(data => {
      dispatch(wrapTo('map1', addDataToMap({ datasets: data, options: dataoptions, config: configsetup })))
      dispatch(showModal(null))

      if (latitude !== null) {
        console.log(latitude, longitude, zoom)
        dispatch(
          updateMap({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            zoom: parseFloat(zoom),
            bearing: parseFloat(bearing),
            pitch: parseFloat(pitch),
          }),
        )
      }

      // this.props.showModal(null);
    })

    return data
  }
}

function getpoints(countries, startd, endd, campa, datsource) {
  // // let oktaclientId
  // // if (window.location.origin === 'http://localhost:8080') {
  // //   oktaclientId = '0oacx9prn7qhMNRZi4x6'
  // // } else {
  // //   oktaclientId = '0oacx9mtxatCb0mN24x6'
  // // }

  const startdate = startd + ' 00:00:00'
  const enddate = endd + ' 00:00:00'

  const country = countries
  const campaign = campa
  const datasource = datsource

  // var oktaSignIn = new OktaSignIn({
  //   baseUrl: 'https://atom.okta.com',
  //   redirectUri: window.location.origin,
  //   clientId: oktaclientId, // 0oaawjrqvPX9RyV234x6
  //   authParams: {
  //     pkce: true,
  //     responseMode: 'query',
  //   },
  // })

  const token = window.localStorage.getItem('ACCESS_TOKEN')

  console.log('token 4444444', token)

  var url =
    'https://maps.atom.international/getpoints?token=' +
    token +
    '&country=' +
    country +
    '&startdate=' +
    startdate +
    '&enddate=' +
    enddate +
    '&campaign=' +
    campaign +
    '&datasource=' +
    datasource

  const getData = async url => {
    console.log('url 00000:>> ', url)
    try {
      const response = await fetch(url)
      console.log('response 11111', response)
      const json = await response.json()
      console.log('json 22222', json)
      const rows = []
      const fieldlist = Object.keys(json[0])

      const fields = []
      for (let i = 0; i < fieldlist.length; i++) {
        fields.push({ name: fieldlist[i] })
      }

      for (let i = 0; i < json.length; i++) {
        rows.push(Object.values(json[i]))
      }

      const data = {
        info: {
          label: 'Test_Data',
          id: 'performancedata',
        },
        data: {
          rows: rows,
          fields: fields,
        },
      }

      return data
    } catch (error) {
      return error
    }
  }

  const data = getData(url)

  return data
}

/**
 *
 * @param sampleMapId optional if we pass the sampleMapId, after fetching
 * map sample configurations we are going to load the actual map data if it exists
 * @returns {function(*)}
 */
export function getcolours(colourid = null) {
  return dispatch => {
    return COLOR_RANGES
  }
}

export function getpointsofinterest(latitude, longitude, zoom, ammenity) {
  return dispatch => {
    console.log(latitude)
    console.log(longitude)
    console.log(zoom)
    console.log(ammenity)
    var lookup = ''
    var key = ''
    switch (ammenity) {
      case 'Community':
        key = 'amenity'
        lookup = 'place_of_worship'
        break
      case 'Strategic':
        key = 'landuse'
        lookup = 'military'
        break
      case 'Development':
        key = 'landuse'
        lookup = 'construction'
        break
    }

    const poioptions = { readOnly: false, keepExistingConfig: true, centerMap: false }

    dispatch(showModal('loading'))

    const overpassquery =
      '%3Cunion%3E%0D%0A++++%3Cquery+type%3D%22way%22%3E%0D%0A++++++%3Chas-kv+k%3D%22' +
      key +
      '%22+v%3D%22' +
      lookup +
      '%22%2F%3E%0D%0A++++++%3Cbbox-query+s%3D%22' +
      (latitude - 0.1) +
      '%22+w%3D%22' +
      (longitude - 0.1) +
      '%22+n%3D%22' +
      (latitude + 0.1) +
      '%22+e%3D%22' +
      (longitude + 0.1) +
      '%22%2F%3E%0D%0A++++%3C%2Fquery%3E%0D%0A++++%3Cquery+type%3D%22node%22%3E%0D%0A++++++%3Chas-kv+k%3D%22' +
      key +
      '%22+v%3D%22' +
      lookup +
      '%22%2F%3E%0D%0A++++++%3Cbbox-query+s%3D%22' +
      (latitude - 0.1) +
      '%22+w%3D%22' +
      (longitude - 0.1) +
      '%22+n%3D%22' +
      (latitude + 0.1) +
      '%22+e%3D%22' +
      (longitude + 0.1) +
      '%22%2F%3E%0D%0A++++%3C%2Fquery%3E%0D%0A++%3C%2Funion%3E%0D%0A++%3Cunion%3E%0D%0A++++%3Citem%2F%3E%0D%0A++++%3Crecurse+type%3D%22down%22%2F%3E%0D%0A++%3C%2Funion%3E%0D%0A++%3Cprint%2F%3E'

    const overpassurl = 'https://lz4.overpass-api.de/api/interpreter?data=' + overpassquery
    const getoverpass = async url => {
      const partial = await fetch(url)
      const text = await partial.text()

      const parser = new DOMParser()
      const response = parser.parseFromString(text, 'text/xml')
      const data = await osmtogeojson(response)
      return data
    }

    // this.props.onLoadRemoteMap(showModal(null));
    // this.props.onLoadRemoteMap(showModal('loading'))
    const data = getoverpass(overpassurl).then(data => {
      dispatch(
        wrapTo(
          'map1',
          addDataToMap({
            datasets: {
              info: {
                label: 'POI' + '_' + latitude + '_' + longitude + '_' + zoom,
                id: 'pointsofinterest',
              },
              data: processGeojson(data),
            },
            options: poioptions,
          }),
        ),
      )
      dispatch(showModal(null))
    })

    return data
  }
}

export function reversegeocode(latitude, longitude) {
  return dispatch => {
    console.log(latitude)
    console.log(longitude)

    if (document.getElementsByClassName('map-popover__table').length === 0) {
      var element = document.getElementsByClassName('map-popover')[0]
      console.log(element)
      var div = document.createElement('div')
      div.className = 'map-popover__layer-info'

      element.appendChild(div)

      var table = document.createElement('table')
      table.className = 'map-popover__table'
      div.appendChild(table)

      var tbody = document.createElement('tbody')
      table.appendChild(tbody)
    }

    // dispatch(showModal('loading'))
    // var element = document.getElementsByClassName('map-popover__table')[0].children[0]
    // console.log(element)

    var el = document.createElement('tr')
    el.className = 'row'
    element.appendChild(el)

    var address = document.createElement('td')
    address.className = 'row__name'
    address.innerHTML = 'Address'
    el.appendChild(address)

    const addressvalue = document.createElement('td')
    addressvalue.innerHTML = 'Loading...'
    addressvalue.className = 'row__value'
    el.appendChild(addressvalue)

    const reversegeocodeurl = 'https://nominatim.openstreetmap.org/reverse.php?format=jsonv2&lat=' + latitude + '&lon=' + longitude + '&zoom=30'

    const reversegeocodedata = async url => {
      const data = await fetch(url)
      // const text = await partial.text()

      // const parser = new DOMParser();
      // const response = parser.parseFromString(text,"text/xml");
      // const data = await osmtogeojson(response);
      return data.json()
    }

    // this.props.onLoadRemoteMap(showModal(null));
    // this.props.onLoadRemoteMap(showModal('loading'))
    const data = reversegeocodedata(reversegeocodeurl).then(data => {
      // dispatch(showModal(null))
      console.log(data)
      addressvalue.innerHTML = data.display_name
    })

    return data
  }
}
