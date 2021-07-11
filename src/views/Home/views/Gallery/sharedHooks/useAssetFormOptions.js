import { useState, useEffect } from 'react'
import { start } from 'utils/start-flow'
import { isArray, isEmpty } from 'lodash'

let currentCtaOptions = []

function getFormatOptionsByType(filterOptions, assetFormatType = 'all') {
  if (assetFormatType === 'all') return filterOptions

  return filterOptions?.filter(format => format.type === assetFormatType)
}

function getFormatOption(platformOptions, assetPlatform) {
  const currentPlatform = platformOptions?.find(option => option.label === assetPlatform)

  return currentPlatform?.formatOptions
}

function setCurrentCtaOptions(setOptions, newOptions) {
  currentCtaOptions = newOptions
  setOptions(newOptions)
}

export function getCurrentCtaOptions() {
  return currentCtaOptions
}

function useAssetFormOptions({ filterOptions = [], assetPlatform, assetFormat, assetFormatType, tags }) {
  const { platformOptions, tagOptions } = filterOptions
  const [formatOptions, setFormatOptions] = useState([])
  const [ctaOptions, setCtaOptions] = useState([])
  const [currentTagOptions, setCurrentTagOptions] = useState([])

  useEffect(() => {
    const setNewFormatOptions = start(() => getFormatOption(platformOptions, assetPlatform))
      .next(options => getFormatOptionsByType(options, assetFormatType))
      .end(options => setFormatOptions(options))

    setNewFormatOptions()
  }, [assetPlatform, assetFormatType, platformOptions])

  useEffect(() => {
    const currentFormat = formatOptions?.find(option => option.label === assetFormat)

    setCurrentCtaOptions(setCtaOptions, currentFormat?.ctaOptions)
  }, [assetFormat, formatOptions])

  useEffect(() => {
    if (isArray(tagOptions) && isArray(tags) && !isEmpty(tags)) {
      const tagKeys = tags.map(item => item.tagKey)
      const newTagOptions = tagOptions.map(item => ({ ...item, isDisabled: tagKeys.includes(item.value) }))

      setCurrentTagOptions(newTagOptions)
    }
  }, [tagOptions, tags])

  return {
    formatOptions,
    ctaOptions,
    currentTagOptions,
  }
}

export default useAssetFormOptions
