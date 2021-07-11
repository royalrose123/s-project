import React from 'react'
import PropTypes from 'prop-types'
// import {preciseRound} from 'utils/data-utils';
// import {CursorClick} from 'components/common/icons';
import { StyledLayerName } from './layer-hover-info'

function preciseRound(num, decimals) {
  const t = Math.pow(10, decimals)
  return (Math.round(num * t + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals)
}

// 6th decimal is worth up to 0.11 m
// https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
const DECIMAL = 6

const CoordinateInfoFactory = () => {
  const propTypes = {
    coordinate: PropTypes.array,
  }

  const CoordinateInfo = ({ coordinate }) => (
    <div>
      <StyledLayerName className='map-popover__layer-name'>Coordinate</StyledLayerName>
      <table>
        <tbody>
          <tr className='row'>
            <td className='row__value'>{preciseRound(coordinate[1], DECIMAL)},</td>
            <td className='row__value'>{preciseRound(coordinate[0], DECIMAL)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  CoordinateInfo.propTypes = propTypes

  return CoordinateInfo
}

export default CoordinateInfoFactory
// <CursorClick height="12px" />
