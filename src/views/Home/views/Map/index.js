// Libs
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import { mapStyleChange } from 'kepler.gl/dist/actions/map-style-actions'

import './css/style.css'
import './css/style.scss'
import './css/style.sass'
// import { showModal } from './app-reducer'
import { addDataToMap, wrapTo, toggleModal } from 'kepler.gl/dist/actions'
import { getpointsofinterest, loadRemoteMap } from './components/load-data-modal/actions'
import { MAPBOX_TOKEN } from 'constants/map'

import {
  SidebarFactory,
  PanelHeaderFactory,
  PanelToggleFactory,
  CustomPanelsFactory,
  // MapPopoverFactory,
  injectComponents,
  // CustomMapControlFactory
} from 'kepler.gl/dist/components'

import useGlobalState from 'globalState'

// Components
import CustomPanelHeaderFactory from './components/panel-header'
import CustomSidebarFactory from './components/side-bar'
import CustomPanelToggleFactory from './components/panel-toggle'
import CustomSidePanelFactory from './components/custom-panel'
import { replaceMapPopover } from './components/custom-popover'
import { replaceMapControl } from './components/map-control'
import { replaceModalContainer } from './components/custom-modal-container'
import { replaceMapContainer } from './components/custom-map-container'
import Modal from 'react-modal'

// import { replaceLoadDataModal } from './components/load-data-modal/load-data-modal'
// import { replaceAddData } from './components/customAddData'
// import { replaceExportImageModal } from './components/map-control/ExportImage/CustomImageModal'
// import { replaceModal } from './components/custom-modal'
// Style
import getStyle from './style'

const dataoptions = { readOnly: false, keepExistingConfig: true }

const loadingstyle = {
  overlay: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  content: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0)',
    width: '400px',
    height: '400px',
    border: '0px',
    top: '150px',
    left: '100px',
  },
}

const KeplerConfig = {
  version: 'v1',
  config: {
    mapState: {
      latitude: 45.71744567839883,
      longitude: 5.712893878184648,
      zoom: 1.169135220961345,
    },
    visState: {
      interactionConfig: {
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
      },
    },
  },
}

// PropTypes
export const propTypes = {
  dispatch: PropTypes.func,
  keplerGl: PropTypes.object,
  app: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

const KeplerGl = injectComponents([
  [SidebarFactory, CustomSidebarFactory],
  [PanelHeaderFactory, CustomPanelHeaderFactory], //
  [PanelToggleFactory, CustomPanelToggleFactory],
  [CustomPanelsFactory, CustomSidePanelFactory],
  replaceModalContainer(), // 因為在 custom modal container 裡已經注入了所有的 custom modal，所以這裡不用注入其他 custom modal
  // replaceLoadDataModal(),
  replaceMapPopover(),
  // replaceAddData(),
  replaceMapControl(),
  // replaceModal(),
  // replaceExportImageModal(),
  replaceMapContainer(),
])

function Map(props) {
  const style = getStyle(props)
  const { dispatch: reduxDispatch, keplerGl, app } = props
  const [state] = useGlobalState()
  const { theme } = state
  const isFirstRef = useRef(true)

  // console.log(keplerGl)

  useEffect(() => {
    if (keplerGl.map1 && keplerGl.map1.mapStyle && keplerGl.map1.mapStyle.styleType !== theme.mode) {
      reduxDispatch(mapStyleChange(theme.mode))
    }
  }, [keplerGl, reduxDispatch, theme.mode])

  // didMount 完才 setCurrentList，不然會得到 null

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false
    } else {
      // example http://localhost:8080/?startdate=2020-05-01&enddate=2020-05-02&country=Malaysia&campaign=ZeroChanceCampaign&datasource=Performance Data&style=Points&colourby=Languages&colours=Uber Viz Diverging 2&mapstyle=light&latitude=55.2333&longitude=44.11222&zoom=3.9&bearing=50
      const urlParams = new URLSearchParams(window.location.search)
      const datasets = urlParams.getAll('dataset')
      if (datasets[0] != null) {
        var mapstyle = urlParams.get('mapstyle')
        var latitude = urlParams.get('latitude')
        var longitude = urlParams.get('longitude')
        var zoom = urlParams.get('zoom')
        var bearing = urlParams.get('bearing')
        var pitch = urlParams.get('pitch')

        for (var x in datasets) {
          var slice = datasets[x].split('_')
          if (slice[0] === 'POI') {
            this.props.reduxDispatch(wrapTo('map1', addDataToMap({ datasets: null, options: dataoptions, config: KeplerConfig })))
            this.props.reduxDispatch(getpointsofinterest(slice[1], slice[3], slice[2]))
          } else {
            var startdate = slice[0]
            var enddate = slice[1]
            var country = slice[2]
            var campaign = slice[3]
            var datasource = slice[4]
            var style = slice[5]
            var colourby = slice[6]
            var colours = slice[7]

            reduxDispatch(wrapTo('map1', addDataToMap({ datasets: null, options: dataoptions, config: KeplerConfig })))
            reduxDispatch(
              loadRemoteMap(
                country,
                startdate,
                enddate,
                campaign,
                datasource,
                style,
                colourby,
                colours,
                mapstyle,
                latitude,
                longitude,
                zoom,
                bearing,
                pitch,
              ),
            )
          }
        }
      }
    }
  }, [reduxDispatch])

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false
    } else {
      reduxDispatch(wrapTo('map1', addDataToMap({ datasets: null, options: dataoptions, config: KeplerConfig })))
      reduxDispatch(toggleModal('addData'))
    }
  }, [reduxDispatch])

  return (
    <div css={style.mapWrapper()}>
      <Modal style={loadingstyle} isOpen={app.modal === 'loading'} ariaHideApp={false}>
        <div className='loadingio-spinner-ripple-acom643jsf9'>
          <div className='ldio-9qwatmc7qjd'>
            <div />
            <div />
          </div>
        </div>
      </Modal>
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id='map1' width={width} height={height} theme={theme.mode === 'dark' ? null : theme.mode} />
        )}
      </AutoSizer>
    </div>
  )
}

Map.propTypes = propTypes
Map.defaultProps = defaultProps

const mapStateToProps = state => state
const dispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, dispatchToProps)(Map)
