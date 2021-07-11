import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isEqual } from 'lodash'
import Campaign from './components/Campaign'

// Libs

// Components
import Icons from 'assets/icons'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  info: PropTypes.object,
  currentPoint: PropTypes.object,
  isHovering: PropTypes.bool,
  isFocusPopup: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function Popup(props) {
  const style = getStyle(props)

  const { info, currentPoint, isHovering, isFocusPopup, onMouseEnter, onMouseLeave } = props

  const [countryInfo, setCountryInfo] = useState([])
  const [currentProgram, setCurrentProgram] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const infoRef = useRef(null)

  useEffect(() => {
    if (isEqual(infoRef.current, info)) return

    if (!isEmpty(info)) {
      const newInfo = { ...info, data: JSON.parse(info.data) }

      infoRef.current = info
      setCountryInfo(newInfo)
    }
  }, [info])

  useEffect(() => {
    if (!isEmpty(countryInfo)) setCurrentProgram(countryInfo.data[currentIndex])
  }, [countryInfo, currentIndex])

  const onNextClick = () => {
    const maxIndex = countryInfo.data.length - 1

    if (currentIndex === maxIndex) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const onPreviousClick = () => {
    const maxIndex = countryInfo.data.length - 1

    if (currentIndex === 0) {
      setCurrentIndex(maxIndex)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div
      css={style.popup(currentPoint.x, currentPoint.y, isHovering || isFocusPopup)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave()
        setCurrentIndex(0)
      }}
    >
      {!isEmpty(countryInfo) && (
        <>
          <div css={style.programWrapper()}>
            <div css={style.programNameWrapper()}>
              {countryInfo?.data.length > 1 && <Icons.Arrow css={style.arrowIcon(true)} onClick={onPreviousClick} />}
              <div css={style.programName()}>{currentProgram?.programName}</div>
              {countryInfo?.data.length > 1 && <Icons.Arrow css={style.arrowIcon(false)} onClick={onNextClick} />}
            </div>
            {currentProgram?.campaigns?.map((campaign, index) => (
              <Campaign key={index} info={campaign} />
            ))}
            <p css={style.countryName()}>{countryInfo.ADMIN}</p>
          </div>
        </>
      )}
    </div>
  )
}

Popup.propTypes = propTypes
Popup.defaultProps = defaultProps

export default Popup
