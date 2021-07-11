import * as Yup from 'yup'

export default props => {
  return {
    enableReinitialize: true,

    initialValues: {},

    validationSchema: Yup.object().shape({}),

    onSubmit(data) {},
  }
}
