import { find } from 'lodash'

const errorsList = [
  {
    errorType: 'COLOR_ERROR',
    errorMessage: "Cannot read property 'color' of null",
  },
  {
    errorType: 'COLUMN_ERROR',
    errorMessage: 'Not enough columns given to draw the requested chart.',
  },
  {
    errorType: 'NO_DATA_ERROR',
    errorMessage: 'Data column(s) for axis #0 cannot be of type string',
  },
  {
    errorType: 'STYLE_ERROR',
    errorMessage: "Cannot read property 'style' of null",
  },
  {
    errorType: 'MAP_ERROR',
    errorMessage: 'Requested map does not exist.',
  },
]

export const getErrorMessage = errorMessage => {
  const currentError = find(errorsList, { errorMessage: errorMessage })

  return currentError?.errorType
}
