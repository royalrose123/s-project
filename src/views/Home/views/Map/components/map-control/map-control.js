import React, { useState } from 'react'
import styled from 'styled-components'

import { MapControlFactory, Icons } from 'kepler.gl/dist/components'
import { IconRoundSmall, MapControlButton, Tooltip } from 'kepler.gl/dist/components/common/styled-components'
import { FormattedMessage } from 'react-intl'

// import { addDataToMap, wrapTo, toggleModal, toggleSidePanel } from 'kepler.gl/actions'
// import { getpointsofinterest, loadRemoteMap, reversegeocode } from '../load-data-modal/actions'
import PropTypes from 'prop-types'
import Chart from 'react-google-charts'

// const data = [
//   ['Year', 'Visitations', { role: 'style' }],
//   ['2010', 10, 'color: gray'],
//   ['2020', 14, 'color: gray'],
//   ['2030', 16, 'color: gray'],
//   ['2040', 22, 'color: gray'],
//   ['2050', 28, 'color: gray'],
// ]

const MapControlTooltipPropTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
}

const MapControlTooltip = React.memo(props => {
  const { id, message } = props

  return (
    <Tooltip id={id} place='left' effect='solid'>
      <span>
        <FormattedMessage id={message} />
      </span>
    </Tooltip>
  )
})

MapControlTooltip.propTypes = MapControlTooltipPropTypes
MapControlTooltip.displayName = 'MapControlTooltip'

function sumimpressions(props) {
  if (props.datasets.performancedata) {
    /* Get the text field */
    // wrapTo('map1', addDataToMap({datasets: null}));

    var array1 = props.datasets.performancedata.allData.map(function(value, index) {
      return [value[2], 1]
    })

    const groupBy = function(xs, key, red = (acc, curr) => [...acc, curr], init = []) {
      return xs.reduce(function(rv, curr) {
        const acc = rv[curr[key]] || init
        return { ...rv, [curr[key]]: red(acc, curr) }
      }, {})
    }

    // const ordersForDay = [
    //   ['product 1', 3],
    //   ['product 2', 2],
    //   ['product 1', 1],
    // ]
    const sumOfAmounts = (total, product) => total + product[1]
    const amountByProduct = groupBy(array1, 0, sumOfAmounts, 0) /// FIRST 0 Represents the column number, second 0 is the init?

    var output = Object.keys(amountByProduct).map(function(key) {
      return [key, amountByProduct[key], 'color: #0e9668; stroke-color: #ffffff; stroke-width: 1']
    })

    output.unshift([props.datasets.performancedata.fields[2].name, 'Count', { role: 'style' }])

    return output
  } else {
    return [['Language', 'Count']]
  }
}
/// /THE BELOW IS WORTH LOOKING INTO https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

/// ///////////////////

function copytoclipboard(properties) {
  /* Get the text field */
  // wrapTo('map1', addDataToMap({datasets: null}));
  let urlpart

  if (window.location.origin === 'http://localhost:8080') {
    urlpart = 'http://localhost:8080/'
  } else {
    urlpart = 'https://maps.atom.international'
  }

  var lat = properties.mapState.latitude
  var long = properties.mapState.longitude
  var zoomie = properties.mapState.zoom
  var bearing = properties.mapState.bearing
  var pitch = properties.mapState.pitch
  var mapstyle = properties.mapStyle.styleType

  var chunk = '/?'

  var dataid = properties.visState.layers
  for (const data in dataid) {
    console.log(dataid[data])

    if (dataid[data].config.label != null) {
      var splits = dataid[data].config.label.split('_')
    } else {
      console.log('empty id')
      continue
    }
    var startdate = splits[0]
    var enddate = splits[1]
    var campaign = splits[2]
    var countries = splits[3]
    var datasource = splits[4]
    var styling = splits[5]
    var colourby = splits[6]

    var colours = dataid[data].config.visConfig.colorRange.name

    console.log(lat, long, zoomie, bearing, pitch, startdate, enddate, campaign, countries, datasource, styling, colourby, colours, mapstyle)
    //    var addtostring = 'dataset'+data+'=[startdate='+startdate+'&enddate='+enddate+'&country='+countries+'&campaign='+campaign+'&datasource='+datasource+'&style='+styling+'&colourby='+colourby+'&colours='+colours + ']'\
    var addtostring =
      'dataset=' + startdate + '_' + enddate + '_' + countries + '_' + campaign + '_' + datasource + '_' + styling + '_' + colourby + '_' + colours
    if (data > 0) {
      chunk += '&'
    }
    chunk += addtostring
    // var copyText = 'http://localhost:8080/?startdate=2020-05-01&enddate=2020-05-02&country=Malaysia&campaign=ZeroChanceCampaign&datasource=Performance Data&style=Points&colourby=Languages&colours=Uber Viz Diverging 2&mapstyle=light&latitude=55.2333&longitude=44.11222&zoom=3.9&bearing=50'
  }
  var copyText =
    urlpart +
    chunk +
    '&mapstyle=' +
    mapstyle +
    '&latitude=' +
    lat +
    '&longitude=' +
    long +
    '&zoom=' +
    zoomie +
    '&bearing=' +
    bearing +
    '&pitch=' +
    pitch

  var el = document.createElement('textarea')
  el.value = copyText
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)

  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  /* Alert the copied text */
  alert('Copied the URL to clipboard')
}

