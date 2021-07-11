function setAllCheckboxValue(setFieldValue, group, groupLength, isChecked) {
  for (let i = 0; i < groupLength; i++) {
    setFieldValue(`[${group}][${i}].isChecked`, isChecked)
  }
}

export default setAllCheckboxValue
