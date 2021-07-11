// Libs
import React from 'react'
// import PropTypes from 'prop-types'

// Components

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function AccessToken(props) {
  const style = getStyle(props)

  return (
    <div
      onClick={event => {
        /* Get the text field */
        const copyText = document.getElementById('textArea')

        /* Select the text field */
        copyText.select()
        copyText.setSelectionRange(0, 99999)

        /* Copy the text inside the text field */
        document.execCommand('copy')

        /* Alert the copied text */
        alert('Copy accessToken success!')
      }}
      css={style.accessToken()}
    >
      <div css={style.textareaWrapper()}>
        <textarea id='textArea' css={style.textArea()} type='text' defaultValue={window.localStorage.getItem('ACCESS_TOKEN')} />
      </div>
    </div>
  )
}

AccessToken.propTypes = propTypes
AccessToken.defaultProps = defaultProps

export default AccessToken
