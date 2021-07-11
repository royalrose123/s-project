export default (props, inputValue) => {
  const { onSearchClick, searchForm } = props

  return {
    initialValues: searchForm,

    onSubmit(data) {
      onSearchClick(data, inputValue)
    },

    enableReinitialize: false,
  }
}
