// Libs
import React, { useRef, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { embedDashboard } from 'amazon-quicksight-embedding-sdk'

// Components
import Spinner from 'basicComponents/Spinner'

// Lib MISC
import useFetcher from 'effects/useFetcher'
import { fetchQuicksightUrl } from 'api/Gallery/fetchQuicksightUrl'

// Style

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function Quicksight(props) {
  const quickRef = useRef(null)

  const { response, isLoaded, isFetching } = useFetcher(fetchQuicksightUrl)
  const { embeddedUrl } = response

  useEffect(() => {
    if (quickRef.current && isLoaded) {
      const options = {
        url: embeddedUrl,
        container: quickRef.current,
        // TODO: 官方範例有給 country, states，但目前不確定用不用的到，所以先註解掉
        // https://github.com/awslabs/amazon-quicksight-embedding-sdk
        // parameters: {
        //   country: 'United States',
        //   states: ['California', 'Washington'],
        // },
        scrolling: 'no',
        height: 'AutoFit',
        width: '100%',
        locale: 'en-US',
        footerPaddingEnabled: true,
        // TODO: 官方範例有給 defaultEmbeddingVisualType，但目前不確定用不用的到，所以先註解掉
        // https://github.com/awslabs/amazon-quicksight-embedding-sdk
        // defaultEmbeddingVisualType: TABLE, // this option only applies to experience embedding and will not be used for dashboard embedding
      }
      embedDashboard(options)
    }
  }, [embeddedUrl, isLoaded])

  return (
    <>
      <div ref={quickRef} style={{ height: '100%', width: '100%', overflow: 'scroll' }} />
      {isFetching && !isLoaded && <Spinner />}
    </>
  )
}

Quicksight.propTypes = propTypes
Quicksight.defaultProps = defaultProps

export default hot(Quicksight)
