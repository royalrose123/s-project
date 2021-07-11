import { css } from '@emotion/core'

import { start } from 'utils/start-flow'
import passthru from 'utils/passthru'
import convertToRem from 'utils/convert-to-rem'

export function setLabel(style) {
  const isChrome = /chrome/.test(navigator.userAgent.toLowerCase())

  if (!isChrome || !new Error().stack) return style

  const stackMessage = new Error().stack.split('\n')[2].trim()
  const labelName = stackMessage
    .match(/\s{1,}[\w.]*?\s{1,}/g)[0]
    .trim()
    .replace('Object.', '')

  return css`${style} label:${labelName};`
}

export default {
  rem: start(passthru).end((cssString = '') => {
    return css`
      ${cssString.replace(/[0-9.]+(?=px)px/g, match => convertToRem(match))}
    `
  }),

  plainText: passthru,
}
