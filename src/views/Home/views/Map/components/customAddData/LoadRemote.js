import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { subDays } from 'date-fns'
import { isArray, isEmpty } from 'lodash'

import DatePicker from 'basicComponents/DatePicker'
import Select from 'basicComponents/Select'
import refreshIcon from 'assets/icons/svg/refresh.svg'

import fakeData from './remoteFakeData.json'

import useFetcher from 'effects/useFetcher'
import { fetchCampaignList } from 'api/Gallery/fetchCampaignList'

const StyledText = styled.span`
  //font-family: OpenSans;
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'bold')};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: ${props => (props.color ? props.color : '#2c313a')};
`

const StyledItem = styled.div`
  cursor: ${props => (props.cursor ? props.cursor : 'auto')};
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  width: ${props => (props.width ? props.width : 'auto')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.items ? props.items : 'stretch')};
  margin-bottom: ${props => (props.withBottom ? '31px' : 0)};
  margin-top: ${props => (props.withTop ? '60px' : 0)};
`

const StyledButton = styled.button`
  width: 140px;
  height: 40px;
  font-weight: bold;
  border: ${props => (props.type === 'primary' ? 'none' : 'solid 1px #586274')};
  color: ${props => (props.disabled ? '#9da3ad !important' : props.type === 'primary' ? '#fff' : '#586274')};
  background-color: ${props => (props.disabled ? '#c7cace !important' : props.type === 'primary' ? '#586274' : 'fff')};
`

const StyledSelect = styled(Select)`
  width: 195px;
  vertical-align: text-bottom;
`

const StyledHr = styled.div`
  width: 10px;
  height: 1px;
  margin: 0px 10px;
  flex-shrink: 0;
  background-color: #2c313a;
`
const StyledImg = styled.img`
  margin-right: 8px;
`
const initialState = {
  startDate: '',
  endDate: '',
  campaign: '',
  country: '',
  source: '',
  styled: '',
}

function reducer(prevState, updatedProperty) {
  return { ...prevState, ...updatedProperty }
}

function LoadRemote(props) {
  const { onCancel, handleLoadRemoteMap, onConfirm } = props
  const [state, setState] = useReducer(reducer, initialState)
  const [DCMCampaignList, setDCMCampaignList] = useState([])
  const [CMPCampaignList, setCMPCampaignList] = useState([])
  const [mapCampaignList, setMapCampaignList] = useState([])

  const token = window.localStorage.getItem('ACCESS_TOKEN')

  const { response, isLoaded, isFetching } = useFetcher(fetchCampaignList)

  useEffect(() => {
    if (isLoaded && !isFetching && isArray(response)) {
      setCMPCampaignList(response)
    }
  }, [isFetching, isLoaded, response])

  useEffect(() => {
    if (!isEmpty(DCMCampaignList) && !isEmpty(CMPCampaignList)) {
      const filteredCMPCampaignList = CMPCampaignList.filter(CMPItem => DCMCampaignList.find(DCMItem => DCMItem.campaignid === CMPItem.paramId))

      const mappedCampaignList = filteredCMPCampaignList
        .map(CMPItem => {
          const temp = DCMCampaignList.find(DCMItem => DCMItem.campaignid === CMPItem.paramId)
          return {
            ...CMPItem,
            DCMCampaignName: temp.project,
          }
        })
        .map(item => ({ label: item.campaignName, value: item.DCMCampaignName, paramId: item.paramId }))

      setMapCampaignList(mappedCampaignList)
    }
  }, [CMPCampaignList, DCMCampaignList])

  const currentCountryList = campaignId => {
    const allCountriesOption = { label: 'All Countries', value: 'All Countries' }

    const countryOptions = DCMCampaignList.filter(item => item.campaignid === campaignId).map(item => ({ label: item.country, value: item.country }))
    countryOptions.unshift(allCountriesOption)

    return countryOptions
  }

  useEffect(() => {
    if (!token) return

    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://maps.atom.international/getcountriesandprojects?token=${token}`)

        const json = await response.json()

        if (isArray(json)) {
          setDCMCampaignList(json)
        }
      } catch (error) {
        console.error(error)
        return error
      }
    }

    fetchCountry()
  }, [token])

  const submit = () => {
    handleLoadRemoteMap(
      state.country.label,
      state.startDate.toLocaleDateString().replace(/\//g, '-'),
      state.endDate.toLocaleDateString().replace(/\//g, '-'),
      state.campaign.value,
      state.source.label,
      state.styled.label,
      'Single Colour',
      'Uber Viz Sequential 5',
      'dark',
      null,
      null,
      null,
      null,
      null,
    )
    onConfirm()
  }

  return (
    <>
      <StyledItem withBottom>
        <StyledText>Campaign Running Date</StyledText>
        <StyledItem direction='row' items='center'>
          <DatePicker
            selected={state.startDate}
            onChange={value => setState({ startDate: value })}
            inputProps={{
              placeholderValue: 'Select Date',
              datePickerWidth: '195px',
              withoutShadow: true,
              withoutPadding: true,
            }}
            maxDate={state.endDate ? subDays(state.endDate, 0) : new Date()}
          />
          <StyledHr />
          <DatePicker
            selected={state.endDate}
            onChange={value => setState({ endDate: value })}
            minDate={subDays(state.startDate, 0)}
            inputProps={{ placeholderValue: 'Select Date', datePickerWidth: '195px', withoutShadow: true }}
            maxDate={new Date()}
          />
        </StyledItem>
      </StyledItem>
      <StyledItem direction='row' withBottom justify='space-between' width='420px'>
        <StyledItem>
          <StyledText>Campaign</StyledText>
          <StyledSelect
            isSearchable={false}
            placeholder='Select Campaign'
            options={mapCampaignList}
            value={state.campaign}
            onChange={value => setState({ campaign: value })}
          />
        </StyledItem>
        <StyledItem>
          <StyledText>Country</StyledText>
          <StyledSelect
            isSearchable={false}
            placeholder='Select Country'
            options={currentCountryList(state.campaign.paramId)}
            value={state.country}
            onChange={value => setState({ country: value })}
          />
        </StyledItem>
      </StyledItem>
      <StyledItem direction='row' withBottom justify='space-between' width='420px'>
        <StyledItem>
          <StyledText>Data Source</StyledText>
          <StyledSelect
            isSearchable={false}
            placeholder='Select Data Source'
            options={fakeData.datasource}
            value={state.source}
            onChange={value => setState({ source: value })}
          />
        </StyledItem>
        <StyledItem>
          <StyledText>Styled</StyledText>
          <StyledSelect
            isSearchable={false}
            placeholder='Select Style'
            options={fakeData.styled}
            value={state.styled}
            onChange={value => setState({ styled: value })}
          />
        </StyledItem>
      </StyledItem>
      <StyledItem direction='row' withTop width='100%' justify='space-between'>
        <StyledItem direction='row' items='flex-end' onClick={() => setState(initialState)} cursor='pointer'>
          <StyledImg src={refreshIcon} />
          <StyledText fontSize='16px' color='#2c313a' fontWeight='normal'>
            Clear
          </StyledText>
        </StyledItem>
        <StyledItem direction='row' width='300px' justify='space-between'>
          <StyledButton onClick={onCancel}>Cancel</StyledButton>
          <StyledButton type='primary' onClick={submit} disabled={Object.values(state).some(stateValue => !stateValue)}>
            Confirm
          </StyledButton>
        </StyledItem>
      </StyledItem>
    </>
  )
}

LoadRemote.propTypes = {
  onCancel: PropTypes.func,
  handleLoadRemoteMap: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default LoadRemote
