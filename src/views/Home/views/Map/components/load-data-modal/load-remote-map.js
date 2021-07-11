import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

// THIS ONE OVERRIDES THE DEFAULT STYLING
import './colourdropdown/styles/datedropdown.css'

import { ColourDropdown, Dropdown } from './colourdropdown'

const propTypes = {
  handleLoadRemoteMap: PropTypes.func.isRequired,
  onGetColours: PropTypes.func,
  // getcolours: PropTypes.func.isRequired,
  // colours: PropTypes.arrayOf(PropTypes.object),
}

const InputForm = styled.div`
  flex-grow: 1;
  background-color: '#ffffff';
`

export const StyledInputLabel = styled.div`
  font-size: 11px;
  color: ${props => props.theme.textColorLT};
  letter-spacing: 0.2px;
  ul {
    padding-left: 12px;
  }
`

export const StyledBtn = styled.button`
  background-color: ${props => props.theme.primaryBtnActBgd};
  color: ${props => props.theme.primaryBtnActColor};
  float: 'right';
  height: '50px';
  width: '200px';
`

export const Styledselector = styled.select`
  background-color: ${props => props.theme.textColorLT};
  color: ${props => props.theme.textColorLT};
`

/* const Colour = ({ name, colours }) => <option value={name}>{name}</option> */

class LoadRemoteMap extends Component {
  constructor(props) {
    super(props)

    var colourprops = this.props
      .onGetColours()
      .filter(sp => sp.colors.length === 7 || sp.colors.length === 12)
      .sort(function(a, b) {
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return b.length - a.length
      })
      .map(obj => ({ ...obj, selected: false })) // sp.type ==  "sequential"

    this.state = {
      dataUrl: '',
      colours: colourprops,
      campaigns: [
        {
          id: 0,
          title: 'Zero Chance Campaign',
          selected: false,
          key: 'campaigns',
        },
        {
          id: 1,
          title: 'Hazel_Test',
          selected: false,
          key: 'campaigns',
        },
      ],
      countries: [
        {
          id: 0,
          title: 'Sri Lanka',
          selected: false,
          key: 'countries',
        },
        {
          id: 1,
          title: 'Malaysia',
          selected: false,
          key: 'countries',
        },
        {
          id: 2,
          title: 'Indonesia',
          selected: false,
          key: 'countries',
        },
        {
          id: 3,
          title: 'India',
          selected: false,
          key: 'countries',
        },
        {
          id: 4,
          title: 'Bangladesh',
          selected: false,
          key: 'countries',
        },
        {
          id: 5,
          title: 'Thailand',
          selected: false,
          key: 'countries',
        },
        {
          id: 6,
          title: 'Vietnam',
          selected: false,
          key: 'countries',
        },
        {
          id: 7,
          title: 'Iraq',
          selected: false,
          key: 'countries',
        },
        {
          id: 8,
          title: 'Iran',
          selected: false,
          key: 'countries',
        },
        {
          id: 9,
          title: 'Afghanistan',
          selected: false,
          key: 'countries',
        },
        {
          id: 10,
          title: 'Pakistan',
          selected: false,
          key: 'countries',
        },
        {
          id: 11,
          title: 'All Countries',
          selected: false,
          key: 'countries',
        },
      ],
      datasource: [
        {
          id: 0,
          title: 'Performance Data',
          selected: false,
          key: 'datasource',
        },
        {
          id: 1,
          title: 'Survey Data',
          selected: false,
          key: 'datasource',
        },
      ],
      colourby: [
        {
          id: 0,
          title: 'Single Colour',
          selected: false,
          key: 'colourby',
        },
        {
          id: 1,
          title: 'Category',
          selected: false,
          key: 'colourby',
        },
        {
          id: 2,
          title: 'Quantity',
          selected: false,
          key: 'colourby',
        },
      ],
      style: [
        {
          id: 0,
          title: 'Points',
          selected: false,
          key: 'style',
        },
        {
          id: 1,
          title: 'Heatmap',
          selected: false,
          key: 'style',
        },
        {
          id: 2,
          title: 'Hex Tiles',
          selected: false,
          key: 'style',
        },
        {
          id: 3,
          title: 'Cluster',
          selected: false,
          key: 'style',
        },
        {
          id: 4,
          title: 'GeoJson',
          selected: false,
          key: 'style',
        },
      ],
      mapstyling: [
        {
          id: 0,
          title: 'dark',
          selected: false,
          key: 'mapstyling',
        },
        {
          id: 1,
          title: 'muted_night',
          selected: false,
          key: 'mapstyling',
        },
        {
          id: 2,
          title: 'light',
          selected: false,
          key: 'mapstyling',
        },
        {
          id: 3,
          title: 'muted',
          selected: false,
          key: 'mapstyling',
        },
        {
          id: 4,
          title: 'satellite',
          selected: false,
          key: 'mapstyling',
        },
      ],
    }
    this.colours = this.props.onGetColours()
  }

