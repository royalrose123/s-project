import React from 'react'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import getStyle from './style'
import ComparisonCard from './components/ComparisonCard'

// Variables / Functions

export const propTypes = {
  isVideo: PropTypes.bool,
  comparisonData: PropTypes.object,
}

function Comparison(props) {
  const { isVideo, comparisonData } = props
  const style = getStyle(props)

  const { impressions, clicks, views, engagement } = comparisonData.result

  return (
    <div css={style.comparisonWrapper()}>
      <ComparisonCard title='Impressions' data={impressions} />
      <ComparisonCard title='Clicks' data={clicks} />
      {isVideo && <ComparisonCard title='Views' data={views} />}
      <ComparisonCard title='Social Engagement' data={engagement} />
    </div>
  )
}

Comparison.propTypes = propTypes

export default Comparison
