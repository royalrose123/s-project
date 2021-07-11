import { isArray, flattenDeep } from 'lodash'

export default ({ categoryId, search, col, no, order, tags, page, pageSize }) => ({
  categoryId,
  search,
  col,
  no,
  order,
  tags: isArray(tags) ? flattenDeep(tags).toString() : [],
  page,
  pageSize,
})
