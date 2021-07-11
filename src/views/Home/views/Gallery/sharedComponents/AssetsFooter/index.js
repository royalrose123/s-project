import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Button } from 'evergreen-ui'

// Lib MISC

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string,
  isWithout24HoursByNoEdit: PropTypes.bool,
}

function AssetsFooter(props) {
  const style = getStyle(props)

  const { onConfirm, confirmLabel, isWithout24HoursByNoEdit } = props

  return (
    <div css={style.assetsFooterWrapper()}>
      <div css={style.assetsFooter(isWithout24HoursByNoEdit)}>
        {isWithout24HoursByNoEdit && (
          <div css={style.assetDescriptionWrapper()}>
            <div css={style.messageDescription()}>ⓘ</div>
            <div css={style.footerMessage()}>You can only edit live asset within 24 hours after uploading.</div>
          </div>
        )}
        <Button onClick={onConfirm} type='button' css={style.button()} marginRight={16} appearance='primary' disabled={isWithout24HoursByNoEdit}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}

AssetsFooter.propTypes = propTypes

export default AssetsFooter
