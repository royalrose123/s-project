export const rootFontSize = Number(
  window
    .getComputedStyle(document.body)
    .getPropertyValue('font-size')
    .replace('px', ''),
)

export default function convertToRem(size) {
  const isNumber = typeof size === 'number'
  const isString = typeof size === 'string'

  const regexPx = /px$/gi
  const regexRem = /rem$/gi
  const availablePx = isString && regexPx.test(size)
  const availableRem = isString && regexRem.test(size)

  switch (true) {
    case isNumber:
      return `${size / rootFontSize}rem`

    case availablePx:
      return `${Number(size.replace('px', '')) / rootFontSize}rem`

    case availableRem:
      return size

    default:
      return size
  }
}
