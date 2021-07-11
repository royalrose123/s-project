import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import getStyle from './style'

export const propTypes = {
  css: PropTypes.object,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  value: PropTypes.string,
  alignRight: PropTypes.bool,
  hasMaxLength: PropTypes.bool,
}

export const defaultProps = {
  onChange: () => {},
}

function FlexibleTextarea(props) {
  const style = getStyle(props)
  const { css, value, onChange: propOnChange, isInvalid, alignRight, hasMaxLength, ...restProps } = props
  const textareaRef = useRef(null)
  const textArea = textareaRef.current
  const textAreaHeight = useRef(0)

  const calcTextareaHeight = useCallback(() => {
    textArea.style.height = `${textAreaHeight.current}px`
    textArea.style.height = `${textArea.scrollHeight}px`
  }, [textArea])

  const onChange = event => {
    calcTextareaHeight()

    if (typeof propOnChange === 'function') {
      propOnChange(event)
    }
  }

  useEffect(() => {
    textAreaHeight.current = textArea?.clientHeight
  }, [textArea])

  useEffect(() => {
    const isContentOverflow = textAreaHeight.current < textArea?.scrollHeight

    if (isContentOverflow) {
      calcTextareaHeight()
    }
  }, [textArea, calcTextareaHeight, value])

  return (
    <div css={style.flexibleTextareaWrapper()}>
      <textarea value={value} css={[style.flexibleTextarea(alignRight, hasMaxLength), css]} ref={textareaRef} onChange={onChange} {...restProps} />
    </div>
  )
}

FlexibleTextarea.propTypes = propTypes
FlexibleTextarea.defaultProps = defaultProps

export default FlexibleTextarea
