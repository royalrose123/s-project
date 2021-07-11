import { isArray, flattenDeep, compact } from 'lodash'

export default ({ categoryId, search, col, no, order, tags, page, pageSize }) => {
  // 用 _.compact 去除陣列裡的 falsy 值之後，在轉成字串給 API
  const tagsParams = isArray(tags) ? compact(flattenDeep(tags)).toString() : []

  return {
    categoryId,
    search,
    col,
    no,
    order,
    tags: tagsParams,
    page,
    pageSize,
  }
}
