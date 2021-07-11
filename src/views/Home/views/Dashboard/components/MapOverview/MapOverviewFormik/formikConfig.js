import * as Yup from 'yup'

export default (props, dispatch) => {
  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({}),

    onSubmit(data) {},
  }
}
