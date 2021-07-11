import { find } from 'lodash'

const transferTagsGroupByKey = (tags, tagOptions) => {
  // 因為這裡後端給的 tags 是將 key 攤平而不是以 tagKey 為 group
  // 所以前端要先將 tags 以 key group 起來，才能符合原本 tag component 的設計
  const newTags = tags.map(tagValue => {
    const newTagKey = find(tagOptions, tags => {
      return find(tags.tagValueOptions, { value: tagValue.id })
    })

    return { ...tagValue, tagKey: newTagKey?.value, tagKeyName: newTagKey?.label }
  })

  const newTagsOptions = newTags
    .filter((value, index) => newTags.findIndex(currentValue => currentValue.tagKey === value.tagKey) === index)
    .map(value => ({
      tagKey: value.tagKey,
      tagKeyName: value.tagKeyName,
      tagValues: newTags.filter(currentValue => currentValue.tagKey === value.tagKey).map(value => value.id),
      tagName: newTags.filter(currentValue => currentValue.tagKey === value.tagKey).map(value => value.valueName),
    }))

  return newTagsOptions
}

export default transferTagsGroupByKey