const MapControl = MapControlFactory()

const StyledMapControlOverlay = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
`

const StyledFloatingPanel = styled.div`
  margin-right: 12px;
  margin-top: 10px;
  z-index: 100000;
`

const StyledProjectPanel = styled.div`
  background: ${props => props.theme.panelBackground};
  padding: 16px 20px;
  width: 380px;
  box-shadow: ${props => props.theme.panelBoxShadow};

  .project-title {
    color: ${props => props.theme.titleTextColor};
    font-size: 13px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
  }

  .project-description {
    color: ${props => props.theme.textColor};
    font-size: 11px;
    margin-top: 12px;

    a {
      font-weight: 500;
      color: ${props => props.theme.titleTextColor};
    }
  }

  .project-links {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`
const StyledPanelAction = styled.div`
  border-radius: 2px;
  margin-left: 4px;
  padding: 5px;
  font-weight: 500;
  z-index: 1000001;

  a {
    align-items: center;
    justify-content: flex-start;
    display: flex;
    height: 16px;
    padding-right: 10px;
    color: ${props => (props.active ? props.theme.textColorHl : props.theme.subtextColor)};

    svg {
      margin-right: 8px;
    }
  }

  :hover {
    cursor: pointer;
    a {
      color: ${props => props.theme.textColorHl};
    }
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.dropdownListBgd};
  box-shadow: ${props => props.theme.dropdownListShadow};
  font-size: 11px;
  padding: 16px 0;
  transition: ${props => props.theme.transitionSlow};
  margin-top: ${props => (props.show ? '6px' : '20px')};
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translateX(calc(-50% + 20px));
  pointer-events: ${props => (props.show ? 'all' : 'none')};
  z-index: 100000;

  .panel-header-dropdown__inner {
    box-shadow: none;
    background-color: transparent;
    display: flex;
  }

  .toolbar-item {
    align-items: center;
    border-right: 1px solid ${props => props.theme.panelHeaderIcon};
    padding: 0 22px;
    display: flex;
    flex-direction: column;

    .toolbar-item__title {
      white-space: nowrap;
      margin-top: 4px;
    }

    :hover {
      cursor: pointer;
      color: ${props => props.theme.textColorHl};
    }

    &:last-child {
      border-right: 0;
    }
  }
`

Toolbar.displayName = 'Toolbar'

const StyledDiv = styled.div.attrs({
  className: 'toolbar-item',
})`
  color: ${props => (props.active ? props.theme.titleTextColor : props.theme.textColor)};
`

const ToolbarItemPropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.string,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  label: PropTypes.string,
}

const ToolbarItem = React.memo(props => (
  <StyledDiv
    id={props.id}
    className={props.className}
    active={props.active}
    onClick={e => {
      e.stopPropagation()
      e.preventDefault()
      if (typeof props.onClose === 'function') {
        props.onClose()
      }
      props.onClick(e)
    }}
  >
    {props.icon && <props.icon />}
    <div className='toolbar-item__title'>
      <FormattedMessage id={props.label} />
    </div>
  </StyledDiv>
))

ToolbarItem.propTypes = ToolbarItemPropTypes

ToolbarItem.displayName = 'ToolbarItem'

const VerticalToolbar = styled(Toolbar)`
  flex-direction: column;
  padding: 0 24px;

  .toolbar-item {
    padding: 16px 0;
    border-right: 0;
    border-bottom: 1px solid ${props => props.theme.panelHeaderIcon};

    &:last-of-type {
      border-bottom: 0;
    }
  }
`

VerticalToolbar.displayName = 'VerticalToolbar'

const LinkButtonPropTypes = {
  href: PropTypes.string,
  height: PropTypes.string,
}

export const LinkButton = props => (
  <StyledPanelAction className='project-link__action'>
    <a target='_blank' rel='noopener noreferrer' href={props.href}>
      <props.iconComponent height={props.height || '16px'} />
    </a>
  </StyledPanelAction>
)

LinkButton.propTypes = LinkButtonPropTypes

const StyledToolbar = styled(VerticalToolbar)`
  position: absolute;
  right: 32px;
`

const CloseButtonPropTypes = {
  onClick: PropTypes.func,
}

const CloseButton = ({ onClick }) => (
  <IconRoundSmall>
    <Icons.Close height='16px' onClick={onClick} />
  </IconRoundSmall>
)

CloseButton.propTypes = CloseButtonPropTypes

// convert https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/nyctrips/config.json
// to https://github.com/uber-web/kepler.gl-data/blob/master/movement_pittsburgh/config.json
// function getURL(url) {
//   return url ? url.replace('https://raw.githubusercontent.com', 'https://github.com').replace('master', 'blob/master') : url
// }

const POIQueryPropTypes = {
  onGetPOI: PropTypes.func,
  mapState: PropTypes.object,
}

function POIQuery(props) {
  const { onGetPOI, mapState } = props

  const [isActive, setActive] = useState(false)

  return (
    <StyledFloatingPanel style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <MapControlButton
        onClick={e => {
          e.preventDefault()
          setActive(!isActive)
        }}
        data-tip
        data-for='POI'
      >
        <Icons.MapIcon height='18px'></Icons.MapIcon>
        <MapControlTooltip id='POI' message='Add Point of Interest Dataaaa' />
      </MapControlButton>

      <StyledToolbar show={isActive}>
        <ToolbarItem
          className='edit-feature'
          onClick={() => onGetPOI(mapState.latitude, mapState.longitude, mapState.zoom, 'Community')}
          label='Community'
          iconHeight='22px'
          icon={Icons.Crosshairs}
        />
        <ToolbarItem
          className='draw-feature'
          onClick={() => onGetPOI(mapState.latitude, mapState.longitude, mapState.zoom, 'Strategic')}
          label='Strategic'
          iconHeight='22px'
          icon={Icons.Warning}
        />
        <ToolbarItem
          className='draw-rectangle'
          onClick={() => onGetPOI(mapState.latitude, mapState.longitude, mapState.zoom, 'Development')}
          label='Development'
          iconHeight='22px'
          icon={Icons.Clipboard}
        />
      </StyledToolbar>
    </StyledFloatingPanel>
  )
}

POIQuery.propTypes = POIQueryPropTypes

const ScreenshotPropTypes = {
  onToggleModal: PropTypes.func,
}

function Screenshot(props) {
  const [isActive, setActive] = useState(false)

  return (
    <StyledFloatingPanel style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <MapControlButton
        onClick={e => {
          e.preventDefault()
          setActive(!isActive)
          props.onToggleModal('exportImage')
        }}
        data-tip
        data-for='Exportimage'
      >
        <Icons.Picture height='18px'></Icons.Picture>
        <MapControlTooltip id='Exportimage' message='Export an Image' />
      </MapControlButton>
    </StyledFloatingPanel>
  )
}

Screenshot.propTypes = ScreenshotPropTypes

const ExportdataPropTypes = {
  onToggleModal: PropTypes.func,
}

function Exportdata(props) {
  const [isActive, setActive] = useState(false)

  return (
    <StyledFloatingPanel style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <MapControlButton
        onClick={e => {
          e.preventDefault()
          setActive(!isActive)
          props.onToggleModal('exportData')
        }}
        data-tip
        data-for='DataExport'
      >
        <Icons.DataTable height='18px'></Icons.DataTable>
        <MapControlTooltip id='DataExport' message='Export Data' />
      </MapControlButton>
    </StyledFloatingPanel>
  )
}
Exportdata.propTypes = ExportdataPropTypes

function Sharemap(props) {
  const [isActive, setActive] = useState(false)

  return (
    <StyledFloatingPanel style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <MapControlButton
        onClick={e => {
          e.preventDefault()
          setActive(!isActive)
          copytoclipboard(props)
        }}
        data-tip
        data-for='Shares'
      >
        <Icons.Share height='18px'></Icons.Share>
        <MapControlTooltip id='Shares' message='Share the Map' />
      </MapControlButton>
    </StyledFloatingPanel>
  )
}

function Charts(props) {
  const [isActive, setActive] = useState(false)

  return (
    <StyledFloatingPanel style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isActive ? (
        <StyledProjectPanel>
          <div className='project-title'>
            <div>Map Statistics</div>
            <CloseButton onClick={() => setActive(false)} />
          </div>
          <div className='project-description'>
            <Chart
              width='100%'
              height='300px'
              chartType='BarChart'
              loader={<div>Loading Chart</div>}
              data={sumimpressions(props)}
              options={{
                title: 'Count by Languages',
                titleTextStyle: {
                  color: 'white',
                  bold: true,
                },
                chartArea: { width: '60%' },
                hAxis: {
                  title: 'Count',
                  minValue: 0,
                  textStyle: {
                    color: 'white',
                  },
                  titleTextStyle: {
                    color: 'white',
                  },
                },
                vAxis: {
                  title: 'Language',
                  color: 'white',
                  textStyle: {
                    color: 'white',
                  },
                  titleTextStyle: {
                    color: 'white',
                  },
                },
                legend: {
                  textStyle: {
                    color: 'white',
                  },
                  position: 'bottom',
                },
                backgroundColor: 'transparent',
                colors: ['0e9668'],
              }}
              // For tests
              rootProps={{ 'data-testid': '1' }}
              legendToggle
            />
          </div>
          <div className='project-links'>
            <MapControlButton
              onClick={e => {
                e.preventDefault()
                setActive(!isActive)
                sumimpressions(props)
              }}
              data-tip
              data-for='Countbytype'
            >
              <Icons.Histogram height='18px'></Icons.Histogram>
              <MapControlTooltip id='Countbytype' message='Grouped Bar Chart' />
            </MapControlButton>

            <MapControlButton
              onClick={e => {
                e.preventDefault()
                setActive(!isActive)
                sumimpressions(props)
              }}
              data-tip
              data-for='Demographicsbutton'
            >
              <Icons.LineChart height='18px'></Icons.LineChart>
              <MapControlTooltip id='Demographicsbutton' message='Demographics Data' />
            </MapControlButton>

            <MapControlButton
              onClick={e => {
                e.preventDefault()
                setActive(!isActive)
                sumimpressions(props)
              }}
              data-tip
              data-for='TimeDimension'
            >
              <Icons.Clock height='18px'></Icons.Clock>
              <MapControlTooltip id='TimeDimension' message='Details over time' />
            </MapControlButton>
          </div>
        </StyledProjectPanel>
      ) : (
        <MapControlButton
          onClick={e => {
            e.preventDefault()
            setActive(!isActive)
            sumimpressions(props)
          }}
          data-tip
          data-for='charts'
        >
          <Icons.LineChart height='18px'></Icons.LineChart>
          <MapControlTooltip id='charts' message='Data Specific Charts' />
        </MapControlButton>
      )}
    </StyledFloatingPanel>
  )
}

const CustomMapControl = props => (
  <StyledMapControlOverlay>
    <POIQuery {...props} />
    <Sharemap {...props} />
    <Exportdata {...props} />
    <Screenshot {...props} />
    <Charts {...props} />
    <MapControl {...props} />
  </StyledMapControlOverlay>
)

export default CustomMapControl
