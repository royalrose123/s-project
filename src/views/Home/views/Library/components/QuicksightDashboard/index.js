// Libs
import React, { useEffect, useRef } from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'
import { embedDashboard } from 'amazon-quicksight-embedding-sdk'
import useQuicksightUrl from '../../hooks/useQuicksightUrl'
import Lottie from 'react-lottie'

// Components
import animationData from 'assets/icons/lottie/loading.json'

// Lib MISC

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  dashboardId: PropTypes.string,
}

// DefaultProps
export const defaultProps = {}

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

function QuicksightDashboard(props) {
  const style = getStyle(props)
  const { dashboardId } = props
  const quicksightRef = useRef(null)

  const { embeddedUrl, isLoaded: isQuicksightLoaded } = useQuicksightUrl(dashboardId)

  useEffect(() => {
    if (quicksightRef.current && embeddedUrl) {
      const options = {
        url: embeddedUrl,
        container: quicksightRef.current,
        // TODO: 官方範例有給 country, states，但目前不確定用不用的到，所以先註解掉
        // https://github.com/awslabs/amazon-quicksight-embedding-sdk
        // parameters: {
        //   country: 'United States',
        //   states: ['California', 'Washington'],
        // },
        scrolling: 'no',
        height: quicksightRef.current.offsetHeight,
        width: '100%',
        locale: 'en-US',
        footerPaddingEnabled: true,
        // TODO: 官方範例有給 defaultEmbeddingVisualType，但目前不確定用不用的到，所以先註解掉
        // https://github.com/awslabs/amazon-quicksight-embedding-sdk
        // defaultEmbeddingVisualType: TABLE, // this option only applies to experience embedding and will not be used for dashboard embedding
      }
      embedDashboard(options)
    }
  }, [embeddedUrl, quicksightRef])

  return (
    <div ref={quicksightRef} css={style.quicksightDashboard()}>
      {!isQuicksightLoaded && <Lottie options={lottieOptions} height={60} width={60} isStopped={false} isPaused={false} />}
    </div>
  )
}

QuicksightDashboard.propTypes = propTypes
QuicksightDashboard.defaultProps = defaultProps

export default hot(QuicksightDashboard)
