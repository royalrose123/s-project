export default data => {
  return {
    tagOptions: data.map(tagKey => {
      return {
        label: tagKey.keyName,
        value: tagKey.keyId,
        tagValueOptions: tagKey.tagValues.map(tagValue => ({
          label: tagValue.valueName,
          value: tagValue.valueId,
        })),
      }
    }),
  }
}
