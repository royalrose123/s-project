import * as Yup from 'yup'
import { subDays, format } from 'date-fns'

export default props => {
  const yesterday = format(subDays(new Date(), 1), 'dd/MM/yyyy')
  const oneWeekAgo = format(subDays(new Date(), 7), 'dd/MM/yyyy')

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({}),

    initialValues: {
      program: [],
      startDate: oneWeekAgo,
      endDate: yesterday,
      displayStartDate: oneWeekAgo,
      displayEndDate: yesterday,
      dateType: 'week',
    },

    onSubmit(data) {},
  }
}
