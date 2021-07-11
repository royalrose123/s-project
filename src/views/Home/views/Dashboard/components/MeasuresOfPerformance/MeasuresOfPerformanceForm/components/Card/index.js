// Libs
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import abbreviate from 'number-abbreviate'
import { toUpper, isNull, isNumber } from 'lodash'

// Components
import Icons from 'assets/icons'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  programData: PropTypes.object,
  itemsPerColumn: PropTypes.number,
  setIsSliderBodyOverflowHidden: PropTypes.func,
}

// big number converter
const abbreviatedFigure = number => {
  if (typeof number !== 'number') return '-'
  const inputNumber = Number(number)
  return toUpper(abbreviate(inputNumber))
    .split('.')
    .join(',')
}

const CARD_GAP = 10 // in pixel

const getGrowthRateIcon = growthRate => {
  if (!isNumber(growthRate)) return

  if (growthRate > 0) {
    return <Icons.Increase />
  } else if (growthRate < 0) {
    return <Icons.Decrease />
  } else {
    return <Icons.Equal />
  }
}

const getGrowthRateFigure = growthRate => {
  if (!isNumber(growthRate)) return
  return `${growthRate.toFixed(2)}%`
}

// DefaultProps
export const defaultProps = {}

function Card(props) {
  const { programData, itemsPerColumn, setIsSliderBodyOverflowHidden } = props
  const style = getStyle(props)
  const { programName, totalImpressions, impressionsGrowthRate, totalClicks, clicksGrowthRate, campaigns = [], clientName } = programData

  const dropdownRef = useRef(null)

  const allCampaignsCount = campaigns.length
  const liveCampaignsList = campaigns.filter(item => item.isLive)
  const liveCampaignsCount = liveCampaignsList.length

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [dropdownHeight, setDropdownHeight] = useState(0)

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.offsetHeight)
    }
  }, [programData])

  const onViewDetailClick = campaignId => {
    // history.push('/home/')
    // alert('Will go to Quick Sight page')
  }

  const toggleDropdownClick = () => {
    setIsDropDownOpen(prevState => !prevState)
    setIsSliderBodyOverflowHidden(false)
  }

  const onBlur = () => {
    // 等待 300ms 再關閉，如此 view details 才可以點擊得到，並觸發 onClick 事件
    setTimeout(() => setIsDropDownOpen(false), 300)
  }

  return (
    <>
      <div css={style.card({ itemsPerColumn, cardGap: CARD_GAP })}>
        <div css={style.cardHeader()}>
          <div css={style.cardHeaderProgram()}>{programName}</div>
          {clientName && (
            <div css={style.cardHeaderClient()}>
              <span css={style.cardHeaderClientText()}>{clientName}</span>
            </div>
          )}
        </div>
        <div css={style.cardBody()}>
          <div css={style.columnWrapper()}>
            <div css={style.columnTitle()}>Impressions</div>
            <div css={style.columnFigure()}>{abbreviatedFigure(totalImpressions)}</div>
            <div css={style.columnGrowthRateWrapper()}>
              {!isNull(impressionsGrowthRate) && isNumber(impressionsGrowthRate) && (
                <div css={style.columnGrowthRate(impressionsGrowthRate)}>
                  {getGrowthRateIcon(impressionsGrowthRate)}
                  <span css={style.columnGrowthRateText()}>{getGrowthRateFigure(impressionsGrowthRate)}</span>
                </div>
              )}
            </div>
          </div>
          <div css={style.columnWrapper()}>
            <div css={style.columnTitle()}>Clicks</div>
            <div css={style.columnFigure()}>{abbreviatedFigure(totalClicks)}</div>
            <div css={style.columnGrowthRateWrapper()}>
              {!isNull(clicksGrowthRate) && isNumber(clicksGrowthRate) && (
                <div css={style.columnGrowthRate(clicksGrowthRate)}>
                  {getGrowthRateIcon(clicksGrowthRate)}
                  <span css={style.columnGrowthRateText()}>{getGrowthRateFigure(clicksGrowthRate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div css={style.cardFooter()}>
          <div css={style.liveCampaigns()}>
            <span css={style.liveCampaignsMarker(true)}>●</span>Live Campaigns ({liveCampaignsCount})
          </div>
          <button type='button' css={style.campaigns()} onClick={toggleDropdownClick} onBlur={onBlur}>
            All Campaigns ({allCampaignsCount})
            <Icons.Caret css={style.allCampaignsIcon(isDropDownOpen)} />
          </button>
        </div>

        <div css={style.allCampaignsDropDown({ isOpened: isDropDownOpen, dropdownHeight })}>
          <div ref={dropdownRef}>
            {campaigns.map(campaign => (
              <div key={Math.random()} css={style.campaignItem()}>
                <div css={style.campaignItemHeader()}>
                  <div css={style.campaignItemTitle()}>
                    {campaign.campaignName && <span css={style.liveCampaignsMarker(campaign.isLive)}>●</span>}
                    <span css={style.campaignItemTitleText()}>{campaign.campaignName}</span>
                  </div>
                  <div css={style.viewDetails()} onClick={onViewDetailClick}>
                    View Details
                  </div>
                </div>
                <div css={style.campaignItemBody()}>
                  <div css={style.campaignItemBodyColumn()}>
                    <div css={style.campaignItemSubtitle()}>Impressions</div>
                    <div css={style.campaignItemFigure()}>{campaign.result?.impressions?.result?.toLocaleString() || '-'}</div>
                  </div>
                  <div css={style.campaignItemBodyColumn()}>
                    <div css={style.campaignItemSubtitle()}>Clicks</div>
                    <div css={style.campaignItemFigure()}>{campaign.result?.clicks?.result?.toLocaleString() || '-'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

export default Card
