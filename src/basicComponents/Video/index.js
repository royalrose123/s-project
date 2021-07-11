// Libs
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

// Components

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  id: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
  customSetting: PropTypes.object,
  css: PropTypes.object,
  src: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  customSetting: {
    preload: 'metadata',
  },
}

function Video(props) {
  // const style = getStyle(props)
  const { customSetting, id, css, sources, src } = props
  const [mediaPlayer, setMediaPlayer] = useState({})
  const playerRef = useRef(null)

  useEffect(() => {
    if (!isEmpty(mediaPlayer)) return

    const player = videojs(id, {
      sources,
      poster: '',
      muted: true,
      controls: true, // true 時可以 play or pause
      textTrackSettings: false,
      textTrackDisplay: false,
      errorDisplay: false,
      loadingSpinner: false,
      controlBar: false,
      ...customSetting,
    })

    setMediaPlayer(player)

    player.on('play', function() {})
  }, [customSetting, id, mediaPlayer, sources])

  useEffect(() => {
    return () => {
      if (isEmpty(mediaPlayer)) return

      mediaPlayer.dispose()
    }
  }, [mediaPlayer])

  return <video id={id} css={css} className='video-js vjs-default-skin vjs-big-play-centered' src={src} ref={playerRef} />
}

Video.propTypes = propTypes
Video.defaultProps = defaultProps

export default Video
