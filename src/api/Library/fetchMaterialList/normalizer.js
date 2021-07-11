import { isArray } from 'lodash'

export default data => {
  return {
    ...data,
    results: isArray(data.results) ? data.results.map((item, index) => ({ ...item, index })) : [],
  }
}
