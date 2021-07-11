import { capitalize } from 'lodash'

export function getTooltipTitle(title) {
  return `<p style="white-space:nowrap; margin-top: -6px;">${title}</p>`
}

export function getTooltipValue(currentToggle, value) {
  return `<p style="white-space:nowrap; margin: 4px 0;">${capitalize(currentToggle)}: ${value.toLocaleString()}</p>`
}
