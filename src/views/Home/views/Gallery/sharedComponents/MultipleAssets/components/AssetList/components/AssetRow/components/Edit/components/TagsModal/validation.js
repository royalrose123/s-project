import * as Yup from 'yup'

export const schema = Yup.lazy(values => {
  return Yup.object().shape({
    tags: Yup.array().of(
      Yup.object().shape({
        tagKey: Yup.string().required('This field is mandatory'),
        tagValues: Yup.array().required('This field is mandatory'),
      }),
    ),
  })
})