  resetThenSet = (id, key) => {
    const temp = this.state[key]
    temp.forEach(item => (item.selected = false))
    temp[id].selected = true
    this.setState({
      [key]: temp,
    })
  }

  colourresetThenSet = (name, type) => {
    const temp = this.state.colours
    temp.forEach(item => (item.selected = false))
    temp.find(element => element.name === name).selected = true
    this.setState({
      colours: temp.sort((a, b) => (a.selected > b.selected ? -1 : 1)),
    })
  }

  handleLoadRemoteMap = () => {
    var countries = document.getElementById('countriesvalue').getElementsByClassName('dd-header-title')[0].textContent
    var startd = document.getElementById('dateselectstart').value
    var endd = document.getElementById('dateselectend').value
    var campa = document.getElementById('campaignvalue').getElementsByClassName('dd-header-title')[0].textContent
    var styles = document.getElementById('stylevalue').getElementsByClassName('dd-header-title')[0].textContent
    var datsource = document.getElementById('datasourcevalue').getElementsByClassName('dd-header-title')[0].textContent
    var colourby = document.getElementById('colourbyvalue').getElementsByClassName('dd-header-title')[0].textContent
    var colours = document.getElementById('colourvalue').getElementsByClassName('dd-header-title')[0].textContent
    var mapstyle = document.getElementById('mapstylevalue').getElementsByClassName('dd-header-title')[0].textContent
    this.props.handleLoadRemoteMap(countries, startd, endd, campa, datsource, styles, colourby, colours, mapstyle, null, null, null, null, null)
  }

  render() {
    return (
      <div>
        <InputForm>
          <div>
            <div style={{ float: 'left', width: '45%', marginRight: '60px' }}>
              <h1>DATA</h1>
              <div>
                <h4 className='dataheader'>Date Selector</h4>
                <div>
                  <DateRangePicker
                    hideKeyboardShortcutsPanel
                    noBorder
                    numberOfMonths={2}
                    minimumNights={0}
                    initialDate={null}
                    displayFormat='YYYY-MM-DD'
                    isOutsideRange={() => false}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId='dateselectstart' // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId='dateselectend' // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                  />
                </div>
              </div>

              <div>
                <h4 className='dataheader'>Campaign Selector</h4>
                <div id='campaignvalue'>
                  <Dropdown title='Select Campaign' list={this.state.campaigns} resetThenSet={this.resetThenSet} />
                </div>
              </div>

              <div>
                <h4 className='dataheader'>Country Selector</h4>
                <div id='countriesvalue'>
                  <Dropdown title='Select Country' list={this.state.countries} resetThenSet={this.resetThenSet} />
                </div>
              </div>

              <div>
                <h4 className='dataheader'>Data Source Selector</h4>
                <div id='datasourcevalue'>
                  <Dropdown title='Select Datasource' list={this.state.datasource} resetThenSet={this.resetThenSet} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ float: 'left', width: '45%' }}>
            <h1>STYLING</h1>

            <div>
              <h4 className='dataheader'>Style Selector</h4>
              <div id='stylevalue'>
                <Dropdown title='Select Style' list={this.state.style} resetThenSet={this.resetThenSet} />
              </div>
            </div>

            <div>
              <h4 className='dataheader'>Colour By Feature</h4>
              <div id='colourbyvalue'>
                <Dropdown title='Select feature to Colour' list={this.state.colourby} resetThenSet={this.resetThenSet} />
              </div>
            </div>
            <div>
              <h4 className='dataheader'>Colour Styling</h4>
              <div id='colourvalue'>
                <ColourDropdown name='Select Colour' list={this.state.colours} resetThenSet={this.colourresetThenSet} />
              </div>
            </div>

            <div>
              <h4 className='dataheader'>Map Styling</h4>
              <div id='mapstylevalue'>
                <Dropdown title='Select Map Style' list={this.state.mapstyling} resetThenSet={this.resetThenSet} />
              </div>

              <div style={{ marginTop: '25px' }} align='right'>
                <div className='button_cont'>
                  <a className='example_c' onClick={this.handleLoadRemoteMap}>
                    Fetch from the Database
                  </a>
                </div>
              </div>
            </div>
          </div>
        </InputForm>
      </div>
    )
  }
}

LoadRemoteMap.propTypes = propTypes

export default LoadRemoteMap
